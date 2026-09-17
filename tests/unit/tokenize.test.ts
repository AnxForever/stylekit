import { describe, expect, it } from "vitest";

import {
  detectLocale,
  hasCjk,
  hasIntlSegmenter,
  legacySplitTokens,
  normalizeText,
  segmentWords,
  tokenize,
  tokenizeForSearch,
} from "@/lib/retrieval/tokenize";

describe("legacy tokenizer", () => {
  // These two cases are the documented defect: `\p{L}` treats Han characters
  // as word characters, so a space-free Chinese sentence survives the split
  // whole.
  it("collapses a Chinese sentence into a single token", () => {
    expect(legacySplitTokens("我要一个适合金融后台的克制风格")).toHaveLength(1);
    expect(legacySplitTokens("深色夜景毛玻璃质感")).toHaveLength(1);
  });

  it("still splits space-delimited languages correctly", () => {
    expect(legacySplitTokens("dark mode dashboard")).toEqual(["dark", "mode", "dashboard"]);
    expect(legacySplitTokens("glassmorphism frosted blur")).toEqual([
      "glassmorphism",
      "frosted",
      "blur",
    ]);
  });
});

describe("Intl.Segmenter tokenizer", () => {
  it("is available on this runtime", () => {
    expect(hasIntlSegmenter()).toBe(true);
  });

  it("splits the design doc's Chinese queries into real words", () => {
    const tokens = tokenize("我要一个适合金融后台的克制风格");

    expect(tokens.length).toBeGreaterThan(1);
    expect(tokens).toEqual(expect.arrayContaining(["金融", "后台", "克制", "风格"]));
  });

  it("keeps English queries intact", () => {
    expect(tokenize("dark mode dashboard")).toEqual(["dark", "mode", "dashboard"]);
    expect(tokenize("glassmorphism frosted blur")).toEqual([
      "glassmorphism",
      "frosted",
      "blur",
    ]);
  });

  it("indexes the same query to the same tokens as the document side", () => {
    // Query and index must agree, or BM25 scores zero no matter how good the
    // segmentation is.
    expect(tokenizeForSearch("毛玻璃 毛玻璃")).toEqual(tokenizeForSearch("毛玻璃"));
  });

  it("drops punctuation-only segments and lowercases", () => {
    expect(tokenize("Glassmorphism, frosted blur.")).toEqual([
      "glassmorphism",
      "frosted",
      "blur",
    ]);
  });

  it("adds character bigrams for long CJK tokens", () => {
    // "野兽派" is a single dictionary word; the bigrams let it still overlap a
    // document that segmented the same characters differently.
    expect(tokenize("野兽派")).toEqual(["野兽派"]);
    expect(tokenizeForSearch("野兽派")).toEqual(["野兽派", "野兽", "兽派"]);
  });

  it("filters stopwords only when asked", () => {
    expect(tokenize("我要一个适合金融后台的克制风格")).toContain("一个");
    expect(tokenize("我要一个适合金融后台的克制风格", { dropStopwords: true })).not.toContain(
      "一个",
    );
    expect(tokenizeForSearch("我要一个适合金融后台的克制风格")).toEqual([
      "适合",
      "金融",
      "后台",
      "克制",
      "风格",
    ]);
  });

  it("honours minLength for primary tokens", () => {
    expect(tokenize("dark mode", { minLength: 5 })).toEqual([]);
  });

  it("falls back to the legacy split when the segmenter is unavailable", () => {
    expect(tokenize("我要一个适合金融后台的克制风格", { forceFallback: true })).toEqual([
      "我要一个适合金融后台的克制风格",
    ]);
  });

  it("returns nothing for blank input", () => {
    expect(tokenize("   ")).toEqual([]);
    expect(segmentWords("")).toEqual([]);
  });
});

describe("locale detection", () => {
  it("recognises Chinese queries", () => {
    expect(detectLocale("我要一个适合金融后台的克制风格")).toBe("zh-CN");
    expect(detectLocale("毛玻璃")).toBe("zh-CN");
  });

  it("recognises English queries", () => {
    expect(detectLocale("dark mode dashboard")).toBe("en-US");
    expect(detectLocale("glassmorphism frosted blur")).toBe("en-US");
  });

  it("defaults to English for empty input", () => {
    expect(detectLocale("")).toBe("en-US");
  });
});

describe("text helpers", () => {
  it("collapses whitespace and trims", () => {
    expect(normalizeText("  玻璃   拟态 \n 质感 ")).toBe("玻璃 拟态 质感");
  });

  it("detects CJK presence", () => {
    expect(hasCjk("玻璃拟态")).toBe(true);
    expect(hasCjk("glassmorphism")).toBe(false);
  });
});
