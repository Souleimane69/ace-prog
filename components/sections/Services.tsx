import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    icon: "⚙️",
    title: "Reprogrammation Moteur",
    preview:
      "Optimisation des cartographies ECU pour libérer le potentiel de votre moteur en puissance, couple et réponse à l'accélération.",
    detail:
      "Nous intervenons directement sur les paramètres d'injection, de turbo, d'allumage et de régimes. Chaque reprogrammation est réalisée sur mesure après une analyse complète du fichier d'origine, avec sauvegarde systématique. Compatible essence, diesel, hybride.",
  },
  {
    icon: "🔍",
    title: "Diagnostic Électronique",
    preview:
      "Lecture et analyse approfondie des codes défauts, capteurs et systèmes embarqués via équipement de pointe.",
    detail:
      "Utilisation d'outils de diagnostic multimarques professionnels. Analyse des flux de données en temps réel, identification des défaillances cachées, rapport détaillé remis après intervention. Indispensable avant toute reprogrammation.",
  },
  {
    icon: "📈",
    title: "Optimisation des Performances",
    preview:
      "Gains mesurables en puissance et couple. Stage 1, Stage 2 et solutions sur-mesure selon vos objectifs.",
    detail:
      "Chaque cartographie est développée et testée pour garantir des gains significatifs sans compromettre la fiabilité mécanique. Nous calibrons également la consommation pour ceux qui recherchent plus d'efficacité énergétique.",
  },
  {
    icon: "🧩",
    title: "Intervention sur Calculateurs",
    preview:
      "Remplacement, initialisation et mise à jour de calculateurs (BSI, UCH, ABS, airbag...) avec programmation clé en main.",
    detail:
      "Nous prenons en charge la reprogrammation de tous types de calculateurs : moteur, boîte de vitesses, tableau de bord, éclairage. Codage précis pour assurer la compatibilité totale avec l'architecture électronique du véhicule.",
  },
  {
    icon: "🎯",
    title: "Prestations Personnalisées",
    preview:
      "Chaque véhicule est un projet unique. Nous concevons des solutions spécifiques à vos besoins et à votre usage.",
    detail:
      "Qu'il s'agisse de préparation piste, de confort autoroutier, d'adaptation sportive ou de contraintes techniques particulières, nous étudions chaque demande individuellement pour proposer une solution optimale, fiable et sécurisée.",
  },
];

export default function Services() {
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              preview={s.preview}
              detail={s.detail}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
