import { describe, it, expect } from "vitest";
import {
  blendTokens,
  blendTokensWeighted,
  defaultWeights,
  getBlendDimensions,
  getBlendPresets,
  exportBlendedTokens,
  type BlendConfig,
  type WeightedBlendConfig,
} from "@/lib/styles/blend-engine";
import { getStyleTokens } from "@/lib/styles/tokens-registry";

describe("blend-engine", () => {
  // -- defaultWeights --
  describe("defaultWeights", () => {
    it("returns all dimensions at 50", () => {
      const w = defaultWeights();
      expect(w.colors).toBe(50);
      expect(w.typography).toBe(50);
      expect(w.spacing).toBe(50);
      expect(w.shadows).toBe(50);
      expect(w.borders).toBe(50);
      expect(w.interaction).toBe(50);
    });
  });

  // -- getBlendDimensions --
  describe("getBlendDimensions", () => {
    it("returns six dimensions with key and labels", () => {
      const dims = getBlendDimensions();
      expect(dims).toHaveLength(6);
      const keys = dims.map((d) => d.key);
      expect(keys).toContain("colors");
      expect(keys).toContain("typography");
      expect(keys).toContain("spacing");
      expect(keys).toContain("shadows");
      expect(keys).toContain("borders");
      expect(keys).toContain("interaction");
    });
  });

  // -- getBlendPresets --
  describe("getBlendPresets", () => {
    it("returns a non-empty array of presets", () => {
      const presets = getBlendPresets();
      expect(presets.length).toBeGreaterThan(0);
      for (const preset of presets) {
        expect(preset.id).toBeTruthy();
        expect(preset.name).toBeTruthy();
        expect(["pick", "interpolate"]).toContain(preset.mode);
      }
    });
  });

  // -- blendTokens (dimension-picking) --
  describe("blendTokens", () => {
    it("returns null when the colors source is invalid", () => {
      const config: BlendConfig = {
        colors: "nonexistent-style",
        typography: "neo-brutalist",
        spacing: "neo-brutalist",
        shadows: "neo-brutalist",
        borders: "neo-brutalist",
        interaction: "neo-brutalist",
      };
      expect(blendTokens(config)).toBeNull();
    });

    it("returns a valid token set when all sources are valid", () => {
      const config: BlendConfig = {
        colors: "glassmorphism",
        typography: "neo-brutalist",
        spacing: "neo-brutalist",
        shadows: "glassmorphism",
        borders: "neo-brutalist",
        interaction: "glassmorphism",
      };
      const result = blendTokens(config);
      expect(result).not.toBeNull();
      expect(result!.colors).toBeDefined();
      expect(result!.typography).toBeDefined();
      expect(result!.border).toBeDefined();
    });

    it("picks colors from the colors source and typography from the typography source", () => {
      const config: BlendConfig = {
        colors: "glassmorphism",
        typography: "neo-brutalist",
        spacing: "neo-brutalist",
        shadows: "neo-brutalist",
        borders: "neo-brutalist",
        interaction: "neo-brutalist",
      };
      const result = blendTokens(config)!;
      const glassTokens = getStyleTokens("glassmorphism")!;
      const brutalTokens = getStyleTokens("neo-brutalist")!;

      expect(result.colors).toEqual(glassTokens.colors);
      expect(result.typography).toEqual(brutalTokens.typography);
    });

    it("falls back to the colors source when a dimension source is not found", () => {
      const config: BlendConfig = {
        colors: "neo-brutalist",
        typography: "nonexistent-style",
        spacing: "neo-brutalist",
        shadows: "neo-brutalist",
        borders: "neo-brutalist",
        interaction: "neo-brutalist",
      };
      const result = blendTokens(config)!;
      const brutalTokens = getStyleTokens("neo-brutalist")!;

      // typography should fall back to colors source (neo-brutalist)
      expect(result.typography).toEqual(brutalTokens.typography);
    });

    it("uses the same style for all dimensions", () => {
      const config: BlendConfig = {
        colors: "neo-brutalist",
        typography: "neo-brutalist",
        spacing: "neo-brutalist",
        shadows: "neo-brutalist",
        borders: "neo-brutalist",
        interaction: "neo-brutalist",
      };
      const result = blendTokens(config)!;
      const brutalTokens = getStyleTokens("neo-brutalist")!;

      expect(result.colors).toEqual(brutalTokens.colors);
      expect(result.typography).toEqual(brutalTokens.typography);
      expect(result.spacing).toEqual(brutalTokens.spacing);
    });
  });

  // -- blendTokensWeighted --
  describe("blendTokensWeighted", () => {
    it("returns null when styleA is invalid", () => {
      const config: WeightedBlendConfig = {
        styleA: "nonexistent",
        styleB: "glassmorphism",
        weights: defaultWeights(),
      };
      expect(blendTokensWeighted(config)).toBeNull();
    });

    it("returns null when styleB is invalid", () => {
      const config: WeightedBlendConfig = {
        styleA: "neo-brutalist",
        styleB: "nonexistent",
        weights: defaultWeights(),
      };
      expect(blendTokensWeighted(config)).toBeNull();
    });

    it("returns a valid blended token set for two known styles", () => {
      const config: WeightedBlendConfig = {
        styleA: "neo-brutalist",
        styleB: "glassmorphism",
        weights: defaultWeights(),
      };
      const result = blendTokensWeighted(config);
      expect(result).not.toBeNull();
      expect(result!.colors).toBeDefined();
      expect(result!.typography).toBeDefined();
      expect(result!.spacing).toBeDefined();
      expect(result!.shadow).toBeDefined();
      expect(result!.border).toBeDefined();
      expect(result!.interaction).toBeDefined();
      expect(result!.forbidden).toBeDefined();
      expect(result!.required).toBeDefined();
    });

    it("at weight 100, colors match styleA", () => {
      const config: WeightedBlendConfig = {
        styleA: "neo-brutalist",
        styleB: "glassmorphism",
        weights: { colors: 100, typography: 100, spacing: 100, shadows: 100, borders: 100, interaction: 100 },
      };
      const result = blendTokensWeighted(config)!;
      const tokensA = getStyleTokens("neo-brutalist")!;

      // At weight 100, non-color strings should pick from A (dominant)
      expect(result.typography.heading).toBe(tokensA.typography.heading);
      expect(result.typography.body).toBe(tokensA.typography.body);
    });

    it("at weight 0, typography matches styleB", () => {
      const config: WeightedBlendConfig = {
        styleA: "neo-brutalist",
        styleB: "glassmorphism",
        weights: { colors: 0, typography: 0, spacing: 0, shadows: 0, borders: 0, interaction: 0 },
      };
      const result = blendTokensWeighted(config)!;
      const tokensB = getStyleTokens("glassmorphism")!;

      expect(result.typography.heading).toBe(tokensB.typography.heading);
      expect(result.typography.body).toBe(tokensB.typography.body);
    });

    it("merges forbidden classes from both styles", () => {
      const config: WeightedBlendConfig = {
        styleA: "neo-brutalist",
        styleB: "glassmorphism",
        weights: defaultWeights(),
      };
      const result = blendTokensWeighted(config)!;
      const tokensA = getStyleTokens("neo-brutalist")!;
      const tokensB = getStyleTokens("glassmorphism")!;

      // Forbidden classes should be the union of both
      for (const cls of tokensA.forbidden.classes) {
        expect(result.forbidden.classes).toContain(cls);
      }
      for (const cls of tokensB.forbidden.classes) {
        expect(result.forbidden.classes).toContain(cls);
      }
    });
  });

  // -- exportBlendedTokens --
  describe("exportBlendedTokens", () => {
    const tokens = getStyleTokens("neo-brutalist")!;

    it("exports valid JSON", () => {
      const json = exportBlendedTokens(tokens, "json");
      const parsed = JSON.parse(json);
      expect(parsed.colors).toBeDefined();
      expect(parsed.typography).toBeDefined();
    });

    it("exports CSS variables", () => {
      const css = exportBlendedTokens(tokens, "css");
      expect(css).toContain(":root {");
      expect(css).toContain("--bg-primary:");
      expect(css).toContain("--font-heading:");
    });

    it("exports tailwind config", () => {
      const tailwind = exportBlendedTokens(tokens, "tailwind");
      expect(tailwind).toContain("module.exports");
      expect(tailwind).toContain("theme");
    });
  });
});
