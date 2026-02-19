import fastify from "fastify";
import "dotenv/config";
import { routes } from "./routes.js";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { redis } from "./lib/redis.js";
import rateLimit from "@fastify/rate-limit";
import jwt from "@fastify/jwt";
import "./workers/appointment.worker.js";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { FastifyAdapter } from "@bull-board/fastify";
import { queue } from "./lib/redis.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

const start = async () => {
  try {
    await app.register(fastifyStatic, {
      root: path.join(__dirname, "../public"),
      prefix: "/",
    });
    await app.register(rateLimit, {
      global: true,
      redis,
      max: 100,
      timeWindow: "1 minute",
    });

    await app.register(jwt, {
      secret: process.env.JWT_SECRET as string,
    });

    await app.register(routes);
    const serverAdapter = new FastifyAdapter();

    createBullBoard({
      queues: [new BullMQAdapter(queue)],
      serverAdapter,
    });

    serverAdapter.setBasePath("/admin/queues");
    await app.register(serverAdapter.registerPlugin(), {
      prefix: "/admin/queues",
    });
    await app.listen({ port: 3333, host: "0.0.0.0" });

    console.log(`🔥 Servidor rodando em http://localhost:3333`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
