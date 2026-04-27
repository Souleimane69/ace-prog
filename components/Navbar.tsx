"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mainLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "Qui sommes-nous ?" },
  { href: "#actualites", label: "Actualités" },
  { href: "#contact", label: "Contact" },
];

const serviceLinks = [
  { id: "optimisation", label: "Optimisation", icon: "📈" },
  { id: "reparation", label: "Réparation / Clonage", icon: "🔧" },
  { id: "cles", label: "Clés", icon: "🔑" },
  { id: "nlink", label: "N.LINK", icon: "📡" },
];

const allSectionIds = [
  "accueil",
  "apropos",
  "services",
  "actualites",
  "contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = allSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const scrollToServiceTab = (tabId: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    const section = document.getElementById("services");
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      setTimeout(() => {
        const btn = document.querySelector<HTMLButtonElement>(`[data-tab="${tabId}"]`);
        if (btn) btn.click();
      }, 600);
    }
  };

  const isServicesActive = active === "services";

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
            src="/logo-blanc.png"
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
        <nav style={{ display: "flex", gap: "1.75rem", alignItems: "center" }} className="hidden md:flex">
          {mainLinks.slice(0, 2).map((l) => (
            <NavButton
              key={l.href}
              label={l.label}
              active={active === l.href.slice(1)}
              onClick={() => scrollTo(l.href)}
            />
          ))}

          {/* Services dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: isServicesActive || servicesOpen ? "#e63946" : "#a0a0a0",
                transition: "color 0.2s ease",
                borderBottom:
                  isServicesActive || servicesOpen
                    ? "2px solid #e63946"
                    : "2px solid transparent",
                paddingBottom: "2px",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              Nos Services
              <span
                style={{
                  fontSize: "0.7rem",
                  transition: "transform 0.2s",
                  transform: servicesOpen ? "rotate(180deg)" : "none",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(17,19,24,0.98)",
                    border: "1px solid #3D4250",
                    borderRadius: "8px",
                    padding: "0.5rem",
                    minWidth: "220px",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {serviceLinks.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToServiceTab(s.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.7rem 1rem",
                        borderRadius: "5px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#f0f1f5",
                        textAlign: "left",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(230,57,70,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#e63946";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "none";
                        (e.currentTarget as HTMLButtonElement).style.color = "#f0f1f5";
                      }}
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainLinks.slice(2).map((l) => (
            <NavButton
              key={l.href}
              label={l.label}
              active={active === l.href.slice(1)}
              onClick={() => scrollTo(l.href)}
            />
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
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(230,57,70,0.4)";
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
              gap: "0",
            }}
          >
            {mainLinks.slice(0, 2).map((l) => (
              <MobileNavButton
                key={l.href}
                label={l.label}
                active={active === l.href.slice(1)}
                onClick={() => scrollTo(l.href)}
              />
            ))}

            {/* Services mobile */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: isServicesActive ? "#e63946" : "#f5f5f5",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #22252E",
                }}
              >
                Nos Services
                <span
                  style={{
                    fontSize: "0.8rem",
                    transition: "transform 0.2s",
                    transform: mobileServicesOpen ? "rotate(180deg)" : "none",
                    display: "inline-block",
                  }}
                >
                  ▾
                </span>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    {serviceLinks.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToServiceTab(s.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          width: "100%",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#a0a0a0",
                          padding: "0.6rem 1.5rem",
                          textAlign: "left",
                          borderBottom: "1px solid #1a1d24",
                        }}
                      >
                        <span>{s.icon}</span>
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainLinks.slice(2).map((l) => (
              <MobileNavButton
                key={l.href}
                label={l.label}
                active={active === l.href.slice(1)}
                onClick={() => scrollTo(l.href)}
              />
            ))}

            <button
              onClick={() => scrollTo("#contact")}
              style={{
                marginTop: "0.75rem",
                background: "#e63946",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.9rem",
                borderRadius: "4px",
              }}
            >
              Devis gratuit
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "0.95rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: active ? "#e63946" : "#a0a0a0",
        transition: "color 0.2s ease",
        borderBottom: active ? "2px solid #e63946" : "2px solid transparent",
        paddingBottom: "2px",
      }}
    >
      {label}
    </button>
  );
}

function MobileNavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "1.1rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: active ? "#e63946" : "#f5f5f5",
        textAlign: "left",
        padding: "0.75rem 0",
        borderBottom: "1px solid #22252E",
        width: "100%",
      }}
    >
      {label}
    </button>
  );
}
