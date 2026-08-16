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
 * Ranking stays local. The API supplies which styles exist; the bundled
 * scoring decides how they rank. Moving scoring server-side would create two
 * implementations of the same logic, and they would drift the way the data
 * just did.
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
import { getStyleBySlug } from "@/lib/styles";
import type { StyleTokens } from "@/lib/styles/tokens";

export type DataOrigin = "live" | "bundled";

export interface Sourced<T> {
  readonly data: T;
  readonly origin: DataOrigin;
  /** Why the live catalogue was not used, when it was not. */
  readonly fallbackReason?: string;
}

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
let liveDisabledUntil = 0;

/** Exposed for tests and for long-lived processes that want a forced refresh. */
export function clearRemoteCache(): void {
  cache.clear();
  liveDisabledUntil = 0;
}

type FetchResult<T> = { value: T } | { error: string };

async function fetchJson<T>(path: string, options: RemoteOptions): Promise<FetchResult<T>> {
  if (options.live === false) return { error: "live fetching disabled" };
  if (Date.now() < liveDisabledUntil) return { error: "live source unreachable, backing off" };

  const cached = cache.get(path);
  if (cached && cached.expiresAt > Date.now()) return { value: cached.value as T };

  const base = options.baseUrl ?? STYLEKIT_SITE_URL;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${base}${path}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!response.ok) return { error: `HTTP ${response.status}` };
    const value = (await response.json()) as T;
    cache.set(path, { value, expiresAt: Date.now() + (options.cacheTtlMs ?? DEFAULT_TTL_MS) });
    return { value };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    liveDisabledUntil = Date.now() + CIRCUIT_OPEN_MS;
    return { error: /abort/i.test(message) ? `timed out after ${timeoutMs}ms` : message };
  } finally {
    clearTimeout(timer);
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
function toDesignStyle(raw: LiveStyle): DesignStyle | null {
  const slug = str(raw.slug);
  if (!slug) return null;
  const colors = (raw.colors ?? {}) as Record<string, unknown>;
  return {
    slug,
    name: str(raw.name, slug),
    nameEn: str(raw.nameEn, slug),
    description: str(raw.description),
    descriptionEn: str(raw.descriptionEn),
    category: str(raw.category) as DesignStyle["category"],
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

async function liveCatalogue(
  options: RemoteOptions,
): Promise<{ styles: DesignStyle[] } | { error: string }> {
  const response = await fetchJson<{ total?: number; styles?: LiveStyle[] }>(
    "/api/styles",
    options,
  );
  if ("error" in response) return { error: response.error };
  const mapped = (response.value.styles ?? [])
    .map(toDesignStyle)
    .filter((style): style is DesignStyle => style !== null)
    .map(mergeWithBundled);
  if (mapped.length === 0) return { error: "live catalogue returned no usable styles" };
  return { styles: mapped };
}

/**
 * Search the live catalogue, ranked by the bundled scorer.
 *
 * This is the call that actually fixes staleness: styles published after this
 * package was built are searchable, because the set being ranked comes from
 * the API rather than from the bundle.
 */
export async function searchStylesLive(
  opts: SearchOptions = {},
  options: RemoteOptions = {},
): Promise<Sourced<{ total: number; results: StyleSummary[] }>> {
  const catalogue = await liveCatalogue(options);
  if ("error" in catalogue) {
    return { data: searchWithPool(opts), origin: "bundled", fallbackReason: catalogue.error };
  }
  return { data: searchWithPool(opts, catalogue.styles), origin: "live" };
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
    return { data: null, origin: "bundled", fallbackReason: response.error };
  }

  const raw = response.value;
  const recipes = raw["recipes"];
  const recipeIds =
    recipes && typeof recipes === "object" && !Array.isArray(recipes)
      ? Object.keys(recipes as Record<string, unknown>)
      : [];
  const colors = (raw["colors"] ?? {}) as Record<string, unknown>;
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
    slug: str(raw["slug"], slug),
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
    hasTokens: Boolean(raw["tokens"]),
    hasRecipes: recipeIds.length > 0,
    recipeIds,
    shadcnInstall: shadcnInstallCommand(slug),
    url: `${STYLEKIT_SITE_URL}/styles/${slug}`,
    quality: (raw["readiness"] ?? null) as StyleDetail["quality"],
  };

  return { data: detail, origin: "live" };
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
  if ("error" in response) return { data: null, origin: "bundled", fallbackReason: response.error };
  return { data: response.value.tokens ?? null, origin: "live" };
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
      fallbackReason:
        `"${slug}" was published after this package was built; recipe rendering needs ` +
        "the bundled definitions. Update stylekit-core to render its components.",
    };
  }
  return { data: null, origin: known.origin, ...(known.fallbackReason ? { fallbackReason: known.fallbackReason } : {}) };
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
    return { data: false, origin: "bundled", fallbackReason: catalogue.error };
  }
  return { data: catalogue.styles.some((style) => style.slug === slug), origin: "live" };
}
