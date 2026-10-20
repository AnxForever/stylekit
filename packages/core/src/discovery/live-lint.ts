/**
 * Rehydrate the portable lint contract in an implementation brief.
 *
 * Briefs cross JSON APIs, so Maps and RegExps from the in-process linter are
 * serialized as arrays and strings. Keeping this decoder in Core ensures the
 * MCP server and CLI evaluate the same live rules and fallback snapshots.
 */

import { stableImplementationBriefJson, type ImplementationBrief } from "@/lib/implementation-brief";
import type {
  MergedRules,
  StyleLintComponent,
  StyleLintRuleSource,
} from "@/lib/styles/style-linter";
import type { StyleLintException } from "@/lib/styles/tokens";

const RULE_SOURCES = new Set<StyleLintRuleSource>(["curated", "tokens"]);
const COMPONENTS: StyleLintComponent[] = ["button", "card", "input"];
const RECOMMENDED_KEYS = ["borderRadius", "shadow", "transition", "spacing"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isRuleSource(value: unknown): value is StyleLintRuleSource {
  return typeof value === "string" && RULE_SOURCES.has(value as StyleLintRuleSource);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === "string" && item.length > 0 && item.length <= 160);
}

function hasOnlyKeys(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).every((key) => keys.includes(key));
}

function isScopedException(value: unknown): value is StyleLintException {
  if (!isRecord(value) || !hasOnlyKeys(value, ["className", "reason", "variants", "element"]) ||
      typeof value.className !== "string" || value.className.length === 0 || value.className.length > 160 ||
      typeof value.reason !== "string" || value.reason.length === 0 || value.reason.length > 512) return false;

  if (value.variants !== undefined) {
    if (!isRecord(value.variants) || !hasOnlyKeys(value.variants, ["all", "none"]) ||
        (value.variants.all !== undefined && !isStringArray(value.variants.all)) ||
        (value.variants.none !== undefined && !isStringArray(value.variants.none)) ||
        (!Array.isArray(value.variants.all) && !Array.isArray(value.variants.none))) return false;
  }

  if (value.element !== undefined) {
    const element = value.element;
    if (!isRecord(element) || !hasOnlyKeys(element, ["tags", "classesAll", "classPrefixesAll", "squareDimensions", "maxDimension"]) ||
        (element.tags !== undefined && !isStringArray(element.tags)) ||
        (element.classesAll !== undefined && !isStringArray(element.classesAll)) ||
        (element.classPrefixesAll !== undefined && !isStringArray(element.classPrefixesAll)) ||
        (element.squareDimensions !== undefined && element.squareDimensions !== true) ||
        (element.maxDimension !== undefined && (typeof element.maxDimension !== "number" || !Number.isFinite(element.maxDimension) || element.maxDimension < 0 || element.maxDimension > 1024)) ||
        !["tags", "classesAll", "classPrefixesAll", "squareDimensions", "maxDimension"].some((key) => element[key] !== undefined)) return false;
  }

  const hasVariantScope = isRecord(value.variants) && (
    (Array.isArray(value.variants.all) && value.variants.all.length > 0) ||
    (Array.isArray(value.variants.none) && value.variants.none.length > 0)
  );
  const hasElementScope = isRecord(value.element) && (
    (Array.isArray(value.element.tags) && value.element.tags.length > 0) ||
    (Array.isArray(value.element.classesAll) && value.element.classesAll.length > 0) ||
    (Array.isArray(value.element.classPrefixesAll) && value.element.classPrefixesAll.length > 0) ||
    value.element.squareDimensions === true ||
    typeof value.element.maxDimension === "number"
  );
  return hasVariantScope || hasElementScope;
}

/** Rebuilds the serializable brief rule contract into the Maps and RegExps the linter consumes. */
export function rulesFromBrief(brief: ImplementationBrief): MergedRules | null {
  const contract: unknown = brief.lintRules;
  if (!isRecord(contract) || (contract.schemaVersion !== "stylekit-lint-v1" && contract.schemaVersion !== "stylekit-lint-v2")) return null;
  const isV2 = contract.schemaVersion === "stylekit-lint-v2";

  const rawSources = contract.sources;
  const rawClasses = contract.forbiddenClasses;
  const rawPatterns = contract.forbiddenPatterns;
  const rawRequired = contract.required;
  const rawExempt = contract.exempt;
  const rawUnsupported = contract.unsupportedRules;
  const rawRecommended = contract.recommended;
  const rawExceptions = contract.forbiddenExceptions;
  if (!Array.isArray(rawSources) || !rawSources.every(isRuleSource) ||
      !Array.isArray(rawClasses) || !Array.isArray(rawPatterns) ||
      !isRecord(rawRequired) || !Array.isArray(rawExempt) || !rawExempt.every((item) => typeof item === "string") ||
      !Array.isArray(rawUnsupported) || !rawUnsupported.every((item) => typeof item === "string") ||
      !(rawRecommended === undefined || (isRecord(rawRecommended) &&
        Object.entries(rawRecommended).every(([key, value]) =>
          RECOMMENDED_KEYS.includes(key as (typeof RECOMMENDED_KEYS)[number]) && typeof value === "string")))) {
    return null;
  }
  if (isV2) {
    if (!Array.isArray(rawExceptions) || rawExceptions.length === 0 || !rawExceptions.every(isScopedException)) return null;
  } else if (rawExceptions !== undefined && (!Array.isArray(rawExceptions) || rawExceptions.length > 0)) {
    return null;
  }

  const rawTokenExceptions = isRecord(brief.tokens) && isRecord(brief.tokens.forbidden)
    ? brief.tokens.forbidden.exceptions
    : undefined;
  if (rawTokenExceptions !== undefined && (!Array.isArray(rawTokenExceptions) || !rawTokenExceptions.every(isScopedException))) return null;
  if (Array.isArray(rawTokenExceptions) && rawTokenExceptions.length > 0 && (
    !isV2 || !Array.isArray(rawExceptions) || rawTokenExceptions.some((tokenException) =>
      !rawExceptions.some((ruleException) =>
        stableImplementationBriefJson(tokenException) === stableImplementationBriefJson(ruleException)))
  )) return null;

  const forbiddenClasses: MergedRules["forbiddenClasses"] = new Map();
  for (const item of rawClasses) {
    if (!isRecord(item) || typeof item.className !== "string" ||
        typeof item.reason !== "string" || !isRuleSource(item.source)) return null;
    forbiddenClasses.set(item.className, { reason: item.reason, source: item.source });
  }

  const forbiddenPatterns: MergedRules["forbiddenPatterns"] = [];
  const unsupportedRules = [...rawUnsupported];
  for (const item of rawPatterns) {
    if (!isRecord(item) || typeof item.pattern !== "string" || item.pattern.length > 256 ||
        typeof item.flags !== "string" || !isRuleSource(item.source) || !isRecord(item.reasons) ||
        !Object.values(item.reasons).every((reason) => typeof reason === "string")) return null;
    try {
      forbiddenPatterns.push({
        pattern: new RegExp(item.pattern, item.flags.replace(/g/g, "")),
        source: item.source,
        reasons: item.reasons as Record<string, string>,
      });
    } catch {
      // The base linter reports unsupported patterns as inconclusive rather
      // than silently treating the style as verified.
      unsupportedRules.push(item.pattern);
    }
  }

  const required: MergedRules["required"] = new Map();
  for (const component of COMPONENTS) {
    const item = rawRequired[component];
    if (item === undefined) continue;
    if (!isRecord(item) || !Array.isArray(item.classes) ||
        !item.classes.every((value) => typeof value === "string") || !isRuleSource(item.source)) return null;
    required.set(component, { classes: item.classes as string[], source: item.source });
  }

  return {
    forbiddenClasses,
    forbiddenPatterns,
    forbiddenExceptions: isV2 ? rawExceptions as StyleLintException[] : [],
    required,
    exempt: new Set(rawExempt as string[]),
    ...(brief.tokens ? { tokens: brief.tokens } : {}),
    ...(rawRecommended ? { recommended: rawRecommended as MergedRules["recommended"] } : {}),
    sources: rawSources,
    unsupportedRules,
  };
}
