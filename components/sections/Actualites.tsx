"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Post } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Actualites({ posts }: { posts: Post[] }) {
  const latest = posts.slice(0, 3);

  return (
    <section
      id="actualites"
      style={{ padding: "7rem 2rem", background: "#16181D" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader tag="Actualités" title="Nos Derniers Articles" />

        {latest.length === 0 && (
          <p style={{ textAlign: "center", color: "#777b88", fontFamily: "var(--font-body)" }}>
            Aucun article pour le moment.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {latest.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#22252E",
                border: "1px solid #3D4250",
                borderRadius: "8px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e63946";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px rgba(230,57,70,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#3D4250";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#777b88" }}>
                  {formatDate(post.date)}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#f0f1f5",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  color: "#b0b4c0",
                  lineHeight: 1.6,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {post.excerpt}
              </p>

              <Link
                href={`/actualites/${post.slug}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#e63946",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginTop: "0.25rem",
                }}
              >
                Lire l&apos;article →
              </Link>
            </motion.article>
          ))}
        </div>

        {posts.length > 3 && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              href="/actualites"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f0f1f5",
                textDecoration: "none",
                border: "1px solid #3D4250",
                padding: "0.75rem 2rem",
                borderRadius: "4px",
              }}
            >
              Voir tous les articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
