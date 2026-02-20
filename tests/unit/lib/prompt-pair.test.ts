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

  it("uses enhanced rules for hard prompt when available", () => {
    const hard = buildHardPrompt(input);

    expect(hard).toContain("STYLEKIT_STYLE_REFERENCE");
    expect(hard).toContain("style_slug: editorial");
    expect(hard).toContain("# Hard Prompt");
    expect(hard).toContain("ENHANCED_RULES");
    expect(hard).not.toContain("BASE_RULES");
  });

  it("falls back to base rules for hard prompt when enhanced rules are missing", () => {
    const hard = buildHardPrompt({
      ...input,
      enhancedRules: null,
    });

    expect(hard).toContain("BASE_RULES");
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
});
