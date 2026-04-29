"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ParticleCanvas from "@/components/ParticleCanvas";
import type { Post } from "@/lib/posts";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { target: 500, suffix: "+", label: "Véhicules" },
  { target: 98, suffix: "%", label: "Satisfaction" },
  { target: 10, suffix: "ans", label: "Expérience" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elRef}>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero({ featuredPost }: { featuredPost: Post | null }) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflowX: "hidden",
        background: "#16181D",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero-car.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(22,24,29,0.4) 0%, rgba(22,24,29,0.88) 100%)",
          zIndex: 1,
        }}
      />

      {/* Particle canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <ParticleCanvas />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "8rem 2rem 4rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: featuredPost ? "1fr 1fr" : "1fr",
          gap: "3rem",
          alignItems: "center",
        }}
        className={`hero-content${featuredPost ? " hero-grid" : ""}`}
      >
        {/* Colonne gauche : article à la une */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e63946",
                marginBottom: "1.25rem",
              }}
            >
              ★ À la une
            </p>

            <div
              style={{
                background: "rgba(22,24,29,0.75)",
                border: "1px solid rgba(230,57,70,0.4)",
                borderRadius: "10px",
                padding: "2rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 60px rgba(230,57,70,0.08)",
              }}
            >
              {/* Catégorie + date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#e63946",
                    background: "rgba(230,57,70,0.12)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "3px",
                  }}
                >
                  {featuredPost.category}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#555" }}>
                  {new Date(featuredPost.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Titre */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  fontWeight: 800,
                  color: "#f0f1f5",
                  lineHeight: 1.25,
                  marginBottom: "1rem",
                }}
              >
                {featuredPost.title}
              </h2>

              {/* Résumé */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "#b0b4c0",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {featuredPost.excerpt}
              </p>

              {/* Lien */}
              <Link
                href={`/actualites/${featuredPost.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "#e63946",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#c0392b";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(230,57,70,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#e63946";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                Lire l&apos;article →
              </Link>
            </div>
          </motion.div>
        )}

        {/* Colonne droite (ou unique) : contenu hero */}
        <div>
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#e63946",
              marginBottom: "1.5rem",
            }}
          >
            Reprogrammation Moteur · Électronique Automobile
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ display: "block", color: "#e63946" }}>PERFORMANCE</span>
            <span style={{ display: "block", color: "#f5f5f5" }}>REDÉFINIE</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              maxWidth: "560px",
              fontSize: "1.15rem",
              color: "#a0a0a0",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}
          >
            Expert en reprogrammation ECU et électronique automobile partout en
            France. Chaque paramètre analysé, optimisé et calibré avec rigueur.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-buttons"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}
          >
            <button
              onClick={() => scrollTo("#contact")}
              style={{
                background: "#e63946",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "1rem 2.2rem",
                borderRadius: "4px",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#c0392b";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 30px rgba(230,57,70,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#e63946";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Obtenir un devis
            </button>

            <button
              onClick={() => scrollTo("#services")}
              style={{
                background: "transparent",
                color: "#f5f5f5",
                border: "1px solid rgba(245,245,245,0.4)",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "1rem 2.2rem",
                borderRadius: "4px",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e63946";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(230,57,70,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(245,245,245,0.4)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              Voir les services
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-stats"
            style={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
              borderTop: "1px solid #2C303A",
              paddingTop: "2rem",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: "#e63946",
                    lineHeight: 1,
                  }}
                >
                  <Counter target={s.target} suffix={s.suffix} />
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "#a0a0a0",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: "0.25rem",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#666",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, #e63946, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
