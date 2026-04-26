"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const points = [
  { icon: "💰", label: "Économie", desc: "Réduit drastiquement vos coûts — pas de déplacement de technicien." },
  { icon: "🔑", label: "Autonomie", desc: "Gérez vos délais en toute indépendance, réponse instantanée de nos experts." },
  { icon: "⚡", label: "Efficacité", desc: "Fluidifiez la gestion de vos véhicules et améliorez votre production journalière." },
];

export default function NLink() {
  return (
    <section
      id="nlink"
      style={{
        padding: "7rem 2rem",
        background: "linear-gradient(135deg, #111318 0%, #16181D 50%, #1a0a0b 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Décoration lumineuse */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(230,57,70,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader tag="Nouveau service" title="N.LINK — Notre Expertise Dans Votre Atelier" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="lg:grid-cols-2"
        >
          {/* Texte gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                color: "#a0a0a0",
                lineHeight: 1.85,
                fontSize: "1rem",
                marginBottom: "2rem",
              }}
            >
              ACE PROG met en place une solution de reprogrammation à distance pour les
              professionnels de l&apos;automobile partout en France. Un boîtier installé
              dans votre atelier, relié directement à nos experts — pour des prestations
              rapides, sans déplacement et à moindre coût.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {points.map((p) => (
                <div key={p.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#e63946",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.label}
                    </p>
                    <p style={{ color: "#b0b4c0", fontSize: "0.9rem", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/nlink"
              style={{
                display: "inline-block",
                background: "#e63946",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "1rem 2.2rem",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#c0392b";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(230,57,70,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#e63946";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              En savoir plus →
            </Link>
          </motion.div>

          {/* Carte droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: "#22252E",
              border: "2px solid #e63946",
              borderRadius: "12px",
              padding: "2.5rem",
              boxShadow: "0 0 60px rgba(230,57,70,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e63946",
                marginBottom: "0.75rem",
              }}
            >
              Package N.LINK
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "#e63946",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              2 500 €
            </p>
            <p style={{ color: "#777b88", fontFamily: "var(--font-body)", fontSize: "0.85rem", marginBottom: "2rem" }}>
              Pack complet tout inclus
            </p>

            {["Boîtier de reprogrammation", "Ordinateur configuré", "Formation & Assistance"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.85rem",
                  paddingBottom: "0.85rem",
                  borderBottom: "1px solid #2C303A",
                }}
              >
                <span style={{ color: "#e63946", flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: "var(--font-body)", color: "#f0f1f5" }}>{item}</span>
              </div>
            ))}

            <div
              style={{
                marginTop: "1.5rem",
                background: "rgba(230,57,70,0.06)",
                border: "1px solid rgba(230,57,70,0.2)",
                borderRadius: "6px",
                padding: "1rem 1.25rem",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", color: "#b0b4c0", fontSize: "0.85rem", lineHeight: 1.65 }}>
                Fichiers à partir de <strong style={{ color: "#e63946" }}>80 €</strong> — tarif dégressif selon volume mensuel.
                Jusqu&apos;à <strong style={{ color: "#e63946" }}>50% d&apos;économie</strong> vs prestataire externe.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
