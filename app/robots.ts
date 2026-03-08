import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.md", "/llms-full.txt"],
        disallow: ["/api/", "/admin/", "/api-test"],
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
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
