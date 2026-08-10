#!/usr/bin/env tsx

import { existsSync } from "node:fs";
import { cp, mkdtemp, mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getStylesWithRecipes, getStyleRecipes } from "../../lib/recipes";
import { styles, stylesMeta } from "../../lib/styles";
import { hasStyleTokens } from "../../lib/styles/tokens-registry";
import { getStyleQuality } from "../../lib/styles/quality";
import { publishStyle } from "../../lib/style-publication";
import { STYLE_PUBLICATION_REGISTRIES } from "../../lib/style-publication/plan";
import type { StyleScaffoldInput } from "../../lib/scaffold/style-scaffold";

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

    const quality = getStyleQuality(style);
    if (!quality.tier || !Array.isArray(quality.flags)) {
      issues.push({ slug: style.slug, message: "Missing style quality metadata." });
    }
  }

  return issues;
}

const PUBLICATION_PROBE: StyleScaffoldInput = {
  name: "Catalog Publication Probe",
  nameEn: "Catalog Publication Probe",
  slug: "catalog-publication-probe",
  description: "Internal dry-run input for catalog publication checks.",
  category: "modern",
  styleType: "visual",
  tags: ["responsive"],
  primaryColor: "#111111",
  secondaryColor: "#ffffff",
  accentColors: ["#ff006e"],
  keywords: ["catalog", "publication"],
  philosophy: "Keep catalog projections coherent.",
  doList: ["Plan before writing."],
  dontList: ["Do not mutate the repository during checks."],
  buttonCode: "<button>Probe</button>",
  cardCode: "<div>Probe</div>",
  inputCode: "<input />",
  previewModule: `import type { StylePreviewComponents } from "../types";

const preview = {
  coverPreview: () => <div data-catalog-publication-probe="true" />,
} satisfies StylePreviewComponents;

export default preview;
`,
};

async function validatePublicationInterface(): Promise<Issue[]> {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "stylekit-catalog-publication-"));
  try {
    await Promise.all(
      Object.values(STYLE_PUBLICATION_REGISTRIES).map(async (relativePath) => {
        const destination = path.join(rootDir, relativePath);
        await mkdir(path.dirname(destination), { recursive: true });
        await cp(path.join(PROJECT_ROOT, relativePath), destination);
      }),
    );
    const result = await publishStyle(PUBLICATION_PROBE, rootDir);

    if (!result.success) {
      return [{ message: `Publication interface dry run failed: ${result.errors.join("; ")}` }];
    }
    if (result.filesWritten.length !== 7 || result.registriesPatched.length !== 6) {
      return [
        {
          message: `Publication interface wrote ${result.filesWritten.length} generated files and ${result.registriesPatched.length} registry projections; expected 7 and 6.`,
        },
      ];
    }
    return [];
  } catch (error: unknown) {
    return [
      {
        message: `Publication interface dry run failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
    ];
  } finally {
    await rm(rootDir, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const issues = [...validateCatalog(), ...(await validatePublicationInterface())];

  if (issues.length === 0) {
    const curatedReadiness = styles.filter(
      (style) => getStyleQuality(style).tier === "curated",
    ).length;
    console.log(
      `[check:catalog] PASS - ${styles.length} styles have metadata, recipes, tokens, components, cover assets, and quality metadata (${curatedReadiness} curated readiness profiles).`
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

void main();
