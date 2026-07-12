/**
 * Lightweight recipe selectors for client surfaces that only need recipe
 * metadata. Keep this module independent from the full style registry so a
 * detail page does not download every style's components, CSS, and AI rules.
 */

import { styleRecipes } from "./recipe-registry";
import type { StyleRecipe } from "./recipe-types";

export function getRecipesByVisualStyle(styleSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((recipe) => recipe.visualStyle === styleSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

export function getRecipesByLayout(layoutSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((recipe) => recipe.layout === layoutSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}
