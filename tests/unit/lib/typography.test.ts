import { describe, expect, it } from "vitest";

import {
  fontPairings,
  fontStack,
  generateFontCSS,
  generateTailwindTheme,
  pairingContrast,
} from "@/lib/typography";

describe("typography font generation", () => {
  it("every pairing's CSS carries a real system fallback chain", () => {
    for (const p of fontPairings) {
      const css = generateFontCSS(p);
      expect(css).toContain(p.heading.family);
      expect(css).toContain(p.body.family);
      // A bare `, serif` is the bug we fixed; require a real system stack.
      expect(css, `${p.id} missing system fallback`).toMatch(
        /ui-(serif|sans-serif|monospace)|system-ui|-apple-system/,
      );
    }
  });

  it("sans fonts never fall back to serif (Inter)", () => {
    const inter = fontPairings.find((p) => p.heading.family === "Inter");
    expect(inter).toBeDefined();
    const stack = fontStack(inter!.heading);
    expect(stack).toContain("'Inter'");
    expect(stack).toContain("sans-serif");
    expect(stack).not.toMatch(/,\s*serif$/);
  });

  it("serif fonts fall back to a serif stack (Playfair Display)", () => {
    const serif = fontPairings.find(
      (p) => p.heading.family === "Playfair Display",
    );
    expect(fontStack(serif!.heading)).toMatch(/Georgia.*serif$/);
  });

  it("monospace fonts fall back to a mono stack", () => {
    const mono = fontPairings.find(
      (p) =>
        p.heading.family.includes("Mono") || p.heading.family === "Fira Code",
    );
    if (mono) {
      expect(fontStack(mono.heading)).toContain("monospace");
    }
  });

  it("generateTailwindTheme emits a valid Tailwind v4 @theme block", () => {
    const css = generateTailwindTheme(fontPairings[0]);
    expect(css).toContain("@theme");
    expect(css).toContain("--font-heading");
    expect(css).toContain("--font-body");
    expect(css).toContain("font-heading");
  });
});

describe("typography pairing metadata", () => {
  it("ships the expanded curated set", () => {
    expect(fontPairings.length).toBeGreaterThanOrEqual(35);
  });

  it("includes the display and handwritten categories", () => {
    const cats = new Set(fontPairings.map((p) => p.category));
    expect(cats.has("display")).toBe(true);
    expect(cats.has("handwritten")).toBe(true);
  });

  it("gives every display / handwritten face a hero preview word", () => {
    const heroFaces = fontPairings.filter(
      (p) => p.category === "display" || p.category === "handwritten",
    );
    expect(heroFaces.length).toBeGreaterThan(0);
    for (const p of heroFaces) {
      expect(p.previewWord, `${p.id} missing previewWord`).toBeTruthy();
    }
  });

  it("maps display serif faces to a serif fallback (FONT_GENERIC coverage)", () => {
    for (const id of ["fatface-abril", "fashion-dmserif", "expressive-fraunces"]) {
      const p = fontPairings.find((x) => x.id === id);
      expect(p, `${id} not found`).toBeDefined();
      // Georgia appears only in the serif system stack — proves it is not the sans default.
      expect(fontStack(p!.heading), `${id} should map to serif`).toContain("Georgia");
    }
  });
});

describe("pairingContrast", () => {
  it("labels a serif heading on a sans body", () => {
    const p = fontPairings.find((x) => x.id === "editorial-serif")!;
    expect(pairingContrast(p)).toBe("Serif × Sans");
  });

  it("flags single-family pairings where contrast lives in weight", () => {
    const single = fontPairings.find((p) => p.heading.family === p.body.family);
    expect(single).toBeDefined();
    expect(pairingContrast(single!)).toMatch(/one family/);
  });
});
