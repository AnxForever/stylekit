// Quality Audit Script
// Run: npx --no-install tsx scripts/quality-audit.ts

import { generateQualityReport, type QualityReport } from "../lib/quality/scorer";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

function printReport(report: QualityReport): void {
  const divider = "=".repeat(80);

  console.log(divider);
  console.log("  STYLEKIT QUALITY AUDIT REPORT");
  console.log(`  Generated: ${report.generated}`);
  console.log(divider);
  console.log();

  // Summary stats
  console.log("-- Summary --");
  console.log(`  Total styles:   ${report.totalStyles}`);
  console.log(`  Average score:  ${report.averageScore}/100`);
  console.log();

  // Grade distribution
  console.log("-- Grade Distribution --");
  for (const [grade, count] of Object.entries(report.gradeDistribution)) {
    const bar = "#".repeat(count);
    console.log(`  ${grade}: ${String(count).padStart(3)} ${bar}`);
  }
  console.log();

  // Top 5
  console.log("-- Top 5 Styles --");
  for (const s of report.topStyles) {
    console.log(
      `  [${s.grade}] ${String(s.overall).padStart(5)}/100  ${s.slug}`,
    );
  }
  console.log();

  // Bottom 5
  console.log("-- Bottom 5 Styles --");
  for (const s of report.bottomStyles) {
    console.log(
      `  [${s.grade}] ${String(s.overall).padStart(5)}/100  ${s.slug}  (missing: ${s.missing.length} items)`,
    );
  }
  console.log();

  // Full table
  console.log("-- Full Results --");
  console.log(
    "  " +
      "Style".padEnd(28) +
      "Score".padStart(6) +
      "  Grade" +
      "  Recipe".padStart(8) +
      "  Token".padStart(7) +
      "  Def".padStart(6) +
      "  Color".padStart(7) +
      "  Missing",
  );
  console.log("  " + "-".repeat(100));

  for (const s of report.scores) {
    const missingStr =
      s.missing.length > 0
        ? s.missing.slice(0, 3).join(", ") +
          (s.missing.length > 3 ? ` (+${s.missing.length - 3})` : "")
        : "-";
    console.log(
      "  " +
        s.slug.padEnd(28) +
        String(s.overall).padStart(6) +
        "  " +
        s.grade.padStart(5) +
        String(s.recipeScore).padStart(8) +
        String(s.tokenScore).padStart(7) +
        String(s.definitionScore).padStart(6) +
        String(s.colorScore).padStart(7) +
        "  " +
        missingStr,
    );
  }
  console.log();
  console.log(divider);
}

function writeGapReport(report: QualityReport, outputDir: string): void {
  const belowB = report.scores.filter(
    (s) => s.grade !== "A" && s.grade !== "B",
  );

  const lines: string[] = [
    "# Quality Gap Report",
    "",
    `Generated: ${report.generated}`,
    "",
    `## Summary`,
    "",
    `- Total styles: ${report.totalStyles}`,
    `- Average score: ${report.averageScore}/100`,
    `- Styles below B grade: ${belowB.length}`,
    "",
    "## Grade Distribution",
    "",
    ...Object.entries(report.gradeDistribution).map(
      ([grade, count]) => `- ${grade}: ${count}`,
    ),
    "",
    "## Styles Below B Grade",
    "",
  ];

  if (belowB.length === 0) {
    lines.push("All styles meet B grade or above.");
  } else {
    for (const s of belowB) {
      lines.push(`### ${s.slug} (${s.grade}, ${s.overall}/100)`);
      lines.push("");
      lines.push("Missing items:");
      for (const m of s.missing) {
        lines.push(`- ${m}`);
      }
      lines.push("");
      lines.push("Score breakdown:");
      lines.push(`- Recipe: ${s.recipeScore}/40`);
      lines.push(`- Token: ${s.tokenScore}/25`);
      lines.push(`- Definition: ${s.definitionScore}/25`);
      lines.push(`- Color: ${s.colorScore}/10`);
      lines.push("");
    }
  }

  lines.push("## Recommended Priority Actions");
  lines.push("");
  lines.push(
    "1. Add missing recipe components (button, card, input, nav, hero, footer) for styles with low recipe scores",
  );
  lines.push(
    "2. Ensure all styles have comprehensive doList, dontList, and aiRules",
  );
  lines.push("3. Add examplePrompts (at least 2) for styles missing them");
  lines.push(
    "4. Review token coverage in globalCss for typography, spacing, shadows, and borders",
  );

  writeFileSync(join(outputDir, "quality-gaps.md"), lines.join("\n"), "utf-8");
}

// ── Main ─────────────────────────────────────────────────────────────

const report = generateQualityReport();

// Print console report
printReport(report);

// Write JSON report
const scriptDir = new URL(".", import.meta.url).pathname;
const outputDir = join(scriptDir, "output");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(
  join(outputDir, "quality-report.json"),
  JSON.stringify(report, null, 2),
  "utf-8",
);
console.log(`JSON report written to: ${join(outputDir, "quality-report.json")}`);

// Write gap report
writeGapReport(report, outputDir);
console.log(`Gap report written to: ${join(outputDir, "quality-gaps.md")}`);
