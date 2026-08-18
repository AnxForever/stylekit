import { describe, expect, it } from "vitest";
import { styles } from "@/lib/styles";

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

function fenceCount(value: string): number {
  return (value.match(/```/g) ?? []).length;
}

/**
 * Styles whose Chinese field still holds an English document. Shrink this list,
 * never grow it: a new style must ship Chinese rules from the start.
 */
const CHINESE_RULES_PENDING = [
  "macos-vibrancy",
  "cyber-anime",
  "pixel-anime",
  "japanese-fresh",
  "neon-samurai",
  "cyber-wafuu",
  "frutiger-aero",
  "anti-design",
  "brutalist-web",
  "holographic",
  "dopamine-design",
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
    const offenders = styles
      .filter((style) => style.aiRules.length > 400)
      .filter((style) => cjkRatio(style.aiRules) < 0.05)
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
