import { describe, expect, it } from "vitest";
import {
  getAllRecipeTags,
  getAllRecipes,
  getAllUseCases,
  getFeaturedRecipes,
  getRecipeById,
  getRecipesByUseCase,
  resolveRecipeStyles,
  searchRecipes,
  styleRecipes,
} from "@/lib/styles/recipes";

function isSortedByPopularity<T extends { popularity?: number }>(items: T[]): boolean {
  return items.every((item, index) => {
    if (index === 0) return true;
    return (items[index - 1].popularity ?? 0) >= (item.popularity ?? 0);
  });
}

describe("style recommendation recipes", () => {
  it("keeps the public recipe export and getter aligned", () => {
    expect(getAllRecipes()).toBe(styleRecipes);
    expect(styleRecipes.length).toBeGreaterThan(0);
  });

  it("has unique recipe ids and supports lookup by id", () => {
    const ids = styleRecipes.map((recipe) => recipe.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(getRecipeById(styleRecipes[0].id)).toBe(styleRecipes[0]);
  });

  it("references existing visual and layout styles", () => {
    for (const recipe of styleRecipes) {
      const { visual, layout } = resolveRecipeStyles(recipe);
      expect(visual?.slug, `${recipe.id} missing visual style`).toBe(recipe.visualStyle);
      expect(layout?.slug, `${recipe.id} missing layout style`).toBe(recipe.layout);
    }
  });

  it("sorts filtered recipe lists by popularity", () => {
    expect(isSortedByPopularity(getFeaturedRecipes())).toBe(true);
    expect(isSortedByPopularity(getRecipesByUseCase("saas-landing"))).toBe(true);
  });

  it("covers all recipe use cases and tags in public filter metadata", () => {
    const useCases = new Set(getAllUseCases().map((item) => item.id));
    const tags = new Set(getAllRecipeTags().map((item) => item.id));

    for (const recipe of styleRecipes) {
      expect(useCases.has(recipe.useCase), `${recipe.id} missing use case metadata`).toBe(true);
      for (const tag of recipe.tags) {
        expect(tags.has(tag), `${recipe.id} missing tag metadata: ${tag}`).toBe(true);
      }
    }
  });

  it("searches recipes by style and description text", () => {
    expect(searchRecipes("glass").map((recipe) => recipe.id)).toContain("saas-modern-glass");
    expect(searchRecipes("仪表盘").length).toBeGreaterThan(0);
  });
});
