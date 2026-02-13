import { Redis } from "ioredis";

const port = process.env.REDIS_PORT;

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: port ? Number(port) : undefined,
});

redis.on("connect", () => {
  console.log("Redis connected");
});
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});
