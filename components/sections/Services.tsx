"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";

type Tab = "optimisation" | "reparation" | "cles" | "nlink";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "optimisation", label: "Optimisation", icon: "📈" },
  { id: "reparation", label: "Réparation / Clonage", icon: "🔧" },
  { id: "cles", label: "Clés", icon: "🔑" },
  { id: "nlink", label: "N.LINK", icon: "📡" },
];

const tabContent: Record<Tab, React.ReactNode> = {
  optimisation: (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {[
        {
          tag: "Stage 1",
          title: "Optimisation Stage 1",
          desc: "Reprogrammation de la cartographie d'origine pour libérer le potentiel moteur sans modification mécanique. Gains en puissance, couple et réponse à l'accélération.",
        },
        {
          tag: "Stage 2",
          title: "Optimisation Stage 2",
          desc: "Reprogrammation avancée conçue pour accompagner des modifications mécaniques complémentaires (filtre sport, downpipe, intercooler…). Résultats significatifs en puissance et couple.",
        },
        {
          tag: "Stage 3",
          title: "Optimisation Stage 3",
          desc: "Préparation haute performance pour usage intensif ou compétition. Intervention approfondie sur l'ensemble des paramètres moteur avec support technique dédié.",
        },
        {
          tag: "E85",
          title: "Conversion Éthanol E85",
          desc: "Conversion et optimisation moteur pour carburant éthanol E85. Réduction de consommation, amélioration de la puissance et diminution des émissions polluantes.",
        },
        {
          tag: "Diagnostic",
          title: "Diagnostic Approfondi",
          desc: "Lecture et analyse complète des codes défauts, flux de données en temps réel et systèmes embarqués via équipement professionnel multimarques. Rapport détaillé remis après intervention.",
        },
      ].map((item) => (
        <ServiceItem key={item.tag} tag={item.tag} title={item.title} desc={item.desc} />
      ))}
    </div>
  ),

  reparation: (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {[
        {
          tag: "Clonage",
          title: "Clonage de Calculateur",
          desc: "Clonage de calculateurs moteur et habitacle. Transfert de données sécurisé, garantie de compatibilité totale avec l'électronique d'origine du véhicule.",
        },
        {
          tag: "ECU",
          title: "Contrôle + Réparation ECU Moteur",
          desc: "Contrôle complet et réparation de l'ECU moteur. Diagnostics électroniques poussés, soudures CMS, remplacement de composants défaillants.",
        },
        {
          tag: "BSI/UCH",
          title: "Réparation FRM / UCH / BSI / BCM",
          desc: "Contrôle et réparation de tous types de boîtiers électroniques : FRM, UCH, BSI, BCM et calculateurs associés. Intervention précise sur composants.",
        },
        {
          tag: "Compteur",
          title: "Contrôle + Réparation Compteur",
          desc: "Diagnostic et réparation complète des compteurs de bord. Pixels défaillants, affichage, composants électroniques.",
        },
        {
          tag: "Kilométrage",
          title: "Rectification Kilométrique",
          desc: "Correction kilométrique sur présentation d'un justificatif officiel (facture de remplacement compteur, certificat d'expertise…). Intervention traçable et conforme.",
        },
        {
          tag: "Clonage km",
          title: "Clonage Compteur",
          desc: "Clonage complet de compteur de bord incluant les données kilométriques, sur justificatif. Service professionnel et sécurisé.",
        },
        {
          tag: "DSG",
          title: "Réparation Boîte DSG",
          desc: "Diagnostic et réparation de boîtes de vitesses DSG. Reprogrammation et remise en état de la mécatronique pour retrouver un fonctionnement optimal.",
        },
      ].map((item) => (
        <ServiceItem key={item.tag} tag={item.tag} title={item.title} desc={item.desc} />
      ))}
    </div>
  ),

  cles: (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            tag: "Double",
            title: "Reproduction Double de Clé",
            desc: "Création d'un double de clé à transpondeur ou clé codée pour votre véhicule. Intervention sur site, rapide et sécurisée.",
          },
          {
            tag: "Perte totale",
            title: "Reproduction en Cas de Perte Totale",
            desc: "Recréation complète d'une clé depuis l'ECU ou la serrure du véhicule en cas de perte totale de l'ensemble des clés. Aucune clé d'origine nécessaire.",
          },
          {
            tag: "Crochetage",
            title: "Crochetage de Serrure",
            desc: "Ouverture de serrure en cas d'oubli de clé à l'intérieur du véhicule. Intervention non destructive par technicien certifié.",
          },
        ].map((item) => (
          <ServiceItem key={item.tag} tag={item.tag} title={item.title} desc={item.desc} />
        ))}
      </div>
      <div
        style={{
          background: "rgba(230,57,70,0.07)",
          border: "1px solid rgba(230,57,70,0.25)",
          borderRadius: "6px",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <span style={{ color: "#e63946", flexShrink: 0, fontSize: "1.1rem" }}>⚠</span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "#b0b4c0",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Toutes ces prestations nécessitent la présentation d&apos;un{" "}
          <strong style={{ color: "#f0f1f5" }}>
            justificatif d&apos;identité + carte grise du véhicule
          </strong>{" "}
          lors de l&apos;intervention.
        </p>
      </div>
    </div>
  ),

  nlink: (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
        maxWidth: "800px",
      }}
      className="lg:grid-cols-2"
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#e63946",
            marginBottom: "1rem",
          }}
        >
          Solution Connectée
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 800,
            color: "#f0f1f5",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
          }}
        >
          N.LINK — Reprogrammation<br />à Distance
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "#a0a0a0",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
          }}
        >
          N.LINK est notre solution de reprogrammation moteur à distance. Grâce à un
          boîtier connecté installé dans votre atelier, bénéficiez de toute l&apos;expertise
          ACE Prog sans déplacement.
        </p>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {[
            "Économie sur les frais de déplacement",
            "Intervention rapide et flexible",
            "Accès à toutes nos cartographies",
            "Support technique en temps réel",
          ].map((p) => (
            <li key={p} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "#f0f1f5", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
              <span style={{ color: "#e63946", flexShrink: 0 }}>▶</span>
              {p}
            </li>
          ))}
        </ul>
        <Link
          href="/nlink"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#e63946",
            padding: "0.8rem 1.8rem",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Découvrir N.LINK →
        </Link>
      </div>
      <div
        style={{
          background: "#22252E",
          border: "1px solid #3D4250",
          borderRadius: "8px",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {[
          { icon: "📡", label: "Boîtier connecté" },
          { icon: "🔒", label: "Connexion sécurisée" },
          { icon: "⚡", label: "Intervention en quelques minutes" },
          { icon: "🛠️", label: "Tous véhicules compatibles" },
          { icon: "🇫🇷", label: "Disponible partout en France" },
        ].map((f) => (
          <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.25rem", width: "2rem", textAlign: "center" }}>{f.icon}</span>
            <span style={{ fontFamily: "var(--font-body)", color: "#f0f1f5", fontSize: "0.95rem" }}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

function ServiceItem({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "#22252E",
        border: "1px solid #3D4250",
        borderRadius: "8px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      whileHover={{
        borderColor: "rgba(230,57,70,0.5)",
        boxShadow: "0 4px 30px rgba(230,57,70,0.1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#e63946",
          background: "rgba(230,57,70,0.1)",
          padding: "0.2rem 0.6rem",
          borderRadius: "3px",
          alignSelf: "flex-start",
        }}
      >
        {tag}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#f0f1f5",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "#a0a0a0",
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<Tab>("optimisation");

  return (
    <section
      id="services"
      style={{
        padding: "7rem 2rem",
        background: "#111318",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader
          tag="Nos Services"
          title="Expertise Technique au Service de vos Performances"
        />

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            borderBottom: "1px solid #3D4250",
            paddingBottom: "0",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.85rem 1.5rem",
                color: activeTab === tab.id ? "#e63946" : "#a0a0a0",
                borderBottom: activeTab === tab.id ? "2px solid #e63946" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
