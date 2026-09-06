import { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.md", "/llms-full.txt", "/api/styles/*/md$"],
        // Beyond /api and /admin, exclude noindex product surfaces that carry
        // no search value but still burn crawl budget (Bing WMT flagged limited
        // crawl capacity + wasted URLs). These render noindex meta anyway; the
        // Disallow stops the fetch before it happens.
        disallow: [
          "/api/",
          "/admin/",
          "/api-test",
          "/preview",
          "/kit",
          "/workspace",
          "/validation",
          "/submit",
          "/login",
          "/admin-login",
          "/profile",
        ],
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
        disallow: [
          "/api/",
          "/admin/",
          "/api-test",
          "/preview",
          "/kit",
          "/workspace",
          "/validation",
          "/submit",
          "/login",
          "/admin-login",
          "/profile",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
