"use client";

import { motion } from "framer-motion";

interface Props {
  tag: string;
  title: string;
  center?: boolean;
}

export default function SectionHeader({ tag, title, center = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: center ? "center" : "left",
        marginBottom: "4rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: "var(--font-display)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#e63946",
          marginBottom: "1rem",
        }}
      >
        {tag}
      </span>
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 800,
          color: "#f5f5f5",
          lineHeight: 1.15,
          marginBottom: "1.25rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: "60px",
          height: "3px",
          background: "#e63946",
          margin: center ? "0 auto" : "0",
        }}
      />
    </motion.div>
  );
}
