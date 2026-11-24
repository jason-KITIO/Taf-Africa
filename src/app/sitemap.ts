import type { MetadataRoute } from "next";
import { getPublicFreelances, getPublicProjects } from "@/lib/demo-store";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projets",
    "/freelances",
    "/annuaire",
    "/mentions-legales",
    "/cgu",
    "/confidentialite",
  ];
  const directoryRoutes = [
    "abidjan",
    "dakar",
    "bamako",
    "ouagadougou",
    "yaounde",
    "cotonou",
  ].flatMap((city) => [
    `/annuaire?ville=${city}`,
    `/annuaire?ville=${city}&competence=developpement`,
    `/annuaire?ville=${city}&competence=design`,
  ]);

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("monthly" as const) : ("weekly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const directoryEntries = directoryRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const projectEntries = getPublicProjects().map((project) => ({
    url: `${SITE_URL}/projets/${project.slug}`,
    lastModified: new Date(project.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const freelanceEntries = getPublicFreelances().map((profile) => ({
    url: `${SITE_URL}/freelances/${profile.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...directoryEntries, ...projectEntries, ...freelanceEntries];
}
