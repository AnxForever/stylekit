import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getAllStylesMeta } from "@/lib/styles/meta";

const CHINESE_TEXT = /[\u3400-\u9fff]/;

describe("style card localization", () => {
  it("provides a readable English description for every style", () => {
    const invalidStyles = getAllStylesMeta()
      .filter((style) => !style.descriptionEn || CHINESE_TEXT.test(style.descriptionEn))
      .map((style) => style.slug);

    expect(invalidStyles).toEqual([]);
  });

  it.each([
    "components/home/home-style-card.tsx",
    "components/home/style-card.tsx",
  ])("selects the card description by locale in %s", (file) => {
    const source = readFileSync(file, "utf8");

    expect(source).toContain('locale === "zh" ? style.description : style.descriptionEn');
    expect(source).not.toMatch(/\{style\.description\}/);
  });
});
