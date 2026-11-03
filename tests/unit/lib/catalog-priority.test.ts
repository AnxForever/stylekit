import { describe, expect, it } from "vitest";
import {
  CATALOG_LEAD_SLUGS,
  orderByCatalogPriority,
} from "@/lib/styles/catalog-priority";
import { getAllStylesMeta, getStyleMetaBySlug } from "@/lib/styles/meta";

interface Item {
  slug: string;
}

function items(...slugs: string[]): Item[] {
  return slugs.map((slug) => ({ slug }));
}

describe("orderByCatalogPriority", () => {
  it("returns the same array when none of its styles are listed", () => {
    const input = items("alpha", "bravo");
    expect(orderByCatalogPriority(input)).toBe(input);
  });

  it("moves listed styles to the front in the listed order", () => {
    const input = items("alpha", "quantized-line-field", "bravo");
    expect(orderByCatalogPriority(input).map((item) => item.slug)).toEqual([
      "quantized-line-field",
      "alpha",
      "bravo",
    ]);
  });

  it("keeps unlisted styles in their incoming order", () => {
    const input = items("charlie", "alpha", "bravo");
    expect(orderByCatalogPriority(input).map((item) => item.slug)).toEqual([
      "charlie",
      "alpha",
      "bravo",
    ]);
  });

  it("does not mutate the input", () => {
    const input = items("alpha", "quantized-line-field");
    orderByCatalogPriority(input);
    expect(input.map((item) => item.slug)).toEqual(["alpha", "quantized-line-field"]);
  });
});

describe("CATALOG_LEAD_SLUGS", () => {
  it("lists no duplicates", () => {
    expect(new Set(CATALOG_LEAD_SLUGS).size).toBe(CATALOG_LEAD_SLUGS.length);
  });

  it("names styles that exist in the registry", () => {
    const unknown = CATALOG_LEAD_SLUGS.filter((slug) => !getStyleMetaBySlug(slug));
    expect(unknown).toEqual([]);
  });

  it("orders every listed style ahead of unlisted ones in the real catalog", () => {
    const ordered = orderByCatalogPriority(getAllStylesMeta()).map((style) => style.slug);
    expect(ordered.slice(0, CATALOG_LEAD_SLUGS.length)).toEqual([...CATALOG_LEAD_SLUGS]);
    expect(ordered).toHaveLength(getAllStylesMeta().length);
  });
});
