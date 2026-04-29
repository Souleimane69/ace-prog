import { VILLES } from "@/lib/villes";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "AutoRepair"],
        "@id": "https://aceprog.com/#business",
        name: "Ace Prog",
        alternateName: "AceProg",
        description:
          "Ace Prog est spécialisé dans la reprogrammation moteur ECU, le diagnostic électronique, le clonage de calculateurs, la conversion E85, les clés automobile et la solution de reprogrammation à distance N.LINK. Intervention en itinérance partout en France.",
        url: "https://aceprog.com",
        telephone: "+33658220224",
        email: "contact@aceprog.com",
        logo: "https://aceprog.com/logo.png",
        image: "https://aceprog.com/logo.png",
        priceRange: "€€",
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Auvergne-Rhône-Alpes",
            containedInPlace: { "@type": "Country", name: "France" },
          },
          ...VILLES.map((v) => ({
            "@type": "City",
            name: v.name,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: `${v.departement}, Auvergne-Rhône-Alpes`,
            },
          })),
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services Ace Prog",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Reprogrammation Moteur Stage 1",
                description:
                  "Optimisation de la cartographie ECU d'origine pour libérer le potentiel moteur sans modification mécanique.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Reprogrammation Moteur Stage 2",
                description:
                  "Reprogrammation avancée pour véhicules équipés de modifications mécaniques complémentaires.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Conversion Éthanol E85",
                description:
                  "Conversion et optimisation moteur pour carburant éthanol E85.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Clonage Calculateur ECU",
                description:
                  "Clonage de calculateurs moteur et habitacle, réparation ECU, BSI, UCH, BCM.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "N.LINK — Reprogrammation à Distance",
                description:
                  "Solution de reprogrammation moteur à distance par boîtier connecté dans votre atelier.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Reproduction et Programmation de Clés Automobile",
                description:
                  "Reproduction de clé, perte totale, crochetage de serrure pour tous véhicules.",
              },
            },
          ],
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://aceprog.com/#website",
        url: "https://aceprog.com",
        name: "Ace Prog",
        description:
          "Reprogrammation moteur, électronique automobile et N.LINK partout en France.",
        publisher: {
          "@id": "https://aceprog.com/#business",
        },
        inLanguage: "fr-FR",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
