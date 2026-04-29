import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VILLES } from "@/lib/villes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import Link from "next/link";

type Props = { params: Promise<{ ville: string }> };

export async function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = VILLES.find((v) => v.slug === slug);
  if (!ville) return {};

  const title = `Reprogrammation Moteur ${ville.name} — Ace Prog`;
  const description = `Ace Prog intervient à ${ville.name} (${ville.region}) pour la reprogrammation moteur ECU Stage 1, 2, 3, conversion E85, diagnostic électronique, clonage calculateur et clés automobile. Déplacement à domicile.`;

  return {
    title,
    description,
    keywords: [
      `reprogrammation moteur ${ville.name}`,
      `reprogrammation ECU ${ville.name}`,
      `stage 1 ${ville.name}`,
      `stage 2 ${ville.name}`,
      `conversion E85 ${ville.name}`,
      `diagnostic électronique ${ville.name}`,
      `clonage calculateur ${ville.name}`,
      `reprogrammation voiture ${ville.name}`,
      `ace prog ${ville.name}`,
      `reprogrammation ${ville.name}`,
      `technicien ECU ${ville.name}`,
      `optimisation moteur ${ville.name}`,
    ],
    alternates: {
      canonical: `https://aceprog.com/reprogrammation-moteur-${ville.slug}`,
    },
    openGraph: {
      url: `https://aceprog.com/reprogrammation-moteur-${ville.slug}`,
      title,
      description,
    },
  };
}

export default async function VillePage({ params }: Props) {
  const { ville: slug } = await params;
  const ville = VILLES.find((v) => v.slug === slug);
  if (!ville) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Reprogrammation Moteur ${ville.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Ace Prog",
      url: "https://aceprog.com",
      telephone: "+33658220224",
      email: "contact@aceprog.com",
    },
    areaServed: {
      "@type": "City",
      name: ville.name,
      containedInPlace: { "@type": "AdministrativeArea", name: ville.region },
    },
    description: `Reprogrammation moteur ECU, Stage 1/2/3, conversion E85, diagnostic électronique et clonage calculateur à ${ville.name}.`,
    url: `https://aceprog.com/reprogrammation-moteur-${ville.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
          Reprogrammation Moteur à{" "}
          <span className="text-red-500">{ville.name}</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Ace Prog intervient à <strong>{ville.name}</strong> et dans toute la région{" "}
          <strong>{ville.region}</strong> pour tous vos besoins en reprogrammation
          moteur et électronique automobile. Notre technicien se déplace directement
          chez vous ou dans votre garage.
        </p>

        <section className="mb-10">
          <h2 className="font-orbitron text-xl font-semibold text-white mb-4">
            Nos services à {ville.name}
          </h2>
          <ul className="space-y-3 text-gray-300">
            {[
              ["Reprogrammation ECU Stage 1", `Optimisation de la cartographie d'origine pour gagner en puissance et en couple à ${ville.name}.`],
              ["Reprogrammation Stage 2 & 3", "Pour véhicules modifiés mécaniquement — gains maximaux sur circuit ou usage quotidien."],
              ["Conversion Éthanol E85", `Adaptez votre moteur au carburant E85 disponible dans les stations de ${ville.region}.`],
              ["Clonage & Réparation Calculateur ECU", "Clonage de calculateurs moteur, BSI, UCH, BCM. Intervention sans immobilisation longue."],
              ["Diagnostic Électronique", "Lecture et effacement de codes défaut, analyse approfondie des systèmes moteur et habitacle."],
              ["Reproduction de Clé Automobile", "Perte totale, crochetage, programmation de clé — toutes marques."],
            ].map(([titre, desc]) => (
              <li key={titre} className="border border-gray-700 rounded-lg p-4 bg-black/30">
                <strong className="text-white block mb-1">{titre}</strong>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-orbitron text-xl font-semibold text-white mb-3">
            Pourquoi choisir Ace Prog à {ville.name} ?
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Technicien certifié qui se déplace à votre adresse</li>
            <li>Matériel professionnel — banc de flash ECU dédié</li>
            <li>Fichiers cartographiques sur mesure, pas des maps génériques</li>
            <li>Intervention rapide, souvent en moins de 2h</li>
            <li>Garantie satisfaction — retour à l&apos;origine possible à tout moment</li>
          </ul>
        </section>

        <section className="bg-red-600/10 border border-red-600/30 rounded-xl p-6 text-center">
          <h2 className="font-orbitron text-xl font-bold text-white mb-2">
            Demander un devis à {ville.name}
          </h2>
          <p className="text-gray-300 mb-4">
            Contactez-nous pour planifier une intervention à {ville.name} ou aux
            alentours.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Nous contacter
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
