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

function getKvConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ??
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.KV_REST_API_TOKEN;
  if (url && token) return { url, token };
  return null;
}

async function kvGet(key: string): Promise<Post[] | null> {
  const cfg = getKvConfig();
  if (!cfg) return null;
  const res = await fetch(`${cfg.url}/get/${key}`, {
    headers: { Authorization: `Bearer ${cfg.token}` },
    cache: "no-store",
  });
  const json = await res.json();
  if (json.result === null || json.result === undefined) return null;
  const value = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
  return value as Post[];
}

async function kvSet(key: string, value: Post[]): Promise<void> {
  const cfg = getKvConfig();
  if (!cfg) throw new Error("KV non configuré");
  const res = await fetch(`${cfg.url}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.stringify(value)),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KV set failed: ${res.status} ${text}`);
  }
}

function readFile(): Post[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as Post[];
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  if (getKvConfig()) {
    const stored = await kvGet(KV_KEY);
    if (stored === null) {
      const seeded = readFile();
      if (seeded.length > 0) await kvSet(KV_KEY, seeded);
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
  if (getKvConfig()) {
    await kvSet(KV_KEY, posts);
    return;
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export { markdownToHtml, slugify };
