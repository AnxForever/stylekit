import { describe, expect, it } from "vitest";
import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { buildHardPrompt } from "@/lib/styles/prompt-pair";
import { buildDesignSpec } from "@/components/style-preview/_prompt-builders";

const CJK = /[㐀-鿿]/g;

function cjkRatio(value: string): number {
  return (value.match(CJK) ?? []).length / Math.max(value.length, 1);
}

function hardPromptFor(slug: string, locale: "zh" | "en"): string {
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

  return buildHardPrompt(
    {
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
    },
    locale
  );
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
});

describe("design spec layout and motion", () => {
  const styleAgnosticClaims = [
    "blurry depth",
    "gradient-heavy",
    "compress or flatten",
    "deliberate asymmetry",
    "模糊景深",
    "重渐变",
    "压平或压缩",
  ];

  it("quotes the style's own tokens instead of one hard-coded temperament", () => {
    for (const slug of ["glassmorphism", "neo-brutalist", "soft-ui"]) {
      const style = styles.find((candidate) => candidate.slug === slug)!;
      const tokens = getStyleTokens(slug)!;

      const spec = buildDesignSpec({
        locale: "en",
        styleName: style.nameEn,
        styleSlug: slug,
        description: style.descriptionEn ?? style.description,
        philosophy: style.philosophyEn ?? style.philosophy,
        colors: style.colors,
        doList: style.doListEn ?? style.doList,
        dontList: style.dontListEn ?? style.dontList,
        keywords: style.keywordsEn ?? style.keywords,
        tokens: {
          section: tokens.spacing.section,
          container: tokens.spacing.container,
          card: tokens.spacing.card,
          gap: tokens.spacing.gap.md,
          radius: tokens.border.radius,
          transition: tokens.interaction.transition,
          active: tokens.interaction.active ?? undefined,
          focus: tokens.shadow.focus,
        },
      });

      expect(spec, slug).toContain(tokens.spacing.section);
      expect(spec, slug).toContain(tokens.border.radius);
      expect(spec, slug).toContain(tokens.interaction.transition);

      for (const claim of styleAgnosticClaims) {
        expect(spec.includes(claim), `${slug} must not ship "${claim}"`).toBe(false);
      }
    }
  });

  it("falls back to the style's own rules when no tokens are supplied", () => {
    const style = styles.find((candidate) => candidate.slug === "glassmorphism")!;
    const spec = buildDesignSpec({
      locale: "en",
      styleName: style.nameEn,
      styleSlug: style.slug,
      description: style.descriptionEn ?? style.description,
      philosophy: style.philosophyEn ?? style.philosophy,
      colors: style.colors,
      doList: style.doListEn ?? style.doList,
      dontList: style.dontListEn ?? style.dontList,
      keywords: style.keywordsEn ?? style.keywords,
    });

    for (const claim of styleAgnosticClaims) {
      expect(spec.includes(claim), `fallback must not ship "${claim}"`).toBe(false);
    }
  });
});
