import { readFile } from "node:fs/promises";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { generateStyleJsonLd, generateBlogPostJsonLd } from "@/lib/seo/json-ld";

interface SeoTruthIssue {
  source: string;
  message: string;
}

const BASE_URL = "https://www.stylekit.top";
const BANNED_DISCOVERY_PATTERNS = [
  /130\+/i,
  /120\+/i,
  /stylekit\.example\.com/i,
  /\[Repository URL\]/i,
  /\[Issues URL\]/i,
  /most comprehensive/i,
  /widest curated/i,
  /Fully bilingual/i,
];

async function main(): Promise<void> {
  const issues: SeoTruthIssue[] = [];

  const [llms, llmsFullSource, rootLayoutSource] = await Promise.all([
    readFile("public/llms.txt", "utf8"),
    readFile("lib/export/llms-full.ts", "utf8"),
    readFile("app/layout.tsx", "utf8"),
  ]);

  for (const pattern of BANNED_DISCOVERY_PATTERNS) {
    if (pattern.test(llms) || pattern.test(llmsFullSource)) {
      issues.push({
        source: "llms discovery files",
        message: `contains banned or stale claim ${pattern}`,
      });
    }
  }

  if (!llms.includes(`${CURATED_STYLE_COUNT} curated`)) {
    issues.push({
      source: "public/llms.txt",
      message: "does not contain the current catalog count",
    });
  }

  if (/canonical:\s*BASE_URL/.test(rootLayoutSource)) {
    issues.push({
      source: "app/layout.tsx",
      message: "root metadata must not force every route to use the homepage canonical",
    });
  }

  const entries = sitemap();
  const seen = new Set<string>();
  const redirectPaths = new Set([
    "/en/prompts",
    "/zh/prompts",
    "/en/prompts/landing-page",
    "/zh/prompts/landing-page",
    "/en/prompts/dashboard-design",
    "/zh/prompts/dashboard-design",
    "/en/prompts/tailwind-ui",
    "/zh/prompts/tailwind-ui",
    "/en/prompts/dark-mode",
    "/zh/prompts/dark-mode",
  ]);

  for (const entry of entries) {
    const url = new URL(entry.url);
    if (seen.has(entry.url)) {
      issues.push({ source: "app/sitemap.ts", message: `duplicate URL ${entry.url}` });
    }
    seen.add(entry.url);

    if (url.origin !== BASE_URL) {
      issues.push({ source: "app/sitemap.ts", message: `non-canonical host ${entry.url}` });
    }
    if (!/^\/(en|zh)(?:\/|$)/.test(url.pathname)) {
      issues.push({ source: "app/sitemap.ts", message: `missing locale prefix ${entry.url}` });
    }
    if (url.pathname.includes("[")) {
      issues.push({ source: "app/sitemap.ts", message: `dynamic placeholder leaked into sitemap: ${entry.url}` });
    }
    if (url.pathname.includes("/showcase")) {
      issues.push({ source: "app/sitemap.ts", message: `noindex showcase leaked into sitemap: ${entry.url}` });
    }
    if (redirectPaths.has(url.pathname)) {
      issues.push({ source: "app/sitemap.ts", message: `redirect URL leaked into sitemap: ${entry.url}` });
    }
    if (/^\/zh\/(?:blog|guides)(?:\/|$)/.test(url.pathname) || ["/zh/privacy", "/zh/terms"].includes(url.pathname)) {
      issues.push({ source: "app/sitemap.ts", message: `English-only content advertised as Chinese: ${entry.url}` });
    }
  }

  const robotsPolicy = JSON.stringify(robots());
  for (const bot of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) {
    if (!robotsPolicy.includes(bot)) {
      issues.push({ source: "app/robots.ts", message: `missing explicit search crawler policy for ${bot}` });
    }
  }
  if (!robotsPolicy.includes("/api/styles/*/md$")) {
    issues.push({ source: "app/robots.ts", message: "read-only style Markdown remains blocked with the rest of /api" });
  }
  if (robotsPolicy.includes('"/api/styles/"')) {
    issues.push({ source: "app/robots.ts", message: "robots allow rule exposes the entire style API subtree" });
  }

  const styleUrl = `${BASE_URL}/zh/styles/neo-brutalist`;
  const styleSchema = generateStyleJsonLd({
    name: "新野兽派",
    description: "测试描述",
    keywords: ["前端风格"],
    category: "expressive",
    url: styleUrl,
    language: "zh-CN",
  });
  if (styleSchema.url !== styleUrl || styleSchema.inLanguage !== "zh-CN") {
    issues.push({ source: "lib/seo/json-ld.ts", message: "style schema URL or language diverges from canonical" });
  }

  const blogUrl = `${BASE_URL}/en/blog/example`;
  const blogSchema = generateBlogPostJsonLd({
    slug: "example",
    title: "Example",
    description: "Example description",
    date: "2026-07-10",
    author: "StyleKit Team",
    tags: ["example"],
    content: "",
  }, { url: blogUrl, language: "en" });
  if (blogSchema.url !== blogUrl || blogSchema.inLanguage !== "en") {
    issues.push({ source: "lib/seo/json-ld.ts", message: "article schema URL or language diverges from canonical" });
  }

  if (issues.length) {
    console.error(`[check:seo-truth] FAIL - ${issues.length} issue(s) found:`);
    for (const issue of issues) {
      console.error(`- ${issue.source}: ${issue.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`[check:seo-truth] PASS - ${entries.length} sitemap URLs and discovery claims satisfy SEO truth invariants.`);
}

void main();
