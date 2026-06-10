import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const siteUrl = "https://vamshikrishna.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
