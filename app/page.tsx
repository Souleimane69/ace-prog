import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Actualites from "@/components/sections/Actualites";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Ace Prog — Reprogrammation Moteur, Diagnostic & Électronique Automobile",
  description:
    "Ace Prog : expert en reprogrammation moteur (Stage 1, 2, 3, E85), diagnostic électronique, clonage calculateur ECU, réparation BSI/UCH/BCM, clés et solution N.LINK. Intervention en itinérance partout en France.",
  alternates: {
    canonical: "https://aceprog.com",
  },
  openGraph: {
    url: "https://aceprog.com",
    title: "Ace Prog — Reprogrammation Moteur & Électronique Automobile",
    description:
      "Reprogrammation moteur Stage 1/2/3, E85, clonage calculateur, diagnostic ECU et N.LINK. Partout en France en itinérance.",
  },
};

export default function Home() {
  const posts = getPosts();
  const featuredPost = posts.find((p) => p.featured) ?? null;
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero featuredPost={featuredPost} />
        <Ticker />
        <About />
        <Services />
        <Actualites posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
