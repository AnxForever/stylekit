import { describe, expect, it } from "vitest";
import {
  getRecipesByLayout,
  getRecipesByVisualStyle,
} from "@/lib/styles/recipe-selectors";

describe("lightweight recipe selectors", () => {
  it("returns visual-style recipes ordered by popularity", () => {
    const recipes = getRecipesByVisualStyle("neo-brutalist");

    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes.every((recipe) => recipe.visualStyle === "neo-brutalist")).toBe(true);
    expect(recipes.map((recipe) => recipe.popularity ?? 0)).toEqual(
      [...recipes]
        .map((recipe) => recipe.popularity ?? 0)
        .sort((a, b) => b - a)
    );
  });

  it("returns layout recipes ordered by popularity", () => {
    const recipes = getRecipesByLayout("dashboard-layout");

    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes.every((recipe) => recipe.layout === "dashboard-layout")).toBe(true);
    expect(recipes.map((recipe) => recipe.popularity ?? 0)).toEqual(
      [...recipes]
        .map((recipe) => recipe.popularity ?? 0)
        .sort((a, b) => b - a)
    );
  });
});
