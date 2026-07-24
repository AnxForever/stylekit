import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  addLocaleToPathname,
  detectPreferredLocale,
  getIndexableLocalesForPath,
  getLocaleFromPathname,
  getLocaleRouteStrategy,
  LOCALES,
  localizeHref,
  shouldBypassLocale,
  stripLocaleFromPathname,
} from "@/lib/i18n/routing";

function listLocalizedPagePaths(
  directory = path.join(process.cwd(), "app/[locale]"),
  segments: string[] = [],
): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return listLocalizedPagePaths(path.join(directory, entry.name), [
        ...segments,
        entry.name,
      ]);
    }

    if (entry.name !== "page.tsx") return [];
    const routeSegments = segments.map((segment) =>
      segment.startsWith("[") ? "example" : segment
    );
    return [routeSegments.length > 0 ? `/${routeSegments.join("/")}` : "/"];
  });
}

describe("i18n routing helpers", () => {
  it("reads locale prefixes from pathnames", () => {
    expect(getLocaleFromPathname("/en/styles")).toBe("en");
    expect(getLocaleFromPathname("/zh/about")).toBe("zh");
    expect(getLocaleFromPathname("/styles")).toBeNull();
  });

  it("strips locale prefixes safely", () => {
    expect(stripLocaleFromPathname("/en")).toBe("/");
    expect(stripLocaleFromPathname("/zh/styles/neo-brutalist")).toBe("/styles/neo-brutalist");
    expect(stripLocaleFromPathname("/templates")).toBe("/templates");
  });

  it("adds locale prefixes without duplicating them", () => {
    expect(addLocaleToPathname("/", "en")).toBe("/en");
    expect(addLocaleToPathname("/styles", "zh")).toBe("/zh/styles");
    expect(addLocaleToPathname("/en/styles", "zh")).toBe("/zh/styles");
  });

  it("localizes hrefs while preserving query strings and hashes", () => {
    expect(localizeHref("/styles?scenario=saas", "zh")).toBe("/zh/styles?scenario=saas");
    expect(localizeHref("/en/templates#gallery", "zh")).toBe("/zh/templates#gallery");
    expect(localizeHref("#section", "zh")).toBe("#section");
    expect(localizeHref("https://example.com", "zh")).toBe("https://example.com");
  });

  it("detects bypass paths correctly", () => {
    expect(shouldBypassLocale("/api/styles")).toBe(true);
    expect(shouldBypassLocale("/admin/users")).toBe(true);
    expect(shouldBypassLocale("/experiments/cinematic-stylekit")).toBe(true);
    expect(shouldBypassLocale("/admin-login")).toBe(true);
    expect(shouldBypassLocale("/robots.txt")).toBe(true);
    expect(shouldBypassLocale("/feed/styles.xml")).toBe(true);
    expect(shouldBypassLocale("/styles/corporate-clean/showcase")).toBe(true);
    expect(shouldBypassLocale("/styles/neo-brutalist/showcase")).toBe(true);
    expect(shouldBypassLocale("/styles/corporate-clean")).toBe(false);
    expect(shouldBypassLocale("/styles")).toBe(false);
    expect(shouldBypassLocale("/")).toBe(false);
  });

  it("detects preferred locale from accept-language", () => {
    expect(detectPreferredLocale("zh-CN,zh;q=0.9,en;q=0.8")).toBe("zh");
    expect(detectPreferredLocale("en-US,en;q=0.9")).toBe("en");
    expect(detectPreferredLocale(null)).toBe("en");
  });

  it("keeps every app/[locale] page reachable through the route policy", () => {
    for (const pathname of listLocalizedPagePaths()) {
      const expected = /^\/styles\/[^/]+\/showcase$/.test(pathname)
        ? "bypass"
        : "filesystem";
      expect(getLocaleRouteStrategy(pathname), pathname).toBe(expected);
    }
  });

  it("classifies shared rewrites and sitemap locale availability", () => {
    expect(getLocaleRouteStrategy("/guides")).toBe("rewrite");
    expect(getLocaleRouteStrategy("/guides/neumorphism")).toBe("rewrite");
    expect(getLocaleRouteStrategy("/templates/saas-landing")).toBe("rewrite");
    expect(getLocaleRouteStrategy("/liquid-glass")).toBe("filesystem");

    expect(getIndexableLocalesForPath("/styles/neo-brutalist")).toEqual(LOCALES);
    expect(getIndexableLocalesForPath("/blog/example")).toEqual(["en"]);
    expect(getIndexableLocalesForPath("/guides/neumorphism")).toEqual(["en"]);
    expect(getIndexableLocalesForPath("/login")).toEqual([]);
    expect(getIndexableLocalesForPath("/styles/neo-brutalist/showcase")).toEqual([]);
  });

  it("builds the same route matrix for English and Chinese", () => {
    const paths = [
      "/",
      "/liquid-glass",
      "/styles/neo-brutalist",
      "/templates/saas-landing",
    ];

    for (const locale of LOCALES) {
      for (const pathname of paths) {
        const localized = addLocaleToPathname(pathname, locale);
        expect(getLocaleFromPathname(localized)).toBe(locale);
        expect(stripLocaleFromPathname(localized)).toBe(pathname);
      }
    }
  });
});
