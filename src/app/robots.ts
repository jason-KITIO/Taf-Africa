import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/tableau-de-bord", "/profil", "/messagerie", "/admin", "/api"],
    },
    sitemap: "https://taf-africa.com/sitemap.xml",
    host: "https://taf-africa.com",
  };
}
