/**
 * Style Linter
 *
 * Checks if code follows the specified design style guidelines.
 * Used by:
 * - MCP Server: lint tool
 * - API: /api/lint endpoint
 * - CLI: stylekit lint command
 */

import {
  getStyleLintRules,
  isForbiddenClass,
  getRequiredClasses,
  type StyleLintRule,
} from "../styles/lint-rules";

export interface LintIssue {
  type: "error" | "warning" | "suggestion";
  class: string;
  message: string;
  line?: number;
  column?: number;
}

export interface LintResult {
  valid: boolean;
  style: string;
  issues: LintIssue[];
  suggestions: string[];
  stats: {
    totalClasses: number;
    forbiddenCount: number;
    missingRequired: number;
  };
}

/**
 * Extract Tailwind classes from code string
 */
function extractClasses(code: string): string[] {
  // Match className="..." or class="..."
  const classNameRegex = /(?:className|class)=["'`]([^"'`]+)["'`]/g;
  const classes: string[] = [];

  let match;
  while ((match = classNameRegex.exec(code)) !== null) {
    const classString = match[1];
    // Split by whitespace and filter empty
    const individualClasses = classString.split(/\s+/).filter(Boolean);
    classes.push(...individualClasses);
  }

  // Also match template literals: className={`...`} or cn("...")
  const templateRegex = /(?:className=\{[`'"]|cn\(["'`])([^`'"}\)]+)/g;
  while ((match = templateRegex.exec(code)) !== null) {
    const classString = match[1];
    const individualClasses = classString.split(/\s+/).filter(Boolean);
    classes.push(...individualClasses);
  }

  // Also match clsx, cva patterns
  const clsxRegex = /(?:clsx|cva|twMerge)\(\s*["'`]([^"'`]+)/g;
  while ((match = clsxRegex.exec(code)) !== null) {
    const classString = match[1];
    const individualClasses = classString.split(/\s+/).filter(Boolean);
    classes.push(...individualClasses);
  }

  return [...new Set(classes)]; // Remove duplicates
}

/**
 * Detect component type from code
 */
function detectComponentType(code: string): ("button" | "card" | "input" | "container")[] {
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

/**
 * Main lint function
 */
export function lintCode(code: string, styleSlug: string): LintResult {
  const rules = getStyleLintRules(styleSlug);

  if (!rules) {
    return {
      valid: true,
      style: styleSlug,
      issues: [{
        type: "warning",
        class: "",
        message: `No lint rules found for style "${styleSlug}"`,
      }],
      suggestions: [],
      stats: { totalClasses: 0, forbiddenCount: 0, missingRequired: 0 },
    };
  }

  const classes = extractClasses(code);
  const componentTypes = detectComponentType(code);
  const issues: LintIssue[] = [];
  const suggestions: string[] = [];

  // Check forbidden classes
  for (const cls of classes) {
    const result = isForbiddenClass(styleSlug, cls);
    if (result.forbidden) {
      issues.push({
        type: "error",
        class: cls,
        message: result.reason || `"${cls}" is forbidden in ${rules.name}`,
      });
    }
  }

  // Check required classes for detected components
  let missingRequired = 0;
  for (const componentType of componentTypes) {
    const required = getRequiredClasses(styleSlug, componentType);
    for (const req of required) {
      // Check if any required class (or part of compound class) is present
      const reqParts = req.split(" ");
      const hasAllParts = reqParts.every(part =>
        classes.some(cls => cls === part || cls.includes(part))
      );

      if (!hasAllParts) {
        missingRequired++;
        issues.push({
          type: "warning",
          class: req,
          message: `Missing required class for ${componentType}: "${req}"`,
        });
      }
    }
  }

  // Add style-specific suggestions
  if (rules.recommended) {
    suggestions.push(`Recommended border-radius: ${rules.recommended.borderRadius}`);
    suggestions.push(`Recommended shadow: ${rules.recommended.shadow}`);
    suggestions.push(`Recommended transition: ${rules.recommended.transition}`);
  }

  // Add color suggestions if palette violations detected
  const colorViolations = issues.filter(i =>
    i.message.includes("color") || i.message.includes("Color")
  );
  if (colorViolations.length > 0 && rules.colors.allowedPalettes.length > 0) {
    suggestions.push(`Use colors from: ${rules.colors.allowedPalettes.join(", ")}`);
  }

  return {
    valid: issues.filter(i => i.type === "error").length === 0,
    style: styleSlug,
    issues,
    suggestions,
    stats: {
      totalClasses: classes.length,
      forbiddenCount: issues.filter(i => i.type === "error").length,
      missingRequired,
    },
  };
}

/**
 * Lint multiple code blocks
 */
export function lintMultiple(
  codeBlocks: { code: string; name?: string }[],
  styleSlug: string
): { results: (LintResult & { name?: string })[]; summary: { total: number; passed: number; failed: number } } {
  const results = codeBlocks.map(block => ({
    ...lintCode(block.code, styleSlug),
    name: block.name,
  }));

  return {
    results,
    summary: {
      total: results.length,
      passed: results.filter(r => r.valid).length,
      failed: results.filter(r => !r.valid).length,
    },
  };
}

/**
 * Get fix suggestions for a lint result
 */
export function getFixSuggestions(result: LintResult): string[] {
  const rules = getStyleLintRules(result.style);
  if (!rules) return [];

  const fixes: string[] = [];

  for (const issue of result.issues) {
    if (issue.type === "error") {
      // Suggest replacement based on style
      if (issue.class.startsWith("rounded-")) {
        fixes.push(`Replace "${issue.class}" with "${rules.recommended.borderRadius}"`);
      } else if (issue.class.startsWith("shadow-")) {
        fixes.push(`Replace "${issue.class}" with "${rules.recommended.shadow}"`);
      } else if (issue.class.startsWith("transition-")) {
        fixes.push(`Replace "${issue.class}" with "${rules.recommended.transition}"`);
      } else {
        fixes.push(`Remove "${issue.class}" - ${issue.message}`);
      }
    } else if (issue.type === "warning" && issue.message.includes("Missing required")) {
      fixes.push(`Add "${issue.class}"`);
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
  lines.push("");

  if (result.issues.length > 0) {
    lines.push("Issues:");
    for (const issue of result.issues) {
      const icon = issue.type === "error" ? "[x]" : issue.type === "warning" ? "[!]" : "[i]";
      lines.push(`  ${icon} ${issue.message}`);
    }
    lines.push("");
  }

  if (result.suggestions.length > 0) {
    lines.push("Suggestions:");
    for (const suggestion of result.suggestions) {
      lines.push(`  - ${suggestion}`);
    }
  }

  return lines.join("\n");
}
