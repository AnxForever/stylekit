import { describe, expect, it } from "vitest";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { getStyleRecipes } from "@/lib/recipes";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { loadStylePreview } from "@/lib/style-preview/delivery";
import { buildHardPrompt } from "@/lib/styles/prompt-pair";
import { canvasLineCardMarks, canvasLineCardsPrompt } from "@/lib/prompts/canvas-line-cards";
import { getPublicAsset } from "@/lib/assets";

describe("Quantized Line Field style delivery", () => {
  it("is a style-library asset with tokens, recipes and a cover", async () => {
    const style = getStyleBySlug("quantized-line-field")!;
    expect(style.name).toBe("量化线场");
    expect(getStyleMetaBySlug(style.slug)?.cover).toBe(style.cover);
    expect(getStyleTokens(style.slug)).toBeDefined();
    expect(Object.keys(getStyleRecipes(style.slug)!.recipes)).toEqual(["button", "card", "input"]);
    const preview = await loadStylePreview(style.slug);
    expect(preview?.coverPreview).toBeTypeOf("function");
    expect(preview?.card).toBeTypeOf("function");
    expect(getPublicAsset("style", style.slug)).not.toBeNull();
  });

  it.each(["zh", "en"] as const)("keeps the complete %s recipe and actual paths inside the style's copied hard prompt", (locale) => {
    const style = getStyleBySlug("quantized-line-field")!;
    const prompt = buildHardPrompt({ ...style, styleName: style.nameEn, styleSlug: style.slug }, locale);
    expect(prompt).toContain(canvasLineCardsPrompt[locale]);
    for (const mark of Object.values(canvasLineCardMarks)) expect(prompt).toContain(mark.path);
  });
});
