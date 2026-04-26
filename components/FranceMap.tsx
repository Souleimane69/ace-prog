"use client";

import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

// GeoJSON départements France (source publique, version simplifiée)
const GEO_URL =
  "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson";

// ─── Données ─────────────────────────────────────────────────────────────────
// Association code département → id technicien (ARA = 12 depts)
// TEMPORAIRE — à mettre à jour avec la vraie répartition
const DEPT_TO_TECH: Record<string, number> = {
  "01": 1, // Ain
  "03": 1, // Allier
  "42": 1, // Loire
  "69": 1, // Rhône (Lyon)
  "74": 1, // Haute-Savoie
  "15": 2, // Cantal
  "43": 2, // Haute-Loire
  "63": 2, // Puy-de-Dôme
  "07": 3, // Ardèche
  "26": 3, // Drôme
  "38": 3, // Isère
  "73": 3, // Savoie
};

interface Tech {
  id: number;
  initials: string;
  name: string;
  zone: string;
  color: string;
  hoverColor: string;
  departments: string[];
  phone: string;
  email: string;
  specialty: string;
  availability: string;
}

const TECHNICIANS: Tech[] = [
  {
    id: 1,
    initials: "AP",
    name: "ACE PROG",
    zone: "Zone Nord",
    color: "#e63946",
    hoverColor: "#ff5a66",
    departments: ["Ain (01)", "Allier (03)", "Loire (42)", "Rhône (69)", "Haute-Savoie (74)"],
    phone: "0658220224",
    email: "contact@aceprog.com",
    specialty: "Reprogrammation Stage 1 & 2, véhicules sport",
    availability: "Lun – Ven : 8h – 18h",
  },
  {
    id: 2,
    initials: "AP",
    name: "ACE PROG",
    zone: "Zone Centre",
    color: "#ff8660",
    hoverColor: "#ffaa88",
    departments: ["Cantal (15)", "Haute-Loire (43)", "Puy-de-Dôme (63)"],
    phone: "0658220224",
    email: "contact@aceprog.com",
    specialty: "Diagnostic électronique, calculateurs",
    availability: "Lun – Ven : 8h – 18h",
  },
  {
    id: 3,
    initials: "AP",
    name: "ACE PROG",
    zone: "Zone Sud-Est & Alpes",
    color: "#c0392b",
    hoverColor: "#d44a3b",
    departments: ["Ardèche (07)", "Drôme (26)", "Isère (38)", "Savoie (73)"],
    phone: "0658220224",
    email: "contact@aceprog.com",
    specialty: "Optimisation performance, véhicules 4×4",
    availability: "Lun – Sam : 8h – 19h",
  },
];

// ─── Fiche contact technicien ────────────────────────────────────────────────
function TechCard({ tech, onClose }: { tech: Tech; onClose: () => void }) {
  const scrollToContact = () => {
    onClose();
    const el = document.querySelector("#contact") as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.97 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        top: "0.75rem",
        right: "0.75rem",
        width: 230,
        background: "rgba(14,16,20,0.98)",
        border: `1px solid ${tech.color}`,
        borderRadius: "10px",
        padding: "1.1rem",
        boxShadow: `0 12px 48px rgba(0,0,0,0.6), 0 0 24px ${tech.color}18`,
        zIndex: 30,
      }}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: "absolute",
          top: "0.6rem",
          right: "0.6rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#666",
          fontSize: "0.9rem",
          lineHeight: 1,
          padding: "4px",
          borderRadius: "3px",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#f0f1f5")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#666")}
      >
        ✕
      </button>

      {/* Avatar */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${tech.color}, ${tech.hoverColor})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem",
          fontWeight: 800,
          color: "#fff",
          marginBottom: "0.7rem",
          boxShadow: `0 0 16px ${tech.color}55`,
        }}
      >
        {tech.initials}
      </div>

      {/* Zone */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.5rem",
          color: tech.color,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "0.2rem",
        }}
      >
        {tech.zone}
      </span>

      {/* Nom */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 800,
          color: "#f0f1f5",
          marginBottom: "0.75rem",
          letterSpacing: "0.02em",
        }}
      >
        {tech.name}
      </p>

      <div style={{ height: 1, background: "#2C303A", marginBottom: "0.75rem" }} />

      {/* Spécialité */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          color: "#b0b4c0",
          lineHeight: 1.55,
          marginBottom: "0.75rem",
        }}
      >
        {tech.specialty}
      </p>

      {/* Coordonnées */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.9rem" }}>
        <a
          href={`tel:${tech.phone.replace(/\s/g, "")}`}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <span style={{ color: tech.color, fontSize: "0.85rem" }}>📞</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#f0f1f5" }}>
            {tech.phone}
          </span>
        </a>
        <a
          href={`mailto:${tech.email}`}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <span style={{ color: tech.color, fontSize: "0.85rem" }}>✉</span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "#f0f1f5",
              wordBreak: "break-all",
            }}
          >
            {tech.email}
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.82rem" }}>🕐</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#777b88" }}>
            {tech.availability}
          </span>
        </div>
      </div>

      {/* Départements */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.9rem" }}>
        {tech.departments.map((d) => (
          <span
            key={d}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              color: "#b0b4c0",
              background: "#1A1C22",
              border: "1px solid #2C303A",
              padding: "2px 6px",
              borderRadius: "3px",
            }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={scrollToContact}
        style={{
          width: "100%",
          background: tech.color,
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.65rem",
          borderRadius: "4px",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = tech.hoverColor;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${tech.color}55`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = tech.color;
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        Prendre rendez-vous →
      </button>
    </motion.div>
  );
}

// ─── Composant carte ─────────────────────────────────────────────────────────
type Position = { coordinates: [number, number]; zoom: number };

const DEFAULT_POSITION: Position = {
  coordinates: [2.5, 46.5], // centre géographique France
  zoom: 1,
};

export default function FranceMap() {
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeTech = TECHNICIANS.find((t) => t.id === activeId) ?? null;

  const handleMoveEnd = useCallback((pos: Position) => {
    setPosition(pos);
  }, []);

  const getColor = (code: string, hovered: boolean) => {
    const techId = DEPT_TO_TECH[code];
    if (!techId) return "#22252E";
    const tech = TECHNICIANS.find((t) => t.id === techId)!;
    if (hovered) return tech.hoverColor;
    if (activeId !== null && activeId !== techId) return tech.color; // dimmed via opacity
    return tech.color;
  };

  const getOpacity = (code: string) => {
    const techId = DEPT_TO_TECH[code];
    if (!techId) return 0.45;
    if (activeId === null) return 0.82;
    return activeId === techId ? 0.95 : 0.28;
  };

  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.95rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#b0b4c0",
          marginBottom: "1rem",
        }}
      >
        Zone d&apos;intervention — Toute la France
      </h3>

      {/* Conteneur carte */}
      <div
        style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#0d0f13",
          border: "1px solid #3D4250",
        }}
      >
        {/* Indications */}
        <div
          style={{
            position: "absolute",
            top: "0.6rem",
            left: "0.6rem",
            fontFamily: "var(--font-display)",
            fontSize: "0.48rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#555",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          Scroll pour zoomer · Clic pour contacter
        </div>

        {/* Boutons zoom */}
        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            left: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            zIndex: 10,
          }}
        >
          {[
            { label: "+", delta: 1 },
            { label: "−", delta: -1 },
            { label: "⌂", delta: 0 }, // reset
          ].map(({ label, delta }) => (
            <button
              key={label}
              title={delta === 0 ? "Recentrer sur la France" : label === "+" ? "Zoomer" : "Dézoomer"}
              onClick={() => {
                if (delta === 0) {
                  setPosition(DEFAULT_POSITION);
                } else {
                  setPosition((p) => ({
                    ...p,
                    zoom: Math.max(1, Math.min(16, p.zoom + delta)),
                  }));
                }
              }}
              style={{
                width: 28,
                height: 28,
                background: "rgba(34,37,46,0.9)",
                border: "1px solid #3D4250",
                borderRadius: "4px",
                color: "#f0f1f5",
                fontSize: label === "⌂" ? "0.75rem" : "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, border-color 0.2s",
                fontFamily: "monospace",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#e6394622";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e63946";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,37,46,0.9)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#3D4250";
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Carte */}
        <ComposableMap
          projection="geoConicConformal"
          projectionConfig={{
            parallels: [44, 49],
            rotate: [-3, 0, 0],
            scale: 2600,
            center: [2.5, 46.5],
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const code = geo.properties?.code as string;
                  const techId = DEPT_TO_TECH[code];
                  const isARA = Boolean(techId);
                  const opacity = getOpacity(code);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: getColor(code, false),
                          stroke: "#16181D",
                          strokeWidth: 0.4,
                          opacity,
                          outline: "none",
                          cursor: isARA ? "pointer" : "default",
                          transition: "opacity 0.25s ease",
                        },
                        hover: {
                          fill: isARA ? getColor(code, true) : "#2C303A",
                          stroke: isARA ? "rgba(255,255,255,0.3)" : "#16181D",
                          strokeWidth: isARA ? 1 : 0.4,
                          opacity: isARA ? 0.97 : 0.5,
                          outline: "none",
                          cursor: isARA ? "pointer" : "default",
                        },
                        pressed: {
                          fill: isARA ? getColor(code, true) : "#22252E",
                          outline: "none",
                        },
                      }}
                      onClick={() => {
                        if (isARA) {
                          setActiveId((prev) => (prev === techId ? null : techId));
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Fiche technicien */}
        <AnimatePresence>
          {activeTech && (
            <TechCard
              key={activeTech.id}
              tech={activeTech}
              onClose={() => setActiveId(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Légende cliquable */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        {TECHNICIANS.map((tech) => (
          <button
            key={tech.id}
            onClick={() => setActiveId((prev) => (prev === tech.id ? null : tech.id))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: activeId === tech.id ? `${tech.color}18` : "transparent",
              border: `1px solid ${activeId === tech.id ? tech.color : "#3D4250"}`,
              borderRadius: "20px",
              cursor: "pointer",
              padding: "0.3rem 0.75rem",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: tech.color,
                boxShadow: activeId === tech.id ? `0 0 8px ${tech.color}` : "none",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: activeId === tech.id ? "#f0f1f5" : "#b0b4c0",
                transition: "color 0.2s",
              }}
            >
              {tech.zone}
            </span>
          </button>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.75rem",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22252E",
              border: "1px solid #3D4250",
            }}
          />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#555" }}>
            Hors zone
          </span>
        </div>
      </div>
    </div>
  );
}
