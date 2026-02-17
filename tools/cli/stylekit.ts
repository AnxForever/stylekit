#!/usr/bin/env node

/**
 * StyleKit CLI
 *
 * Command-line interface for StyleKit design system tools.
 *
 * Usage:
 *   npx stylekit <command> [options]
 *
 * Commands:
 *   lint <file> --style <style>   Check if code follows style guidelines
 *   recommend <query>             Get design recommendations
 *   styles                        List available styles
 *   rules <style>                 Show lint rules for a style
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, relative, join } from "path";

// Import from lib (relative paths for tsx execution)
import { lintCode, getFixSuggestions, type LintResult } from "../lib/linter";
import { getStyleLintRules, getStylesWithLintRules } from "../lib/styles/lint-rules";
import { styles, getStyleBySlug } from "../lib/styles";
import { searchKnowledge, getDesignRecommendation, getSmartRecommendation, compareStyles } from "../lib/knowledge";
import type { RecommendationContext } from "../lib/knowledge";
import { generateIdeConfig, type IdeConfigFormat } from "../lib/export/ide-configs";
import { generateTailwindPresetJS } from "../lib/export/tailwind-preset";
import { generateShadcnThemeCSS } from "../lib/export/shadcn-theme";
import { generateSkillPack } from "../lib/export/skill-pack";
import { getCurrentVersion, getChangelog, computeStyleHash } from "../lib/versioning/registry";
import { scoreStyle } from "../lib/accessibility/scorer";
import { getStyleTokens } from "../lib/styles/tokens-registry";

// ---- Colors for terminal output ----
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
};

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

// ---- Help message ----
const HELP = `
${colorize("StyleKit CLI", "bold")} - AI-friendly design system tools

${colorize("Usage:", "cyan")}
  npx stylekit <command> [options]

${colorize("Commands:", "cyan")}
  ${colorize("lint", "green")} --style <s> --files <glob>  Check if code follows style guidelines
  ${colorize("recommend", "green")} <query>             Get design recommendations for a product type
  ${colorize("smart", "green")} <query> [options]       Smart recommendation with scoring and context
  ${colorize("compare", "green")} <s1> <s2> <query>     Compare two styles for a product type
  ${colorize("styles", "green")}                        List all available design styles
  ${colorize("rules", "green")} <style>                 Show lint rules for a specific style
  ${colorize("export", "green")} <style> --format <fmt>  Export style to various formats
  ${colorize("version", "green")} <style>                Show version info and changelog
  ${colorize("accessibility", "green")} <style>          Run accessibility scoring (alias: a11y)
  ${colorize("search", "green")} <query>                Search the knowledge base
  ${colorize("help", "green")}                          Show this help message

${colorize("Smart Command Options:", "cyan")}
  --audience <type>    Target: consumer, enterprise, developer, creative
  --device <type>      Device: desktop, mobile, tablet, all
  --mood <type>        Brand mood: playful, professional, luxury, minimal, bold
  --a11y               Prioritize accessibility
  --perf               Prioritize performance

${colorize("Lint Options:", "cyan")}
  --style <style>      Style slug to lint against (required)
  --files <glob>       Glob pattern for files to check (required)
  --format <fmt>       Output format: text (default), json, github
  --fix                Show fix suggestions for violations

${colorize("Export Formats:", "cyan")}
  cursorrules, claude-rules, windsurf-rules, tailwind-preset, shadcn-theme, skill-pack
  --output <file>      Write to file instead of stdout

${colorize("Examples:", "cyan")}
  stylekit lint --style neo-brutalist --files "src/**/*.tsx"
  stylekit lint --style neo-brutalist --files "src/**/*.tsx" --format github
  stylekit lint --style glassmorphism --files "components/**/*.tsx" --fix
  stylekit recommend "SaaS dashboard"
  stylekit smart "e-commerce store" --audience consumer --mood playful
  stylekit compare neo-brutalist glassmorphism "creative portfolio"
  stylekit rules glassmorphism
  stylekit search "dark color palette"
  stylekit export neo-brutalist --format cursorrules
  stylekit export glassmorphism --format tailwind-preset --output preset.js
  stylekit version neo-brutalist
  stylekit a11y glassmorphism

${colorize("Available Styles:", "cyan")}
  ${getStylesWithLintRules().join(", ")}
`;

// ---- Command handlers ----

function cmdHelp(): void {
  console.log(HELP);
}

function cmdStyles(): void {
  console.log(colorize("\nAvailable Design Styles\n", "bold"));

  for (const style of styles) {
    const hasRules = getStylesWithLintRules().includes(style.slug);
    const rulesBadge = hasRules ? colorize(" [lint]", "green") : "";

    console.log(`  ${colorize(style.slug, "cyan")}${rulesBadge}`);
    console.log(`    ${colors.dim}${style.description.slice(0, 80)}...${colors.reset}`);
    console.log();
  }

  console.log(`Total: ${styles.length} styles, ${getStylesWithLintRules().length} with lint rules\n`);
}

function cmdRules(styleSlug: string): void {
  const rules = getStyleLintRules(styleSlug);

  if (!rules) {
    console.error(colorize(`Error: No lint rules found for style "${styleSlug}"`, "red"));
    console.log(`\nAvailable styles with rules: ${getStylesWithLintRules().join(", ")}`);
    process.exit(1);
  }

  console.log(colorize(`\nLint Rules: ${rules.name}\n`, "bold"));

  console.log(colorize("Forbidden Classes:", "red"));
  for (const cls of rules.forbidden.classes.slice(0, 10)) {
    const reason = rules.forbidden.reasons[cls] || "";
    console.log(`  [x] ${cls}${reason ? colors.dim + " - " + reason + colors.reset : ""}`);
  }
  if (rules.forbidden.classes.length > 10) {
    console.log(`  ${colors.dim}... and ${rules.forbidden.classes.length - 10} more${colors.reset}`);
  }

  console.log(colorize("\nRequired Classes:", "green"));
  for (const [component, classes] of Object.entries(rules.required)) {
    if (classes && classes.length > 0) {
      console.log(`  ${colorize(component, "cyan")}:`);
      for (const cls of classes) {
        console.log(`    [+] ${cls}`);
      }
    }
  }

  console.log(colorize("\nRecommended:", "yellow"));
  console.log(`  Border radius: ${rules.recommended.borderRadius}`);
  console.log(`  Shadow: ${rules.recommended.shadow}`);
  console.log(`  Transition: ${rules.recommended.transition}`);

  console.log(colorize("\nColor Palette:", "magenta"));
  console.log(`  Allowed: ${rules.colors.allowedPalettes.join(", ")}`);
  if (rules.colors.forbiddenColors.length > 0) {
    console.log(`  Forbidden: ${rules.colors.forbiddenColors.join(", ")}`);
  }
  console.log(`  Contrast: WCAG ${rules.colors.contrastMinimum}`);

  console.log();
}

// ---- Glob utility for file matching ----

function matchGlob(pattern: string, filePath: string): boolean {
  const regexStr = pattern
    .replace(/\./g, "\\.")
    .replace(/\*\*/g, "{{GLOBSTAR}}")
    .replace(/\*/g, "[^/]*")
    .replace(/\{\{GLOBSTAR\}\}/g, ".*");
  return new RegExp(`^${regexStr}$`).test(filePath);
}

function findFilesMatchingGlob(baseDir: string, pattern: string): string[] {
  const results: string[] = [];

  function walk(dir: string): void {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git" || entry === "dist") continue;
      const fullPath = join(dir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        const rel = relative(baseDir, fullPath);
        if (matchGlob(pattern, rel)) {
          results.push(fullPath);
        }
      }
    }
  }

  walk(baseDir);
  return results.sort();
}

// ---- Format types ----

type OutputFormat = "text" | "json" | "github";

interface FileLintResult {
  file: string;
  relativePath: string;
  result: LintResult;
  fixes: string[];
}

// ---- Output formatters ----

function formatTextOutput(results: FileLintResult[], showFix: boolean): string {
  const lines: string[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  const totalFiles = results.length;
  let failedFiles = 0;

  for (const r of results) {
    totalErrors += r.result.stats.errorCount;
    totalWarnings += r.result.stats.warningCount;
    if (!r.result.valid) failedFiles++;

    if (r.result.violations.length === 0) continue;

    lines.push(colorize(`\n  ${r.relativePath}`, "bold"));
    for (const v of r.result.violations) {
      const icon = v.severity === "error" ? colorize("[x]", "red") : colorize("[!]", "yellow");
      const location = v.line ? `:${v.line}` : "";
      lines.push(`    ${icon} ${v.class}${location}: ${v.reason}`);
    }

    if (showFix && r.fixes.length > 0) {
      lines.push(colorize("    Fixes:", "green"));
      for (const fix of r.fixes) {
        lines.push(`      - ${fix}`);
      }
    }
  }

  const summary = [
    "",
    colorize("Summary:", "bold"),
    `  Files checked: ${totalFiles}`,
    `  Files with issues: ${failedFiles}`,
    `  Errors: ${totalErrors}`,
    `  Warnings: ${totalWarnings}`,
    "",
  ];

  if (totalErrors === 0) {
    summary.push(colorize("  PASS - No style violations found", "green"));
  } else {
    summary.push(colorize(`  FAIL - ${totalErrors} error(s) found`, "red"));
  }

  return [...lines, ...summary].join("\n");
}

function formatJsonOutput(results: FileLintResult[], styleSlug: string): string {
  const output = {
    style: styleSlug,
    totalFiles: results.length,
    totalErrors: results.reduce((sum, r) => sum + r.result.stats.errorCount, 0),
    totalWarnings: results.reduce((sum, r) => sum + r.result.stats.warningCount, 0),
    files: results.map((r) => ({
      file: r.relativePath,
      valid: r.result.valid,
      errors: r.result.stats.errorCount,
      warnings: r.result.stats.warningCount,
      violations: r.result.violations.map((v) => ({
        class: v.class,
        severity: v.severity,
        reason: v.reason,
        line: v.line || null,
      })),
      fixes: r.fixes,
    })),
  };
  return JSON.stringify(output, null, 2);
}

function formatGithubOutput(results: FileLintResult[]): string {
  const lines: string[] = [];

  for (const r of results) {
    for (const v of r.result.violations) {
      const level = v.severity === "error" ? "error" : "warning";
      const line = v.line || 1;
      lines.push(`::${level} file=${r.relativePath},line=${line}::${v.class}: ${v.reason}`);
    }
  }

  // Summary annotation
  const totalErrors = results.reduce((sum, r) => sum + r.result.stats.errorCount, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.result.stats.warningCount, 0);
  if (totalErrors > 0 || totalWarnings > 0) {
    lines.push(`::notice::StyleKit Lint: ${totalErrors} error(s), ${totalWarnings} warning(s) across ${results.length} file(s)`);
  }

  return lines.join("\n");
}

// ---- Enhanced lint command (multi-file with glob) ----

function cmdLintMulti(styleSlug: string, filesGlob: string, format: OutputFormat, showFix: boolean): void {
  const baseDir = process.cwd();
  const files = findFilesMatchingGlob(baseDir, filesGlob);

  if (files.length === 0) {
    console.error(colorize(`Error: No files matched pattern "${filesGlob}"`, "red"));
    process.exit(1);
  }

  const results: FileLintResult[] = [];

  for (const file of files) {
    const code = readFileSync(file, "utf-8");
    const result = lintCode(styleSlug, code);
    const fixes = showFix ? getFixSuggestions(result) : [];
    results.push({
      file,
      relativePath: relative(baseDir, file),
      result,
      fixes,
    });
  }

  switch (format) {
    case "json":
      console.log(formatJsonOutput(results, styleSlug));
      break;
    case "github":
      console.log(formatGithubOutput(results));
      break;
    case "text":
    default:
      console.log(formatTextOutput(results, showFix));
      break;
  }

  const hasErrors = results.some((r) => !r.result.valid);
  if (hasErrors) {
    process.exit(1);
  }
}

function cmdLint(filePath: string, styleSlug: string): void {
  // Resolve file path
  const absolutePath = resolve(process.cwd(), filePath);

  if (!existsSync(absolutePath)) {
    console.error(colorize(`Error: File not found: ${filePath}`, "red"));
    process.exit(1);
  }

  // Read file
  const code = readFileSync(absolutePath, "utf-8");

  // Lint
  const result = lintCode(styleSlug, code);
  const fixes = getFixSuggestions(result);

  // Output
  console.log(colorize(`\nLinting: ${filePath}`, "bold"));
  console.log(`Style: ${colorize(styleSlug, "cyan")}`);
  console.log();

  if (result.valid) {
    console.log(colorize("[PASS] No forbidden classes found", "green"));
  } else {
    console.log(colorize(`[FAIL] ${result.stats.errorCount} forbidden classes found`, "red"));
  }

  if (result.stats.warningCount > 0) {
    console.log(colorize(`[WARN] ${result.stats.warningCount} warnings`, "yellow"));
  }

  console.log(`\nClasses checked: ${result.stats.totalClasses}`);

  if (result.violations.length > 0) {
    console.log(colorize("\nIssues:", "bold"));
    for (const violation of result.violations) {
      const icon = violation.severity === "error" ? colorize("[x]", "red") : colorize("[!]", "yellow");
      console.log(`  ${icon} ${violation.class}: ${violation.reason}`);
    }
  }

  if (fixes.length > 0) {
    console.log(colorize("\nSuggested Fixes:", "bold"));
    for (const fix of fixes) {
      console.log(`  ${colorize("-", "green")} ${fix}`);
    }
  }

  console.log();

  // Exit with error code if invalid
  if (!result.valid) {
    process.exit(1);
  }
}

function cmdRecommend(query: string): void {
  console.log(colorize(`\nDesign Recommendation for: "${query}"\n`, "bold"));

  const recommendation = getDesignRecommendation(query, { maxGuidelines: 3 });

  console.log(colorize("Style:", "cyan"));
  console.log(`  Primary: ${recommendation.style.primary}`);
  if (recommendation.style.secondary) {
    console.log(`  Secondary: ${recommendation.style.secondary.join(", ")}`);
  }

  console.log(colorize("\nColors:", "cyan"));
  if (recommendation.colors) {
    console.log(`  Primary: ${recommendation.colors.primary}`);
    console.log(`  Background: ${recommendation.colors.background}`);
    console.log(`  CTA: ${recommendation.colors.cta}`);
  }

  console.log(colorize("\nTypography:", "cyan"));
  if (recommendation.typography) {
    console.log(`  ${recommendation.typography.headingFont} + ${recommendation.typography.bodyFont}`);
  }

  if (recommendation.landingPattern) {
    console.log(colorize("\nLanding Pattern:", "cyan"));
    console.log(`  ${recommendation.landingPattern.name}`);
  }

  if (recommendation.uxGuidelines && recommendation.uxGuidelines.length > 0) {
    console.log(colorize("\nUX Guidelines:", "cyan"));
    for (const guideline of recommendation.uxGuidelines.slice(0, 3)) {
      console.log(`  - ${guideline.issue}: ${guideline.description?.slice(0, 60)}...`);
    }
  }

  console.log();
}

function cmdSearch(query: string): void {
  console.log(colorize(`\nSearch Results for: "${query}"\n`, "bold"));

  const results = searchKnowledge(query, undefined, 5);

  console.log(`Domain: ${colorize(results.domain, "cyan")}`);
  console.log(`Found: ${results.count} results\n`);

  for (const item of results.results) {
    // Display first few fields of each result
    const keys = Object.keys(item).slice(0, 3);
    const record = item as unknown as Record<string, unknown>;
    console.log(colorize(`-`, "green"), keys.map(k => `${k}: ${String(record[k]).slice(0, 50)}`).join(" | "));
  }

  console.log();
}

function cmdSmart(query: string, context: RecommendationContext): void {
  console.log(colorize(`\nSmart Recommendation for: "${query}"\n`, "bold"));

  const rec = getSmartRecommendation(query, context);

  // Summary
  console.log(colorize("Summary:", "cyan"));
  console.log(`  Confidence: ${rec.summary.confidence}%`);
  console.log(`  ${rec.summary.headline}`);
  console.log();

  // Style recommendation
  console.log(colorize("Recommended Style:", "cyan"));
  console.log(`  ${colorize(rec.style.item.name, "green")} (${rec.style.score}% match)`);
  if (rec.style.reasons.length > 0) {
    for (const reason of rec.style.reasons) {
      console.log(`    ${colors.dim}${reason}${colors.reset}`);
    }
  }
  console.log();

  // Top 5 style scores
  console.log(colorize("Style Rankings:", "cyan"));
  for (const style of rec.styleScores.slice(0, 5)) {
    const bar = "█".repeat(Math.round(style.score / 10)) + "░".repeat(10 - Math.round(style.score / 10));
    console.log(`  ${style.name.padEnd(20)} ${bar} ${style.score}%`);
  }
  console.log();

  // Colors
  console.log(colorize("Colors:", "cyan"));
  console.log(`  ${rec.colors.item.productType} palette (${rec.colors.score}% compatible)`);
  console.log(`  Primary: ${rec.colors.item.primary}`);
  console.log(`  CTA: ${rec.colors.item.cta}`);
  console.log(`  Background: ${rec.colors.item.background}`);
  console.log();

  // Typography
  console.log(colorize("Typography:", "cyan"));
  console.log(`  ${rec.typography.item.headingFont} + ${rec.typography.item.bodyFont}`);
  console.log(`  Mood: ${rec.typography.item.mood.join(", ")}`);
  console.log();

  // Compatibility
  console.log(colorize("Compatibility:", "cyan"));
  console.log(`  Style-Color: ${rec.compatibility.styleColorScore}%`);
  console.log(`  Style-Typography: ${rec.compatibility.styleTypographyScore}%`);
  console.log(`  Overall Harmony: ${rec.compatibility.overallHarmony}%`);
  console.log();

  // Context adjustments
  if (rec.contextAdjustments.length > 0) {
    console.log(colorize("Context Adjustments:", "yellow"));
    for (const adj of rec.contextAdjustments) {
      console.log(`  - ${adj}`);
    }
    console.log();
  }

  // Alternatives
  console.log(colorize("Alternatives:", "dim"));
  console.log(`  Styles: ${rec.style.alternatives.map(a => a.name).join(", ")}`);
  console.log();
}

function cmdCompare(style1: string, style2: string, query: string): void {
  console.log(colorize(`\nComparing ${style1} vs ${style2} for "${query}"\n`, "bold"));

  const result = compareStyles(query, style1, style2, {});

  console.log(colorize("Winner:", "green"), result.winner);
  console.log(colorize("Recommendation:", "cyan"), result.recommendation);
  console.log();

  console.log(colorize("Category Comparison:", "cyan"));
  console.log(`  ${"Category".padEnd(15)} ${style1.padEnd(15)} ${style2.padEnd(15)} Winner`);
  console.log(`  ${"-".repeat(60)}`);
  for (const c of result.comparison) {
    const s1 = c.style1Score.toString().padEnd(15);
    const s2 = c.style2Score.toString().padEnd(15);
    const winner = c.winner === style1 ? colorize(c.winner, "green") : colorize(c.winner, "blue");
    console.log(`  ${c.category.padEnd(15)} ${s1} ${s2} ${winner}`);
  }
  console.log();
}

// ---- Export command ----

type ExportFormat = "cursorrules" | "claude-rules" | "windsurf-rules" | "tailwind-preset" | "shadcn-theme" | "skill-pack";

const EXPORT_FORMATS: ExportFormat[] = [
  "cursorrules", "claude-rules", "windsurf-rules", "tailwind-preset", "shadcn-theme", "skill-pack",
];

function cmdExport(styleSlug: string, format: ExportFormat, outputFile?: string): void {
  const style = getStyleBySlug(styleSlug);
  if (!style) {
    console.error(colorize(`Error: Unknown style "${styleSlug}"`, "red"));
    console.log(`\nAvailable styles: ${styles.map(s => s.slug).join(", ")}`);
    process.exit(1);
  }

  let output: string | null = null;

  switch (format) {
    case "cursorrules":
    case "claude-rules":
    case "windsurf-rules":
      output = generateIdeConfig(styleSlug, format as IdeConfigFormat);
      break;
    case "tailwind-preset": {
      const tokens = getStyleTokens(styleSlug);
      output = generateTailwindPresetJS(style, tokens);
      break;
    }
    case "shadcn-theme":
      output = generateShadcnThemeCSS(style);
      break;
    case "skill-pack": {
      const tokens = getStyleTokens(styleSlug);
      output = generateSkillPack({ style, tokens });
      break;
    }
  }

  if (!output) {
    console.error(colorize(`Error: Failed to generate ${format} for "${styleSlug}"`, "red"));
    process.exit(1);
  }

  if (outputFile) {
    const filePath = resolve(process.cwd(), outputFile);
    writeFileSync(filePath, output, "utf-8");
    console.log(colorize(`Exported ${format} for ${styleSlug} to ${outputFile}`, "green"));
  } else {
    console.log(output);
  }
}

// ---- Version command ----

function cmdVersion(styleSlug: string): void {
  const style = getStyleBySlug(styleSlug);
  if (!style) {
    console.error(colorize(`Error: Unknown style "${styleSlug}"`, "red"));
    console.log(`\nAvailable styles: ${styles.map(s => s.slug).join(", ")}`);
    process.exit(1);
  }

  const version = getCurrentVersion(styleSlug);
  const hash = computeStyleHash(styleSlug);
  const changelog = getChangelog(styleSlug);

  console.log(colorize(`\nVersion Info: ${styleSlug}\n`, "bold"));
  console.log(`  Version: ${colorize(version, "cyan")}`);
  console.log(`  Content Hash: ${colorize(hash, "dim")}`);

  if (changelog.length > 0) {
    console.log(colorize("\nChangelog:", "cyan"));
    for (const entry of changelog.slice(0, 10)) {
      console.log(`  ${colorize(entry.version, "green")} ${colors.dim}(${entry.date})${colors.reset}`);
      for (const change of entry.changes) {
        console.log(`    - ${change}`);
      }
    }
    if (changelog.length > 10) {
      console.log(`  ${colors.dim}... and ${changelog.length - 10} more entries${colors.reset}`);
    }
  } else {
    console.log(`\n  ${colors.dim}No changelog entries found${colors.reset}`);
  }

  console.log();
}

// ---- Accessibility command ----

function cmdAccessibility(styleSlug: string): void {
  const style = getStyleBySlug(styleSlug);
  if (!style) {
    console.error(colorize(`Error: Unknown style "${styleSlug}"`, "red"));
    console.log(`\nAvailable styles: ${styles.map(s => s.slug).join(", ")}`);
    process.exit(1);
  }

  const score = scoreStyle(styleSlug);
  if (!score) {
    console.error(colorize(`Error: Could not score accessibility for "${styleSlug}"`, "red"));
    process.exit(1);
  }

  const gradeColor = score.grade === "A" ? "green" : score.grade === "B" ? "cyan" : score.grade === "C" ? "yellow" : "red";

  console.log(colorize(`\nAccessibility Report: ${styleSlug}\n`, "bold"));
  console.log(`  Overall Score: ${colorize(String(score.overall), gradeColor)} / 100`);
  console.log(`  Grade: ${colorize(score.grade, gradeColor)}`);

  console.log(colorize("\nContrast:", "cyan"));
  console.log(`  Score: ${score.contrast.score} / 100`);
  console.log(`  Avg Ratio: ${score.contrast.ratio.toFixed(2)}:1`);
  console.log(`  WCAG AA: ${score.contrast.meetsAA ? colorize("PASS", "green") : colorize("FAIL", "red")}`);
  console.log(`  WCAG AAA: ${score.contrast.meetsAAA ? colorize("PASS", "green") : colorize("FAIL", "red")}`);

  if (score.contrast.pairs.length > 0) {
    console.log(colorize("\n  Color Pairs:", "dim"));
    for (const pair of score.contrast.pairs.slice(0, 5)) {
      const status = pair.aa ? colorize("AA", "green") : colorize("FAIL", "red");
      console.log(`    ${pair.context}: ${pair.ratio.toFixed(2)}:1 [${status}]`);
    }
    if (score.contrast.pairs.length > 5) {
      console.log(`    ${colors.dim}... and ${score.contrast.pairs.length - 5} more pairs${colors.reset}`);
    }
  }

  console.log(colorize("\nReadability:", "cyan"));
  console.log(`  Score: ${score.readability.score} / 100`);
  console.log(`  Font Size: ${score.readability.fontSize}`);
  console.log(`  Font Weight: ${score.readability.fontWeight}`);
  console.log(`  Line Height: ${score.readability.lineHeight}`);

  console.log();
}

// ---- Main ----

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "help" || args[0] === "--help" || args[0] === "-h") {
    cmdHelp();
    return;
  }

  const command = args[0];

  switch (command) {
    case "styles":
      cmdStyles();
      break;

    case "rules": {
      const style = args[1];
      if (!style) {
        console.error(colorize("Error: Please specify a style", "red"));
        console.log("Usage: stylekit rules <style>");
        process.exit(1);
      }
      cmdRules(style);
      break;
    }

    case "lint": {
      const styleIndex = args.indexOf("--style");
      const style = styleIndex !== -1 ? args[styleIndex + 1] : null;
      const filesIndex = args.indexOf("--files");
      const filesGlob = filesIndex !== -1 ? args[filesIndex + 1] : null;
      const formatIndex = args.indexOf("--format");
      const format = (formatIndex !== -1 ? args[formatIndex + 1] : "text") as OutputFormat;
      const showFix = args.includes("--fix");

      if (!style) {
        console.error(colorize("Error: Please specify a style with --style", "red"));
        console.log('Usage: stylekit lint --style <style> --files "src/**/*.tsx"');
        process.exit(1);
      }

      // New multi-file mode: --files flag present
      if (filesGlob) {
        cmdLintMulti(style, filesGlob, format, showFix);
        break;
      }

      // Legacy single-file mode: stylekit lint <file> --style <style>
      const file = args[1];
      if (!file || file.startsWith("--")) {
        console.error(colorize("Error: Please specify --files glob or a file path", "red"));
        console.log('Usage: stylekit lint --style <style> --files "src/**/*.tsx"');
        console.log("       stylekit lint <file> --style <style>");
        process.exit(1);
      }

      cmdLint(file, style);
      break;
    }

    case "recommend": {
      const query = args.slice(1).join(" ");
      if (!query) {
        console.error(colorize("Error: Please specify a product type", "red"));
        console.log('Usage: stylekit recommend "SaaS dashboard"');
        process.exit(1);
      }
      cmdRecommend(query);
      break;
    }

    case "search": {
      const query = args.slice(1).join(" ");
      if (!query) {
        console.error(colorize("Error: Please specify a search query", "red"));
        console.log('Usage: stylekit search "dark color palette"');
        process.exit(1);
      }
      cmdSearch(query);
      break;
    }

    case "smart": {
      // Parse options
      const audienceIndex = args.indexOf("--audience");
      const deviceIndex = args.indexOf("--device");
      const moodIndex = args.indexOf("--mood");
      const hasA11y = args.includes("--a11y");
      const hasPerf = args.includes("--perf");

      // Extract query (everything before first -- option)
      const queryParts: string[] = [];
      for (let i = 1; i < args.length; i++) {
        if (args[i].startsWith("--")) break;
        queryParts.push(args[i]);
      }
      const query = queryParts.join(" ");

      if (!query) {
        console.error(colorize("Error: Please specify a product type", "red"));
        console.log('Usage: stylekit smart "SaaS dashboard" --audience enterprise --mood professional');
        process.exit(1);
      }

      const context: RecommendationContext = {};
      if (audienceIndex !== -1 && args[audienceIndex + 1]) {
        context.targetAudience = args[audienceIndex + 1] as "consumer" | "enterprise" | "developer" | "creative";
      }
      if (deviceIndex !== -1 && args[deviceIndex + 1]) {
        context.primaryDevice = args[deviceIndex + 1] as "desktop" | "mobile" | "tablet" | "all";
      }
      if (moodIndex !== -1 && args[moodIndex + 1]) {
        context.brandMood = args[moodIndex + 1] as "playful" | "professional" | "luxury" | "minimal" | "bold";
      }
      if (hasA11y) context.accessibilityPriority = true;
      if (hasPerf) context.performancePriority = true;

      cmdSmart(query, context);
      break;
    }

    case "compare": {
      const style1 = args[1];
      const style2 = args[2];
      const query = args.slice(3).join(" ");

      if (!style1 || !style2) {
        console.error(colorize("Error: Please specify two styles to compare", "red"));
        console.log('Usage: stylekit compare neo-brutalist glassmorphism "creative portfolio"');
        process.exit(1);
      }

      if (!query) {
        console.error(colorize("Error: Please specify a product type", "red"));
        console.log('Usage: stylekit compare neo-brutalist glassmorphism "creative portfolio"');
        process.exit(1);
      }

      cmdCompare(style1, style2, query);
      break;
    }

    case "export": {
      const styleSlug = args[1];
      const formatIndex = args.indexOf("--format");
      const format = formatIndex !== -1 ? args[formatIndex + 1] : null;
      const outputIndex = args.indexOf("--output");
      const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : undefined;

      if (!styleSlug || styleSlug.startsWith("--")) {
        console.error(colorize("Error: Please specify a style", "red"));
        console.log('Usage: stylekit export <style> --format <format> [--output <file>]');
        process.exit(1);
      }

      if (!format || !EXPORT_FORMATS.includes(format as ExportFormat)) {
        console.error(colorize(`Error: Please specify a valid format with --format`, "red"));
        console.log(`Available formats: ${EXPORT_FORMATS.join(", ")}`);
        process.exit(1);
      }

      cmdExport(styleSlug, format as ExportFormat, outputFile);
      break;
    }

    case "version": {
      const styleSlug = args[1];
      if (!styleSlug) {
        console.error(colorize("Error: Please specify a style", "red"));
        console.log("Usage: stylekit version <style>");
        process.exit(1);
      }
      cmdVersion(styleSlug);
      break;
    }

    case "accessibility":
    case "a11y": {
      const styleSlug = args[1];
      if (!styleSlug) {
        console.error(colorize("Error: Please specify a style", "red"));
        console.log("Usage: stylekit accessibility <style>");
        process.exit(1);
      }
      cmdAccessibility(styleSlug);
      break;
    }

    default:
      console.error(colorize(`Unknown command: ${command}`, "red"));
      cmdHelp();
      process.exit(1);
  }
}

main();
