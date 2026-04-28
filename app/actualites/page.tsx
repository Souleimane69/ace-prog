import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Actualités & Conseils Reprogrammation Moteur | Ace Prog",
  description:
    "Blog Ace Prog : conseils d'experts, guides pratiques et actualités sur la reprogrammation moteur ECU, le Stage 1/2/3, la conversion E85 et l'électronique automobile.",
  alternates: {
    canonical: "https://aceprog.com/actualites",
  },
  openGraph: {
    url: "https://aceprog.com/actualites",
    title: "Actualités & Conseils Reprogrammation Moteur | Ace Prog",
    description:
      "Guides, conseils et actualités sur la reprogrammation moteur, le diagnostic ECU et la conversion E85 par Ace Prog.",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitesPage() {
  const posts = await getPosts();

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
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <Link
              href="/#actualites"
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
              ← Retour au site
            </Link>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e63946",
                marginBottom: "0.75rem",
              }}
            >
              Blog
            </span>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#f0f1f5",
                margin: 0,
              }}
            >
              Nos Actualités
            </h1>
          </div>
        </div>

        {/* Liste */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "4rem 2rem" }}>
          {posts.length === 0 ? (
            <p style={{ color: "#777b88", fontFamily: "var(--font-body)" }}>
              Aucun article pour le moment.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/actualites/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    className="news-row"
                    style={{
                      background: "#22252E",
                      border: "1px solid #3D4250",
                      borderRadius: "8px",
                      padding: "2rem 2.5rem",
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "1.5rem",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.75rem",
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
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.8rem",
                            color: "#777b88",
                          }}
                        >
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "#f0f1f5",
                          margin: "0 0 0.5rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.95rem",
                          color: "#b0b4c0",
                          margin: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        color: "#e63946",
                        whiteSpace: "nowrap",
                      }}
                    >
                      →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
