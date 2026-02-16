// @stylekit/core - Recipes module
// Re-exports from the main lib/recipes

export type {
  ComponentRecipe,
  RecipeSkeleton,
  RecipeSkeletonChild,
  RecipeParameter,
  RecipeOption,
  RecipeVariant,
  RecipeSlot,
  RecipeStates,
  StyleRecipes,
  RecipeRenderParams,
  RecipeRenderResult,
} from "@/lib/recipes/types";

export {
  getStyleRecipes,
  getRecipe,
  getRecipeIds,
  getStylesWithRecipes,
  hasRecipes,
  registerRecipes,
} from "@/lib/recipes/index";

export { renderRecipe } from "@/lib/recipes/renderer";

// Factory utilities
export {
  sizeParam,
  fullWidthParam,
  paddingParam,
  interactiveParam,
  visibleParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  childrenSlot,
  labelSlot,
  iconSlot,
  defaultVariant,
  variant,
  createStyleRecipes,
} from "@/lib/recipes/factory";
