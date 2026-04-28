import { NextRequest, NextResponse } from "next/server";
import { savePosts, markdownToHtml } from "@/lib/posts";
import type { Post } from "@/lib/posts";
import fs from "fs";
import path from "path";

function authorized(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const dataPath = path.join(process.cwd(), "data", "posts.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const posts = (JSON.parse(raw) as Post[]).map((p) => ({
    ...p,
    content: p.contentMd ? markdownToHtml(p.contentMd) : p.content,
  }));

  await savePosts(posts);

  return NextResponse.json({ ok: true, count: posts.length, slugs: posts.map((p) => p.slug) });
}
