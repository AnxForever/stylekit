import { describe, expect, it } from "vitest";

import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";

const NEO_BRUTALIST_TEMPLATE_MARKERS = [
  "bg-white border-b-2 md:border-b-4 border-black",
  "font-black text-xl md:text-2xl tracking-wider",
  "确认只有 `rounded-none` 或无圆角",
  "所有按钮都有 `hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]`",
];

describe("enhanced rules style isolation", () => {
  it("does not leak Neo-Brutalist templates or checklists into other styles", () => {
    const tokenizedStyles = styles.filter((style) => getStyleTokens(style.slug));
    expect(tokenizedStyles.length).toBeGreaterThan(100);

    for (const style of tokenizedStyles) {
      const tokens = getStyleTokens(style.slug);
      if (!tokens) continue;

      const rules = generateEnhancedAIRules({ style, tokens, format: "full" });

      expect(rules, style.slug).toContain(`# ${style.nameEn} (${style.name}) Design System`);
      expect(rules, style.slug).toContain(`## [TEMPLATES] ${style.nameEn} 页面骨架模板`);
      expect(rules, style.slug).toContain(`## [CHECKLIST] ${style.nameEn} 生成后自检清单`);

      if (style.slug !== "neo-brutalist") {
        for (const marker of NEO_BRUTALIST_TEMPLATE_MARKERS) {
          expect(rules, `${style.slug} leaked ${marker}`).not.toContain(marker);
        }
      }

      for (const requiredClass of tokens.required.button) {
        expect(rules, `${style.slug} omitted button token ${requiredClass}`).toContain(requiredClass);
      }
    }
  });

  it("does not emit unresolved token values in any enhanced rule set", () => {
    for (const style of styles) {
      const tokens = getStyleTokens(style.slug);
      if (!tokens) continue;

      const rules = generateEnhancedAIRules({ style, tokens, format: "full" });
      expect(rules, style.slug).not.toContain("undefined");
      expect(rules, style.slug).not.toContain("[object Object]");
    }
  });
});
