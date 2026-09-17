/**
 * Vector storage and cosine search for the style index.
 *
 * Storage choice: the design doc (section 3.2) picks `sqlite-vec`, but this
 * checkout has neither `sqlite-vec` nor a SQLite binding installed, and pulling
 * a native dependency into the build for ~1000 vectors is not a trade worth
 * making. Exhaustive cosine over ~1000 x 1024 floats is a fraction of a
 * millisecond of arithmetic - far below the 150ms P95 budget - so the default
 * implementation is brute force in TypeScript.
 *
 * `VectorStore` is the seam: a sqlite-vec backend implements the same three
 * methods (better-sqlite3 is synchronous, so the signature still fits) and
 * nothing above this file has to change.
 *
 * Vectors are normalised on write, so a search is a plain dot product and the
 * stored magnitudes cannot drift.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StyleChunk, StyleChunkKind, StyleChunkLocale } from "./chunk-styles";

export const VECTOR_STORE_VERSION = 1;
export const DEFAULT_VECTOR_STORE_PATH = path.join(".data", "style-vectors.json");

/** Everything about a chunk except its text, which the chunker re-derives. */
export interface VectorMetadata {
  styleSlug: string;
  kind: StyleChunkKind;
  locale: StyleChunkLocale;
  weight: number;
  contentHash: string;
}

export interface VectorSearchHit {
  id: string;
  /** Cosine similarity in [-1, 1]. */
  score: number;
  metadata: VectorMetadata;
}

export interface VectorStore {
  readonly dimensions: number;
  readonly model: string;
  /** Replaces any existing entries for the given chunk ids. */
  upsert(chunks: readonly StyleChunk[], vectors: ReadonlyArray<readonly number[]>): void;
  /**
   * Most similar chunks first, ties broken by id so results are deterministic.
   *
   * Scores are reported as measured; whether a similarity is good enough to
   * keep is the caller's call. `hybrid-search.ts` explains why it keeps them
   * all and lets rank fusion sort it out instead of applying a cutoff here.
   */
  search(vector: readonly number[], topK: number): VectorSearchHit[];
  size(): number;
}

export interface VectorStoreFile {
  version: number;
  model: string;
  dimensions: number;
  generatedAt: string;
  count: number;
  entries: Array<VectorMetadata & { id: string; vector: number[] }>;
}

export function metadataForChunk(chunk: StyleChunk): VectorMetadata {
  return {
    styleSlug: chunk.styleSlug,
    kind: chunk.kind,
    locale: chunk.locale,
    weight: chunk.weight,
    contentHash: chunk.contentHash,
  };
}

export function dotProduct(left: readonly number[], right: readonly number[]): number {
  let sum = 0;
  for (let index = 0; index < left.length; index += 1) {
    sum += (left[index] as number) * (right[index] as number);
  }
  return sum;
}

export function vectorMagnitude(vector: readonly number[]): number {
  return Math.sqrt(dotProduct(vector, vector));
}

/** Scales a vector to unit length. A zero vector is returned untouched. */
export function normalizeVector(vector: readonly number[]): number[] {
  const magnitude = vectorMagnitude(vector);
  if (magnitude === 0) return [...vector];
  return vector.map((value) => value / magnitude);
}

/**
 * Cosine similarity. Normalises both sides, so it is correct on raw vectors
 * too; the store keeps them normalised and uses `dotProduct` on the hot path.
 */
export function cosineSimilarity(left: readonly number[], right: readonly number[]): number {
  if (left.length !== right.length) {
    throw new Error(`Cannot compare vectors of different sizes: ${left.length} and ${right.length}.`);
  }

  const leftMagnitude = vectorMagnitude(left);
  const rightMagnitude = vectorMagnitude(right);
  if (leftMagnitude === 0 || rightMagnitude === 0) return 0;

  return dotProduct(left, right) / (leftMagnitude * rightMagnitude);
}

interface StoredEntry {
  vector: number[];
  metadata: VectorMetadata;
}

export interface InMemoryVectorStoreOptions {
  dimensions: number;
  model?: string;
}

export class InMemoryVectorStore implements VectorStore {
  readonly dimensions: number;
  readonly model: string;

  protected readonly entries = new Map<string, StoredEntry>();

  constructor(options: InMemoryVectorStoreOptions) {
    if (!Number.isInteger(options.dimensions) || options.dimensions <= 0) {
      throw new Error(`Vector store needs a positive integer dimension, got ${options.dimensions}.`);
    }
    this.dimensions = options.dimensions;
    this.model = options.model ?? "unknown";
  }

  upsert(chunks: readonly StyleChunk[], vectors: ReadonlyArray<readonly number[]>): void {
    if (chunks.length !== vectors.length) {
      throw new Error(`Received ${vectors.length} vectors for ${chunks.length} chunks.`);
    }

    chunks.forEach((chunk, index) => {
      const vector = vectors[index] as readonly number[];
      if (vector.length !== this.dimensions) {
        throw new Error(
          `Chunk ${chunk.id} has ${vector.length} dimensions, but this store holds ${this.dimensions}.`,
        );
      }
      this.entries.set(chunk.id, { vector: normalizeVector(vector), metadata: metadataForChunk(chunk) });
    });
  }

  search(vector: readonly number[], topK: number): VectorSearchHit[] {
    if (vector.length !== this.dimensions) {
      throw new Error(
        `Query vector has ${vector.length} dimensions, but this store holds ${this.dimensions}. Rebuild the index.`,
      );
    }
    if (topK <= 0 || this.entries.size === 0) return [];

    const query = normalizeVector(vector);
    const hits: VectorSearchHit[] = [];
    for (const [id, entry] of this.entries) {
      hits.push({ id, score: dotProduct(query, entry.vector), metadata: entry.metadata });
    }

    hits.sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));
    return hits.slice(0, topK);
  }

  size(): number {
    return this.entries.size;
  }

  has(id: string): boolean {
    return this.entries.has(id);
  }

  ids(): string[] {
    return [...this.entries.keys()].sort();
  }

  clear(): void {
    this.entries.clear();
  }

  /** Drops entries whose id is not in `ids`, so a rebuild cannot leave orphans behind. */
  retainOnly(ids: ReadonlySet<string>): number {
    let removed = 0;
    for (const id of [...this.entries.keys()]) {
      if (ids.has(id)) continue;
      this.entries.delete(id);
      removed += 1;
    }
    return removed;
  }
}

export interface JsonFileVectorStoreOptions extends InMemoryVectorStoreOptions {
  filePath?: string;
  readFileImpl?: typeof readFile;
  writeFileImpl?: typeof writeFile;
  mkdirImpl?: typeof mkdir;
}

/**
 * JSON-backed store used by the index build and by anything that needs the
 * vectors without an embedding call.
 *
 * The whole index is loaded eagerly into memory: ~1000 vectors at 1024
 * dimensions is a few megabytes, and brute force needs them resident anyway.
 */
export class JsonFileVectorStore extends InMemoryVectorStore {
  readonly filePath: string;

  private readonly readFileImpl: typeof readFile;
  private readonly writeFileImpl: typeof writeFile;
  private readonly mkdirImpl: typeof mkdir;
  private generatedAt: string | null = null;

  constructor(options: JsonFileVectorStoreOptions) {
    super(options);
    this.filePath = options.filePath ?? DEFAULT_VECTOR_STORE_PATH;
    this.readFileImpl = options.readFileImpl ?? readFile;
    this.writeFileImpl = options.writeFileImpl ?? writeFile;
    this.mkdirImpl = options.mkdirImpl ?? mkdir;
  }

  /**
   * Loads an existing index, or returns an empty store when there is none.
   *
   * A dimensionality or model mismatch is an error rather than an empty store:
   * that combination means the index is stale and every query would rank
   * nonsense, so it is better to fail with an instruction to rebuild.
   */
  static async open(options: JsonFileVectorStoreOptions): Promise<JsonFileVectorStore> {
    const store = new JsonFileVectorStore(options);

    let raw: string;
    try {
      raw = await store.readFileImpl(store.filePath, "utf8");
    } catch {
      return store;
    }

    const parsed = JSON.parse(raw) as Partial<VectorStoreFile>;
    if (parsed.dimensions !== store.dimensions) {
      throw new Error(
        `Vector index at ${store.filePath} holds ${parsed.dimensions ?? "?"} dimensions, expected ${store.dimensions}. Rebuild it.`,
      );
    }
    if (parsed.model && parsed.model !== store.model) {
      throw new Error(
        `Vector index at ${store.filePath} was built with ${parsed.model}, expected ${store.model}. Rebuild it.`,
      );
    }

    for (const entry of parsed.entries ?? []) {
      if (!entry?.id || !Array.isArray(entry.vector) || entry.vector.length !== store.dimensions) continue;
      const { id, vector, ...metadata } = entry;
      store.entries.set(id, {
        vector: normalizeVector(vector),
        metadata: {
          styleSlug: metadata.styleSlug,
          kind: metadata.kind,
          locale: metadata.locale,
          weight: metadata.weight,
          contentHash: metadata.contentHash,
        },
      });
    }

    store.generatedAt = parsed.generatedAt ?? null;
    return store;
  }

  get lastBuiltAt(): string | null {
    return this.generatedAt;
  }

  async save(): Promise<{ filePath: string; entries: number; bytes: number }> {
    const entries: VectorStoreFile["entries"] = [];
    for (const [id, entry] of [...this.entries].sort(([left], [right]) => left.localeCompare(right))) {
      entries.push({ id, ...entry.metadata, vector: entry.vector });
    }

    this.generatedAt = new Date().toISOString();
    const payload: VectorStoreFile = {
      version: VECTOR_STORE_VERSION,
      model: this.model,
      dimensions: this.dimensions,
      generatedAt: this.generatedAt,
      count: entries.length,
      entries,
    };

    const serialized = `${JSON.stringify(payload)}\n`;
    const resolved = path.resolve(this.filePath);
    await this.mkdirImpl(path.dirname(resolved), { recursive: true });
    await this.writeFileImpl(this.filePath, serialized, "utf8");

    return { filePath: this.filePath, entries: entries.length, bytes: Buffer.byteLength(serialized, "utf8") };
  }
}
