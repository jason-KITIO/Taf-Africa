import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const disallow = ["/tableau-de-bord", "/profil", "/messagerie", "/admin", "/api"];

const aiAndSearchBots = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: aiAndSearchBots,
        allow: "/",
        disallow,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
