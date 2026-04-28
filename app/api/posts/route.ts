import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPosts, savePosts, slugify, markdownToHtml } from "@/lib/posts";

function authorized(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  return NextResponse.json(await getPosts());
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { title, category, excerpt, contentMd, date } = await req.json();

  if (!title?.trim() || !category?.trim() || !excerpt?.trim() || !contentMd?.trim()) {
    return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 });
  }

  const posts = await getPosts();
  const slug = slugify(title);

  if (posts.find((p) => p.slug === slug)) {
    return NextResponse.json(
      { error: "Un article avec ce titre existe déjà" },
      { status: 409 }
    );
  }

  const newPost = {
    slug,
    title: title.trim(),
    date: date || new Date().toISOString().split("T")[0],
    category: category.trim(),
    excerpt: excerpt.trim(),
    contentMd: contentMd.trim(),
    content: markdownToHtml(contentMd.trim()),
  };

  try {
    await savePosts([newPost, ...posts]);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("savePosts failed:", msg);
    return NextResponse.json(
      { error: `Erreur stockage : ${msg}` },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/actualites");

  return NextResponse.json(newPost, { status: 201 });
}
