import type { Metadata } from "next";
import NLinkContent from "./NLinkContent";

export const metadata: Metadata = {
  title: "N.LINK — Reprogrammation Moteur à Distance | Ace Prog",
  description:
    "N.LINK par Ace Prog : solution de reprogrammation moteur à distance pour ateliers professionnels. Boîtier connecté, formation incluse, assistance 24h/24. Devenez autonome dans votre atelier.",
  keywords: [
    "N.LINK",
    "nlink ace prog",
    "reprogrammation moteur distance",
    "boitier reprogrammation atelier",
    "reprogrammation automobile professionnel",
    "ace prog nlink",
  ],
  alternates: {
    canonical: "https://aceprog.com/nlink",
  },
  openGraph: {
    url: "https://aceprog.com/nlink",
    title: "N.LINK — Reprogrammation Moteur à Distance | Ace Prog",
    description:
      "Solution de reprogrammation moteur à distance par boîtier connecté. Formation, assistance 24h/24 et tarifs dégressifs. Ace Prog.",
  },
};

export default function NLinkPage() {
  return <NLinkContent />;
}
