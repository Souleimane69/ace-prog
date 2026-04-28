import fs from "fs";
import path from "path";
import { markdownToHtml, slugify } from "./markdown";

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  contentMd: string;
  content: string;
  featured?: boolean;
}

const DATA_PATH = path.join(process.cwd(), "data", "posts.json");
const KV_KEY = "ace_posts";

function getRedisConfig() {
  // Vercel Marketplace Upstash integration
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (url && token) return { url, token };
  return null;
}

function readFile(): Post[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as Post[];
  } catch {
    return [];
  }
}

async function getRedis() {
  const config = getRedisConfig();
  if (!config) return null;
  const { Redis } = await import("@upstash/redis");
  return new Redis({ url: config.url, token: config.token });
}

export async function getPosts(): Promise<Post[]> {
  const redis = await getRedis();
  if (redis) {
    const stored = await redis.get<Post[]>(KV_KEY);
    if (stored === null) {
      const seeded = readFile();
      if (seeded.length > 0) await redis.set(KV_KEY, seeded);
      return seeded;
    }
    return stored;
  }
  return readFile();
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function savePosts(posts: Post[]): Promise<void> {
  const redis = await getRedis();
  if (redis) {
    await redis.set(KV_KEY, posts);
    return;
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export { markdownToHtml, slugify };
