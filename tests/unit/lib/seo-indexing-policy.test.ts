import { describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { getIndexableLocalesForPath } from "@/lib/i18n/routing";
import { generateMetadata as supportMetadata } from "@/app/support/page";
import { generateMetadata as docsMetadata } from "@/app/docs/layout";
import { generateMetadata as canvasMetadata } from "@/app/html-in-canvas/layout";
import { generateMetadata as experimentMetadata } from "@/app/experiments/layout";

const { state } = vi.hoisted(() => ({ state: { locale: "en" as "en" | "zh" } }));

vi.mock("@/lib/styles/community-runtime", () => ({ listPromotedCommunityStyles: async () => [] }));
vi.mock("@/lib/i18n/request", () => ({ getRequestLocaleContext: async () => ({ locale: state.locale }) }));
vi.mock("@/components/layout/site-document", () => ({
  default: () => null,
  generateSiteMetadata: async () => ({ title: "Parent metadata" }),
}));
vi.mock("@/components/layout/legacy-root-layout", () => ({
  default: () => null,
  generateMetadata: async () => ({ title: "Parent metadata" }),
}));

describe("public discovery and indexing policy", () => {
  it("includes declared public destinations in their actual language variants", async () => {
    const urls = (await sitemap()).map(entry => new URL(entry.url).pathname);
    for (const path of ["/launch", "/style-advisor", "/support", "/refunds"]) {
      for (const locale of getIndexableLocalesForPath(path)) {
        expect(urls, `${locale}${path}`).toContain(`/${locale}${path}`);
      }
    }
    expect(urls).not.toContain("/zh/refunds");
    expect(urls.some(path => /\/(docs|html-in-canvas|experiments)(\/|$)/.test(path))).toBe(false);
  });

  it.each(["en", "zh"] as const)("gives the bilingual %s support page its own canonical and alternates", async (locale) => {
    state.locale = locale;
    const metadata = await supportMetadata();
    expect(metadata.alternates?.canonical).toMatch(new RegExp(`/${locale}/support$`));
    expect(metadata.alternates?.languages).toMatchObject({
      en: expect.stringMatching(/\/en\/support$/),
      "zh-CN": expect.stringMatching(/\/zh\/support$/),
    });
    expect(metadata.title).toBe(locale === "zh" ? "支持 StyleKit" : "Support StyleKit");
  });

  it.each([
    ["documentation tool", docsMetadata],
    ["HTML canvas demo", canvasMetadata],
    ["experiments", experimentMetadata],
  ] as const)("keeps the %s crawlable but explicitly outside the search index", async (_name, generate) => {
    expect((await generate()).robots).toMatchObject({ index: false, follow: true });
  });
});
