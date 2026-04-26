import fs from "fs";
import path from "path";
import { markdownToHtml, slugify } from "./markdown";

export interface Post {
  slug: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  category: string;
  excerpt: string;
  contentMd: string; // markdown source (for the admin editor)
  content: string;   // rendered HTML (for display)
  featured?: boolean;
}

const DATA_PATH = path.join(process.cwd(), "data", "posts.json");

export function getPosts(): Post[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function savePosts(posts: Post[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export { markdownToHtml, slugify };
