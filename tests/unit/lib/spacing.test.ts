import { describe, expect, it } from "vitest";

import {
  SPACING_PRESETS,
  GRID_PRESETS,
  spacingTokens,
  isOnGrid,
  snapToGrid,
  generateSpacingCSS,
  generateSpacingTailwind,
} from "@/lib/spacing";

describe("spacing presets", () => {
  it("ships an 8-point and a 4-point preset", () => {
    const ids = SPACING_PRESETS.map((p) => p.id);
    expect(ids).toContain("8pt");
    expect(ids).toContain("4pt");
  });

  it("every 8-point value is a multiple of 4 (whole pixels at every density)", () => {
    const preset = SPACING_PRESETS.find((p) => p.id === "8pt")!;
    for (const v of preset.values) {
      expect(v.px % 4, `${v.key}=${v.px} off 4px grid`).toBe(0);
    }
  });

  it("converts px to rem against a 16px root", () => {
    const preset = SPACING_PRESETS.find((p) => p.id === "8pt")!;
    const tokens = spacingTokens(preset);
    expect(tokens.find((t) => t.key === "md")!.rem).toBe(1);
    expect(tokens.find((t) => t.key === "sm")!.rem).toBe(0.5);
  });
});

describe("isOnGrid / snapToGrid", () => {
  it("accepts multiples of the base and rejects others", () => {
    expect(isOnGrid(16, 8)).toBe(true);
    expect(isOnGrid(24, 8)).toBe(true);
    expect(isOnGrid(12, 8)).toBe(false);
    expect(isOnGrid(13, 8)).toBe(false);
  });

  it("snaps an off-grid value to the nearest grid step", () => {
    expect(snapToGrid(13, 8)).toBe(16);
    expect(snapToGrid(11, 8)).toBe(8);
    expect(snapToGrid(12, 4)).toBe(12);
  });
});

describe("layout grid presets", () => {
  it("desktop uses a 12-column grid", () => {
    const desktop = GRID_PRESETS.find((g) => g.id === "desktop")!;
    expect(desktop.columns).toBe(12);
    expect(12 % 2).toBe(0);
    expect(12 % 3).toBe(0);
    expect(12 % 4).toBe(0);
    expect(12 % 6).toBe(0);
  });

  it("gutters and margins stay on the spacing grid", () => {
    for (const g of GRID_PRESETS) {
      expect(g.gutter % 8).toBe(0);
      expect(g.margin % 8).toBe(0);
    }
  });
});

describe("spacing code generation", () => {
  it("CSS emits --space-* custom properties", () => {
    const css = generateSpacingCSS(SPACING_PRESETS[0]);
    expect(css).toContain(":root {");
    expect(css).toContain("--space-md: 1rem;");
  });

  it("Tailwind emits an @theme block with --spacing-*", () => {
    const tw = generateSpacingTailwind(SPACING_PRESETS[0]);
    expect(tw).toContain("@theme {");
    expect(tw).toContain("--spacing-md:");
  });
});
