import { describe, it, expect } from "vitest";
import {
  getStyleRecipes,
  getRecipe,
  getRecipeIds,
  getStylesWithRecipes,
  hasRecipes,
} from "@/lib/recipes";

describe("recipe registry", () => {
  it("getStylesWithRecipes returns at least 14 styles", () => {
    const styles = getStylesWithRecipes();
    expect(styles.length).toBeGreaterThanOrEqual(14);
  });

  it('hasRecipes("neo-brutalist") returns true', () => {
    expect(hasRecipes("neo-brutalist")).toBe(true);
  });

  it('hasRecipes("nonexistent-style") returns false', () => {
    expect(hasRecipes("nonexistent-style")).toBe(false);
  });

  it('getStyleRecipes("neo-brutalist") returns a valid StyleRecipes object', () => {
    const recipes = getStyleRecipes("neo-brutalist");
    expect(recipes).toBeDefined();
    expect(recipes!.styleSlug).toBe("neo-brutalist");
    expect(recipes!.styleName).toBeTruthy();
    expect(typeof recipes!.recipes).toBe("object");
    expect(Object.keys(recipes!.recipes).length).toBeGreaterThan(0);
  });

  it('getRecipe("neo-brutalist", "button") returns a valid ComponentRecipe', () => {
    const recipe = getRecipe("neo-brutalist", "button");
    expect(recipe).toBeDefined();
    expect(recipe!.id).toBe("button");
    expect(recipe!.name).toBeTruthy();
    expect(recipe!.skeleton).toBeDefined();
    expect(recipe!.parameters.length).toBeGreaterThan(0);
  });

  it('getRecipe("neo-brutalist", "nonexistent") returns undefined', () => {
    const recipe = getRecipe("neo-brutalist", "nonexistent");
    expect(recipe).toBeUndefined();
  });

  it('getRecipeIds("neo-brutalist") returns array containing button, card, and input', () => {
    const ids = getRecipeIds("neo-brutalist");
    expect(ids).toContain("button");
    expect(ids).toContain("card");
    expect(ids).toContain("input");
  });

  it("getRecipeIds for nonexistent style returns empty array", () => {
    const ids = getRecipeIds("nonexistent-style");
    expect(ids).toEqual([]);
  });

  it("getStyleRecipes for nonexistent style returns undefined", () => {
    const recipes = getStyleRecipes("nonexistent-style");
    expect(recipes).toBeUndefined();
  });
});
