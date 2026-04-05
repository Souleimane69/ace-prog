"use client";

import { useEffect, useRef } from "react";
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

const tools = [
  { name: "KESS V3 / KTAG", level: 95 },
  { name: "MPPS / PCMflash", level: 88 },
  { name: "WinOLS / TunerPro", level: 90 },
  { name: "Diagnostic multimarques", level: 92 },
  { name: "Oscilloscope Auto", level: 80 },
];

function ToolBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          setTimeout(() => {
            if (el) el.style.width = `${level}%`;
          }, delay * 1000);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el.parentElement!);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "#f5f5f5",
            fontWeight: 600,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
            color: "#e63946",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "4px",
          background: "#2C303A",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(to right, #e63946, #c0392b)",
            borderRadius: "2px",
            transition: "width 1s ease",
          }}
        />
      </div>
    </div>
  );
}

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

        {/* Tools */}
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
              marginBottom: "2rem",
            }}
          >
            Outils &amp; Technologies
          </h3>

          {tools.map((tool, i) => (
            <ToolBar
              key={tool.name}
              name={tool.name}
              level={tool.level}
              delay={i * 0.1}
            />
          ))}

          {/* Tech badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #2C303A",
            }}
          >
            {["OBD2", "CAN Bus", "ECU", "K-Line", "ISO 15765", "UDS"].map(
              (badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#e63946",
                    background: "rgba(230,57,70,0.08)",
                    border: "1px solid rgba(230,57,70,0.3)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "3px",
                  }}
                >
                  {badge}
                </span>
              )
            )}
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
