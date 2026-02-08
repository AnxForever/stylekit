import { describe, it, expect } from "vitest";
import { normalizeCssColorToHex } from "@/lib/style-extractor/css-color";

describe("css-color utils", () => {
  it("normalizes hex formats (drops alpha)", () => {
    expect(normalizeCssColorToHex("#abc")).toBe("#aabbcc");
    expect(normalizeCssColorToHex("#abcd")).toBe("#aabbcc");
    expect(normalizeCssColorToHex("#aabbcc")).toBe("#aabbcc");
    expect(normalizeCssColorToHex("#aabbccdd")).toBe("#aabbcc");
  });

  it("normalizes rgb/rgba to hex (drops alpha)", () => {
    expect(normalizeCssColorToHex("rgb(255, 0, 102)")).toBe("#ff0066");
    expect(normalizeCssColorToHex("rgb(255 0 102 / 0.9)")).toBe("#ff0066");
    expect(normalizeCssColorToHex("rgba(255, 0, 0, 0.2)")).toBe("#ff0000");
    expect(normalizeCssColorToHex("rgb(100% 0% 0%)")).toBe("#ff0000");
  });

  it("normalizes hsl/hsla to hex (drops alpha)", () => {
    expect(normalizeCssColorToHex("hsl(0 100% 50%)")).toBe("#ff0000");
    expect(normalizeCssColorToHex("hsla(120, 100%, 50%, 0.5)")).toBe("#00ff00");
    expect(normalizeCssColorToHex("hsl(0.5turn 100% 50%)")).toBe("#00ffff");
  });

  it("normalizes oklch to hex for neutral colors", () => {
    expect(normalizeCssColorToHex("oklch(0% 0 0)")).toBe("#000000");
    expect(normalizeCssColorToHex("oklch(100% 0 0)")).toBe("#ffffff");
  });

  it("resolves CSS variables before normalizing", () => {
    const vars = {
      "--primary": "hsl(0 100% 50%)",
      "--secondary": "oklch(100% 0 0)",
      "--nested": "var(--primary)",
    };

    expect(normalizeCssColorToHex("var(--primary)", vars)).toBe("#ff0000");
    expect(normalizeCssColorToHex("var(--secondary)", vars)).toBe("#ffffff");
    expect(normalizeCssColorToHex("var(--nested)", vars)).toBe("#ff0000");
    expect(normalizeCssColorToHex("var(--missing, #112233)", vars)).toBe("#112233");
  });
});

