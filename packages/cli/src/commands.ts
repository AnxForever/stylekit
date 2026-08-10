/**
 * CLI command implementations. Each returns a CommandResult so the entry point
 * can decide the output stream (stdout vs stderr), exit code, and format
 * (human text vs --json) in one place.
 */

import {
  listStyles,
  searchStyles,
  getStyleDetail,
  getTokens,
  getComponentRecipe,
  knownSlug,
  shadcnInstallCommand,
  registryUrl,
  type StyleCategory,
  type StyleSummary,
} from "./core.js";

export interface CommandResult {
  ok: boolean;
  text: string;
  json: unknown;
}

interface CommandError {
  error: string;
  code: string;
}

function ok(text: string, json: unknown): CommandResult {
  return { ok: true, text, json };
}

function fail(text: string, code = "COMMAND_ERROR"): CommandResult {
  const json: CommandError = { error: text, code };
  return { ok: false, text, json };
}

export function usageFail(usage: string): CommandResult {
  return {
    ok: false,
    text: `Usage: ${usage}`,
    json: { error: `Usage: ${usage}`, code: "USAGE" },
  };
}

function summaryLine(s: StyleSummary): string {
  return `  ${s.slug.padEnd(26)} ${s.nameEn}  [${s.category}]`;
}

function unknownSlugMsg(slug: string): string {
  return `Unknown style "${slug}". Run \`stylekit search <query>\` or \`stylekit list\` to find a slug.`;
}

export function cmdList(
  category: StyleCategory | undefined,
  limit: number | undefined,
): CommandResult {
  const { total, results } = listStyles(category, limit);
  const header = `StyleKit styles${category ? ` · ${category}` : ""} (${results.length} of ${total}):`;
  return ok(
    [header, "", ...results.map(summaryLine)].join("\n"),
    { total, count: results.length, results },
  );
}

export function cmdSearch(
  query: string,
  limit: number | undefined,
): CommandResult {
  const { total, results } = searchStyles(query, limit);
  if (results.length === 0) return fail(`No styles match "${query}".`);
  const header = `Matches for "${query}" (${results.length} of ${total}):`;
  return ok(
    [header, "", ...results.map(summaryLine)].join("\n"),
    { total, count: results.length, results },
  );
}

export function cmdShow(slug: string): CommandResult {
  const d = getStyleDetail(slug);
  if (!d) return fail(unknownSlugMsg(slug));
  const text = [
    `${d.nameEn} (${d.name})  [${d.category}]`,
    `slug: ${d.slug}`,
    `tags: ${d.tags.join(", ")}`,
    "",
    d.philosophy,
    "",
    `palette: primary ${d.colors.primary}, secondary ${d.colors.secondary}, accents ${d.colors.accent.join(", ")}`,
    "",
    "do:",
    ...d.doList.map((x) => `  + ${x}`),
    "don't:",
    ...d.dontList.map((x) => `  - ${x}`),
    "",
    `tokens: ${d.hasTokens ? "yes" : "no"}   recipes: ${d.recipeIds.join(", ") || "none"}`,
    `quality: ${d.quality.tier}   readiness: ${d.quality.capabilities.readiness}   accessibility: ${d.quality.accessibilityScore ?? "n/a"}`,
    `install: ${d.shadcnInstall}`,
    `web: ${d.url}`,
  ].join("\n");
  return ok(text, d);
}

export function cmdTokens(slug: string): CommandResult {
  if (!knownSlug(slug)) return fail(unknownSlugMsg(slug));
  const t = getTokens(slug);
  if (!t) {
    return fail(`Style "${slug}" exists but has no registered design tokens.`);
  }
  return ok(JSON.stringify(t, null, 2), t);
}

export function cmdRecipe(
  slug: string,
  component: string | undefined,
): CommandResult {
  const d = getStyleDetail(slug);
  if (!d) return fail(unknownSlugMsg(slug));
  const available = d.recipeIds.join(", ") || "none";
  if (!component) {
    return fail(`Specify a component. Available recipes for "${slug}": ${available}.`);
  }
  const r = getComponentRecipe(slug, component);
  if (!r) {
    return fail(`No "${component}" recipe for "${slug}". Available: ${available}.`);
  }
  const text = [
    `${component} — ${slug}`,
    "",
    "className:",
    r.className,
    "",
    "code:",
    r.code,
  ].join("\n");
  return ok(text, r);
}

export function cmdAdd(slug: string): CommandResult {
  if (!knownSlug(slug)) return fail(unknownSlugMsg(slug));
  const command = shadcnInstallCommand(slug);
  const json = {
    slug,
    command,
    registryUrl: registryUrl(slug),
    prerequisite: "The target project must contain a tsconfig.json.",
  };
  const text = [
    command,
    "",
    "(The target project must contain a tsconfig.json.)",
  ].join("\n");
  return ok(text, json);
}
