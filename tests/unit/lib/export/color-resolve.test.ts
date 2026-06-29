import { describe, expect, it } from "vitest";

import {
  colorToHsl,
  hslLightness,
  resolveTwColor,
  twRadiusToRem,
} from "@/lib/export/color-resolve";

const HSL_RE = /^\d{1,3} \d{1,3}% \d{1,3}%$/;

describe("colorToHsl", () => {
  it("handles white/black keywords and hex shortcuts", () => {
    expect(colorToHsl("white")).toBe("0 0% 100%");
    expect(colorToHsl("black")).toBe("0 0% 0%");
    expect(colorToHsl("#fff")).toBe("0 0% 100%");
  });

  it("converts arbitrary hex to HSL", () => {
    // #ff006e = rgb(255,0,110) -> hsl(334 100% 50%)
    expect(colorToHsl("#ff006e")).toBe("334 100% 50%");
  });

  it("parses rgba and ignores alpha (fixes glassmorphism primary)", () => {
    expect(colorToHsl("rgba(255, 255, 255, 0.15)")).toBe("0 0% 100%");
    expect(colorToHsl("rgb(0,0,0)")).toBe("0 0% 0%");
  });

  it("converts oklch correctly (gold standard: pure sRGB red)", () => {
    // oklch(0.628 0.2577 29.234) is the oklch of #ff0000.
    const hsl = colorToHsl("oklch(0.628 0.2577 29.234)");
    expect(hsl).toMatch(HSL_RE);
    const [h, s, l] = hsl!.split(" ");
    const hue = parseInt(h, 10);
    expect(hue <= 8 || hue >= 352).toBe(true); // red hue
    expect(parseInt(s, 10)).toBeGreaterThanOrEqual(95); // saturated
    expect(Math.abs(parseInt(l, 10) - 50)).toBeLessThanOrEqual(3); // mid lightness
  });

  it("returns null for non-colors", () => {
    expect(colorToHsl("transparent")).toBeNull();
    expect(colorToHsl("not-a-color")).toBeNull();
  });
});

describe("resolveTwColor", () => {
  it("resolves white/black utility classes", () => {
    expect(resolveTwColor("bg-white")).toBe("0 0% 100%");
    expect(resolveTwColor("text-black")).toBe("0 0% 0%");
    expect(resolveTwColor("border-black")).toBe("0 0% 0%");
  });

  it("resolves arbitrary value classes", () => {
    expect(resolveTwColor("bg-[#ff006e]")).toBe("334 100% 50%");
  });

  it("resolves named palette colors via the Tailwind oklch palette", () => {
    // gray-900 is very dark; gray-50 is near-white.
    const dark = resolveTwColor("text-gray-900");
    const light = resolveTwColor("bg-gray-50");
    expect(dark).toMatch(HSL_RE);
    expect(light).toMatch(HSL_RE);
    expect(hslLightness(dark!)!).toBeLessThan(25);
    expect(hslLightness(light!)!).toBeGreaterThan(90);
  });

  it("keeps a red palette color in the red hue band", () => {
    const red = resolveTwColor("bg-red-500");
    expect(red).toMatch(HSL_RE);
    const hue = parseInt(red!.split(" ")[0], 10);
    expect(hue <= 25 || hue >= 350).toBe(true);
  });

  it("returns null for bare gradient direction and non-color utilities", () => {
    expect(resolveTwColor("bg-gradient-to-r")).toBeNull();
    expect(resolveTwColor("flex")).toBeNull();
  });

  it("resolves the first color in a multi-class string", () => {
    // e.g. glassmorphism bg: "bg-white/12 backdrop-blur-[40px] ..."
    expect(resolveTwColor("bg-white/12 backdrop-blur-[40px]")).toBe("0 0% 100%");
    expect(resolveTwColor("flex items-center bg-black")).toBe("0 0% 0%");
  });

  it("strips opacity modifiers before palette lookup", () => {
    // border-cyan-400/30 must resolve cyan-400, not fall back
    const cyan = resolveTwColor("border-cyan-400/30");
    expect(cyan).toMatch(HSL_RE);
    const hue = parseInt(cyan!.split(" ")[0], 10);
    expect(hue >= 170 && hue <= 210).toBe(true); // cyan band
  });

  it("resolves the from-* stop of a gradient", () => {
    const c = resolveTwColor(
      "bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500",
    );
    expect(c).toMatch(HSL_RE);
    const hue = parseInt(c!.split(" ")[0], 10);
    expect(hue >= 190 && hue <= 230).toBe(true); // sky band
  });
});

describe("twRadiusToRem", () => {
  it("maps the Tailwind radius scale", () => {
    expect(twRadiusToRem("rounded-none")).toBe("0rem");
    expect(twRadiusToRem("rounded")).toBe("0.25rem");
    expect(twRadiusToRem("rounded-lg")).toBe("0.5rem");
    expect(twRadiusToRem("rounded-xl")).toBe("0.75rem");
    expect(twRadiusToRem("rounded-2xl")).toBe("1rem");
    expect(twRadiusToRem("rounded-full")).toBe("9999px");
  });

  it("passes through arbitrary radius and rejects non-radius", () => {
    expect(twRadiusToRem("rounded-[20px]")).toBe("20px");
    expect(twRadiusToRem("border-2")).toBeNull();
  });
});
