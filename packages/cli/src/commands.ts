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
  getImplementationBriefLive,
  projectImplementationBrief,
  RecipeRenderInputError,
  ImplementationBriefProjectionError,
  knownSlugLive,
  shadcnInstallCommand,
  registryUrl,
  inspectProject,
  createAddPlan,
  applyAddPlan,
  getPublicAssetLive,
  listPublicAssetsLive,
  type PublicAssetKind,
  type PublicAssetListOptions,
  type StyleCategory,
  type StyleSummary,
  type RecipeRenderOptions,
  type ImplementationBriefSection,
  type AddPlan,
  type ProjectInspection,
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
  renderOptions?: RecipeRenderOptions,
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
  let source: Awaited<ReturnType<typeof getComponentRecipeLive>>;
  try {
    source = await getComponentRecipeLive(slug, component, undefined, renderOptions);
  } catch (error) {
    if (error instanceof RecipeRenderInputError) {
      return fail(
        `${error.message} (code: ${error.code})`,
        "INVALID_RECIPE_OPTIONS",
        { optionCode: error.code, slug, component },
      );
    }
    throw error;
  }
  const r = source.data;
  if (!r) {
    return fail(`No "${component}" recipe for "${slug}". Available: ${available}.${source.fallbackReason ? ` ${source.fallbackReason}` : ""}`, "RECIPE_NOT_FOUND", styleSourceMetadata(source));
  }
  const json = {
    ...r,
    ...(renderOptions && Object.keys(renderOptions).length > 0 ? { renderOptions } : {}),
    ...styleSourceMetadata(source),
  };
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

export async function cmdBrief(
  slug: string,
  options: {
    sections?: readonly ImplementationBriefSection[];
    componentIds?: readonly string[];
  } = {},
): Promise<CommandResult> {
  const source = await getImplementationBriefLive(slug);
  if (!source.data) {
    const notFound = source.failureKind === "not-found";
    return fail(
      notFound
        ? unknownSlugMsg(slug)
        : `Could not retrieve an implementation brief for "${slug}".${source.fallbackReason ? ` ${source.fallbackReason}` : ""}`,
      notFound ? "UNKNOWN_STYLE" : "STYLE_BRIEF_UNAVAILABLE",
      styleSourceMetadata(source),
    );
  }

  let projected: ReturnType<typeof projectImplementationBrief>;
  try {
    projected = projectImplementationBrief(source.data, options);
  } catch (error) {
    if (error instanceof ImplementationBriefProjectionError) {
      return fail(
        `${error.message} (code: ${error.code})`,
        "INVALID_BRIEF_PROJECTION",
        { projectionCode: error.code, slug },
      );
    }
    throw error;
  }

  const json = {
    ...projected,
    ...styleSourceMetadata(source),
  };
  return ok(JSON.stringify(json, null, 2), json);
}

function formatProjectInspection(inspection: ProjectInspection): string {
  return [
    `Project doctor — ${inspection.root}`,
    `Ready for add: ${inspection.readyForAdd ? "yes" : "no"}`,
    `Package manager: ${inspection.packageManager.message}`,
    `Tailwind: ${inspection.tailwind.message}`,
    `CSS entry: ${inspection.cssEntry.message}`,
    ...(inspection.blockers.length > 0
      ? ["", "Blockers:", ...inspection.blockers.map((item) => `- ${item}`)]
      : []),
    ...(inspection.warnings.length > 0
      ? ["", "Warnings:", ...inspection.warnings.map((item) => `- ${item}`)]
      : []),
  ].join("\n");
}

function formatAddPlan(plan: AddPlan): string {
  return [
    `StyleKit add plan — ${plan.slug}`,
    `Project: ${plan.target.projectRoot}`,
    `Status: ${plan.readyForApply ? "ready to apply" : "blocked"}`,
    `Command: ${plan.command.display ?? "unavailable"}`,
    ...(plan.target.cssFile ? [`CSS target: ${plan.target.cssFile}`] : []),
    ...(plan.affectedFiles.length > 0
      ? ["", "Expected file effects:", ...plan.affectedFiles.map((file) => `- ${file.path}: ${file.reason}`)]
      : ["", "Expected file effects: none identified"]),
    ...(plan.blockers.length > 0
      ? ["", "Blockers:", ...plan.blockers.map((item) => `- ${item}`)]
      : []),
    ...(plan.warnings.length > 0
      ? ["", "Warnings:", ...plan.warnings.map((item) => `- ${item}`)]
      : []),
  ].join("\n");
}

export function cmdDoctor(cwd?: string): CommandResult {
  const inspection = inspectProject(cwd);
  const text = formatProjectInspection(inspection);
  return inspection.readyForAdd
    ? ok(text, inspection)
    : fail(text, "PROJECT_NOT_READY", { inspection });
}

export async function cmdAdd(
  slug: string,
  options: { cwd?: string; apply?: boolean; dryRun?: boolean } = {},
): Promise<CommandResult> {
  const source = await knownSlugLive(slug);
  if (!source.data) {
    const authoritativeNotFound = source.origin === "live" && !source.failureKind;
    if (source.failureKind === "not-found" || authoritativeNotFound) {
      return fail(unknownSlugMsg(slug), "UNKNOWN_STYLE", styleSourceMetadata(source));
    }
    return fail(
      `Could not verify that style "${slug}" exists.${source.fallbackReason ? ` ${source.fallbackReason}` : ""}`,
      "STYLE_SOURCE_UNAVAILABLE",
      styleSourceMetadata(source),
    );
  }

  if (options.apply && options.dryRun) {
    return fail("Choose either --apply or --dry-run, not both.", "INVALID_ARGUMENTS");
  }

  if (options.apply || options.dryRun || options.cwd !== undefined) {
    const plan = createAddPlan(slug, options.cwd);
    if (options.apply) {
      const applied = await applyAddPlan(plan, { apply: true });
      const json = {
        schemaVersion: "stylekit-cli-add-output-v1",
        mode: "apply",
        plan,
        result: applied,
        lookupOrigin: source.origin,
        ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
      };
      const verification = applied.verification.css.changesObserved
        ? "CSS variable changes were observed in the configured stylesheet; theme identity and visual result remain unverified."
        : applied.ok
          ? "The installer exited successfully, but no CSS variable changes were observed; theme identity and visual result remain unverified."
          : applied.verification.note;
      const text = [
        formatAddPlan(plan),
        "",
        `Install status: ${applied.status}`,
        verification,
        `Theme identity: ${applied.verification.themeIdentity}; visual result: ${applied.verification.visualResult}.`,
        ...(applied.blockers.length > 0
          ? ["", ...applied.blockers.map((item) => `- ${item}`)]
          : []),
      ].join("\n");
      return applied.ok
        ? ok(text, json)
        : fail(text, applied.status === "blocked" ? "ADD_BLOCKED" : "ADD_FAILED", {
            schemaVersion: json.schemaVersion,
            mode: json.mode,
            plan,
            result: applied,
            lookupOrigin: source.origin,
            ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
          });
    }

    const mode = options.dryRun ? "dry-run" : "plan";
    const details = {
      schemaVersion: "stylekit-cli-add-output-v1",
      mode,
      plan,
    };
    return plan.readyForApply
      ? ok(formatAddPlan(plan), details)
      : fail(`The ${mode} cannot be applied because the project has blockers.\n${formatAddPlan(plan)}`, "ADD_BLOCKED", details);
  }

  const command = shadcnInstallCommand(slug);
  const json = {
    slug,
    command,
    registryUrl: registryUrl(slug),
    prerequisite: "This registry theme command supports Tailwind CSS v4 only. The target must have components.json configured with tailwind.css and CSS variables enabled, plus tsconfig.json. For Tailwind v3, use Style Pack's legacy HSL <slug>-variables.css and Tailwind v3 <slug>-tailwind-preset.js artifacts instead.",
    lookupOrigin: source.origin,
    ...(source.fallbackReason ? { fallbackReason: source.fallbackReason } : {}),
  };
  const text = [
    command,
    "",
    `Style existence lookup origin: ${source.origin}${source.fallbackReason ? ` · fallback: ${source.fallbackReason}` : ""}`,
    "",
    "(This registry command is for Tailwind v4. Initialize shadcn with components.json (tailwind.css and CSS variables) and tsconfig.json.)",
    "For Tailwind v3, use Style Pack's legacy HSL <slug>-variables.css and Tailwind v3 <slug>-tailwind-preset.js instead.",
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
