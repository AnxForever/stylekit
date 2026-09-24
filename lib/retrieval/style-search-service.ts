/**
 * @module retrieval/style-search-service
 *
 * The production entry point for hybrid style search (BM25 + vector + RRF).
 *
 * `hybrid-search.ts` is the algorithm; this module is the wiring a server
 * process needs around it: one corpus index per process, the vector index read
 * from disk, and the embedding provider built from the environment.
 *
 * Every missing piece degrades rather than fails. No `DASHSCOPE_API_KEY`, no
 * `.data/style-vectors.json`, an index built for another model, or a slow
 * embedding call all fall back to the keyword path, and the response says
 * which one answered. That keeps search available on a host that has not been
 * given the key yet.
 */

import { chunkStyles } from "@/lib/retrieval/chunk-styles";
import {
  DEFAULT_EMBEDDING_DIMENSIONS,
  DEFAULT_EMBEDDING_MODEL,
  createDashScopeEmbeddingProvider,
  type EmbeddingProvider,
} from "@/lib/retrieval/embedding";
import {
  createHybridSearcher,
  type DegradeReason,
  type HybridSearcher,
} from "@/lib/retrieval/hybrid-search";
import { JsonFileVectorStore, type VectorStore } from "@/lib/retrieval/vector-store";
import { styles } from "@/lib/styles/registry";

/** A query answered from the network should not wait on a slow embedding. */
const QUERY_EMBEDDING_TIMEOUT_MS = 1_500;
const QUERY_CACHE_LIMIT = 500;

export type StyleSearchMode = "hybrid" | "keyword";

export interface StyleSearchResult {
  mode: StyleSearchMode;
  /** Set when the vector path was unavailable for this query. */
  degradeReason?: DegradeReason;
  results: Array<{ slug: string; score: number }>;
}

interface ServiceState {
  searcher: HybridSearcher;
  /** Why the vector path is off for every query, when it is. */
  staticDegrade?: DegradeReason;
}

let statePromise: Promise<ServiceState> | null = null;
const queryCache = new Map<string, StyleSearchResult>();

function createProvider(): EmbeddingProvider | null {
  try {
    return createDashScopeEmbeddingProvider({ timeoutMs: QUERY_EMBEDDING_TIMEOUT_MS, maxAttempts: 1 });
  } catch {
    return null;
  }
}

async function openVectorStore(): Promise<VectorStore | null> {
  try {
    const store = await JsonFileVectorStore.open({
      dimensions: DEFAULT_EMBEDDING_DIMENSIONS,
      model: DEFAULT_EMBEDDING_MODEL,
    });
    return store.size() > 0 ? store : null;
  } catch {
    // A stale index (other model or dimensions) is unusable, not fatal.
    return null;
  }
}

async function buildState(): Promise<ServiceState> {
  const provider = createProvider();
  const vectorStore = await openVectorStore();
  const searcher = createHybridSearcher({
    chunks: chunkStyles(styles),
    embeddingProvider: vectorStore ? provider : null,
    vectorStore,
    topK: styles.length,
    vectorTimeoutMs: QUERY_EMBEDDING_TIMEOUT_MS,
  });
  const staticDegrade: DegradeReason | undefined = !provider ? "no-provider" : !vectorStore ? "no-store" : undefined;
  return { searcher, staticDegrade };
}

function getState(): Promise<ServiceState> {
  if (!statePromise) {
    statePromise = buildState().catch((error: unknown) => {
      statePromise = null;
      throw error;
    });
  }
  return statePromise;
}

export async function searchStyleSlugs(query: string): Promise<StyleSearchResult> {
  const key = query.trim().toLowerCase();
  const cached = queryCache.get(key);
  if (cached) return cached;

  const { searcher, staticDegrade } = await getState();
  let degradeReason: DegradeReason | undefined = staticDegrade;
  const hits = await searcher.search(key, {
    onDegrade: (info) => {
      degradeReason ??= info.reason;
    },
  });

  const result: StyleSearchResult = {
    mode: degradeReason ? "keyword" : "hybrid",
    ...(degradeReason ? { degradeReason } : {}),
    results: hits.map((hit) => ({ slug: hit.slug, score: hit.score })),
  };

  // Only full-quality answers are cached, so a transient embedding failure
  // does not pin a keyword-only ranking for that query.
  if (result.mode === "hybrid" || staticDegrade) {
    if (queryCache.size >= QUERY_CACHE_LIMIT) {
      const oldest = queryCache.keys().next().value;
      if (oldest !== undefined) queryCache.delete(oldest);
    }
    queryCache.set(key, result);
  }
  return result;
}

/** Exposed for tests. */
export function resetStyleSearchService(): void {
  statePromise = null;
  queryCache.clear();
}
