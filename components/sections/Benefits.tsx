import SectionHeader from "@/components/ui/SectionHeader";
import BenefitCard from "@/components/ui/BenefitCard";

const benefits = [
  {
    icon: "⚡",
    title: "Gain de Performance",
    desc: "Puissance et couple optimisés pour des accélérations plus vives et une conduite plus dynamique.",
  },
  {
    icon: "🚗",
    title: "Comportement Amélioré",
    desc: "Réponse moteur affinée, agrément de conduite supérieur et comportement adapté à votre style.",
  },
  {
    icon: "🔒",
    title: "Fiabilité & Sécurité",
    desc: "Chaque intervention respecte les limites mécaniques du moteur. Sauvegarde du fichier d'origine systématique.",
  },
  {
    icon: "⚙️",
    title: "Approche Sur-Mesure",
    desc: "Votre véhicule, vos besoins, vos objectifs. Pas de solution générique — chaque projet est unique.",
  },
  {
    icon: "✅",
    title: "Qualité Professionnelle",
    desc: "Matériel certifié, méthodes rigoureuses et suivi post-intervention pour votre tranquillité d'esprit.",
  },
];

const reassurances = [
  "✓ Sauvegarde du fichier d'origine",
  "✓ Matériel certifié professionnel",
  "✓ Intervention sécurisée",
  "✓ Garantie du travail effectué",
  "✓ Compatible contrôle technique",
];

export default function Benefits() {
  return (
    <section
      id="benefices"
      style={{
        padding: "7rem 2rem",
        background: "#111318",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <SectionHeader
          tag="Bénéfices"
          title="Ce que vous gagnez avec notre expertise"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {benefits.map((b, i) => (
            <BenefitCard
              key={b.title}
              icon={b.icon}
              title={b.title}
              desc={b.desc}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Reassurance strip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem 3rem",
            padding: "2rem",
            background: "#22252E",
            border: "1px solid #3D4250",
            borderRadius: "8px",
          }}
        >
          {reassurances.map((r) => (
            <span
              key={r}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#a0a0a0",
                letterSpacing: "0.03em",
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
