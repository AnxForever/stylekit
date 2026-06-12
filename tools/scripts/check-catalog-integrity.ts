#!/usr/bin/env tsx

import { existsSync } from "node:fs";
import path from "node:path";
import { getStylesWithRecipes, getStyleRecipes } from "../../lib/recipes";
import { styles, stylesMeta } from "../../lib/styles";
import { hasStyleTokens } from "../../lib/styles/tokens-registry";

const PROJECT_ROOT = process.cwd();
const REQUIRED_COMPONENTS = ["button", "card", "input"] as const;

interface Issue {
  slug?: string;
  message: string;
}

function uniqueDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }
    seen.add(value);
  }

  return [...duplicates].sort();
}

function compareSets(left: string[], right: string[]) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);

  return {
    onlyLeft: left.filter((value) => !rightSet.has(value)).sort(),
    onlyRight: right.filter((value) => !leftSet.has(value)).sort(),
  };
}

function relativePublicPath(publicUrl: string): string | null {
  if (!publicUrl.startsWith("/")) {
    return null;
  }
  return path.join(PROJECT_ROOT, "public", publicUrl);
}

function validateCatalog(): Issue[] {
  const issues: Issue[] = [];
  const styleSlugs = styles.map((style) => style.slug);
  const metaSlugs = stylesMeta.map((style) => style.slug);
  const recipeSlugs = getStylesWithRecipes();

  for (const slug of uniqueDuplicates(styleSlugs)) {
    issues.push({ slug, message: "Duplicate style slug in styles registry." });
  }

  for (const slug of uniqueDuplicates(metaSlugs)) {
    issues.push({ slug, message: "Duplicate style slug in styles metadata." });
  }

  for (const slug of uniqueDuplicates(recipeSlugs)) {
    issues.push({ slug, message: "Duplicate style slug in recipe registry." });
  }

  const stylesVsMeta = compareSets(styleSlugs, metaSlugs);
  for (const slug of stylesVsMeta.onlyLeft) {
    issues.push({ slug, message: "Missing lightweight metadata entry." });
  }
  for (const slug of stylesVsMeta.onlyRight) {
    issues.push({ slug, message: "Metadata entry has no full style definition." });
  }

  const stylesVsRecipes = compareSets(styleSlugs, recipeSlugs);
  for (const slug of stylesVsRecipes.onlyLeft) {
    issues.push({ slug, message: "Missing recipe registry entry." });
  }
  for (const slug of stylesVsRecipes.onlyRight) {
    issues.push({ slug, message: "Recipe registry entry has no full style definition." });
  }

  for (const style of styles) {
    if (!style.name || !style.nameEn) {
      issues.push({ slug: style.slug, message: "Missing display name." });
    }
    if (!style.description) {
      issues.push({ slug: style.slug, message: "Missing description." });
    }
    if (!Array.isArray(style.keywords) || style.keywords.length === 0) {
      issues.push({ slug: style.slug, message: "Missing keywords." });
    }
    if (!style.colors?.primary || !style.colors?.secondary || !Array.isArray(style.colors.accent)) {
      issues.push({ slug: style.slug, message: "Missing color tokens." });
    }

    const coverPath = relativePublicPath(style.cover);
    if (!coverPath) {
      issues.push({ slug: style.slug, message: `Cover path must be a public URL: ${style.cover}` });
    } else if (!existsSync(coverPath)) {
      issues.push({ slug: style.slug, message: `Cover asset does not exist: ${style.cover}` });
    }

    for (const componentName of REQUIRED_COMPONENTS) {
      const component = style.components?.[componentName];
      if (!component?.code?.trim()) {
        issues.push({ slug: style.slug, message: `Missing ${componentName} component code.` });
      }
    }

    const styleRecipes = getStyleRecipes(style.slug);
    if (styleRecipes && styleRecipes.styleSlug !== style.slug) {
      issues.push({
        slug: style.slug,
        message: `Recipe styleSlug mismatch: ${styleRecipes.styleSlug}`,
      });
    }

    if (styleRecipes) {
      for (const componentName of REQUIRED_COMPONENTS) {
        if (!styleRecipes.recipes[componentName]) {
          issues.push({ slug: style.slug, message: `Missing ${componentName} recipe.` });
        }
      }
    }

    if (!hasStyleTokens(style.slug)) {
      issues.push({ slug: style.slug, message: "Missing style token definition." });
    }
  }

  return issues;
}

function main(): void {
  const issues = validateCatalog();

  if (issues.length === 0) {
    console.log(
      `[check:catalog] PASS - ${styles.length} styles have metadata, recipes, tokens, components, and cover assets.`
    );
    return;
  }

  console.error(`[check:catalog] FAIL - ${issues.length} catalog issue(s) found:`);
  for (const issue of issues) {
    const prefix = issue.slug ? `- ${issue.slug}:` : "-";
    console.error(`${prefix} ${issue.message}`);
  }
  process.exitCode = 1;
}

main();
