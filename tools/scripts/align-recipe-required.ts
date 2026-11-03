#!/usr/bin/env tsx

import fs from "node:fs";
import path from "node:path";
import { getStyleRecipes, getStylesWithRecipes } from "../../lib/recipes";
import { renderRecipe } from "../../lib/recipes/renderer";
import { getStyleLintRules } from "../../lib/styles/lint-rules";
import { getStyleTokens } from "../../lib/styles/tokens-registry";
import {
  alignRequiredClasses,
  enumerateRecipeClassSurfaces,
  enumerateRecipeExplicitStateClassSurfaces,
  type RequiredComponent,
} from "../lib/align-recipe-required";
import {
  commitPlannedSourceEdits,
  rewriteCuratedRequiredArrays,
  rewriteTokenRequiredArrays,
  type PlannedSourceEdit,
  type RequiredArrayValues,
} from "../lib/rewrite-required-arrays";

const components: RequiredComponent[] = ["button", "card", "input"];
const root = process.cwd();
const tokensDirectory = path.join(root, "lib", "styles");
const curatedFile = path.join(tokensDirectory, "lint-rules.ts");

interface PairReport {
  slug: string;
  component: RequiredComponent;
  tokenRequired: string[];
  curatedRequired: string[];
  old: string[];
  proposed: string[];
  needsReview: boolean;
  reviewReason?: string;
  universalClasses: string[];
  decisions: ReturnType<typeof alignRequiredClasses>["decisions"];
}

interface AlignmentReport {
  mode: "dry-run" | "write";
  generatedAt: string;
  recipeStyles: number;
  pairs: PairReport[];
  summary: {
    pairs: number;
    changedPairs: number;
    kept: number;
    replaced: number;
    dropped: number;
    needsReview: number;
    blockedWrites: number;
    optionalDrops: number;
    stateOnlyDrops: number;
    absentDrops: number;
    invalidDrops: number;
    changedFiles: string[];
  };
}

function main(): void {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const reportIndex = args.indexOf("--report");
  const reportPath = reportIndex >= 0 ? args[reportIndex + 1] : undefined;
  if (reportIndex >= 0 && (!reportPath || reportPath.startsWith("--"))) {
    throw new Error("--report requires a file path");
  }
  const consumed = new Set<number>(reportIndex >= 0 ? [reportIndex, reportIndex + 1] : []);
  const unknown = args.filter((arg, index) => arg !== "--write" && !consumed.has(index));
  if (unknown.length) throw new Error(`unknown arguments: ${unknown.join(" ")}`);
  if (!fs.existsSync(path.join(root, "package.json")) || !fs.existsSync(tokensDirectory)) {
    throw new Error("run this command from the StyleKit repository root");
  }

  const pairs: PairReport[] = [];
  const proposedBySlug = new Map<string, RequiredArrayValues>();
  for (const slug of getStylesWithRecipes()) {
    const styleRecipes = getStyleRecipes(slug);
    const styleTokens = getStyleTokens(slug);
    if (!styleRecipes) throw new Error(`${slug}: recipe registry entry is missing`);
    if (!styleTokens) throw new Error(`${slug}: token registry entry is missing`);
    const curated = getStyleLintRules(slug);
    const aligned: RequiredArrayValues = { button: [], card: [], input: [] };

    for (const component of components) {
      const tokenRequired = styleTokens.required[component] ?? [];
      const curatedRequired = curated?.required[component] ?? [];
      const old = [...tokenRequired, ...curatedRequired];
      const recipe = styleRecipes.recipes[component];
      if (!recipe) {
        pairs.push({
          slug, component, tokenRequired, curatedRequired, old,
          proposed: tokenRequired,
          needsReview: true,
          reviewReason: "style has required rules but no registered recipe for this component",
          universalClasses: [],
          decisions: [],
        });
        aligned[component] = tokenRequired;
        continue;
      }
      const surfaces = enumerateRecipeClassSurfaces(recipe, renderRecipe);
      const explicitStateSurfaces = enumerateRecipeExplicitStateClassSurfaces(recipe, renderRecipe);
      const result = alignRequiredClasses(old, surfaces, explicitStateSurfaces);
      aligned[component] = result.needsReview ? tokenRequired : result.required;
      pairs.push({
        slug, component, tokenRequired, curatedRequired, old,
        proposed: result.required,
        needsReview: result.needsReview,
        ...(result.reviewReason ? { reviewReason: result.reviewReason } : {}),
        universalClasses: result.universalClasses,
        decisions: result.decisions,
      });
    }
    proposedBySlug.set(slug, aligned);
  }

  const tokenSourcePlans = new Map<string, { original: string; next: string }>();
  for (const [slug, values] of proposedBySlug) {
    const file = path.join(tokensDirectory, `${slug}-tokens.ts`);
    if (!fs.existsSync(file)) throw new Error(`${slug}: token source not found at ${file}`);
    const existing = tokenSourcePlans.get(file)?.next ?? fs.readFileSync(file, "utf8");
    const original = tokenSourcePlans.get(file)?.original ?? fs.readFileSync(file, "utf8");
    const next = rewriteTokenRequiredArrays(existing, values, file);
    tokenSourcePlans.set(file, { original, next });
  }

  const curatedSourceOriginal = fs.readFileSync(curatedFile, "utf8");
  let curatedSourceNext = curatedSourceOriginal;
  for (const [slug, values] of proposedBySlug) {
    const rule = getStyleLintRules(slug);
    if (!rule) continue;
    curatedSourceNext = rewriteCuratedRequiredArrays(curatedSourceNext, slug, values, curatedFile);
  }

  const plannedFiles = new Map<string, { original: string; next: string }>(tokenSourcePlans);
  if (curatedSourceNext !== curatedSourceOriginal) {
    plannedFiles.set(curatedFile, { original: curatedSourceOriginal, next: curatedSourceNext });
  }
  const changedFiles = [...plannedFiles.entries()].filter(([, plan]) => plan.original !== plan.next).map(([file]) => path.relative(root, file));
  const blockedWrites = pairs.filter((pair) => pair.needsReview).length;
  const summary = pairs.reduce((result, pair) => {
    const same = (entries: string[]) => entries.length === pair.proposed.length && entries.every((entry, index) => entry === pair.proposed[index]);
    if (!same(pair.tokenRequired) || (pair.curatedRequired.length > 0 && !same(pair.curatedRequired))) result.changedPairs += 1;
    if (pair.needsReview) result.needsReview += 1;
    for (const decision of pair.decisions) {
      result[decision.action === "keep" ? "kept" : decision.action === "replace" ? "replaced" : "dropped"] += 1;
      if (decision.action === "drop" && decision.reason.startsWith("optional across")) result.optionalDrops += 1;
      if (decision.action === "drop" && decision.reason.startsWith("only emitted")) result.stateOnlyDrops += 1;
      if (decision.action === "drop" && decision.reason.startsWith("not emitted")) result.absentDrops += 1;
      if (decision.action === "drop" && decision.reason.startsWith("invalid or incomplete")) result.invalidDrops += 1;
    }
    return result;
  }, { pairs: pairs.length, changedPairs: 0, kept: 0, replaced: 0, dropped: 0, needsReview: 0, blockedWrites, optionalDrops: 0, stateOnlyDrops: 0, absentDrops: 0, invalidDrops: 0, changedFiles });

  const report: AlignmentReport = {
    mode: write ? "write" : "dry-run",
    generatedAt: new Date().toISOString(),
    recipeStyles: proposedBySlug.size,
    pairs,
    summary,
  };

  if (write && blockedWrites > 0) {
    saveReport(reportPath, report);
    printSummary(report);
    throw new Error(`refusing to write: ${blockedWrites} component contracts need manual review first`);
  }
  if (write) {
    const sourceEdits: PlannedSourceEdit[] = [...plannedFiles.entries()].map(([file, plan]) => ({ file, ...plan }));
    commitPlannedSourceEdits(sourceEdits, {
      readFile: (file) => fs.readFileSync(file, "utf8"),
      writeFile: (file, contents) => fs.writeFileSync(file, contents, "utf8"),
    });
  }

  saveReport(reportPath, report);
  printSummary(report);
}

function saveReport(reportPath: string | undefined, report: AlignmentReport): void {
  if (!reportPath) return;
  const output = path.resolve(root, reportPath);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`full report: ${path.relative(root, output)}`);
}

function printSummary(report: AlignmentReport): void {
  const summary = report.summary;
  console.log(`recipe-required alignment (${report.mode})`);
  console.log(`  styles: ${report.recipeStyles}; component pairs: ${summary.pairs}`);
  console.log(`  changed pairs: ${summary.changedPairs}; kept: ${summary.kept}; replaced: ${summary.replaced}; dropped: ${summary.dropped}`);
  console.log(`  drops: ${summary.optionalDrops} optional by variant/parameter, ${summary.stateOnlyDrops} only in explicit states, ${summary.absentDrops} not emitted by recipes`);
  console.log(`  invalid/incomplete source utilities: ${summary.invalidDrops}`);
  console.log(`  needs review: ${summary.needsReview}; writes blocked: ${summary.blockedWrites}; changed files: ${summary.changedFiles.length}`);
  if (report.mode === "dry-run") console.log("  no source files were changed; rerun with --write after reviewing the report");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
