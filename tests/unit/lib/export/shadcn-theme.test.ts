import { describe, expect, it } from "vitest";

import { getStyleBySlug, styles } from "@/lib/styles/registry";
import { generateShadcnTheme } from "@/lib/export/shadcn-theme";

const REQUIRED = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "accent",
  "muted",
  "border",
  "input",
  "ring",
  "radius",
] as const;

describe("generateShadcnTheme fidelity", () => {
  it("fills every required token for every style with no NaN", () => {
    for (const style of styles) {
      const theme = generateShadcnTheme(style);
      for (const mode of ["light", "dark"] as const) {
        for (const key of REQUIRED) {
          const value = theme.cssVars[mode][key];
          expect(value, `${style.slug}.${mode}.${key}`).toBeDefined();
          expect(value).not.toContain("NaN");
        }
      }
    }
  });

  it("no style is missing primary/secondary/accent (the old gap)", () => {
    const missing = styles
      .filter((s) => {
        const c = generateShadcnTheme(s).cssVars.light;
        return !c.primary || !c.secondary || !c.accent;
      })
      .map((s) => s.slug);
    expect(missing).toEqual([]);
  });

  it("derives varied radius across styles (not one shared value)", () => {
    const radii = new Set(
      styles.map((s) => generateShadcnTheme(s).cssVars.light.radius),
    );
    expect(radii.size).toBeGreaterThan(2);
  });

  it("derives varied backgrounds across styles", () => {
    const backgrounds = new Set(
      styles.map((s) => generateShadcnTheme(s).cssVars.light.background),
    );
    expect(backgrounds.size).toBeGreaterThan(5);
  });

  it("neo-brutalist reflects its sharp black identity", () => {
    const theme = generateShadcnTheme(getStyleBySlug("neo-brutalist")!);
    expect(theme.cssVars.light.radius).toBe("0rem"); // rounded-none
    expect(theme.cssVars.light.border).toBe("0 0% 0%"); // border-black
    expect(theme.cssVars.light.background).toBe("0 0% 100%"); // bg-white
  });
});
