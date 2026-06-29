/** CLI command implementations. Each returns the string to print. */

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

function summaryLine(s: StyleSummary): string {
  return `  ${s.slug.padEnd(26)} ${s.nameEn}  [${s.category}]`;
}

function unknownSlug(slug: string): string {
  return `Unknown style "${slug}". Run \`stylekit search <query>\` or \`stylekit list\` to find a slug.`;
}

export function cmdList(
  category: StyleCategory | undefined,
  limit: number | undefined,
  json: boolean,
): string {
  const results = listStyles(category, limit);
  if (json) return JSON.stringify(results, null, 2);
  const header = `StyleKit styles${category ? ` · ${category}` : ""} (${results.length}):`;
  return [header, "", ...results.map(summaryLine)].join("\n");
}

export function cmdSearch(query: string, json: boolean): string {
  const results = searchStyles(query);
  if (json) return JSON.stringify(results, null, 2);
  if (results.length === 0) return `No styles match "${query}".`;
  return [
    `Matches for "${query}" (${results.length}):`,
    "",
    ...results.map(summaryLine),
  ].join("\n");
}

export function cmdShow(slug: string, json: boolean): string {
  const d = getStyleDetail(slug);
  if (!d) return unknownSlug(slug);
  if (json) return JSON.stringify(d, null, 2);
  return [
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
    `install: ${d.shadcnInstall}`,
    `web: ${d.url}`,
  ].join("\n");
}

export function cmdTokens(slug: string, _json: boolean): string {
  if (!knownSlug(slug)) return unknownSlug(slug);
  const t = getTokens(slug);
  if (!t) return `Style "${slug}" exists but has no registered design tokens.`;
  return JSON.stringify(t, null, 2);
}

export function cmdRecipe(
  slug: string,
  component: string | undefined,
  json: boolean,
): string {
  const d = getStyleDetail(slug);
  if (!d) return unknownSlug(slug);
  const available = d.recipeIds.join(", ") || "none";
  if (!component) {
    return `Specify a component. Available recipes for "${slug}": ${available}.`;
  }
  const r = getComponentRecipe(slug, component);
  if (!r) {
    return `No "${component}" recipe for "${slug}". Available: ${available}.`;
  }
  if (json) return JSON.stringify(r, null, 2);
  return [
    `${component} — ${slug}`,
    "",
    "className:",
    r.className,
    "",
    "code:",
    r.code,
  ].join("\n");
}

export function cmdAdd(slug: string, json: boolean): string {
  if (!knownSlug(slug)) return unknownSlug(slug);
  const command = shadcnInstallCommand(slug);
  if (json) {
    return JSON.stringify(
      { slug, command, registryUrl: registryUrl(slug) },
      null,
      2,
    );
  }
  return [
    command,
    "",
    "(The target project must contain a tsconfig.json.)",
  ].join("\n");
}
