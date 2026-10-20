import { describe, expect, it } from "vitest";

import { getStyleBySlug, styles } from "@/lib/styles/registry";
import { generateShadcnTheme, generateShadcnThemeCSS, generateShadcnThemeExport } from "@/lib/export/shadcn-theme";
import { getStyleTokens } from "@/lib/styles/tokens-registry";

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

  it("every style has a legible foreground/background contrast (light + dark)", () => {
    const bad: string[] = [];
    for (const style of styles) {
      const t = generateShadcnTheme(style);
      for (const mode of ["light", "dark"] as const) {
        const bgL = parseInt(t.cssVars[mode].background.split(" ")[2], 10);
        const fgL = parseInt(t.cssVars[mode].foreground.split(" ")[2], 10);
        if (Math.abs(bgL - fgL) < 25) bad.push(`${style.slug}.${mode}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("dark backgrounds vary — natively-dark styles keep identity in dark mode", () => {
    const darkBgs = new Set(
      styles.map((s) => generateShadcnTheme(s).cssVars.dark.background),
    );
    expect(darkBgs.size).toBeGreaterThan(1);
  });

  it("emits the full modern token set (chart + sidebar) in both modes", () => {
    const t = generateShadcnTheme(getStyleBySlug("glassmorphism")!);
    for (const key of [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-border",
    ]) {
      expect(t.cssVars.light[key], key).toBeDefined();
      expect(t.cssVars.dark[key], key).toBeDefined();
    }
  });

  it("validates color utility prefixes and reports a fallback for unresolved surfaces", () => {
    const style = getStyleBySlug("synthwave")!;
    const tokens = structuredClone(getStyleTokens(style.slug)!);
    tokens.colors.background.primary = "text-red-500";

    const result = generateShadcnThemeExport(style, tokens);
    expect(result.theme.cssVars.light.background).toBe("0 0% 100%");
    expect(result.theme.cssVars.light.background).not.toContain("red");
    expect(result.diagnostics.unsupported).toContainEqual(expect.objectContaining({
      path: "colors.background.primary",
      source: "text-red-500",
    }));
    expect(result.diagnostics.fallbacks).toContainEqual(expect.objectContaining({
      path: "colors.background.primary",
      source: "text-red-500",
    }));
  });

  it("keeps CSS variables in HSL component form and preserves alpha", () => {
    const style = getStyleBySlug("synthwave")!;
    const tokens = structuredClone(getStyleTokens(style.slug)!);
    tokens.colors.background.primary = "bg-white/12";

    const result = generateShadcnThemeExport(style, tokens);
    const css = generateShadcnThemeCSS(style, tokens);
    expect(result.theme.cssVars.light.background).toBe("0 0% 100% / 0.12");
    expect(result.diagnostics.unsupported.some((item) => item.path === "colors.background.primary" && item.reason.includes("compositing"))).toBe(true);
    expect(css).toContain("--background: 0 0% 100% / 0.12;");
    expect(css).not.toContain("--background: hsl(");
  });

  it("preserves modern rgba and hsla alpha in the exported theme", () => {
    const style = getStyleBySlug("synthwave")!;
    const rgbaTokens = structuredClone(getStyleTokens(style.slug)!);
    rgbaTokens.colors.background.primary = "bg-[rgba(255_0_0_/_0.5)]";
    const rgbaTheme = generateShadcnThemeExport(style, rgbaTokens);

    const hslaTokens = structuredClone(getStyleTokens(style.slug)!);
    hslaTokens.colors.background.primary = "bg-[hsla(120_100%_50%_/_25%)]";
    const hslaTheme = generateShadcnThemeExport(style, hslaTokens);

    expect(rgbaTheme.theme.cssVars.light.background).toBe("0 100% 50% / 0.5");
    expect(hslaTheme.theme.cssVars.light.background).toBe("120 100% 50% / 0.25");
  });

  it("keeps glass borders distinct from translucent surfaces", () => {
    for (const slug of ["glassmorphism", "liquid-glass"]) {
      const theme = generateShadcnTheme(getStyleBySlug(slug)!);
      expect(theme.cssVars.light.background, slug).toContain("/");
      expect(theme.cssVars.light.border, slug).not.toBe(theme.cssVars.light.background);
    }
  });
});
