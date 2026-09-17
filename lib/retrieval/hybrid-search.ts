/**
 * Hybrid retrieval: BM25 over the chunk corpus fused with vector search.
 *
 * Two retrievers look at the same chunks - a lexical one (BM25) and a semantic
 * one (cosine over the embedding index) - and their rankings are combined with
 * Reciprocal Rank Fusion (design doc section 3.3). RRF only reads ranks, which
 * is the point: BM25 scores are unbounded and cosine lives in [-1, 1], so
 * anything that adds the two would need per-corpus normalisation and would be
 * sensitive to the score distribution.
 *
 * Locale then multiplies the fused score: a chunk written in the query's own
 * language gets a nudge - a nudge, not a filter, because dropping the other
 * language would throw away the cross-language recall the shared vector space
 * exists to provide.
 *
 * Chunk kind no longer multiplies anything. Section 2.2 asked for it, but the
 * evaluation set says it destroys retrieval: RRF scores live in
 * [1/(k + 1), 1/(k + candidateLimit)], so with k = 60 a 1.2 weight is enough to
 * lift a rank-11 philosophy chunk above the rank-1 identity chunk, and 28 of
 * the 60 labelled queries changed their top answer once it was applied. The
 * measurement is in `tools/scripts/evaluate-retrieval.ts`; the `chunkWeights`
 * option below is kept only so the signature does not move.
 *
 * The vector retriever returns its top-K by cosine similarity with no score
 * cutoff, so with a small corpus a chunk of similarity 0 - or negative - is
 * still a candidate. That is deliberate, not an oversight:
 *
 *   - a cutoff needs calibrating per embedding model (the same number means
 *     different things for `text-embedding-v4` and for a local `bge-m3`) and
 *     would rot silently the day the provider changes;
 *   - it reintroduces the score-scale sensitivity RRF was chosen to avoid
 *     (section 3.3), since cosine distributions are model specific;
 *   - rank fusion already bounds the damage. The weakest vector candidate
 *     contributes 1/(k + candidateLimit), far below any rank-1 keyword hit, so
 *     an unrelated chunk cannot climb over real lexical evidence - it can only
 *     fill the tail when nothing better exists, which is the behaviour we want
 *     for a query unlike anything in the corpus.
 *
 * `candidateLimit` is the knob for how deep that tail runs; judging relevance
 * is the reranker's job (section 3.4), not a hardcoded constant's.
 *
 * Degradation chain (section 4): if the vector path is unavailable, slow, or
 * throws, the keyword ranking is returned on its own with `degraded: true`. If
 * both paths come back empty the result is empty, which is exactly what the
 * current keyword-only matcher does - no regression for the LLM downstream.
 */

import { type StyleChunk, type StyleChunkKind, type StyleChunkLocale } from "./chunk-styles";
import type { EmbeddingProvider } from "./embedding";
import { detectLocale, tokenizeForSearch, type TextLocale } from "./tokenize";
import type { VectorSearchHit, VectorStore } from "./vector-store";

export const DEFAULT_RRF_K = 60;
export const DEFAULT_TOP_K = 10;
export const DEFAULT_CANDIDATE_LIMIT = 50;
export const DEFAULT_LOCALE_BOOST = 1.1;
export const DEFAULT_VECTOR_TIMEOUT_MS = 3000;
export const BM25_K1 = 1.2;
export const BM25_B = 0.75;

export interface Bm25Hit {
  id: string;
  score: number;
  /** 1-based, used directly by RRF. */
  rank: number;
}

export interface Bm25Options {
  k1?: number;
  b?: number;
}

/**
 * Okapi BM25 over chunk texts.
 *
 * Built once per corpus and reused across queries; construction tokenizes every
 * chunk, so `createHybridSearcher` is the right entry point when serving more
 * than one query.
 */
export class Bm25Index {
  private readonly k1: number;
  private readonly b: number;
  private readonly documentIds: string[] = [];
  private readonly documentLengths: number[] = [];
  private readonly postings = new Map<string, Map<number, number>>();
  private totalLength = 0;

  constructor(chunks: readonly StyleChunk[], options: Bm25Options = {}) {
    this.k1 = options.k1 ?? BM25_K1;
    this.b = options.b ?? BM25_B;

    for (const chunk of chunks) {
      const tokens = tokenizeForSearch(chunk.text);
      const documentIndex = this.documentIds.length;
      this.documentIds.push(chunk.id);
      this.documentLengths.push(tokens.length);
      this.totalLength += tokens.length;

      const termFrequency = new Map<string, number>();
      for (const token of tokens) {
        termFrequency.set(token, (termFrequency.get(token) ?? 0) + 1);
      }
      for (const [term, frequency] of termFrequency) {
        let posting = this.postings.get(term);
        if (!posting) {
          posting = new Map();
          this.postings.set(term, posting);
        }
        posting.set(documentIndex, frequency);
      }
    }
  }

  get size(): number {
    return this.documentIds.length;
  }

  private get averageLength(): number {
    // A corpus of empty documents would divide by zero; 1 keeps the length
    // normalisation neutral instead of producing NaN scores.
    return this.size === 0 ? 1 : Math.max(this.totalLength / this.size, 1);
  }

  search(query: string, limit: number): Bm25Hit[] {
    if (limit <= 0 || this.size === 0) return [];

    // Duplicate query terms would double count the same evidence.
    const terms = [...new Set(tokenizeForSearch(query))];
    if (terms.length === 0) return [];

    const scores = new Map<number, number>();
    const averageLength = this.averageLength;

    for (const term of terms) {
      const posting = this.postings.get(term);
      if (!posting) continue;

      const documentFrequency = posting.size;
      const idf = Math.log(1 + (this.size - documentFrequency + 0.5) / (documentFrequency + 0.5));

      for (const [documentIndex, frequency] of posting) {
        const length = this.documentLengths[documentIndex] as number;
        const denominator = frequency + this.k1 * (1 - this.b + (this.b * length) / averageLength);
        const contribution = idf * ((frequency * (this.k1 + 1)) / denominator);
        scores.set(documentIndex, (scores.get(documentIndex) ?? 0) + contribution);
      }
    }

    return [...scores.entries()]
      .map(([documentIndex, score]) => ({ id: this.documentIds[documentIndex] as string, score }))
      .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
      .slice(0, limit)
      .map((hit, index) => ({ ...hit, rank: index + 1 }));
  }
}

/**
 * `score(d) = sum over retrievers of 1 / (k + rank_r(d))`, rank being 1-based.
 *
 * A document missing from a ranking simply contributes nothing, so a result
 * found by only one retriever still scores.
 */
export function reciprocalRankFusion(
  rankings: ReadonlyArray<readonly string[]>,
  k: number = DEFAULT_RRF_K,
): Map<string, number> {
  const scores = new Map<string, number>();

  for (const ranking of rankings) {
    ranking.forEach((id, index) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + index + 1));
    });
  }

  return scores;
}

export type DegradeReason =
  | "no-provider"
  | "no-store"
  | "embedding-failed"
  | "embedding-timeout"
  | "vector-search-failed";

export interface DegradeInfo {
  reason: DegradeReason;
  message: string;
}

export interface SearchHit {
  slug: string;
  score: number;
  /** Contributing chunks, strongest first. */
  chunkIds: string[];
  kinds: StyleChunkKind[];
  locales: StyleChunkLocale[];
  /** Best keyword rank for this style, or null when only the vector path found it. */
  keywordRank: number | null;
  /** Best vector rank for this style, or null when only the keyword path found it. */
  vectorRank: number | null;
  /** True when the vector path was unavailable, so `score` is keyword-only. */
  degraded: boolean;
}

export interface HybridSearchOptions {
  chunks: readonly StyleChunk[];
  vectorStore?: VectorStore | null;
  embeddingProvider?: EmbeddingProvider | null;
  /** Number of styles to return. Defaults to 10. */
  topK?: number;
  /** Candidates taken from each retriever before fusion. Defaults to 50. */
  candidateLimit?: number;
  rrfK?: number;
  localeBoost?: number;
  /**
   * @deprecated No longer read. Chunk-kind weighting is measured to hurt
   * retrieval (see the file header); the field stays so callers that still
   * pass it keep compiling. Safe to delete once nothing references it.
   */
  chunkWeights?: Readonly<Record<StyleChunkKind, number>>;
  vectorTimeoutMs?: number;
  onDegrade?: (info: DegradeInfo) => void;
  /** Reserved hook for a cross-encoder or LLM reranker (design doc section 3.4). */
  rerank?: (
    query: string,
    hits: readonly SearchHit[],
  ) => readonly SearchHit[] | Promise<readonly SearchHit[]>;
}

export interface HybridSearcher {
  search(query: string, overrides?: Partial<Omit<HybridSearchOptions, "chunks">>): Promise<SearchHit[]>;
  readonly chunkCount: number;
  readonly styleCount: number;
}

export class RetrievalTimeoutError extends Error {
  constructor(
    public readonly label: string,
    public readonly timeoutMs: number,
  ) {
    super(`${label} exceeded ${timeoutMs}ms.`);
    this.name = "RetrievalTimeoutError";
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return promise;

  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new RetrievalTimeoutError(label, timeoutMs)), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

interface FusedContribution {
  chunk: StyleChunk;
  score: number;
}

interface StyleAggregate {
  slug: string;
  score: number;
  contributions: FusedContribution[];
  keywordRank: number | null;
  vectorRank: number | null;
}

/**
 * Builds the corpus index once and answers many queries against it.
 *
 * Prefer this over the one-shot `hybridSearch` anywhere a process serves more
 * than a single lookup - constructing the BM25 index re-tokenizes the whole
 * corpus.
 */
export function createHybridSearcher(options: HybridSearchOptions): HybridSearcher {
  const chunks = options.chunks;
  const index = new Bm25Index(chunks);
  const chunkById = new Map(chunks.map((chunk) => [chunk.id, chunk]));
  const styleCount = new Set(chunks.map((chunk) => chunk.styleSlug)).size;

  async function search(
    query: string,
    overrides: Partial<Omit<HybridSearchOptions, "chunks">> = {},
  ): Promise<SearchHit[]> {
    const topK = overrides.topK ?? options.topK ?? DEFAULT_TOP_K;
    if (topK <= 0 || chunks.length === 0) return [];

    const candidateLimit = Math.max(1, overrides.candidateLimit ?? options.candidateLimit ?? DEFAULT_CANDIDATE_LIMIT);
    const rrfK = overrides.rrfK ?? options.rrfK ?? DEFAULT_RRF_K;
    const localeBoost = overrides.localeBoost ?? options.localeBoost ?? DEFAULT_LOCALE_BOOST;
    const timeoutMs = overrides.vectorTimeoutMs ?? options.vectorTimeoutMs ?? DEFAULT_VECTOR_TIMEOUT_MS;
    const onDegrade = overrides.onDegrade ?? options.onDegrade;
    const rerank = overrides.rerank ?? options.rerank;

    const provider = overrides.embeddingProvider ?? options.embeddingProvider;
    const store = overrides.vectorStore ?? options.vectorStore;

    const queryLocale: TextLocale = detectLocale(query);
    const keywordHits = index.search(query, candidateLimit);
    const keywordRankById = new Map(keywordHits.map((hit) => [hit.id, hit.rank]));

    let vectorHits: VectorSearchHit[] = [];
    let degraded = false;
    const degrade = (info: DegradeInfo): void => {
      degraded = true;
      onDegrade?.(info);
    };

    if (!provider) {
      degrade({ reason: "no-provider", message: "No embedding provider configured; serving keyword results only." });
    } else if (!store) {
      degrade({ reason: "no-store", message: "No vector store configured; serving keyword results only." });
    } else {
      let queryVector: number[] | undefined;
      try {
        const vectors = await withTimeout(provider.embed([query]), timeoutMs, "query embedding");
        queryVector = vectors[0];
        if (!queryVector) {
          throw new Error("Embedding provider returned no vector for the query.");
        }
      } catch (error) {
        degrade({
          reason: error instanceof RetrievalTimeoutError ? "embedding-timeout" : "embedding-failed",
          message: `Query embedding failed (${errorMessage(error)}); serving keyword results only.`,
        });
      }

      if (queryVector) {
        try {
          vectorHits = store.search(queryVector, candidateLimit);
        } catch (error) {
          degrade({
            reason: "vector-search-failed",
            message: `Vector search failed (${errorMessage(error)}); serving keyword results only.`,
          });
        }
      }
    }

    const vectorRankById = new Map(vectorHits.map((hit, index) => [hit.id, index + 1]));
    const fused = reciprocalRankFusion([keywordHits.map((hit) => hit.id), vectorHits.map((hit) => hit.id)], rrfK);

    const bySlug = new Map<string, StyleAggregate>();
    for (const [id, fusedScore] of fused) {
      const chunk = chunkById.get(id);
      // A stale vector index can name chunks the chunker no longer produces.
      if (!chunk) continue;

      const weight = chunk.locale === queryLocale ? localeBoost : 1;
      const aggregate = bySlug.get(chunk.styleSlug);
      const contribution: FusedContribution = { chunk, score: fusedScore * weight };

      if (!aggregate) {
        bySlug.set(chunk.styleSlug, {
          slug: chunk.styleSlug,
          score: contribution.score,
          contributions: [contribution],
          keywordRank: keywordRankById.get(id) ?? null,
          vectorRank: vectorRankById.get(id) ?? null,
        });
        continue;
      }

      aggregate.contributions.push(contribution);
      aggregate.score = Math.max(aggregate.score, contribution.score);
      const keywordRank = keywordRankById.get(id);
      if (keywordRank !== undefined) {
        aggregate.keywordRank = aggregate.keywordRank === null ? keywordRank : Math.min(aggregate.keywordRank, keywordRank);
      }
      const vectorRank = vectorRankById.get(id);
      if (vectorRank !== undefined) {
        aggregate.vectorRank = aggregate.vectorRank === null ? vectorRank : Math.min(aggregate.vectorRank, vectorRank);
      }
    }

    const hits: SearchHit[] = [...bySlug.values()]
      .map((aggregate) => {
        const contributions = [...aggregate.contributions].sort((left, right) => right.score - left.score);
        return {
          slug: aggregate.slug,
          score: aggregate.score,
          chunkIds: contributions.map((contribution) => contribution.chunk.id),
          kinds: [...new Set(contributions.map((contribution) => contribution.chunk.kind))],
          locales: [...new Set(contributions.map((contribution) => contribution.chunk.locale))],
          keywordRank: aggregate.keywordRank,
          vectorRank: aggregate.vectorRank,
          degraded,
        };
      })
      .sort((left, right) => right.score - left.score || left.slug.localeCompare(right.slug));

    const reranked = rerank ? await rerank(query, hits) : hits;
    return reranked.slice(0, topK);
  }

  return { search, chunkCount: chunks.length, styleCount };
}

/**
 * One-shot hybrid search.
 *
 * Convenient for scripts and single lookups; call `createHybridSearcher` when
 * the same corpus answers more than one query.
 */
export function hybridSearch(query: string, options: HybridSearchOptions): Promise<SearchHit[]> {
  return createHybridSearcher(options).search(query);
}
