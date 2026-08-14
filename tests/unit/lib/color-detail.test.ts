import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  getAllDetailSwatches,
  getColorDetail,
  getCuratedColorDetail,
  hexToRgb,
  hexToSlug,
  nearestTailwindToken,
  normalizeHexInput,
  oklabDistance,
  oklchToHex,
  rgbToOklch,
  relativeLuminance,
} from "@/lib/styles/color-detail";
import { TAILWIND_PALETTE } from "@/lib/styles/tailwind-palette";

describe("normalizeHexInput", () => {
  it("normalizes 6-digit hex with or without hash", () => {
    expect(normalizeHexInput("667EEA")).toBe("#667eea");
    expect(normalizeHexInput("#667eea")).toBe("#667eea");
  });

  it("expands 3-digit shorthand", () => {
    expect(normalizeHexInput("#fff")).toBe("#ffffff");
    expect(normalizeHexInput("abc")).toBe("#aabbcc");
  });

  it("rejects invalid input", () => {
    expect(normalizeHexInput("zzz")).toBeNull();
    expect(normalizeHexInput("#12345")).toBeNull();
    expect(normalizeHexInput("")).toBeNull();
  });
});

describe("hexToSlug", () => {
  it("produces 6-digit lowercase slugs without hash", () => {
    expect(hexToSlug("#FFF")).toBe("ffffff");
    expect(hexToSlug("667eea")).toBe("667eea");
    expect(hexToSlug("nope")).toBe("");
  });
});

describe("WCAG math", () => {
  it("computes canonical luminance endpoints", () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 5);
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 5);
  });

  it("computes 21:1 for black on white", () => {
    const white = hexToRgb("#ffffff")!;
    const black = hexToRgb("#000000")!;
    expect(contrastRatio(white, black)).toBeCloseTo(21, 5);
  });

  it("matches the known #667eea vs white ratio", () => {
    const ratio = contrastRatio(hexToRgb("#667eea")!, hexToRgb("#ffffff")!);
    expect(ratio).toBeGreaterThan(3.6);
    expect(ratio).toBeLessThan(3.72);
  });
});

describe("OKLCH conversions", () => {
  it("round-trips through oklch and back within 1 step per channel", () => {
    for (const hex of ["#667eea", "#ff6b6b", "#1a1a2e", "#f59e0b"]) {
      const { l, c, h } = rgbToOklch(hexToRgb(hex)!);
      const back = hexToRgb(oklchToHex(l, c, h))!;
      const original = hexToRgb(hex)!;
      expect(Math.abs(back.r - original.r)).toBeLessThanOrEqual(1);
      expect(Math.abs(back.g - original.g)).toBeLessThanOrEqual(1);
      expect(Math.abs(back.b - original.b)).toBeLessThanOrEqual(1);
    }
  });

  it("reports zero hue for achromatic colors", () => {
    expect(rgbToOklch({ r: 128, g: 128, b: 128 }).h).toBe(0);
  });
});

describe("nearestTailwindToken", () => {
  it("returns an exact match at zero distance", () => {
    const match = nearestTailwindToken(TAILWIND_PALETTE["blue-500"]);
    expect(match.token).toBe("blue-500");
    expect(match.distance).toBe(0);
  });

  it("maps pure white to the white token", () => {
    expect(nearestTailwindToken("#ffffff").token).toBe("white");
  });
});

describe("getColorDetail", () => {
  it("returns null for invalid input", () => {
    expect(getColorDetail("not-a-color")).toBeNull();
  });

  it("builds a complete detail object for a library swatch", () => {
    const detail = getColorDetail("667eea")!;
    expect(detail.hex).toBe("#667eea");
    expect(detail.rgbCss).toBe("rgb(102, 126, 234)");
    expect(detail.oklchCss).toMatch(/^oklch\(/);
    expect(detail.contrast).toHaveLength(4);
    expect(detail.tints).toHaveLength(4);
    expect(detail.shades).toHaveLength(4);
    expect(detail.usedBy.length).toBeGreaterThan(0);
    expect(detail.neighbors.length).toBeGreaterThan(0);
    expect(detail.neighbors[0].hex).not.toBe(detail.hex);
  });

  it("orders neighbors by ascending perceptual distance", () => {
    const { neighbors } = getColorDetail("#667eea")!;
    for (let i = 1; i < neighbors.length; i += 1) {
      expect(neighbors[i].distance).toBeGreaterThanOrEqual(
        neighbors[i - 1].distance
      );
    }
  });

  it("works for hex values outside the curated library", () => {
    const detail = getColorDetail("#123456")!;
    expect(detail.usedBy).toHaveLength(0);
    expect(detail.neighbors.length).toBeGreaterThan(0);
  });

  it("rejects arbitrary hex values from the public curated-page surface", () => {
    expect(getCuratedColorDetail("#123456")).toBeNull();
    expect(getCuratedColorDetail("667eea")?.hex).toBe("#667eea");
  });
});

describe("getAllDetailSwatches", () => {
  it("exposes the full normalized swatch set", () => {
    const swatches = getAllDetailSwatches();
    expect(swatches.length).toBeGreaterThan(400);
    for (const swatch of swatches.slice(0, 20)) {
      expect(swatch).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});

describe("oklabDistance", () => {
  it("is zero for identical colors and symmetric", () => {
    expect(oklabDistance("#667eea", "667eea")).toBe(0);
    expect(oklabDistance("#000000", "#ffffff")).toBeCloseTo(
      oklabDistance("#ffffff", "#000000")
    );
  });
});
