import { describe, it, expect } from "vitest";

// These imports mirror the exact module paths the @stylekit/core package
// re-exports from (see packages/core/src/{styles,recipes,accessibility}/index.ts).
// The `@` alias resolves to the repo root (tests/vitest.config.ts).

// --- styles sub-entry ---
import {
  styles,
  getStyleBySlug,
  stylesMeta,
  getAllStylesMeta,
  getStyleMetaBySlug,
} from "@/lib/styles";
import {
  styleTokensRegistry,
  getStyleTokens,
  hasStyleTokens,
} from "@/lib/styles/tokens-registry";
import { buildComponentClass, validateClasses } from "@/lib/styles/tokens";

// --- recipes sub-entry (barrels registry + renderer + types) ---
import {
  getStyleRecipes,
  getRecipe,
  getRecipeIds,
  getStylesWithRecipes,
  hasRecipes,
  renderRecipe,
} from "@/lib/recipes";

// --- accessibility sub-entry ---
import {
  hexToRgb,
  relativeLuminance,
  contrastRatio,
  meetsAA,
  meetsAAA,
  extractHexFromClass,
  scoreStyle,
  scoreAllStyles,
} from "@/lib/accessibility";

const KNOWN_SLUG = "glassmorphism";

describe("@stylekit/core public API", () => {
  describe("styles", () => {
    it("getStyleBySlug returns a full style for a known slug", () => {
      const style = getStyleBySlug(KNOWN_SLUG);
      expect(style).toBeDefined();
      expect(style!.slug).toBe(KNOWN_SLUG);
      expect(typeof style!.name).toBe("string");
    });

    it("getStyleBySlug returns undefined for an unknown slug", () => {
      expect(getStyleBySlug("definitely-not-a-real-style")).toBeUndefined();
    });

    it("exports a non-empty styles array", () => {
      expect(Array.isArray(styles)).toBe(true);
      expect(styles.length).toBeGreaterThan(0);
    });

    it("every style has a unique slug", () => {
      const slugs = styles.map((s) => s.slug);
      const unique = new Set(slugs);
      expect(unique.size).toBe(slugs.length);
    });

    it("getStyleTokens returns token definitions for known slugs", () => {
      for (const slug of [KNOWN_SLUG, "neo-brutalist"]) {
        const tokens = getStyleTokens(slug);
        expect(tokens).toBeDefined();
        expect(tokens!.colors).toBeDefined();
        expect(tokens!.required).toBeDefined();
      }
    });

    it("getStyleTokens returns undefined for an unregistered slug", () => {
      expect(getStyleTokens("definitely-not-a-real-style")).toBeUndefined();
    });

    it("hasStyleTokens reflects registry membership", () => {
      expect(hasStyleTokens(KNOWN_SLUG)).toBe(true);
      expect(hasStyleTokens("definitely-not-a-real-style")).toBe(false);
    });

    it("styleTokensRegistry maps the known slug to its tokens", () => {
      expect(styleTokensRegistry[KNOWN_SLUG]).toBe(getStyleTokens(KNOWN_SLUG));
    });

    it("metadata helpers stay aligned with the styles catalog", () => {
      expect(stylesMeta.length).toBeGreaterThan(0);
      expect(getAllStylesMeta()).toHaveLength(stylesMeta.length);
      const meta = getStyleMetaBySlug(KNOWN_SLUG);
      expect(meta).toBeDefined();
      expect(meta!.slug).toBe(KNOWN_SLUG);
    });

    it("buildComponentClass + validateClasses: required classes are never forbidden", () => {
      const tokens = getStyleTokens(KNOWN_SLUG)!;
      const cls = buildComponentClass(tokens, "button");
      expect(typeof cls).toBe("string");
      expect(cls.length).toBeGreaterThan(0);

      const result = validateClasses(tokens, cls);
      expect(Array.isArray(result.violations)).toBe(true);
      // Classes the style itself requires must not be flagged as forbidden.
      expect(result.valid).toBe(true);
    });
  });

  describe("recipes", () => {
    it("getStyleRecipes returns a recipe collection for a known slug", () => {
      const recipes = getStyleRecipes(KNOWN_SLUG);
      expect(recipes).toBeDefined();
      expect(recipes!.styleSlug).toBe(KNOWN_SLUG);
      expect(recipes!.recipes).toBeDefined();
      expect(Object.keys(recipes!.recipes).length).toBeGreaterThan(0);
    });

    it("getStyleRecipes returns undefined for an unknown slug", () => {
      expect(getStyleRecipes("definitely-not-a-real-style")).toBeUndefined();
    });

    it("getRecipe returns the button recipe for a known slug", () => {
      const recipe = getRecipe(KNOWN_SLUG, "button");
      expect(recipe).toBeDefined();
      expect(recipe!.id).toBe("button");
      expect(recipe!.skeleton).toBeDefined();
      expect(Object.keys(recipe!.variants).length).toBeGreaterThan(0);
    });

    it("getRecipe returns undefined for an unknown recipe id", () => {
      expect(getRecipe(KNOWN_SLUG, "not-a-recipe")).toBeUndefined();
    });

    it("getRecipeIds includes button and hasRecipes is true", () => {
      expect(getRecipeIds(KNOWN_SLUG)).toContain("button");
      expect(hasRecipes(KNOWN_SLUG)).toBe(true);
      expect(hasRecipes("definitely-not-a-real-style")).toBe(false);
    });

    it("getStylesWithRecipes is non-empty and includes the known slug", () => {
      const slugs = getStylesWithRecipes();
      expect(slugs.length).toBeGreaterThan(0);
      expect(slugs).toContain(KNOWN_SLUG);
    });

    it("renderRecipe produces non-empty output for a variant + slots", () => {
      const recipe = getRecipe(KNOWN_SLUG, "button")!;
      const result = renderRecipe(recipe, {
        variant: "primary",
        params: {},
        slots: { label: "Click me" },
      });

      expect(result.className.length).toBeGreaterThan(0);
      // base classes plus the selected variant's classes are merged in
      expect(result.classGroups.base.length).toBeGreaterThan(0);
      expect(result.classGroups.variant.length).toBeGreaterThan(0);
      expect(result.code).toContain("Click me");
      expect(result.preview).toContain("Click me");
      expect(result.preview).toContain(result.className);
    });
  });

  describe("accessibility", () => {
    it("contrastRatio of black/white is exactly 21", () => {
      expect(contrastRatio("#000000", "#ffffff")).toBe(21);
    });

    it("contrastRatio of identical colors is 1", () => {
      expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
    });

    it("hexToRgb parses 6-digit and 3-digit hex", () => {
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("relativeLuminance is 1 for white and 0 for black", () => {
      expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 10);
      expect(relativeLuminance(0, 0, 0)).toBe(0);
    });

    it("meetsAA returns a boolean and respects the 4.5:1 / 3:1 thresholds", () => {
      expect(typeof meetsAA(21)).toBe("boolean");
      expect(meetsAA(21)).toBe(true);
      expect(meetsAA(2)).toBe(false);
      // large text threshold is 3:1
      expect(meetsAA(3, true)).toBe(true);
      expect(meetsAA(3, false)).toBe(false);
    });

    it("meetsAAA respects the 7:1 / 4.5:1 thresholds", () => {
      expect(typeof meetsAAA(21)).toBe("boolean");
      expect(meetsAAA(21)).toBe(true);
      expect(meetsAAA(5)).toBe(false);
      expect(meetsAAA(5, true)).toBe(true);
    });

    it("extractHexFromClass handles bracket hex, named colors, and misses", () => {
      expect(extractHexFromClass("bg-[#ff006e]")).toBe("#ff006e");
      expect(extractHexFromClass("bg-white")).toBe("#ffffff");
      expect(extractHexFromClass("text-black")).toBe("#000000");
      expect(extractHexFromClass("flex")).toBeNull();
    });

    it("scoreStyle returns a score object for a known slug", () => {
      const score = scoreStyle(KNOWN_SLUG);
      expect(score).not.toBeNull();
      expect(typeof score!.overall).toBe("number");
      expect(score!.overall).toBeGreaterThanOrEqual(0);
      expect(score!.overall).toBeLessThanOrEqual(100);
      expect(["A", "B", "C", "D", "F"]).toContain(score!.grade);
      expect(score!.contrast).toBeDefined();
      expect(score!.readability).toBeDefined();
    });

    it("scoreStyle returns null for an unknown slug", () => {
      expect(scoreStyle("definitely-not-a-real-style")).toBeNull();
    });

    it("scoreAllStyles returns a non-empty record keyed by slug", () => {
      const all = scoreAllStyles();
      expect(Object.keys(all).length).toBeGreaterThan(0);
      expect(all[KNOWN_SLUG]).toBeDefined();
    });
  });
});
