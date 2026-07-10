import { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.md", "/llms-full.txt", "/api/styles/*/md$"],
        disallow: ["/api/", "/admin/", "/api-test"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Google-Extended",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.md", "/llms-full.txt", "/api/styles/*/md$"],
        disallow: ["/api/", "/admin/", "/api-test"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
