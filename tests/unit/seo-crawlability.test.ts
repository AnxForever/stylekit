import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/styles/community-runtime", () => ({
  listPromotedCommunityStyles: vi.fn().mockResolvedValue([]),
}));

vi.mock("next/font/google", () => ({
  Playfair_Display: () => ({ variable: "test-login-display-font" }),
}));

import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
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
    expect(asRuleList(aiGroup?.disallow)).toEqual(asRuleList(generalGroup?.disallow));

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
      ]) {
        expect(crawlDecision(group, route), route).toBe("disallow");
      }
    }

    for (const locale of LOCALES) {
      expect(getLocaleRouteStrategy("/kit/shared")).toBe("rewrite");
      expect(getAlternateLocalePath("/kit/shared", locale)).toBe(`/${locale}/kit/shared`);
    }
  });
});
