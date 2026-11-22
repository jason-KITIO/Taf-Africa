import type { MetadataRoute } from "next";

const base = "https://taf-africa.com";

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

  return [...staticRoutes, ...directoryRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/annuaire") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/annuaire") ? 0.7 : 0.6,
  }));
}
