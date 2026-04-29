import { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { VILLES } from "@/lib/villes";

const SITE_URL = "https://aceprog.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts().catch(() => []);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/actualites/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const villeEntries: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${SITE_URL}/reprogrammation-moteur-${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/nlink`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/actualites`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...villeEntries,
    ...postEntries,
  ];
}
