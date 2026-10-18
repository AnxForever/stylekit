import { describe, expect, it } from "vitest";
import {
  filterDownloadPacks,
  getDownloadFilterHref,
  parseDownloadFilters,
} from "@/lib/downloads/filters";
import type { DownloadPack } from "@/lib/downloads/types";

// Synthetic filter fixtures, independent of the published model inventory.
function makePack(overrides: Partial<DownloadPack>): DownloadPack {
  return {
    slug: "furniture-fixture",
    kind: "3d",
    style: "low-poly",
    theme: "furniture",
    name: { zh: "家具测试模型", en: "Furniture Fixture" },
    description: { zh: "简洁的低多边形模型", en: "Simple low-poly models" },
    version: "1.0.0",
    itemCount: 1,
    tags: ["glb", "simple"],
    styleSlugs: ["scandinavian"],
    publication: "draft",
    license: { status: "pending" },
    cover: { src: "/previews/fixture.png", alt: { zh: "测试模型", en: "Fixture" }, kind: "image" },
    previews: [],
    files: [],
    notes: [],
    ...overrides,
  };
}

const packs = [
  makePack({}),
  makePack({
    slug: "creature-fixture",
    style: "clay",
    theme: "creatures",
    name: { zh: "生物测试模型", en: "Creature Fixture" },
    description: { zh: "圆润的角色造型", en: "Rounded character shapes" },
    tags: ["blend", "soft"],
    styleSlugs: ["minimalist-flat"],
  }),
  makePack({
    slug: "tower-fixture",
    style: "voxel",
    theme: "architecture",
    name: { zh: "建筑测试模型", en: "Tower Fixture" },
    description: { zh: "方块建筑", en: "Block architecture" },
    tags: ["glb", "blocks"],
    styleSlugs: ["pixel-art"],
  }),
];

describe("model download filters", () => {
  it("uses safe defaults and normalizes bounded search text", () => {
    expect(parseDownloadFilters("?style=unknown&theme=unknown&q=%20hello%20&pack=../private")).toEqual({
      style: "all",
      theme: "all",
      query: "hello",
      selected: null,
    });
    expect(parseDownloadFilters(`?q=${"a".repeat(150)}`).query).toHaveLength(120);
    expect(parseDownloadFilters("")).toEqual({ style: "all", theme: "all", query: "", selected: null });
  });

  it("accepts supported styles and themes independently", () => {
    for (const style of ["low-poly", "clay", "voxel", "futuristic", "cartoon", "toy"]) {
      expect(parseDownloadFilters(`?style=${style}&theme=invalid`)).toEqual({
        style, theme: "all", query: "", selected: null,
      });
    }
    for (const theme of ["props", "creatures", "architecture", "scenes", "furniture"]) {
      expect(parseDownloadFilters(`?style=invalid&theme=${theme}`)).toEqual({
        style: "all", theme, query: "", selected: null,
      });
    }
  });

  it("accepts canonical pack slugs and rejects encoded paths or malformed names", () => {
    expect(parseDownloadFilters("?style=low-poly&theme=furniture&pack=furniture-fixture")).toEqual({
      style: "low-poly", theme: "furniture", query: "", selected: "furniture-fixture",
    });
    for (const pack of ["%2Fprivate", "model%2Fpack", "-model", "model--pack", "Model", "x".repeat(129)]) {
      expect(parseDownloadFilters(`?pack=${pack}`).selected, pack).toBeNull();
    }
  });

  it("combines art style, theme, and bilingual text, tag, and site-style searches", () => {
    expect(filterDownloadPacks(packs, "all", "all", "家具")).toEqual([packs[0]]);
    expect(filterDownloadPacks(packs, "low-poly", "furniture", "simple GLB")).toEqual([packs[0]]);
    expect(filterDownloadPacks(packs, "all", "creatures", "圆润")).toEqual([packs[1]]);
    expect(filterDownloadPacks(packs, "clay", "all", "MINIMALIST-FLAT")).toEqual([packs[1]]);
    expect(filterDownloadPacks(packs, "voxel", "architecture", "glb")).toEqual([packs[2]]);
    expect(filterDownloadPacks(packs, "clay", "furniture", "")).toEqual([]);
    expect(filterDownloadPacks(packs, "all", "all", "   ")).toEqual(packs);
  });

  it("retains draft previews in search without changing publication or license state", () => {
    const result = filterDownloadPacks(packs, "low-poly", "furniture", "fixture");
    expect(result).toEqual([packs[0]]);
    expect(result[0].publication).toBe("draft");
    expect(result[0].license.status).toBe("pending");
  });

  it("updates only requested fields and preserves the locale, campaign, and fragment", () => {
    const current = new URL("https://stylekit.test/zh/downloads?style=low-poly&theme=furniture&pack=furniture-fixture&utm_source=share#gallery");
    const destination = new URL(getDownloadFilterHref(current, { query: " 中文 & glb " }), current);

    expect(destination.pathname).toBe("/zh/downloads");
    expect(destination.hash).toBe("#gallery");
    expect(destination.searchParams.get("utm_source")).toBe("share");
    expect(parseDownloadFilters(destination.search)).toEqual({
      style: "low-poly", theme: "furniture", query: "中文 & glb", selected: "furniture-fixture",
    });
    expect(current.searchParams.has("q")).toBe(false);
  });

  it("removes default filters and supports explicitly clearing the selected pack", () => {
    const current = new URL("https://stylekit.test/en/downloads?style=clay&theme=creatures&q=rounded&pack=creature-fixture&campaign=launch");
    const href = getDownloadFilterHref(current, { style: "all", theme: "all", query: "  ", selected: null });
    expect(href).toBe("/en/downloads?campaign=launch");
    expect(new URL(getDownloadFilterHref(current, { selected: "../private" }), current).searchParams.has("pack")).toBe(false);
  });

  it("reconstructs filtered and selected state from history URLs", () => {
    const initial = new URL("https://stylekit.test/downloads?campaign=launch");
    const filtered = new URL(getDownloadFilterHref(initial, { style: "clay", theme: "creatures", query: "rounded", selected: null }), initial);
    const selected = new URL(getDownloadFilterHref(filtered, { selected: "creature-fixture" }), initial);

    expect(parseDownloadFilters(selected.search)).toEqual({ style: "clay", theme: "creatures", query: "rounded", selected: "creature-fixture" });
    expect(parseDownloadFilters(filtered.search)).toEqual({ style: "clay", theme: "creatures", query: "rounded", selected: null });
    expect(parseDownloadFilters(initial.search)).toEqual({ style: "all", theme: "all", query: "", selected: null });
    expect(parseDownloadFilters(selected.search).selected).toBe("creature-fixture");
  });
});
