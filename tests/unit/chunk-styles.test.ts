import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import {
  CHUNK_WEIGHTS,
  MIN_CHUNK_LENGTH,
  chunkStyles,
  hashChunkText,
  styleChunkId,
  summarizeChunks,
  type StyleChunk,
} from "@/lib/retrieval/chunk-styles";
import { styles } from "@/lib/styles/registry";
import type { DesignStyle } from "@/lib/styles/types";

function makeStyle(overrides: Partial<DesignStyle> = {}): DesignStyle {
  return {
    slug: "test-style",
    name: "测试风格",
    nameEn: "Test Style",
    description: "这是一个用于单元测试的风格描述，长度足以生成一个独立的 identity chunk。",
    descriptionEn: "A restrained geometric style that exists only for the unit tests.",
    cover: "/images/styles/test-style.png",
    styleType: "visual",
    tags: ["geometric"],
    category: "modern",
    colors: { primary: "#000000", secondary: "#ffffff", accent: ["#ff0000"] },
    keywords: ["测试", "几何", "克制"],
    keywordsEn: ["test", "geometric", "restrained"],
    philosophy:
      "这个风格的哲学是保持克制与秩序，用最少的装饰表达最多的信息，让内容自己说话，而不是靠装饰喧哗。",
    philosophyEn:
      "The philosophy keeps restraint and order, saying the most with the least decoration and letting content speak.",
    doList: ["使用克制的配色，避免超过三种主色", "保持一致的间距节奏与对齐方式"],
    doListEn: ["Keep the palette restrained, no more than three primaries"],
    dontList: ["不要使用多余的阴影"],
    components: {
      button: {
        name: "Button",
        description: "A flat button with a visible focus ring.",
        code: "<button className=\"btn\">Go</button>",
      },
      card: {
        name: "Card",
        description: "A bordered card with a compact header.",
        code: "<div className=\"card\">Card</div>",
      },
      input: {
        name: "Input",
        description: "A minimal input with a bottom border.",
        code: "<input className=\"input\" />",
      },
    },
    globalCss: "",
    aiRules: "",
    ...overrides,
  };
}

function chunkOf(chunks: readonly StyleChunk[], id: string): StyleChunk {
  const chunk = chunks.find((candidate) => candidate.id === id);
  if (!chunk) throw new Error(`Missing chunk ${id}`);
  return chunk;
}

describe("chunk ids and weights", () => {
  it("builds a stable id", () => {
    expect(styleChunkId("glassmorphism", "philosophy", "zh-CN")).toBe(
      "style:glassmorphism:philosophy:zh-CN",
    );
  });

  it("weights philosophy highest and recipes lowest", () => {
    expect(CHUNK_WEIGHTS.philosophy).toBeGreaterThan(CHUNK_WEIGHTS.identity);
    expect(CHUNK_WEIGHTS.identity).toBe(CHUNK_WEIGHTS.rules);
    expect(CHUNK_WEIGHTS.rules).toBeGreaterThan(CHUNK_WEIGHTS.recipes);
  });

  it("carries the weight for its kind", () => {
    const chunks = chunkStyles([makeStyle()]);

    expect(chunkOf(chunks, "style:test-style:philosophy:zh-CN").weight).toBe(
      CHUNK_WEIGHTS.philosophy,
    );
    expect(chunkOf(chunks, "style:test-style:rules:en-US").weight).toBe(CHUNK_WEIGHTS.rules);
  });
});

describe("chunk content hashing", () => {
  it("hashes the text with sha256", () => {
    const chunks = chunkStyles([makeStyle()]);
    const chunk = chunkOf(chunks, "style:test-style:identity:zh-CN");

    expect(chunk.contentHash).toBe(createHash("sha256").update(chunk.text, "utf8").digest("hex"));
    expect(chunk.contentHash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("is stable across runs", () => {
    const first = chunkStyles([makeStyle()]);
    const second = chunkStyles([makeStyle()]);

    expect(second).toEqual(first);
    expect(second.map((chunk) => chunk.contentHash)).toEqual(
      first.map((chunk) => chunk.contentHash),
    );
  });

  it("changes when the underlying text changes", () => {
    const before = chunkOf(chunkStyles([makeStyle()]), "style:test-style:philosophy:zh-CN");
    const after = chunkOf(
      chunkStyles([makeStyle({ philosophy: `${makeStyle().philosophy} 另外还要保持留白。` })]),
      "style:test-style:philosophy:zh-CN",
    );

    expect(after.contentHash).not.toBe(before.contentHash);
  });

  it("shares a hash between identical texts from different styles", () => {
    const shared = "完全相同的哲学正文，用来验证内容寻址缓存可以跨风格复用同一个向量。".repeat(2);
    const chunks = chunkStyles([
      makeStyle({ slug: "style-a", philosophy: shared }),
      makeStyle({ slug: "style-b", philosophy: shared }),
    ]);

    expect(chunkOf(chunks, "style:style-a:philosophy:zh-CN").contentHash).toBe(
      chunkOf(chunks, "style:style-b:philosophy:zh-CN").contentHash,
    );
  });

  it("exposes the same hash helper the chunker uses", () => {
    expect(hashChunkText("abc")).toBe(createHash("sha256").update("abc", "utf8").digest("hex"));
  });
});

describe("locale handling", () => {
  it("emits Chinese and English chunks separately", () => {
    const chunks = chunkStyles([makeStyle()]);

    expect(chunkOf(chunks, "style:test-style:identity:zh-CN").text).toContain("测试风格");
    expect(chunkOf(chunks, "style:test-style:identity:en-US").text).toContain("Test Style");
  });

  it("tags recipes with the script they are written in", () => {
    const english = chunkStyles([makeStyle()]).filter((chunk) => chunk.kind === "recipes");
    const chinese = chunkStyles([
      makeStyle({
        components: {
          button: { name: "按钮", description: "一个带可见聚焦环的扁平按钮，用于测试。", code: "" },
          card: { name: "卡片", description: "一个带紧凑页眉的边框卡片，用于测试。", code: "" },
          input: { name: "输入框", description: "一个只有下边框的极简输入框，用于测试。", code: "" },
        },
      }),
    ]).filter((chunk) => chunk.kind === "recipes");

    expect(english.map((chunk) => chunk.locale)).toEqual(["en-US"]);
    expect(chinese.map((chunk) => chunk.locale)).toEqual(["zh-CN"]);
  });

  it("skips the English philosophy when the style has none", () => {
    const chunks = chunkStyles([makeStyle({ philosophyEn: undefined })]);

    expect(chunks.some((chunk) => chunk.id === "style:test-style:philosophy:en-US")).toBe(false);
  });
});

describe("minimum chunk length", () => {
  it("drops drafts shorter than the floor", () => {
    const style = makeStyle({ philosophy: "太短", doList: [] });
    const ids = chunkStyles([style]).map((chunk) => chunk.id);

    expect(ids).not.toContain("style:test-style:philosophy:zh-CN");
    expect(ids).not.toContain("style:test-style:rules:zh-CN");
    // The English counterparts are untouched, so this is per-draft, not per-style.
    expect(ids).toContain("style:test-style:philosophy:en-US");
    expect(ids).toContain("style:test-style:identity:zh-CN");
  });

  it("never emits a chunk below the floor", () => {
    const chunks = chunkStyles(styles);

    expect(chunks.every((chunk) => chunk.text.length >= MIN_CHUNK_LENGTH)).toBe(true);
  });
});

describe("the real catalog", () => {
  const chunks = chunkStyles(styles);
  const stats = summarizeChunks(chunks);

  it("covers every style", () => {
    expect(stats.styles).toBe(styles.length);
    expect(stats.total).toBe(chunks.length);
  });

  it("produces several chunks per style", () => {
    // Four kinds, two locales each - recipes are single-locale and a few short
    // drafts are dropped, so the count lands comfortably inside this band.
    expect(stats.total).toBeGreaterThanOrEqual(styles.length * 4);
    expect(stats.total).toBeLessThanOrEqual(styles.length * 8);
  });

  it("emits all four kinds and both locales", () => {
    expect(stats.byKind.identity).toBeGreaterThan(0);
    expect(stats.byKind.philosophy).toBeGreaterThan(0);
    expect(stats.byKind.rules).toBeGreaterThan(0);
    expect(stats.byKind.recipes).toBe(styles.length);
    expect(stats.byLocale["zh-CN"]).toBeGreaterThan(0);
    expect(stats.byLocale["en-US"]).toBeGreaterThan(0);
  });

  it("gives every chunk a unique id", () => {
    expect(new Set(chunks.map((chunk) => chunk.id)).size).toBe(chunks.length);
  });

  it("orders chunks deterministically", () => {
    expect(chunkStyles(styles).map((chunk) => chunk.id)).toEqual(chunks.map((chunk) => chunk.id));
  });
});
