// Recipe Factory - Reduces boilerplate in recipe definitions
import type {
  ComponentRecipe,
  RecipeParameter,
  RecipeSlot,
  StyleRecipes,
} from "./types";

// ── Common Parameter Builders ──────────────────────────────────────

/** Size parameter (sm/md/lg) with style-specific classes */
export function sizeParam(options: {
  sm: string;
  md: string;
  lg: string;
}): RecipeParameter {
  return {
    id: "size",
    label: "Size",
    labelZh: "\u5c3a\u5bf8",
    type: "select",
    options: [
      { value: "sm", label: "Small", labelZh: "\u5c0f", classes: options.sm },
      { value: "md", label: "Medium", labelZh: "\u4e2d", classes: options.md },
      { value: "lg", label: "Large", labelZh: "\u5927", classes: options.lg },
    ],
    default: "md",
  };
}

/** Full width boolean parameter */
export const fullWidthParam: RecipeParameter = {
  id: "fullWidth",
  label: "Full Width",
  labelZh: "\u5168\u5bbd",
  type: "boolean",
  default: false,
  trueClasses: "w-full",
};

/** Padding parameter (sm/md/lg) with style-specific classes */
export function paddingParam(options: {
  sm: string;
  md: string;
  lg: string;
}): RecipeParameter {
  return {
    id: "padding",
    label: "Padding",
    labelZh: "\u5185\u8fb9\u8ddd",
    type: "select",
    options: [
      { value: "sm", label: "Small", labelZh: "\u5c0f", classes: options.sm },
      { value: "md", label: "Medium", labelZh: "\u4e2d", classes: options.md },
      { value: "lg", label: "Large", labelZh: "\u5927", classes: options.lg },
    ],
    default: "md",
  };
}

/** Interactive boolean parameter */
export function interactiveParam(
  trueClasses: string,
  defaultValue = true,
): RecipeParameter {
  return {
    id: "interactive",
    label: "Interactive",
    labelZh: "\u53ef\u4ea4\u4e92",
    type: "boolean",
    default: defaultValue,
    trueClasses,
  };
}

/** Visible boolean parameter */
export const visibleParam: RecipeParameter = {
  id: "visible",
  label: "Visible",
  labelZh: "\u53ef\u89c1",
  type: "boolean",
  default: true,
  trueClasses: "opacity-100",
  falseClasses: "opacity-0",
};

// ── Common Slot Presets ────────────────────────────────────────────

/** Button slots: icon + label */
export function buttonSlots(defaultLabel = "Click"): RecipeSlot[] {
  return [
    { id: "icon", label: "Icon", labelZh: "\u56fe\u6807", required: false, type: "icon" },
    { id: "label", label: "Label", labelZh: "\u6587\u5b57", required: true, default: defaultLabel, type: "text" },
  ];
}

/** Card slots: title + children */
export function cardSlots(
  defaultTitle = "Card Title",
  defaultContent = "Card content goes here",
): RecipeSlot[] {
  return [
    { id: "title", label: "Title", labelZh: "\u6807\u9898", required: false, default: defaultTitle, type: "text" },
    { id: "children", label: "Content", labelZh: "\u5185\u5bb9", required: true, default: defaultContent, type: "children" },
  ];
}

/** Input slots: placeholder */
export function inputSlots(defaultPlaceholder = "Type here..."): RecipeSlot[] {
  return [
    { id: "placeholder", label: "Placeholder", labelZh: "\u5360\u4f4d\u7b26", required: false, default: defaultPlaceholder, type: "text" },
  ];
}

/** Children-only slot */
export function childrenSlot(required = true): RecipeSlot[] {
  return [
    { id: "children", label: "Content", labelZh: "\u5185\u5bb9", required, type: "children" },
  ];
}

/** Label-only slot */
export function labelSlot(defaultLabel: string): RecipeSlot[] {
  return [
    { id: "label", label: "Label", labelZh: "\u6587\u5b57", required: true, default: defaultLabel, type: "text" },
  ];
}

/** Icon-only slot */
export function iconSlot(): RecipeSlot[] {
  return [
    { id: "icon", label: "Icon", labelZh: "\u56fe\u6807", required: false, type: "icon" },
  ];
}

// ── Common Variant Helpers ─────────────────────────────────────────

import type { RecipeVariant } from "./types";

/** Default empty variant */
export const defaultVariant: RecipeVariant = {
  id: "default",
  label: "Default",
  labelZh: "\u9ed8\u8ba4",
  classes: [],
};

/** Shorthand variant builder */
export function variant(id: string, label: string, labelZh: string, classes: string[]): RecipeVariant {
  return { id, label, labelZh, classes };
}

// ── Factory Function ───────────────────────────────────────────────

/** Create a StyleRecipes object */
export function createStyleRecipes(
  slug: string,
  name: string,
  recipes: Record<string, ComponentRecipe>,
): StyleRecipes {
  return { styleSlug: slug, styleName: name, recipes };
}
