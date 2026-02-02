// Component Recipe System - Skeleton + Variable Parameters
// Replaces static code examples with parameterized, composable recipes

/**
 * A component recipe defines the structure and variants of a UI component
 * in a style-agnostic way that can be combined with any visual style.
 */
export interface ComponentRecipe {
  /** Unique identifier, e.g., "button", "card", "input" */
  id: string;

  /** Display name */
  name: string;

  /** Chinese display name */
  nameZh: string;

  /** Description of the component's purpose */
  description: string;

  /** The skeleton structure (invariant parts) */
  skeleton: RecipeSkeleton;

  /** Configurable parameters */
  parameters: RecipeParameter[];

  /** Visual variants */
  variants: Record<string, RecipeVariant>;

  /** Content slots for dynamic content */
  slots: RecipeSlot[];

  /** Interaction states (hover, focus, active, disabled) */
  states?: RecipeStates;
}

/**
 * The skeleton defines the base structure of a component
 */
export interface RecipeSkeleton {
  /** HTML element type */
  element: "button" | "div" | "input" | "a" | "section" | "nav" | "form" | "label";

  /** Base classes that are always applied */
  baseClasses: string[];

  /** JSX structure template with slot placeholders like {icon}, {label} */
  structure?: string;

  /** Child elements (for complex components) */
  children?: RecipeSkeletonChild[];
}

export interface RecipeSkeletonChild {
  /** Element type or component reference */
  element: string;

  /** Classes for this child */
  classes: string[];

  /** Slot this child represents */
  slot?: string;

  /** Nested children */
  children?: RecipeSkeletonChild[];
}

/**
 * A configurable parameter for the component
 */
export interface RecipeParameter {
  /** Unique identifier, e.g., "size", "fullWidth" */
  id: string;

  /** Display label */
  label: string;

  /** Chinese label */
  labelZh: string;

  /** Parameter type */
  type: "select" | "boolean" | "string" | "color" | "number";

  /** Options for select type */
  options?: RecipeOption[];

  /** Default value */
  default: string | boolean | number;

  /** Whether this parameter affects the class output */
  affectsClasses?: boolean;

  /** CSS classes to apply based on value (for boolean) */
  trueClasses?: string;
  falseClasses?: string;
}

export interface RecipeOption {
  /** Option value */
  value: string;

  /** Display label */
  label: string;

  /** Chinese label */
  labelZh: string;

  /** Classes to apply when this option is selected */
  classes: string;
}

/**
 * A visual variant of the component
 */
export interface RecipeVariant {
  /** Unique identifier */
  id: string;

  /** Display label */
  label: string;

  /** Chinese label */
  labelZh: string;

  /** CSS classes for this variant */
  classes: string[];

  /** Reference to token path, e.g., "colors.button.primary" */
  tokenRef?: string;

  /** Description of when to use this variant */
  description?: string;
}

/**
 * A content slot in the component
 */
export interface RecipeSlot {
  /** Unique identifier, e.g., "icon", "label", "children" */
  id: string;

  /** Display label */
  label: string;

  /** Chinese label */
  labelZh: string;

  /** Whether this slot is required */
  required: boolean;

  /** Default content */
  default?: string;

  /** Slot type */
  type?: "text" | "icon" | "element" | "children";

  /** Placeholder text for input */
  placeholder?: string;
}

/**
 * Interaction state classes
 */
export interface RecipeStates {
  /** Hover state classes */
  hover?: string[];

  /** Focus state classes */
  focus?: string[];

  /** Active/pressed state classes */
  active?: string[];

  /** Disabled state classes */
  disabled?: string[];

  /** Loading state classes */
  loading?: string[];
}

/**
 * A complete style recipe collection
 */
export interface StyleRecipes {
  /** Style identifier */
  styleSlug: string;

  /** Style name */
  styleName: string;

  /** Component recipes */
  recipes: Record<string, ComponentRecipe>;
}

/**
 * Parameters for rendering a recipe
 */
export interface RecipeRenderParams {
  /** Selected variant ID */
  variant: string;

  /** Parameter values */
  params: Record<string, string | boolean | number>;

  /** Slot content */
  slots: Record<string, string>;

  /** Additional state */
  state?: "default" | "hover" | "focus" | "active" | "disabled" | "loading";
}

/**
 * Result of rendering a recipe
 */
export interface RecipeRenderResult {
  /** Complete class string */
  className: string;

  /** JSX code string */
  code: string;

  /** HTML preview string */
  preview: string;

  /** Individual class groups for debugging */
  classGroups: {
    base: string[];
    variant: string[];
    params: string[];
    states: string[];
  };
}
