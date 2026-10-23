import type { MetadataRoute } from "next";
import { projects } from "./data";
import { siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.origin,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, siteUrl).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
