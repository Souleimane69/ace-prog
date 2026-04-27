"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const avantages = [
  {
    title: "Économie",
    icon: "💰",
    desc: "Cette technologie permet de réduire drastiquement les coûts car elle évite le déplacement d'un de nos experts au sein de votre atelier.",
  },
  {
    title: "Autonomie",
    icon: "🔑",
    desc: "Grâce au N.LINK, vous devenez autonome et pouvez gérer vos délais. Il suffit de transmettre votre fichier à nos experts qui répondront instantanément.",
  },
  {
    title: "Efficacité",
    icon: "⚡",
    desc: "Cette technologie permet de fluidifier la gestion de vos véhicules en réparation et donc d'améliorer votre production journalière.",
  },
];

const pricingTiers = [
  { range: "1 – 5 fichiers", price: "150 €" },
  { range: "6 – 10 fichiers", price: "130 €" },
  { range: "10 – 15 fichiers", price: "100 €" },
  { range: "15 – 20 fichiers", price: "80 €" },
];

const packageIncludes = [
  "Boîtier de reprogrammation automobile",
  "Ordinateur configuré prêt à l'emploi",
  "Formation en électronique et mécanique par nos experts",
  "Assistance en temps réel pour votre activité",
];

const nlinkAdvantages = [
  "Internalisation du service",
  "Formation en interne",
  "Assistance 24/24",
  "Augmentation de votre clientèle",
];

const prestaDisadvantages = [
  "Dépendance opérationnelle",
  "Risque d'augmentation des coûts",
  "Relance nécessaire",
  "Compétence externe à votre atelier",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function NLinkContent() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#16181D", color: "#f0f1f5", paddingTop: "80px" }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            padding: "7rem 2rem 5rem",
            overflow: "hidden",
            background: "linear-gradient(135deg, #111318 0%, #16181D 60%, #1a0a0b 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-120px",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(230,57,70,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#e63946",
                marginBottom: "1.5rem",
                background: "rgba(230,57,70,0.08)",
                border: "1px solid rgba(230,57,70,0.3)",
                padding: "0.4rem 1rem",
                borderRadius: "3px",
              }}
            >
              Nouveau service — Reprogrammation à distance
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ display: "block", color: "#e63946" }}>N.LINK</span>
              <span style={{ display: "block", color: "#f5f5f5", fontSize: "0.45em", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
                NOTRE EXPERTISE DANS VOTRE ATELIER
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontSize: "1.15rem",
                color: "#a0a0a0",
                lineHeight: 1.8,
                maxWidth: "700px",
                margin: "0 auto 2.5rem",
              }}
            >
              ACE PROG met en place une solution de reprogrammation à distance afin de faciliter
              les opérations de ses clients. Cette solution consiste en la mise en place d&apos;un
              boîtier au sein de votre atelier, relié directement à notre service, vous permettant
              d&apos;effectuer vos prestations rapidement, sans être tributaire d&apos;un prestataire
              et en réduisant vos coûts.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
              <a
                href="#contact-nlink"
                style={{
                  display: "inline-block",
                  background: "#e63946",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "1rem 2.5rem",
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
                Nous contacter
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Avantages ────────────────────────────────────────────────────── */}
        <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "3.5rem",
            }}
          >
            AVANTAGES DU <span style={{ color: "#e63946" }}>N.LINK</span>
          </motion.h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {avantages.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  background: "#22252E",
                  border: "1px solid #3D4250",
                  borderRadius: "10px",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e63946";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(230,57,70,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#3D4250";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "#e63946",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#a0a0a0", lineHeight: 1.75, fontSize: "0.95rem" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Package ──────────────────────────────────────────────────────── */}
        <section style={{ padding: "5rem 2rem", background: "#111318" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                textAlign: "center",
                marginBottom: "3.5rem",
              }}
            >
              PACKAGE <span style={{ color: "#e63946" }}>N.LINK</span>
            </motion.h2>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}
              className="lg:grid-cols-2"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                  background: "#22252E",
                  border: "2px solid #e63946",
                  borderRadius: "12px",
                  padding: "2.5rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 900,
                    color: "#e63946",
                    marginBottom: "0.5rem",
                    lineHeight: 1,
                  }}
                >
                  2 500 €
                </p>
                <p style={{ color: "#777b88", fontFamily: "var(--font-body)", marginBottom: "2rem", fontSize: "0.9rem" }}>
                  Pack complet tout inclus
                </p>
                <div style={{ textAlign: "left" }}>
                  {packageIncludes.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        marginBottom: "0.9rem",
                        paddingBottom: "0.9rem",
                        borderBottom: "1px solid #2C303A",
                      }}
                    >
                      <span style={{ color: "#e63946", fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                      <span style={{ fontFamily: "var(--font-body)", color: "#f0f1f5", fontSize: "0.95rem" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <div
                  style={{
                    background: "#22252E",
                    border: "1px solid #3D4250",
                    borderRadius: "10px",
                    padding: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#a0a0a0",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Tarif des fichiers — Dégressif
                  </h3>
                  <p style={{ color: "#b0b4c0", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    ACE PROG effectue un suivi de vos fichiers avec les paliers atteints.
                    Plus vous travaillez, moins c&apos;est cher.
                  </p>
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.range}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid #2C303A",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-body)", color: "#b0b4c0", fontSize: "0.9rem" }}>
                        {tier.range}
                      </span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#e63946" }}>
                        {tier.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "rgba(230,57,70,0.06)",
                    border: "1px solid rgba(230,57,70,0.25)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#e63946",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Jusqu&apos;à 50% d&apos;économie mensuelle
                  </p>
                  <p style={{ color: "#b0b4c0", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    Coût moyen prestataire externe : 180 à 250€ par intervention.
                    Avec N.LINK : 150 à 80€. Marge améliorée de +50%.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Prestataire vs N.LINK ─────────────────────────────────────────── */}
        <section style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            PRESTATAIRE VS <span style={{ color: "#e63946" }}>N.LINK</span>
          </motion.h2>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}
            className="md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "#22252E",
                border: "1px solid #3D4250",
                borderRadius: "10px",
                padding: "2rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#777b88",
                  marginBottom: "1.5rem",
                }}
              >
                Prestataire externe
              </h3>
              {prestaDisadvantages.map((item) => (
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
                  <span style={{ color: "#555", fontSize: "1rem", flexShrink: 0 }}>✕</span>
                  <span style={{ fontFamily: "var(--font-body)", color: "#777b88", fontSize: "0.95rem" }}>{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: "#22252E",
                border: "2px solid #e63946",
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 0 40px rgba(230,57,70,0.1)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#e63946",
                  marginBottom: "1.5rem",
                }}
              >
                N.LINK — ACE PROG
              </h3>
              {nlinkAdvantages.map((item) => (
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
                  <span style={{ color: "#e63946", fontSize: "1rem", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-body)", color: "#f0f1f5", fontSize: "0.95rem" }}>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section style={{ padding: "5rem 2rem", background: "#111318" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                marginBottom: "1.5rem",
              }}
            >
              Un partenariat <span style={{ color: "#e63946" }}>simple et rentable</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ color: "#a0a0a0", lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.5rem" }}
            >
              Notre objectif est de permettre aux professionnels de développer facilement une activité
              rentable autour de la reprogrammation automobile, avec un support technique réactif et
              des solutions adaptées aux exigences du terrain.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ color: "#f0f1f5", lineHeight: 1.85, fontSize: "1rem", fontWeight: 600, marginBottom: "3rem" }}
            >
              Vous êtes garagiste ou professionnel de l&apos;automobile ?
              Contactez-nous pour intégrer un boîtier N.LINK dans votre atelier et
              proposer un service de reprogrammation performant à vos clients.
            </motion.p>

            <motion.div
              id="contact-nlink"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="nlink-cta-btns"
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <a
                href="tel:0658220224"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#e63946",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "1rem 2rem",
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
                📞 06 58 22 02 24
              </a>

              <a
                href="mailto:contact@aceprog.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  color: "#f5f5f5",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "1rem 2rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  border: "1px solid rgba(245,245,245,0.3)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e63946";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(230,57,70,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,245,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                ✉ contact@aceprog.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ marginTop: "2.5rem" }}
            >
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#555",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#e63946")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#555")}
              >
                ← Retour au site
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
