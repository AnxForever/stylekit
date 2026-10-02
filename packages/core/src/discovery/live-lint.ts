/**
 * Rehydrate the portable lint contract in an implementation brief.
 *
 * Briefs cross JSON APIs, so Maps and RegExps from the in-process linter are
 * serialized as arrays and strings. Keeping this decoder in Core ensures the
 * MCP server and CLI evaluate the same live rules and fallback snapshots.
 */

import type { ImplementationBrief } from "@/lib/implementation-brief";
import type {
  MergedRules,
  StyleLintComponent,
  StyleLintRuleSource,
} from "@/lib/styles/style-linter";

const RULE_SOURCES = new Set<StyleLintRuleSource>(["curated", "tokens"]);
const COMPONENTS: StyleLintComponent[] = ["button", "card", "input"];
const RECOMMENDED_KEYS = ["borderRadius", "shadow", "transition", "spacing"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isRuleSource(value: unknown): value is StyleLintRuleSource {
  return typeof value === "string" && RULE_SOURCES.has(value as StyleLintRuleSource);
}

/** Rebuilds the serializable brief rule contract into the Maps and RegExps the linter consumes. */
export function rulesFromBrief(brief: ImplementationBrief): MergedRules | null {
  const contract: unknown = brief.lintRules;
  if (!isRecord(contract) || contract.schemaVersion !== "stylekit-lint-v1") return null;

  const rawSources = contract.sources;
  const rawClasses = contract.forbiddenClasses;
  const rawPatterns = contract.forbiddenPatterns;
  const rawRequired = contract.required;
  const rawExempt = contract.exempt;
  const rawUnsupported = contract.unsupportedRules;
  const rawRecommended = contract.recommended;
  if (!Array.isArray(rawSources) || !rawSources.every(isRuleSource) ||
      !Array.isArray(rawClasses) || !Array.isArray(rawPatterns) ||
      !isRecord(rawRequired) || !Array.isArray(rawExempt) || !rawExempt.every((item) => typeof item === "string") ||
      !Array.isArray(rawUnsupported) || !rawUnsupported.every((item) => typeof item === "string") ||
      !(rawRecommended === undefined || (isRecord(rawRecommended) &&
        Object.entries(rawRecommended).every(([key, value]) =>
          RECOMMENDED_KEYS.includes(key as (typeof RECOMMENDED_KEYS)[number]) && typeof value === "string")))) {
    return null;
  }

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
    required,
    exempt: new Set(rawExempt as string[]),
    ...(brief.tokens ? { tokens: brief.tokens } : {}),
    ...(rawRecommended ? { recommended: rawRecommended as MergedRules["recommended"] } : {}),
    sources: rawSources,
    unsupportedRules,
  };
}
