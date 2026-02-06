import { describe, it, expect } from "vitest";
import {
  getStyleTokens,
  hasStyleTokens,
  styleTokensRegistry,
} from "@/lib/styles/tokens-registry";

describe("tokens registry", () => {
  const registryKeys = Object.keys(styleTokensRegistry);

  it("has entries in the registry", () => {
    expect(registryKeys.length).toBeGreaterThan(0);
  });

  it('hasStyleTokens("neo-brutalist") returns true', () => {
    expect(hasStyleTokens("neo-brutalist")).toBe(true);
  });

  it('hasStyleTokens("nonexistent") returns false', () => {
    expect(hasStyleTokens("nonexistent")).toBe(false);
  });

  it('getStyleTokens("neo-brutalist") returns a valid StyleTokens object', () => {
    const tokens = getStyleTokens("neo-brutalist");
    expect(tokens).toBeDefined();
    expect(tokens!.border).toBeDefined();
    expect(tokens!.shadow).toBeDefined();
    expect(tokens!.interaction).toBeDefined();
    expect(tokens!.typography).toBeDefined();
    expect(tokens!.spacing).toBeDefined();
    expect(tokens!.colors).toBeDefined();
    expect(tokens!.forbidden).toBeDefined();
    expect(tokens!.required).toBeDefined();
  });

  it("getStyleTokens for nonexistent slug returns undefined", () => {
    expect(getStyleTokens("nonexistent")).toBeUndefined();
  });

  describe("every registered token set has complete structure", () => {
    describe.each(registryKeys)("style %s", (slug) => {
      const tokens = getStyleTokens(slug)!;

      it("has border tokens (width, color, radius)", () => {
        expect(tokens.border).toBeDefined();
        expect(typeof tokens.border.width).toBe("string");
        expect(typeof tokens.border.color).toBe("string");
        expect(typeof tokens.border.radius).toBe("string");
      });

      it("has shadow tokens (sm, md, lg, none, hover, focus)", () => {
        expect(tokens.shadow).toBeDefined();
        expect(typeof tokens.shadow.sm).toBe("string");
        expect(typeof tokens.shadow.md).toBe("string");
        expect(typeof tokens.shadow.lg).toBe("string");
        expect(typeof tokens.shadow.none).toBe("string");
        expect(typeof tokens.shadow.hover).toBe("string");
        expect(typeof tokens.shadow.focus).toBe("string");
      });

      it("has interaction tokens (transition)", () => {
        expect(tokens.interaction).toBeDefined();
        expect(typeof tokens.interaction.transition).toBe("string");
      });

      it("has typography tokens (heading, body, sizes)", () => {
        expect(tokens.typography).toBeDefined();
        expect(typeof tokens.typography.heading).toBe("string");
        expect(typeof tokens.typography.body).toBe("string");
        expect(tokens.typography.sizes).toBeDefined();
        expect(typeof tokens.typography.sizes.hero).toBe("string");
        expect(typeof tokens.typography.sizes.h1).toBe("string");
        expect(typeof tokens.typography.sizes.h2).toBe("string");
        expect(typeof tokens.typography.sizes.h3).toBe("string");
        expect(typeof tokens.typography.sizes.body).toBe("string");
        expect(typeof tokens.typography.sizes.small).toBe("string");
      });

      it("has spacing tokens (section, container, card, gap)", () => {
        expect(tokens.spacing).toBeDefined();
        expect(typeof tokens.spacing.section).toBe("string");
        expect(typeof tokens.spacing.container).toBe("string");
        expect(typeof tokens.spacing.card).toBe("string");
        expect(tokens.spacing.gap).toBeDefined();
        expect(typeof tokens.spacing.gap.sm).toBe("string");
        expect(typeof tokens.spacing.gap.md).toBe("string");
        expect(typeof tokens.spacing.gap.lg).toBe("string");
      });

      it("has color tokens (background, text, button)", () => {
        expect(tokens.colors).toBeDefined();
        expect(tokens.colors.background).toBeDefined();
        expect(typeof tokens.colors.background.primary).toBe("string");
        expect(typeof tokens.colors.background.secondary).toBe("string");
        expect(Array.isArray(tokens.colors.background.accent)).toBe(true);
        expect(tokens.colors.text).toBeDefined();
        expect(typeof tokens.colors.text.primary).toBe("string");
        expect(typeof tokens.colors.text.secondary).toBe("string");
        expect(typeof tokens.colors.text.muted).toBe("string");
        expect(tokens.colors.button).toBeDefined();
        expect(typeof tokens.colors.button.primary).toBe("string");
        expect(typeof tokens.colors.button.secondary).toBe("string");
      });

      it("has forbidden tokens (classes, patterns, reasons)", () => {
        expect(tokens.forbidden).toBeDefined();
        expect(Array.isArray(tokens.forbidden.classes)).toBe(true);
        expect(Array.isArray(tokens.forbidden.patterns)).toBe(true);
        expect(typeof tokens.forbidden.reasons).toBe("object");
      });

      it("has required tokens with non-empty button, card, and input arrays", () => {
        expect(tokens.required).toBeDefined();
        expect(Array.isArray(tokens.required.button)).toBe(true);
        expect(tokens.required.button.length).toBeGreaterThan(0);
        expect(Array.isArray(tokens.required.card)).toBe(true);
        expect(tokens.required.card.length).toBeGreaterThan(0);
        expect(Array.isArray(tokens.required.input)).toBe(true);
        expect(tokens.required.input.length).toBeGreaterThan(0);
      });
    });
  });
});
