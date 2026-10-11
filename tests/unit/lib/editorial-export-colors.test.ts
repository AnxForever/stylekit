import { describe, expect, it } from "vitest";

import { contrastRatio, meetsAA } from "@/lib/accessibility/wcag";
import { generateFigmaTokens, resolveFigmaColorToken } from "@/lib/export/figma-tokens";
import { generateShadcnTheme } from "@/lib/export/shadcn-theme";
import { generateStylePack } from "@/lib/export/style-pack";
import { generateTailwindPreset } from "@/lib/export/tailwind-preset";
import { generateIdeConfig } from "@/lib/export/ide-configs";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getImplementationBrief } from "@/lib/implementation-brief";

const editorial = getStyleBySlug("editorial")!;

describe("Editorial palette exports", () => {
  it("keeps the paper-and-ink base and exports both approved muted accents", () => {
    const figma = generateFigmaTokens(editorial);
    const tailwind = generateTailwindPreset(editorial).theme.extend.colors;
    const shadcn = generateShadcnTheme(editorial).cssVars.light;

    expect(figma.colors.background.value).toBe("#F9F8F6");
    expect(figma.colors.foreground.value).toBe("#1C1C1C");
    expect(figma.colors.accent["accent-1"].value).toBe("#6B7280");
    expect(figma.colors.accent["accent-2"].value).toBe("#816D70");
    expect(tailwind["accent-1"]).toBe("#6B7280");
    expect(tailwind["accent-2"]).toBe("#816D70");
    expect(shadcn.background).toBe("40 20% 97%");
    expect(shadcn.foreground).toBe("0 0% 11%");
    expect(shadcn.accent).toBe("220 9% 46%");
  });

  it("carries the same palette through generated style-pack and agent files", () => {
    const files = generateStylePack(editorial);
    const tokensFile = files.find((file) => file.filename === "editorial-tokens.json")!;
    const shadcnFile = files.find((file) => file.filename === "editorial-shadcn-theme.json")!;
    const tailwindFile = files.find((file) => file.filename === "editorial-tailwind-preset.js")!;
    const exportedTokens = JSON.parse(tokensFile.content);
    const exportedTheme = JSON.parse(shadcnFile.content);
    const generatedModule = { exports: {} as Record<string, unknown> };
    new Function("module", tailwindFile.content)(generatedModule);

    expect(exportedTokens.colors.background.value).toBe("#F9F8F6");
    expect(exportedTokens.colors.foreground.value).toBe("#1C1C1C");
    expect(exportedTokens.colors.accent["accent-1"].value).toBe("#6B7280");
    expect(exportedTokens.colors.accent["accent-2"].value).toBe("#816D70");
    expect(exportedTheme.cssVars.light.background).toBe("40 20% 97%");
    expect(generatedModule.exports).toHaveProperty(
      "theme.extend.colors.accent-1",
      "#6B7280",
    );
    expect(generatedModule.exports).toHaveProperty(
      "theme.extend.colors.accent-2",
      "#816D70",
    );

    const ideRules = generateIdeConfig("editorial", "cursorrules");
    const promptRules = generateEnhancedAIRules({
      style: editorial,
      tokens: getStyleTokens("editorial")!,
      format: "full",
      locale: "en",
    });
    expect(ideRules).toContain("#6B7280");
    expect(ideRules).toContain("#816D70");
    expect(promptRules).toContain("#6B7280");
    expect(promptRules).toContain("#816D70");
    expect(promptRules).not.toContain("NO colored accents");
  });

  it("keeps both muted accents AA-readable as text on the warm paper base", () => {
    for (const accent of editorial.colors.accent) {
      expect(meetsAA(contrastRatio(accent, editorial.colors.secondary)), accent).toBe(true);
    }
  });

  it("keeps shared secondary and muted text readable with the cool Editorial variant", () => {
    const brief = getImplementationBrief("editorial")!;
    const cool = brief.variants.find((variant) => variant.id === "editorial-cool")!;
    const tokens = brief.tokens!;
    const secondary = resolveFigmaColorToken(tokens.colors.text.secondary, "#000000");
    const muted = resolveFigmaColorToken(tokens.colors.text.muted, "#000000");

    expect(meetsAA(contrastRatio(secondary, cool.colors.secondary))).toBe(true);
    expect(meetsAA(contrastRatio(muted, cool.colors.secondary))).toBe(true);
    expect(meetsAA(contrastRatio("#6B7280", cool.colors.secondary))).toBe(false);
  });

  it("preserves alpha in a real translucent semantic background token", () => {
    const liquidGlass = getStyleBySlug("liquid-glass")!;
    const figma = generateFigmaTokens(liquidGlass);

    expect(figma.colors.background.value).toBe("rgba(255, 255, 255, 0.1)");
  });

  it("parses bracketed Tailwind opacity without losing alpha", () => {
    expect(resolveFigmaColorToken("bg-[#fff]/[0.5]", "#fallback")).toBe(
      "rgba(255, 255, 255, 0.5)",
    );
    expect(resolveFigmaColorToken("bg-white/[50%]", "#fallback")).toBe(
      "rgba(255, 255, 255, 0.5)",
    );
    expect(resolveFigmaColorToken("bg-[rgb(255_255_255_/_50%)]", "#fallback")).toBe(
      "rgb(255 255 255 / 50%)",
    );
    expect(resolveFigmaColorToken("bg-[#ffffff80]", "#fallback")).toBe(
      "rgba(255, 255, 255, 0.502)",
    );
    expect(resolveFigmaColorToken("bg-[oklch(90%_0.2_20_/_50%)]", "#fallback")).toBe(
      "#fallback",
    );
    expect(resolveFigmaColorToken("bg-white/[var(--opacity)]", "#fallback")).toBe(
      "#fallback",
    );
  });

  it("retains a native dark style's semantic background and foreground", () => {
    const cyberpunk = getStyleBySlug("cyberpunk-neon")!;
    const figma = generateFigmaTokens(cyberpunk);

    expect(figma.colors.background.value).toBe("#0a0a0f");
    expect(figma.colors.foreground.value).toBe("#ffffff");
    expect(figma.colors.foreground.value).not.toBe(cyberpunk.colors.primary);
  });

  it("exports a gradient background as its first color stop in the scalar Figma color field", () => {
    const claymorphism = getStyleBySlug("claymorphism")!;
    const figma = generateFigmaTokens(claymorphism);

    expect(figma.colors.background.value).toBe("#fef3c8");
  });

  it("exports Figma background and foreground as valid CSS colors, not bare HSL triplets", () => {
    const validColor = /^(?:#[\da-f]{3}|#[\da-f]{4}|#[\da-f]{6}|#[\da-f]{8}|rgba?\([^)]*\)|hsla?\([^)]*\))$/i;
    const invalid: string[] = [];

    for (const style of styles) {
      const { background, foreground } = generateFigmaTokens(style).colors;
      for (const [role, color] of [["background", background.value], ["foreground", foreground.value]] as const) {
        if (!validColor.test(color)) invalid.push(`${style.slug}.${role}=${color}`);
      }
    }

    expect(invalid).toEqual([]);
  });
});
