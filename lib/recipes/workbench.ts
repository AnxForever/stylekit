import { twMerge } from "tailwind-merge";
import { renderRecipe } from "./renderer";
import type { ComponentRecipe, RecipeRenderParams } from "./types";

const SUPPORTED_ELEMENTS = new Set(["button", "div", "form", "nav", "section"]);
const SUPPORTED_STATES = new Set(["default", "hover", "focus", "active", "disabled", "loading"]);
const NORMAL_INTERACTION_STATES = ["hover", "focus", "active"] as const;
const MOTION_FALLBACK_CLASSES = ["motion-reduce:transition-none", "motion-reduce:animate-none"];
const FOCUS_VISIBLE_FALLBACK_CLASSES = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-blue-500",
];

export interface WorkbenchArtifact {
  code: string;
  preview: string;
  fileName: string;
  componentName: string;
  usage: string;
  dependencies: string[];
  requiresClient: boolean;
}

/** Returns whether a recipe fits the workbench's flat, text-safe renderer. */
export function isWorkbenchRecipe(recipe: ComponentRecipe): boolean {
  return getUnsupportedReason(recipe) === null;
}

/** Creates a complete set of editable defaults for a supported recipe. */
export function getWorkbenchDefaults(recipe: ComponentRecipe): RecipeRenderParams {
  assertWorkbenchRecipe(recipe);

  const params: RecipeRenderParams["params"] = {};
  for (const parameter of recipe.parameters) {
    params[parameter.id] = parameter.default;
  }

  const slots: RecipeRenderParams["slots"] = {};
  for (const slot of recipe.slots) {
    // Icons start empty because the workbench cannot infer arbitrary imports.
    slots[slot.id] = slot.type === "icon" ? "" : slot.default ?? "";
  }

  if (recipe.skeleton.element === "input") {
    const labelSlot = recipe.slots.find((slot) => slot.id === "label");
    slots.label = labelSlot?.default || "Label";
  }

  return {
    variant: Object.prototype.hasOwnProperty.call(recipe.variants, "default")
      ? "default"
      : Object.keys(recipe.variants)[0],
    params,
    slots,
    state: "default",
  };
}

/** Builds a fixed-snapshot TSX component and matching HTML preview. */
export function buildWorkbenchArtifact(
  recipe: ComponentRecipe,
  values: RecipeRenderParams,
): WorkbenchArtifact {
  assertWorkbenchRecipe(recipe);
  const normalizedValues = normalizeValues(recipe, values);
  const safeRecipe = makeSafeRecipe(recipe, normalizedValues);
  const renderValues = NORMAL_INTERACTION_STATES.includes(normalizedValues.state as (typeof NORMAL_INTERACTION_STATES)[number])
    ? { ...normalizedValues, state: "default" as const }
    : normalizedValues;

  // Use the shared renderer only for its canonical recipe class selection.
  // It does not receive editable slot values, because this checkout's shared
  // renderer emits slot text without escaping it.
  const classOnlyRecipe: ComponentRecipe = {
    ...safeRecipe,
    skeleton: { ...safeRecipe.skeleton, element: "div" },
    slots: [],
  };
  const classOnlyValues = { ...renderValues, slots: {} };
  const className = twMerge(renderRecipe(classOnlyRecipe, classOnlyValues).className);
  const markup = renderSafeMarkup(recipe, normalizedValues, className);
  const fileStem = toFileStem(recipe.id);
  const fileName = `${fileStem}.tsx`;
  const componentName = toComponentName(fileStem);
  const code = [
    "// Fixed snapshot from the selected StyleKit recipe settings.",
    `export default function ${componentName}() {`,
    "  return (",
    indent(markup.code, 4),
    "  );",
    "}",
  ].join("\n");

  return {
    code,
    preview: markup.preview,
    fileName,
    componentName,
    usage: [
      `// Save the generated component as ${fileName} in this directory.`,
      `import ${componentName} from "./${fileStem}";`,
      "",
      "export function Example() {",
      `  return <${componentName} />;`,
      "}",
    ].join("\n"),
    dependencies: [],
    requiresClient: false,
  };
}

function normalizeValues(recipe: ComponentRecipe, values: RecipeRenderParams): RecipeRenderParams {
  if (!values || typeof values !== "object") {
    throw new TypeError(`Values for recipe "${recipe.id}" must be an object.`);
  }

  const variant = values.variant;
  if (typeof variant !== "string" || !Object.prototype.hasOwnProperty.call(recipe.variants, variant)) {
    throw new TypeError(`Unknown variant "${String(variant)}" for recipe "${recipe.id}".`);
  }

  const suppliedParams = values.params;
  if (!suppliedParams || typeof suppliedParams !== "object" || Array.isArray(suppliedParams)) {
    throw new TypeError(`Parameters for recipe "${recipe.id}" must be an object.`);
  }

  const knownParameterIds = new Set(recipe.parameters.map((parameter) => parameter.id));
  for (const key of Object.keys(suppliedParams)) {
    if (!knownParameterIds.has(key)) {
      throw new TypeError(`Unknown parameter "${key}" for recipe "${recipe.id}".`);
    }
  }

  const params: RecipeRenderParams["params"] = {};
  for (const parameter of recipe.parameters) {
    const value = Object.prototype.hasOwnProperty.call(suppliedParams, parameter.id)
      ? suppliedParams[parameter.id]
      : parameter.default;

    if (parameter.type === "boolean") {
      if (typeof value !== "boolean") {
        throw new TypeError(`Parameter "${parameter.id}" for recipe "${recipe.id}" must be boolean.`);
      }
      params[parameter.id] = value;
      continue;
    }

    if (parameter.type === "select") {
      if (typeof value !== "string" || !parameter.options?.some((option) => option.value === value)) {
        throw new TypeError(`Unknown value "${String(value)}" for parameter "${parameter.id}" in recipe "${recipe.id}".`);
      }
      params[parameter.id] = value;
      continue;
    }

    throw new TypeError(`Parameter "${parameter.id}" uses unsupported type "${parameter.type}".`);
  }

  const suppliedSlots = values.slots;
  if (!suppliedSlots || typeof suppliedSlots !== "object" || Array.isArray(suppliedSlots)) {
    throw new TypeError(`Slots for recipe "${recipe.id}" must be an object.`);
  }

  const knownSlotIds = new Set(recipe.slots.map((slot) => slot.id));
  const isInput = recipe.skeleton.element === "input";
  if (isInput) knownSlotIds.add("label");
  for (const key of Object.keys(suppliedSlots)) {
    if (!knownSlotIds.has(key)) {
      throw new TypeError(`Unknown slot "${key}" for recipe "${recipe.id}".`);
    }
  }

  const slots: RecipeRenderParams["slots"] = {};
  for (const slot of recipe.slots) {
    const value = Object.prototype.hasOwnProperty.call(suppliedSlots, slot.id)
      ? suppliedSlots[slot.id]
      : slot.type === "icon"
        ? ""
        : slot.default ?? "";
    if (typeof value !== "string") {
      throw new TypeError(`Slot "${slot.id}" for recipe "${recipe.id}" must be text.`);
    }

    if (slot.type === "icon" && value.length > 0) {
      if (!/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)*$/.test(value)) {
        throw new TypeError(`Icon slot "${slot.id}" for recipe "${recipe.id}" must be empty or a valid component name.`);
      }
      throw new TypeError(`Icon slot "${slot.id}" for recipe "${recipe.id}" has no generated import. Leave it empty or add an explicit import in the saved component.`);
    }

    slots[slot.id] = value;
    if (slot.required && value.trim().length === 0) {
      throw new TypeError(`Missing required slot "${slot.id}" for recipe "${recipe.id}".`);
    }
  }

  if (isInput) {
    const label = Object.prototype.hasOwnProperty.call(suppliedSlots, "label")
      ? suppliedSlots.label
      : recipe.slots.find((slot) => slot.id === "label")?.default || "Label";
    if (typeof label !== "string" || label.trim().length === 0) {
      throw new TypeError(`Input label for recipe "${recipe.id}" must contain text.`);
    }
    slots.label = label;
  }

  const state = values.state ?? "default";
  if (typeof state !== "string" || !SUPPORTED_STATES.has(state)) {
    throw new TypeError(`Unsupported state "${String(state)}" for recipe "${recipe.id}".`);
  }
  if (state !== "default" && !recipe.states?.[state as keyof NonNullable<ComponentRecipe["states"]>]) {
    throw new TypeError(`State "${state}" is not defined for recipe "${recipe.id}".`);
  }

  return { variant, params, slots, state: state as RecipeRenderParams["state"] };
}

function makeSafeRecipe(recipe: ComponentRecipe, values: RecipeRenderParams): ComponentRecipe {
  const normalInteractionClasses = NORMAL_INTERACTION_STATES.flatMap((state) => recipe.states?.[state] ?? []);
  const selectedStateClasses = values.state === "disabled" || values.state === "loading"
    ? recipe.states?.[values.state] ?? []
    : [];
  const motionCandidates = [
    ...recipe.skeleton.baseClasses,
    ...(recipe.variants[values.variant]?.classes ?? []),
    ...getSelectedParameterClasses(recipe, values),
    ...normalInteractionClasses,
    ...selectedStateClasses,
  ].flatMap((classes) => classes.split(/\s+/).filter(Boolean));
  const hasVisibleFocus = motionCandidates.some(hasVisibleFocusStyle);
  const needsFocusFallback =
    (recipe.skeleton.element === "button" || recipe.skeleton.element === "input") && !hasVisibleFocus;
  const motionClasses = [...MOTION_FALLBACK_CLASSES];
  if (motionCandidates.some(isInteractionTransformClass)) {
    motionClasses.push("motion-reduce:transform-none");
  }

  const baseClasses = uniqueClasses([
    ...recipe.skeleton.baseClasses,
    ...normalInteractionClasses,
    ...(needsFocusFallback ? FOCUS_VISIBLE_FALLBACK_CLASSES : []),
    ...motionClasses,
  ]);
  const states = recipe.states
    ? {
        ...recipe.states,
        disabled: withoutExistingClasses(recipe.states.disabled ?? [], baseClasses),
        loading: withoutExistingClasses(recipe.states.loading ?? [], baseClasses),
      }
    : undefined;

  return {
    ...recipe,
    skeleton: { ...recipe.skeleton, baseClasses },
    states,
  };
}

function getSelectedParameterClasses(recipe: ComponentRecipe, values: RecipeRenderParams): string[] {
  return recipe.parameters.flatMap((parameter) => {
    const value = values.params[parameter.id] ?? parameter.default;
    if (parameter.type === "boolean") {
      const classes = value ? parameter.trueClasses : parameter.falseClasses;
      return classes ? [classes] : [];
    }
    if (parameter.type === "select") {
      const classes = parameter.options?.find((option) => option.value === value)?.classes;
      return classes ? [classes] : [];
    }
    return [];
  });
}

function hasVisibleFocusStyle(className: string): boolean {
  const segments = className.split(":");
  const utility = segments[segments.length - 1];
  const hasFocusVariant = segments.slice(0, -1).some((variant) =>
    variant === "focus" ||
    variant.startsWith("focus-") ||
    variant.startsWith("group-focus") ||
    variant.startsWith("peer-focus"),
  );
  if (!hasFocusVariant) return false;

  return (
    /^border(?:-|$)/.test(utility) && !["border-0", "border-none", "border-transparent"].includes(utility) && !utility.endsWith("-transparent") ||
    /^ring(?:-|$)/.test(utility) && !utility.endsWith("-0") && !utility.endsWith("-transparent") ||
    /^shadow(?:-|$)/.test(utility) && utility !== "shadow-none" && !utility.endsWith("-transparent") ||
    /^outline(?:-|$)/.test(utility) && !["outline-0", "outline-none", "outline-transparent"].includes(utility)
  );
}

function isInteractionTransformClass(className: string): boolean {
  const segments = className.split(":");
  if (segments.length < 2) return false;
  const utility = segments[segments.length - 1];
  const hasInteractionVariant = segments.slice(0, -1).some((variant) =>
    ["hover", "focus", "focus-visible", "focus-within", "active"].includes(variant) ||
    variant.startsWith("group-hover") ||
    variant.startsWith("peer-hover"),
  );
  return hasInteractionVariant && (/^-?(translate|scale|rotate|skew)-/.test(utility) || /^\[transform:/.test(utility));
}

function uniqueClasses(classGroups: string[]): string[] {
  const seen = new Set<string>();
  return classGroups.flatMap((group) => group.split(/\s+/).filter(Boolean)).filter((className) => {
    if (seen.has(className)) return false;
    seen.add(className);
    return true;
  });
}

function withoutExistingClasses(classes: string[], existing: string[]): string[] {
  const existingSet = new Set(existing);
  return uniqueClasses(classes).filter((className) => !existingSet.has(className));
}

function renderSafeMarkup(
  recipe: ComponentRecipe,
  values: RecipeRenderParams,
  className: string,
): { code: string; preview: string } {
  if (recipe.skeleton.element === "input") {
    const label = values.slots.label;
    const attributes: Array<[string, string]> = [];
    const inputType = values.params.type;
    const placeholder = values.slots.placeholder;
    if (typeof inputType === "string" && inputType) attributes.push(["type", inputType]);
    if (placeholder) attributes.push(["placeholder", placeholder]);

    const codeAttributes = attributes.map(([name, value]) => jsxStringAttribute(name, value)).join(" ");
    const previewAttributes = attributes.map(([name, value]) => htmlStringAttribute(name, value)).join(" ");
    const codeInput = `<input${codeAttributes ? ` ${codeAttributes}` : ""} className={${JSON.stringify(className)}} />`;
    const previewInput = `<input${previewAttributes ? ` ${previewAttributes}` : ""} class="${escapeHtmlAttribute(className)}" />`;
    return {
      code: `<label>\n  {${JSON.stringify(label)}}\n  ${codeInput}\n</label>`,
      preview: `<label>${escapeHtmlText(label)}${previewInput}</label>`,
    };
  }

  const element = recipe.skeleton.element;
  const buttonType = element === "button" ? " type=\"button\"" : "";
  const slotContent = recipe.slots.flatMap((slot) => {
    if (slot.type === "icon") return [];
    const value = values.slots[slot.id] ?? slot.default ?? "";
    if (!value && !slot.required) return [];
    return [value];
  }).join("\n  ");
  const code = `<${element}${buttonType} className={${JSON.stringify(className)}}>${slotContent
    ? `{${JSON.stringify(slotContent)}}`
    : ""}</${element}>`;
  const preview = `<${element}${buttonType} class="${escapeHtmlAttribute(className)}">${escapeHtmlText(slotContent)}</${element}>`;
  return { code, preview };
}

function jsxStringAttribute(name: string, value: string): string {
  return `${name}={${JSON.stringify(value)}}`;
}

function htmlStringAttribute(name: string, value: string): string {
  return `${name}="${escapeHtmlAttribute(value)}"`;
}

function escapeHtmlText(value: string): string {
  return escapeHtmlAttribute(value);
}

function escapeHtmlAttribute(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function indent(value: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return value.split("\n").map((line) => `${prefix}${line}`).join("\n");
}

function getUnsupportedReason(recipe: ComponentRecipe): string | null {
  if (!recipe || typeof recipe !== "object" || !recipe.skeleton) return "recipe skeleton is missing";
  if (recipe.skeleton.structure !== undefined || recipe.skeleton.children !== undefined) {
    return "custom skeleton structure and child trees are not supported";
  }
  if (!SUPPORTED_ELEMENTS.has(recipe.skeleton.element) && recipe.skeleton.element !== "input") {
    return `root element <${String(recipe.skeleton.element)}> is not supported`;
  }
  if (!Array.isArray(recipe.skeleton.baseClasses) || !Array.isArray(recipe.parameters) || !Array.isArray(recipe.slots)) {
    return "recipe collections are malformed";
  }
  if (!recipe.variants || typeof recipe.variants !== "object" || Object.keys(recipe.variants).length === 0) {
    return "at least one visual variant is required";
  }

  for (const [key, variant] of Object.entries(recipe.variants)) {
    if (!variant || typeof variant.id !== "string" || !Array.isArray(variant.classes) || key !== variant.id) {
      return `variant "${key}" is malformed`;
    }
  }

  const parameterIds = new Set<string>();
  for (const parameter of recipe.parameters) {
    if (!parameter || !parameter.id || parameterIds.has(parameter.id)) return "parameter identifiers must be unique";
    parameterIds.add(parameter.id);
    if (parameter.type === "boolean") {
      if (typeof parameter.default !== "boolean") return `boolean parameter "${parameter.id}" must have a boolean default`;
      continue;
    }
    if (parameter.type === "select") {
      if (!Array.isArray(parameter.options) || parameter.options.length === 0) {
        return `select parameter "${parameter.id}" must define options`;
      }
      const optionValues = new Set(parameter.options.map((option) => option.value));
      if (optionValues.size !== parameter.options.length || typeof parameter.default !== "string" || !optionValues.has(parameter.default)) {
        return `select parameter "${parameter.id}" must have unique options and a matching default`;
      }
      continue;
    }
    return `parameter "${parameter.id}" uses unsupported type "${parameter.type}"`;
  }

  const slotIds = new Set<string>();
  for (const slot of recipe.slots) {
    if (!slot || !slot.id || slotIds.has(slot.id)) return "slot identifiers must be unique";
    slotIds.add(slot.id);
    if (slot.type !== undefined && !["text", "children", "element", "icon"].includes(slot.type)) {
      return `slot "${slot.id}" uses unsupported type "${String(slot.type)}"`;
    }
    if (slot.default !== undefined && typeof slot.default !== "string") return `slot "${slot.id}" must have a text default`;
    if (slot.type === "icon" && slot.required) return `required icon slot "${slot.id}" has no workbench import control`;
  }

  if (recipe.skeleton.element === "input") {
    for (const slot of recipe.slots) {
      if (slot.id !== "placeholder" && slot.id !== "label") {
        return `input slot "${slot.id}" is not rendered by the workbench`;
      }
      if (slot.type === "icon" || slot.id === "label" && slot.type !== undefined && slot.type !== "text") {
        return `input slot "${slot.id}" must be text`;
      }
    }
  }

  return null;
}

function assertWorkbenchRecipe(recipe: ComponentRecipe): void {
  const reason = getUnsupportedReason(recipe);
  if (reason) throw new TypeError(`Recipe "${recipe?.id ?? "unknown"}" is not supported by the workbench: ${reason}.`);
}

function toFileStem(recipeId: string): string {
  const stem = recipeId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!stem) throw new TypeError("Recipe id must contain at least one letter or number to create a file name.");
  return stem;
}

function toComponentName(fileStem: string): string {
  const words = fileStem.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const componentName = words.map((word) => word[0].toUpperCase() + word.slice(1)).join("");
  return /^[A-Za-z_$]/.test(componentName) ? componentName : `Recipe${componentName}`;
}
