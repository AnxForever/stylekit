import { afterEach, describe, expect, it, vi } from "vitest";

import { resetStyleSearchService, searchStyleSlugs } from "@/lib/retrieval/style-search-service";

afterEach(() => {
  resetStyleSearchService();
  vi.unstubAllEnvs();
});

describe("style search service", () => {
  it("serves keyword results when no embedding key is configured", async () => {
    vi.stubEnv("DASHSCOPE_API_KEY", "");

    const result = await searchStyleSlugs("glassmorphism");
    expect(result.mode).toBe("keyword");
    expect(result.degradeReason).toBe("no-provider");
    expect(result.results.slice(0, 3).map((hit) => hit.slug)).toContain("glassmorphism");
  });

  it("finds styles for a colloquial Chinese query", async () => {
    vi.stubEnv("DASHSCOPE_API_KEY", "");

    const result = await searchStyleSlugs("毛玻璃");
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.results.slice(0, 5).map((hit) => hit.slug)).toContain("glassmorphism");
  });
});
