import { getStyleRecipes } from "../../lib/recipes/registry";
import { renderRecipe } from "../../lib/recipes/renderer";
import { lintStyleCode, type StyleLintComponent, type StyleLintViolation } from "../../lib/styles/style-linter";
import { styles } from "../../lib/styles";

type Component = StyleLintComponent;
type Violation = StyleLintViolation & { slug: string; component: Component };
type Exception = { slug: string; component: Component; rule: Violation["rule"]; className: string; count: number; reason: string };

// Former template waivers are now expressed as portable, element/state-scoped
// lint rules. Keep this list empty so a new unreviewed conflict fails the gate.
const exceptions: Exception[] = [];

const components: Component[] = ["button", "card", "input"];
const keyOf = (item: Pick<Exception, "slug" | "component" | "rule" | "className">) =>
  JSON.stringify([item.slug, item.component, item.rule, item.className]);
const errors: string[] = [];
const actual = new Map<string, { count: number; reason: string }>();
const templateMissing: string[] = [];
const recipeMissing: string[] = [];
let templates = 0;
let templateDynamic = 0;
let recipesChecked = 0;
let recipeDynamic = 0;
let recipeViolations = 0;

const slugs = new Set<string>();
for (const style of styles) {
  if (slugs.has(style.slug)) errors.push("Duplicate style slug: " + style.slug);
  slugs.add(style.slug);

  for (const component of components) {
    const code = style.components[component]?.code;
    if (!code) {
      errors.push("Missing " + component + " template for " + style.slug);
      continue;
    }
    templates += 1;
    const report = lintStyleCode(style.slug, code, { checkRequired: [component] });
    templateDynamic += report.coverage.dynamicAttributes;
    for (const missing of report.missingRequired) {
      for (const cls of missing.missing) templateMissing.push(style.slug + "/" + component + ": " + cls);
    }
    if (report.unsupportedRules?.length) errors.push(style.slug + "/" + component + " has uncompiled rules: " + report.unsupportedRules.join(", "));
    for (const violation of report.violations) {
      const key = keyOf({ slug: style.slug, component, rule: violation.rule, className: violation.className });
      const prior = actual.get(key);
      actual.set(key, { count: (prior?.count ?? 0) + 1, reason: violation.reason });
    }
  }

  const styleRecipes = getStyleRecipes(style.slug)?.recipes;
  if (!styleRecipes) {
    errors.push("Missing recipes for style " + style.slug);
    continue;
  }
  for (const component of components) {
    const recipe = styleRecipes[component];
    if (!recipe) {
      errors.push("Missing default recipe " + style.slug + "/" + component);
      continue;
    }
    const variant = recipe.variants.default ? "default" : Object.keys(recipe.variants)[0];
    if (!variant) {
      errors.push("Recipe has no variant: " + style.slug + "/" + component);
      continue;
    }
    const params = Object.fromEntries(recipe.parameters.map((parameter) => [parameter.id, parameter.default]));
    const code = renderRecipe(recipe, { variant, params, slots: {}, state: "default" }).code;
    recipesChecked += 1;
    const report = lintStyleCode(style.slug, code, { checkRequired: [component] });
    recipeDynamic += report.coverage.dynamicAttributes;
    for (const missing of report.missingRequired) {
      for (const cls of missing.missing) recipeMissing.push(style.slug + "/" + component + ": " + cls);
    }
    if (report.unsupportedRules?.length) errors.push(style.slug + "/recipe:" + component + " has uncompiled rules: " + report.unsupportedRules.join(", "));
    if (report.violations.length) {
      recipeViolations += report.violations.length;
      for (const violation of report.violations) errors.push("Forbidden class in default recipe " + style.slug + "/" + component + ": " + violation.className + " - " + violation.reason);
    }
  }
}
const expected = new Set<string>();
for (const exception of exceptions) {
  const key = keyOf(exception);
  if (expected.has(key)) errors.push("Duplicate exception: " + key);
  expected.add(key);
  const found = actual.get(key);
  if (!found) errors.push("Stale exception, violation no longer exists: " + key);
  else if (found.count !== exception.count) errors.push("Exception count changed for " + key + ": expected " + exception.count + ", found " + found.count);
  else actual.delete(key);
}
for (const [key, violation] of actual) errors.push("Unreviewed template violation (" + violation.count + "x): " + key + " - " + violation.reason);

const swissButton = getStyleRecipes("swiss-style")?.recipes.button;
if (!swissButton) {
  errors.push("Missing Swiss Style button recipe");
} else {
  const variant = swissButton.variants.primary ? "primary" : swissButton.variants.default ? "default" : Object.keys(swissButton.variants)[0];
  if (!variant) errors.push("Swiss Style button recipe has no variant");
  else {
    const params = Object.fromEntries(swissButton.parameters.map((parameter) => [parameter.id, parameter.default]));
    const code = renderRecipe(swissButton, { variant, params, slots: {}, state: "default" }).code;
    const strict = lintStyleCode("swiss-style", code, { checkRequired: ["button"], strict: true });
    if (!strict.ok) errors.push("Swiss Style default button fails strict contract: " + JSON.stringify({ status: strict.status, violations: strict.violations, missingRequired: strict.missingRequired }));
  }
}

console.log("[style-catalog] styles=" + styles.length + ", templates=" + templates + ", defaultRecipes=" + recipesChecked);
console.log("[style-catalog] template conflicts: reviewed scopes=" + new Set(exceptions.map((item) => item.slug + "/" + item.component)).size + ", reviewed occurrences=" + exceptions.reduce((sum, item) => sum + item.count, 0) + ", unreviewed occurrences=" + Array.from(actual.values()).reduce((sum, item) => sum + item.count, 0));
console.log("[style-catalog] reviewedExceptions=" + exceptions.length + " tuples / " + exceptions.reduce((sum, item) => sum + item.count, 0) + " occurrences (exact and count-checked)");
console.log("[style-catalog] required-class advisories (missing class tokens): templates=" + templateMissing.length + ", defaultRecipes=" + recipeMissing.length + " (advisory; not forbidden-rule failures)");
console.log("[style-catalog] dynamic class attributes to review manually: templates=" + templateDynamic + ", defaultRecipes=" + recipeDynamic);
console.log("[style-catalog] forbidden default recipe violations=" + recipeViolations);
if (errors.length) {
  console.error("[style-catalog] FAIL");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("[style-catalog] PASS: no unexpected forbidden conflicts; Swiss Style strict button contract passes.");
}
