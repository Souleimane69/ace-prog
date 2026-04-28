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

// Appel REST Upstash au format commande : POST / avec body ["COMMAND", args...]
async function upstash(cmd: unknown[]): Promise<unknown> {
  const url = process.env["KV_REST_API_URL"] ?? process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["KV_REST_API_TOKEN"] ?? process.env["UPSTASH_REDIS_REST_TOKEN"];
  if (!url || !token) return undefined;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const json = await res.json() as { result?: unknown; error?: string };
  if (json.error) throw new Error(`Upstash error: ${json.error}`);
  return json.result;
}

function isConfigured(): boolean {
  const url = process.env["KV_REST_API_URL"] ?? process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["KV_REST_API_TOKEN"] ?? process.env["UPSTASH_REDIS_REST_TOKEN"];
  return !!(url && token);
}

export async function getPosts(): Promise<Post[]> {
  if (!isConfigured()) return readFile();

  try {
    const raw = await upstash(["GET", KV_KEY]);
    if (raw === null || raw === undefined) {
      // Premier démarrage : seed depuis posts.json
      const seeded = readFile();
      if (seeded.length > 0) {
        await upstash(["SET", KV_KEY, JSON.stringify(seeded)]);
      }
      return seeded;
    }
    const posts: Post[] = typeof raw === "string" ? JSON.parse(raw) : (raw as Post[]);
    return Array.isArray(posts) ? posts : [];
  } catch (err) {
    console.error("[getPosts] KV error, fallback file:", err);
    return readFile();
  }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function savePosts(posts: Post[]): Promise<void> {
  if (!isConfigured()) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
    return;
  }
  await upstash(["SET", KV_KEY, JSON.stringify(posts)]);
}

export { markdownToHtml, slugify };
