/**
 * Compliance check: paste code back in, get a verdict.
 *
 * This is the closed-loop half of the bot. The style ships with a rules
 * engine (forbidden classes, forbidden patterns, required component classes);
 * code that claims to implement the style is checked against it, and every
 * violation carries a concrete fix when the rule set can derive one.
 *
 * The engine lives in stylekit-core. Until this bot existed, nothing outside
 * the web app could call it.
 */

import {
  lintStyleCode,
  hasLintableRules,
  type StyleLintReport,
} from "stylekit-core";
import { getStyleBySlug } from "stylekit-core/styles";

export type { StyleLintReport };

export class ComplianceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ComplianceError";
  }
}

export interface CheckCodeParams {
  slug: string;
  code: string;
}

/** Runs the style's rules against a code snippet and returns the report. */
export function checkCode({ slug, code }: CheckCodeParams): StyleLintReport {
  if (!getStyleBySlug(slug)) {
    throw new ComplianceError(`Unknown style: ${slug}`);
  }
  if (!hasLintableRules(slug)) {
    throw new ComplianceError(`Style "${slug}" has no lintable rules.`);
  }
  return lintStyleCode(slug, code, {});
}

/** Human-facing verdict, one short line for the card header. */
export function verdictLine(report: StyleLintReport): string {
  if (report.violations.length === 0) {
    return `风格合规，${report.checkedClasses} 个类名全部通过`;
  }
  const errors = report.violations.filter((v) => v.severity === "error").length;
  const warnings = report.violations.length - errors;
  const parts = [`${errors} 处错误`];
  if (warnings > 0) parts.push(`${warnings} 处警告`);
  return `发现 ${parts.join("、")}（共检查 ${report.checkedClasses} 个类名）`;
}
