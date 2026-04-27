import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts, getPost } from "@/lib/posts";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Ace Prog`,
    description: post.excerpt,
    keywords: [post.category, "ace prog", "reprogrammation moteur", post.title],
    alternates: {
      canonical: `https://aceprog.com/actualites/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://aceprog.com/actualites/${slug}`,
      title: `${post.title} | Ace Prog`,
      description: post.excerpt,
      publishedTime: post.date,
      authors: ["Ace Prog"],
      tags: [post.category, "reprogrammation moteur", "ace prog"],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#16181D", paddingTop: "6rem" }}>
        {/* En-tête */}
        <div
          style={{
            padding: "4rem 2rem 3rem",
            borderBottom: "1px solid #3D4250",
            background: "#111318",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <Link
              href="/actualites"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e63946",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "1.5rem",
              }}
            >
              ← Retour aux actualités
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#e63946",
                  background: "rgba(230,57,70,0.1)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "3px",
                }}
              >
                {post.category}
              </span>
              <span
                style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#777b88" }}
              >
                {formatDate(post.date)}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 800,
                color: "#f0f1f5",
                lineHeight: 1.2,
                margin: "0 0 1rem",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                color: "#b0b4c0",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Contenu */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3.5rem 2rem 5rem" }}>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA bas */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2rem",
              background: "#22252E",
              border: "1px solid #3D4250",
              borderLeft: "4px solid #e63946",
              borderRadius: "6px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#f0f1f5",
                margin: "0 0 0.5rem",
              }}
            >
              Un projet de reprogrammation ?
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "#b0b4c0",
                margin: "0 0 1rem",
              }}
            >
              Contactez-nous pour un devis gratuit et personnalisé.
            </p>
            <Link
              href="/#contact"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
                background: "#e63946",
                padding: "0.6rem 1.4rem",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
