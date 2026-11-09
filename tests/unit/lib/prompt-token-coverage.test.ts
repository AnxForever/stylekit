import { describe, expect, it } from "vitest";
import { styles } from "@/lib/styles";
import { rawStyles } from "@/lib/styles/registry";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { buildHardPrompt, buildSoftPrompt } from "@/lib/styles/prompt-pair";
import { editorialSpec } from "@/lib/design-spec/samples/editorial";
import { renderCssVariables, renderDesignMd, renderDtcg } from "@/lib/design-spec";

const CJK = /[㐀-鿿]/g;

function cjkRatio(value: string): number {
  return (value.match(CJK) ?? []).length / Math.max(value.length, 1);
}

function promptInputFor(slug: string, locale: "zh" | "en") {
  const style = styles.find((candidate) => candidate.slug === slug);
  if (!style) throw new Error(`unknown style: ${slug}`);
  const tokens = getStyleTokens(slug);
  if (!tokens) throw new Error(`no tokens for style: ${slug}`);

  const enhancedRules = generateEnhancedAIRules({
    style,
    tokens,
    format: "full",
    locale,
  });

  return {
    styleName: locale === "zh" ? style.name : style.nameEn,
    styleSlug: style.slug,
    aiRules: style.aiRules,
    aiRulesEn: style.aiRulesEn,
    enhancedRules,
    doList: style.doList,
    doListEn: style.doListEn,
    dontList: style.dontList,
    dontListEn: style.dontListEn,
    keywords: style.keywords,
    keywordsEn: style.keywordsEn,
  };
}

function hardPromptFor(slug: string, locale: "zh" | "en"): string {
  return buildHardPrompt(promptInputFor(slug, locale), locale);
}

describe("prompt token coverage", () => {
  it("ships the token dictionary in both locales for every style", () => {
    const missing: string[] = [];

    for (const style of styles) {
      if (!getStyleTokens(style.slug)) continue;

      for (const locale of ["zh", "en"] as const) {
        const prompt = hardPromptFor(style.slug, locale);
        const hasDictionary = /(Token Dictionary|Token 字典)/i.test(prompt);
        const hasClassValues = /(gap-|py-|rounded-|shadow-)/.test(prompt);
        if (!hasDictionary || !hasClassValues) {
          missing.push(`${style.slug}:${locale}`);
        }
      }
    }

    // The English spec was Chinese-only until 2026-08-18, and the prompt builder
    // drops CJK sources, so English readers copied a prompt with no tokens.
    expect(missing).toEqual([]);
  });

  it("ships the authored rules alongside the generated spec", () => {
    // Every style has tokens, so preferring the generated spec silently
    // discarded the hand-written rules for all 146 of them.
    const style = styles.find((candidate) => candidate.slug === "glassmorphism")!;
    const zh = hardPromptFor(style.slug, "zh");
    const en = hardPromptFor(style.slug, "en");

    expect(zh).toContain(style.aiRules.slice(30, 70));
    expect(en).toContain((style.aiRulesEn ?? "").slice(30, 70));
    expect(/Token (Dictionary|字典)/.test(zh)).toBe(true);
    expect(/Token (Dictionary|字典)/.test(en)).toBe(true);
  });

  it("keeps Editorial's single Mauve accent consistent across tokens and prompt forms", () => {
    const style = styles.find((candidate) => candidate.slug === "editorial")!;
    const metadata = getStyleMetaBySlug("editorial")!;
    const color = editorialSpec.colors.find((entry) => entry.group === "accent");
    expect(color?.value).toBe("#816d70");
    expect(metadata.colors).toEqual(style.colors);
    expect(metadata.colors).toEqual({
      primary: "#1C1C1C",
      secondary: "#F9F8F6",
      accent: ["#1C1C1C", "#6b7280", "#1c1c1c", "#816d70"],
    });

    const tokens = getStyleTokens("editorial");
    expect(tokens?.colors.background.accent).toEqual(["bg-[#816d70]"]);
    expect(renderCssVariables(editorialSpec)).toContain("--color-mauve: #816d70;");
    const exportedTokens = JSON.parse(renderDtcg(editorialSpec)) as {
      color: Record<string, { $value: string }>;
    };
    expect(exportedTokens.color.mauve.$value).toBe("#816d70");

    for (const locale of ["zh", "en"] as const) {
      const document = renderDesignMd(editorialSpec, { locale });
      expect(document).toContain(color?.role[locale]);

      const input = promptInputFor("editorial", locale);
      const prompts = [buildHardPrompt(input, locale), buildSoftPrompt(input, locale)];
      for (const prompt of prompts) {
        expect(prompt).toContain("#816d70");
        expect(prompt).toContain(locale === "zh" ? "陈玫" : "Mauve");
        expect(prompt).not.toMatch(/NO colored accents|purely monochromatic/i);
      }
    }
  });

  it("keeps English prompts free of Chinese so the builder cannot drop them", () => {
    const leaking: string[] = [];

    for (const style of styles) {
      if (!getStyleTokens(style.slug)) continue;
      const prompt = hardPromptFor(style.slug, "en");
      if (cjkRatio(prompt) > 0.02) {
        leaking.push(`${style.slug}:${(cjkRatio(prompt) * 100).toFixed(1)}%`);
      }
    }

    expect(leaking).toEqual([]);
  });

  it.each([
    "cel-shading", "film-noir", "indian-festive", "african-textile", "witchcore",
    "neon-tokyo", "dopamine-design", "linear-style", "shopify-clean", "luxury-retail",
    "fresh-market", "data-dense", "horizontal-gallery", "latex-paper", "distill-style",
    "studio-bold", "warm-organic", "pastel-ui", "soft-utility",
  ])("delivers localized authored rules for %s through legacy prompts", (slug) => {
    const style = styles.find((candidate) => candidate.slug === slug)!;
    const authored = rawStyles.find((candidate) => candidate.slug === slug)!;
    const prose = authored.aiRules
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "");

    // Code samples and utility names stay in English; the instructions must
    // contain Chinese prose beyond just a translated style name or heading.
    expect((prose.match(CJK) ?? []).length).toBeGreaterThan(20);
    expect(hardPromptFor(slug, "zh")).toContain(style.aiRules.trim());
    expect(style.aiRulesEn?.trim()).toBeTruthy();
    expect(hardPromptFor(slug, "en")).toContain(style.aiRulesEn!.trim());
  });
});
