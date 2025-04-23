import { CardData } from "@/app/types/CardData";
import { getRedisClient } from "@/app/api/redis-client";

export async function saveToRedis({
  key,
  url,
  date,
  cards,
}: {
  key: string;
  url: string;
  date: string;
  cards: CardData[];
}) {
  console.log("Setting redis value");

  const redisClient = await getRedisClient();

  const redisSetResult = await redisClient.json.set(key, "$", {
    id: key,
    protocolUrl: url,
    date,
    cards,
  });

  if (!redisSetResult) throw new Error("Redis set failed");

  // Save result to disk
  // TODO: Use background save or append only file instead
  await redisClient.save();
}
