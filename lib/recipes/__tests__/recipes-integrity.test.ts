import { describe, it, expect } from "vitest";
import { getStylesWithRecipes, getStyleRecipes } from "@/lib/recipes";

const allStyles = getStylesWithRecipes();

describe("recipes integrity - all registered styles", () => {
  it("has at least one registered style", () => {
    expect(allStyles.length).toBeGreaterThan(0);
  });

  describe.each(allStyles)("style %s", (styleSlug) => {
    const styleRecipes = getStyleRecipes(styleSlug)!;

    it("has a valid StyleRecipes object", () => {
      expect(styleRecipes).toBeDefined();
      expect(styleRecipes.styleSlug).toBe(styleSlug);
      expect(styleRecipes.styleName).toBeTruthy();
    });

    it('has at least "button", "card", and "input" recipes', () => {
      const recipeIds = Object.keys(styleRecipes.recipes);
      expect(recipeIds).toContain("button");
      expect(recipeIds).toContain("card");
      expect(recipeIds).toContain("input");
    });

    describe("recipe structure", () => {
      const recipeEntries = Object.entries(styleRecipes.recipes);

      describe.each(recipeEntries)("recipe %s", (recipeId, recipe) => {
        it("has required metadata fields (id, name, nameZh, description)", () => {
          expect(recipe.id).toBe(recipeId);
          expect(recipe.name).toBeTruthy();
          expect(typeof recipe.name).toBe("string");
          expect(recipe.nameZh).toBeTruthy();
          expect(typeof recipe.nameZh).toBe("string");
          expect(recipe.description).toBeTruthy();
          expect(typeof recipe.description).toBe("string");
        });

        it("has a valid skeleton with element and non-empty baseClasses", () => {
          expect(recipe.skeleton).toBeDefined();
          const validElements = [
            "button", "div", "input", "a", "section", "nav", "form", "label",
          ];
          expect(validElements).toContain(recipe.skeleton.element);
          expect(Array.isArray(recipe.skeleton.baseClasses)).toBe(true);
          expect(recipe.skeleton.baseClasses.length).toBeGreaterThan(0);
        });

        it("has at least 1 parameter", () => {
          expect(Array.isArray(recipe.parameters)).toBe(true);
          expect(recipe.parameters.length).toBeGreaterThanOrEqual(1);
        });

        it("has at least 1 variant", () => {
          expect(typeof recipe.variants).toBe("object");
          expect(Object.keys(recipe.variants).length).toBeGreaterThanOrEqual(1);
        });

        it("every variant has id, label, labelZh, and classes array", () => {
          for (const [variantKey, variant] of Object.entries(recipe.variants)) {
            expect(variant.id, `variant "${variantKey}" missing id`).toBeTruthy();
            expect(variant.label, `variant "${variantKey}" missing label`).toBeTruthy();
            expect(variant.labelZh, `variant "${variantKey}" missing labelZh`).toBeTruthy();
            expect(
              Array.isArray(variant.classes),
              `variant "${variantKey}" classes is not an array`
            ).toBe(true);
          }
        });

        it("has at least 1 slot", () => {
          expect(Array.isArray(recipe.slots)).toBe(true);
          expect(recipe.slots.length).toBeGreaterThanOrEqual(1);
        });
      });
    });

    // Button-specific checks
    describe("button recipe specifics", () => {
      const buttonRecipe = styleRecipes.recipes["button"];

      it('has a "size" parameter with at least 3 options', () => {
        const sizeParam = buttonRecipe.parameters.find((p) => p.id === "size");
        expect(sizeParam).toBeDefined();
        expect(sizeParam!.options).toBeDefined();
        expect(sizeParam!.options!.length).toBeGreaterThanOrEqual(3);
      });

      it('has a "label" slot with required: true', () => {
        const labelSlot = buttonRecipe.slots.find((s) => s.id === "label");
        expect(labelSlot).toBeDefined();
        expect(labelSlot!.required).toBe(true);
      });
    });

    // Card-specific checks
    describe("card recipe specifics", () => {
      const cardRecipe = styleRecipes.recipes["card"];

      it('has a "padding" parameter', () => {
        const paddingParam = cardRecipe.parameters.find((p) => p.id === "padding");
        expect(paddingParam).toBeDefined();
      });

      it('has a "children" slot with required: true', () => {
        const childrenSlot = cardRecipe.slots.find((s) => s.id === "children");
        expect(childrenSlot).toBeDefined();
        expect(childrenSlot!.required).toBe(true);
      });
    });

    // Input-specific checks
    describe("input recipe specifics", () => {
      const inputRecipe = styleRecipes.recipes["input"];

      it('has a "placeholder" slot', () => {
        const placeholderSlot = inputRecipe.slots.find((s) => s.id === "placeholder");
        expect(placeholderSlot).toBeDefined();
      });
    });
  });
});
