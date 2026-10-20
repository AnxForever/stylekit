import { getStyleBySlug, getFrontendReadiness, type DesignStyle, type FrontendReadinessProfile } from "./styles";
import { getStyleTokens } from "./styles/tokens-registry";
import type { StyleTokens } from "./styles/tokens";
import { getStyleRecipes, type StyleRecipes } from "./recipes";
import { mergeRulesFromTokens, type MergedRules } from "./styles/style-linter";

export function serializeLintRules(rules: MergedRules) {
  const forbiddenExceptions = rules.forbiddenExceptions ?? [];
  return {
    schemaVersion: forbiddenExceptions.length > 0 ? "stylekit-lint-v2" as const : "stylekit-lint-v1" as const,
    sources: rules.sources,
    forbiddenClasses: [...rules.forbiddenClasses].map(([className, rule]) => ({ className, ...rule })),
    forbiddenPatterns: rules.forbiddenPatterns.map(({ pattern, ...rule }) => ({ pattern: pattern.source, flags: pattern.flags, ...rule })),
    ...(forbiddenExceptions.length > 0 ? {
      forbiddenExceptions: forbiddenExceptions.map((exception) => ({
        className: exception.className,
        reason: exception.reason,
        ...(exception.variants ? { variants: {
          ...(exception.variants.all ? { all: [...exception.variants.all] } : {}),
          ...(exception.variants.none ? { none: [...exception.variants.none] } : {}),
        } } : {}),
        ...(exception.element ? { element: {
          ...(exception.element.tags ? { tags: [...exception.element.tags] } : {}),
          ...(exception.element.classesAll ? { classesAll: [...exception.element.classesAll] } : {}),
          ...(exception.element.classPrefixesAll ? { classPrefixesAll: [...exception.element.classPrefixesAll] } : {}),
          ...(exception.element.squareDimensions ? { squareDimensions: true as const } : {}),
          ...(exception.element.maxDimension !== undefined ? { maxDimension: exception.element.maxDimension } : {}),
        } } : {}),
      })),
    } : {}),
    required: Object.fromEntries(rules.required),
    exempt: [...rules.exempt],
    unsupportedRules: rules.unsupportedRules ?? [],
    ...(rules.recommended ? { recommended: rules.recommended } : {}),
  };
}

interface BriefCapabilities {
  tokens: StyleTokens | null;
  recipes: StyleRecipes | null;
  readiness: FrontendReadinessProfile;
}

export function stableImplementationBriefJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableImplementationBriefJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value).filter(([, v]) => v !== undefined).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => `${JSON.stringify(k)}:${stableImplementationBriefJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/** Portable content identifier for cache/drift detection, not a security digest. */
function contentHash(value: unknown): string {
  const json = stableImplementationBriefJson(value);
  let hash = 0x811c9dc5;
  for (let i = 0; i < json.length; i += 1) hash = Math.imul(hash ^ json.charCodeAt(i), 0x01000193) >>> 0;
  return `fnv1a32:${hash.toString(16).padStart(8, "0")}`;
}

/** Full implementation inputs. Community styles use their delivered capabilities. */
export function createImplementationBrief(
  style: DesignStyle,
  capabilities: BriefCapabilities,
  source: "bundled" | "static" | "community" = "bundled",
) {
  const payload = {
    schemaVersion: "stylekit-brief-v1" as const,
    slug: style.slug,
    name: style.name,
    nameEn: style.nameEn,
    category: style.category,
    styleType: style.styleType,
    description: style.descriptionEn ?? style.description,
    tags: style.tags,
    keywords: style.keywordsEn ?? style.keywords,
    philosophy: style.philosophyEn ?? style.philosophy,
    aiRules: style.aiRulesEn ?? style.aiRules,
    doList: style.doListEn ?? style.doList,
    dontList: style.dontListEn ?? style.dontList,
    colors: style.colors,
    globalCss: style.globalCss,
    components: style.components,
    variants: style.variants ?? [],
    tokens: capabilities.tokens,
    recipes: capabilities.recipes?.recipes ?? {},
    readiness: capabilities.readiness,
    lintRules: serializeLintRules(mergeRulesFromTokens(capabilities.tokens ?? undefined, source === "community" ? undefined : style.slug)),
  };
  return {
    ...payload,
    provenance: {
      source,
      contentHash: contentHash(payload),
      url: `https://www.stylekit.top/api/styles/${encodeURIComponent(style.slug)}/brief`,
    },
  };
}

export type ImplementationBrief = ReturnType<typeof createImplementationBrief>;

export function getImplementationBrief(slug: string): ImplementationBrief | null {
  const style = getStyleBySlug(slug);
  return style ? createImplementationBrief(style, {
    tokens: getStyleTokens(slug) ?? null,
    recipes: getStyleRecipes(slug) ?? null,
    readiness: getFrontendReadiness(style),
  }) : null;
}
