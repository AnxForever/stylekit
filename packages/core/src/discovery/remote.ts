/**
 * @module stylekit-core/discovery/remote
 *
 * Live-first data access with a bundled fallback.
 *
 * The bundled catalogue is a snapshot taken whenever the package was last
 * published, and that snapshot went stale silently: installers saw 127 styles
 * and 2 results for "dark" while the live catalogue held 146 and 28. The
 * version number gave no hint, because it had not changed either.
 *
 * Republishing fixes one instance, not the cause. The catalogue keeps growing,
 * so any snapshot keeps drifting. Reading the live catalogue makes the data
 * correct by construction; keeping the bundle as a fallback means losing the
 * network degrades to stale rather than to broken.
 *
 * Query ranking prefers the site's hybrid search (`/api/search`: BM25 +
 * vector + RRF). Its vector path needs an embedding key and a prebuilt index,
 * neither of which can ship inside an npm package, so it has to run
 * server-side. The bundled scorer stays as the fallback when that endpoint is
 * unreachable, so a query always gets an answer.
 */

import {
  searchStyles as searchWithPool,
  getStyleDetail as getDetailLocal,
  getTokens as getTokensLocal,
  getComponentRecipe as getRecipeLocal,
  knownSlug as knownSlugLocal,
  shadcnInstallCommand,
  STYLEKIT_SITE_URL,
  type SearchOptions,
  type StyleSummary,
  type StyleDetail,
  type RecipeResult,
} from "@/lib/discovery";
import type { DesignStyle } from "@/lib/styles";
import { getStyleBySlug, styles as bundledCatalogue } from "@/lib/styles";
import type { StyleTokens } from "@/lib/styles/tokens";
import type { StyleQuality, CapabilityStatus } from "@/lib/styles/quality";
import { getImplementationBrief, type ImplementationBrief } from "@/lib/implementation-brief";

export type DataOrigin = "live" | "bundled";

/** Known styles use the complete bundled contract; newer styles need the live brief endpoint. */
export async function getImplementationBriefLive(slug: string, options: RemoteOptions = {}): Promise<Sourced<ImplementationBrief | null>> {
  const local = getImplementationBrief(slug);
  if (local) return { data: local, origin: "bundled" };
  const response = await fetchJson<unknown>(`/api/styles/${encodeURIComponent(slug)}/brief`, options);
  if ("error" in response) {
    if (response.failureKind !== "not-found") {
      return { data: null, origin: "bundled", fallbackReason: response.error, failureKind: response.failureKind };
    }

    // The brief endpoint is optional across deployments. Its 404 says nothing
    // about whether the style itself exists, so verify against the catalogue.
    const known = await knownSlugLive(slug, options);
    if (known.data) {
      return {
        data: null,
        origin: "bundled",
        fallbackReason: `live implementation brief endpoint is unavailable (${response.error}) for an existing style`,
        failureKind: "unsupported",
      };
    }
    if (known.failureKind === "not-found") {
      return {
        data: null,
        origin: "bundled",
        fallbackReason: known.fallbackReason ?? response.error,
        failureKind: "not-found",
      };
    }
    return {
      data: null,
      origin: "bundled",
      fallbackReason: `${response.error}; style existence could not be checked: ${known.fallbackReason ?? "live catalogue unavailable"}`,
      failureKind: "unavailable",
    };
  }
  const value = response.value;
  if (!isRecord(value) || value.schemaVersion !== "stylekit-brief-v1" || value.slug !== slug ||
      !["name", "nameEn", "description", "philosophy"].every((key) => typeof value[key] === "string") ||
      !["modern", "retro", "minimal", "expressive"].includes(String(value.category)) ||
      !["visual", "layout"].includes(String(value.styleType)) ||
      !["tags", "keywords", "doList", "dontList"].every((key) => Array.isArray(value[key]) && (value[key] as unknown[]).every((item) => typeof item === "string")) ||
      !Array.isArray(value.variants) || !isRecord(value.colors) || typeof value.colors.primary !== "string" || typeof value.colors.secondary !== "string" || !Array.isArray(value.colors.accent) ||
      typeof value.aiRules !== "string" || typeof value.globalCss !== "string" ||
      !isRecord(value.components) || !isRecord(value.recipes) || !isRecord(value.readiness) ||
      !Object.values(value.components).every((component) => isRecord(component) && typeof component.code === "string") ||
      !(value.tokens === null || isRecord(value.tokens)) ||
      !isRecord(value.lintRules) || value.lintRules.schemaVersion !== "stylekit-lint-v1" ||
      !["sources", "forbiddenClasses", "forbiddenPatterns", "exempt", "unsupportedRules"].every((key) => Array.isArray((value.lintRules as Record<string, unknown>)[key])) ||
      !isRecord(value.lintRules.required) ||
      !isRecord(value.provenance) || typeof value.provenance.contentHash !== "string" || typeof value.provenance.url !== "string" ||
      !["bundled", "static", "community"].includes(String(value.provenance.source))) {
    return { data: null, origin: "bundled", fallbackReason: "live endpoint did not return a stylekit-brief-v1 contract", failureKind: "unavailable" };
  }
  return { data: value as unknown as ImplementationBrief, origin: "live" };
}

export interface Sourced<T> {
  readonly data: T;
  readonly origin: DataOrigin;
  /** Why the live catalogue was not used, when it was not. */
  readonly fallbackReason?: string;
  /** Why a live-only resource could not be confirmed or retrieved. */
  readonly failureKind?: SourceFailureKind;
  /**
   * Which ranker ordered a query's results: an exact slug/name match, the site's
   * hybrid search, its keyword-only degradation, or the bundled scorer.
   */
  readonly ranking?: SearchRanking;
}

export type SourceFailureKind = "not-found" | "unavailable" | "unsupported";
export type SearchRanking = "exact" | "hybrid" | "keyword" | "local";

export interface RemoteOptions {
  /** Override for testing or self-hosting. */
  readonly baseUrl?: string;
  /**
   * Per-request budget. Deliberately short: a tool call that hangs is worse
   * than one that answers from a slightly older snapshot.
   */
  readonly timeoutMs?: number;
  /** Set false to skip the network entirely. */
  readonly live?: boolean;
  readonly cacheTtlMs?: number;
}

const DEFAULT_TIMEOUT_MS = 4_000;
const DEFAULT_TTL_MS = 5 * 60_000;
/**
 * One failed fetch usually means the network is unavailable, and retrying on
 * every call would add the timeout to every tool invocation for the rest of
 * the session.
 */
const CIRCUIT_OPEN_MS = 30_000;

const cache = new Map<string, { value: unknown; expiresAt: number }>();
const liveDisabledUntil = new Map<string, number>();
const inFlight = new Map<string, Promise<FetchResult<unknown>>>();
let cacheGeneration = 0;

/** Exposed for tests and for long-lived processes that want a forced refresh. */
export function clearRemoteCache(): void {
  cache.clear();
  liveDisabledUntil.clear();
  inFlight.clear();
  cacheGeneration += 1;
}

type FetchResult<T> =
  | { value: T }
  | { error: string; failureKind: SourceFailureKind };

function normalizeBaseUrl(value: string): string | null {
  try {
    // URL normalisation makes `https://example.test` and
    // `https://example.test/` share cache and circuit-breaker state.
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function openCircuit(baseUrl: string, generation: number): void {
  if (generation === cacheGeneration) {
    liveDisabledUntil.set(baseUrl, Date.now() + CIRCUIT_OPEN_MS);
  }
}

async function fetchJsonUncached<T>(
  path: string,
  baseUrl: string,
  cacheKey: string,
  options: RemoteOptions,
  generation: number,
  tripCircuit: boolean,
): Promise<FetchResult<T>> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      // A missing slug or missing optional artifact is a normal domain result,
      // not evidence that the whole site is offline. Only transient server and
      // rate-limit responses open the shared circuit.
      if (tripCircuit && (response.status === 429 || response.status >= 500)) {
        openCircuit(baseUrl, generation);
      }
      return {
        error: `HTTP ${response.status}`,
        failureKind: response.status === 404 ? "not-found" : "unavailable",
      };
    }

    const value = (await response.json()) as T;
    if (generation === cacheGeneration) {
      cache.set(cacheKey, {
        value,
        expiresAt: Date.now() + (options.cacheTtlMs ?? DEFAULT_TTL_MS),
      });
      liveDisabledUntil.delete(baseUrl);
    }
    return { value };
  } catch (error) {
    if (tripCircuit) openCircuit(baseUrl, generation);
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: /abort/i.test(message) ? `timed out after ${timeoutMs}ms` : message,
      failureKind: "unavailable",
    };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * `tripCircuit: false` is for optional endpoints: a site that predates one
 * answers 404, and that must not take the catalogue offline with it.
 */
async function fetchJson<T>(
  path: string,
  options: RemoteOptions,
  tripCircuit = true,
): Promise<FetchResult<T>> {
  if (options.live === false) return { error: "live fetching disabled", failureKind: "unavailable" };

  const baseUrl = normalizeBaseUrl(options.baseUrl ?? STYLEKIT_SITE_URL);
  if (!baseUrl) return { error: "invalid live source base URL", failureKind: "unavailable" };

  const cacheKey = `${baseUrl}${path}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return { value: cached.value as T };

  const disabledUntil = liveDisabledUntil.get(baseUrl) ?? 0;
  if (Date.now() < disabledUntil) {
    return { error: "live source unreachable, backing off", failureKind: "unavailable" };
  }

  const existing = inFlight.get(cacheKey);
  if (existing) return (await existing) as FetchResult<T>;

  const generation = cacheGeneration;
  const request = fetchJsonUncached<T>(path, baseUrl, cacheKey, options, generation, tripCircuit);
  inFlight.set(cacheKey, request as Promise<FetchResult<unknown>>);
  try {
    return await request;
  } finally {
    if (inFlight.get(cacheKey) === request) {
      inFlight.delete(cacheKey);
    }
  }
}

interface LiveStyle {
  readonly slug?: unknown;
  readonly name?: unknown;
  readonly nameEn?: unknown;
  readonly description?: unknown;
  readonly descriptionEn?: unknown;
  readonly category?: unknown;
  readonly tags?: unknown;
  readonly keywords?: unknown;
  readonly colors?: unknown;
}

const STYLE_CATEGORIES = new Set<DesignStyle["category"]>([
  "modern",
  "retro",
  "minimal",
  "expressive",
]);

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/**
 * Map an API record onto the shape the scorer reads.
 *
 * Only the fields scoring and summarising actually touch are mapped. Fields
 * are assigned explicitly rather than spread, so a server-side rename shows up
 * as an empty value in one place instead of silently producing an object that
 * type-checks but ranks wrongly.
 */
function toDesignStyle(raw: unknown): DesignStyle | null {
  if (!isRecord(raw)) return null;
  const slug = str(raw.slug).trim();
  if (!slug) return null;
  const colors = isRecord(raw.colors) ? raw.colors : {};
  const category = str(raw.category);
  return {
    slug,
    name: str(raw.name, slug),
    nameEn: str(raw.nameEn, slug),
    description: str(raw.description),
    descriptionEn: str(raw.descriptionEn),
    category: STYLE_CATEGORIES.has(category as DesignStyle["category"])
      ? (category as DesignStyle["category"])
      : "modern",
    tags: strArray(raw.tags),
    keywords: strArray(raw.keywords),
    colors: {
      primary: str(colors["primary"]),
      secondary: str(colors["secondary"]),
      accent: strArray(colors["accent"]),
    },
  } as DesignStyle;
}

/**
 * Merge a live record with the bundled one for the same slug.
 *
 * Neither side is a superset of the other, which is easy to miss:
 *
 *  - the API carries tags the bundle lacks (synthwave is tagged `dark-theme`
 *    live but not locally, which is why searching "dark" finds it)
 *  - the bundle carries English keyword backfill the list endpoint does not
 *    publish (`retro`, `vintage`, `nostalgic`), so an English query matches
 *    locally and misses live
 *
 * Taking the live record alone made "brutal" fall from 72 matches to 55 and
 * "minimal" from 30 to 20 -- a regression disguised as an upgrade. The union
 * is what actually improves on both.
 */
function mergeWithBundled(live: DesignStyle): DesignStyle {
  const local = getStyleBySlug(live.slug);
  if (!local) return live;
  return {
    ...local,
    ...live,
    tags: [...new Set([...(live.tags ?? []), ...(local.tags ?? [])])],
    keywords: [...new Set([...(live.keywords ?? []), ...(local.keywords ?? [])])],
    // Keep the richer descriptions the bundle holds when the API omits them.
    description: live.description || local.description,
    descriptionEn: live.descriptionEn || local.descriptionEn,
  };
}

const QUALITY_STATUSES: ReadonlySet<CapabilityStatus> = new Set([
  "complete",
  "partial",
  "fallback",
  "missing",
]);

function capabilityStatus(value: unknown, fallback: CapabilityStatus): CapabilityStatus {
  return typeof value === "string" && QUALITY_STATUSES.has(value as CapabilityStatus)
    ? (value as CapabilityStatus)
    : fallback;
}

function remoteQuality(raw: Record<string, unknown>): StyleQuality {
  const readiness = isRecord(raw.readiness) ? raw.readiness : {};
  const rawDarkMode = isRecord(readiness.darkMode) ? readiness.darkMode : {};
  const rawAccessibility = isRecord(raw.accessibility) ? raw.accessibility : {};
  const rawComponents = isRecord(raw.components) ? raw.components : {};
  const componentCount = ["button", "card", "input"].filter((key) => {
    const component = rawComponents[key];
    return isRecord(component) && typeof component.code === "string" && component.code.trim();
  }).length;
  const accessibilityScore =
    typeof rawAccessibility.overall === "number" ? rawAccessibility.overall : null;
  const readinessSource = readiness.source === "curated" ? "curated" : "fallback";

  return {
    tier: readinessSource === "curated" ? "curated" : "baseline",
    capabilities: {
      tokens: isRecord(raw.tokens) ? "complete" : "missing",
      recipes: isRecord(raw.recipes) ? "complete" : "missing",
      componentCode:
        componentCount === 3 ? "complete" : componentCount > 0 ? "partial" : "missing",
      variants: Array.isArray(raw.variants) && raw.variants.length > 0 ? "complete" : "missing",
      readiness: readinessSource,
      darkMode: capabilityStatus(rawDarkMode.support, "fallback"),
      accessibility: accessibilityScore === null ? "unavailable" : "scored",
    },
    accessibilityScore,
    flags: readinessSource === "fallback" ? ["readiness-fallback"] : [],
  };
}

async function liveCatalogue(
  options: RemoteOptions,
): Promise<{ styles: DesignStyle[] } | { error: string; failureKind: SourceFailureKind }> {
  const response = await fetchJson<{ total?: number; styles?: LiveStyle[] }>(
    "/api/styles",
    options,
  );
  // Failure of the catalogue endpoint cannot establish that an individual
  // style is missing, even when the endpoint itself responds with HTTP 404.
  if ("error" in response) return { error: response.error, failureKind: "unavailable" };

  if (!isRecord(response.value) || !Array.isArray(response.value.styles)) {
    return { error: "live catalogue returned malformed styles payload", failureKind: "unavailable" };
  }

  const mapped = response.value.styles
    .map(toDesignStyle)
    .filter((style): style is DesignStyle => style !== null)
    .map(mergeWithBundled);
  if (mapped.length === 0) return { error: "live catalogue returned no usable styles", failureKind: "unavailable" };
  return { styles: mapped };
}

function normalizeExactSearchValue(value: string): string {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
}

function exactStyleMatches(
  styles: readonly DesignStyle[],
  query: string,
  category?: SearchOptions["category"],
): DesignStyle[] {
  const normalizedQuery = normalizeExactSearchValue(query);
  return styles.filter((style) => {
    if (category && style.category !== category) return false;
    return [style.slug, style.name, style.nameEn].some(
      (value) => normalizeExactSearchValue(value) === normalizedQuery,
    );
  });
}

function prioritizeExactMatches(
  data: { total: number; results: StyleSummary[] },
  styles: readonly DesignStyle[],
  query: string,
  category?: SearchOptions["category"],
  limit?: number,
): { data: { total: number; results: StyleSummary[] }; matched: boolean } {
  const exactStyles = exactStyleMatches(styles, query, category);
  if (exactStyles.length === 0) return { data, matched: false };

  const exactData = searchWithPool({ category }, exactStyles);
  const exactSlugs = new Set(exactData.results.map((result) => result.slug));
  const semanticSlugs = new Set(data.results.map((result) => result.slug));
  const results = [
    ...exactData.results,
    ...data.results.filter((result) => !exactSlugs.has(result.slug)),
  ];
  return {
    data: {
      // NFKC exact matches can be stricter than the scorer's raw matching. Add
      // those matches to total when they were not in the semantic result set.
      total: data.total + exactData.results.filter((result) => !semanticSlugs.has(result.slug)).length,
      results: typeof limit === "number" && limit > 0 ? results.slice(0, limit) : results,
    },
    matched: true,
  };
}

/**
 * Search the live catalogue, ranked by the site's hybrid search when available.
 * Exact slug and name matches stay first even when semantic results score higher.
 * The bundled scorer is used when the live catalogue is unavailable.
 */
export async function searchStylesLive(
  opts: SearchOptions = {},
  options: RemoteOptions = {},
): Promise<Sourced<{ total: number; results: StyleSummary[] }>> {
  const catalogue = await liveCatalogue(options);
  const query = opts.query?.trim();
  if ("error" in catalogue) {
    const data = searchWithPool({ ...opts, limit: undefined }, bundledCatalogue);
    const prioritized = query
      ? prioritizeExactMatches(data, bundledCatalogue, query, opts.category, opts.limit)
      : { data: searchWithPool(opts, bundledCatalogue), matched: false };
    return {
      data: prioritized.data,
      origin: "bundled",
      fallbackReason: catalogue.error,
      failureKind: catalogue.failureKind,
      ...(query ? { ranking: prioritized.matched ? "exact" : "local" } : {}),
    };
  }

  if (query) {
    const ranked = await rankedSlugs(query, options);
    if (ranked && ranked.slugs.length > 0) {
      const bySlug = new Map(catalogue.styles.map((style) => [style.slug, style]));
      const exactStyles = exactStyleMatches(catalogue.styles, query, opts.category);
      const poolBySlug = new Map(exactStyles.map((style) => [style.slug, style]));
      for (const slug of ranked.slugs) {
        const style = bySlug.get(slug);
        if (style) poolBySlug.set(slug, style);
      }
      const pool = [...poolBySlug.values()];
      // No query here: the pool is already in ranked order, with exact matches
      // prepended, and searchWithPool applies the category filter.
      const data = searchWithPool({ ...opts, query: undefined, limit: undefined }, pool);
      const prioritized = prioritizeExactMatches(data, pool, query, opts.category, opts.limit);
      return {
        data: prioritized.data,
        origin: "live",
        ranking: prioritized.matched ? "exact" : ranked.mode,
      };
    }

    const data = searchWithPool({ ...opts, limit: undefined }, catalogue.styles);
    const prioritized = prioritizeExactMatches(data, catalogue.styles, query, opts.category, opts.limit);
    return {
      data: prioritized.data,
      origin: "live",
      ranking: prioritized.matched ? "exact" : "local",
    };
  }
  return { data: searchWithPool(opts, catalogue.styles), origin: "live" };
}

async function rankedSlugs(
  query: string,
  options: RemoteOptions,
): Promise<{ slugs: string[]; mode: "hybrid" | "keyword" } | null> {
  const response = await fetchJson<unknown>(
    `/api/search?q=${encodeURIComponent(query)}`,
    options,
    false,
  );
  if ("error" in response || !isRecord(response.value)) return null;
  const { mode, results } = response.value;
  if ((mode !== "hybrid" && mode !== "keyword") || !Array.isArray(results)) return null;
  const slugs = results
    .map((result) => (isRecord(result) ? result.slug : undefined))
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
  return { slugs, mode };
}

export async function getStyleDetailLive(
  slug: string,
  options: RemoteOptions = {},
): Promise<Sourced<StyleDetail | null>> {
  const local = getDetailLocal(slug);
  // The bundle carries richer detail than any single endpoint does, so prefer
  // it whenever it knows the style. The network is for what it does not know.
  if (local) return { data: local, origin: "bundled" };

  const response = await fetchJson<Record<string, unknown>>(
    `/api/styles/${encodeURIComponent(slug)}`,
    options,
  );
  if ("error" in response) {
    return { data: null, origin: "bundled", fallbackReason: response.error, failureKind: response.failureKind };
  }

  const raw = response.value;
  if (!isRecord(raw)) {
    return {
      data: null,
      origin: "bundled",
      fallbackReason: "live detail returned a malformed payload",
      failureKind: "unavailable",
    };
  }
  const detailSlug = str(raw["slug"]).trim();
  if (detailSlug !== slug) {
    return {
      data: null,
      origin: "bundled",
      fallbackReason: `live detail returned slug "${detailSlug}" for request "${slug}"`,
      failureKind: "unavailable",
    };
  }
  const recipes = raw["recipes"];
  const recipeMap = isRecord(recipes) && isRecord(recipes.recipes) ? recipes.recipes : recipes;
  const recipeIds = isRecord(recipeMap) ? Object.keys(recipeMap) : [];
  const colors = isRecord(raw["colors"]) ? raw["colors"] : {};
  const keywords = strArray(raw["keywords"]);

  // The detail endpoint publishes styleType but not category, and the two are
  // not interchangeable -- synthwave is styleType "visual" and category
  // "retro". The list endpoint carries both, and is already cached from the
  // existence check, so the real category comes from there rather than from a
  // field that merely looks similar.
  const catalogue = await liveCatalogue(options);
  const category =
    "error" in catalogue
      ? ""
      : (catalogue.styles.find((style) => style.slug === slug)?.category ?? "");

  const detail: StyleDetail = {
    slug: detailSlug,
    name: str(raw["nameEn"]) || str(raw["name"], slug),
    nameEn: str(raw["nameEn"], slug),
    category,
    // The detail endpoint carries no separate tag list; keywords are the
    // closest equivalent it actually publishes.
    tags: keywords.slice(0, 6),
    description: str(raw["description"]),
    philosophy: str(raw["philosophy"]),
    colors: {
      primary: str(colors["primary"]),
      secondary: str(colors["secondary"]),
      accent: strArray(colors["accent"]),
    },
    doList: strArray(raw["doList"]),
    dontList: strArray(raw["dontList"]),
    keywords,
    hasTokens: isRecord(raw["tokens"]),
    hasRecipes: recipeIds.length > 0,
    recipeIds,
    shadcnInstall: shadcnInstallCommand(slug),
    url: `${normalizeBaseUrl(options.baseUrl ?? STYLEKIT_SITE_URL) ?? STYLEKIT_SITE_URL}/styles/${detailSlug}`,
    quality: remoteQuality(raw),
  };

  return {
    data: detail,
    origin: "live",
    ...("error" in catalogue
      ? { fallbackReason: catalogue.error, failureKind: "unavailable" as const }
      : {}),
  };
}

export async function getTokensLive(
  slug: string,
  options: RemoteOptions = {},
): Promise<Sourced<StyleTokens | null>> {
  const local = getTokensLocal(slug);
  if (local) return { data: local, origin: "bundled" };

  const response = await fetchJson<{ tokens?: StyleTokens }>(
    `/api/styles/${encodeURIComponent(slug)}/tokens`,
    options,
  );
  if ("error" in response) return { data: null, origin: "bundled", fallbackReason: response.error, failureKind: response.failureKind };
  if (!isRecord(response.value) || !isRecord(response.value.tokens)) {
    return {
      data: null,
      origin: "bundled",
      fallbackReason: "live tokens returned a malformed payload",
      failureKind: "unavailable",
    };
  }
  return { data: response.value.tokens as StyleTokens, origin: "live" };
}

/**
 * Rendered component recipes, for styles the bundle knows.
 *
 * Deliberately does not fall back to the network. The recipes endpoint returns
 * recipe *definitions* -- skeletons, parameters, variants -- while the rendered
 * className and code come from local rendering against the style's tokens.
 * Reproducing that rendering here would duplicate it, and a second
 * implementation would drift from the first exactly the way the bundled data
 * drifted from the live catalogue.
 *
 * So a style published after this package was built reports why it cannot be
 * rendered rather than returning something approximate. Search and detail
 * still work for it, which is enough to tell the caller the style exists and
 * that an upgrade unlocks the rest.
 */
export async function getComponentRecipeLive(
  slug: string,
  recipeId: string,
  options: RemoteOptions = {},
): Promise<Sourced<RecipeResult | null>> {
  const local = getRecipeLocal(slug, recipeId);
  if (local) return { data: local, origin: "bundled" };

  const known = await knownSlugLive(slug, options);
  if (known.data && !knownSlugLocal(slug)) {
    return {
      data: null,
      origin: "bundled",
      failureKind: "unsupported",
      fallbackReason:
        `"${slug}" was published after this package was built; recipe rendering needs ` +
        "the bundled definitions. Use stylekit_get_implementation_brief for its source definitions.",
    };
  }
  if (known.data) {
    return {
      data: null,
      origin: known.origin,
      failureKind: "not-found",
      fallbackReason: `No "${recipeId}" recipe is registered for "${slug}".`,
    };
  }
  return {
    data: null,
    origin: known.origin,
    failureKind: known.failureKind ?? "unavailable",
    ...(known.fallbackReason ? { fallbackReason: known.fallbackReason } : {}),
  };
}

/**
 * Whether a slug exists at all.
 *
 * The check a stale bundle damages most: a style published after the last
 * release would be reported as nonexistent, which reads to a caller as "that
 * style is not real" rather than "this package is out of date".
 */
export async function knownSlugLive(
  slug: string,
  options: RemoteOptions = {},
): Promise<Sourced<boolean>> {
  if (knownSlugLocal(slug)) return { data: true, origin: "bundled" };

  const catalogue = await liveCatalogue(options);
  if ("error" in catalogue) {
    return { data: false, origin: "bundled", fallbackReason: catalogue.error, failureKind: catalogue.failureKind };
  }
  const exists = catalogue.styles.some((style) => style.slug === slug);
  return {
    data: exists,
    origin: "live",
    ...(!exists ? { failureKind: "not-found" as const, fallbackReason: `Style "${slug}" was not found in the live catalogue.` } : {}),
  };
}
