"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import FranceMap from "@/components/FranceMap";

const expertisePoints = [
  "Diagnostic de pointe via outils professionnels",
  "Intervention directe sur les cartographies ECU",
  "Optimisation performance, couple et consommation",
  "Maîtrise du protocole CAN bus et des calculateurs",
  "Approche scientifique, rigoureuse et sur-mesure",
];

export default function About() {
  return (
    <section
      id="apropos"
      style={{
        padding: "7rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <SectionHeader
        tag="Qui Sommes-Nous ?"
        title="L'Alliance entre Ingénierie et Performance"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
        }}
        className="lg:grid-cols-2"
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              color: "#a0a0a0",
              lineHeight: 1.9,
              marginBottom: "1.5rem",
              fontSize: "1.05rem",
            }}
          >
            La reprogrammation moteur et l&apos;électronique automobile
            représentent aujourd&apos;hui l&apos;alliance parfaite entre
            ingénierie de précision, performance et innovation technologique.
            Bien loin d&apos;une simple intervention mécanique, ce métier
            s&apos;inscrit dans une approche scientifique avancée, où chaque
            paramètre est analysé, optimisé et calibré avec rigueur.
          </p>

          <p
            style={{
              color: "#a0a0a0",
              lineHeight: 1.9,
              marginBottom: "1.5rem",
              fontSize: "1.05rem",
            }}
          >
            Au cœur de cette discipline se trouve l&apos;ECU (Engine Control
            Unit), véritable cerveau du véhicule. Grâce à des outils de
            diagnostic de pointe et des logiciels spécialisés, la
            reprogrammation consiste à intervenir directement sur les
            cartographies moteur afin d&apos;optimiser les performances,
            améliorer l&apos;efficacité énergétique ou adapter le comportement
            du véhicule aux besoins spécifiques du conducteur.
          </p>

          <p
            style={{
              color: "#a0a0a0",
              lineHeight: 1.9,
              marginBottom: "2.5rem",
              fontSize: "1.05rem",
            }}
          >
            Cette expertise implique une compréhension approfondie des systèmes
            électroniques embarqués, de la communication CAN bus, de la sécurité
            des calculateurs et des contraintes mécaniques propres à chaque
            véhicule.
          </p>

          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {expertisePoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  color: "#f5f5f5",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                }}
              >
                <span style={{ color: "#e63946", flexShrink: 0, marginTop: "2px" }}>▶</span>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              background: "rgba(230,57,70,0.06)",
              border: "1px solid rgba(230,57,70,0.2)",
              borderRadius: "6px",
              padding: "0.75rem 1.25rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "#e63946", fontSize: "1rem" }}>🚗</span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f0f1f5",
                margin: 0,
              }}
            >
              Tous nos services sont disponibles en itinérance dans vos ateliers
            </p>
          </div>
          <div
            style={{
              background: "#22252E",
              border: "1px solid #3D4250",
              borderRadius: "8px",
              padding: "2rem",
            }}
          >
            <FranceMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
