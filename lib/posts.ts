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

function kvConfigured() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function readFile(): Post[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as Post[];
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  if (kvConfigured()) {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
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
  if (kvConfigured()) {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    await redis.set(KV_KEY, posts);
    return;
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export { markdownToHtml, slugify };
