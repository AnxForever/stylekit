import { describe, expect, it } from "vitest";

import { hashChunkText, styleChunkId, type StyleChunk } from "@/lib/retrieval/chunk-styles";
import {
  EmbeddingCache,
  EmbeddingError,
  MAX_BATCH_SIZE,
  createDashScopeEmbeddingProvider,
  embedChunks,
  resolveDashScopeConfig,
  resolveEmbeddingsEndpoint,
} from "@/lib/retrieval/embedding";

/**
 * Every test here drives the provider through an injected `fetch`, so the real
 * DashScope endpoint is never contacted and no quota is spent.
 */

interface FetchCall {
  url: string;
  body: { model: string; input: string[]; dimensions: number };
  authorization: string | undefined;
}

function embeddingsResponse(count: number, dimensions: number, offset = 0) {
  return {
    object: "list",
    data: Array.from({ length: count }, (_, index) => ({
      object: "embedding",
      index: index + offset,
      embedding: Array.from({ length: dimensions }, (_, dimension) => index + dimension / 100),
    })),
  };
}

type FetchHandler = (call: FetchCall, attempt: number) => Response | Promise<Response>;

function createFetch(handler: FetchHandler): {
  fetchImpl: typeof fetch;
  calls: FetchCall[];
} {
  const calls: FetchCall[] = [];

  const fetchImpl = (async (url: unknown, init: unknown) => {
    const options = init as { body: string; headers: Record<string, string> };
    const call: FetchCall = {
      url: String(url),
      body: JSON.parse(options.body) as FetchCall["body"],
      authorization: options.headers.Authorization,
    };
    calls.push(call);
    return await handler(call, calls.length);
  }) as unknown as typeof fetch;

  return { fetchImpl, calls };
}

function createProvider(
  handler: FetchHandler,
  overrides: Partial<Parameters<typeof createDashScopeEmbeddingProvider>[0]> = {},
) {
  const { fetchImpl, calls } = createFetch(handler);
  const provider = createDashScopeEmbeddingProvider({
    apiKey: "test-key",
    dimensions: 4,
    retryDelayMs: 1,
    sleep: async () => undefined,
    fetchImpl,
    ...overrides,
  });
  return { provider, calls };
}

function makeChunk(text: string, slug = "style"): StyleChunk {
  return {
    id: styleChunkId(slug, "identity", "zh-CN"),
    styleSlug: slug,
    kind: "identity",
    locale: "zh-CN",
    text,
    weight: 1,
    contentHash: hashChunkText(text),
  };
}

describe("dashscope configuration", () => {
  it("normalises the endpoint", () => {
    expect(resolveEmbeddingsEndpoint("https://example.com/v1")).toBe("https://example.com/v1/embeddings");
    expect(resolveEmbeddingsEndpoint("https://example.com/v1/")).toBe("https://example.com/v1/embeddings");
    expect(resolveEmbeddingsEndpoint("https://example.com/v1/embeddings")).toBe(
      "https://example.com/v1/embeddings",
    );
  });

  it("fails loudly when the API key is missing", () => {
    expect(() => resolveDashScopeConfig({})).toThrow(EmbeddingError);
    expect(() => resolveDashScopeConfig({})).toThrow(/DASHSCOPE_API_KEY/u);

    try {
      resolveDashScopeConfig({});
    } catch (error) {
      expect((error as EmbeddingError).code).toBe("CONFIGURATION_ERROR");
    }
  });

  it("reads the environment and lets overrides win", () => {
    const config = resolveDashScopeConfig({ DASHSCOPE_API_KEY: " env-key ", DASHSCOPE_BASE_URL: "https://env" });

    expect(config.apiKey).toBe("env-key");
    expect(config.baseUrl).toBe("https://env");
    expect(config.model).toBe("text-embedding-v4");
    expect(config.dimensions).toBe(1024);
    expect(resolveDashScopeConfig({ DASHSCOPE_API_KEY: "k" }, { model: "other" }).model).toBe("other");
  });

  it("refuses to build a provider without a key", () => {
    expect(() => createDashScopeEmbeddingProvider({ env: {} })).toThrow(/DASHSCOPE_API_KEY/u);
  });
});

describe("dashscope embedding requests", () => {
  it("posts the model, inputs and dimensions with a bearer token", async () => {
    const { provider, calls } = createProvider(() => Response.json(embeddingsResponse(2, 4)));

    const vectors = await provider.embed(["第一段文字内容", "second passage"]);

    expect(vectors).toHaveLength(2);
    expect(calls[0]?.url).toBe("https://dashscope.aliyuncs.com/compatible-mode/v1/embeddings");
    expect(calls[0]?.authorization).toBe("Bearer test-key");
    expect(calls[0]?.body).toMatchObject({ model: "text-embedding-v4", dimensions: 4 });
    expect(calls[0]?.body.input).toEqual(["第一段文字内容", "second passage"]);
  });

  it("splits requests into batches of at most MAX_BATCH_SIZE", async () => {
    const { provider, calls } = createProvider((call) =>
      Response.json(embeddingsResponse(call.body.input.length, 4)),
    );

    const vectors = await provider.embed(Array.from({ length: 60 }, (_, index) => `text ${index}`));

    expect(vectors).toHaveLength(60);
    // This asserts the client honours its own cap. It cannot tell you whether
    // the cap matches the endpoint — a fake provider accepts any batch size,
    // which is exactly how 25 shipped and then failed on the first live run.
    // The real limit is in MAX_BATCH_SIZE's comment.
    expect(calls.map((call) => call.body.input.length).sort((a, b) => b - a)).toEqual(
      Array.from({ length: 60 / MAX_BATCH_SIZE }, () => MAX_BATCH_SIZE),
    );
  });

  it("clamps a configured batch size that would exceed the endpoint limit", async () => {
    const { provider, calls } = createProvider(
      (call) => Response.json(embeddingsResponse(call.body.input.length, 4)),
      { batchSize: 99 },
    );

    await provider.embed(Array.from({ length: 25 }, (_, index) => `text ${index}`));

    expect(Math.max(...calls.map((call) => call.body.input.length))).toBeLessThanOrEqual(
      MAX_BATCH_SIZE,
    );
  });

  it("keeps vectors aligned with their inputs when batches finish out of order", async () => {
    const dimensions = 4;
    const { provider } = createProvider(async (call) => {
      // Answer later batches first to prove order comes from the input, not timing.
      await new Promise((resolve) => setTimeout(resolve, call.body.input[0] === "text 0" ? 20 : 0));
      return Response.json(embeddingsResponse(call.body.input.length, dimensions));
    });

    const vectors = await provider.embed(Array.from({ length: 30 }, (_, index) => `text ${index}`));

    expect(vectors[0]).toEqual(embeddingsResponse(30, dimensions).data[0]?.embedding);
  });

  it("reorders a response that arrives out of index order", async () => {
    const { provider } = createProvider(() =>
      Response.json({
        data: [
          { index: 1, embedding: [1, 1, 1, 1] },
          { index: 0, embedding: [0, 0, 0, 0] },
        ],
      }),
    );

    expect(await provider.embed(["first", "second"])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ]);
  });

  it("returns an empty list for an empty input", async () => {
    const { provider, calls } = createProvider(() => Response.json(embeddingsResponse(0, 4)));

    expect(await provider.embed([])).toEqual([]);
    expect(calls).toEqual([]);
  });

  it("rejects blank inputs before spending a request", async () => {
    const { provider, calls } = createProvider(() => Response.json(embeddingsResponse(1, 4)));

    await expect(provider.embed(["ok", "   "])).rejects.toThrow(/empty/u);
    expect(calls).toEqual([]);
  });
});

describe("dashscope retries", () => {
  it("retries a 500 with exponential backoff and succeeds", async () => {
    const delays: number[] = [];
    const { provider, calls } = createProvider(
      (_call, attempt) =>
        attempt < 3 ? new Response("upstream boom", { status: 500 }) : Response.json(embeddingsResponse(1, 4)),
      { sleep: async (ms: number) => void delays.push(ms) },
    );

    expect(await provider.embed(["text"])).toHaveLength(1);
    expect(calls).toHaveLength(3);
    expect(delays).toEqual([1, 2]);
  });

  it("retries a 429", async () => {
    const { provider, calls } = createProvider((_call, attempt) =>
      attempt === 1 ? new Response("slow down", { status: 429 }) : Response.json(embeddingsResponse(1, 4)),
    );

    await provider.embed(["text"]);
    expect(calls).toHaveLength(2);
  });

  it("does not retry a 400", async () => {
    const { provider, calls } = createProvider(() => new Response("bad request", { status: 400 }));

    await expect(provider.embed(["text"])).rejects.toMatchObject({ code: "UPSTREAM_ERROR", retryable: false });
    expect(calls).toHaveLength(1);
  });

  it("retries a transport failure", async () => {
    const { provider, calls } = createProvider((_call, attempt) => {
      if (attempt === 1) throw new Error("ECONNRESET");
      return Response.json(embeddingsResponse(1, 4));
    });

    await provider.embed(["text"]);
    expect(calls).toHaveLength(2);
  });

  it("gives up after three attempts", async () => {
    const { provider, calls } = createProvider(() => new Response("boom", { status: 503 }));

    await expect(provider.embed(["text"])).rejects.toMatchObject({ status: 503 });
    expect(calls).toHaveLength(3);
  });

  it("surfaces a timeout as a retryable upstream error", async () => {
    const { provider, calls } = createProvider(
      () => {
        const error = new Error("aborted");
        error.name = "AbortError";
        throw error;
      },
      { timeoutMs: 5 },
    );

    await expect(provider.embed(["text"])).rejects.toMatchObject({ status: 504, retryable: true });
    expect(calls).toHaveLength(3);
  });
});

describe("dashscope response validation", () => {
  it("rejects a vector count that does not match the batch", async () => {
    const { provider } = createProvider(() => Response.json(embeddingsResponse(1, 4)));

    await expect(provider.embed(["a", "b"])).rejects.toMatchObject({ code: "INVALID_RESPONSE" });
  });

  it("rejects a vector with the wrong dimensionality", async () => {
    const { provider } = createProvider(() => Response.json(embeddingsResponse(1, 8)));

    await expect(provider.embed(["a"])).rejects.toThrow(/dimension/u);
  });

  it("rejects a malformed vector", async () => {
    const { provider } = createProvider(() => Response.json({ data: [{ index: 0, embedding: ["x", "y"] }] }));

    await expect(provider.embed(["a"])).rejects.toMatchObject({ code: "INVALID_RESPONSE" });
  });
});

/** In-memory stand-in for the `node:fs/promises` calls the cache makes. */
function cacheFiles(initial?: string) {
  const files = new Map<string, string>();
  if (initial !== undefined) files.set("cache.json", initial);

  return {
    files,
    readFileImpl: (async (filePath: string) => {
      const value = files.get(String(filePath));
      if (value === undefined) throw new Error("ENOENT");
      return value;
    }) as unknown as typeof import("node:fs/promises").readFile,
    writeFileImpl: (async (filePath: string, data: string) => {
      files.set(String(filePath), data);
    }) as unknown as typeof import("node:fs/promises").writeFile,
    mkdirImpl: (async () => undefined) as unknown as typeof import("node:fs/promises").mkdir,
  };
}

describe("embedding cache", () => {
  const files = cacheFiles();

  it("starts empty when there is no cache file", async () => {
    const cache = await EmbeddingCache.load({
      filePath: "missing.json",
      model: "m",
      dimensions: 4,
      ...files,
    });

    expect(cache.size).toBe(0);
    expect(cache.warnings).toEqual([]);
  });

  it("round trips through a file", async () => {
    const io = cacheFiles();
    const cache = await EmbeddingCache.load({ filePath: "cache.json", model: "m", dimensions: 4, ...io });
    cache.set("hash-a", [1, 2, 3, 4]);
    await cache.save();

    const reopened = await EmbeddingCache.load({ filePath: "cache.json", model: "m", dimensions: 4, ...io });
    expect(reopened.get("hash-a")).toEqual([1, 2, 3, 4]);
    expect(reopened.size).toBe(1);
  });

  it("refuses to mix vectors from another model", async () => {
    const io = cacheFiles();
    const cache = await EmbeddingCache.load({ filePath: "cache.json", model: "m", dimensions: 4, ...io });
    cache.set("hash-a", [1, 2, 3, 4]);
    await cache.save();

    const incompatible = await EmbeddingCache.load({
      filePath: "cache.json",
      model: "other-model",
      dimensions: 4,
      ...io,
    });

    expect(incompatible.size).toBe(0);
    expect(incompatible.warnings[0]).toMatch(/other-model/u);
  });

  it("ignores a corrupt cache instead of failing the build", async () => {
    const io = cacheFiles();
    const cache = await EmbeddingCache.load({ filePath: "cache.json", model: "m", dimensions: 4, ...io });
    await cache.save();
    io.files.set("cache.json", "{not json");

    const reloaded = await EmbeddingCache.load({ filePath: "cache.json", model: "m", dimensions: 4, ...io });
    expect(reloaded.size).toBe(0);
    expect(reloaded.warnings[0]).toMatch(/unreadable/u);
  });

  it("refuses to store a vector of the wrong size", async () => {
    const cache = await EmbeddingCache.load({ filePath: "cache.json", model: "m", dimensions: 4, ...files });

    expect(() => cache.set("hash", [1, 2])).toThrow(/dimension/u);
  });
});

describe("embedChunks", () => {
  it("embeds once per distinct text and reuses the cache afterwards", async () => {
    const io = cacheFiles();
    const chunks = [makeChunk("相同的一段文字内容", "style-a"), makeChunk("相同的一段文字内容", "style-b")];

    const firstRun = createProvider((call) => Response.json(embeddingsResponse(call.body.input.length, 4)));
    const cache = await EmbeddingCache.load({ filePath: "cache.json", model: "text-embedding-v4", dimensions: 4, ...io });

    const first = await embedChunks(chunks, firstRun.provider, { cache });

    expect(first.embedded).toBe(1);
    expect(first.cached).toBe(0);
    expect(first.vectors).toHaveLength(2);
    expect(first.vectors[0]).toEqual(first.vectors[1]);
    expect(firstRun.calls[0]?.body.input).toHaveLength(1);

    const secondRun = createProvider((call) => Response.json(embeddingsResponse(call.body.input.length, 4)));
    const second = await embedChunks(chunks, secondRun.provider, { cache });

    expect(second.embedded).toBe(0);
    expect(second.cached).toBe(1);
    expect(secondRun.calls).toEqual([]);
    expect(second.vectors).toEqual(first.vectors);
  });

  it("only sends the chunks the cache is missing", async () => {
    const io = cacheFiles();
    const cached = makeChunk("已经缓存过的文字内容", "style-a");
    const fresh = makeChunk("还没有缓存的文字内容", "style-b");

    const prime = createProvider((call) => Response.json(embeddingsResponse(call.body.input.length, 4)));
    const cache = await EmbeddingCache.load({ filePath: "cache.json", model: "text-embedding-v4", dimensions: 4, ...io });
    await embedChunks([cached], prime.provider, { cache });

    const secondRun = createProvider((call) => Response.json(embeddingsResponse(call.body.input.length, 4)));
    const result = await embedChunks([cached, fresh], secondRun.provider, { cache });

    expect(result.cached).toBe(1);
    expect(result.embedded).toBe(1);
    expect(secondRun.calls[0]?.body.input).toEqual([fresh.text]);
  });

  it("rejects a provider that returns the wrong number of vectors", async () => {
    const { provider } = createProvider((call) => Response.json(embeddingsResponse(call.body.input.length, 8)));

    await expect(embedChunks([makeChunk("一段足够长的文字内容用于测试")], provider)).rejects.toThrow(/dimension/u);
  });
});
