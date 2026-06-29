import { describe, expect, it } from "vitest";

import {
  fontPairings,
  fontStack,
  generateFontCSS,
  generateTailwindTheme,
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
