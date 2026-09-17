#!/usr/bin/env tsx

/**
 * Scores style retrieval against the labelled evaluation set - design doc
 * `docs/RAG_SEMANTIC_RETRIEVAL.md` section 5.3, the P3 deliverable.
 *
 * `tools/scripts/measure-retrieval-baseline.ts` answered "did anything come
 * back". That is not the same question as "did the right style come back":
 * a matcher that returns five arbitrary styles scores 100% there and 0% here.
 * This script answers the second question, with Recall@K, MRR and NDCG@5 over
 * `tests/fixtures/retrieval-eval-set.ts`.
 *
 * Three groups run over the same 60 queries and the same 148-style corpus:
 *
 *   A. the production matcher (`lib/knowledge/catalog.ts:91-139`) replicated
 *      against style fields, with the legacy tokenizer - the status quo;
 *   B. the same corpus with the fixed tokenizer and BM25 only - what "just fix
 *      the segmentation" buys;
 *   C. the hybrid searcher (BM25 + vector + RRF + chunk weights) - what the
 *      semantic layer adds on top of B.
 *
 * B is the group C has to beat. A is there to show the defect is real; C
 * beating A proves very little on its own, because A also loses on English.
 * The row labelled B' is supplementary: the hybrid searcher with no embedding
 * provider, i.e. the production degradation path (design doc section 4), which
 * shows what users get when the vector service is down.
 *
 * On embeddings and quota: DashScope is called only when `DASHSCOPE_API_KEY` is
 * set. Without it, group C runs against a deterministic fake provider so the
 * whole pipeline - chunking, indexing, query embedding, fusion, weighting - is
 * exercised end to end and the harness itself is verified. The fake is a signed
 * bag-of-tokens sketch: it can only see literal token overlap, so its numbers
 * say nothing about semantic retrieval. Every table it produces is labelled as
 * fake, and the run ends by saying so. Do not quote those numbers as results.
 *
 * Usage, from the repository root:
 *   npx --no-install tsx tools/scripts/evaluate-retrieval.ts
 *   npx --no-install tsx tools/scripts/evaluate-retrieval.ts --verbose
 *   DASHSCOPE_API_KEY=sk-... npx --no-install tsx tools/scripts/evaluate-retrieval.ts
 */

import { parseArgs } from "node:util";
import { chunkStyles, summarizeChunks, type StyleChunk } from "@/lib/retrieval/chunk-styles";
import {
  DEFAULT_EMBEDDING_CACHE_PATH,
  EmbeddingCache,
  EmbeddingError,
  createDashScopeEmbeddingProvider,
  embedChunks,
  type EmbeddingProvider,
} from "@/lib/retrieval/embedding";
import {
  DEFAULT_K_VALUES,
  formatRate,
  meanScores,
  scoreQuery,
  type AggregateScore,
  type QueryScore,
} from "@/lib/retrieval/eval-metrics";
import { Bm25Index, createHybridSearcher } from "@/lib/retrieval/hybrid-search";
import { legacySplitTokens, tokenizeForSearch } from "@/lib/retrieval/tokenize";
import { InMemoryVectorStore, normalizeVector } from "@/lib/retrieval/vector-store";
import { styles } from "@/lib/styles/registry";
import type { DesignStyle } from "@/lib/styles/types";
import {
  EVAL_QUERY_TYPES,
  RETRIEVAL_EVAL_SET,
  type EvalQueryType,
  type RetrievalEvalCase,
} from "@/tests/fixtures/retrieval-eval-set";

const TAG = "[evaluate-retrieval]";
const DEFAULT_TOP_K = 5;
const CANDIDATE_LIMIT = 50;
const FAKE_DIMENSIONS = 256;
const FAKE_MODEL = "deterministic-hashing-fake";
const TYPE_LABELS: Readonly<Record<EvalQueryType, string>> = {
  "zh-intent": "zh-intent",
  "zh-term": "zh-term",
  en: "en",
  "cross-lingual": "cross-lingual",
};

function log(message = ""): void {
  console.log(message);
}

function warn(message: string): void {
  console.log(`${TAG} ${message}`);
}

/* ------------------------------------------------------------------ *
 * Group A: the production matcher, replicated
 * ------------------------------------------------------------------ */

type Tokenizer = (value: string) => string[];

interface StyleMatch {
  style: DesignStyle;
  score: number;
  matchedFields: string[];
}

/**
 * Replica of `searchKnowledgeCatalog`'s scoring loop
 * (`lib/knowledge/catalog.ts:91-139`), over style fields instead of knowledge
 * resources.
 *
 * Duplicated rather than imported on purpose, for the same reason
 * `measure-retrieval-baseline.ts` duplicates it: the production function is
 * bound to `KnowledgeResource` and to a tokenizer baked in at module scope, and
 * this script needs the tokenizer to be the variable under test. The field set,
 * the `matchedFields.length / queryTokens.length` score, the `score > 0` filter
 * and the sort order are copied verbatim.
 */
function searchStylesWithLegacyMatcher(
  corpus: readonly DesignStyle[],
  query: string,
  tokenize: Tokenizer,
  limit: number,
): StyleMatch[] {
  const queryTokens = tokenize(query);

  return corpus
    .map((style) => {
      const fields: Record<string, string> = {
        name: `${style.name} ${style.nameEn}`,
        description: `${style.description} ${style.descriptionEn ?? ""}`,
        philosophy: `${style.philosophy} ${style.philosophyEn ?? ""}`,
        keywords: `${style.keywords.join(" ")} ${(style.keywordsEn ?? []).join(" ")}`,
        doList: `${style.doList.join(" ")} ${(style.doListEn ?? []).join(" ")}`,
      };
      const matchedFields = Object.entries(fields)
        .filter(([, value]) => {
          const fieldTokens = new Set(tokenize(value));
          return queryTokens.some((token) => fieldTokens.has(token));
        })
        .map(([field]) => field);

      const score = queryTokens.length === 0 ? 0 : matchedFields.length / queryTokens.length;
      return { style, score, matchedFields };
    })
    .filter((hit) => queryTokens.length === 0 || hit.score > 0)
    .sort((left, right) => right.score - left.score || left.style.name.localeCompare(right.style.name))
    .slice(0, limit);
}

/* ------------------------------------------------------------------ *
 * Group C: the fake embedding provider used when no key is configured
 * ------------------------------------------------------------------ */

/** FNV-1a, 32-bit. Small, deterministic, and dependency free. */
function fnv1a(value: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/**
 * A deterministic stand-in for a real embedding model.
 *
 * Each token is hashed into one of `dimensions` buckets with a sign taken from
 * a disjoint bit of the same hash, the counts are summed and the vector is
 * normalised. That makes it a signed bag-of-words sketch: two texts score as
 * similar when they literally share tokens, and nothing else. It cannot bridge
 * "毛玻璃" and "frosted glass" any more than BM25 can, so group C's numbers
 * under this provider are a pipeline smoke test, never a result.
 *
 * Deterministic matters: the same query and corpus always produce the same
 * ranking, so a failing run can be reproduced and the harness's own behaviour
 * (fusion, weighting, aggregation) can be reasoned about.
 */
function createDeterministicFakeEmbeddingProvider(dimensions = FAKE_DIMENSIONS): EmbeddingProvider {
  return {
    id: "fake",
    model: FAKE_MODEL,
    dimensions,

    async embed(texts: readonly string[]): Promise<number[][]> {
      return texts.map((text) => {
        const vector = new Array<number>(dimensions).fill(0);
        for (const token of tokenizeForSearch(text)) {
          const hash = fnv1a(token);
          const bucket = hash % dimensions;
          const sign = (hash >>> 16) % 2 === 0 ? 1 : -1;
          vector[bucket] = (vector[bucket] as number) + sign;
        }
        return normalizeVector(vector);
      });
    },
  };
}

/* ------------------------------------------------------------------ *
 * Runners
 * ------------------------------------------------------------------ */

interface Runner {
  key: string;
  label: string;
  /** Style slugs, best first. */
  rank: (query: string) => Promise<string[]>;
}

function createLegacyRunner(topK: number): Runner {
  return {
    key: "A",
    label: "legacy tokenizer + production matcher replica",
    rank: async (query) =>
      searchStylesWithLegacyMatcher(styles, query, legacySplitTokens, topK).map((hit) => hit.style.slug),
  };
}

function createBm25Runner(chunks: readonly StyleChunk[], topK: number): Runner {
  const index = new Bm25Index(chunks);
  const slugByChunkId = new Map(chunks.map((chunk) => [chunk.id, chunk.styleSlug]));

  return {
    key: "B",
    label: "fixed tokenizer + BM25 only",
    rank: async (query) => {
      const bestScoreBySlug = new Map<string, number>();

      for (const hit of index.search(query, CANDIDATE_LIMIT)) {
        const slug = slugByChunkId.get(hit.id);
        if (!slug) continue;
        // Hits arrive best first, so a style's first sighting is its best chunk.
        if (!bestScoreBySlug.has(slug)) bestScoreBySlug.set(slug, hit.score);
      }

      // Ties break on slug, so two runs over the same corpus compare exactly.
      return [...bestScoreBySlug.entries()]
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        .slice(0, topK)
        .map(([slug]) => slug);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Scoring and reporting
 * ------------------------------------------------------------------ */

interface MethodResult {
  runner: Runner;
  scores: QueryScore[];
  byType: Map<EvalQueryType, AggregateScore>;
  overall: AggregateScore;
  /** Query id -> ranking, kept for the miss listing. */
  rankings: Map<string, string[]>;
  elapsedMs: number[];
}

async function runMethod(runner: Runner, cases: readonly RetrievalEvalCase[]): Promise<MethodResult> {
  const scores: QueryScore[] = [];
  const rankings = new Map<string, string[]>();
  const elapsedMs: number[] = [];
  const rowsByType = new Map<EvalQueryType, QueryScore[]>(
    EVAL_QUERY_TYPES.map((type) => [type, []]),
  );

  for (const evalCase of cases) {
    const startedAt = Date.now();
    const ranking = await runner.rank(evalCase.query);
    elapsedMs.push(Date.now() - startedAt);

    const score = scoreQuery(ranking, evalCase, DEFAULT_K_VALUES);
    scores.push(score);
    rankings.set(evalCase.id, ranking);
    rowsByType.get(evalCase.type)?.push(score);
  }

  return {
    runner,
    scores,
    rankings,
    elapsedMs,
    byType: new Map(
      [...rowsByType.entries()].map(([type, rows]) => [type, meanScores(rows, DEFAULT_K_VALUES)]),
    ),
    overall: meanScores(scores, DEFAULT_K_VALUES),
  };
}

function percentile(values: readonly number[], fraction: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.floor(fraction * sorted.length));
  return sorted[index] as number;
}

interface Column {
  header: string;
  pick: (result: MethodResult) => AggregateScore;
}

function renderMatrix(
  title: string,
  results: readonly MethodResult[],
  cases: readonly RetrievalEvalCase[],
  columns: readonly Column[],
  metrics: ReadonlyArray<{ label: string; value: (score: AggregateScore) => string }>,
): void {
  const countOf = (column: Column): number =>
    column.header === "overall"
      ? cases.length
      : cases.filter((evalCase) => TYPE_LABELS[evalCase.type] === column.header).length;

  const groupWidth = 15;
  const header = columns
    .map((column) => `${column.header}(${countOf(column)})`.padStart(groupWidth))
    .join("");

  log(`=== ${title} ===`);
  log(`${"method".padEnd(46)}${header}`);
  log("-".repeat(46 + header.length));

  for (const result of results) {
    const method = `${result.runner.key}. ${result.runner.label}`;
    const cellsOf = (metric: (typeof metrics)[number]): string =>
      columns.map((column) => metric.value(column.pick(result)).padStart(groupWidth)).join("");

    if (metrics.length === 1) {
      log(`${method.padEnd(46)}${cellsOf(metrics[0] as (typeof metrics)[number])}`);
      continue;
    }

    log(method);
    for (const metric of metrics) {
      log(`    ${metric.label.padEnd(42)}${cellsOf(metric)}`);
    }
  }
  log("");
}

function describeAggregate(score: AggregateScore): string {
  const parts = DEFAULT_K_VALUES.map(
    (k, index) => `R@${k} ${formatRate(score.recall[index] ?? 0)}`,
  );
  return [
    ...parts,
    `MRR ${score.mrr.toFixed(3)}`,
    `NDCG@5 ${score.ndcg[score.ndcg.length - 1]?.toFixed(3) ?? "0.000"}`,
  ].join("  ");
}

function reportMisses(result: MethodResult, cases: readonly RetrievalEvalCase[]): void {
  const misses = cases.filter((evalCase) => result.rankings.get(evalCase.id)?.[0] !== evalCase.primary);
  log(`--- ${result.runner.key}. ${result.runner.label}: ${misses.length} queries without the primary at rank 1 ---`);

  if (misses.length === 0) {
    log("  (none)");
    log("");
    return;
  }

  const width = Math.max(...misses.map((evalCase) => evalCase.id.length));
  for (const evalCase of misses) {
    const ranking = result.rankings.get(evalCase.id) ?? [];
    log(
      `  ${evalCase.id.padEnd(width)}  ${evalCase.query}\n` +
        `  ${" ".repeat(width)}  want ${evalCase.primary} | got ${ranking.slice(0, 3).join(", ") || "(nothing)"}`,
    );
  }
  log("");
}

async function buildHybridRunner(
  chunks: readonly StyleChunk[],
  topK: number,
): Promise<{ runner: Runner; provider: EmbeddingProvider; isFake: boolean }> {
  const apiKey = (process.env.DASHSCOPE_API_KEY ?? "").trim();
  const isFake = apiKey.length === 0;

  let provider: EmbeddingProvider;
  let cache: EmbeddingCache | undefined;
  if (isFake) {
    provider = createDeterministicFakeEmbeddingProvider();
  } else {
    provider = createDashScopeEmbeddingProvider();
    // Read-only reuse of `.data/style-embeddings.json` if one exists; this
    // script never writes, so a measurement run cannot alter the index inputs.
    cache = await EmbeddingCache.load({
      filePath: DEFAULT_EMBEDDING_CACHE_PATH,
      model: provider.model,
      dimensions: provider.dimensions,
    });
    for (const warning of cache.warnings) warn(`cache: ${warning}`);
    warn(`embedding cache: ${cache.size} vectors at ${DEFAULT_EMBEDDING_CACHE_PATH}`);
  }

  const startedAt = Date.now();
  const { vectors, embedded, cached } = await embedChunks(chunks, provider, { cache });
  warn(
    `embedded ${chunks.length} chunks (${embedded} computed, ${cached} reused) with ${provider.id} ${provider.model} in ${Date.now() - startedAt}ms`,
  );

  const store = new InMemoryVectorStore({ dimensions: provider.dimensions, model: provider.model });
  store.upsert(chunks, vectors);

  const searcher = createHybridSearcher({
    chunks,
    vectorStore: store,
    embeddingProvider: provider,
    topK,
    candidateLimit: CANDIDATE_LIMIT,
  });

  return {
    isFake,
    provider,
    runner: {
      key: "C",
      label: "hybrid search (BM25 + vectors + RRF)",
      rank: async (query) => (await searcher.search(query)).map((hit) => hit.slug),
    },
  };
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      "top-k": { type: "string" },
      verbose: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  if (values.help) {
    log(`usage: ${TAG} [--top-k <n>] [--verbose]`);
    log("  --top-k    results per query (default 5; the metrics use K = 1, 3, 5)");
    log("  --verbose  list every query's top-3 for every method");
    return;
  }

  const topK = Math.max(1, Number.parseInt(values["top-k"] ?? String(DEFAULT_TOP_K), 10) || DEFAULT_TOP_K);

  const chunkStartedAt = Date.now();
  const chunks = chunkStyles(styles);
  const stats = summarizeChunks(chunks);

  log(`${TAG} corpus: ${styles.length} styles -> ${stats.total} chunks in ${Date.now() - chunkStartedAt}ms`);
  log(
    `${TAG} eval set: ${RETRIEVAL_EVAL_SET.length} queries ` +
      EVAL_QUERY_TYPES.map(
        (type) => `${type} ${RETRIEVAL_EVAL_SET.filter((item) => item.type === type).length}`,
      ).join(", "),
  );
  log(`${TAG} labels: primary 1.0, alternates 0.5, everything else 0; top-k = ${topK}`);
  log("");

  const { runner: hybridRunner, provider, isFake } = await buildHybridRunner(chunks, topK);

  if (isFake) {
    log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    log("!! GROUP C IS RUNNING ON FAKE EMBEDDINGS.                                !!");
    log("!! DASHSCOPE_API_KEY is not set, so the vector path uses a deterministic !!");
    log("!! bag-of-tokens sketch. It verifies the pipeline, not the semantics.    !!");
    log("!! Every number in this run is a pipeline smoke test, not a result.      !!");
    log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    log("");
  } else {
    log(`${TAG} GROUP C IS RUNNING ON REAL EMBEDDINGS (${provider.model}, ${provider.dimensions}d)`);
    log("");
  }

  // B' is the hybrid searcher with the vector path switched off: the production
  // degradation chain, and a check that chunk weighting does not hurt the
  // keyword ranking it falls back to.
  const degradedSearcher = createHybridSearcher({ chunks, topK, candidateLimit: CANDIDATE_LIMIT });
  const degradedRunner: Runner = {
    key: "B'",
    label: "hybrid with the vector path disabled (degrade path)",
    rank: async (query) => (await degradedSearcher.search(query)).map((hit) => hit.slug),
  };

  const runners: Runner[] = [
    createLegacyRunner(topK),
    createBm25Runner(chunks, topK),
    degradedRunner,
    hybridRunner,
  ];

  const results: MethodResult[] = [];
  for (const runner of runners) {
    results.push(await runMethod(runner, RETRIEVAL_EVAL_SET));
  }

  const allColumns: Column[] = [
    ...EVAL_QUERY_TYPES.map((type) => ({
      header: TYPE_LABELS[type],
      pick: (result: MethodResult) => result.byType.get(type) as AggregateScore,
    })),
    { header: "overall", pick: (result: MethodResult) => result.overall },
  ];

  const metricRows = [
    { label: "Recall@1", value: (score: AggregateScore) => formatRate(score.recall[0] ?? 0) },
    { label: "Recall@3", value: (score: AggregateScore) => formatRate(score.recall[1] ?? 0) },
    { label: "Recall@5", value: (score: AggregateScore) => formatRate(score.recall[2] ?? 0) },
    { label: "MRR", value: (score: AggregateScore) => score.mrr.toFixed(3) },
    { label: "MRR(primary)", value: (score: AggregateScore) => score.primaryMrr.toFixed(3) },
    { label: "NDCG@5", value: (score: AggregateScore) => (score.ndcg[2] ?? 0).toFixed(3) },
    { label: "Primary@1", value: (score: AggregateScore) => formatRate(score.primaryAt1) },
    { label: "setRecall@5", value: (score: AggregateScore) => formatRate(score.setRecall[2] ?? 0) },
  ];

  log("=== All metrics by query type (primary 1.0, alternates 0.5) ===");
  log("");
  renderMatrix("Full metric matrix", results, RETRIEVAL_EVAL_SET, allColumns, metricRows);

  renderMatrix("Headline 1/3: Recall@3", results, RETRIEVAL_EVAL_SET, allColumns, [metricRows[1]]);
  renderMatrix("Headline 2/3: MRR", results, RETRIEVAL_EVAL_SET, allColumns, [metricRows[3]]);
  renderMatrix("Headline 3/3: NDCG@5", results, RETRIEVAL_EVAL_SET, allColumns, [metricRows[5]]);

  log("=== Per-method summary ===");
  for (const result of results) {
    log(`${result.runner.key}. ${result.runner.label}`);
    for (const type of EVAL_QUERY_TYPES) {
      log(`    ${TYPE_LABELS[type].padEnd(14)} ${describeAggregate(result.byType.get(type) as AggregateScore)}`);
    }
    log(`    ${"overall".padEnd(14)} ${describeAggregate(result.overall)}`);
    log(
      `    latency        p50 ${percentile(result.elapsedMs, 0.5)}ms  p95 ${percentile(result.elapsedMs, 0.95)}ms (index-side only)`,
    );
    log("");
  }

  const hybridResult = results[results.length - 1] as MethodResult;
  if (values.verbose) {
    for (const result of results) reportMisses(result, RETRIEVAL_EVAL_SET);
  } else {
    reportMisses(hybridResult, RETRIEVAL_EVAL_SET);
  }

  log("=== Notes ===");
  log("  A and B/C index different text (whole style fields vs semantic chunks),");
  log("  so only B vs C is a controlled comparison; A is the status quo reference.");
  log("  Latency is index-side only: it does not include a real embedding round");
  log("  trip, and says nothing about serving latency.");
  if (isFake) {
    log("  C ran on FAKE vectors. These numbers are not retrieval quality.");
    log("");
    log("配好 DASHSCOPE_API_KEY 后重跑本脚本即可替换为真实数字");
  } else {
    log(`  C ran on real embeddings (${provider.model}).`);
  }
  log("");
}

main().catch((error: unknown) => {
  if (error instanceof EmbeddingError && error.code === "CONFIGURATION_ERROR") {
    console.error(`${TAG} FAIL - ${error.message}`);
  } else {
    console.error(`${TAG} FAIL - ${error instanceof Error ? error.message : String(error)}`);
  }
  process.exitCode = 1;
});
