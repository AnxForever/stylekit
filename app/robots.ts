import { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();
const LOCALE_PREFIXES = ["", "/en", "/zh"] as const;

// These are POST-only protocol endpoints, not web documents. Match only the
// published endpoints so similarly named documentation stays crawlable.
const MCP_TRANSPORT_DISALLOW = ["/mcp", "/mcp/all", "/mcp/core", "/mcp/assets", "/mcp/design"]
  .flatMap((path) => [`${path}$`, `${path}?*`, `${path}/$`, `${path}/?*`]);

// These public entry pages intentionally send noindex metadata. Keep them
// crawlable so search crawlers can observe that directive, including the
// locale aliases and query-driven sign-in/share URLs.
const PUBLIC_NOINDEX_ROUTE_ALLOW = LOCALE_PREFIXES.flatMap((localePrefix) => {
  const routes = ["login", "submit"] as const;
  return routes.flatMap((route) => {
    const path = `${localePrefix}/${route}`;
    return [`${path}$`, `${path}?*`, `${path}/$`, `${path}/?*`];
  });
});

// Shared kits are public links whose content is encoded in the query string.
// Keep the exception exact so /kit/shared-other and nested private routes stay
// covered by the broader kit disallow rule.
const SHARED_KIT_ROUTE_ALLOW = LOCALE_PREFIXES.flatMap((localePrefix) => {
  const path = `${localePrefix}/kit/shared`;
  return [`${path}$`, `${path}?*`, `${path}/$`, `${path}/?*`];
});

const CRAWLER_RULES = {
  allow: [
    "/",
    "/llms.md",
    "/llms-full.txt",
    "/api/styles/*/md$",
    ...PUBLIC_NOINDEX_ROUTE_ALLOW,
    ...SHARED_KIT_ROUTE_ALLOW,
  ],
  disallow: [
    "/api/",
    "/admin/",
    "/api-test",
    "/preview",
    "/kit",
    "/en/kit",
    "/zh/kit",
    "/workspace",
    "/validation",
    "/admin-login",
    "/profile",
    "/en/profile",
    "/zh/profile",
  ],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        ...CRAWLER_RULES,
        disallow: [...CRAWLER_RULES.disallow, ...MCP_TRANSPORT_DISALLOW],
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
        ...CRAWLER_RULES,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
