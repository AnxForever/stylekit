import { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();
const HIDDEN_ROUTE_PREFIXES = [
  "/generate",
  "/generate-style",
  "/create-style",
  "/analyze",
  "/compare",
  "/blend",
  "/migrate",
  "/pipeline",
  "/playground",
  "/community",
  "/submit",
  "/profile",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.md", "/llms-full.txt"],
        disallow: ["/api/", "/admin/", "/api-test", ...HIDDEN_ROUTE_PREFIXES],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "ClaudeBot",
          "Google-Extended",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: HIDDEN_ROUTE_PREFIXES,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
