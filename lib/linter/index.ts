// Style Linter - Core lint logic
// Validates code against style tokens, generates violations, suggestions, and fix prompts

import type { StyleTokens } from "@/lib/styles/tokens";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { extractClasses, type ExtractedClass } from "./class-extractor";
import { generateSuggestion, generateFixPrompt, type Suggestion } from "./fix-generator";

export interface Violation {
  class: string;
  reason: string;
  severity: "error" | "warning";
  line?: number;
  context?: string;
}

export interface LintResult {
  valid: boolean;
  violations: Violation[];
  suggestions: Suggestion[];
  fixPrompt: string;
  stats: {
    totalClasses: number;
    violationCount: number;
    warningCount: number;
  };
}

/**
 * Lint code or class string against a style's tokens
 */
export function lintCode(
  styleSlug: string,
  code: string
): LintResult {
  const tokens = getStyleTokens(styleSlug);

  if (!tokens) {
    return {
      valid: true,
      violations: [],
      suggestions: [],
      fixPrompt: "",
      stats: { totalClasses: 0, violationCount: 0, warningCount: 0 },
    };
  }

  const extracted = extractClasses(code);
  const violations: Violation[] = [];
  const suggestions: Suggestion[] = [];
  const seen = new Set<string>(); // deduplicate

  for (const item of extracted) {
    if (seen.has(item.class)) continue;
    seen.add(item.class);

    const result = checkClass(tokens, item);
    if (result) {
      violations.push(result);
      const suggestion = generateSuggestion(tokens, item.class);
      if (suggestion) {
        suggestions.push(suggestion);
      }
    }
  }

  const errorCount = violations.filter((v) => v.severity === "error").length;
  const warningCount = violations.filter((v) => v.severity === "warning").length;

  return {
    valid: violations.length === 0,
    violations,
    suggestions,
    fixPrompt: generateFixPrompt(styleSlug, code, suggestions),
    stats: {
      totalClasses: extracted.length,
      violationCount: errorCount,
      warningCount,
    },
  };
}

function checkClass(
  tokens: StyleTokens,
  item: ExtractedClass
): Violation | null {
  const cls = item.class;

  // Check exact forbidden matches
  if (tokens.forbidden.classes.includes(cls)) {
    return {
      class: cls,
      reason: tokens.forbidden.reasons[cls] || "Violates style rules",
      severity: "error",
      line: item.line,
      context: item.context,
    };
  }

  // Check forbidden patterns
  for (const pattern of tokens.forbidden.patterns) {
    if (new RegExp(pattern).test(cls)) {
      const matchedReason = Object.entries(tokens.forbidden.reasons).find(
        ([key]) => cls.startsWith(key.split("-").slice(0, 2).join("-"))
      );
      return {
        class: cls,
        reason: matchedReason?.[1] || `Matches forbidden pattern: ${pattern}`,
        severity: "error",
        line: item.line,
        context: item.context,
      };
    }
  }

  return null;
}

export type { Suggestion } from "./fix-generator";
export type { ExtractedClass } from "./class-extractor";
