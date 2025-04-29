import { Redis } from "@upstash/redis";

// Initialize Redis client with connection details from environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Session management functions
export async function setSession(
  userId: number,
  sessionId: string,
  expiryInSeconds = 60 * 60 * 24 * 7
) {
  await redis.set(`session:${sessionId}`, userId.toString(), {
    ex: expiryInSeconds,
  });
}

export async function getSession(sessionId: string): Promise<number | null> {
  const userId = await redis.get<string>(`session:${sessionId}`);
  return userId ? Number.parseInt(userId, 10) : null;
}

export async function deleteSession(sessionId: string) {
  await redis.del(`session:${sessionId}`);
}

// Cache management functions
export async function cacheData(
  key: string,
  data: any,
  expiryInSeconds = 60 * 60
) {
  await redis.set(key, JSON.stringify(data), { ex: expiryInSeconds });
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  const data = await redis.get<string>(key);
  return data ? JSON.parse(data) : null;
}

export async function invalidateCache(key: string) {
  await redis.del(key);
}

export { redis };
