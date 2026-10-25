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
 * Missing-required hits are reported as a count only, not a failure. Required
 * rules and recipes describe the same look in different notations
 * (shadow-[4px_4px_0_#000] vs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]) and
 * reconciling those spellings is tracked separately.
 */

import { getStylesWithRecipes, getStyleRecipes, renderRecipe } from "../../lib/recipes";
import type { ComponentRecipe, RecipeParameter, RecipeStates } from "../../lib/recipes/types";
import { lintStyleCode } from "../../lib/styles/style-linter";

type RenderState = NonNullable<Parameters<typeof renderRecipe>[1]>["state"];

interface ParityViolation {
  slug: string;
  recipe: string;
  variant: string;
  state: string;
  className: string;
  reason: string;
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
  return names.length ? names : ["default"];
}

function lintRecipeRender(
  slug: string,
  recipe: ComponentRecipe,
  variantId: string,
  state: string,
  params: Record<string, string | boolean | number>,
): { violations: ParityViolation[]; missingRequired: number } {
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
    return { violations: [], missingRequired: 0 };
  }

  const report = lintStyleCode(slug, rendered.code, {});
  const violations = report.violations.map((violation) => ({
    slug,
    recipe: recipe.id,
    variant: variantId,
    state,
    className: violation.className,
    reason: violation.reason,
  }));

  const componentCheck = ["button", "card", "input"].includes(recipe.id)
    ? ([recipe.id] as Array<"button" | "card" | "input">)
    : undefined;
  const missingRequired = componentCheck
    ? report.missingRequired.reduce((sum, entry) => sum + entry.missing.length, 0)
    : 0;

  return { violations, missingRequired };
}

function main() {
  const violations: ParityViolation[] = [];
  const missingRequiredBySlug = new Map<string, number>();
  let renders = 0;

  for (const slug of getStylesWithRecipes()) {
    const styleRecipes = getStyleRecipes(slug);
    if (!styleRecipes) continue;

    let slugMissing = 0;
    for (const recipe of Object.values(styleRecipes.recipes)) {
      const combos = paramCombos(recipe.parameters ?? []);
      for (const variant of Object.values(recipe.variants)) {
        for (const state of stateNames(recipe.states)) {
          for (const params of combos) {
            renders++;
            const result = lintRecipeRender(slug, recipe, variant.id, state, params);
            for (const violation of result.violations) {
              if (!violations.some((known) => JSON.stringify(known) === JSON.stringify(violation))) {
                violations.push(violation);
              }
            }
            slugMissing += result.missingRequired;
          }
        }
      }
    }
    if (slugMissing) missingRequiredBySlug.set(slug, slugMissing);
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
  if (missingRequiredBySlug.size) {
    console.log(
      `missing-required class instances (informational, notation gap): ${[...missingRequiredBySlug]
        .map(([slug, count]) => `${slug}=${count}`)
        .join(", ")}`,
    );
  }

  if (violations.length) {
    console.error("\nofficial recipes must not violate their own style's lint rules");
    process.exitCode = 1;
  }
}

main();
