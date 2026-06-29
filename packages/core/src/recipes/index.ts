/**
 * @module stylekit-core/recipes
 *
 * Component recipe system for generating style-consistent UI components.
 * Recipes define parameterized component templates (button, card, input, etc.)
 * with variants, slots, and state-based styling for each design style.
 */

export type {
  /** A single component recipe definition with skeleton, variants, params, and slots. */
  ComponentRecipe,
  /** HTML element structure and base classes for a recipe. */
  RecipeSkeleton,
  /** A child element within a recipe skeleton. */
  RecipeSkeletonChild,
  /** A configurable parameter (size, fullWidth, etc.) for a recipe. */
  RecipeParameter,
  /** A selectable option within a RecipeParameter. */
  RecipeOption,
  /** A named variant with its own set of CSS classes. */
  RecipeVariant,
  /** A content slot (icon, label, children) in a recipe. */
  RecipeSlot,
  /** State-based class overrides (hover, active, disabled, etc.). */
  RecipeStates,
  /** Collection of recipes for a single design style. */
  StyleRecipes,
  /** Input parameters for rendering a recipe. */
  RecipeRenderParams,
  /** Output of rendering a recipe: className, code, preview, classGroups. */
  RecipeRenderResult,
} from "@/lib/recipes/types";

export {
  /**
   * Returns all recipes registered for a given style.
   * @param styleSlug - The style identifier (e.g. "neo-brutalist").
   * @returns The style's {@link StyleRecipes}, or `undefined` if none registered.
   */
  getStyleRecipes,
  /**
   * Returns a specific component recipe for a style.
   * @param styleSlug - The style identifier.
   * @param recipeId - The recipe identifier (e.g. "button", "card").
   * @returns The matching {@link ComponentRecipe}, or `undefined`.
   */
  getRecipe,
  /**
   * Returns all recipe IDs available for a style.
   * @param styleSlug - The style identifier.
   * @returns An array of recipe ID strings, or empty array if no recipes.
   */
  getRecipeIds,
  /**
   * Returns the slugs of all styles that have recipes registered.
   * @returns An array of style slug strings.
   */
  getStylesWithRecipes,
  /**
   * Checks whether a style has any recipes registered.
   * @param styleSlug - The style identifier.
   * @returns `true` if recipes exist for the given slug.
   */
  hasRecipes,
  /**
   * Registers recipes for a style at runtime.
   * Useful for extending the recipe registry with custom styles.
   * @param recipes - The {@link StyleRecipes} object to register.
   */
  registerRecipes,
} from "@/lib/recipes/index";

export {
  /**
   * Renders a component recipe with the given parameters.
   * Produces className, JSX code, HTML preview, and class group breakdown.
   * @param recipe - The component recipe to render.
   * @param params - Variant, parameter values, slot content, and state.
   * @returns A {@link RecipeRenderResult}.
   */
  renderRecipe,
} from "@/lib/recipes/renderer";

// Factory utilities
export {
  /**
   * Creates a size parameter (sm/md/lg) with style-specific classes.
   * @param options - Classes for each size: `{ sm, md, lg }`.
   * @returns A {@link RecipeParameter}.
   */
  sizeParam,
  /**
   * Pre-built full-width boolean parameter.
   * Adds `w-full` when enabled.
   */
  fullWidthParam,
  /**
   * Creates a padding parameter (sm/md/lg) with style-specific classes.
   * @param options - Classes for each size: `{ sm, md, lg }`.
   * @returns A {@link RecipeParameter}.
   */
  paddingParam,
  /**
   * Creates an interactive boolean parameter with custom hover/active classes.
   * @param trueClasses - CSS classes applied when interactive is enabled.
   * @param defaultValue - Default state (defaults to `true`).
   * @returns A {@link RecipeParameter}.
   */
  interactiveParam,
  /**
   * Pre-built visible boolean parameter.
   * Toggles between `opacity-100` and `opacity-0`.
   */
  visibleParam,
  /**
   * Creates standard button slots: icon + label.
   * @param defaultLabel - Default label text (defaults to "Click").
   * @returns An array of {@link RecipeSlot}.
   */
  buttonSlots,
  /**
   * Creates standard card slots: title + children.
   * @param defaultTitle - Default title text.
   * @param defaultContent - Default content text.
   * @returns An array of {@link RecipeSlot}.
   */
  cardSlots,
  /**
   * Creates standard input slots: placeholder.
   * @param defaultPlaceholder - Default placeholder text.
   * @returns An array of {@link RecipeSlot}.
   */
  inputSlots,
  /**
   * Creates a children-only content slot.
   * @param required - Whether the slot is required (defaults to `true`).
   * @returns An array of {@link RecipeSlot}.
   */
  childrenSlot,
  /**
   * Creates a label-only text slot.
   * @param defaultLabel - Default label text.
   * @returns An array of {@link RecipeSlot}.
   */
  labelSlot,
  /**
   * Creates an icon-only slot.
   * @returns An array of {@link RecipeSlot}.
   */
  iconSlot,
  /**
   * Pre-built default empty variant with no additional classes.
   */
  defaultVariant,
  /**
   * Shorthand builder for creating a named recipe variant.
   * @param id - Variant identifier.
   * @param label - Display label (English).
   * @param labelZh - Display label (Chinese).
   * @param classes - CSS classes for this variant.
   * @returns A {@link RecipeVariant}.
   */
  variant,
  /**
   * Factory function to create a {@link StyleRecipes} object.
   * @param slug - The style slug.
   * @param name - The style display name.
   * @param recipes - Map of recipe ID to {@link ComponentRecipe}.
   * @returns A complete {@link StyleRecipes} object.
   */
  createStyleRecipes,
} from "@/lib/recipes/factory";
