// Recipe Renderer - Generates code from recipe + parameters

import type {
  ComponentRecipe,
  RecipeRenderParams,
  RecipeRenderResult,
} from "./types";

const SELF_GATED_STATE_VARIANTS = new Set([
  "hover",
  "focus",
  "focus-visible",
  "focus-within",
  "active",
  "disabled",
  "enabled",
  "checked",
  "indeterminate",
  "default",
  "required",
  "optional",
  "valid",
  "invalid",
  "in-range",
  "out-of-range",
  "read-only",
  "read-write",
  "placeholder-shown",
  "autofill",
  "visited",
  "target",
  "open",
  "closed",
]);

function splitClassVariants(className: string): string[] {
  const variants: string[] = [];
  let bracketDepth = 0;
  let parenDepth = 0;
  let segmentStart = 0;

  for (let index = 0; index < className.length; index += 1) {
    const character = className[index];
    if (character === "[" || character === "(") {
      bracketDepth += character === "[" ? 1 : 0;
      parenDepth += character === "(" ? 1 : 0;
    } else if (character === "]" || character === ")") {
      bracketDepth -= character === "]" ? 1 : 0;
      parenDepth -= character === ")" ? 1 : 0;
    } else if (character === ":" && bracketDepth === 0 && parenDepth === 0) {
      variants.push(className.slice(segmentStart, index));
      segmentStart = index + 1;
    }
  }

  return variants;
}

function isGatedStateClass(className: string): boolean {
  return splitClassVariants(className).some((variant) => {
    if (SELF_GATED_STATE_VARIANTS.has(variant)) return true;
    const relationalState = variant.match(/^(?:group|peer)-([a-z-]+)(?:\/[a-zA-Z0-9_-]+)?$/);
    if (relationalState && SELF_GATED_STATE_VARIANTS.has(relationalState[1])) return true;
    if (variant.startsWith("aria-") || variant.startsWith("data-")) return true;
    if (!variant.startsWith("[") || !variant.endsWith("]") || !variant.includes("&")) return false;

    return /&(?::(?:hover|focus(?:-visible|-within)?|active|disabled|enabled|checked|indeterminate|valid|invalid|open|closed)\b|\[(?:aria|data)-)/.test(variant);
  });
}

function uniqueClassTokens(classGroups: string[][]): string[] {
  const classes: string[] = [];
  const seen = new Set<string>();

  for (const group of classGroups) {
    for (const classEntry of group) {
      for (const className of classEntry.split(/\s+/).filter(Boolean)) {
        if (seen.has(className)) continue;
        seen.add(className);
        classes.push(className);
      }
    }
  }

  return classes;
}

function collectSelfGatedStateClasses(
  recipe: ComponentRecipe,
  includeHover: boolean,
): string[] {
  const tokens = Object.entries(recipe.states ?? {}).flatMap(([state, classes]) => {
    if (state === "hover" && !includeHover) return [];
    return (classes ?? []).flatMap((classEntry: string) => classEntry.split(/\s+/).filter(Boolean));
  });
  return tokens.filter(isGatedStateClass);
}

/**
 * Renders a component recipe with the given parameters
 */
export function renderRecipe(
  recipe: ComponentRecipe,
  params: RecipeRenderParams
): RecipeRenderResult {
  const classGroups = {
    base: [...recipe.skeleton.baseClasses],
    variant: [] as string[],
    params: [] as string[],
    states: [] as string[],
  };

  // Add variant classes
  const variant = recipe.variants[params.variant];
  if (variant) {
    classGroups.variant = [...variant.classes];
  }

  // Add parameter-based classes
  for (const param of recipe.parameters) {
    const value = params.params[param.id] ?? param.default;

    if (param.type === "select" && param.options) {
      const option = param.options.find((o) => o.value === value);
      if (option?.classes) {
        classGroups.params.push(option.classes);
      }
    } else if (param.type === "boolean") {
      if (value && param.trueClasses) {
        classGroups.params.push(param.trueClasses);
      } else if (!value && param.falseClasses) {
        classGroups.params.push(param.falseClasses);
      }
    }
  }

  // State variants are gated by CSS and can be included in the default output.
  // Group/peer variants are gated by their relationship; unprefixed simulation
  // classes stay opt-in through params.state.
  const interactiveParameter = recipe.parameters.find(
    (parameter) => parameter.id === "interactive" && parameter.type === "boolean",
  );
  const interactive = interactiveParameter
    ? params.params[interactiveParameter.id] ?? interactiveParameter.default
    : true;
  // Keep an interactive=false recipe static by default, but let an explicit
  // hover render show its requested state for preview and code generation.
  const includeHover = interactive !== false || params.state === "hover";
  classGroups.states = [...collectSelfGatedStateClasses(recipe, includeHover)];

  // Add explicitly simulated state classes.
  if (recipe.states && params.state && params.state !== "default") {
    const stateClasses = recipe.states[params.state];
    if (stateClasses) {
      classGroups.states = uniqueClassTokens([classGroups.states, stateClasses]);
    }
  }

  // Combine all classes
  const allClasses = uniqueClassTokens([
    classGroups.base,
    classGroups.variant,
    classGroups.params,
    classGroups.states,
  ]);

  const className = allClasses.join(" ");

  // Generate code
  const code = generateCode(recipe, params, className);
  const preview = generatePreview(recipe, params, className);

  return {
    className,
    code,
    preview,
    classGroups,
  };
}

/**
 * Generates JSX code string
 */
function generateCode(
  recipe: ComponentRecipe,
  params: RecipeRenderParams,
  className: string
): string {
  const { element } = recipe.skeleton;
  const slots = params.slots;

  // Format class string for readability
  const formattedClassName = formatClassName(className);

  // Build slot content
  const slotContent = buildSlotContent(recipe, slots, "jsx");

  // Check if self-closing element
  const selfClosing = ["input", "img", "br", "hr"].includes(element);

  if (selfClosing) {
    const additionalProps = buildAdditionalProps(recipe, params);
    return `<${element}${additionalProps}
  className="${formattedClassName}"
/>`;
  }

  return `<${element} className="${formattedClassName}">
  ${slotContent}
</${element}>`;
}

/**
 * Generates HTML preview string
 */
function generatePreview(
  recipe: ComponentRecipe,
  params: RecipeRenderParams,
  className: string
): string {
  const { element } = recipe.skeleton;
  const slots = params.slots;

  // Build slot content for HTML
  const slotContent = buildSlotContent(recipe, slots, "html");

  // Check if self-closing element
  const selfClosing = ["input", "img", "br", "hr"].includes(element);

  if (selfClosing) {
    const additionalProps = buildAdditionalProps(recipe, params);
    return `<${element}${additionalProps} class="${className}" />`;
  }

  return `<${element} class="${className}">${slotContent}</${element}>`;
}

/**
 * Builds slot content based on recipe and provided values
 */
function buildSlotContent(
  recipe: ComponentRecipe,
  slots: Record<string, string>,
  format: "jsx" | "html"
): string {
  const parts: string[] = [];

  for (const slot of recipe.slots) {
    const value = slots[slot.id] ?? slot.default ?? "";
    if (!value && !slot.required) continue;

    if (slot.type === "icon" && value) {
      if (format === "jsx") {
        parts.push(`<${value} className="w-4 h-4" />`);
      } else {
        parts.push(`[${value}]`);
      }
    } else if (slot.type === "children") {
      parts.push(value);
    } else {
      parts.push(value);
    }
  }

  return parts.join("\n  ");
}

/**
 * Builds additional props for elements like input
 */
function buildAdditionalProps(
  recipe: ComponentRecipe,
  params: RecipeRenderParams
): string {
  const props: string[] = [];

  // Add type for input
  if (recipe.skeleton.element === "input") {
    const typeParam = params.params.type as string;
    if (typeParam) {
      props.push(`type="${typeParam}"`);
    }

    // Add placeholder from slots
    const placeholder = params.slots.placeholder;
    if (placeholder) {
      props.push(`placeholder="${placeholder}"`);
    }
  }

  if (props.length === 0) return "";
  return " " + props.join(" ");
}

/**
 * Format class string for better readability in code output
 */
function formatClassName(className: string): string {
  const classes = className.split(" ").filter(Boolean);

  // If short enough, keep on one line
  if (classes.join(" ").length < 60) {
    return classes.join(" ");
  }

  // Group by prefix for multi-line
  return classes.join("\n    ");
}

/**
 * Gets all available variants for a recipe
 */
export function getRecipeVariants(recipe: ComponentRecipe): string[] {
  return Object.keys(recipe.variants);
}

/**
 * Gets default params for a recipe
 */
export function getDefaultParams(
  recipe: ComponentRecipe
): RecipeRenderParams["params"] {
  const params: Record<string, string | boolean | number> = {};

  for (const param of recipe.parameters) {
    params[param.id] = param.default;
  }

  return params;
}

/**
 * Gets default slots for a recipe
 */
export function getDefaultSlots(
  recipe: ComponentRecipe
): RecipeRenderParams["slots"] {
  const slots: Record<string, string> = {};

  for (const slot of recipe.slots) {
    if (slot.default) {
      slots[slot.id] = slot.default;
    }
  }

  return slots;
}

/**
 * Validates render params against recipe
 */
export function validateRenderParams(
  recipe: ComponentRecipe,
  params: RecipeRenderParams
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check variant exists
  if (!recipe.variants[params.variant]) {
    errors.push(`Unknown variant: ${params.variant}`);
  }

  // Check required slots
  for (const slot of recipe.slots) {
    if (slot.required && !params.slots[slot.id]) {
      errors.push(`Missing required slot: ${slot.id}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generates a complete example with default values
 */
export function generateExample(
  recipe: ComponentRecipe,
  variantId?: string
): RecipeRenderResult {
  const variant = variantId || Object.keys(recipe.variants)[0];

  return renderRecipe(recipe, {
    variant,
    params: getDefaultParams(recipe),
    slots: getDefaultSlots(recipe),
  });
}
