/**
 * Embedding provider for the retrieval layer.
 *
 * DashScope (`text-embedding-v4`, 1024 dimensions) is the first implementation,
 * behind `EmbeddingProvider` so a local model (`bge-m3`, per the design doc's
 * fallback) can be dropped in without touching the callers.
 *
 * This module is plain Node: it uses global `fetch` and `node:fs`, and must not
 * import anything from Next.js, so it can run from `tools/scripts/*` and from
 * the app alike.
 *
 * Nothing here is called at import time, and nothing calls the API on its own -
 * only `embed()` does, which is why tests use a fake provider.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StyleChunk } from "./chunk-styles";

export const DEFAULT_EMBEDDING_MODEL = "text-embedding-v4";
export const DEFAULT_EMBEDDING_DIMENSIONS = 1024;
export const DEFAULT_EMBEDDING_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
export const DEFAULT_EMBEDDING_CACHE_PATH = path.join(".data", "style-embeddings.json");
export const EMBEDDING_CACHE_VERSION = 1;

/**
 * DashScope's OpenAI-compatible embedding endpoint accepts at most 10 inputs per
 * request.
 *
 * This was 25, taken from the design doc's estimate. Every unit test passed with
 * it because they inject a fake provider, so nothing exercised the real limit —
 * the first live run died on HTTP 400: "batch size is invalid, it should not be
 * larger than 10". Verified against the live endpoint, not the docs.
 */
export const MAX_BATCH_SIZE = 10;
export const DEFAULT_CONCURRENCY = 3;
export const DEFAULT_MAX_ATTEMPTS = 3;
export const DEFAULT_RETRY_DELAY_MS = 500;
export const DEFAULT_TIMEOUT_MS = 30_000;

export type EmbeddingErrorCode = "CONFIGURATION_ERROR" | "UPSTREAM_ERROR" | "INVALID_RESPONSE";

export class EmbeddingError extends Error {
  constructor(
    message: string,
    public readonly code: EmbeddingErrorCode,
    public readonly status = 502,
    /** Whether retrying the same request could plausibly succeed. */
    public readonly retryable = false,
  ) {
    super(message);
    this.name = "EmbeddingError";
  }
}

export interface EmbeddingProvider {
  /** Identifies the implementation, e.g. `dashscope`. */
  readonly id: string;
  readonly model: string;
  readonly dimensions: number;
  /** One vector per input text, in the same order. */
  embed(texts: readonly string[]): Promise<number[][]>;
}

export interface DashScopeConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  dimensions: number;
}

/**
 * Reads the credentials from the environment.
 *
 * Throws rather than returning a disabled provider: a missing key in the index
 * build is a mistake worth failing loudly on, while a missing key at query time
 * is handled by the hybrid search's degradation chain.
 */
export function resolveDashScopeConfig(
  // Structural rather than `NodeJS.ProcessEnv`: this module stays usable from
  // any runtime, and tests can pass a plain object.
  env: Readonly<Record<string, string | undefined>> = process.env,
  overrides: Partial<DashScopeConfig> = {},
): DashScopeConfig {
  const apiKey = (overrides.apiKey ?? env.DASHSCOPE_API_KEY ?? "").trim();
  if (!apiKey) {
    throw new EmbeddingError(
      "DASHSCOPE_API_KEY is not set. Export it before building the style index, or inject a custom EmbeddingProvider.",
      "CONFIGURATION_ERROR",
      503,
    );
  }

  return {
    apiKey,
    baseUrl: overrides.baseUrl ?? env.DASHSCOPE_BASE_URL ?? DEFAULT_EMBEDDING_BASE_URL,
    model: overrides.model ?? DEFAULT_EMBEDDING_MODEL,
    dimensions: overrides.dimensions ?? DEFAULT_EMBEDDING_DIMENSIONS,
  };
}

/** OpenAI-compatible deployments expect the full path; tolerate either form. */
export function resolveEmbeddingsEndpoint(baseUrl: string): string {
  const trimmed = baseUrl.trim().replace(/\/+$/u, "");
  return trimmed.endsWith("/embeddings") ? trimmed : `${trimmed}/embeddings`;
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

function chunkArray<T>(items: readonly T[], size: number): T[][] {
  const batches: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

async function runWithConcurrency<T>(
  items: readonly T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let cursor = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      await worker(items[index] as T, index);
    }
  });
  await Promise.all(workers);
}

async function withRetry<T>(
  operation: (attempt: number) => Promise<T>,
  options: { maxAttempts: number; retryDelayMs: number; sleep: (ms: number) => Promise<void> },
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      lastError = error;
      const retryable = error instanceof EmbeddingError ? error.retryable : true;
      if (!retryable || attempt === options.maxAttempts) throw error;
      // Exponential backoff: 500ms, 1s, 2s ...
      await options.sleep(options.retryDelayMs * 2 ** (attempt - 1));
    }
  }

  throw lastError;
}

function parseEmbeddingsResponse(payload: unknown, expected: number, dimensions: number): number[][] {
  const data = (payload as { data?: unknown } | null)?.data;
  if (!Array.isArray(data) || data.length !== expected) {
    const actual = Array.isArray(data) ? data.length : "none";
    throw new EmbeddingError(
      `Embedding response contained ${actual} vectors, expected ${expected}.`,
      "INVALID_RESPONSE",
    );
  }

  const ordered = data.map((entry, fallbackIndex) => {
    const record = entry as { index?: unknown; embedding?: unknown } | null;
    const embedding = record?.embedding;
    if (!Array.isArray(embedding) || embedding.some((value) => typeof value !== "number")) {
      throw new EmbeddingError("Embedding response contained a malformed vector.", "INVALID_RESPONSE");
    }
    if (embedding.length !== dimensions) {
      throw new EmbeddingError(
        `Embedding response returned ${embedding.length} dimensions, expected ${dimensions}.`,
        "INVALID_RESPONSE",
      );
    }
    return {
      index: typeof record?.index === "number" ? record.index : fallbackIndex,
      embedding: embedding as number[],
    };
  });

  // The API is allowed to answer out of order; the contract here is positional.
  ordered.sort((left, right) => left.index - right.index);
  return ordered.map((entry) => entry.embedding);
}

export interface DashScopeEmbeddingOptions {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  dimensions?: number;
  env?: Readonly<Record<string, string | undefined>>;
  fetchImpl?: typeof fetch;
  batchSize?: number;
  concurrency?: number;
  maxAttempts?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
  /** Injected by tests so backoff does not actually sleep. */
  sleep?: (ms: number) => Promise<void>;
  onProgress?: (progress: { completed: number; total: number }) => void;
}

export function createDashScopeEmbeddingProvider(options: DashScopeEmbeddingOptions = {}): EmbeddingProvider {
  const config = resolveDashScopeConfig(options.env ?? process.env, {
    apiKey: options.apiKey,
    baseUrl: options.baseUrl,
    model: options.model,
    dimensions: options.dimensions,
  });

  const fetchImpl = options.fetchImpl ?? fetch;
  const batchSize = Math.max(1, Math.min(options.batchSize ?? MAX_BATCH_SIZE, MAX_BATCH_SIZE));
  const concurrency = Math.max(1, options.concurrency ?? DEFAULT_CONCURRENCY);
  const maxAttempts = Math.max(1, options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  const retryDelayMs = options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const endpoint = resolveEmbeddingsEndpoint(config.baseUrl);

  async function requestBatch(texts: readonly string[]): Promise<number[][]> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: config.model,
          input: [...texts],
          dimensions: config.dimensions,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const retryable = response.status === 429 || response.status >= 500;
        throw new EmbeddingError(
          `DashScope embeddings request failed with HTTP ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
          "UPSTREAM_ERROR",
          response.status,
          retryable,
        );
      }

      return parseEmbeddingsResponse(await response.json(), texts.length, config.dimensions);
    } catch (error) {
      if (error instanceof EmbeddingError) throw error;
      if (isAbortError(error)) {
        throw new EmbeddingError("DashScope embeddings request timed out.", "UPSTREAM_ERROR", 504, true);
      }
      throw new EmbeddingError("DashScope embeddings request failed.", "UPSTREAM_ERROR", 502, true);
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    id: "dashscope",
    model: config.model,
    dimensions: config.dimensions,

    async embed(texts: readonly string[]): Promise<number[][]> {
      if (texts.length === 0) return [];

      texts.forEach((text, index) => {
        if (typeof text !== "string" || !text.trim()) {
          throw new EmbeddingError(`Embedding input at index ${index} is empty.`, "CONFIGURATION_ERROR");
        }
      });

      const batches = chunkArray(texts, batchSize);
      const vectors: number[][] = new Array(texts.length);
      let completed = 0;

      await runWithConcurrency(batches, concurrency, async (batch, batchIndex) => {
        const batchVectors = await withRetry(() => requestBatch(batch), { maxAttempts, retryDelayMs, sleep });
        const offset = batchIndex * batchSize;
        batchVectors.forEach((vector, index) => {
          vectors[offset + index] = vector;
        });
        completed += batch.length;
        options.onProgress?.({ completed, total: texts.length });
      });

      return vectors;
    },
  };
}

export interface EmbeddingCacheFile {
  version: number;
  model: string;
  dimensions: number;
  updatedAt: string;
  entries: Record<string, number[]>;
}

export interface EmbeddingCacheOptions {
  filePath?: string;
  model: string;
  dimensions: number;
  readFileImpl?: typeof readFile;
  writeFileImpl?: typeof writeFile;
  mkdirImpl?: typeof mkdir;
}

/**
 * Content-addressed vector cache: `contentHash -> vector`.
 *
 * Style copy changes often, but any chunk whose text is untouched keeps its
 * hash and therefore its vector, so a rebuild only pays for what actually
 * changed. Vectors from a different model or dimensionality are dropped on
 * load - they are not comparable and silently mixing them would corrupt
 * rankings.
 */
export class EmbeddingCache {
  private readonly entries = new Map<string, number[]>();
  private readonly filePath: string;
  private readonly model: string;
  private readonly dimensions: number;
  private readonly readFileImpl: typeof readFile;
  private readonly writeFileImpl: typeof writeFile;
  private readonly mkdirImpl: typeof mkdir;

  readonly warnings: string[] = [];

  constructor(options: EmbeddingCacheOptions) {
    this.filePath = options.filePath ?? DEFAULT_EMBEDDING_CACHE_PATH;
    this.model = options.model;
    this.dimensions = options.dimensions;
    this.readFileImpl = options.readFileImpl ?? readFile;
    this.writeFileImpl = options.writeFileImpl ?? writeFile;
    this.mkdirImpl = options.mkdirImpl ?? mkdir;
  }

  static async load(options: EmbeddingCacheOptions): Promise<EmbeddingCache> {
    const cache = new EmbeddingCache(options);

    let raw: string;
    try {
      raw = await cache.readFileImpl(cache.filePath, "utf8");
    } catch {
      // No cache yet: the first build simply computes everything.
      return cache;
    }

    let parsed: Partial<EmbeddingCacheFile>;
    try {
      parsed = JSON.parse(raw) as Partial<EmbeddingCacheFile>;
    } catch {
      cache.warnings.push(`Ignoring unreadable embedding cache at ${cache.filePath}.`);
      return cache;
    }

    if (parsed.model !== cache.model || parsed.dimensions !== cache.dimensions) {
      cache.warnings.push(
        `Embedding cache at ${cache.filePath} was built with ${parsed.model ?? "unknown"}@${parsed.dimensions ?? "?"}; rebuilding for ${cache.model}@${cache.dimensions}.`,
      );
      return cache;
    }

    for (const [hash, vector] of Object.entries(parsed.entries ?? {})) {
      if (Array.isArray(vector) && vector.length === cache.dimensions) cache.entries.set(hash, vector);
    }

    return cache;
  }

  get size(): number {
    return this.entries.size;
  }

  get(hash: string): number[] | undefined {
    return this.entries.get(hash);
  }

  set(hash: string, vector: readonly number[]): void {
    if (vector.length !== this.dimensions) {
      throw new EmbeddingError(
        `Refusing to cache a ${vector.length}-dimension vector; this cache holds ${this.dimensions}.`,
        "CONFIGURATION_ERROR",
      );
    }
    this.entries.set(hash, [...vector]);
  }

  async save(): Promise<{ filePath: string; entries: number }> {
    const payload: EmbeddingCacheFile = {
      version: EMBEDDING_CACHE_VERSION,
      model: this.model,
      dimensions: this.dimensions,
      updatedAt: new Date().toISOString(),
      entries: Object.fromEntries(this.entries),
    };

    await this.mkdirImpl(path.dirname(path.resolve(this.filePath)), { recursive: true });
    await this.writeFileImpl(this.filePath, `${JSON.stringify(payload)}\n`, "utf8");
    return { filePath: this.filePath, entries: this.entries.size };
  }
}

export interface EmbedChunksOptions {
  cache?: EmbeddingCache;
  onProgress?: (progress: { completed: number; total: number; cached: number; embedded: number }) => void;
}

export interface EmbedChunksResult {
  /** One vector per chunk, aligned by index with the input. */
  vectors: number[][];
  /** Distinct texts that had to be sent to the provider. */
  embedded: number;
  /** Distinct texts answered from the cache. */
  cached: number;
}

/**
 * Embeds chunks, reusing anything already cached and de-duplicating identical
 * texts within the run (chunk ids differ, `contentHash` does not).
 */
export async function embedChunks(
  chunks: readonly StyleChunk[],
  provider: EmbeddingProvider,
  options: EmbedChunksOptions = {},
): Promise<EmbedChunksResult> {
  const { cache } = options;

  // hash -> the texts that still need a vector
  const pending = new Map<string, string>();
  const resolved = new Map<string, number[]>();
  let cachedCount = 0;

  for (const chunk of chunks) {
    const hash = chunk.contentHash;
    if (resolved.has(hash) || pending.has(hash)) continue;

    const hit = cache?.get(hash);
    if (hit) {
      resolved.set(hash, hit);
      cachedCount += 1;
    } else {
      pending.set(hash, chunk.text);
    }
  }

  const hashes = [...pending.keys()];
  const total = hashes.length + cachedCount;

  if (hashes.length > 0) {
    const vectors = await provider.embed(hashes.map((hash) => pending.get(hash) as string));
    if (vectors.length !== hashes.length) {
      throw new EmbeddingError(
        `Provider returned ${vectors.length} vectors for ${hashes.length} inputs.`,
        "INVALID_RESPONSE",
      );
    }

    hashes.forEach((hash, index) => {
      const vector = vectors[index] as number[];
      if (vector.length !== provider.dimensions) {
        throw new EmbeddingError(
          `Provider returned ${vector.length}-dimension vectors, expected ${provider.dimensions}.`,
          "INVALID_RESPONSE",
        );
      }
      resolved.set(hash, vector);
      cache?.set(hash, vector);
    });
  }

  options.onProgress?.({ completed: total, total, cached: cachedCount, embedded: hashes.length });

  return {
    vectors: chunks.map((chunk) => resolved.get(chunk.contentHash) as number[]),
    embedded: hashes.length,
    cached: cachedCount,
  };
}
