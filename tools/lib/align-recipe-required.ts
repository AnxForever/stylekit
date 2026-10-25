import { twMerge } from "tailwind-merge";
import type { ComponentRecipe, RecipeParameter } from "../../lib/recipes/types";
import { canonicalRequiredClass } from "../../lib/styles/style-linter";

export type RequiredComponent = "button" | "card" | "input";

export interface RecipeClassSurface {
  variant: string;
  params: Record<string, string | boolean | number>;
  classes: string[];
  state?: string;
}

export type RequiredDecision =
  | { original: string; action: "keep"; replacement: string; reason: string }
  | { original: string; action: "replace"; replacement: string; reason: string }
  | { original: string; action: "drop"; reason: string };

export interface RequiredAlignment {
  required: string[];
  decisions: RequiredDecision[];
  needsReview: boolean;
  reviewReason?: string;
  universalClasses: string[];
}

/** Enumerate the same select/boolean parameter surface used by recipe lint checks. */
export function enumerateRecipeParameterCombinations(
  parameters: RecipeParameter[],
): Array<Record<string, string | boolean | number>> {
  let combinations: Array<Record<string, string | boolean | number>> = [{}];
  for (const parameter of parameters) {
    const values: Array<string | boolean | number> = parameter.type === "boolean"
      ? [false, true]
      : parameter.type === "select" && parameter.options?.length
        ? parameter.options.map((option) => option.value)
        : [parameter.default];
    combinations = combinations.flatMap((combination) =>
      values.map((value) => ({ ...combination, [parameter.id]: value })),
    );
  }
  return combinations;
}

/**
 * Enumerate all variant and parameter renders for a recipe's ordinary exported
 * class string. State-gated utilities are included by renderRecipe; explicitly
 * simulated states are excluded because unprefixed disabled/active classes are
 * not part of the default component contract.
 */
export function enumerateRecipeClassSurfaces(
  recipe: ComponentRecipe,
  render: (recipe: ComponentRecipe, params: {
    variant: string;
    params: Record<string, string | boolean | number>;
    slots: Record<string, string>;
  }) => { className: string },
): RecipeClassSurface[] {
  const paramsList = enumerateRecipeParameterCombinations(recipe.parameters ?? []);
  const slots: Record<string, string> = {};
  for (const slot of recipe.slots ?? []) slots[slot.id] = slot.default ?? "";
  return Object.values(recipe.variants).flatMap((variant) =>
    paramsList.map((params) => ({
      variant: variant.id,
      params,
      classes: render(recipe, { variant: variant.id, params, slots }).className.split(/\s+/).filter(Boolean),
    })),
  );
}

/** Enumerate classes that appear only when callers explicitly simulate a state. */
export function enumerateRecipeExplicitStateClassSurfaces(
  recipe: ComponentRecipe,
  render: (recipe: ComponentRecipe, params: {
    variant: string;
    params: Record<string, string | boolean | number>;
    slots: Record<string, string>;
    state?: "default" | "hover" | "focus" | "active" | "disabled" | "loading";
  }) => { className: string },
): RecipeClassSurface[] {
  const paramsList = enumerateRecipeParameterCombinations(recipe.parameters ?? []);
  const slots: Record<string, string> = {};
  for (const slot of recipe.slots ?? []) slots[slot.id] = slot.default ?? "";
  const states = Object.keys(recipe.states ?? {}) as Array<NonNullable<RecipeClassSurface["state"]>>;
  return Object.values(recipe.variants).flatMap((variant) =>
    paramsList.flatMap((params) =>
      states.map((state) => ({
        variant: variant.id,
        params,
        state,
        classes: render(recipe, { variant: variant.id, params, slots, state: state as "hover" | "focus" | "active" | "disabled" | "loading" }).className.split(/\s+/).filter(Boolean),
      })),
    ),
  );
}

/**
 * Align old AI/linter requirements to classes present in every official recipe
 * variant and parameter combination. Ambiguous, optional, or unsupported rules
 * are reported and removed from the proposed contract.
 */
export function alignRequiredClasses(
  oldEntries: string[],
  surfaces: RecipeClassSurface[],
  explicitStateSurfaces: RecipeClassSurface[] = [],
): RequiredAlignment {
  const originals = uniqueByCanonical(splitClasses(oldEntries));
  if (surfaces.length === 0) {
    return {
      required: [],
      decisions: originals.map((original) => ({ original, action: "drop", reason: "recipe produced no render surfaces" })),
      needsReview: true,
      reviewReason: "recipe produced no render surfaces",
      universalClasses: [],
    };
  }

  const universal = new Map<string, Set<string>>();
  let firstSurface = true;
  for (const surface of surfaces) {
    const validClasses = surface.classes.filter(isCompleteTailwindClass);
    const current = new Set(validClasses.map(canonicalRequiredClass));
    if (firstSurface) {
      for (const value of validClasses) {
        const canonical = canonicalRequiredClass(value);
        const spellings = universal.get(canonical) ?? new Set<string>();
        spellings.add(value);
        universal.set(canonical, spellings);
      }
      firstSurface = false;
    } else {
      for (const [canonical, spellings] of universal) {
        if (!current.has(canonical)) universal.delete(canonical);
        else {
          for (const spelling of validClasses.filter((value) => canonicalRequiredClass(value) === canonical)) {
            spellings.add(spelling);
          }
        }
      }
    }
  }

  const candidates = [...universal.values()].flatMap((spellings) => [...spellings]);
  const canonicalUniversal = new Set(universal.keys());
  const defaultPresence = new Map<string, number>();
  for (const surface of surfaces) {
    for (const canonical of new Set(surface.classes.map(canonicalRequiredClass))) {
      defaultPresence.set(canonical, (defaultPresence.get(canonical) ?? 0) + 1);
    }
  }
  const decisions: RequiredDecision[] = [];
  const required: string[] = [];
  const used = new Set<string>();

  for (const original of originals) {
    if (!isCompleteTailwindClass(original)) {
      decisions.push({ original, action: "drop", reason: "invalid or incomplete Tailwind utility" });
      continue;
    }
    const canonical = canonicalRequiredClass(original);
    if (canonicalUniversal.has(canonical)) {
      const replacement = uniqueSpellings(universal.get(canonical)!)[0];
      addRequired(required, used, replacement);
      decisions.push({ original, action: "keep", replacement, reason: "present in every recipe render" });
      continue;
    }

    const matches = uniqueByCanonical(candidates.filter((candidate) =>
      hasSameVariantPrefix(original, candidate) &&
      sameTailwindUtilityFamily(original, candidate),
    ));
    if (matches.length === 1) {
      addRequired(required, used, matches[0]);
      decisions.push({ original, action: "replace", replacement: matches[0], reason: "replaced by the only universal recipe utility in the same Tailwind conflict family" });
    } else if (matches.length > 1) {
      decisions.push({ original, action: "drop", reason: `ambiguous: ${matches.length} universal utilities conflict with this requirement` });
    } else {
      const count = defaultPresence.get(canonical) ?? 0;
      if (count > 0) {
        decisions.push({ original, action: "drop", reason: `optional across variants or parameters: present in ${count}/${surfaces.length} default renders` });
        continue;
      }
      const explicitStates = [...new Set(explicitStateSurfaces
        .filter((surface) => surface.classes.some((value) => canonicalRequiredClass(value) === canonical))
        .map((surface) => surface.state)
        .filter((state): state is string => Boolean(state)))];
      if (explicitStates.length) {
        decisions.push({ original, action: "drop", reason: `only emitted by explicit state simulation: ${explicitStates.join(", ")}; absent from the default export` });
      } else {
        decisions.push({ original, action: "drop", reason: "not emitted by any recipe variant, parameter, or named state" });
      }
    }
  }

  const needsReview = required.length === 0;
  return {
    required,
    decisions,
    needsReview,
    ...(needsReview ? { reviewReason: originals.length ? "all old requirements were optional or unsupported" : "no existing required intent could be aligned" } : {}),
    universalClasses: [...canonicalUniversal].flatMap((canonical) => uniqueSpellings(universal.get(canonical)!)).sort(),
  };
}

export function splitClasses(entries: string[]): string[] {
  return entries.flatMap((entry) => entry.split(/\s+/).map((value) => value.trim()).filter(Boolean));
}

function isCompleteTailwindClass(value: string): boolean {
  if (!value || /[-/:]$/.test(value)) return false;
  let squareDepth = 0;
  let roundDepth = 0;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === "\\") { index += 1; continue; }
    if (character === "[") squareDepth += 1;
    else if (character === "]") {
      squareDepth -= 1;
      if (squareDepth < 0) return false;
    } else if (character === "(") roundDepth += 1;
    else if (character === ")") {
      roundDepth -= 1;
      if (roundDepth < 0) return false;
    }
  }
  return squareDepth === 0 && roundDepth === 0;
}

export function uniqueByCanonical(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    const canonical = canonicalRequiredClass(value);
    if (seen.has(canonical)) return false;
    seen.add(canonical);
    return true;
  });
}

function uniqueSpellings(values: Set<string>): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function addRequired(required: string[], used: Set<string>, value: string): void {
  const canonical = canonicalRequiredClass(value);
  if (used.has(canonical)) return;
  used.add(canonical);
  required.push(value);
}

function hasSameVariantPrefix(left: string, right: string): boolean {
  return variantPrefix(left) === variantPrefix(right);
}

function variantPrefix(value: string): string {
  let depth = 0;
  let lastTopLevelColon = -1;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === "[") depth += 1;
    else if (character === "]") depth = Math.max(0, depth - 1);
    else if (character === ":" && depth === 0) lastTopLevelColon = index;
  }
  return lastTopLevelColon === -1 ? "" : value.slice(0, lastTopLevelColon + 1);
}

function sameTailwindUtilityFamily(left: string, right: string): boolean {
  if (left === right || !hasSameVariantPrefix(left, right)) return false;
  if (backgroundUtilityKind(left) !== backgroundUtilityKind(right)) return false;
  return twMerge(`${left} ${right}`) === right && twMerge(`${right} ${left}`) === left;
}

function backgroundUtilityKind(value: string): "background-color" | "background-image" | "other" {
  const prefix = variantPrefix(value);
  const utility = value.slice(prefix.length).replace(/^!|!$/g, "").replace(/^-/, "");
  if (!utility.startsWith("bg-")) return "other";
  if (/^bg-(?:gradient|linear|radial|conic|none)(?:-|$)/.test(utility)) return "background-image";
  const arbitrary = utility.match(/^bg-\[(.*)\](?:\/.*)?$/)?.[1] ?? "";
  if (/^(?:image:|url\(|(?:repeating-)?(?:linear|radial|conic)-gradient\()/i.test(arbitrary)) return "background-image";
  if (/^bg-opacity-/.test(utility)) return "other";
  return "background-color";
}
