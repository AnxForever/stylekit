/**
 * @module lib/discovery
 *
 * High-level style discovery helpers — search, detail, registry URL/install
 * command, token lookup, and recipe rendering — shared by @stylekit/mcp and
 * @stylekit/cli so the data layer lives in one place. Re-exported as
 * @stylekit/core/discovery.
 */

import { styles, getStyleBySlug } from "./styles";
import { getRecipe, getRecipeIds, hasRecipes, isValidRecipeIconName, renderRecipe, type ComponentRecipe, type RecipeParameter } from "./recipes";
import { getStyleTokens, hasStyleTokens } from "./styles/tokens-registry";
import { getStyleQuality, type StyleQuality } from "./styles/quality";
import { expandQueryTerms, colorIntentMatches, hasTerm } from "./search/synonyms";
import type { DesignStyle } from "./styles";
import type { StyleTokens } from "./styles/tokens";
import type { StyleCategory } from "./styles/meta";

/** Canonical host (matches the site's www canonical to avoid a 301 redirect). */
export const STYLEKIT_SITE_URL = "https://www.stylekit.top";

/** Reuse the canonical style category union so it can't drift. */
export type DiscoveryCategory = StyleCategory;

export interface StyleSummary {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  tags: string[];
  description: string;
}

export interface StyleDetail extends StyleSummary {
  philosophy: string;
  colors: { primary: string; secondary: string; accent: string[] };
  doList: string[];
  dontList: string[];
  keywords: string[];
  hasTokens: boolean;
  hasRecipes: boolean;
  recipeIds: string[];
  shadcnInstall: string;
  url: string;
  quality: StyleQuality;
}

export interface RecipeResult {
  slug: string;
  component: string;
  className: string;
  code: string;
}

export type RecipeRenderValue = string | boolean | number;

/** Options for rendering one component recipe. Omitted values keep recipe defaults. */
export interface RecipeRenderOptions {
  variant?: string;
  params?: Record<string, RecipeRenderValue>;
  slots?: Record<string, string>;
}

export type RecipeRenderInputErrorCode =
  | "invalid_options"
  | "invalid_recipe_definition"
  | "unknown_variant"
  | "unknown_parameter"
  | "invalid_parameter"
  | "unknown_slot"
  | "invalid_slot_value";

/** A caller input error for a recipe, distinct from a missing style/component. */
export class RecipeRenderInputError extends Error {
  readonly code: RecipeRenderInputErrorCode;

  constructor(code: RecipeRenderInputErrorCode, message: string) {
    super(message);
    this.name = "RecipeRenderInputError";
    this.code = code;
  }
}

export interface SearchOptions {
  query?: string;
  category?: DiscoveryCategory;
  limit?: number;
}

function toSummary(s: DesignStyle): StyleSummary {
  return {
    slug: s.slug,
    name: s.name,
    nameEn: s.nameEn,
    category: s.category,
    tags: s.tags,
    description: s.descriptionEn ?? s.description,
  };
}

/** The registry-item URL for a style (canonical host). */
export function registryUrl(slug: string): string {
  return `${STYLEKIT_SITE_URL}/r/${slug}.json`;
}

/** The one-line shadcn install command for a style's theme. */
export function shadcnInstallCommand(slug: string): string {
  return `npx shadcn add ${registryUrl(slug)}`;
}

export function knownSlug(slug: string): boolean {
  return getStyleBySlug(slug) !== undefined;
}

/** Design tokens for a style, or null if none are registered. */
export function getTokens(slug: string): StyleTokens | null {
  return getStyleTokens(slug) ?? null;
}

/**
 * Relevance score for a style against a query, or 0 for no match. Higher wins.
 * Matches the raw query first (name/slug/tag/keyword/description), then falls
 * back to bilingual synonym expansion and palette colour intent so meaning-based
 * queries ("professional", "dark", "blue") match even when the word is absent.
 */
function scoreStyle(s: DesignStyle, q: string, terms: string[]): number {
  const name = s.nameEn.toLowerCase();
  const zhName = s.name.toLowerCase();
  const slug = s.slug.toLowerCase();
  const desc = `${s.description} ${s.descriptionEn ?? ""}`.toLowerCase();
  const tags = s.tags.map((t) => t.toLowerCase());
  const keywords = s.keywords.map((k) => k.toLowerCase());

  if (slug === q || name === q || zhName === q) return 100;
  if (name.includes(q) || zhName.includes(q) || slug.includes(q)) return 80;
  if (tags.some((t) => t.includes(q))) return 60;
  if (keywords.some((k) => hasTerm(k, q))) return 55;
  if (hasTerm(desc, q)) return 40;

  // Bilingual synonym expansion against the full haystack.
  const hay = [name, zhName, slug, desc, ...tags, ...keywords].join(" ");
  for (const t of terms) {
    if (t !== q && t.length > 1 && hasTerm(hay, t)) return 30;
  }

  // Palette colour intent ("blue" -> styles with a blue in their palette).
  const palette = [s.colors.primary, s.colors.secondary, ...(s.colors.accent ?? [])];
  if (colorIntentMatches(q, palette)) return 20;

  return 0;
}

/**
 * Search or list styles. With no query, returns all styles (optionally filtered
 * by category) — a plain listing. With a query, ranks styles by relevance using
 * bilingual synonym expansion and palette colour intent. `total` is the match
 * count before `limit`.
 *
 * `pool` overrides the catalogue being searched. It exists so a caller holding
 * fresher data — the published packages fetch the live catalogue, whose
 * contents outgrow whatever snapshot they were built with — can reuse this
 * ranking rather than reimplementing it. Reimplementing would put scoring in
 * two places and guarantee they drift.
 */
export function searchStyles(
  opts: SearchOptions = {},
  pool?: readonly DesignStyle[],
): {
  total: number;
  results: StyleSummary[];
} {
  const catalogue: readonly DesignStyle[] = pool ?? styles;
  let candidates: DesignStyle[] = opts.category
    ? catalogue.filter((s) => s.category === opts.category)
    : [...catalogue];
  if (opts.query) {
    const q = opts.query.trim().toLowerCase();
    const terms = expandQueryTerms(q);
    candidates = candidates
      .map((s) => ({ s, score: scoreStyle(s, q, terms) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.s.nameEn.localeCompare(b.s.nameEn))
      .map((x) => x.s);
  }
  const total = candidates.length;
  const limited =
    typeof opts.limit === "number" && opts.limit > 0
      ? candidates.slice(0, opts.limit)
      : candidates;
  return { total, results: limited.map(toSummary) };
}

export function getStyleDetail(slug: string): StyleDetail | null {
  const s = getStyleBySlug(slug);
  if (!s) return null;
  return {
    ...toSummary(s),
    philosophy: s.philosophyEn ?? s.philosophy,
    colors: s.colors,
    doList: s.doListEn ?? s.doList,
    dontList: s.dontListEn ?? s.dontList,
    keywords: s.keywordsEn ?? s.keywords,
    hasTokens: hasStyleTokens(slug),
    hasRecipes: hasRecipes(slug),
    recipeIds: getRecipeIds(slug),
    shadcnInstall: shadcnInstallCommand(slug),
    url: `${STYLEKIT_SITE_URL}/styles/${slug}`,
    quality: getStyleQuality(s),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function recipeInputError(code: RecipeRenderInputErrorCode, message: string): never {
  throw new RecipeRenderInputError(code, message);
}

function isRecipeParameterValueType(parameter: RecipeParameter, value: unknown): boolean {
  if (parameter.type === "boolean") return typeof value === "boolean";
  if (parameter.type === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === "string";
}

function isRecipeParameterOption(parameter: RecipeParameter, value: unknown): boolean {
  return parameter.type !== "select" || Boolean(parameter.options?.some((option) => option.value === value));
}

/** Validates the default and enum contract that the shared renderer consumes. */
export function isValidRecipeParameterDefinition(value: unknown): boolean {
  if (!isRecord(value) || typeof value.id !== "string" || value.id.length === 0 ||
      typeof value.label !== "string" || typeof value.labelZh !== "string" ||
      !["select", "boolean", "string", "color", "number"].includes(String(value.type))) return false;

  const parameter = value as unknown as RecipeParameter;
  if (!isRecipeParameterValueType(parameter, parameter.default)) return false;

  if (parameter.type === "select") {
    if (!Array.isArray(value.options) || value.options.length === 0 || !value.options.every((option) =>
      isRecord(option) && typeof option.value === "string" && option.value.length > 0 &&
      typeof option.label === "string" && typeof option.labelZh === "string" && typeof option.classes === "string")) return false;
    const optionValues = value.options.map((option) => (option as Record<string, unknown>).value as string);
    if (new Set(optionValues).size !== optionValues.length || !isRecipeParameterOption(parameter, parameter.default)) return false;
  } else if (value.options !== undefined) {
    return false;
  }

  return (value.affectsClasses === undefined || typeof value.affectsClasses === "boolean") &&
    ["trueClasses", "falseClasses"].every((key) => value[key] === undefined || typeof value[key] === "string");
}

function normalizeRecipeRenderOptions(
  recipe: ComponentRecipe,
  options: RecipeRenderOptions = {},
): { variant: string; params: Record<string, RecipeRenderValue>; slots: Record<string, string> } {
  if (!isRecord(options)) {
    return recipeInputError("invalid_options", "Recipe render options must be an object.");
  }

  const invalidParameter = recipe.parameters.find((parameter) => !isValidRecipeParameterDefinition(parameter));
  if (invalidParameter) {
    return recipeInputError(
      "invalid_recipe_definition",
      `Parameter "${invalidParameter.id}" for recipe "${recipe.id}" has an invalid type, default, or option contract.`,
    );
  }
  const invalidIconDefault = recipe.slots.find((slot) =>
    slot.type === "icon" && Boolean(slot.default) && !isValidRecipeIconName(slot.default!));
  if (invalidIconDefault) {
    return recipeInputError(
      "invalid_recipe_definition",
      `Default value for icon slot "${invalidIconDefault.id}" in recipe "${recipe.id}" is not a JSX component/member name.`,
    );
  }
  if (new Set(recipe.parameters.map((parameter) => parameter.id)).size !== recipe.parameters.length) {
    return recipeInputError("invalid_recipe_definition", `Recipe "${recipe.id}" has duplicate parameter IDs.`);
  }

  const allowedKeys = new Set(["variant", "params", "slots"]);
  const unknownOption = Object.keys(options).find((key) => !allowedKeys.has(key));
  if (unknownOption) {
    return recipeInputError("invalid_options", `Unknown recipe render option "${unknownOption}".`);
  }

  if (options.variant !== undefined && typeof options.variant !== "string") {
    return recipeInputError("invalid_options", `Recipe render option "variant" must be a string.`);
  }

  const rawParams = options.params === undefined ? {} : options.params;
  if (!isRecord(rawParams)) {
    return recipeInputError("invalid_options", `Recipe render option "params" must be an object.`);
  }
  const params = Object.create(null) as Record<string, RecipeRenderValue>;
  for (const [parameterId, value] of Object.entries(rawParams)) {
    const parameter = recipe.parameters.find((candidate) => candidate.id === parameterId);
    if (!parameter) {
      return recipeInputError("unknown_parameter", `Unknown parameter "${parameterId}" for recipe "${recipe.id}".`);
    }

    if (!isRecipeParameterValueType(parameter, value)) {
      return recipeInputError(
        "invalid_parameter",
        `Parameter "${parameterId}" for recipe "${recipe.id}" must be ${parameter.type === "boolean" ? "a boolean" : parameter.type === "number" ? "a finite number" : "a string"}.`,
      );
    }

    if (!isRecipeParameterOption(parameter, value)) {
      const choices = (parameter.options ?? []).map((option) => option.value).join(", ");
      return recipeInputError(
        "invalid_parameter",
        `Parameter "${parameterId}" for recipe "${recipe.id}" must be one of: ${choices}.`,
      );
    }
    params[parameterId] = value as RecipeRenderValue;
  }

  const rawSlots = options.slots === undefined ? {} : options.slots;
  if (!isRecord(rawSlots)) {
    return recipeInputError("invalid_options", `Recipe render option "slots" must be an object.`);
  }
  const slots = Object.create(null) as Record<string, string>;
  for (const [slotId, value] of Object.entries(rawSlots)) {
    const slot = recipe.slots.find((candidate) => candidate.id === slotId);
    if (!slot) {
      return recipeInputError("unknown_slot", `Unknown slot "${slotId}" for recipe "${recipe.id}".`);
    }
    if (typeof value !== "string") {
      return recipeInputError("invalid_slot_value", `Slot "${slotId}" for recipe "${recipe.id}" must be a string.`);
    }
    if (slot.type === "icon" && value.length > 0 && !isValidRecipeIconName(value)) {
      return recipeInputError(
        "invalid_slot_value",
        `Icon slot "${slotId}" for recipe "${recipe.id}" accepts an empty value or a JSX component/member name such as "ArrowRight" or "Icons.ArrowRight"; markup is not allowed.`,
      );
    }
    slots[slotId] = value;
  }

  const variant = options.variant ?? Object.keys(recipe.variants)[0] ?? "default";
  if (options.variant !== undefined && !Object.prototype.hasOwnProperty.call(recipe.variants, variant)) {
    return recipeInputError("unknown_variant", `Unknown variant "${variant}" for recipe "${recipe.id}".`);
  }

  return { variant, params, slots };
}

/** Render a known definition with the same validation and default semantics as discovery. */
export function renderRecipeDefinition(
  slug: string,
  component: string,
  recipe: ComponentRecipe,
  options: RecipeRenderOptions = {},
): RecipeResult {
  const renderOptions = normalizeRecipeRenderOptions(recipe, options);
  const rendered = renderRecipe(recipe, renderOptions);
  return { slug, component, className: rendered.className, code: rendered.code };
}

export function getComponentRecipe(
  slug: string,
  component: string,
  options: RecipeRenderOptions = {},
): RecipeResult | null {
  const recipe = getRecipe(slug, component);
  if (!recipe) return null;
  return renderRecipeDefinition(slug, component, recipe, options);
}
