import { describe, it, expect } from "vitest";
import { getStylesWithRecipes } from "@/lib/recipes";
import {
  styleTokensRegistry,
  hasStyleTokens,
} from "@/lib/styles/tokens-registry";

describe("cross-reference: recipes vs tokens", () => {
  const recipeSlugs = getStylesWithRecipes();
  const tokenSlugs = Object.keys(styleTokensRegistry);

  it("every style with tokens also has recipes", () => {
    const missing = tokenSlugs.filter((slug) => !recipeSlugs.includes(slug));
    expect(missing, `Styles with tokens but no recipes: ${missing.join(", ")}`).toEqual([]);
  });

  it("at least 95% of styles with recipes also have tokens", () => {
    const missing = recipeSlugs.filter((slug) => !hasStyleTokens(slug));
    const coverage = (recipeSlugs.length - missing.length) / recipeSlugs.length;
    expect(coverage).toBeGreaterThanOrEqual(0.95);
  });

  it("styles missing tokens are tracked", () => {
    // These styles have recipes but no token definitions yet.
    // Update this list when adding tokens for them.
    const knownMissing: string[] = [];
    const missing = recipeSlugs.filter((slug) => !hasStyleTokens(slug));
    expect(missing.sort()).toEqual(knownMissing.sort());
  });
});
