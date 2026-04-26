import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPosts, savePosts, markdownToHtml } from "@/lib/posts";

function authorized(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  return token === process.env.ADMIN_PASSWORD;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function PUT(req: NextRequest, { params }: Props) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { slug } = await params;
  const { title, category, excerpt, contentMd, date, featured } = await req.json();

  const posts = getPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  posts[idx] = {
    ...posts[idx],
    title: title?.trim() ?? posts[idx].title,
    category: category?.trim() ?? posts[idx].category,
    excerpt: excerpt?.trim() ?? posts[idx].excerpt,
    date: date ?? posts[idx].date,
    contentMd: contentMd?.trim() ?? posts[idx].contentMd,
    content: contentMd ? markdownToHtml(contentMd.trim()) : posts[idx].content,
    ...(featured !== undefined && { featured: !!featured }),
  };

  savePosts(posts);

  revalidatePath("/");
  revalidatePath("/actualites");
  revalidatePath(`/actualites/${slug}`);

  return NextResponse.json(posts[idx]);
}

export async function PATCH(req: NextRequest, { params }: Props) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { slug } = await params;
  const { featured } = await req.json();

  const posts = getPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  // Un seul article à la une à la fois
  const updated = posts.map((p, i) => ({
    ...p,
    featured: i === idx ? !!featured : false,
  }));

  savePosts(updated);

  revalidatePath("/");
  revalidatePath("/actualites");

  return NextResponse.json(updated[idx]);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { slug } = await params;
  const posts = getPosts();
  const filtered = posts.filter((p) => p.slug !== slug);

  if (filtered.length === posts.length) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  savePosts(filtered);

  revalidatePath("/");
  revalidatePath("/actualites");
  revalidatePath(`/actualites/${slug}`);

  return NextResponse.json({ ok: true });
}
