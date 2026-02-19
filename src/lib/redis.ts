import { Redis } from "ioredis";
import { Queue } from "bullmq";
const port = process.env.REDIS_PORT;

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: port ? Number(port) : undefined,
  maxRetriesPerRequest: null,
});
export const bullmqConnection = {
  host: process.env.REDIS_HOST,
  port: port ? Number(port) : undefined,
  maxRetriesPerRequest: null,
};

export const queue = new Queue("appointment", { connection: bullmqConnection });

redis.on("connect", () => {
  console.log("Redis connected");
});
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});
