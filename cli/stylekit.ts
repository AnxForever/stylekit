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

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Import from lib (relative paths for tsx execution)
import { lintCode, getFixSuggestions } from "../lib/linter";
import { getStyleLintRules, getStylesWithLintRules } from "../lib/styles/lint-rules";
import { styles } from "../lib/styles";
import { searchKnowledge, getDesignRecommendation, getSmartRecommendation, compareStyles } from "../lib/knowledge";
import type { RecommendationContext } from "../lib/knowledge";

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
  ${colorize("lint", "green")} <file> --style <style>   Check if code follows style guidelines
  ${colorize("recommend", "green")} <query>             Get design recommendations for a product type
  ${colorize("smart", "green")} <query> [options]       Smart recommendation with scoring and context
  ${colorize("compare", "green")} <s1> <s2> <query>     Compare two styles for a product type
  ${colorize("styles", "green")}                        List all available design styles
  ${colorize("rules", "green")} <style>                 Show lint rules for a specific style
  ${colorize("search", "green")} <query>                Search the knowledge base
  ${colorize("help", "green")}                          Show this help message

${colorize("Smart Command Options:", "cyan")}
  --audience <type>    Target: consumer, enterprise, developer, creative
  --device <type>      Device: desktop, mobile, tablet, all
  --mood <type>        Brand mood: playful, professional, luxury, minimal, bold
  --a11y               Prioritize accessibility
  --perf               Prioritize performance

${colorize("Examples:", "cyan")}
  stylekit lint ./src/Button.tsx --style neo-brutalist
  stylekit recommend "SaaS dashboard"
  stylekit smart "e-commerce store" --audience consumer --mood playful
  stylekit compare neo-brutalist glassmorphism "creative portfolio"
  stylekit rules glassmorphism
  stylekit search "dark color palette"

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
      const file = args[1];
      const styleIndex = args.indexOf("--style");
      const style = styleIndex !== -1 ? args[styleIndex + 1] : null;

      if (!file) {
        console.error(colorize("Error: Please specify a file to lint", "red"));
        console.log("Usage: stylekit lint <file> --style <style>");
        process.exit(1);
      }

      if (!style) {
        console.error(colorize("Error: Please specify a style with --style", "red"));
        console.log("Usage: stylekit lint <file> --style <style>");
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

    default:
      console.error(colorize(`Unknown command: ${command}`, "red"));
      cmdHelp();
      process.exit(1);
  }
}

main();
