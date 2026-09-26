import { describe, expect, it } from "vitest";
import { buildColorDetailJsonLd, buildColorDetailMetadata, getActualColorPairings, getColorAnswer, getColorFaq, getPreferredTextColor, isExactTailwindHex } from "@/lib/seo/color-detail-content";
import { contrastRatio, getAllDetailSwatches, getColorDetail, hexToRgb } from "@/lib/styles/color-detail";
import { getAllStyleColors } from "@/lib/styles/colors";

function detail(hex: string) {
  const value = getColorDetail(hex);
  if (!value) throw new Error("Missing test color");
  return value;
}

describe("truthful color query answers", () => {
  it("does not describe a near Tailwind v4 match as the same hex", () => {
    const color = detail("111827");
    expect(color.tailwind.hex).not.toBe(color.hex);
    expect(isExactTailwindHex(color)).toBe(false);
    expect(getColorAnswer(color)).toContain("not an exact match");
    expect(buildColorDetailMetadata(color).description).not.toContain("is Tailwind's");
    expect(buildColorDetailMetadata(color).description).toContain("not an exact match");
    expect(getColorAnswer(color)).toContain("rgb(17, 24, 39)");
  });
  it("keeps hex search titles focused on real style use or color guidance", () => {
    const used = detail("111827");
    const usedMetadata = buildColorDetailMetadata(used);
    expect(used.usedBy.length).toBeGreaterThan(0);
    expect(usedMetadata.title).toContain("UI Styles That Use It & Pairings");
    expect(usedMetadata.description).toContain(used.usedBy[0].nameEn);

    const unused = detail("123456");
    expect(unused.usedBy).toHaveLength(0);
    expect(buildColorDetailMetadata(unused).title).toContain("Pairings, Tints & Contrast");

    const exact = detail("ffffff");
    expect(buildColorDetailMetadata(exact).title).toContain(`(${exact.tailwind.token})`);
    expect(buildColorDetailMetadata(exact).description).toContain("Exact Tailwind v4 token");
  });
  it("compares hex values rather than a rounded distance when reporting an exact match", () => {
    const color = detail("ffffff");
    expect(isExactTailwindHex(color)).toBe(true);
    expect(isExactTailwindHex({ ...color, hex: "#fffffe", tailwind: { ...color.tailwind, distance: 0 } })).toBe(false);
  });
  it("chooses readable black or white text using actual contrast, not an arbitrary luminance cutoff", () => {
    const text = getPreferredTextColor(detail("777777"));
    expect(text.hex).toBe("#000000");
    expect(text.ratio).toBeGreaterThanOrEqual(4.5);
    for (const hex of ["000000", "ffffff", "38bdf8", "777777", "e63946"]) {
      const color = detail(hex);
      const choice = getPreferredTextColor(color);
      expect(contrastRatio(color.rgb, hexToRgb(choice.hex)!)).toBeCloseTo(choice.ratio, 8);
      expect(choice.ratio).toBeGreaterThanOrEqual(4.5);
    }
  });
  it("lists only actual palette co-occurrences, with valid detail destinations and unrounded pass/fail", () => {
    const pairs = getActualColorPairings("#111827");
    expect(pairs.length).toBeGreaterThan(0);
    expect(pairs.length).toBeLessThanOrEqual(6);
    const styles = getAllStyleColors();
    for (const pair of pairs) {
      expect(getAllDetailSwatches()).toContain(pair.hex);
      for (const source of pair.styles) {
        const style = styles.find((item) => item.slug === source.slug);
        expect(style?.swatches).toContain("#111827");
        expect(style?.swatches).toContain(pair.hex);
      }
      expect(pair.passesNormalText).toBe(contrastRatio(hexToRgb("#111827")!, hexToRgb(pair.hex)!) >= 4.5);
    }
  });
  it("aligns graph and metadata to the actual English canonical, not the unprefixed alias", () => {
    const color = detail("38bdf8");
    const metadata = buildColorDetailMetadata(color);
    const graph = buildColorDetailJsonLd(color);
    expect(metadata.alternates?.canonical).toBe("https://www.stylekit.top/en/colors/38bdf8");
    expect(graph.url).toBe(metadata.alternates?.canonical);
    expect(graph.breadcrumb.itemListElement[0].item).toBe("https://www.stylekit.top/en/colors");
    expect(graph.inLanguage).toBe("en");
    expect(getColorFaq(color)[2].answer).toContain("bg-[#38bdf8]");
    expect(getColorFaq(color)[2].answer).toContain("4.1.18");
  });
});
