import { getRedisClient } from "../redis-client";

export async function GET() {
  const redisClient = await getRedisClient();
  // TODO: Replace with SCAN
  const keys = await redisClient.keys("bundestagssitzung:*");

  // Sorted by time
  const sortedKeys = keys.sort();

  const entities: unknown[] = [];
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    const entity = await redisClient.json.get(key, { path: "." });
    entities.push(entity);
  }

  return Response.json(entities);
}
