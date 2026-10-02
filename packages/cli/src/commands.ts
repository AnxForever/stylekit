/**
 * CLI command implementations. Each returns a CommandResult so the entry point
 * can decide the output stream (stdout vs stderr), exit code, and format
 * (human text vs --json) in one place.
 */

import {
  searchStylesLive,
  getStyleDetailLive,
  getTokensLive,
  getComponentRecipeLive,
  knownSlugLive,
  shadcnInstallCommand,
  registryUrl,
  getPublicAssetLive,
  listPublicAssetsLive,
  type PublicAssetKind,
  type PublicAssetListOptions,
  type StyleCategory,
  type StyleSummary,
} from "./core.js";

type PublicAssetListResponse = Awaited<ReturnType<typeof listPublicAssetsLive>>;
type PublicAssetList = NonNullable<PublicAssetListResponse["data"]>;
type PublicAssetSummary = PublicAssetList["assets"][number];
type PublicAssetDetailResponse = Awaited<ReturnType<typeof getPublicAssetLive>>;
type PublicAssetDetail = NonNullable<PublicAssetDetailResponse["data"]>;

export interface CommandResult {
  ok: boolean;
  text: string;
  json: unknown;
}

function ok(text: string, json: unknown): CommandResult {
  return { ok: true, text, json };
}

function fail(
  text: string,
  code = "COMMAND_ERROR",
  details?: Record<string, unknown>,
): CommandResult {
  const json = details
    ? { error: text, code, ...details }
    : { error: text, code };
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

function styleSourceMetadata(source: {
  origin: "live" | "bundled";
  fallbackReason?: string;
  failureKind?: string;
}): Record<string, unknown> {
  return {
    origin: source.origin,
    ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
    ...(source.failureKind ? { failureKind: source.failureKind } : {}),
  };
}

export async function cmdList(
  category: StyleCategory | undefined,
  limit: number | undefined,
): Promise<CommandResult> {
  const source = await searchStylesLive({ category, limit });
  const { total, results } = source.data;
  const header = `StyleKit styles${category ? ` · ${category}` : ""} (${results.length} of ${total}; ${source.origin}):`;
  return ok(
    [header, "", ...results.map(summaryLine)].join("\n"),
    { total, count: results.length, results, ...styleSourceMetadata(source) },
  );
}

export async function cmdSearch(
  query: string,
  limit: number | undefined,
): Promise<CommandResult> {
  const source = await searchStylesLive({ query, limit });
  const { total, results } = source.data;
  if (results.length === 0) return fail(`No styles match "${query}".`, "NO_MATCHES", styleSourceMetadata(source));
  const header = `Matches for "${query}" (${results.length} of ${total}; ${source.origin}):`;
  return ok(
    [header, "", ...results.map(summaryLine)].join("\n"),
    { total, count: results.length, results, ...styleSourceMetadata(source) },
  );
}

export async function cmdShow(slug: string): Promise<CommandResult> {
  const source = await getStyleDetailLive(slug);
  const d = source.data;
  if (!d) {
    const notFound = source.failureKind === "not-found";
    return fail(
      notFound ? unknownSlugMsg(slug) : `Could not retrieve style "${slug}".${source.fallbackReason ? ` ${source.fallbackReason}` : ""}`,
      notFound ? "UNKNOWN_STYLE" : "STYLE_SOURCE_UNAVAILABLE",
      styleSourceMetadata(source),
    );
  }
  const text = [
    `${d.nameEn} (${d.name})  [${d.category}]`,
    `catalogue origin: ${source.origin}${source.fallbackReason ? ` · fallback: ${source.fallbackReason}` : ""}`,
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
  return ok(text, { ...d, ...styleSourceMetadata(source) });
}

export async function cmdTokens(slug: string): Promise<CommandResult> {
  const source = await getTokensLive(slug);
  const t = source.data;
  if (!t) {
    if (source.failureKind === "not-found") {
      const known = await knownSlugLive(slug);
      if (!known.data) return fail(unknownSlugMsg(slug), "UNKNOWN_STYLE", styleSourceMetadata(known));
      return fail(`Style "${slug}" exists but has no live design tokens.`, "TOKENS_NOT_FOUND", styleSourceMetadata(source));
    }
    return fail(`Could not retrieve tokens for "${slug}".${source.fallbackReason ? ` ${source.fallbackReason}` : ""}`, "TOKENS_SOURCE_UNAVAILABLE", styleSourceMetadata(source));
  }
  const json = { ...t, ...styleSourceMetadata(source) };
  return ok(JSON.stringify(json, null, 2), json);
}

export async function cmdRecipe(
  slug: string,
  component: string | undefined,
): Promise<CommandResult> {
  const detailSource = await getStyleDetailLive(slug);
  const d = detailSource.data;
  if (!d) {
    const notFound = detailSource.failureKind === "not-found";
    return fail(
      notFound ? unknownSlugMsg(slug) : `Could not retrieve style "${slug}".${detailSource.fallbackReason ? ` ${detailSource.fallbackReason}` : ""}`,
      notFound ? "UNKNOWN_STYLE" : "STYLE_SOURCE_UNAVAILABLE",
      styleSourceMetadata(detailSource),
    );
  }
  const available = d.recipeIds.join(", ") || "none";
  if (!component) {
    return fail(`Specify a component. Available recipes for "${slug}": ${available}.`, "MISSING_COMPONENT", styleSourceMetadata(detailSource));
  }
  const source = await getComponentRecipeLive(slug, component);
  const r = source.data;
  if (!r) {
    return fail(`No "${component}" recipe for "${slug}". Available: ${available}.${source.fallbackReason ? ` ${source.fallbackReason}` : ""}`, "RECIPE_NOT_FOUND", styleSourceMetadata(source));
  }
  const json = { ...r, ...styleSourceMetadata(source) };
  const text = [
    `${component} — ${slug}`,
    `catalogue origin: ${source.origin}${source.fallbackReason ? ` · fallback: ${source.fallbackReason}` : ""}`,
    "",
    "className:",
    r.className,
    "",
    "code:",
    r.code,
  ].join("\n");
  return ok(text, json);
}

export async function cmdAdd(slug: string): Promise<CommandResult> {
  const source = await knownSlugLive(slug);
  if (!source.data) return fail(unknownSlugMsg(slug), "UNKNOWN_STYLE", styleSourceMetadata(source));
  const command = shadcnInstallCommand(slug);
  const json = {
    slug,
    command,
    registryUrl: registryUrl(slug),
    prerequisite: "The target project must contain a tsconfig.json.",
    lookupOrigin: source.origin,
    ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
  };
  const text = [
    command,
    "",
    `Style existence lookup origin: ${source.origin}${source.fallbackReason ? ` · fallback: ${source.fallbackReason}` : ""}`,
    "",
    "(The target project must contain a tsconfig.json.)",
  ].join("\n");
  return ok(text, json);
}

function sourceMetadata(source: {
  origin: "live" | "bundled";
  fallbackReason?: string;
  failureKind?: string;
}): Record<string, unknown> {
  return {
    origin: source.origin,
    ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
    ...(source.failureKind ? { failureKind: source.failureKind } : {}),
  };
}

function formatAssetSummary(asset: PublicAssetSummary): string {
  return (
    "  " +
    asset.kind +
    "/" +
    asset.id +
    "  " +
    asset.name +
    "  [" +
    asset.availability +
    "]"
  );
}

export async function cmdAssets(
  options: PublicAssetListOptions,
): Promise<CommandResult> {
  const result = await listPublicAssetsLive(options);
  if (!result.data) {
    const message =
      result.failureKind === "not-found"
        ? "The public asset catalogue was not found."
        : "The public asset catalogue is unavailable.";
    return fail(
      message + (result.fallbackReason ? " " + result.fallbackReason : ""),
      result.failureKind === "not-found"
        ? "ASSET_CATALOGUE_NOT_FOUND"
        : "ASSET_CATALOGUE_UNAVAILABLE",
      sourceMetadata(result),
    );
  }

  const page = result.data;
  const lines = [
    "Public assets (" +
      page.assets.length +
      " on this page; " +
      page.total +
      " total, offset " +
      page.offset +
      ", limit " +
      page.limit +
      ")",
    "Catalogue origin: " + result.origin,
    ...(result.fallbackReason ? ["Fallback: " + result.fallbackReason] : []),
  ];
  if (page.assets.length > 0) {
    lines.push("", ...page.assets.map(formatAssetSummary));
  } else {
    lines.push(
      "",
      page.total === 0
        ? "No public assets match these filters."
        : "No assets on this page.",
    );
  }
  return ok(lines.join("\n"), result);
}

function unavailableRemoteAsset(asset: PublicAssetDetail): Record<string, unknown> {
  const result: Record<string, unknown> = { metadata: asset.metadata };
  if (asset.data && typeof asset.data === "object" && !Array.isArray(asset.data)) {
    const data = asset.data as Record<string, unknown>;
    const safeData: Record<string, unknown> = {};
    if (data.sourceFilesIncluded === false) safeData.sourceFilesIncluded = false;
    if (typeof data.downloadUrl === "string") safeData.downloadUrl = data.downloadUrl;
    if (Object.keys(safeData).length > 0) result.data = safeData;
  }
  return result;
}

function detailText(
  asset: PublicAssetDetail,
  source: PublicAssetDetailResponse,
): string {
  const meta = asset.metadata;
  return [
    "Asset " + meta.kind + "/" + meta.id,
    "Name: " + meta.name,
    "Availability: " + meta.availability,
    "Catalogue origin: " + source.origin,
    ...(source.fallbackReason ? ["Fallback: " + source.fallbackReason] : []),
    ...(source.failureKind ? ["Source status: " + source.failureKind] : []),
    ...(meta.description ? ["Description: " + meta.description] : []),
    ...(meta.tags.length > 0 ? ["Tags: " + meta.tags.join(", ")] : []),
    "",
    "Asset record:",
    JSON.stringify(asset, null, 2),
  ].join("\n");
}

export async function cmdAsset(
  kind: PublicAssetKind,
  id: string,
): Promise<CommandResult> {
  const result = await getPublicAssetLive(kind, id);
  const asset = result.data;

  if (
    asset?.metadata.availability === "remote" &&
    result.failureKind === "unavailable"
  ) {
    const message =
      'Remote source for asset "' + kind + "/" + id +
      '" is unavailable; source content was not returned.' +
      (result.fallbackReason ? " " + result.fallbackReason : "");
    return fail(message, "ASSET_SOURCE_UNAVAILABLE", {
      ...sourceMetadata(result),
      asset: unavailableRemoteAsset(asset),
    });
  }

  if (!asset) {
    const notFound = result.failureKind === "not-found";
    const unsupported = result.failureKind === "unsupported";
    const message = notFound
      ? 'Unknown public asset "' + kind + "/" + id + '".'
      : unsupported
        ? 'The source type for public asset "' + kind + "/" + id + '" is unsupported.'
        : 'Could not retrieve public asset "' + kind + "/" + id +
          '"; the source is unavailable.' +
          (result.fallbackReason ? " " + result.fallbackReason : "");
    return fail(
      message,
      notFound
        ? "ASSET_NOT_FOUND"
        : unsupported
          ? "ASSET_UNSUPPORTED"
          : "ASSET_SOURCE_UNAVAILABLE",
      {
        ...sourceMetadata(result),
        asset: { kind, id },
      },
    );
  }

  if (asset.metadata.availability === "remote" && result.failureKind) {
    const message =
      'Remote source for asset "' + kind + "/" + id +
      '" could not be retrieved (' + result.failureKind +
      '); source content was not returned.' +
      (result.fallbackReason ? " " + result.fallbackReason : "");
    return fail(
      message,
      result.failureKind === "not-found"
        ? "ASSET_SOURCE_NOT_FOUND"
        : result.failureKind === "unsupported"
          ? "ASSET_SOURCE_UNSUPPORTED"
          : "ASSET_SOURCE_UNAVAILABLE",
      {
        ...sourceMetadata(result),
        asset: unavailableRemoteAsset(asset),
      },
    );
  }

  return ok(detailText(asset, result), result);
}
