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

  it("sans fonts never fall back to serif", () => {
    const sans = fontPairings.find((p) => p.heading.family === "Bricolage Grotesque");
    expect(sans).toBeDefined();
    const stack = fontStack(sans!.heading);
    expect(stack).toContain("'Bricolage Grotesque'");
    expect(stack).toContain("sans-serif");
    expect(stack).not.toMatch(/,\s*serif$/);
  });

  it("serif fonts fall back to a serif stack", () => {
    const serif = fontPairings.find((p) => p.heading.family === "Gloock");
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
  it("ships a deliberately edited catalog", () => {
    expect(fontPairings.length).toBeGreaterThanOrEqual(15);
    expect(fontPairings.length).toBeLessThanOrEqual(45);
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
    for (const id of ["gallery-gloock", "literary-alegreya", "gothic-grenze"]) {
      const p = fontPairings.find((x) => x.id === id);
      expect(p, `${id} not found`).toBeDefined();
      // Georgia appears only in the serif system stack — proves it is not the sans default.
      expect(fontStack(p!.heading), `${id} should map to serif`).toContain("Georgia");
    }
  });

  it("removes the overused font defaults from the refreshed catalog", () => {
    const rejected = new Set([
      "Inter",
      "Playfair Display",
      "Lora",
      "Fraunces",
      "Instrument Serif",
      "DM Sans",
      "Space Grotesk",
    ]);

    for (const pairing of fontPairings) {
      expect(rejected.has(pairing.heading.family), pairing.id).toBe(false);
      expect(rejected.has(pairing.body.family), pairing.id).toBe(false);
      expect(pairing.license).toBe("OFL");
      expect(pairing.sourceUrl).toContain("fonts.google.com/specimen/");
      expect(pairing.bestFor.length).toBeGreaterThan(10);
    }
  });
});

describe("pairingContrast", () => {
  it("labels a serif heading on a sans body", () => {
    const p = fontPairings.find((x) => x.id === "gallery-gloock")!;
    expect(pairingContrast(p)).toBe("Serif × Sans");
  });

  it("labels mono and sans pairings accurately", () => {
    const technical = fontPairings.find((p) => p.id === "signal-fragment")!;
    expect(pairingContrast(technical)).toBe("Mono × Sans");
  });
});
