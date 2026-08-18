import { describe, expect, it } from "vitest";
import { styles } from "@/lib/styles";
import { rawStyles } from "@/lib/styles/registry";

/**
 * Structural guarantees for the two AI-rule fields.
 *
 * Both defects these cover were invisible for a long time because the obvious
 * checks pass: the fields are present, non-empty, and long enough. One shipped
 * an English document to Chinese readers; the other shipped markdown whose code
 * fences did not close, because the normalizer had deleted a block mid-document.
 */

const CJK = /[㐀-鿿]/g;

function cjkRatio(value: string): number {
  return (value.match(CJK) ?? []).length / Math.max(value.length, 1);
}

function cjkCount(value: string): number {
  return (value.match(CJK) ?? []).length;
}

function fenceCount(value: string): number {
  return (value.match(/```/g) ?? []).length;
}

/**
 * Styles whose Chinese field still holds an English document. Shrink this list,
 * never grow it: a new style must ship Chinese rules from the start.
 */
const CHINESE_RULES_PENDING = [
  "corporate-clean",
  "retro-vintage",
  "dark-mode",
  "split-screen",
  "full-page-scroll",
  "card-stack",
  "hero-fullscreen",
  "fluent-design",
  "risograph",
  "acid-graphics",
  "swiss-poster",
  "watercolor-art",
  "impressionist-oil",
  "collage-art",
  "pop-art",
  "cel-shading",
  "film-noir",
  "indian-festive",
  "african-textile",
  "witchcore",
  "neon-tokyo",
  "dopamine-design",
  "linear-style",
  "shopify-clean",
  "luxury-retail",
  "fresh-market",
  "data-dense",
  "horizontal-gallery",
  "latex-paper",
  "distill-style",
  "warm-organic",
  "pastel-ui",
  "soft-utility",
  "studio-bold",
  "japanese-fresh",
];

describe("AI rule fields", () => {
  it("keeps English rules free of Chinese", () => {
    const offenders = styles
      .filter((style) => (style.aiRulesEn ?? "").length > 200)
      // The prompt builder discards an English rule source once CJK passes 3%,
      // so a stray Chinese phrase costs the reader the entire document.
      .filter((style) => cjkRatio(style.aiRulesEn ?? "") > 0.02)
      .map((style) => style.slug);

    expect(offenders).toEqual([]);
  });

  it("keeps Chinese rules actually written in Chinese", () => {
    // Measured on the authored field, not the registry output. The normalizer
    // appends Chinese do/dont sections to every style, which lifts an
    // English-authored document over any ratio threshold and hides the problem:
    // through the normalized view only 11 styles looked wrong, against 34 that
    // actually are. An absolute count of Chinese characters is what survives a
    // body that is mostly Tailwind classes.
    const offenders = rawStyles
      .filter((style) => style.aiRules.length > 400)
      .filter((style) => cjkCount(style.aiRules) < 60)
      .map((style) => style.slug)
      .filter((slug) => !CHINESE_RULES_PENDING.includes(slug));

    expect(offenders).toEqual([]);
  });

  it("closes every code fence it opens", () => {
    const broken: string[] = [];

    for (const style of styles) {
      for (const [locale, value] of [
        ["zh", style.aiRules],
        ["en", style.aiRulesEn ?? ""],
      ] as const) {
        if (fenceCount(value) % 2 !== 0) {
          broken.push(`${style.slug}:${locale}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });
});
