import { mkdir, readFile, writeFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import {
  CHUNK_WEIGHTS,
  hashChunkText,
  styleChunkId,
  type StyleChunk,
  type StyleChunkKind,
  type StyleChunkLocale,
} from "@/lib/retrieval/chunk-styles";
import type { EmbeddingProvider } from "@/lib/retrieval/embedding";
import {
  Bm25Index,
  createHybridSearcher,
  hybridSearch,
  reciprocalRankFusion,
  type DegradeInfo,
  type SearchHit,
} from "@/lib/retrieval/hybrid-search";
import {
  InMemoryVectorStore,
  JsonFileVectorStore,
  cosineSimilarity,
  normalizeVector,
} from "@/lib/retrieval/vector-store";

const DIMENSIONS = 2;

function makeChunk(
  slug: string,
  kind: StyleChunkKind,
  locale: StyleChunkLocale,
  text: string,
): StyleChunk {
  return {
    id: styleChunkId(slug, kind, locale),
    styleSlug: slug,
    kind,
    locale,
    text,
    weight: CHUNK_WEIGHTS[kind],
    contentHash: hashChunkText(text),
  };
}

/** Returns the same fixed vector for every input, so the ranking is scripted. */
class FakeEmbeddingProvider implements EmbeddingProvider {
  readonly id = "fake";
  readonly model = "fake-embedding-v1";
  readonly dimensions = DIMENSIONS;
  readonly calls: string[][] = [];

  constructor(
    private readonly vector: readonly number[],
    private readonly failure?: Error,
  ) {}

  async embed(texts: readonly string[]): Promise<number[][]> {
    this.calls.push([...texts]);
    if (this.failure) throw this.failure;
    return texts.map(() => [...this.vector]);
  }
}

const hangingProvider: EmbeddingProvider = {
  id: "hanging",
  model: "hanging",
  dimensions: DIMENSIONS,
  embed: () => new Promise<number[][]>(() => {}),
};

function storeWith(entries: Array<[StyleChunk, number[]]>): InMemoryVectorStore {
  const store = new InMemoryVectorStore({ dimensions: DIMENSIONS, model: "fake-embedding-v1" });
  store.upsert(
    entries.map(([chunk]) => chunk),
    entries.map(([, vector]) => vector),
  );
  return store;
}

function slugs(hits: readonly SearchHit[]): string[] {
  return hits.map((hit) => hit.slug);
}

describe("reciprocal rank fusion", () => {
  it("scores each ranking as 1/(k + rank)", () => {
    const scores = reciprocalRankFusion([["a", "b"]], 60);

    expect(scores.get("a")).toBeCloseTo(1 / 61, 10);
    expect(scores.get("b")).toBeCloseTo(1 / 62, 10);
  });

  it("sums contributions across retrievers", () => {
    const scores = reciprocalRankFusion([["a", "b"], ["b"]], 60);

    expect(scores.get("b")).toBeCloseTo(1 / 62 + 1 / 61, 10);
    expect(scores.get("a")).toBeCloseTo(1 / 61, 10);
    expect(scores.get("b") as number).toBeGreaterThan(scores.get("a") as number);
  });

  it("ignores documents only one retriever found", () => {
    const scores = reciprocalRankFusion([["a"], [], ["b"]], 60);

    expect([...scores.keys()].sort()).toEqual(["a", "b"]);
    expect(scores.get("b")).toBeCloseTo(1 / 61, 10);
  });
});

describe("bm25 index", () => {
  const chunks = [
    makeChunk("glass", "identity", "zh-CN", "玻璃拟态 毛玻璃 frosted glass panel"),
    makeChunk("swiss", "identity", "zh-CN", "瑞士国际主义 网格 grid system"),
  ];

  it("ranks the document containing the term", () => {
    const hits = new Bm25Index(chunks).search("毛玻璃", 10);

    expect(hits).toHaveLength(1);
    expect(hits[0]?.id).toBe("style:glass:identity:zh-CN");
    expect(hits[0]?.rank).toBe(1);
  });

  it("does not double count a repeated query term", () => {
    const index = new Bm25Index(chunks);

    expect(index.search("毛玻璃 毛玻璃", 10)[0]?.score).toBeCloseTo(
      index.search("毛玻璃", 10)[0]?.score as number,
      10,
    );
  });

  it("returns nothing for a query with no known terms", () => {
    expect(new Bm25Index(chunks).search("完全不相关的词组", 10)).toEqual([]);
    expect(new Bm25Index(chunks).search("", 10)).toEqual([]);
    expect(new Bm25Index([]).search("毛玻璃", 10)).toEqual([]);
  });

  it("honours the limit and ranks from 1", () => {
    const hits = new Bm25Index(chunks).search("glass grid", 1);

    expect(hits).toHaveLength(1);
    expect(hits[0]?.rank).toBe(1);
  });
});

describe("hybrid search fusion", () => {
  const glass = makeChunk(
    "glassmorphism",
    "identity",
    "zh-CN",
    "玻璃拟态 毛玻璃质感的界面风格，强调模糊、折射与半透明层次",
  );
  const nocturne = makeChunk(
    "nocturne",
    "philosophy",
    "zh-CN",
    "深色夜景与克制的光源表达，让内容自己说话，而不是依靠装饰喧哗",
  );

  it("keeps results only one retriever found", async () => {
    const hits = await hybridSearch("毛玻璃", {
      chunks: [glass, nocturne],
      vectorStore: storeWith([
        [glass, [1, 0]],
        [nocturne, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
      // One candidate per retriever, so each ranking holds a single document.
      candidateLimit: 1,
    });

    // Keyword found only `glass`, the vector path found only `nocturne`.
    expect(slugs(hits).sort()).toEqual(["glassmorphism", "nocturne"]);
    expect(hits.find((hit) => hit.slug === "glassmorphism")?.keywordRank).toBe(1);
    expect(hits.find((hit) => hit.slug === "glassmorphism")?.vectorRank).toBeNull();
    expect(hits.find((hit) => hit.slug === "nocturne")?.vectorRank).toBe(1);
    expect(hits.find((hit) => hit.slug === "nocturne")?.keywordRank).toBeNull();
  });

  it("ranks by fused score and locale boost, ignoring chunk kind", async () => {
    const hits = await hybridSearch("毛玻璃", {
      chunks: [glass, nocturne],
      vectorStore: storeWith([
        [glass, [1, 0]],
        [nocturne, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
      candidateLimit: 1,
    });

    // Both are rank 1 in one ranking and both are zh-CN, so the two fused
    // scores are identical and the slug tie-break orders them.
    //
    // This used to expect ["nocturne", "glassmorphism"], because a 1.2 weight
    // on the `philosophy` kind decided it. Chunk-kind weighting was removed
    // after the evaluation set showed it reorders 28 of 60 labelled queries
    // for the worse (mechanism and numbers in the header of
    // lib/retrieval/hybrid-search.ts). The contract pinned here is the
    // replacement one: same rank plus same locale means the same score, and a
    // tie falls through to the slug.
    expect(slugs(hits)).toEqual(["glassmorphism", "nocturne"]);
    expect(hits[0]?.score).toBeCloseTo((1 / 61) * 1.1, 10);
    expect(hits[1]?.score).toBeCloseTo((1 / 61) * 1.1, 10);
    expect(hits[0]?.score).toBe(hits[1]?.score);
    // The kind still travels with the hit; it just does not score.
    expect(hits.find((hit) => hit.slug === "nocturne")?.kinds).toEqual(["philosophy"]);
  });

  it("counts a chunk twice when both retrievers return it", async () => {
    // With the default candidateLimit the vector path returns every chunk the
    // store holds, including the one the keyword path already found - cosine 0
    // is still a candidate, so `glass` also collects the rank-2 contribution
    // from that side:
    //
    //   glass     (1/61 + 1/62) * zh boost 1.1 = 0.035772
    //   nocturne  (1/61)        * zh boost 1.1 = 0.018033
    //
    // This is the documented no-cutoff behaviour in hybrid-search.ts, not a
    // tie-break, and the numbers are asserted so a change to it is visible.
    // The kind weights used to appear in this arithmetic; they were removed
    // (see the header of lib/retrieval/hybrid-search.ts), so the only factor
    // left is the locale boost both chunks get.
    const hits = await hybridSearch("毛玻璃", {
      chunks: [glass, nocturne],
      vectorStore: storeWith([
        [glass, [1, 0]],
        [nocturne, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
    });

    expect(slugs(hits)).toEqual(["glassmorphism", "nocturne"]);
    expect(hits[0]?.score).toBeCloseTo((1 / 61 + 1 / 62) * 1.1, 10);
    expect(hits[1]?.score).toBeCloseTo((1 / 61) * 1.1, 10);
    expect(hits[0]?.keywordRank).toBe(1);
    expect(hits[0]?.vectorRank).toBe(2);
  });

  it("does not mark a healthy search as degraded", async () => {
    const hits = await hybridSearch("毛玻璃", {
      chunks: [glass],
      vectorStore: storeWith([[glass, [0, 1]]]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
    });

    expect(hits.every((hit) => !hit.degraded)).toBe(true);
  });

  it("honours topK", async () => {
    const chunks = ["a", "b", "c"].map((slug) =>
      makeChunk(slug, "identity", "zh-CN", `玻璃拟态风格 ${slug} 的描述文本`),
    );
    const store = new InMemoryVectorStore({ dimensions: DIMENSIONS, model: "fake" });
    store.upsert(chunks, chunks.map(() => [1, 0]));

    const hits = await hybridSearch("玻璃拟态", {
      chunks,
      vectorStore: store,
      embeddingProvider: new FakeEmbeddingProvider([1, 0]),
      topK: 2,
    });

    expect(hits).toHaveLength(2);
  });

  it("returns an empty list when nothing matches and the vector path is empty", async () => {
    const hits = await hybridSearch("完全不相关的查询", {
      chunks: [glass],
      vectorStore: new InMemoryVectorStore({ dimensions: DIMENSIONS, model: "fake" }),
      embeddingProvider: new FakeEmbeddingProvider([1, 0]),
    });

    // Same behaviour as the keyword-only matcher: empty candidates, no error.
    expect(hits).toEqual([]);
  });

  it("does not call the provider when there is no vector store", async () => {
    const provider = new FakeEmbeddingProvider([1, 0]);
    await hybridSearch("毛玻璃", { chunks: [glass], embeddingProvider: provider });

    expect(provider.calls).toEqual([]);
  });

  it("applies a rerank hook", async () => {
    // Asserted against what the hook itself received, not against an order the
    // fusion happened to produce.
    //
    // The previous version reversed the candidates and expected the reversal of
    // the fused order. That made this test a proxy for chunk-kind weighting:
    // when the weighting was removed the fused order changed, and this test
    // failed even though the hook was still working perfectly. The assertion
    // now derives its expectation from the hook's own input, so it can only
    // fail when the hook's output is not what the search returns.
    const receivedByHook: string[][] = [];
    const hits = await hybridSearch("毛玻璃", {
      chunks: [glass, nocturne],
      vectorStore: storeWith([
        [glass, [1, 0]],
        [nocturne, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
      candidateLimit: 1,
      rerank: (_query, candidates) => {
        receivedByHook.push(candidates.map((candidate) => candidate.slug));
        return [...candidates].reverse();
      },
    });

    const before = receivedByHook[0] ?? [];

    expect(receivedByHook).toHaveLength(1);
    expect(before).toHaveLength(2);
    expect(slugs(hits)).toEqual([...before].reverse());
    // Reversing two distinct candidates always changes the order, so the
    // result cannot be the fused order that came in.
    expect(slugs(hits)).not.toEqual(before);
  });

  it("exposes a reusable searcher", async () => {
    const searcher = createHybridSearcher({
      chunks: [glass, nocturne],
      vectorStore: storeWith([
        [glass, [1, 0]],
        [nocturne, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
    });

    expect(searcher.chunkCount).toBe(2);
    expect(searcher.styleCount).toBe(2);
    expect(slugs(await searcher.search("毛玻璃")).length).toBe(2);
  });
});

describe("locale preference", () => {
  const chinese = makeChunk("chinese-style", "identity", "zh-CN", "毛玻璃质感与模糊折射的界面");
  const english = makeChunk(
    "english-style",
    "identity",
    "en-US",
    "glassmorphism frosted blur and translucent panels",
  );

  it("prefers the chunk written in the query's language without filtering the other", async () => {
    const hits = await hybridSearch("毛玻璃", {
      chunks: [chinese, english],
      // The vector path deliberately prefers the other language.
      vectorStore: storeWith([
        [chinese, [0, 1]],
        [english, [1, 0]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([1, 0]),
    });

    expect(slugs(hits)).toEqual(["chinese-style", "english-style"]);
    expect(hits[0]?.locales).toContain("zh-CN");
    expect(hits[1]?.locales).toContain("en-US");
  });

  it("mirrors for an English query", async () => {
    const hits = await hybridSearch("glassmorphism", {
      chunks: [chinese, english],
      vectorStore: storeWith([
        [chinese, [1, 0]],
        [english, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([1, 0]),
    });

    expect(slugs(hits)).toEqual(["english-style", "chinese-style"]);
  });
});

describe("chunk kind does not score", () => {
  const identity = makeChunk(
    "identity-style",
    "identity",
    "en-US",
    "glassmorphism frosted blur panel",
  );
  const philosophy = makeChunk(
    "philosophy-style",
    "philosophy",
    "en-US",
    "restraint and order in quiet nocturne interfaces",
  );

  it("scores identity and philosophy equally at equal rank", async () => {
    const hits = await hybridSearch("glassmorphism", {
      chunks: [identity, philosophy],
      vectorStore: storeWith([
        [identity, [1, 0]],
        [philosophy, [0, 1]],
      ]),
      embeddingProvider: new FakeEmbeddingProvider([0, 1]),
      candidateLimit: 1,
    });

    // Same rank (one each) and same locale as the query, so the scores are
    // identical and the slug tie-break orders them.
    //
    // This replaces "ranks philosophy above identity at equal rank", which
    // pinned CHUNK_WEIGHTS.philosophy = 1.2. That weighting was removed after
    // the evaluation set showed it reorders 28 of 60 labelled queries for the
    // worse - see the header of lib/retrieval/hybrid-search.ts. The regression
    // worth guarding is now the opposite one: a kind weight creeping back into
    // either the score or the ordering.
    expect(hits[0]?.score).toBeCloseTo((1 / 61) * 1.1, 10);
    expect(hits[1]?.score).toBeCloseTo((1 / 61) * 1.1, 10);
    expect(hits[0]?.score).toBe(hits[1]?.score);
    // Equal scores, so the slug decides: "identity-style" < "philosophy-style".
    expect(slugs(hits)).toEqual(["identity-style", "philosophy-style"]);
  });
});

describe("degradation chain", () => {
  const chunk = makeChunk(
    "glassmorphism",
    "identity",
    "zh-CN",
    "玻璃拟态 毛玻璃质感的界面风格，强调模糊与折射",
  );
  const store = storeWith([[chunk, [1, 0]]]);

  it("falls back to keywords when the provider throws", async () => {
    const degraded: DegradeInfo[] = [];
    const hits = await hybridSearch("毛玻璃", {
      chunks: [chunk],
      vectorStore: store,
      embeddingProvider: new FakeEmbeddingProvider([1, 0], new Error("upstream down")),
      onDegrade: (info) => degraded.push(info),
    });

    expect(slugs(hits)).toEqual(["glassmorphism"]);
    expect(hits[0]?.degraded).toBe(true);
    expect(hits[0]?.vectorRank).toBeNull();
    expect(degraded.map((info) => info.reason)).toEqual(["embedding-failed"]);
  });

  it("falls back when no provider is configured", async () => {
    const degraded: DegradeInfo[] = [];
    const hits = await hybridSearch("毛玻璃", {
      chunks: [chunk],
      vectorStore: store,
      onDegrade: (info) => degraded.push(info),
    });

    expect(hits[0]?.degraded).toBe(true);
    expect(degraded[0]?.reason).toBe("no-provider");
  });

  it("falls back when no vector store is configured", async () => {
    const degraded: DegradeInfo[] = [];
    const hits = await hybridSearch("毛玻璃", {
      chunks: [chunk],
      embeddingProvider: new FakeEmbeddingProvider([1, 0]),
      onDegrade: (info) => degraded.push(info),
    });

    expect(hits[0]?.degraded).toBe(true);
    expect(degraded[0]?.reason).toBe("no-store");
  });

  it("falls back when the vector search itself throws", async () => {
    const degraded: DegradeInfo[] = [];
    const mismatched = new InMemoryVectorStore({ dimensions: 8, model: "fake" });

    const hits = await hybridSearch("毛玻璃", {
      chunks: [chunk],
      vectorStore: mismatched,
      embeddingProvider: new FakeEmbeddingProvider([1, 0]),
      onDegrade: (info) => degraded.push(info),
    });

    expect(slugs(hits)).toEqual(["glassmorphism"]);
    expect(degraded.map((info) => info.reason)).toEqual(["vector-search-failed"]);
  });

  it("falls back when the embedding call hangs", async () => {
    const degraded: DegradeInfo[] = [];
    const hits = await hybridSearch("毛玻璃", {
      chunks: [chunk],
      vectorStore: store,
      embeddingProvider: hangingProvider,
      vectorTimeoutMs: 10,
      onDegrade: (info) => degraded.push(info),
    });

    expect(hits[0]?.degraded).toBe(true);
    expect(degraded.map((info) => info.reason)).toEqual(["embedding-timeout"]);
  });

  it("still returns keyword results when degradation leaves the vector path empty", async () => {
    const hits = await hybridSearch("毛玻璃", {
      chunks: [chunk],
      vectorStore: store,
      embeddingProvider: hangingProvider,
      vectorTimeoutMs: 10,
    });

    expect(hits).toHaveLength(1);
    expect(hits[0]?.chunkIds).toEqual(["style:glassmorphism:identity:zh-CN"]);
  });

  it("returns an empty list rather than throwing when both paths fail", async () => {
    const hits = await hybridSearch("毫不相关的查询", {
      chunks: [chunk],
      vectorStore: store,
      embeddingProvider: new FakeEmbeddingProvider([1, 0], new Error("upstream down")),
    });

    expect(hits).toEqual([]);
  });
});

describe("vector math", () => {
  it("computes cosine similarity", () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1, 10);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0, 10);
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1, 10);
    expect(cosineSimilarity([3, 4], [3, 4])).toBeCloseTo(1, 10);
  });

  it("returns zero when either side has no magnitude", () => {
    expect(cosineSimilarity([0, 0], [1, 0])).toBe(0);
  });

  it("rejects mismatched sizes", () => {
    expect(() => cosineSimilarity([1, 0], [1, 0, 0])).toThrow(/different sizes/u);
  });

  it("normalises to unit length and leaves zero vectors alone", () => {
    expect(normalizeVector([3, 4])).toEqual([0.6, 0.8]);
    expect(normalizeVector([0, 0])).toEqual([0, 0]);
  });
});

describe("vector stores", () => {
  const chunk = makeChunk("glassmorphism", "identity", "zh-CN", "玻璃拟态 frosted glass");
  const other = makeChunk("swiss-style", "identity", "zh-CN", "瑞士国际主义 grid");

  it("ranks by similarity and honours topK", () => {
    const store = storeWith([
      [chunk, [1, 0]],
      [other, [0, 1]],
    ]);

    const hits = store.search([1, 0], 10);
    expect(hits.map((hit) => hit.id)).toEqual([chunk.id, other.id]);
    expect(hits[0]?.score).toBeCloseTo(1, 10);
    expect(store.search([1, 0], 1)).toHaveLength(1);
    expect(store.search([1, 0], 0)).toEqual([]);
  });

  it("keeps chunk metadata alongside the vector", () => {
    const store = storeWith([[chunk, [1, 0]]]);

    expect(store.search([1, 0], 1)[0]?.metadata).toEqual({
      styleSlug: "glassmorphism",
      kind: "identity",
      locale: "zh-CN",
      weight: CHUNK_WEIGHTS.identity,
      contentHash: chunk.contentHash,
    });
  });

  it("rejects vectors of the wrong size", () => {
    const store = new InMemoryVectorStore({ dimensions: DIMENSIONS, model: "fake" });

    expect(() => store.upsert([chunk], [[1, 0, 0]])).toThrow(/dimensions/u);
    expect(() => store.upsert([chunk, other], [[1, 0]])).toThrow(/vectors for/u);
    expect(() => store.search([1, 0, 0], 1)).toThrow(/Query vector/u);
  });

  it("round trips through the JSON file store", async () => {
    const files = new Map<string, string>();
    const writeFileImpl = (async (filePath: string, data: string) => {
      files.set(String(filePath), data);
    }) as unknown as typeof writeFile;
    const readFileImpl = (async (filePath: string) => {
      const value = files.get(String(filePath));
      if (value === undefined) throw new Error("ENOENT");
      return value;
    }) as unknown as typeof readFile;
    const mkdirImpl = (async () => undefined) as unknown as typeof mkdir;

    const path = ".data/test-style-vectors.json";
    const store = new JsonFileVectorStore({
      dimensions: DIMENSIONS,
      model: "fake-embedding-v1",
      filePath: path,
      readFileImpl,
      writeFileImpl,
      mkdirImpl,
    });
    store.upsert([chunk, other], [
      [1, 0],
      [0, 1],
    ]);
    await store.save();

    const reopened = await JsonFileVectorStore.open({
      dimensions: DIMENSIONS,
      model: "fake-embedding-v1",
      filePath: path,
      readFileImpl,
      writeFileImpl,
      mkdirImpl,
    });

    expect(reopened.size()).toBe(2);
    expect(reopened.search([1, 0], 2).map((hit) => hit.id)).toEqual([chunk.id, other.id]);
    expect(reopened.search([1, 0], 1)[0]?.metadata.styleSlug).toBe("glassmorphism");
  });

  it("returns an empty store when the index file does not exist", async () => {
    const readFileImpl = (async () => {
      throw new Error("ENOENT");
    }) as unknown as typeof readFile;

    const store = await JsonFileVectorStore.open({
      dimensions: DIMENSIONS,
      model: "fake-embedding-v1",
      filePath: ".data/missing.json",
      readFileImpl,
    });

    expect(store.size()).toBe(0);
    expect(store.lastBuiltAt).toBeNull();
  });

  it("refuses to open an index built for another model or size", async () => {
    const payload = JSON.stringify({ version: 1, model: "other-model", dimensions: 2, entries: [] });
    const readFileImpl = (async () => payload) as unknown as typeof readFile;

    await expect(
      JsonFileVectorStore.open({
        dimensions: DIMENSIONS,
        model: "fake-embedding-v1",
        filePath: ".data/stale.json",
        readFileImpl,
      }),
    ).rejects.toThrow(/Rebuild it/u);

    await expect(
      JsonFileVectorStore.open({
        dimensions: 8,
        model: "other-model",
        filePath: ".data/stale.json",
        readFileImpl,
      }),
    ).rejects.toThrow(/dimensions/u);
  });

  it("drops entries a rebuild no longer produces", () => {
    const store = storeWith([
      [chunk, [1, 0]],
      [other, [0, 1]],
    ]);

    expect(store.retainOnly(new Set([chunk.id]))).toBe(1);
    expect(store.ids()).toEqual([chunk.id]);
  });
});
