import { createClient } from "redis";

let _redisClient: ReturnType<typeof createClient> | null = null;

export async function getRedisClient() {
  // Already created and connected
  if (_redisClient) return _redisClient;

  const newRedisClient = createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@redis:6379`,
  }).on("error", (err) => console.log("Redis Client Error", err));

  await newRedisClient.connect();

  _redisClient = newRedisClient;

  return _redisClient;
}
