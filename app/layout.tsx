import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import GlobalBackground from "@/components/GlobalBackground";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://aceprog.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ace Prog — Reprogrammation Moteur & Électronique Automobile",
    template: "%s | Ace Prog",
  },
  description:
    "Ace Prog, expert en reprogrammation moteur ECU, diagnostic électronique, clonage calculateur, conversion E85 et clés automobile. Intervention en itinérance partout en France.",
  keywords: [
    "ace prog",
    "aceprog",
    "reprogrammation moteur",
    "reprogrammation ECU",
    "reprogrammation moteur France",
    "stage 1 stage 2 stage 3",
    "conversion E85 ethanol",
    "diagnostic électronique automobile",
    "clonage calculateur",
    "réparation ECU",
    "N.LINK reprogrammation distance",
    "reprogrammation itinérant",
    "optimisation moteur",
    "BSI UCH BCM réparation",
    "rectification kilométrique",
    "reprogrammation boite DSG",
    "reproduction clé automobile",
  ],
  authors: [{ name: "Ace Prog", url: SITE_URL }],
  creator: "Ace Prog",
  publisher: "Ace Prog",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Ace Prog",
    title: "Ace Prog — Reprogrammation Moteur & Électronique Automobile",
    description:
      "Expert en reprogrammation ECU, clonage calculateur, conversion E85 et N.LINK. Intervention en itinérance partout en France.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ace Prog — Reprogrammation Moteur & Électronique Automobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace Prog — Reprogrammation Moteur & Électronique Automobile",
    description:
      "Expert en reprogrammation ECU, clonage calculateur, conversion E85 et N.LINK partout en France.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${orbitron.variable} ${rajdhani.variable}`}
    >
      <body>
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}
