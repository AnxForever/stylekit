import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { compile as compileTailwind } from "tailwindcss";
import {
  generateTailwindPreset,
  generateTailwindPresetExport,
  generateTailwindPresetJS,
  generateTailwindThemeCSS,
  generateTailwindThemeCSSExport,
} from "@/lib/export/tailwind-preset";
import { generateFigmaTokenExport } from "@/lib/export/figma-tokens";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import type { StyleTokens } from "@/lib/styles/tokens";

const require = createRequire(import.meta.url);

function cloneTokens(slug: string): StyleTokens {
  const tokens = getStyleTokens(slug);
  if (!tokens) throw new Error(`Missing tokens for ${slug}`);
  return structuredClone(tokens);
}

describe("StyleKit Tailwind and Figma export contracts", () => {
  it("uses each style's semantic colors, radius, typography, spacing, and shadows", () => {
    const synthwave = getStyleBySlug("synthwave")!;
    const neoBrutalist = getStyleBySlug("neo-brutalist")!;
    const darkAcademia = getStyleBySlug("dark-academia")!;

    const synthFigma = generateFigmaTokenExport(synthwave);
    const neoFigma = generateFigmaTokenExport(neoBrutalist);
    const academiaFigma = generateFigmaTokenExport(darkAcademia);

    expect(synthFigma.tokens.colors.background?.value).toBe("#0a0a1a");
    expect(synthFigma.tokens.colors.foreground?.value).toBe("#ff00ff");
    expect(synthFigma.tokens.colors.semantic?.border.default?.value).toContain("/ 0.5)");
    expect(synthFigma.tokens.typography.fontFamily.primary?.value).toContain("ui-sans-serif");
    expect(synthFigma.tokens.borderRadius.default?.value).toBe("0.5rem");
    expect(synthFigma.tokens.shadow.sm?.value[0]).toMatchObject({
      x: "0px",
      y: "0px",
      blur: "8px",
      color: "rgba(255,0,255,0.4)",
      type: "dropShadow",
    });

    expect(neoFigma.tokens.borderRadius.default?.value).toBe("0rem");
    expect(academiaFigma.tokens.colors.background?.value).toBe("#f5f0e1");
    expect(academiaFigma.tokens.borderRadius.default?.value).toBe("0.375rem");
    expect(academiaFigma.tokens.typography.fontFamily.primary?.value).toContain("ui-serif");

    const synthPreset = generateTailwindPreset(synthwave);
    const neoPreset = generateTailwindPreset(neoBrutalist);
    const academiaPreset = generateTailwindPreset(darkAcademia);
    expect(synthPreset.theme.extend.colors["background-primary"]).toBe("#0a0a1a");
    expect(synthPreset.theme.extend.colors.border).toContain("/ 0.5)");
    expect(synthPreset.theme.extend.boxShadow.sm).toContain("rgba(255,0,255,0.4)");
    expect(neoPreset.theme.extend.borderRadius.style).toBe("0rem");
    expect(academiaPreset.theme.extend.borderRadius.style).toBe("0.375rem");
    expect(neoPreset.theme.extend.fontFamily.body).toContain("monospace");
    expect(academiaPreset.theme.extend.fontFamily.body).toContain("serif");

    const synthCss = generateTailwindThemeCSS(synthwave);
    const neoCss = generateTailwindThemeCSS(neoBrutalist);
    const academiaCss = generateTailwindThemeCSS(darkAcademia);
    expect(synthCss).toContain("--color-background-primary: #0a0a1a;");
    expect(neoCss).toContain("--radius-style: 0rem;");
    expect(academiaCss).toContain("--radius-style: 0.375rem;");
    expect(synthCss).not.toEqual(neoCss);
    expect(neoCss).not.toEqual(academiaCss);
  });

  it("applies explicit token overrides, opacity, arbitrary values, and responsive values", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const tokens = cloneTokens(style.slug);
    tokens.colors.background.primary = "bg-[#123456]";
    tokens.colors.text.primary = "text-[#abcdef]/40";
    tokens.typography.heading = "font-serif font-medium";
    tokens.typography.sizes.hero = "text-[2rem] md:text-[3rem]";
    tokens.spacing.section = "py-[18px] md:py-[28px] min-[900px]:py-[32px]";
    tokens.border.radius = "rounded-[18px] md:rounded-[24px]";
    tokens.border.width = "border-[3px] md:border-[5px]";
    tokens.shadow.md = "shadow-[0_0_12px_rgba(255,0,0,0.5)]";

    const figma = generateFigmaTokenExport(style, tokens);
    expect(figma.tokens.colors.background?.value).toBe("#123456");
    expect(figma.tokens.colors.foreground?.value).toContain("/ 0.4)");
    expect(figma.tokens.typography.fontFamily.primary?.value).toContain("ui-serif");
    expect(figma.tokens.typography.fontWeight.medium?.value).toBe("500");
    expect(figma.tokens.typography.fontSize.hero?.value).toBe("2rem");
    expect(figma.tokens.spacing.section?.value).toBe("18px");
    expect(figma.tokens.borderRadius.default?.value).toBe("18px");
    expect(figma.tokens.borderWidth.default?.value).toBe("3px");
    expect(figma.tokens.shadow.md?.value[0]).toMatchObject({ blur: "12px", color: "rgba(255,0,0,0.5)" });
    expect(figma.diagnostics.unsupported.some((item) => item.path === "spacing.section" && item.source.includes("md:"))).toBe(true);
    expect(figma.diagnostics.unsupported.some((item) => item.path === "borderRadius.default" && item.source.includes("md:"))).toBe(true);

    const cssExport = generateTailwindThemeCSSExport(style, tokens);
    expect(cssExport.css).toContain("--color-background-primary: #123456;");
    expect(cssExport.css).toContain("--color-border: black;");
    expect(cssExport.css).toContain("--color-text-primary: hsl(210 68% 80% / 0.4);");
    expect(cssExport.css).toContain("--text-hero: 2rem;");
    expect(cssExport.css).toContain("--spacing-stylekit-section: 18px;");
    expect(cssExport.css).toContain("--radius-style: 18px;");
    expect(cssExport.css).toContain("--border-width-style: 3px;");
    expect(cssExport.css).toContain("--shadow-md: 0 0 12px rgba(255,0,0,0.5);");
    expect(cssExport.css).toContain("@media (min-width: 48rem)");
    expect(cssExport.css).toContain("--spacing-stylekit-section: 28px;");
    expect(cssExport.css).toContain("@media (min-width: 900px)");
    expect(cssExport.css).toContain("--spacing-stylekit-section: 32px;");
    expect(cssExport.css).toContain("--text-hero: 3rem;");
    expect(cssExport.css).toContain("--radius-style: 24px;");
    expect(cssExport.diagnostics.unsupported).toEqual([]);

    const presetExport = generateTailwindPresetExport(style, tokens);
    expect(presetExport.preset.theme.extend.colors["background-primary"]).toBe("#123456");
    expect(presetExport.preset.theme.extend.spacing["stylekit-section"]).toBe("18px");
    expect(presetExport.preset.theme.extend.borderRadius.style).toBe("18px");
    expect(presetExport.diagnostics.unsupported.some((item) => item.path === "spacing.section" && item.source.includes("md:"))).toBe(true);
    expect(presetExport.diagnostics.unsupported.some((item) => item.path === "border.radius" && item.source.includes("md:"))).toBe(true);
    expect(generateTailwindPresetJS(style, tokens)).toContain("Tailwind CSS v3.x CommonJS config API");
  });

  it("omits unresolved Figma colors and reports them instead of inventing defaults", () => {
    const style = getStyleBySlug("synthwave")!;
    const tokens = cloneTokens(style.slug);
    tokens.colors.background.primary = "bg-[var(--brand-surface)]";
    const result = generateFigmaTokenExport(style, tokens);

    expect(result.tokens.colors.background).toBeUndefined();
    expect(result.diagnostics.unsupported).toContainEqual(expect.objectContaining({
      path: "colors.semantic.background.primary",
      source: "bg-[var(--brand-surface)]",
    }));
  });

  it("reports modified font utilities instead of exporting them as unconditional values", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const tokens = cloneTokens(style.slug);
    tokens.typography.heading = "font-bold md:font-serif";
    tokens.typography.body = "font-sans hover:font-bold";

    const result = generateFigmaTokenExport(style, tokens);
    expect(result.tokens.typography.fontFamily.primary?.value).toContain("ui-sans-serif");
    expect(result.diagnostics.fallbacks.some((item) => item.path === "typography.fontFamily.primary")).toBe(true);
    expect(result.diagnostics.unsupported).toContainEqual(expect.objectContaining({
      path: "typography.fontFamily.primary",
      source: "md:font-serif",
    }));
    expect(result.diagnostics.unsupported).toContainEqual(expect.objectContaining({
      path: "typography.fontWeight.body",
      source: "hover:font-bold",
    }));
    expect(result.tokens.typography.fontWeight.bold?.value).toBe("700");
  });

  it("compiles its v4 @theme output and generated utility with the installed Tailwind compiler", async () => {
    const style = getStyleBySlug("synthwave")!;
    const compiler = await compileTailwind(generateTailwindThemeCSS(style), {
      base: process.cwd(),
      loadStylesheet: async (id, base) => {
        const path = id === "tailwindcss"
          ? require.resolve("tailwindcss/index.css", { paths: [base] })
          : require.resolve(id, { paths: [base] });
        return { path, base: dirname(path), content: await readFile(path, "utf8") };
      },
    });
    const result = compiler.build([
      "bg-primary",
      "bg-background-primary",
      "text-text-primary",
      "py-stylekit-section",
      "md:py-stylekit-section",
      "rounded-style",
      "border-style",
      "shadow-sm",
      "font-heading",
      "text-hero",
      "bg-button-primary",
      "max-w-sm",
      "max-w-lg",
    ]);

    expect(result).toContain(".bg-primary");
    expect(result).toContain(".bg-background-primary");
    expect(result).toContain(".py-stylekit-section");
    expect(result).toContain(".rounded-style");
    expect(result).toContain(".border-style");
    expect(result).toContain(".shadow-sm");
    expect(result).toContain(".font-heading");
    expect(result).toContain(".text-hero");
    expect(result).toContain(".bg-button-primary");
    expect(result).toMatch(/\.max-w-sm\s*\{\s*max-width:\s*var\(--container-sm\)/);
    expect(result).toMatch(/\.max-w-lg\s*\{\s*max-width:\s*var\(--container-lg\)/);
    expect(result).toContain("--container-sm: 24rem");
    expect(result).toContain("--container-lg: 32rem");
  });

  it("emits executable CommonJS and explicitly scopes the legacy preset to v3", () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const source = generateTailwindPresetJS(style);
    const generatedModule = { exports: {} as unknown };
    new Function("module", source)(generatedModule);

    expect(source).toContain("Tailwind CSS v3.x CommonJS config API");
    expect(source).toContain("Custom spacing keys use the stylekit- namespace");
    expect(generatedModule.exports).toEqual(generateTailwindPreset(style));
  });
});
