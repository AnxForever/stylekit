import { describe, expect, it } from "vitest";

import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  generateHarmony,
  HARMONY_TYPES,
  contrastRatio,
  wcagLevel,
} from "@/lib/color";

describe("color/convert", () => {
  it("hex <-> rgb round-trips", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
  });

  it("expands 3-digit hex", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("rgb -> hsl for primary red", () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });

  it("hsl -> rgb -> hsl round-trips within tolerance", () => {
    const hsl = { h: 210, s: 80, l: 45 };
    const back = rgbToHsl(hslToRgb(hsl));
    expect(Math.abs(back.h - hsl.h)).toBeLessThanOrEqual(2);
    expect(Math.abs(back.s - hsl.s)).toBeLessThanOrEqual(2);
    expect(Math.abs(back.l - hsl.l)).toBeLessThanOrEqual(2);
  });
});

describe("color/harmony", () => {
  it("complementary is 180deg opposite", () => {
    const [, comp] = generateHarmony({ h: 30, s: 50, l: 50 }, "complementary");
    expect(comp.h).toBe(210);
  });

  it("triadic gives three hues 120deg apart", () => {
    const palette = generateHarmony({ h: 0, s: 50, l: 50 }, "triadic");
    expect(palette.map((c) => c.h)).toEqual([0, 120, 240]);
  });

  it("hue wraps around 360", () => {
    const [, comp] = generateHarmony({ h: 300, s: 50, l: 50 }, "complementary");
    expect(comp.h).toBe(120); // (300 + 180) % 360
  });

  it("every harmony type yields a multi-color palette", () => {
    for (const type of HARMONY_TYPES) {
      expect(
        generateHarmony({ h: 200, s: 60, l: 50 }, type).length,
      ).toBeGreaterThan(1);
    }
  });
});

describe("color/contrast", () => {
  it("black on white is 21:1", () => {
    const ratio = contrastRatio(
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
    );
    expect(Math.round(ratio)).toBe(21);
  });

  it("identical colors are 1:1", () => {
    expect(
      contrastRatio({ r: 100, g: 100, b: 100 }, { r: 100, g: 100, b: 100 }),
    ).toBeCloseTo(1, 5);
  });

  it("maps ratios to WCAG levels", () => {
    expect(wcagLevel(21)).toBe("AAA");
    expect(wcagLevel(5)).toBe("AA");
    expect(wcagLevel(3.5)).toBe("AA Large");
    expect(wcagLevel(2)).toBe("Fail");
  });
});
