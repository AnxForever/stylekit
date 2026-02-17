import { describe, it, expect } from "vitest";
import { draftToTokens, draftToRecipeSkeleton } from "@/lib/style-extractor/draft-to-tokens";
import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import type { StyleTokens } from "@/lib/styles/tokens";

describe("draft-to-tokens", () => {
  describe("draftToTokens with minimal draft", () => {
    it("returns a valid StyleTokens from an empty draft", () => {
      const draft: ExtractedStyleDraft = {};
      const tokens = draftToTokens(draft);

      expect(tokens).toBeDefined();
      expect(tokens.colors).toBeDefined();
      expect(tokens.typography).toBeDefined();
      expect(tokens.spacing).toBeDefined();
      expect(tokens.border).toBeDefined();
      expect(tokens.shadow).toBeDefined();
      expect(tokens.interaction).toBeDefined();
      expect(tokens.forbidden).toBeDefined();
      expect(tokens.required).toBeDefined();
    });

    it("uses default bg-white for missing secondary color", () => {
      const draft: ExtractedStyleDraft = {};
      const tokens = draftToTokens(draft);
      expect(tokens.colors.background.primary).toBe("bg-white");
    });

    it("has default border and shadow classes", () => {
      const draft: ExtractedStyleDraft = {};
      const tokens = draftToTokens(draft);
      expect(tokens.border.width).toBeTruthy();
      expect(tokens.border.radius).toBeTruthy();
      expect(tokens.shadow.sm).toBeTruthy();
      expect(tokens.shadow.md).toBeTruthy();
      expect(tokens.shadow.lg).toBeTruthy();
      expect(tokens.shadow.none).toBe("shadow-none");
    });

    it("has default typography classes", () => {
      const draft: ExtractedStyleDraft = {};
      const tokens = draftToTokens(draft);
      expect(tokens.typography.heading).toContain("font-");
      expect(tokens.typography.body).toContain("font-");
    });

    it("has empty forbidden arrays", () => {
      const draft: ExtractedStyleDraft = {};
      const tokens = draftToTokens(draft);
      expect(tokens.forbidden.classes).toEqual([]);
      expect(tokens.forbidden.patterns).toEqual([]);
      expect(tokens.forbidden.reasons).toEqual({});
    });

    it("has default required classes when no component code is given", () => {
      const draft: ExtractedStyleDraft = {};
      const tokens = draftToTokens(draft);
      expect(tokens.required.button.length).toBeGreaterThan(0);
      expect(tokens.required.card.length).toBeGreaterThan(0);
      expect(tokens.required.input.length).toBeGreaterThan(0);
    });
  });

  describe("draftToTokens with a full draft", () => {
    const fullDraft: ExtractedStyleDraft = {
      primaryColor: "#ff006e",
      secondaryColor: "#000000",
      accentColors: ["#ccff00", "#00d9ff"],
      headingFont: "Inter, sans-serif",
      bodyFont: "Fira Code, monospace",
      borderRadius: "0px",
      borderWidth: "4px",
      shadowSm: "none",
      shadowMd: "none",
      shadowLg: "none",
      buttonCode: `<button class="px-6 py-3 font-bold rounded-none">Click</button>`,
      cardCode: `<div class="border-2 p-4 rounded-none">Card</div>`,
      inputCode: `<input class="border px-3 py-2 text-sm" />`,
    };

    let tokens: StyleTokens;

    beforeAll(() => {
      tokens = draftToTokens(fullDraft);
    });

    it("maps primaryColor to button class", () => {
      expect(tokens.colors.button.primary).toContain("#ff006e");
    });

    it("maps secondaryColor to background primary", () => {
      expect(tokens.colors.background.primary).toBe("bg-black");
    });

    it("maps accent colors to background accent", () => {
      expect(tokens.colors.background.accent.length).toBeGreaterThan(0);
    });

    it("maps heading font to sans class for sans-serif font", () => {
      expect(tokens.typography.heading).toContain("font-sans");
    });

    it("maps body font to mono class for monospace font", () => {
      expect(tokens.typography.body).toContain("font-mono");
    });

    it("maps border radius 0px to rounded-none", () => {
      expect(tokens.border.radius).toBe("rounded-none");
    });

    it("maps border width 4px to border-4", () => {
      expect(tokens.border.width).toBe("border-4");
    });

    it("maps shadow none to shadow-none", () => {
      expect(tokens.shadow.sm).toContain("shadow-none");
    });

    it("extracts required classes from button component code", () => {
      expect(tokens.required.button).toContain("px-6");
      expect(tokens.required.button).toContain("py-3");
      expect(tokens.required.button).toContain("font-bold");
      expect(tokens.required.button).toContain("rounded-none");
    });

    it("extracts required classes from card component code", () => {
      expect(tokens.required.card).toContain("border-2");
      expect(tokens.required.card).toContain("p-4");
      expect(tokens.required.card).toContain("rounded-none");
    });

    it("extracts required classes from input component code", () => {
      expect(tokens.required.input).toContain("border");
      expect(tokens.required.input).toContain("px-3");
      expect(tokens.required.input).toContain("py-2");
      expect(tokens.required.input).toContain("text-sm");
    });

    it("uses dark text on dark background", () => {
      // secondaryColor is #000000 (dark), so text should be light
      expect(tokens.colors.text.primary).toContain("text-zinc-50");
    });
  });

  describe("draftToTokens color mapping", () => {
    it("maps known hex #ffffff to bg-white", () => {
      const draft: ExtractedStyleDraft = { secondaryColor: "#ffffff" };
      const tokens = draftToTokens(draft);
      expect(tokens.colors.background.primary).toBe("bg-white");
    });

    it("maps unknown hex to arbitrary Tailwind class", () => {
      const draft: ExtractedStyleDraft = { secondaryColor: "#abcdef" };
      const tokens = draftToTokens(draft);
      expect(tokens.colors.background.primary).toBe("bg-[#abcdef]");
    });
  });

  describe("draftToTokens border radius mapping", () => {
    it("maps full to rounded-full", () => {
      const draft: ExtractedStyleDraft = { borderRadius: "full" };
      const tokens = draftToTokens(draft);
      expect(tokens.border.radius).toBe("rounded-full");
    });

    it("maps 8px to rounded-lg", () => {
      const draft: ExtractedStyleDraft = { borderRadius: "8px" };
      const tokens = draftToTokens(draft);
      expect(tokens.border.radius).toBe("rounded-lg");
    });

    it("maps 16px to rounded-2xl", () => {
      const draft: ExtractedStyleDraft = { borderRadius: "16px" };
      const tokens = draftToTokens(draft);
      expect(tokens.border.radius).toBe("rounded-2xl");
    });
  });

  describe("draftToRecipeSkeleton", () => {
    it("returns button recipe from draft with button code", () => {
      const draft: ExtractedStyleDraft = {
        buttonCode: `<button class="px-4 py-2 font-bold">Click</button>`,
      };
      const recipes = draftToRecipeSkeleton(draft);
      expect(recipes.button).toBeDefined();
      expect(recipes.button.base.length).toBeGreaterThan(0);
      expect(recipes.button.variants.primary).toBeDefined();
    });

    it("returns card recipe with elevated variant", () => {
      const draft: ExtractedStyleDraft = {
        cardCode: `<div class="border p-4 rounded-lg">Card</div>`,
      };
      const recipes = draftToRecipeSkeleton(draft);
      expect(recipes.card).toBeDefined();
      expect(recipes.card.variants.elevated).toBeDefined();
      expect(recipes.card.variants.elevated).toContain("shadow-lg");
    });

    it("returns empty object when no component code is given", () => {
      const draft: ExtractedStyleDraft = {};
      const recipes = draftToRecipeSkeleton(draft);
      expect(Object.keys(recipes)).toHaveLength(0);
    });
  });
});
