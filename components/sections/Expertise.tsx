"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    num: "01",
    title: "Lecture & Diagnostic",
    desc: "Analyse complète des données ECU et lecture des cartographies d'origine via outils de pointe.",
  },
  {
    num: "02",
    title: "Analyse des Cartographies",
    desc: "Étude approfondie des paramètres d'injection, d'allumage, de suralimentation et de régimes moteur.",
  },
  {
    num: "03",
    title: "Calibration & Optimisation",
    desc: "Modification précise et sur-mesure des cartographies en fonction de vos objectifs de performance.",
  },
  {
    num: "04",
    title: "Tests & Validation",
    desc: "Vérification complète, tests en conditions réelles et validation finale avant livraison.",
  },
];

const equipmentHighlights = [
  {
    icon: "⚡",
    title: "Matériel de pointe",
    desc: "Nous investissons continuellement dans les équipements les plus récents et les plus performants du marché.",
  },
  {
    icon: "🏆",
    title: "Mieux équipés du secteur",
    desc: "Notre parc d'équipements nous place parmi les prestataires les mieux dotés en France pour la reprogrammation automobile.",
  },
  {
    icon: "🔬",
    title: "Technologies innovantes",
    desc: "Nous utilisons des solutions de dernière génération pour garantir précision, fiabilité et résultats optimaux sur chaque intervention.",
  },
];

export default function Expertise() {
  return (
    <section
      id="expertise"
      style={{
        padding: "7rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <SectionHeader
        tag="Expertise"
        title="Méthode. Précision. Technologie."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="lg:grid-cols-2"
      >
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#a0a0a0",
              marginBottom: "2rem",
            }}
          >
            Notre processus
          </h3>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "20px",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "linear-gradient(to bottom, #e63946, transparent)",
              }}
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: "2.5rem",
                  paddingLeft: "0.5rem",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#22252E",
                    border: "2px solid #e63946",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      color: "#e63946",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div style={{ paddingTop: "0.5rem" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#f5f5f5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ color: "#a0a0a0", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipment highlights */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: "#22252E",
            border: "1px solid #3D4250",
            borderRadius: "8px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
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
              marginBottom: "0.25rem",
            }}
          >
            Notre équipement
          </h3>

          {equipmentHighlights.map((item) => (
            <div key={item.title} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.6rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.icon}</span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#f5f5f5",
                    marginBottom: "0.4rem",
                  }}
                >
                  {item.title}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#a0a0a0", lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Ligne décorative */}
          <div
            style={{
              marginTop: "0.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #2C303A",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e63946",
            }}
          >
            Expert électronique automobile — Toute la France
          </div>
        </motion.div>
      </div>

      {/* Circuit strip */}
      <div
        style={{
          marginTop: "5rem",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #e63946, transparent)",
          opacity: 0.4,
        }}
      />
    </section>
  );
}
