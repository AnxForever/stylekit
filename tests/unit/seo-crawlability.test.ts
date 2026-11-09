import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";

vi.mock("@/lib/styles/community-runtime", () => ({
  listPromotedCommunityStyles: vi.fn().mockResolvedValue([]),
}));

vi.mock("next/font/google", () => ({
  Playfair_Display: () => ({ variable: "test-login-display-font" }),
}));

import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { GET as getStylesJson } from "@/app/api/styles/all.json/route";
import { GET as getLlmsMarkdown } from "@/app/llms.md/route";
import { GET as getAllStylesMarkdown } from "@/app/all-styles.md/route";
import { generateLlmsFullText } from "@/lib/export/llms-full";
import { listPromotedCommunityStyles } from "@/lib/styles/community-runtime";
import { stylesMeta } from "@/lib/styles/meta-registry";
import { metadata as kitMetadata } from "@/app/kit/page";
import { metadata as sharedKitMetadata } from "@/app/kit/shared/page";
import { metadata as loginMetadata } from "@/app/login/page";
import { metadata as submitMetadata } from "@/app/submit/page";
import {
  getAlternateLocalePath,
  getBaseUrl,
  getIndexableLocalesForPath,
  getLocaleRouteStrategy,
  LOCALE_ROUTE_POLICY,
  LOCALES,
} from "@/lib/i18n/routing";

type RobotsRules = NonNullable<ReturnType<typeof robots>["rules"]>;
type RobotsGroup = Exclude<RobotsRules, readonly unknown[]>;

function normalizeRobotsGroups(
  rules: ReturnType<typeof robots>["rules"]
): RobotsGroup[] {
  if (!rules) return [];
  return Array.isArray(rules) ? rules : [rules];
}

function asRuleList(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function matchesRobotsPattern(pattern: string, urlPath: string): boolean {
  const isEndAnchored = pattern.endsWith("$");
  const body = isEndAnchored ? pattern.slice(0, -1) : pattern;
  const regexBody = body
    .split("*")
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");

  return new RegExp(`^${regexBody}${isEndAnchored ? "$" : ""}`).test(urlPath);
}

function crawlDecision(group: RobotsGroup, urlPath: string): "allow" | "disallow" {
  const matches = [
    ...asRuleList(group.allow).map((pattern) => ({ pattern, decision: "allow" as const })),
    ...asRuleList(group.disallow).map((pattern) => ({ pattern, decision: "disallow" as const })),
  ]
    .filter(({ pattern }) => matchesRobotsPattern(pattern, urlPath))
    .map((match) => ({
      ...match,
      specificity: match.pattern.replace(/[\*$]/g, "").length,
    }));

  if (matches.length === 0) return "allow";

  const maxSpecificity = Math.max(...matches.map((match) => match.specificity));
  return matches.some(
    (match) => match.specificity === maxSpecificity && match.decision === "allow"
  )
    ? "allow"
    : "disallow";
}

describe("SEO crawlability contracts", () => {
  it("indexes the standalone technical profile without locale aliases or sample articles", async () => {
    const entries = (await sitemap()).filter((entry) => entry.url.includes("/templates/technical-profile"));
    expect(entries).toEqual([{
      url: `${getBaseUrl()}/templates/technical-profile`,
      changeFrequency: "monthly",
      priority: 0.6,
    }]);
  });

  it("publishes every exact route marked indexable at its canonical locale URL", async () => {
    const entries = await sitemap();
    const urls = new Set(entries.map((entry) => entry.url));
    const exactPaths = new Set(LOCALE_ROUTE_POLICY.flatMap((rule) => rule.exact));

    for (const pathname of exactPaths) {
      const indexableLocales = new Set(getIndexableLocalesForPath(pathname));
      for (const locale of LOCALES) {
        const canonicalUrl = `${getBaseUrl()}${getAlternateLocalePath(pathname, locale)}`;
        expect(urls.has(canonicalUrl), canonicalUrl).toBe(indexableLocales.has(locale));
      }
    }

    expect(getIndexableLocalesForPath("/backgrounds")).toEqual([]);
    expect(getLocaleRouteStrategy("/backgrounds")).toBe("filesystem");

    const localizedEntry = entries.find(
      (entry) => entry.url === `${getBaseUrl()}/zh/launch`
    );
    expect(localizedEntry?.alternates?.languages).toMatchObject({
      en: `${getBaseUrl()}/en/launch`,
      "zh-CN": `${getBaseUrl()}/zh/launch`,
      "x-default": `${getBaseUrl()}/en/launch`,
    });
    const supportEn = entries.find(
      (entry) => entry.url === `${getBaseUrl()}/en/support`
    );
    const supportZh = entries.find(
      (entry) => entry.url === `${getBaseUrl()}/zh/support`
    );
    expect(getLocaleRouteStrategy("/support")).toBe("rewrite");
    expect(getIndexableLocalesForPath("/support")).toEqual(["en", "zh"]);
    expect(supportEn?.alternates?.languages).toMatchObject({
      en: `${getBaseUrl()}/en/support`,
      "zh-CN": `${getBaseUrl()}/zh/support`,
      "x-default": `${getBaseUrl()}/en/support`,
    });
    expect(supportZh?.alternates?.languages).toEqual(supportEn?.alternates?.languages);
  });

  it("lets crawlers observe public noindex pages while keeping private and API paths blocked", () => {
    expect(loginMetadata.robots).toMatchObject({ index: false, follow: true });
    expect(submitMetadata.robots).toMatchObject({ index: false, follow: true });
    expect(sharedKitMetadata.robots).toMatchObject({ index: false, follow: true });
    expect(kitMetadata.robots).toMatchObject({ index: false, follow: false });

    const groups = normalizeRobotsGroups(robots().rules);
    const generalGroup = groups.find((group) => group.userAgent === "*");
    const aiGroup = groups.find(
      (group) =>
        Array.isArray(group.userAgent) && group.userAgent.includes("OAI-SearchBot")
    );
    expect(generalGroup).toBeDefined();
    expect(aiGroup).toBeDefined();
    expect(asRuleList(aiGroup?.allow)).toEqual(asRuleList(generalGroup?.allow));
    expect(asRuleList(generalGroup?.disallow)).toEqual(
      expect.arrayContaining(asRuleList(aiGroup?.disallow))
    );
    expect(asRuleList(generalGroup?.disallow).filter(
      (rule) => !asRuleList(aiGroup?.disallow).includes(rule)
    )).toHaveLength(20);

    for (const group of [generalGroup, aiGroup]) {
      expect(group).toBeDefined();
      if (!group) continue;

      for (const route of [
        "/login",
        "/login?next=%2Fworkspace",
        "/en/login?next=%2Fworkspace",
        "/zh/login",
        "/submit",
        "/submit?source=community",
        "/en/submit?source=community",
        "/zh/submit",
        "/kit/shared",
        "/kit/shared?kit=styles%3Aglassmorphism",
        "/kit/shared/",
        "/kit/shared/?kit=styles%3Aglassmorphism",
        "/en/kit/shared",
        "/en/kit/shared?kit=styles%3Aglassmorphism",
        "/zh/kit/shared",
        "/zh/kit/shared?kit=styles%3Aglassmorphism",
        "/api/styles/glassmorphism/md",
      ]) {
        expect(crawlDecision(group, route), route).toBe("allow");
      }

      for (const route of [
        "/kit",
        "/kit/private",
        "/kit/shared-other",
        "/kit/shared/other",
        "/en/kit",
        "/en/kit/private",
        "/en/kit/shared-other",
        "/en/kit/shared/other",
        "/zh/kit",
        "/zh/kit/private",
        "/zh/kit/shared-other",
        "/zh/kit/shared/other",
        "/profile",
        "/en/profile",
        "/zh/profile",
        "/preview",
        "/workspace/project-1",
        "/validation/corporate-clean-saas",
        "/admin-login",
        "/api/admin/workspace/validation",
        "/api/design/neo-brutalist/tokens.json",
        "/api/design/neo-brutalist/design.md/private",
        "/api/design/neo-brutalist/design.md-backup",
      ]) {
        expect(crawlDecision(group, route), route).toBe("disallow");
      }
    }

    for (const locale of LOCALES) {
      expect(getLocaleRouteStrategy("/kit/shared")).toBe("rewrite");
      expect(getAlternateLocalePath("/kit/shared", locale)).toBe(`/${locale}/kit/shared`);
    }
  });

  it("excludes exact MCP transports from web crawling while preserving AI access and public discovery", async () => {
    const groups = normalizeRobotsGroups(robots().rules);
    const generalGroup = groups.find((group) => group.userAgent === "*");
    const aiGroup = groups.find(
      (group) => Array.isArray(group.userAgent) && group.userAgent.includes("OAI-SearchBot")
    );
    expect(generalGroup).toBeDefined();
    expect(aiGroup).toBeDefined();
    if (!generalGroup || !aiGroup) return;

    for (const endpoint of ["/mcp", "/mcp/all", "/mcp/core", "/mcp/assets", "/mcp/design"]) {
      for (const suffix of ["", "?client=web", "/", "/?client=web"]) {
        const path = `${endpoint}${suffix}`;
        expect(crawlDecision(generalGroup, path), path).toBe("disallow");
        expect(crawlDecision(aiGroup, path), path).toBe("allow");
      }
    }

    const sitemapPaths = (await sitemap()).map((entry) => {
      const url = new URL(entry.url);
      return `${url.pathname}${url.search}`;
    });
    for (const group of groups) {
      for (const path of [
        ...sitemapPaths,
        "/mcp-guide",
        "/mcp/all-guide",
        "/mcp/core-guide",
        "/mcp/core/docs",
        "/developers",
        "/en/developers",
        "/zh/developers",
        "/llms.txt",
        "/llms.md",
        "/llms-full.txt",
        "/api/styles/neo-brutalist/md",
        "/api/design/neo-brutalist/design.md",
        "/api/design/neo-brutalist/design.md?locale=en",
        "/api/design/neo-brutalist/design.md?locale=zh",
      ]) {
        expect(crawlDecision(group, path), path).toBe("allow");
      }
    }
  });

  it("advertises one canonical design.md for curated style discovery", async () => {
    const staticIndex = readFileSync("public/llms.txt", "utf8");
    expect(staticIndex).toContain(`${stylesMeta.length} curated`);
    expect(staticIndex).toContain("/api/design/{slug}/design.md?locale=en");
    expect(staticIndex).toContain("/api/design/neo-brutalist/design.md?locale=en");
    expect(staticIndex).toContain("/api/styles/{slug}/md");
    const [jsonResponse, markdownResponse, allStylesResponse] = await Promise.all([
      getStylesJson(),
      getLlmsMarkdown(),
      getAllStylesMarkdown(),
    ]);
    const catalog = (await jsonResponse.json()) as {
      source: string;
      styles: Array<{ slug: string; urls: { markdown: string } }>;
    };
    const index = await markdownResponse.text();
    const fullIndex = generateLlmsFullText();
    const allStyles = await allStylesResponse.text();

    expect(catalog.styles.length).toBeGreaterThan(0);
    for (const style of catalog.styles) {
      const canonicalUrl = `${catalog.source}/api/design/${style.slug}/design.md?locale=en`;
      expect(style.urls.markdown, style.slug).toBe(canonicalUrl);
      expect(index, style.slug).toContain(`([design.md](${canonicalUrl})`);
      expect(fullIndex, style.slug).toContain(`**design.md**: ${canonicalUrl}`);
      expect(index, style.slug).not.toContain(`/api/styles/${style.slug}/md`);
      expect(fullIndex, style.slug).not.toContain(`/api/styles/${style.slug}/md`);
    }
    expect(allStyles).toContain(`${catalog.source}/api/design/{slug}/design.md?locale=en`);
    expect(allStyles).toContain(`${catalog.source}/api/styles/{slug}/md`);
  });

  it("keeps a discoverable legacy Markdown link for promoted community styles without a canonical spec", async () => {
    vi.mocked(listPromotedCommunityStyles).mockResolvedValueOnce([{
      ...stylesMeta[0],
      slug: "aurora-community",
      nameEn: "Aurora Community",
      promoted: true,
      curated: false,
    }]);

    const index = await (await getLlmsMarkdown()).text();
    expect(index).toContain("/api/styles/aurora-community/md");
    expect(index).not.toContain("/api/design/aurora-community/design.md");
    for (const group of normalizeRobotsGroups(robots().rules)) {
      expect(crawlDecision(group, "/api/styles/aurora-community/md")).toBe("allow");
    }
  });
});
