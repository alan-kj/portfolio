import type { MetadataRoute } from "next";
import { education, experience, projects } from "./data";
import { siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const hasExperience = experience.length > 0 || education.length > 0;
  const pages = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    ...(hasExperience
      ? [{ path: "/experience", changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
    { path: "/about", changeFrequency: "yearly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ] as const;

  return [
    ...pages.map(({ path, changeFrequency, priority }) => ({
      url: new URL(path, siteUrl).toString(),
      lastModified,
      changeFrequency,
      priority,
    })),
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
