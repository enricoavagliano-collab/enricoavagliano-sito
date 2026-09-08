// Dati segnaposto — da sostituire con gli articoli reali del blog
// (già mappati altrove: 54 articoli tecnici, gen 2024 - ago 2026).
// Struttura pronta per essere alimentata da un file JSON, un CMS headless
// o direttamente dal sitemap del sito esistente.

export type Article = {
  slug: string;
  title: string;
  category: "Tecniche" | "Lenze" | "Specie" | "Attrezzatura" | "Spot";
  date: string; // ISO
  excerpt: string;
};

export const articles: Article[] = [
  {
    slug: "esempio-articolo-tecnica-foce",
    title: "[Segnaposto] Titolo articolo tecnica di foce",
    category: "Tecniche",
    date: "2026-08-10",
    excerpt:
      "Testo segnaposto: qui andrà l'estratto reale dell'articolo importato dal blog.",
  },
  {
    slug: "esempio-articolo-lenza-bolognese",
    title: "[Segnaposto] Titolo articolo lenza bolognese",
    category: "Lenze",
    date: "2026-07-22",
    excerpt: "Testo segnaposto: estratto reale da inserire in seguito.",
  },
  {
    slug: "esempio-articolo-specie-mare",
    title: "[Segnaposto] Titolo articolo su una specie di mare",
    category: "Specie",
    date: "2026-06-14",
    excerpt: "Testo segnaposto: estratto reale da inserire in seguito.",
  },
];

export function formatItDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

