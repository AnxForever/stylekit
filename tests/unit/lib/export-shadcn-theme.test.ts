import { describe, it, expect } from "vitest";
import {
  generateShadcnTheme,
  generateShadcnThemeJSON,
  generateShadcnThemeCSS,
} from "@/lib/export/shadcn-theme";
import { getStyleBySlug } from "@/lib/styles";

// ---------------------------------------------------------------------------
// generateShadcnTheme
// ---------------------------------------------------------------------------

describe("generateShadcnTheme", () => {
  it("returns a valid theme structure for neo-brutalist", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const theme = generateShadcnTheme(style);
    expect(theme).toHaveProperty("name", "neo-brutalist");
    expect(theme).toHaveProperty("cssVars");
    expect(theme.cssVars).toHaveProperty("light");
    expect(theme.cssVars).toHaveProperty("dark");
  });

  it("light vars contain required CSS variable keys", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const theme = generateShadcnTheme(style);
    const requiredKeys = [
      "background",
      "foreground",
      "primary",
      "secondary",
      "accent",
      "destructive",
      "border",
      "ring",
      "radius",
    ];
    for (const key of requiredKeys) {
      expect(theme.cssVars.light).toHaveProperty(key);
    }
  });

  it("dark vars contain required CSS variable keys", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const theme = generateShadcnTheme(style);
    const requiredKeys = [
      "background",
      "foreground",
      "primary",
      "secondary",
      "accent",
      "destructive",
      "border",
      "ring",
      "radius",
    ];
    for (const key of requiredKeys) {
      expect(theme.cssVars.dark).toHaveProperty(key);
    }
  });

  it("derives neumorphism tokens (soft rounded, tinted background)", () => {
    const style = getStyleBySlug("neumorphism")!;
    const theme = generateShadcnTheme(style);
    // Derived from neumorphism's own tokens, not a hardcoded override.
    expect(theme.cssVars.light.radius).toMatch(/rem$/);
    expect(theme.cssVars.light.radius).not.toBe("0rem");
    // Neumorphism uses a cool blue-grey surface, not pure white.
    const bgHue = parseInt(theme.cssVars.light.background.split(" ")[0], 10);
    expect(bgHue).toBeGreaterThanOrEqual(200);
    expect(bgHue).toBeLessThanOrEqual(235);
  });

  it("derives glassmorphism radius from its tokens (rounded, not sharp)", () => {
    const style = getStyleBySlug("glassmorphism")!;
    const theme = generateShadcnTheme(style);
    // Radius is now derived from the style's own token, not a hardcoded override.
    expect(theme.cssVars.light.radius).toMatch(/rem$/);
    expect(theme.cssVars.light.radius).not.toBe("0rem");
    expect(theme.cssVars.dark.radius).toBe(theme.cssVars.light.radius);
  });

  it("applies editorial-specific overrides", () => {
    const style = getStyleBySlug("editorial")!;
    const theme = generateShadcnTheme(style);
    expect(theme.cssVars.light.radius).toBe("0rem");
  });

  it("uses default radius for styles without overrides", () => {
    const style = getStyleBySlug("minimalist-flat")!;
    const theme = generateShadcnTheme(style);
    expect(theme.cssVars.light.radius).toBe("0rem");
  });

  it("primary color is an HSL string", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const theme = generateShadcnTheme(style);
    // HSL format: "H S% L%"
    expect(theme.cssVars.light.primary).toMatch(/^\d+ \d+% \d+%$/);
  });
});

// ---------------------------------------------------------------------------
// generateShadcnThemeJSON
// ---------------------------------------------------------------------------

describe("generateShadcnThemeJSON", () => {
  it("returns valid JSON string", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const json = generateShadcnThemeJSON(style);
    expect(typeof json).toBe("string");
    const parsed = JSON.parse(json);
    expect(parsed).toHaveProperty("name");
    expect(parsed).toHaveProperty("cssVars");
  });

  it("preserves all theme data in JSON", () => {
    const style = getStyleBySlug("glassmorphism")!;
    const theme = generateShadcnTheme(style);
    const json = generateShadcnThemeJSON(style);
    const parsed = JSON.parse(json);
    expect(parsed.name).toBe(theme.name);
    expect(parsed.cssVars.light.primary).toBe(theme.cssVars.light.primary);
  });
});

// ---------------------------------------------------------------------------
// generateShadcnThemeCSS
// ---------------------------------------------------------------------------

describe("generateShadcnThemeCSS", () => {
  it("returns a non-empty CSS string", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(typeof css).toBe("string");
    expect(css.length).toBeGreaterThan(0);
  });

  it("contains the style name in a comment", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(css).toContain(style.nameEn);
    expect(css).toContain("Generated by StyleKit");
  });

  it("contains @layer base directives", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(css).toContain("@layer base");
  });

  it("contains :root selector for light vars", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(css).toContain(":root");
  });

  it("contains .dark selector for dark vars", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(css).toContain(".dark");
  });

  it("includes CSS custom properties with -- prefix", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(css).toContain("--primary:");
    expect(css).toContain("--background:");
    expect(css).toContain("--radius:");
  });

  it("includes body base styles", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const css = generateShadcnThemeCSS(style);
    expect(css).toContain("bg-background");
    expect(css).toContain("text-foreground");
  });
});
