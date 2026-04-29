export type Ville = {
  slug: string;
  name: string;
  region: string;
};

export const VILLES: Ville[] = [
  { slug: "lyon", name: "Lyon", region: "Auvergne-Rhône-Alpes" },
  { slug: "paris", name: "Paris", region: "Île-de-France" },
  { slug: "marseille", name: "Marseille", region: "Provence-Alpes-Côte d'Azur" },
  { slug: "toulouse", name: "Toulouse", region: "Occitanie" },
  { slug: "nice", name: "Nice", region: "Provence-Alpes-Côte d'Azur" },
  { slug: "nantes", name: "Nantes", region: "Pays de la Loire" },
  { slug: "montpellier", name: "Montpellier", region: "Occitanie" },
  { slug: "strasbourg", name: "Strasbourg", region: "Grand Est" },
  { slug: "bordeaux", name: "Bordeaux", region: "Nouvelle-Aquitaine" },
  { slug: "lille", name: "Lille", region: "Hauts-de-France" },
  { slug: "rennes", name: "Rennes", region: "Bretagne" },
  { slug: "reims", name: "Reims", region: "Grand Est" },
  { slug: "saint-etienne", name: "Saint-Étienne", region: "Auvergne-Rhône-Alpes" },
  { slug: "grenoble", name: "Grenoble", region: "Auvergne-Rhône-Alpes" },
  { slug: "dijon", name: "Dijon", region: "Bourgogne-Franche-Comté" },
  { slug: "angers", name: "Angers", region: "Pays de la Loire" },
  { slug: "toulon", name: "Toulon", region: "Provence-Alpes-Côte d'Azur" },
  { slug: "brest", name: "Brest", region: "Bretagne" },
  { slug: "tours", name: "Tours", region: "Centre-Val de Loire" },
  { slug: "caen", name: "Caen", region: "Normandie" },
  { slug: "metz", name: "Metz", region: "Grand Est" },
  { slug: "rouen", name: "Rouen", region: "Normandie" },
  { slug: "mulhouse", name: "Mulhouse", region: "Grand Est" },
  { slug: "perpignan", name: "Perpignan", region: "Occitanie" },
  { slug: "amiens", name: "Amiens", region: "Hauts-de-France" },
  { slug: "limoges", name: "Limoges", region: "Nouvelle-Aquitaine" },
  { slug: "clermont-ferrand", name: "Clermont-Ferrand", region: "Auvergne-Rhône-Alpes" },
  { slug: "aix-en-provence", name: "Aix-en-Provence", region: "Provence-Alpes-Côte d'Azur" },
  { slug: "nancy", name: "Nancy", region: "Grand Est" },
  { slug: "orléans", name: "Orléans", region: "Centre-Val de Loire" },
];
