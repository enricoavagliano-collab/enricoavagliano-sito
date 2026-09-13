import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles-store";

const BASE_URL = "https://enricoavagliano.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await getArticles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/diari-di-pesca`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/app-diari-di-pesca`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/il-senso-dellacqua`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/chi-sono`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contatti`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articlePages: MetadataRoute.Sitemap = items.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}

