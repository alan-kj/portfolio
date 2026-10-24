import type { MetadataRoute } from "next";
import { projects } from "./data";
import { siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: siteUrl.origin,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, siteUrl).toString(),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
