import { describe, it, expect } from "vitest";
import { getAllStylesMeta } from "../meta";
import {
  SHOWCASE_SEQUENCE,
  getShowcaseNeighbors,
} from "../showcase-sequence";

describe("SHOWCASE_SEQUENCE", () => {
  it("matches getAllStylesMeta() slugs exactly, in catalog order", () => {
    // Guard: adding, removing, or reordering a style in meta-registry.ts
    // without updating showcase-sequence.ts must fail CI.
    expect(SHOWCASE_SEQUENCE.map(([slug]) => slug)).toEqual(
      getAllStylesMeta().map((style) => style.slug)
    );
  });

  it("carries the registry English display name for every entry", () => {
    const nameEnBySlug = new Map(
      getAllStylesMeta().map((style) => [style.slug, style.nameEn])
    );
    for (const [slug, name] of SHOWCASE_SEQUENCE) {
      expect(name).toBe(nameEnBySlug.get(slug));
    }
  });

  it("has no duplicate slugs", () => {
    const slugs = SHOWCASE_SEQUENCE.map(([slug]) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getShowcaseNeighbors", () => {
  const first = SHOWCASE_SEQUENCE[0];
  const second = SHOWCASE_SEQUENCE[1];
  const last = SHOWCASE_SEQUENCE[SHOWCASE_SEQUENCE.length - 1];

  it("returns adjacent entries for a middle slug", () => {
    const neighbors = getShowcaseNeighbors(second[0]);
    expect(neighbors).not.toBeNull();
    expect(neighbors?.index).toBe(1);
    expect(neighbors?.total).toBe(SHOWCASE_SEQUENCE.length);
    expect(neighbors?.prev).toEqual(first);
    expect(neighbors?.next).toEqual(SHOWCASE_SEQUENCE[2]);
  });

  it("wraps the first slug back to the last entry", () => {
    const neighbors = getShowcaseNeighbors(first[0]);
    expect(neighbors?.prev).toEqual(last);
    expect(neighbors?.next).toEqual(second);
  });

  it("wraps the last slug forward to the first entry", () => {
    const neighbors = getShowcaseNeighbors(last[0]);
    expect(neighbors?.prev).toEqual(
      SHOWCASE_SEQUENCE[SHOWCASE_SEQUENCE.length - 2]
    );
    expect(neighbors?.next).toEqual(first);
  });

  it("returns null for a slug outside the catalog", () => {
    expect(getShowcaseNeighbors("not-a-style")).toBeNull();
  });
});
