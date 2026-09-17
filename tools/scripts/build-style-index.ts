#!/usr/bin/env tsx

/**
 * Builds the semantic index behind the retrieval layer: styles -> chunks ->
 * embeddings -> `.data/style-vectors.json`.
 *
 * This is the only place in the repository that spends DashScope quota, and it
 * runs when a human asks it to. Everything else (tests, the hybrid search, the
 * app) either reads the produced index or uses a fake provider.
 *
 * Vectors are cached by `contentHash` in `.data/style-embeddings.json`, so a
 * rebuild only pays for chunks whose text actually changed - useful here, where
 * style copy is edited most days.
 *
 * Usage, from the repository root:
 *   npx --no-install tsx tools/scripts/build-style-index.ts
 *   npx --no-install tsx tools/scripts/build-style-index.ts --dry-run
 *   npx --no-install tsx tools/scripts/build-style-index.ts --force
 */

import { parseArgs } from "node:util";
import {
  CHUNK_WEIGHTS,
  chunkStyles,
  summarizeChunks,
  type StyleChunkKind,
} from "@/lib/retrieval/chunk-styles";
import {
  DEFAULT_EMBEDDING_CACHE_PATH,
  EmbeddingCache,
  EmbeddingError,
  createDashScopeEmbeddingProvider,
  embedChunks,
} from "@/lib/retrieval/embedding";
import { DEFAULT_VECTOR_STORE_PATH, JsonFileVectorStore } from "@/lib/retrieval/vector-store";
import { styles } from "@/lib/styles/registry";

const TAG = "[build-style-index]";
const PROGRESS_STEP = 250;

function log(message: string): void {
  console.log(`${TAG} ${message}`);
}

function formatDuration(milliseconds: number): string {
  return milliseconds < 1000 ? `${milliseconds}ms` : `${(milliseconds / 1000).toFixed(1)}s`;
}

function formatMegabytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function describeKinds(byKind: Record<StyleChunkKind, number>): string {
  return Object.entries(byKind)
    .map(([kind, count]) => `${kind} ${count}`)
    .join(", ");
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      out: { type: "string" },
      cache: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  if (values.help) {
    log("usage: build-style-index [--out <path>] [--cache <path>] [--dry-run] [--force]");
    log("  --dry-run  chunk the catalog and report, without calling the embedding API");
    log("  --force    ignore cached vectors and re-embed every chunk");
    return;
  }

  const outPath = values.out ?? DEFAULT_VECTOR_STORE_PATH;
  const cachePath = values.cache ?? DEFAULT_EMBEDDING_CACHE_PATH;

  const startedAt = Date.now();

  const chunkStartedAt = Date.now();
  const chunks = chunkStyles(styles);
  const stats = summarizeChunks(chunks);
  log(
    `chunked ${styles.length} styles into ${stats.total} chunks in ${formatDuration(Date.now() - chunkStartedAt)}`,
  );
  log(`  kinds: ${describeKinds(stats.byKind)}`);
  log(`  locales: zh-CN ${stats.byLocale["zh-CN"]}, en-US ${stats.byLocale["en-US"]}`);
  log(`  text length: avg ${stats.averageLength}, min ${stats.shortestLength}, max ${stats.longestLength}`);

  if (values["dry-run"]) {
    log("dry run: no embedding call was made and nothing was written");
    return;
  }

  const provider = createDashScopeEmbeddingProvider();
  log(`provider: ${provider.id} ${provider.model} (${provider.dimensions}d)`);

  const cacheStartedAt = Date.now();
  const cache = await EmbeddingCache.load({
    filePath: cachePath,
    model: provider.model,
    dimensions: provider.dimensions,
  });
  for (const warning of cache.warnings) log(`  warning: ${warning}`);
  if (values.force) {
    log(`cache: ignored (--force), ${cache.size} cached vectors left untouched on disk`);
  } else {
    log(`cache: ${cache.size} vectors at ${cachePath} (loaded in ${formatDuration(Date.now() - cacheStartedAt)})`);
  }

  const embedStartedAt = Date.now();
  let lastReported = 0;

  const { vectors, embedded, cached } = await embedChunks(chunks, provider, {
    cache: values.force ? undefined : cache,
    onProgress: ({ completed, total }) => {
      if (completed < total && completed - lastReported < PROGRESS_STEP) return;
      lastReported = completed;
      const percent = total === 0 ? 100 : Math.round((completed / total) * 100);
      log(`  embedded ${completed}/${total} unique texts (${percent}%)`);
    },
  });

  const embedDuration = Date.now() - embedStartedAt;
  log(
    `vectors: ${embedded} computed, ${cached} from cache, in ${formatDuration(embedDuration)}` +
      (embedded > 0 ? ` (${(embedDuration / embedded).toFixed(0)}ms per text)` : ""),
  );

  if (vectors.length !== chunks.length) {
    throw new Error(`Got ${vectors.length} vectors for ${chunks.length} chunks.`);
  }

  const store = new JsonFileVectorStore({
    dimensions: provider.dimensions,
    model: provider.model,
    filePath: outPath,
  });
  store.upsert(chunks, vectors);
  const written = await store.save();

  if (!values.force) {
    const saved = await cache.save();
    log(`cache: wrote ${saved.entries} vectors to ${saved.filePath}`);
  }

  log(
    `wrote ${written.entries} vectors (${formatMegabytes(written.bytes)}) to ${written.filePath}`,
  );
  // These values are written into each chunk's metadata; retrieval no longer
  // multiplies them into the score (lib/retrieval/hybrid-search.ts explains why).
  log(`chunk kind weights stored as metadata only, never applied at query time: ${JSON.stringify(CHUNK_WEIGHTS)}`);
  log(`done in ${formatDuration(Date.now() - startedAt)}`);
}

main().catch((error: unknown) => {
  if (error instanceof EmbeddingError && error.code === "CONFIGURATION_ERROR") {
    console.error(`${TAG} FAIL - ${error.message}`);
  } else {
    console.error(`${TAG} FAIL - ${error instanceof Error ? error.message : String(error)}`);
  }
  process.exitCode = 1;
});
