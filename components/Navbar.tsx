"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#expertise", label: "Expertise" },
  { href: "#benefices", label: "Bénéfices" },
  { href: "#nlink", label: "N.LINK" },
  { href: "#actualites", label: "Actualités" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) =>
      document.querySelector(l.href) as HTMLElement | null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      const offset = 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, padding 0.3s ease",
        background: scrolled
          ? "rgba(17,19,24,0.97)"
          : "linear-gradient(to bottom, rgba(17,19,24,0.6) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #3D4250" : "none",
        padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#accueil")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="ACE PROG"
            style={{
              height: scrolled ? "36px" : "44px",
              width: "auto",
              transition: "height 0.3s ease",
              objectFit: "contain",
            }}
          />
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "2rem" }} className="hidden md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color:
                  active === l.href.slice(1) ? "#e63946" : "#a0a0a0",
                transition: "color 0.2s ease",
                borderBottom:
                  active === l.href.slice(1)
                    ? "2px solid #e63946"
                    : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        <button
          onClick={() => scrollTo("#contact")}
          className="hidden md:block"
          style={{
            background: "#e63946",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.6rem 1.4rem",
            borderRadius: "4px",
            transition: "background 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = "#c0392b";
            (e.target as HTMLButtonElement).style.boxShadow =
              "0 0 20px rgba(230,57,70,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "#e63946";
            (e.target as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          Devis gratuit
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#f5f5f5",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform:
                  menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "scaleX(0)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(17,19,24,0.99)",
              borderTop: "1px solid #3D4250",
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: active === l.href.slice(1) ? "#e63946" : "#f5f5f5",
                  textAlign: "left",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #22252E",
                }}
              >
                {l.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
