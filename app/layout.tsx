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

export const metadata: Metadata = {
  title: "Ace Prog — Reprogrammation Moteur & Électronique Automobile",
  description:
    "Expert en reprogrammation ECU et électronique automobile en Auvergne-Rhône-Alpes. Performance, précision et savoir-faire haut de gamme.",
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
