import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
vi.mock("next/headers", () => ({ headers: vi.fn(() => { throw new Error("Static locale document must not read headers"); }) }));
import { getLocaleDocumentContext } from "@/lib/i18n/request";
import { getIndexableLocalesForPath, getLocaleRouteStrategy } from "@/lib/i18n/routing";

describe("server-side locale documents", () => {
  it.each(["en", "zh"] as const)("constructs the %s document without request headers", (locale) => {
    const context = getLocaleDocumentContext(locale);
    expect(context.locale).toBe(locale);
    expect(context.htmlLang).toBe(locale === "zh" ? "zh-CN" : "en");
    expect(context.openGraphLocale).toBe(locale === "zh" ? "zh_CN" : "en_US");
    expect(context.canonicalUrl).toBe(`https://www.stylekit.top/${locale}`);
  });
  it("shares the same locale and canonical rules for dynamic legacy routes", () => {
    const context = getLocaleDocumentContext("zh", "/zh/community");
    expect(context.htmlLang).toBe("zh-CN");
    expect(context.contentPath).toBe("/community");
    expect(context.languageAlternates.en).toBe("https://www.stylekit.top/en/community");
  });
  it("uses the locale root to provide document language rather than waiting for a bootstrap script", () => {
    const localeRoot = readFileSync("app/[locale]/layout.tsx", "utf8");
    const document = readFileSync("components/layout/site-document.tsx", "utf8");
    expect(localeRoot).toContain("<SiteDocument locale={locale}>");
    expect(document).toContain("getLocaleDocumentContext(routeLocale)");
    expect(document).toContain("<html lang={htmlLang}");
  });
  it("keeps the private notification route out of the indexable community namespace", () => {
    expect(getIndexableLocalesForPath("/community/notifications")).toEqual([]);
    expect(getLocaleRouteStrategy("/community/notifications")).toBe("rewrite");
    expect(getIndexableLocalesForPath("/community/aurora")).toEqual(["en", "zh"]);
  });
});
