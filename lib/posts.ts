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

function readFile(): Post[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as Post[];
  } catch {
    return [];
  }
}

async function kvGet(url: string, token: string, key: string): Promise<Post[] | null> {
  const res = await fetch(`${url}/get/${key}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const json = await res.json();
  if (json.result === null || json.result === undefined) return null;
  const value = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
  return value as Post[];
}

async function kvSet(url: string, token: string, key: string, value: Post[]): Promise<void> {
  const res = await fetch(`${url}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.stringify(value)),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KV set failed: ${res.status} ${text}`);
  }
}

export async function getPosts(): Promise<Post[]> {
  const url = process.env["KV_REST_API_URL"] ?? process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["KV_REST_API_TOKEN"] ?? process.env["UPSTASH_REDIS_REST_TOKEN"];
  if (url && token) {
    const stored = await kvGet(url, token, KV_KEY);
    if (stored === null) {
      const seeded = readFile();
      if (seeded.length > 0) await kvSet(url, token, KV_KEY, seeded);
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
  const url = process.env["KV_REST_API_URL"] ?? process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["KV_REST_API_TOKEN"] ?? process.env["UPSTASH_REDIS_REST_TOKEN"];
  if (url && token) {
    await kvSet(url, token, KV_KEY, posts);
    return;
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export { markdownToHtml, slugify };
