"use client";

import { motion } from "framer-motion";

interface Props {
  icon: string;
  title: string;
  desc: string;
  delay?: number;
}

export default function BenefitCard({ icon, title, desc, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#22252E",
        border: "1px solid #3D4250",
        borderRadius: "8px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        transition: "border-color 0.3s ease",
        cursor: "default",
      }}
      whileHover={{
        y: -6,
        borderColor: "#e63946",
        boxShadow: "0 0 20px rgba(230,57,70,0.15)",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
      >
        {icon}
      </motion.div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "#f5f5f5",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#a0a0a0",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}
