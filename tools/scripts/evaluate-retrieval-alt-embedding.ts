#!/usr/bin/env tsx

/**
 * Group C of the retrieval evaluation, re-run against a different embedding
 * provider.
 *
 * `evaluate-retrieval.ts` hardcodes DashScope when a key is present, so this
 * script exists to answer one question without touching it: does the corpus
 * retrieve better or worse under `Qwen/Qwen3-Embedding-8B` served through an
 * OpenAI-compatible relay?
 *
 * Everything except the provider is held identical to the group C path —
 * same chunks, same BM25, same vector store, same RRF fusion, same eval set —
 * because a comparison that moves two things at once measures neither.
 *
 * Two deliberate safety choices:
 *
 *   - The vector cache is a SEPARATE file. `EmbeddingCache` keys entries by
 *     model and dimensions and drops anything that does not match, so pointing
 *     this run at the default cache would silently invalidate the DashScope
 *     vectors the production index depends on. It writes to
 *     `.data/style-embeddings-alt.json` instead and never reads the original.
 *   - Nothing here is imported by the app. This is a measurement tool; it has
 *     no effect on what the product does.
 *
 * Usage, from the repository root:
 *   pnpm run eval:retrieval:alt
 *   pnpm run eval:retrieval:alt -- --verbose
 *
 * Required environment:
 *   ALT_EMBEDDING_API_KEY   credential for the relay
 *   ALT_EMBEDDING_BASE_URL  e.g. https://ai.hybgzs.com/v1
 *   ALT_EMBEDDING_MODEL     e.g. Qwen/Qwen3-Embedding-8B
 */

import { parseArgs } from "node:util";
import path from "node:path";
import { chunkStyles, summarizeChunks, type StyleChunk } from "@/lib/retrieval/chunk-styles";
import { EmbeddingCache, embedChunks, type EmbeddingProvider } from "@/lib/retrieval/embedding";
import {
  DEFAULT_K_VALUES,
  formatRate,
  meanScores,
  scoreQuery,
  type AggregateScore,
} from "@/lib/retrieval/eval-metrics";
import { createHybridSearcher } from "@/lib/retrieval/hybrid-search";
import { InMemoryVectorStore } from "@/lib/retrieval/vector-store";
import { styles } from "@/lib/styles/registry";
import {
  EVAL_QUERY_TYPES,
  RETRIEVAL_EVAL_SET,
  type EvalQueryType,
} from "@/tests/fixtures/retrieval-eval-set";

const TAG = "[alt-embedding]";
const CANDIDATE_LIMIT = 50;
const ALT_CACHE_PATH = path.join(".data", process.env.ALT_EMBEDDING_CACHE ?? "style-embeddings-alt.json");
const MAX_BATCH = 10;
/**
 * The relay cuts off after roughly ten batches and then refuses with "upstream
 * saturated" — reproducibly, at the same batch, across separate runs. That
 * reads as a quota window rather than congestion, so the retry gap has to be
 * long enough for the window to roll over. Short backoff just burns attempts:
 * 2s/4s/8s/16s spans thirty seconds and the eleventh batch still died.
 */
const MAX_ATTEMPTS = 8;
const RETRY_BASE_MS = 75_000;

/**
 * How many batches are in flight at once.
 *
 * The first version issued them strictly one after another and spent most of
 * its wall clock waiting, not working: 102 batches at ~1.8s is three minutes of
 * pure latency, before any retry. A burst test against the relay sustained 30
 * requests/minute with no rejections, so five concurrent batches stays inside
 * what the account allows while cutting the run to roughly a fifth.
 *
 * Kept modest on purpose. The saturation error arrives as a plain message
 * rather than a 429, so it cannot be distinguished from congestion by status
 * code, and pushing concurrency up would trade a slower run for a flakier one.
 */
const CONCURRENCY = Number(process.env.ALT_CONCURRENCY ?? 3);

/** Published group C figures from the design doc, for the side-by-side table. */
const BASELINE = { recall1: 0.967, recall3: 0.983, mrr: 0.978, ndcg5: 0.811 };

function log(msg: string) {
  process.stdout.write(`${msg}\n`);
}
function warn(msg: string) {
  process.stderr.write(`${TAG} ${msg}\n`);
}

/**
 * The relay is OpenAI-compatible and accepts `dimensions`, which matters here:
 * the corpus index and every consumer of it are built at 1024. Letting this
 * model return its native 4096 would change the vector store's shape as well as
 * its contents, and the comparison would no longer isolate the model.
 */
function createAltEmbeddingProvider(
  /** Lets each batch be persisted under the same key `embedChunks` reads back. */
  cache: EmbeddingCache | undefined,
  hashByText: ReadonlyMap<string, string>,
): EmbeddingProvider {
  const apiKey = process.env.ALT_EMBEDDING_API_KEY?.trim();
  const baseUrl = process.env.ALT_EMBEDDING_BASE_URL?.trim();
  const model = process.env.ALT_EMBEDDING_MODEL?.trim();
  const dimensions = 1024;

  if (!apiKey || !baseUrl || !model) {
    throw new Error(
      "ALT_EMBEDDING_API_KEY, ALT_EMBEDDING_BASE_URL and ALT_EMBEDDING_MODEL must all be set.",
    );
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/embeddings`;
  let batches = 0;
  let texts = 0;

  return {
    id: "alt-relay",
    model,
    dimensions,
    async embed(input: readonly string[]): Promise<number[][]> {
      // Results land by absolute index, not by push. With several batches in
      // flight a shared array would interleave them in completion order, and
      // every vector would be silently attached to the wrong chunk — the kind
      // of bug that produces a plausible-looking index and worse retrieval.
      const out: (number[] | undefined)[] = new Array(input.length);
      const total = Math.ceil(input.length / MAX_BATCH);
      let next = 0;

      async function runBatch(batchIndex: number): Promise<void> {
        const from = batchIndex * MAX_BATCH;
        const slice = input.slice(from, from + MAX_BATCH);

        // The relay reports saturation as a plain message rather than a 429, so
        // there is no status code to branch on — only the text. Retried with a
        // widening gap because it is transient by its own wording, and without
        // a retry a hundred-batch build dies on whichever batch happens to land
        // during a spike.
        let payload: { data?: { embedding: number[] }[]; message?: string; error?: { message?: string } } | null = null;
        let lastWhy = "no attempt made";
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ model, input: slice, dimensions }),
            signal: AbortSignal.timeout(120_000),
          });
          payload = (await response.json().catch(() => null)) as typeof payload;

          if (response.ok && payload?.data) break;

          lastWhy = payload?.error?.message ?? payload?.message ?? `HTTP ${response.status}`;
          if (attempt < MAX_ATTEMPTS) {
            const wait = RETRY_BASE_MS * 2 ** (attempt - 1);
            warn(`batch ${batchIndex + 1} attempt ${attempt} failed (${lastWhy}); retrying in ${wait}ms`);
            await new Promise((r) => setTimeout(r, wait));
          }
        }

        if (!payload?.data) {
          throw new Error(`alt embedding backend rejected batch ${batchIndex + 1} after ${MAX_ATTEMPTS} attempts: ${lastWhy}`);
        }
        if (payload.data.length !== slice.length) {
          throw new Error(`expected ${slice.length} vectors, got ${payload.data.length}`);
        }
        const wrongShape = payload.data.find((d) => d.embedding.length !== dimensions);
        if (wrongShape) {
          throw new Error(`backend ignored dimensions=${dimensions}; got ${wrongShape.embedding.length}`);
        }

        for (let j = 0; j < slice.length; j++) out[from + j] = payload.data[j].embedding;

        // Persist as we go. A run can die at any point, and a build that only
        // writes at the end throws away everything it had when it does. Saving
        // per batch makes the next attempt resume instead of restart.
        if (cache) {
          for (let j = 0; j < slice.length; j++) {
            const hash = hashByText.get(slice[j]);
            if (hash) cache.set(hash, payload.data[j].embedding);
          }
          await cache.save();
        }
        const done = (batches += 1);
        if (done % 20 === 0 || done === total) {
          warn(`${done}/${total} batches · ${cache ? `${cache.size} cached · ` : ""}${texts} texts`);
        }
      }

      // A fixed pool of workers pulling from a shared cursor. Batch sizes are
      // uneven only at the tail, so the pool stays balanced without a queue.
      const workers = Array.from({ length: Math.min(CONCURRENCY, total) }, async () => {
        while (true) {
          const mine = next++;
          if (mine >= total) return;
          const size = Math.min(MAX_BATCH, input.length - mine * MAX_BATCH);
          await runBatch(mine);
          texts += size;
        }
      });
      await Promise.all(workers);

      return out as number[][];
    },
  };
}

function printAggregate(label: string, agg: AggregateScore, chunkCount: number): void {
  log("");
  log(`  ${label}`);
  log(`    chunks ${chunkCount}   queries ${agg.queries}`);
  log(`    Recall@1 ${formatRate(agg.recall[0])}   Recall@3 ${formatRate(agg.recall[1])}   Recall@5 ${formatRate(agg.recall[2])}`);
  log(`    MRR ${agg.mrr.toFixed(3)}   NDCG@5 ${agg.ndcg[2].toFixed(3)}   primary@1 ${formatRate(agg.primaryAt1)}`);
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: { verbose: { type: "boolean", default: false } },
    allowPositionals: false,
  });

  const chunks: StyleChunk[] = chunkStyles(styles);
  const stats = summarizeChunks(chunks);
  log(`${TAG} corpus: ${styles.length} styles -> ${stats.total} chunks`);

  const model = process.env.ALT_EMBEDDING_MODEL?.trim();
  const cache = await EmbeddingCache.load({ filePath: ALT_CACHE_PATH, model: model ?? "", dimensions: 1024 });
  for (const w of cache.warnings) warn(`cache: ${w}`);

  // `embedChunks` keys the cache by `chunk.contentHash` and `Provider.embed`
  // only sees text, so the mapping back from text to hash has to be built here.
  const hashByText = new Map<string, string>();
  for (const chunk of chunks) if (!hashByText.has(chunk.text)) hashByText.set(chunk.text, chunk.contentHash);

  const provider = createAltEmbeddingProvider(cache, hashByText);

  const embedStarted = Date.now();
  const { vectors, embedded, cached } = await embedChunks(chunks, provider, { cache });
  warn(
    `embedded ${chunks.length} chunks (${embedded} computed, ${cached} reused) in ${Date.now() - embedStarted}ms`,
  );

  const store = new InMemoryVectorStore({ dimensions: provider.dimensions, model: provider.model });
  store.upsert(chunks, vectors);

  const searcher = createHybridSearcher({
    chunks,
    vectorStore: store,
    embeddingProvider: provider,
    topK: 5,
    candidateLimit: CANDIDATE_LIMIT,
  });

  log(`${TAG} scoring ${RETRIEVAL_EVAL_SET.length} labelled queries`);
  const scores = [];
  for (const item of RETRIEVAL_EVAL_SET) {
    const ranking = (await searcher.search(item.query)).map((h) => h.slug);
    const score = scoreQuery(ranking, { primary: item.primary, alternates: item.alternates }, DEFAULT_K_VALUES);
    scores.push(score);
    if (values.verbose) {
      const hit = ranking[0] === item.primary ? "primary" : ranking.includes(item.primary) ? "found" : "MISS";
      log(`    ${item.id.padEnd(20)} ${hit.padEnd(8)} top1=${ranking[0] ?? "-"}`);
    }
  }

  const agg = meanScores(scores, DEFAULT_K_VALUES);
  printAggregate(`alt embedding (${provider.model})`, agg, stats.total);

  log("");
  log("  ── 对照：设计文档 §5.4 的 C 组（DashScope text-embedding-v4）──");
  log(`    Recall@1 ${formatRate(BASELINE.recall1)}   Recall@3 ${formatRate(BASELINE.recall3)}   MRR ${BASELINE.mrr.toFixed(3)}   NDCG@5 ${BASELINE.ndcg5.toFixed(3)}`);
  const delta = agg.recall[0] - BASELINE.recall1;
  log(`    Recall@1 差值: ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} 个百分点`);

  log("");
  log("  按查询类型（Recall@1）：");
  for (const type of EVAL_QUERY_TYPES as readonly EvalQueryType[]) {
    const idx = RETRIEVAL_EVAL_SET.map((it, i) => (it.type === type ? i : -1)).filter((i) => i >= 0);
    const mean = idx.reduce((sum, i) => sum + scores[i].recall[0], 0) / (idx.length || 1);
    log(`    ${type.padEnd(15)} n=${String(idx.length).padStart(2)}   ${formatRate(mean)}`);
  }
}

void main().catch((error) => {
  process.stderr.write(`${TAG} ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
