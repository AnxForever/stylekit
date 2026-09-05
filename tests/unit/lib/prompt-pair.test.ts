import { describe, expect, it } from "vitest";
import { buildHardPrompt, buildPromptPair, buildSoftPrompt } from "@/lib/styles/prompt-pair";

describe("prompt-pair builders", () => {
  const input = {
    styleName: "编辑杂志",
    styleSlug: "editorial",
    aiRules: "BASE_RULES",
    enhancedRules: "ENHANCED_RULES",
    doList: ["留白充足", "细边框", "文字层级清晰", "克制动画", "限制阴影"],
    dontList: ["厚重边框", "硬阴影", "过度动效", "拥挤布局"],
    keywords: ["editorial", "typography", "minimal", "grid", "whitespace", "magazine", "readable"],
  };

  it("ships both the authored rules and the generated spec", () => {
    const hard = buildHardPrompt(input);

    expect(hard).toContain("STYLEKIT_STYLE_REFERENCE");
    expect(hard).toContain("style_slug: editorial");
    expect(hard).toContain("# Hard Prompt");
    // The generated spec lists which classes a style uses; the authored rules
    // say how to compose them. Preferring one silently dropped the other.
    expect(hard).toContain("ENHANCED_RULES");
    expect(hard).toContain("BASE_RULES");
    expect(hard.indexOf("BASE_RULES")).toBeLessThan(hard.indexOf("ENHANCED_RULES"));
  });

  it("falls back to base rules for hard prompt when enhanced rules are missing", () => {
    const hard = buildHardPrompt({
      ...input,
      enhancedRules: null,
    });

    expect(hard).toContain("BASE_RULES");
  });

  it("uses English hard-rule fallback when aiRulesEn is missing", () => {
    const hard = buildHardPrompt(
      {
        ...input,
        styleName: "Editorial",
        enhancedRules: null,
        aiRulesEn: undefined,
        doListEn: ["Use generous whitespace", "Keep typography hierarchy clear"],
        dontListEn: ["Avoid crowded layouts"],
      },
      "en"
    );

    expect(hard).toContain("## Required Style Rules");
    expect(hard).toContain("- Use generous whitespace");
    expect(hard).toContain("## Forbidden Rules");
    expect(hard).not.toContain("BASE_RULES");
    expect(hard).not.toMatch(/[\u3400-\u9fff]/);
  });

  it("keeps English authored rules in the English prompt when only aiRules is set", () => {
    // A community submission through the reduced form carries its whole rule
    // set in `aiRules` with no aiRulesEn, no do/dont split, and no token spec.
    // The English prompt must still deliver those rules, not an empty scaffold.
    const hard = buildHardPrompt(
      {
        styleName: "Neon Washi",
        styleSlug: "neon-washi",
        aiRules:
          "Use a paper grain background at 6% opacity, never a flat fill.\nNeon accents appear on at most two elements per viewport.",
        enhancedRules: null,
        aiRulesEn: undefined,
        doList: [],
        dontList: [],
        keywords: [],
      },
      "en"
    );

    expect(hard).toContain("paper grain background at 6% opacity");
    expect(hard).toContain("Neon accents appear on at most two elements");
    // The degenerate "(none)" scaffold must not survive when real rules exist.
    expect(hard).not.toContain("- (none)");
    expect(hard).not.toMatch(/[\u3400-\u9fff]/);
  });

  it("still uses the empty English scaffold when authored rules are Chinese-only", () => {
    // A Chinese-only submission has no usable English rules to promote, so the
    // fallback must not smuggle Chinese into the English prompt.
    const hard = buildHardPrompt(
      {
        styleName: "Neon Washi",
        styleSlug: "neon-washi",
        aiRules: "使用 6% 不透明度的纸张纹理背景。",
        enhancedRules: null,
        aiRulesEn: undefined,
        doList: [],
        dontList: [],
        keywords: [],
      },
      "en"
    );

    expect(hard).toContain("## Required Style Rules");
    expect(hard).toContain("- (none)");
    expect(hard).not.toMatch(/[\u3400-\u9fff]/);
  });

  it("removes small Chinese parentheticals from English hard rules", () => {
    const hard = buildHardPrompt(
      {
        ...input,
        styleName: "Vaporwave",
        enhancedRules: null,
        aiRulesEn: "Use Vaporwave (蒸汽波) gradients and neon scan lines.",
      },
      "en"
    );

    expect(hard).toContain("Use Vaporwave gradients and neon scan lines.");
    expect(hard).not.toMatch(/[\u3400-\u9fff]/);
  });

  it("builds soft prompt with truncated prefer/avoid signals", () => {
    const soft = buildSoftPrompt(input);

    expect(soft).toContain("# Soft Prompt");
    expect(soft).toContain("style_source: /styles/editorial");
    expect(soft).toContain("## Style Signals");
    expect(soft).toContain("## Prefer");
    expect(soft).toContain("## Avoid");

    const pair = buildPromptPair(input);
    expect(pair.hardPrompt).toContain("# Hard Prompt");
    expect(pair.softPrompt).toContain("# Soft Prompt");
  });

  it("derives English style signals when keywordsEn is missing", () => {
    const soft = buildSoftPrompt(
      {
        ...input,
        styleName: "Editorial",
        aiRulesEn: "EN_RULES",
        doListEn: ["Use generous whitespace", "Keep typography hierarchy clear"],
        dontListEn: ["Avoid crowded layouts"],
        keywords: ["杂志排版", "留白", "editorial"],
      },
      "en"
    );

    expect(soft).toContain("- editorial");
    expect(soft).toContain("- generous whitespace");
    expect(soft).not.toMatch(/[\u3400-\u9fff]/);
  });

  describe("with PromptContext", () => {
    const context = {
      projectType: "Landing page",
      brandPersonality: "Bold, warm, minimal",
      antiReferences: "No Material Design, no purple gradients",
    };

    it("injects project context into hard prompt", () => {
      const hard = buildHardPrompt(
        { ...input, dontListEn: ["Avoid shadows"], styleName: "Editorial" },
        "en",
        context
      );

      expect(hard).toContain("## Project Context");
      expect(hard).toContain("- Project type: Landing page");
      expect(hard).toContain("- Brand personality: Bold, warm, minimal");
      expect(hard).toContain("- Anti-references: No Material Design, no purple gradients");
    });

    it("injects anti-references into soft prompt Avoid section", () => {
      const soft = buildSoftPrompt(
        { ...input, styleName: "Editorial", dontListEn: ["Avoid shadows"] },
        "en",
        context
      );

      expect(soft).toContain("No Material Design");
      expect(soft).toContain("no purple gradients");
    });

    it("appends absolute bans section to hard prompt", () => {
      const hard = buildHardPrompt(
        { ...input, dontListEn: ["Avoid shadows", "No rounded corners"], styleName: "Editorial" },
        "en",
        context
      );

      expect(hard).toContain("## Absolute Bans (Match and Refuse)");
      expect(hard).toContain("- shadows");
      expect(hard).toContain("- rounded corners");
    });

    it("appends self-check checklist to hard prompt", () => {
      const hard = buildHardPrompt(
        { ...input, dontListEn: ["Avoid shadows"], styleName: "Editorial" },
        "en",
        context
      );

      expect(hard).toContain("## Self-Check (Verify Before Shipping)");
      expect(hard).toContain("- [ ] No purple-to-blue gradients");
      expect(hard).toContain("- [ ] No overused fonts");
      expect(hard).toContain("- [ ] No nested cards");
    });
  });

  describe("without PromptContext (backward compatible)", () => {
    it("does not include project context section", () => {
      const hard = buildHardPrompt(
        { ...input, dontListEn: ["Avoid shadows"], styleName: "Editorial" },
        "en"
      );

      expect(hard).not.toContain("## Project Context");
    });

    it("still includes bans and checklist for English with dontListEn", () => {
      const hard = buildHardPrompt(
        { ...input, dontListEn: ["Avoid shadows"], styleName: "Editorial" },
        "en"
      );

      expect(hard).toContain("## Absolute Bans (Match and Refuse)");
      expect(hard).toContain("## Self-Check (Verify Before Shipping)");
    });

    it("skips bans when dontList has no matching locale data", () => {
      const hard = buildHardPrompt(
        { ...input, dontListEn: undefined, styleName: "Editorial" },
        "en"
      );

      // Universal checklist still appears (always locale-appropriate)
      expect(hard).toContain("## Self-Check (Verify Before Shipping)");
      // But bans section should be absent \u2014 no English dont items to ban
      expect(hard).not.toContain("## Absolute Bans");
    });
  });
});
