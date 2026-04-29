import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VILLES } from "@/lib/villes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  const description = `Ace Prog intervient à ${ville.name} (${ville.departement}) : reprogrammation moteur Stage 1/2/3, conversion E85, diagnostic électronique, clonage calculateur ECU, réparation BSI/UCH, reproduction de clé, reprogrammation boîte DSG. Déplacement à domicile.`;

  return {
    title,
    description,
    keywords: [
      // Reprogrammation moteur
      `reprogrammation moteur ${ville.name}`,
      `reprogrammation ECU ${ville.name}`,
      `reprogrammation moteur ${ville.departement}`,
      `stage 1 ${ville.name}`,
      `stage 2 ${ville.name}`,
      `stage 3 ${ville.name}`,
      `optimisation moteur ${ville.name}`,
      `cartographie moteur ${ville.name}`,
      // E85
      `conversion E85 ${ville.name}`,
      `kit ethanol ${ville.name}`,
      `conversion éthanol ${ville.name}`,
      `E85 ${ville.name}`,
      // Diagnostic
      `diagnostic électronique ${ville.name}`,
      `diagnostic automobile ${ville.name}`,
      `diagnostic OBD ${ville.name}`,
      `valise diagnostic ${ville.name}`,
      // Calculateur / ECU
      `clonage calculateur ${ville.name}`,
      `réparation calculateur ${ville.name}`,
      `réparation ECU ${ville.name}`,
      `BSI ${ville.name}`,
      `UCH ${ville.name}`,
      `BCM ${ville.name}`,
      // Boîte DSG
      `reprogrammation boite DSG ${ville.name}`,
      `reprogrammation boite automatique ${ville.name}`,
      // Clés
      `reproduction clé automobile ${ville.name}`,
      `programmation clé ${ville.name}`,
      `clé perdue ${ville.name}`,
      `serrurier automobile ${ville.name}`,
      // N.LINK
      `reprogrammation distance ${ville.name}`,
      `N.LINK ${ville.name}`,
      // Général
      `ace prog ${ville.name}`,
      `technicien ECU ${ville.name}`,
      `préparateur automobile ${ville.name}`,
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
    name: `Reprogrammation Moteur & Électronique Automobile ${ville.name}`,
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
      containedInPlace: { "@type": "AdministrativeArea", name: `${ville.departement}, Auvergne-Rhône-Alpes` },
    },
    description: `Reprogrammation moteur Stage 1/2/3, conversion E85, diagnostic électronique, clonage calculateur ECU, réparation BSI/UCH/BCM, reprogrammation boîte DSG et reproduction de clé à ${ville.name}.`,
    url: `https://aceprog.com/reprogrammation-moteur-${ville.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services Ace Prog à ${ville.name}`,
      itemListElement: [
        "Reprogrammation Moteur Stage 1",
        "Reprogrammation Moteur Stage 2",
        "Reprogrammation Moteur Stage 3",
        "Conversion Éthanol E85",
        "Diagnostic Électronique",
        "Clonage Calculateur ECU",
        "Réparation BSI / UCH / BCM",
        "Reprogrammation Boîte DSG / Automatique",
        "Reproduction et Programmation de Clé Automobile",
        "N.LINK — Reprogrammation à Distance",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  const services = [
    {
      titre: "Reprogrammation Moteur Stage 1 / 2 / 3",
      mots: `reprogrammation ECU, stage 1, stage 2, stage 3, cartographie moteur, optimisation moteur ${ville.name}`,
      desc: `Optimisation de la cartographie d'origine pour libérer le potentiel de votre moteur. Du stage 1 (usage quotidien) au stage 3 (modifications mécaniques poussées), chaque reprogrammation est faite sur mesure à ${ville.name}.`,
    },
    {
      titre: "Conversion Éthanol E85",
      mots: `conversion E85, kit éthanol, carburant éthanol ${ville.name}`,
      desc: `Roulez à l'éthanol E85 disponible dans les stations du ${ville.departement}. Économies sur le carburant, gain de couple et de puissance. Conversion légale avec optimisation cartographique.`,
    },
    {
      titre: "Diagnostic Électronique Automobile",
      mots: `diagnostic OBD, valise diagnostic, codes défaut, ${ville.name}`,
      desc: `Lecture et effacement de codes défaut, analyse approfondie des calculateurs moteur, habitacle, ABS, airbag. Intervention à ${ville.name} et environs avec matériel professionnel.`,
    },
    {
      titre: "Clonage & Réparation Calculateur ECU / BSI / UCH / BCM",
      mots: `clonage calculateur, réparation ECU, BSI, UCH, BCM, ${ville.name}`,
      desc: `Clonage de calculateurs moteur et habitacle sans passer par le constructeur. Réparation BSI, UCH, BCM sur toutes marques. Idéal en cas de panne ou de remplacement d'occasion à ${ville.name}.`,
    },
    {
      titre: "Reprogrammation Boîte DSG / Automatique",
      mots: `reprogrammation DSG, boîte automatique, TCU, ${ville.name}`,
      desc: `Optimisation des passages de vitesses, suppression du mode protecteur, amélioration de la réactivité. Compatible boîtes DSG7, DSG6, ZF, Aisin à ${ville.name}.`,
    },
    {
      titre: "Reproduction & Programmation de Clé Automobile",
      mots: `clé perdue, reproduction clé, programmation clé, serrurier auto, ${ville.name}`,
      desc: `Perte totale, télécommande HS, ajout d'une clé supplémentaire. Intervention rapide à ${ville.name} toutes marques sans passage en concession.`,
    },
    {
      titre: "N.LINK — Reprogrammation à Distance",
      mots: `reprogrammation distance, boîtier connecté, N.LINK, ${ville.name}`,
      desc: `Solution N.LINK : votre garage à ${ville.name} peut proposer la reprogrammation moteur à ses clients sans se déplacer, via un boîtier connecté piloté par nos techniciens.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-2">
          {ville.departement} — Auvergne-Rhône-Alpes
        </p>
        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
          Reprogrammation Moteur &amp; Électronique Automobile à{" "}
          <span className="text-red-500">{ville.name}</span>
        </h1>
        <p className="text-gray-300 text-lg mb-10">
          Ace Prog intervient à <strong>{ville.name}</strong> et dans tout le{" "}
          <strong>{ville.departement}</strong> pour la reprogrammation moteur,
          la conversion E85, le diagnostic électronique, le clonage de
          calculateurs et bien plus. Notre technicien se déplace directement
          chez vous ou dans votre atelier.
        </p>

        <section className="mb-10">
          <h2 className="font-orbitron text-xl font-semibold text-white mb-5">
            Nos services à {ville.name}
          </h2>
          <div className="space-y-4">
            {services.map(({ titre, mots, desc }) => (
              <div
                key={titre}
                className="border border-gray-700 rounded-xl p-5 bg-black/30"
              >
                <h3 className="text-white font-semibold text-lg mb-1">{titre}</h3>
                <p className="text-gray-400 text-xs mb-2 italic">{mots}</p>
                <p className="text-gray-300 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-orbitron text-xl font-semibold text-white mb-3">
            Pourquoi choisir Ace Prog à {ville.name} ?
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Technicien certifié qui se déplace à votre adresse dans le {ville.departement}</li>
            <li>Matériel professionnel — banc de flash ECU dédié</li>
            <li>Fichiers cartographiques sur mesure, pas des maps génériques</li>
            <li>Intervention rapide, souvent en moins de 2h sur place</li>
            <li>Retour à l&apos;origine possible à tout moment</li>
          </ul>
        </section>

        <section className="bg-red-600/10 border border-red-600/30 rounded-xl p-6 text-center">
          <h2 className="font-orbitron text-xl font-bold text-white mb-2">
            Demander un devis à {ville.name}
          </h2>
          <p className="text-gray-300 mb-4">
            Contactez-nous pour planifier une intervention à {ville.name} ou dans
            le {ville.departement}.
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
