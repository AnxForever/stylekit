import { describe, expect, it } from "vitest";
import {
  RATING_CONFIDENCE_VOTES,
  catalogRatingMean,
  parseCatalogSort,
  smoothedRating,
  sortCatalogStyles,
  type CatalogStats,
} from "@/lib/styles/catalog-sort";
import { emptyStyleStatsEntry } from "@/lib/styles/catalog-stats";

interface TestStyle {
  slug: string;
  name: string;
  nameEn?: string;
}

function style(slug: string, nameEn = slug): TestStyle {
  return { slug, name: slug, nameEn };
}

function entry(overrides: Partial<CatalogStats[string]>): CatalogStats[string] {
  return { ...emptyStyleStatsEntry(), ...overrides };
}

const styles: TestStyle[] = [
  style("alpha", "Alpha"),
  style("bravo", "Bravo"),
  style("charlie", "Charlie"),
];

describe("parseCatalogSort", () => {
  it("accepts every supported option", () => {
    expect(parseCatalogSort("popular")).toBe("popular");
    expect(parseCatalogSort("favorites")).toBe("favorites");
    expect(parseCatalogSort("rating")).toBe("rating");
    expect(parseCatalogSort("name-desc")).toBe("name-desc");
  });

  it("falls back to recommended for unknown or missing values", () => {
    expect(parseCatalogSort("trending")).toBe("recommended");
    expect(parseCatalogSort(null)).toBe("recommended");
    expect(parseCatalogSort(undefined)).toBe("recommended");
  });
});

describe("sortCatalogStyles", () => {
  it("leaves the curated order untouched for recommended", () => {
    const result = sortCatalogStyles(styles, "recommended");
    expect(result).toBe(styles);
  });

  it("sorts by name in both directions without mutating the input", () => {
    const input = [style("charlie", "Charlie"), style("alpha", "Alpha")];
    expect(sortCatalogStyles(input, "name-asc").map((s) => s.slug)).toEqual([
      "alpha",
      "charlie",
    ]);
    expect(sortCatalogStyles(input, "name-desc").map((s) => s.slug)).toEqual([
      "charlie",
      "alpha",
    ]);
    expect(input.map((s) => s.slug)).toEqual(["charlie", "alpha"]);
  });

  it("orders by usage for popular and falls back to views on ties", () => {
    const stats: CatalogStats = {
      alpha: entry({ usage: 10, views: 10 }),
      bravo: entry({ usage: 30, views: 30 }),
      charlie: entry({ usage: 30, views: 40 }),
    };

    expect(sortCatalogStyles(styles, "popular", stats).map((s) => s.slug)).toEqual([
      "charlie",
      "bravo",
      "alpha",
    ]);
  });

  it("orders by favorite count and breaks ties on usage", () => {
    const stats: CatalogStats = {
      alpha: entry({ favorites: 3, usage: 1 }),
      bravo: entry({ favorites: 3, usage: 99 }),
      charlie: entry({ favorites: 9 }),
    };

    expect(sortCatalogStyles(styles, "favorites", stats).map((s) => s.slug)).toEqual([
      "charlie",
      "bravo",
      "alpha",
    ]);
  });

  it("keeps styles without stats last instead of dropping them", () => {
    const stats: CatalogStats = { bravo: entry({ usage: 5, favorites: 2 }) };
    const result = sortCatalogStyles(styles, "favorites", stats);

    expect(result).toHaveLength(styles.length);
    expect(result[0]?.slug).toBe("bravo");
  });

  it("does not let a single five-star vote outrank a well-reviewed style", () => {
    const stats: CatalogStats = {
      alpha: entry({ averageRating: 5, totalRatings: 1 }),
      bravo: entry({ averageRating: 4.6, totalRatings: 40 }),
      charlie: entry({ averageRating: 2, totalRatings: 20 }),
    };

    expect(sortCatalogStyles(styles, "rating", stats).map((s) => s.slug)).toEqual([
      "bravo",
      "alpha",
      "charlie",
    ]);
  });

  it("ranks rated styles above unrated ones and orders the rest by usage", () => {
    const stats: CatalogStats = {
      alpha: entry({ usage: 100 }),
      bravo: entry({ averageRating: 5, totalRatings: 2, usage: 1 }),
      charlie: entry({ usage: 500 }),
    };
    const result = sortCatalogStyles(styles, "rating", stats).map((s) => s.slug);

    expect(result[0]).toBe("bravo");
    expect(result.slice(1)).toEqual(["charlie", "alpha"]);
  });

  it("degrades to usage order when no stats arrived at all", () => {
    const result = sortCatalogStyles(styles, "rating", undefined).map((s) => s.slug);
    expect(result).toEqual(["alpha", "bravo", "charlie"]);
  });
});

describe("rating smoothing", () => {
  it("averages the catalog mean across votes, not across styles", () => {
    const stats: CatalogStats = {
      alpha: entry({ averageRating: 5, totalRatings: 1 }),
      bravo: entry({ averageRating: 3, totalRatings: 9 }),
      charlie: entry({}),
    };

    expect(catalogRatingMean(stats)).toBeCloseTo((5 * 1 + 3 * 9) / 10, 10);
  });

  it("returns the prior when nothing has been rated", () => {
    expect(catalogRatingMean({ alpha: entry({}) })).toBe(3.5);
    expect(catalogRatingMean(undefined)).toBe(3.5);
  });

  it("pulls sparse ratings toward the catalog mean", () => {
    const mean = 3.5;
    const oneVote = smoothedRating(entry({ averageRating: 5, totalRatings: 1 }), mean);
    const manyVotes = smoothedRating(
      entry({ averageRating: 5, totalRatings: 500 }),
      mean
    );

    expect(oneVote).toBeCloseTo(
      (1 / (1 + RATING_CONFIDENCE_VOTES)) * 5 +
        (RATING_CONFIDENCE_VOTES / (1 + RATING_CONFIDENCE_VOTES)) * mean,
      10
    );
    expect(oneVote).toBeLessThan(manyVotes);
    expect(manyVotes).toBeGreaterThan(4.9);
  });

  it("treats an unrated style as exactly average", () => {
    expect(smoothedRating(undefined, 4.2)).toBe(4.2);
    expect(smoothedRating(entry({}), 4.2)).toBe(4.2);
  });
});
