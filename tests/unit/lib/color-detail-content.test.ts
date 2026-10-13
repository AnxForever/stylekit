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
    expect(buildColorDetailMetadata(color).description).toContain("not exact");
    expect(getColorAnswer(color)).toContain("rgb(17, 24, 39)");
  });
  it("keeps hex search titles focused on real style use or color guidance", () => {
    const used = detail("111827");
    const usedMetadata = buildColorDetailMetadata(used);
    expect(used.usedBy.length).toBeGreaterThan(0);
    expect(usedMetadata.title).toBe("#111827 Hex Color Code: RGB, CSS & Contrast");
    expect(usedMetadata.description).toContain(
      used.usedBy.length === 1
        ? used.usedBy[0].nameEn
        : `Used in ${used.usedBy.length} style palettes`
    );

    const unused = detail("123456");
    expect(unused.usedBy).toHaveLength(0);
    expect(buildColorDetailMetadata(unused).title).toBe("#123456 Hex Color Code: RGB, CSS & Contrast");

    const exact = detail("ffffff");
    expect(buildColorDetailMetadata(exact).description).toContain("Exact Tailwind v4:");
  });
  it("uses the actual conversions and palette role for the reported color queries", () => {
    const expected = [
      { input: "f8f9fa", rgb: "rgb(248, 249, 250)", hsl: "hsl(210, 17%, 98%)" },
      { input: "f59e0b", rgb: "rgb(245, 158, 11)", hsl: "hsl(38, 92%, 50%)" },
      { input: "10b981", rgb: "rgb(16, 185, 129)", hsl: "hsl(160, 84%, 39%)" },
      { input: "8b5cf6", rgb: "rgb(139, 92, 246)", hsl: "hsl(258, 90%, 66%)" },
    ];

    for (const item of expected) {
      const color = detail(item.input);
      const metadata = buildColorDetailMetadata(color);
      const description = metadata.description;
      if (typeof description !== "string") {
        throw new Error(`Missing color metadata description for ${item.input}`);
      }

      expect(color.rgbCss).toBe(item.rgb);
      expect(color.hslCss).toBe(item.hsl);
      expect(metadata.title).toBe(`${color.hex} Hex Color Code: RGB, CSS & Contrast`);
      expect(description).toContain(`${item.rgb}; ${item.hsl}`);
      expect(description).toContain("contrast");
      expect(description.length).toBeLessThanOrEqual(200);
      expect(description).toContain(
        isExactTailwindHex(color) ? "Exact Tailwind v4:" : "not exact"
      );
    }

    const lightSurface = detail("f8f9fa");
    expect(lightSurface.usedBy).toContainEqual(
      expect.objectContaining({ nameEn: "F-Pattern Layout", role: "secondary" })
    );
    expect(getColorAnswer(lightSurface)).toContain(
      "Used as a secondary color in the F-Pattern Layout palette."
    );

    for (const input of ["f59e0b", "10b981", "8b5cf6"]) {
      const color = detail(input);
      expect(color.usedBy.length).toBeGreaterThan(1);
      expect(getColorAnswer(color)).toContain(
        `in ${color.usedBy.length} curated StyleKit style palettes`
      );
    }
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
