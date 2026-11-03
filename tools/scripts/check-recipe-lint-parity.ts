#!/usr/bin/env tsx

/**
 * Recipe / lint parity checker.
 *
 * Official recipes are the styles' canonical code: they are what the recipe
 * renderer hands to users as a starting point, and the style linter is what
 * those same users are told to verify their output with. When a recipe renders
 * classes that its own style's lint rules forbid, following the official
 * example produces official violations - which destroys trust in both tools
 * faster than any single miss.
 *
 * This closes the loop: render every registered recipe across its full surface
 * (all variants x all parameter combinations x all interaction states) and lint
 * each render with the style's own rules. Any forbidden-class hit fails the
 * check.
 *
 * Required contracts describe recipe invariants, including self-gated
 * interaction classes. Enforce them for every button/card/input variant and
 * parameter combination, and keep the canonical-render metric for comparison.
 * AI tokens and curated lint requirements must agree; neither may be empty.
 */

import { getStylesWithRecipes, getStyleRecipes, renderRecipe } from "../../lib/recipes";
import type { ComponentRecipe, RecipeParameter, RecipeStates } from "../../lib/recipes/types";
import { canonicalRequiredClass, lintStyleCode } from "../../lib/styles/style-linter";
import { getStyleTokens } from "../../lib/styles/tokens-registry";
import { getStyleLintRules } from "../../lib/styles/lint-rules";

type RenderState = NonNullable<Parameters<typeof renderRecipe>[1]>["state"];

interface ParityViolation {
  slug: string;
  recipe: string;
  variant: string;
  state: string;
  className: string;
  reason: string;
}

const components = ["button", "card", "input"] as const;
const requiredViolations = new Set<string>();

function normalizedEntries(entries: string[] | undefined): string[] {
  return [...new Set((entries ?? []).flatMap((entry) => entry.split(/\s+/).filter(Boolean)).map(canonicalRequiredClass))].sort();
}

function checkRequiredSources(slug: string): void {
  const tokens = getStyleTokens(slug);
  const curated = getStyleLintRules(slug);
  for (const component of components) {
    const tokenClasses = normalizedEntries(tokens?.required[component]);
    if (!tokenClasses.length) requiredViolations.add(`${slug}/${component}: empty token contract`);
    if (curated?.required[component] && JSON.stringify(tokenClasses) !== JSON.stringify(normalizedEntries(curated.required[component]))) {
      requiredViolations.add(`${slug}/${component}: AI tokens and curated required contracts disagree`);
    }
  }
}

function paramCombos(parameters: RecipeParameter[]): Array<Record<string, string | boolean | number>> {
  let combos: Array<Record<string, string | boolean | number>> = [{}];
  for (const parameter of parameters) {
    let values: Array<string | boolean | number>;
    if (parameter.type === "boolean") {
      values = [false, true];
    } else if (parameter.type === "select" && parameter.options?.length) {
      values = parameter.options.map((option) => option.value);
    } else {
      values = [parameter.default];
    }
    combos = combos.flatMap((combo) =>
      values.map((value) => ({ ...combo, [parameter.id]: value })),
    );
  }
  return combos;
}

function stateNames(states: RecipeStates | undefined): string[] {
  const names = Object.keys(states ?? {}).filter((key) => (states as Record<string, unknown>)[key]?.length);
  return ["default", ...names];
}

function lintRecipeRender(
  slug: string,
  recipe: ComponentRecipe,
  variantId: string,
  state: string,
  params: Record<string, string | boolean | number>,
): ParityViolation[] {
  const slots: Record<string, string> = {};
  for (const slot of recipe.slots ?? []) slots[slot.id] = slot.default ?? "";

  let rendered;
  try {
    rendered = renderRecipe(recipe, {
      variant: variantId,
      params,
      slots,
      state: state === "default" ? undefined : (state as RenderState),
    });
  } catch (error) {
    console.error(`render failed: ${slug}/${recipe.id}/${variantId} (${state}): ${String(error)}`);
    process.exitCode = 1;
    return [];
  }

  const component = components.find((component) => component === recipe.id);
  const report = lintStyleCode(slug, rendered.code, {
    checkRequired: component ? [component] : [],
    strict: true,
  });
  for (const entry of report.missingRequired) {
    requiredViolations.add(`${slug}/${recipe.id}/${variantId} [${state}]: ${entry.missing.join(", ")}`);
  }
  if (report.status === "inconclusive") {
    requiredViolations.add(`${slug}/${recipe.id}/${variantId} [${state}]: inconclusive static lint`);
  }
  return report.violations.map((violation) => ({
    slug,
    recipe: recipe.id,
    variant: variantId,
    state,
    className: violation.className,
    reason: violation.reason,
  }));
}

/**
 * Preserve the canonical metric (first variant, default parameters) alongside
 * the stronger full-surface gate. Renderer defaults include interaction CSS.
 */
function reportCanonicalRequiredGaps(): void {
  const lines: string[] = [];
  let pairs = 0;
  let clean = 0;

  for (const slug of getStylesWithRecipes()) {
    const styleRecipes = getStyleRecipes(slug);
    if (!styleRecipes) continue;
    for (const component of ["button", "card", "input"] as const) {
      const recipe = styleRecipes.recipes[component];
      if (!recipe) continue;
      const variant = Object.values(recipe.variants)[0];
      if (!variant) continue;
      const params: Record<string, string | boolean | number> = {};
      for (const parameter of recipe.parameters ?? []) params[parameter.id] = parameter.default;
      const slots: Record<string, string> = {};
      for (const slot of recipe.slots ?? []) slots[slot.id] = slot.default ?? "";
      const rendered = renderRecipe(recipe, { variant: variant.id, params, slots });
      const report = lintStyleCode(slug, rendered.code, { checkRequired: [component] });
      pairs++;
      const missing = report.missingRequired.flatMap((entry) => entry.missing);
      if (!missing.length) {
        clean++;
        continue;
      }
      lines.push(`  ${slug}/${component}: ${missing.length} missing (${missing.slice(0, 3).join(", ")}${missing.length > 3 ? ", ..." : ""})`);
    }
  }

  console.log(
    `missing-required on canonical recipes: ${pairs - clean}/${pairs} button/card/input pairs`,
  );
  for (const line of lines) console.log(line);
}

function main() {
  const violations: ParityViolation[] = [];
  let renders = 0;

  for (const slug of getStylesWithRecipes()) {
    const styleRecipes = getStyleRecipes(slug);
    if (!styleRecipes) {
      requiredViolations.add(`${slug}: registered style recipes could not be loaded`);
      continue;
    }
    checkRequiredSources(slug);
    for (const component of components) {
      const recipe = styleRecipes.recipes[component];
      if (!recipe || !Object.keys(recipe.variants).length) {
        requiredViolations.add(`${slug}/${component}: missing recipe or variants`);
      }
    }

    for (const recipe of Object.values(styleRecipes.recipes)) {
      const combos = paramCombos(recipe.parameters ?? []);
      for (const variant of Object.values(recipe.variants)) {
        for (const state of stateNames(recipe.states)) {
          for (const params of combos) {
            renders++;
            const hits = lintRecipeRender(slug, recipe, variant.id, state, params);
            for (const violation of hits) {
              if (!violations.some((known) => JSON.stringify(known) === JSON.stringify(violation))) {
                violations.push(violation);
              }
            }
          }
        }
      }
    }
  }

  const bySlug = new Map<string, ParityViolation[]>();
  for (const violation of violations) {
    const list = bySlug.get(violation.slug) ?? [];
    list.push(violation);
    bySlug.set(violation.slug, list);
  }

  for (const [slug, list] of bySlug) {
    console.log(`\n${slug} (${list.length})`);
    for (const violation of list) {
      console.log(`  ${violation.recipe}/${violation.variant} [${violation.state}]: ${violation.className}`);
      console.log(`    ${violation.reason}`);
    }
  }

  console.log(`\nchecked renders: ${renders}`);
  console.log(`forbidden violations: ${violations.length}`);
  reportCanonicalRequiredGaps();
  console.log(`required contract violations (all variants, parameters and states): ${requiredViolations.size}`);
  for (const violation of requiredViolations) console.log(`  ${violation}`);

  if (violations.length || requiredViolations.size) {
    console.error("\nofficial recipes must not violate their own style's lint rules");
    process.exitCode = 1;
  }
}

main();
