/** Live-first access to public StyleKit assets, with a bundled snapshot fallback. */

import { STYLEKIT_SITE_URL } from "@/lib/discovery";
import { getPublicAsset, listPublicAssets } from "./registry.js";
import {
  ASSET_KINDS,
  ASSET_SCHEMA_VERSION,
  isAssetKind,
} from "./types.js";
import type {
  AssetKind,
  AssetSummary,
  ListPublicAssetsOptions,
  PublicAssetDetail,
  PublicAssetListResponse,
} from "./types.js";
import type {
  RemoteOptions,
  Sourced,
  SourceFailureKind,
} from "../discovery/remote.js";

const DEFAULT_TIMEOUT_MS = 4_000;
const MAX_ASSET_RESPONSE_BYTES = 5 * 1024 * 1024;
const AVAILABILITIES = new Set(["bundled", "remote", "external", "restricted"]);
const CONTENT_LEVELS = new Set(["source", "metadata", "remote", "restricted"]);

type FetchResult<T> =
  | { value: T }
  | { error: string; failureKind: SourceFailureKind };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeBaseUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if ((url.protocol !== "http:" && url.protocol !== "https:") || url.username || url.password) {
      return null;
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isLicense(value: unknown): boolean {
  return isRecord(value) && typeof value.name === "string" &&
    (value.url === undefined || typeof value.url === "string") &&
    (value.notes === undefined || typeof value.notes === "string");
}

function isAttribution(value: unknown): boolean {
  return isRecord(value) && typeof value.source === "string" &&
    (value.author === undefined || typeof value.author === "string") &&
    (value.license === undefined || typeof value.license === "string") &&
    (value.url === undefined || typeof value.url === "string");
}

function isAssetSummary(value: unknown): value is AssetSummary {
  return isRecord(value) &&
    typeof value.id === "string" && value.id.length > 0 &&
    isAssetKind(value.kind) &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    isStringArray(value.tags) &&
    typeof value.availability === "string" && AVAILABILITIES.has(value.availability) &&
    typeof value.contentLevel === "string" && CONTENT_LEVELS.has(value.contentLevel) &&
    (value.nameZh === undefined || typeof value.nameZh === "string") &&
    (value.sourceRef === undefined || typeof value.sourceRef === "string") &&
    (value.websiteUrl === undefined || typeof value.websiteUrl === "string") &&
    (value.sourceUrls === undefined || isStringArray(value.sourceUrls)) &&
    (value.license === undefined || isLicense(value.license)) &&
    (value.attribution === undefined || isAttribution(value.attribution)) &&
    (value.capabilities === undefined || isStringArray(value.capabilities));
}

function isCountRecord(value: unknown): value is Record<AssetKind, number> {
  return isRecord(value) && ASSET_KINDS.every((kind) =>
    typeof value[kind] === "number" && Number.isSafeInteger(value[kind]) && (value[kind] as number) >= 0,
  );
}

function isPublicAssetList(value: unknown): value is PublicAssetListResponse {
  return isRecord(value) &&
    value.schemaVersion === ASSET_SCHEMA_VERSION &&
    Array.isArray(value.assets) && value.assets.every(isAssetSummary) &&
    typeof value.total === "number" && Number.isSafeInteger(value.total) && value.total >= 0 &&
    typeof value.offset === "number" && Number.isSafeInteger(value.offset) && value.offset >= 0 &&
    typeof value.limit === "number" && Number.isSafeInteger(value.limit) && value.limit >= 1 &&
    typeof value.hasMore === "boolean" &&
    isCountRecord(value.kindCounts);
}

function isPublicAssetDetail(
  value: unknown,
  kind: AssetKind,
  id: string,
): value is PublicAssetDetail {
  if (!isRecord(value) || value.schemaVersion !== ASSET_SCHEMA_VERSION ||
      !isAssetSummary(value.metadata) || value.metadata.kind !== kind || value.metadata.id !== id ||
      !("data" in value)) {
    return false;
  }
  return (value.code === undefined || typeof value.code === "string" || isStringArray(value.code)) &&
    (value.codeLanguage === undefined || ["css", "tsx", "json", "text"].includes(String(value.codeLanguage))) &&
    isStringArray(value.dependencies) &&
    isStringArray(value.sourceUrls) &&
    isStringArray(value.capabilities) &&
    (value.license === undefined || isLicense(value.license)) &&
    (value.attribution === undefined || isAttribution(value.attribution));
}

async function readBoundedJson(response: Response): Promise<unknown> {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_ASSET_RESPONSE_BYTES) {
    throw new Error(`response exceeds ${MAX_ASSET_RESPONSE_BYTES} bytes`);
  }
  if (!response.body) {
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > MAX_ASSET_RESPONSE_BYTES) {
      throw new Error(`response exceeds ${MAX_ASSET_RESPONSE_BYTES} bytes`);
    }
    return JSON.parse(text) as unknown;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_ASSET_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error(`response exceeds ${MAX_ASSET_RESPONSE_BYTES} bytes`);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(body)) as unknown;
}

async function fetchJson<T>(
  path: string,
  options: RemoteOptions,
  notFoundKind: SourceFailureKind,
): Promise<FetchResult<T>> {
  if (options.live === false) {
    return { error: "live asset fetching disabled", failureKind: "unavailable" };
  }
  const baseUrl = normalizeBaseUrl(options.baseUrl ?? STYLEKIT_SITE_URL);
  if (!baseUrl) {
    return { error: "invalid live asset source base URL", failureKind: "unavailable" };
  }

  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      return {
        error: `HTTP ${response.status}`,
        failureKind: response.status === 404 ? notFoundKind : "unavailable",
      };
    }
    return { value: await readBoundedJson(response) as T };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: /abort/i.test(message) ? `timed out after ${timeoutMs}ms` : message,
      failureKind: "unavailable",
    };
  } finally {
    clearTimeout(timer);
  }
}

function normalizeFilters(options: ListPublicAssetsOptions): Required<Pick<ListPublicAssetsOptions, "offset" | "limit">> & ListPublicAssetsOptions {
  const normalized = { ...options, offset: options.offset ?? 0, limit: options.limit ?? 20 };
  if ((normalized.kind !== undefined && !isAssetKind(normalized.kind)) ||
      !Number.isSafeInteger(normalized.offset) || normalized.offset < 0 ||
      !Number.isSafeInteger(normalized.limit) || normalized.limit < 1 || normalized.limit > 100 ||
      (normalized.query?.length ?? 0) > 500) {
    throw new RangeError("Asset list filters require a public kind, query up to 500 characters, offset >= 0, and limit 1-100.");
  }
  return normalized;
}

function listPath(options: ReturnType<typeof normalizeFilters>): string {
  const query = new URLSearchParams();
  if (options.kind) query.set("kind", options.kind);
  if (options.query !== undefined) query.set("q", options.query);
  query.set("offset", String(options.offset));
  query.set("limit", String(options.limit));
  return `/api/assets?${query.toString()}`;
}

function isRemoteOnly(detail: PublicAssetDetail): boolean {
  return detail.metadata.availability === "remote" || detail.metadata.contentLevel === "remote";
}

function metadataOnly(detail: PublicAssetDetail): PublicAssetDetail {
  if (detail.metadata.availability !== "external" &&
      detail.metadata.availability !== "restricted" &&
      detail.metadata.contentLevel !== "metadata" &&
      detail.metadata.contentLevel !== "restricted") {
    return detail;
  }
  const restricted = detail.metadata.availability === "restricted" || detail.metadata.contentLevel === "restricted";
  return {
    schemaVersion: detail.schemaVersion,
    metadata: { ...detail.metadata, contentLevel: restricted ? "restricted" : "metadata" },
    data: {},
    dependencies: [],
    ...(detail.attribution ?? detail.metadata.attribution
      ? { attribution: detail.attribution ?? detail.metadata.attribution }
      : {}),
    ...(detail.license ?? detail.metadata.license
      ? { license: detail.license ?? detail.metadata.license }
      : {}),
    sourceUrls: detail.sourceUrls ?? detail.metadata.sourceUrls ?? [],
    capabilities: detail.capabilities ?? detail.metadata.capabilities ?? [],
  };
}

function localFallback(
  asset: PublicAssetDetail | null,
  reason: string,
  failureKind: SourceFailureKind,
): Sourced<PublicAssetDetail | null> {
  if (!asset) {
    return { data: null, origin: "bundled", fallbackReason: reason, failureKind };
  }
  if (isRemoteOnly(asset)) {
    return {
      // Keep the bundled catalogue record so callers can still show its
      // identity, license, and official download URL, but mark source retrieval
      // unavailable and never present this metadata as the project files.
      data: metadataOnly(asset),
      origin: "bundled",
      fallbackReason: `${reason}; remote source files are unavailable (bundled metadata only)`,
      failureKind: "unavailable",
    };
  }
  return {
    data: metadataOnly(asset),
    origin: "bundled",
    fallbackReason: reason,
  };
}

function hasCompleteRemoteTemplateSource(asset: PublicAssetDetail): boolean {
  if (asset.metadata.kind !== "template" || asset.metadata.availability !== "remote") return true;
  if (!isRecord(asset.data) || asset.data.sourceFilesIncluded !== true || !isRecord(asset.data.files)) return false;
  const files = asset.data.files;
  const entries = Object.entries(files);
  if (entries.length === 0 || entries.some(([path, content]) =>
    typeof content !== "string" || path.length === 0 || path.startsWith("/") ||
    path.includes("\\") || path.split("/").includes(".."),
  )) return false;
  if (typeof files["app/page.tsx"] !== "string" ||
      typeof files["app/globals.css"] !== "string" ||
      typeof files["package.json"] !== "string") return false;
  try {
    return isRecord(JSON.parse(files["package.json"]));
  } catch {
    return false;
  }
}

/** Fetches the live public list and falls back to the bundled catalogue on failure. */
export async function listPublicAssetsLive(
  options: ListPublicAssetsOptions & RemoteOptions = {},
): Promise<Sourced<PublicAssetListResponse>> {
  const filters = normalizeFilters(options);
  const bundled = listPublicAssets(filters);
  const response = await fetchJson<unknown>(listPath(filters), options, "unsupported");
  if ("error" in response) {
    return {
      data: bundled,
      origin: "bundled",
      fallbackReason: response.error,
      failureKind: response.failureKind,
    };
  }
  if (!isPublicAssetList(response.value)) {
    return {
      data: bundled,
      origin: "bundled",
      fallbackReason: "live asset list returned an invalid schemaVersion 1 response",
      failureKind: "unavailable",
    };
  }
  return { data: response.value, origin: "live" };
}

/**
 * Fetches a namespaced asset detail. Remote templates are only returned when
 * the API supplies real files; external/restricted assets remain metadata-only.
 */
export async function getPublicAssetLive(
  kind: AssetKind,
  id: string,
  options: RemoteOptions = {},
): Promise<Sourced<PublicAssetDetail | null>> {
  if (!isAssetKind(kind) || !/^[a-z0-9][a-z0-9-]{0,127}$/.test(id)) {
    return { data: null, origin: "bundled", fallbackReason: "invalid public asset kind or id", failureKind: "not-found" };
  }
  const bundled = getPublicAsset(kind, id);
  const path = `/api/assets/${encodeURIComponent(kind)}/${encodeURIComponent(id)}`;
  const response = await fetchJson<unknown>(path, options, "not-found");

  if ("error" in response) {
    if (response.failureKind === "not-found") {
      const listed = await listPublicAssetsLive({ ...options, kind, query: id, offset: 0, limit: 100 });
      if (listed.origin === "live") {
        const exists = listed.data.assets.some((asset) => asset.kind === kind && asset.id === id);
        if (!exists) {
          return {
            data: null,
            origin: "live",
            fallbackReason: `asset "${kind}/${id}" was not found in the live catalogue`,
            failureKind: "not-found",
          };
        }
        const reason = `asset "${kind}/${id}" is listed live but its detail endpoint returned HTTP 404`;
        return bundled
          ? localFallback(bundled, `${reason}; using the bundled snapshot`, "unsupported")
          : { data: null, origin: "live", fallbackReason: reason, failureKind: "unsupported" };
      }
      const failureKind = listed.failureKind === "unsupported" ? "unsupported" : "unavailable";
      const reason = `HTTP 404; live asset existence could not be checked: ${listed.fallbackReason ?? "live list unavailable"}`;
      if (bundled) return localFallback(bundled, `${reason}; using the bundled snapshot`, failureKind);
      return {
        data: null,
        origin: "bundled",
        fallbackReason: reason,
        failureKind,
      };
    }
    return localFallback(bundled, response.error, response.failureKind);
  }

  if (!isPublicAssetDetail(response.value, kind, id)) {
    return localFallback(bundled, "live asset detail did not match the requested kind/id or schema", "unavailable");
  }
  if (!hasCompleteRemoteTemplateSource(response.value)) {
    return localFallback(
      bundled,
      "remote template response did not contain its actual source files",
      "unavailable",
    );
  }
  return { data: metadataOnly(response.value), origin: "live" };
}
