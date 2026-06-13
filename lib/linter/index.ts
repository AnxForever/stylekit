/**
 * Style Linter - Unified Module
 *
 * Validates code against StyleKit design style guidelines.
 * Combines tokens-based validation and lint-rules-based validation.
 *
 * Used by:
 * - API: /api/lint endpoint
 */

import type { StyleTokens } from "@/lib/styles/tokens";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import {
  getStyleLintRules,
  isForbiddenClass,
  getRequiredClasses,
} from "@/lib/styles/lint-rules";
import { extractClasses, type ExtractedClass } from "./class-extractor";
import { generateSuggestion, generateFixPrompt, type Suggestion } from "./fix-generator";

// ============================================================================
// Types
// ============================================================================

export interface Violation {
  class: string;
  reason: string;
  severity: "error" | "warning";
  line?: number;
  context?: string;
}

export interface LintResult {
  valid: boolean;
  style: string;
  violations: Violation[];
  suggestions: Suggestion[];
  fixPrompt: string;
  stats: {
    totalClasses: number;
    errorCount: number;
    warningCount: number;
  };
}

// ============================================================================
// Main Lint Function
// ============================================================================

/**
 * Lint code or class string against a style's guidelines
 *
 * @param styleSlug - The style slug (e.g., 'neo-brutalist', 'glassmorphism')
 * @param code - The code or class string to lint
 * @returns LintResult with violations, suggestions, and fix prompt
 */
export function lintCode(styleSlug: string, code: string): LintResult {
  const tokens = getStyleTokens(styleSlug);
  const rules = getStyleLintRules(styleSlug);
  const extracted = extractClasses(code);
  const violations: Violation[] = [];
  const suggestions: Suggestion[] = [];
  const seenTokenClasses = new Set<string>();
  const seenRuleClasses = new Set<string>();

  // Check against tokens (if available)
  if (tokens) {
    for (const item of extracted) {
      if (seenTokenClasses.has(item.class)) continue;
      seenTokenClasses.add(item.class);

      const violation = checkClassAgainstTokens(tokens, item);
      if (violation) {
        violations.push(violation);
        const suggestion = generateSuggestion(tokens, item.class);
        if (suggestion) {
          suggestions.push(suggestion);
        }
      }
    }
  }

  // Check against lint rules (if available)
  if (rules) {
    for (const item of extracted) {
      if (seenRuleClasses.has(item.class)) continue;
      seenRuleClasses.add(item.class);

      const result = isForbiddenClass(styleSlug, item.class);
      if (result.forbidden) {
        violations.push({
          class: item.class,
          reason: result.reason || `"${item.class}" is forbidden in ${rules.name}`,
          severity: "error",
          line: item.line,
          context: item.context,
        });
      }
    }

    // Check required classes for detected components
    const componentTypes = detectComponentTypes(code);
    for (const componentType of componentTypes) {
      const required = getRequiredClasses(styleSlug, componentType);
      for (const req of required) {
        const reqParts = req.split(" ");
        const hasAllParts = reqParts.every((part) =>
          extracted.some((e) => e.class === part || e.class.includes(part))
        );

        if (!hasAllParts) {
          violations.push({
            class: req,
            reason: `Missing required class for ${componentType}: "${req}"`,
            severity: "warning",
          });
        }
      }
    }
  }

  // No rules available
  if (!tokens && !rules) {
    return {
      valid: false,
      style: styleSlug,
      violations: [
        {
          class: styleSlug,
          reason: `No lint configuration available for style "${styleSlug}"`,
          severity: "error",
        },
      ],
      suggestions: [],
      fixPrompt: "",
      stats: { totalClasses: extracted.length, errorCount: 1, warningCount: 0 },
    };
  }

  const errorCount = violations.filter((v) => v.severity === "error").length;
  const warningCount = violations.filter((v) => v.severity === "warning").length;

  return {
    valid: errorCount === 0,
    style: styleSlug,
    violations,
    suggestions,
    fixPrompt: generateFixPrompt(styleSlug, code, suggestions),
    stats: {
      totalClasses: extracted.length,
      errorCount,
      warningCount,
    },
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

// Pre-computed caches keyed by tokens identity
const forbiddenClassSetCache = new WeakMap<StyleTokens, Set<string>>();
const compiledPatternsCache = new WeakMap<StyleTokens, { regex: RegExp; source: string }[]>();
const reasonPrefixMapCache = new WeakMap<StyleTokens, Map<string, string>>();

function getForbiddenClassSet(tokens: StyleTokens): Set<string> {
  let set = forbiddenClassSetCache.get(tokens);
  if (!set) {
    set = new Set(tokens.forbidden.classes);
    forbiddenClassSetCache.set(tokens, set);
  }
  return set;
}

function getCompiledPatterns(tokens: StyleTokens): { regex: RegExp; source: string }[] {
  let patterns = compiledPatternsCache.get(tokens);
  if (!patterns) {
    patterns = tokens.forbidden.patterns.map((p) => ({ regex: new RegExp(p), source: p }));
    compiledPatternsCache.set(tokens, patterns);
  }
  return patterns;
}

function getReasonPrefixMap(tokens: StyleTokens): Map<string, string> {
  let map = reasonPrefixMapCache.get(tokens);
  if (!map) {
    map = new Map<string, string>();
    for (const [key, value] of Object.entries(tokens.forbidden.reasons)) {
      const prefix = key.split("-").slice(0, 2).join("-");
      if (!map.has(prefix)) {
        map.set(prefix, value);
      }
    }
    reasonPrefixMapCache.set(tokens, map);
  }
  return map;
}

function checkClassAgainstTokens(
  tokens: StyleTokens,
  item: ExtractedClass
): Violation | null {
  const cls = item.class;

  // Check exact forbidden matches (Set for O(1))
  const forbiddenSet = getForbiddenClassSet(tokens);
  if (forbiddenSet.has(cls)) {
    return {
      class: cls,
      reason: tokens.forbidden.reasons[cls] || "Violates style rules",
      severity: "error",
      line: item.line,
      context: item.context,
    };
  }

  // Check forbidden patterns (pre-compiled RegExp)
  const compiledPatterns = getCompiledPatterns(tokens);
  const reasonPrefixMap = getReasonPrefixMap(tokens);
  for (const { regex, source } of compiledPatterns) {
    if (regex.test(cls)) {
      const prefix = cls.split("-").slice(0, 2).join("-");
      const matchedReason = reasonPrefixMap.get(prefix);
      return {
        class: cls,
        reason: matchedReason || `Matches forbidden pattern: ${source}`,
        severity: "error",
        line: item.line,
        context: item.context,
      };
    }
  }

  return null;
}

function detectComponentTypes(code: string): ("button" | "card" | "input" | "container")[] {
  const types: ("button" | "card" | "input" | "container")[] = [];

  if (/<button|type=["']button["']|role=["']button["']/i.test(code)) {
    types.push("button");
  }
  if (/<input|<textarea|<select/i.test(code)) {
    types.push("input");
  }
  if (/card|Card/i.test(code)) {
    types.push("card");
  }
  if (/container|Container|wrapper|Wrapper/i.test(code)) {
    types.push("container");
  }

  return types;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Lint multiple code blocks
 */
export function lintMultiple(
  codeBlocks: { code: string; name?: string }[],
  styleSlug: string
): {
  results: (LintResult & { name?: string })[];
  summary: { total: number; passed: number; failed: number };
} {
  const results = codeBlocks.map((block) => ({
    ...lintCode(styleSlug, block.code),
    name: block.name,
  }));

  return {
    results,
    summary: {
      total: results.length,
      passed: results.filter((r) => r.valid).length,
      failed: results.filter((r) => !r.valid).length,
    },
  };
}

/**
 * Get fix suggestions from lint result
 */
export function getFixSuggestions(result: LintResult): string[] {
  const rules = getStyleLintRules(result.style);
  const fixes: string[] = [];

  // Use suggestions from lint result
  for (const suggestion of result.suggestions) {
    if (suggestion.replacement) {
      fixes.push(`Replace "${suggestion.original}" with "${suggestion.replacement}"`);
    } else {
      fixes.push(`Remove "${suggestion.original}" - ${suggestion.description}`);
    }
  }

  // Add recommended fixes based on rules
  if (rules) {
    for (const violation of result.violations) {
      if (violation.severity === "error" && !result.suggestions.find((s) => s.original === violation.class)) {
        if (violation.class.startsWith("rounded-")) {
          fixes.push(`Replace "${violation.class}" with "${rules.recommended.borderRadius}"`);
        } else if (violation.class.startsWith("shadow-")) {
          fixes.push(`Replace "${violation.class}" with "${rules.recommended.shadow}"`);
        } else if (violation.class.startsWith("transition-")) {
          fixes.push(`Replace "${violation.class}" with "${rules.recommended.transition}"`);
        } else {
          fixes.push(`Remove "${violation.class}" - ${violation.reason}`);
        }
      } else if (violation.severity === "warning" && violation.reason.includes("Missing required")) {
        fixes.push(`Add "${violation.class}"`);
      }
    }
  }

  return fixes;
}

/**
 * Format lint result for display
 */
export function formatLintResult(result: LintResult): string {
  const lines: string[] = [];

  lines.push(`Style: ${result.style}`);
  lines.push(`Status: ${result.valid ? "PASS" : "FAIL"}`);
  lines.push(`Classes checked: ${result.stats.totalClasses}`);
  lines.push(`Errors: ${result.stats.errorCount}, Warnings: ${result.stats.warningCount}`);
  lines.push("");

  if (result.violations.length > 0) {
    lines.push("Issues:");
    for (const violation of result.violations) {
      const icon = violation.severity === "error" ? "[x]" : "[!]";
      const location = violation.line ? ` (line ${violation.line})` : "";
      lines.push(`  ${icon} ${violation.class}${location}: ${violation.reason}`);
    }
    lines.push("");
  }

  if (result.suggestions.length > 0) {
    lines.push("Suggestions:");
    for (const suggestion of result.suggestions) {
      lines.push(`  - ${suggestion.description}`);
    }
  }

  return lines.join("\n");
}

// ============================================================================
// Re-exports
// ============================================================================

export type { Suggestion } from "./fix-generator";
export type { ExtractedClass } from "./class-extractor";
export { extractClasses } from "./class-extractor";
