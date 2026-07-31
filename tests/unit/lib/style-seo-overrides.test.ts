import { describe, expect, it } from "vitest";
import {
  STYLE_SEO_OVERRIDES,
  getStyleSeoOverride,
} from "@/lib/seo/style-seo-overrides";
import { styles } from "@/lib/styles";

describe("STYLE_SEO_OVERRIDES", () => {
  it("only references styles that exist in the registry", () => {
    const slugs = new Set(styles.map((s) => s.slug));
    for (const slug of Object.keys(STYLE_SEO_OVERRIDES)) {
      expect(slugs.has(slug), slug).toBe(true);
    }
  });

  it("keeps overridden titles within SERP-safe length", () => {
    for (const [slug, override] of Object.entries(STYLE_SEO_OVERRIDES)) {
      for (const title of [override.titleEn, override.titleZh]) {
        if (title) expect(title.length, `${slug} title`).toBeLessThanOrEqual(75);
      }
      for (const desc of [override.descriptionEn, override.descriptionZh]) {
        if (desc) expect(desc.length, `${slug} desc`).toBeLessThanOrEqual(170);
      }
    }
  });
});

describe("getStyleSeoOverride", () => {
  it("returns locale-specific values", () => {
    const en = getStyleSeoOverride("stripe-style", "en");
    const zh = getStyleSeoOverride("stripe-style", "zh");
    expect(en.title).toContain("#635bff");
    expect(zh.title).toContain("#635bff");
    expect(en.title).not.toBe(zh.title);
  });

  it("returns empty object for styles without overrides", () => {
    expect(getStyleSeoOverride("glassmorphism", "en")).toEqual({});
  });

  it("falls back per-field when a locale override is absent", () => {
    // swiss-style only overrides zh
    expect(getStyleSeoOverride("swiss-style", "en").title).toBeUndefined();
    expect(getStyleSeoOverride("swiss-style", "zh").title).toContain("国际主义");
  });
});
