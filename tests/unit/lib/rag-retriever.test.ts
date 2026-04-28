import { describe, expect, it } from "vitest";
import { getStyleKitRagCorpus } from "@/lib/rag/corpus";
import { searchStyleKitKnowledge } from "@/lib/rag/retriever";

describe("StyleKit RAG retriever", () => {
  it("builds a non-empty corpus from project knowledge sources", () => {
    const corpus = getStyleKitRagCorpus("en");

    expect(corpus.length).toBeGreaterThan(100);
    expect(corpus.some((item) => item.kind === "style")).toBe(true);
    expect(corpus.some((item) => item.kind === "template")).toBe(true);
    expect(corpus.some((item) => item.kind === "componentPattern")).toBe(true);
    expect(corpus.some((item) => item.kind === "webGuideline")).toBe(true);
  });

  it("retrieves style and template evidence for a SaaS landing query", () => {
    const results = searchStyleKitKnowledge({
      query: "SaaS landing page with pricing and hero section",
      locale: "en",
      limit: 6,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.citation.kind === "template")).toBe(true);
    expect(results.some((item) => item.citation.kind === "style" || item.citation.kind === "promptTopic")).toBe(true);
  });

  it("retrieves component patterns for dashboard navigation questions", () => {
    const results = searchStyleKitKnowledge({
      query: "dashboard sidebar navigation pattern for admin analytics",
      locale: "en",
      limit: 6,
    });

    expect(results.some((item) => item.citation.kind === "componentPattern")).toBe(true);
  });

  it("returns Chinese localized content for zh locale", () => {
    const results = searchStyleKitKnowledge({
      query: "玻璃拟态 设计系统",
      locale: "zh",
      limit: 3,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].citation.title).toBeDefined();
  });

  it("respects the limit parameter", () => {
    const results = searchStyleKitKnowledge({
      query: "button card input form",
      locale: "en",
      limit: 2,
    });

    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("returns snippets for retrieved documents", () => {
    const results = searchStyleKitKnowledge({
      query: "glassmorphism button",
      locale: "en",
      limit: 3,
    });

    expect(results.every((r) => r.citation.snippet.length > 0)).toBe(true);
  });

  it("returns empty results for non-matching query", () => {
    const results = searchStyleKitKnowledge({
      query: "xyznonexistentquery12345",
      locale: "en",
      limit: 10,
    });

    expect(results.length).toBe(0);
  });

  it("ranks results by relevance score", () => {
    const results = searchStyleKitKnowledge({
      query: "glassmorphism",
      locale: "en",
      limit: 5,
    });

    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].citation.score).toBeGreaterThanOrEqual(results[i].citation.score);
    }
  });
});
