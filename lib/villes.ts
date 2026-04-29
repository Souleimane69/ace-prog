export type Ville = {
  slug: string;
  name: string;
  departement: string;
};

// Uniquement Auvergne-Rhône-Alpes
export const VILLES: Ville[] = [
  // Rhône (69)
  { slug: "lyon", name: "Lyon", departement: "Rhône" },
  { slug: "villeurbanne", name: "Villeurbanne", departement: "Rhône" },
  { slug: "venissieux", name: "Vénissieux", departement: "Rhône" },
  { slug: "bron", name: "Bron", departement: "Rhône" },
  { slug: "caluire-et-cuire", name: "Caluire-et-Cuire", departement: "Rhône" },
  { slug: "decines-charpieu", name: "Décines-Charpieu", departement: "Rhône" },
  { slug: "mions", name: "Mions", departement: "Rhône" },
  // Isère (38)
  { slug: "grenoble", name: "Grenoble", departement: "Isère" },
  { slug: "vienne", name: "Vienne", departement: "Isère" },
  { slug: "bourgoin-jallieu", name: "Bourgoin-Jallieu", departement: "Isère" },
  { slug: "voiron", name: "Voiron", departement: "Isère" },
  // Loire (42)
  { slug: "saint-etienne", name: "Saint-Étienne", departement: "Loire" },
  { slug: "roanne", name: "Roanne", departement: "Loire" },
  // Ain (01)
  { slug: "bourg-en-bresse", name: "Bourg-en-Bresse", departement: "Ain" },
  { slug: "oyonnax", name: "Oyonnax", departement: "Ain" },
  // Drôme (26)
  { slug: "valence", name: "Valence", departement: "Drôme" },
  { slug: "romans-sur-isere", name: "Romans-sur-Isère", departement: "Drôme" },
  { slug: "montelimar", name: "Montélimar", departement: "Drôme" },
  // Ardèche (07)
  { slug: "aubenas", name: "Aubenas", departement: "Ardèche" },
  { slug: "annonay", name: "Annonay", departement: "Ardèche" },
  // Haute-Savoie (74)
  { slug: "annecy", name: "Annecy", departement: "Haute-Savoie" },
  { slug: "annemasse", name: "Annemasse", departement: "Haute-Savoie" },
  { slug: "thonon-les-bains", name: "Thonon-les-Bains", departement: "Haute-Savoie" },
  // Savoie (73)
  { slug: "chambery", name: "Chambéry", departement: "Savoie" },
  { slug: "albertville", name: "Albertville", departement: "Savoie" },
  { slug: "aix-les-bains", name: "Aix-les-Bains", departement: "Savoie" },
  // Puy-de-Dôme (63)
  { slug: "clermont-ferrand", name: "Clermont-Ferrand", departement: "Puy-de-Dôme" },
  { slug: "riom", name: "Riom", departement: "Puy-de-Dôme" },
  // Allier (03)
  { slug: "vichy", name: "Vichy", departement: "Allier" },
  { slug: "moulins", name: "Moulins", departement: "Allier" },
  { slug: "montlucon", name: "Montluçon", departement: "Allier" },
  // Haute-Loire (43)
  { slug: "le-puy-en-velay", name: "Le Puy-en-Velay", departement: "Haute-Loire" },
  // Cantal (15)
  { slug: "aurillac", name: "Aurillac", departement: "Cantal" },
];
