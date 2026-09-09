import { describe, expect, it } from "vitest";

import { fontPairings } from "@/lib/typography";
import { specimenPalette, specimenPalettes } from "@/lib/typography/specimen";

const HEX = /^#[0-9a-f]{6}$/;

function relativeLuminance(hex: string): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(parseInt(hex.slice(1, 3), 16));
  const g = channel(parseInt(hex.slice(3, 5), 16));
  const b = channel(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Mirrors `color-mix(in srgb, currentColor <pct>%, transparent)` composited over
// the sheet — how `.specimen-ink-muted` actually renders.
function mixOverPaper(ink: string, paper: string, pct: number): string {
  const parts = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const [ir, ig, ib] = parts(ink);
  const [pr, pg, pb] = parts(paper);
  return (
    "#" +
    [
      [ir, pr],
      [ig, pg],
      [ib, pb],
    ]
      .map(([i, p]) => Math.round(i * pct + p * (1 - pct)).toString(16).padStart(2, "0"))
      .join("")
  );
}

// Keep in step with `.specimen-ink-muted` in app/globals.css.
const MUTED_MIX = 0.72;

describe("specimen palettes", () => {
  it("gives every pairing a complete light and dark stock", () => {
    for (const pairing of fontPairings) {
      const palette = specimenPalette(pairing);
      expect(palette, pairing.id).toBeDefined();
      for (const key of ["paper", "ink", "paperDark", "inkDark"] as const) {
        expect(palette[key], `${pairing.id}.${key}`).toMatch(HEX);
      }
    }
  });

  it("returns the same stock for a pairing every time", () => {
    for (const pairing of fontPairings) {
      expect(specimenPalette(pairing).id).toBe(specimenPalette(pairing).id);
    }
  });

  it("spreads the catalogue over several stocks so the wall is not one flat field", () => {
    const used = new Set(fontPairings.map((p) => specimenPalette(p).id));
    expect(used.size).toBeGreaterThanOrEqual(6);
  });

  it("varies the stock within a category", () => {
    const byCategory = new Map<string, Set<string>>();
    for (const pairing of fontPairings) {
      const seen = byCategory.get(pairing.category) ?? new Set<string>();
      seen.add(specimenPalette(pairing).id);
      byCategory.set(pairing.category, seen);
    }
    // Categories with room to vary (more than two pairings) should use more
    // than one stock, or neighbouring cards print identically.
    for (const [category, stocks] of byCategory) {
      const count = fontPairings.filter((p) => p.category === category).length;
      if (count > 2) expect(stocks.size, category).toBeGreaterThan(1);
    }
  });

  it("keeps body-weight specimen copy at 4.5:1 on every stock, both themes", () => {
    for (const palette of Object.values(specimenPalettes)) {
      const light = contrast(mixOverPaper(palette.ink, palette.paper, MUTED_MIX), palette.paper);
      const dark = contrast(
        mixOverPaper(palette.inkDark, palette.paperDark, MUTED_MIX),
        palette.paperDark,
      );
      expect(light, `${palette.id} light`).toBeGreaterThanOrEqual(4.5);
      expect(dark, `${palette.id} dark`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps full-strength ink well clear of its paper", () => {
    for (const palette of Object.values(specimenPalettes)) {
      expect(contrast(palette.ink, palette.paper), `${palette.id} light`).toBeGreaterThan(7);
      expect(contrast(palette.inkDark, palette.paperDark), `${palette.id} dark`).toBeGreaterThan(7);
    }
  });
});
