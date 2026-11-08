/**
 * Backfill helper for the DESIGN.md pivot.
 *
 * Extracts what a machine can read from `lib/styles/*` and writes a draft the
 * author finishes by hand. It deliberately leaves two fields as TODO:
 *
 *   - color role: "when to reach for this color" is a judgement about intent
 *   - component construction: the parameter sentence that describes how a
 *     component is built, not the classes it happens to use
 *
 * Everything else (values, rules, component names, CSS variables) is copied
 * verbatim so the draft cannot drift from the source.
 *
 * Usage:
 *   node node_modules/tsx/dist/cli.mjs tools/scripts/backfill-design-spec.ts --slug editorial
 *   node node_modules/tsx/dist/cli.mjs tools/scripts/backfill-design-spec.ts --all
 *   node node_modules/tsx/dist/cli.mjs tools/scripts/backfill-design-spec.ts --all --force
 */

import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { styles, getStyleBySlug } from "../../lib/styles/registry";
import { hasDesignSpec } from "../../lib/design-spec/registry";
import type { DesignStyle } from "../../lib/styles/types";

const DRAFT_DIR = join(process.cwd(), "lib", "design-spec", "drafts");

interface DraftColor {
  source: string;
  value: string;
  suggestedToken: string;
  suggestedGroup: "brand" | "neutral" | "surface" | "accent";
  role: string;
}

interface DraftComponent {
  key: string;
  name: string;
  description: string;
  codeLines: number;
  construction: string;
}

interface DraftSpec {
  slug: string;
  name: string;
  nameEn: string;
  hasSpec: boolean;
  source: string;
  colors: DraftColor[];
  cssVariables: Array<{ name: string; value: string }>;
  fontsHint: string[];
  dos: { zh: string[]; en: string[] };
  donts: { zh: string[]; en: string[] };
  components: DraftComponent[];
  nextSteps: string[];
}

function parseArgs(argv: string[]): { slug: string | null; all: boolean; force: boolean } {
  const args = { slug: null as string | null, all: false, force: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--slug") args.slug = argv[i + 1] ?? null;
    else if (argv[i] === "--all") args.all = true;
    else if (argv[i] === "--force") args.force = true;
  }
  return args;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pull `--name: value;` pairs out of a style's globalCss. */
function extractCssVariables(globalCss: string): Array<{ name: string; value: string }> {
  const variables: Array<{ name: string; value: string }> = [];
  const pattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(globalCss)) !== null) {
    variables.push({ name: match[1], value: match[2].trim() });
  }
  return variables;
}

/** Font stacks declared inside globalCss, which is where most styles set them. */
function extractFontStacks(globalCss: string): string[] {
  const stacks: string[] = [];
  const pattern = /font-family\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(globalCss)) !== null) {
    const value = match[1].trim();
    if (!stacks.includes(value)) stacks.push(value);
  }
  return stacks;
}

function buildDraft(style: DesignStyle): DraftSpec {
  const colors: DraftColor[] = [
    {
      source: "colors.primary",
      value: style.colors.primary,
      suggestedToken: "--color-primary",
      suggestedGroup: "brand",
      role: "TODO: when should someone reach for this color?",
    },
    {
      source: "colors.secondary",
      value: style.colors.secondary,
      suggestedToken: "--color-secondary",
      suggestedGroup: "surface",
      role: "TODO: when should someone reach for this color?",
    },
    ...style.colors.accent.map((value, index) => ({
      source: `colors.accent[${index}]`,
      value,
      suggestedToken: `--color-accent-${index + 1}`,
      suggestedGroup: "accent" as const,
      role: "TODO: when should someone reach for this color?",
    })),
  ];

  const components: DraftComponent[] = Object.entries(style.components)
    .filter((entry): entry is [string, NonNullable<typeof entry[1]>] => Boolean(entry[1]))
    .map(([key, template]) => ({
      key,
      name: template.name,
      description: template.description,
      codeLines: template.code.split("\n").length,
      construction: "TODO: rewrite as a parameter sentence, not a class list",
    }));

  return {
    slug: style.slug,
    name: style.name,
    nameEn: style.nameEn,
    hasSpec: hasDesignSpec(style.slug),
    source: `lib/styles/${style.slug}.ts`,
    colors,
    cssVariables: extractCssVariables(style.globalCss),
    fontsHint: extractFontStacks(style.globalCss),
    dos: {
      zh: [...style.doList],
      en: style.doListEn ? [...style.doListEn] : [],
    },
    donts: {
      zh: [...style.dontList],
      en: style.dontListEn ? [...style.dontListEn] : [],
    },
    components,
    nextSteps: [
      "Write a northStar sentence (one line, names the visual thesis).",
      "Replace every TODO role with a sentence about intent.",
      "Rewrite each component as construction parameters: size, weight, border, fill, padding.",
      "Decide theme (light / dark / mixed) and set completeness to partial.",
      "Where doListEn or dontListEn is empty, translate before publishing zh + en.",
    ],
  };
}

function writeDraft(draft: DraftSpec): string {
  mkdirSync(DRAFT_DIR, { recursive: true });
  const path = join(DRAFT_DIR, `${slugify(draft.slug)}.json`);
  writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
  return path;
}

const args = parseArgs(process.argv.slice(2));

if (!args.slug && !args.all) {
  console.error("Pass --slug <style> or --all");
  process.exit(1);
}

const targets = args.all
  ? styles
  : [getStyleBySlug(args.slug as string)].filter((style): style is DesignStyle => Boolean(style));

if (targets.length === 0) {
  console.error(`No style named "${args.slug}"`);
  process.exit(1);
}

let written = 0;
let skipped = 0;

for (const style of targets) {
  if (hasDesignSpec(style.slug) && !args.force) {
    skipped += 1;
    // A draft left over from before this style was backfilled would only
    // confuse the next reader; the spec is now the source of truth.
    const stale = join(DRAFT_DIR, `${slugify(style.slug)}.json`);
    if (existsSync(stale)) rmSync(stale);
    continue;
  }
  const path = writeDraft(buildDraft(style));
  written += 1;
  if (!args.all) {
    console.log(`wrote ${path}`);
    console.log(`components: ${Object.keys(style.components).length}`);
    console.log(`css variables found: ${extractCssVariables(style.globalCss).length}`);
  }
}

console.log(`\ndrafts written: ${written}, skipped (already have a spec): ${skipped}`);
console.log(`output: ${DRAFT_DIR}`);
