import { describe, expect, it } from "vitest";
import { filterCommunityStyles, readCommunityCatalogFilters, updateCommunityCatalogQuery } from "@/lib/community/catalog-query";
import { getStyleFeedbackLoginHref, getStyleCommentsKey } from "@/lib/community/comments";
import { getStyleMetaBySlug } from "@/lib/styles/meta";

const defaults = { query: "", category: "all", tag: "all", sort: "newest" };

describe("shareable community catalog filters", () => {
  it("normalizes unknown filters without accepting arbitrary taxonomy values", () => {
    expect(readCommunityCatalogFilters(new URLSearchParams("category=made-up&tag=invalid&sort=sql"))).toEqual(defaults);
    expect(readCommunityCatalogFilters(new URLSearchParams(`q=${"x".repeat(200)}`)).query).toHaveLength(120);
  });

  it("preserves unrelated parameters and removes default filter values", () => {
    const current = new URLSearchParams("utm_source=share&q=dark&category=modern&sort=rating");
    const updated = new URLSearchParams(updateCommunityCatalogQuery(current, { query: "", category: "all", sort: "newest" }));
    expect(updated.toString()).toBe("utm_source=share");
    expect(current.get("q")).toBe("dark");
  });

  it("round-trips bilingual queries, taxonomy, and sort", () => {
    const query = updateCommunityCatalogQuery(new URLSearchParams(), {
      query: "暗色 UI", category: "modern", tag: "dark-theme", sort: "favorites",
    });
    expect(readCommunityCatalogFilters(new URLSearchParams(query))).toEqual({
      query: "暗色 UI", category: "modern", tag: "dark-theme", sort: "favorites",
    });
  });

  it("uses the same filtering contract for server schema and client results", () => {
    const dark = getStyleMetaBySlug("dark-mode");
    const glass = getStyleMetaBySlug("glassmorphism");
    if (!dark || !glass) throw new Error("Test styles missing");
    const filters = readCommunityCatalogFilters(new URLSearchParams("q=DARK MODE"));
    expect(filterCommunityStyles([dark, glass], filters).map((style) => style.slug)).toEqual(["dark-mode"]);
    expect(filterCommunityStyles([dark, glass], { ...filters, category: "retro" })).toEqual([]);
  });
});

describe("comment navigation", () => {
  it.each(["en", "zh"] as const)("preserves the %s community detail destination and discussion anchor", (locale) => {
    const href = getStyleFeedbackLoginHref(`/${locale}/community/aurora`, "aurora", locale);
    const url = new URL(href, "https://www.stylekit.top");
    expect(url.pathname).toBe(`/${locale}/login`);
    expect(url.searchParams.get("next")).toBe(`/${locale}/community/aurora#style-feedback`);
  });

  it("localizes legacy paths and rejects non-detail or external destinations", () => {
    expect(new URL(getStyleFeedbackLoginHref("/community/aurora", "aurora", "zh"), "https://www.stylekit.top").searchParams.get("next"))
      .toBe("/zh/community/aurora#style-feedback");
    for (const path of [null, "//evil.example", "https://evil.example", "/admin", "/community/u/42"]) {
      expect(new URL(getStyleFeedbackLoginHref(path, "dark-mode", "en"), "https://www.stylekit.top").searchParams.get("next"))
        .toBe("/en/styles/dark-mode#style-feedback");
    }
  });

  it("includes an offset in cache keys so comment pages cannot overwrite one another", () => {
    expect(getStyleCommentsKey("dark-mode")).toBe("/api/styles/dark-mode/comments?limit=10&offset=0");
    expect(getStyleCommentsKey("dark-mode", 10, 10)).toBe("/api/styles/dark-mode/comments?limit=10&offset=10");
  });
});
