export interface Post {
  slug: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  category: string;
  excerpt: string;
  content: string; // HTML
}

// ─── Ajouter un article ───────────────────────────────────────────────────────
// 1. Copier le bloc ci-dessous
// 2. Modifier slug, title, date, category, excerpt et content
// 3. Ajouter-le EN TÊTE du tableau (le plus récent en premier)
// ─────────────────────────────────────────────────────────────────────────────

export const posts: Post[] = [
  {
    slug: "stage-2-diesel-haute-performance",
    title: "Stage 2 Diesel : jusqu'où peut-on aller ?",
    date: "2026-03-20",
    category: "Reprogrammation",
    excerpt:
      "Le Stage 2 diesel est souvent mal compris. Voici ce que ça implique concrètement, quelles pièces doivent être préparées en amont, et quels gains sont réalistes.",
    content: `
<p>Beaucoup de clients nous contactent pour un <strong>Stage 2 diesel</strong> en pensant que c'est simplement "le Stage 1 mais en plus fort". La réalité est un peu différente.</p>

<h3>Ce que comprend un Stage 2</h3>
<p>Le Stage 2 implique des modifications mécaniques <em>avant</em> la reprogrammation. En diesel, on parle typiquement :</p>
<ul>
  <li>D'un échangeur air/eau (intercooler) plus efficace</li>
  <li>D'une géométrie variable de turbo optimisée</li>
  <li>D'injecteurs haute pression recalibrés</li>
  <li>D'une ligne d'échappement sport (downpipe)</li>
</ul>

<h3>Les gains réalistes</h3>
<p>Sur un moteur 2.0 TDI 150 ch de base, un Stage 2 bien réalisé peut atteindre <strong>210–230 ch</strong> et <strong>430–460 Nm</strong> — soit des gains de +60% en couple. Mais uniquement si la mécanique est saine.</p>

<h3>Notre approche</h3>
<p>Chez Ace Prog, on réalise systématiquement un diagnostic complet avant toute reprogrammation Stage 2. Pas question de flasher un moteur qui présente des codes défauts ou une pression de suralimentation défaillante.</p>

<p>Vous avez un projet Stage 2 ? <a href="/#contact">Contactez-nous</a> pour un devis sur mesure.</p>
    `,
  },
  {
    slug: "diagnostic-avant-reprogrammation",
    title: "Pourquoi le diagnostic est indispensable avant de reprogrammer",
    date: "2026-02-10",
    category: "Diagnostic",
    excerpt:
      "Beaucoup pensent que la reprogrammation est une simple copie de cartographie. En réalité, sans diagnostic préalable, vous prenez un risque réel pour votre moteur.",
    content: `
<p>La reprogrammation moteur est souvent présentée comme une opération simple et sans risque. C'est vrai — à condition que le véhicule soit en parfait état de marche.</p>

<h3>Les pièges courants</h3>
<p>Un moteur qui tourne "normalement" peut cacher des problèmes latents :</p>
<ul>
  <li>Injecteurs usés qui ne pulvérisent plus correctement</li>
  <li>Vanne EGR encrassée limitant les échanges thermiques</li>
  <li>Turbo avec jeu axial hors tolérance</li>
  <li>Codes défauts mémorisés mais non signalés par le voyant</li>
</ul>

<h3>Ce qu'on fait chez Ace Prog</h3>
<p>Avant chaque intervention, nous effectuons :</p>
<ul>
  <li>Une lecture complète des codes défauts (actifs et mémorisés)</li>
  <li>Un test des pressions de turbo en conditions réelles</li>
  <li>Une analyse des flux injecteurs</li>
</ul>
<p>Ce diagnostic nous prend entre 30 et 45 minutes — mais il nous permet de garantir la fiabilité de la reprogrammation sur le long terme.</p>

<p><a href="/#contact">Demandez votre diagnostic</a> dès aujourd'hui.</p>
    `,
  },
];
