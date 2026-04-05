"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  icon: React.ReactNode;
  title: string;
  preview: string;
  detail: string;
  delay?: number;
}

export default function ServiceCard({ icon, title, preview, detail, delay = 0 }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#22252E",
        border: open ? "1px solid #e63946" : "1px solid #3D4250",
        borderRadius: "8px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        cursor: "default",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 0 24px rgba(230,57,70,0.25)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          background: "rgba(230,57,70,0.1)",
          border: "1px solid rgba(230,57,70,0.3)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e63946",
          fontSize: "1.5rem",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#f5f5f5",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </h3>

      <p style={{ color: "#a0a0a0", fontSize: "0.95rem", lineHeight: 1.7 }}>
        {preview}
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                color: "#a0a0a0",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                borderTop: "1px solid #2C303A",
                paddingTop: "1rem",
              }}
            >
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          alignSelf: "flex-start",
          background: "none",
          border: "1px solid #3D4250",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#e63946",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          transition: "border-color 0.2s, background 0.2s",
          marginTop: "auto",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#e63946";
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(230,57,70,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#3a3a3a";
          (e.currentTarget as HTMLButtonElement).style.background = "none";
        }}
      >
        {open ? "Réduire" : "En savoir plus"}
      </button>
    </motion.article>
  );
}
