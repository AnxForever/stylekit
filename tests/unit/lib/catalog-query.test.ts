import { describe, expect, it } from "vitest";
import {
  DEFAULT_TYPE_FILTER,
  parseStylesSearchParams,
} from "@/lib/styles/catalog-query";
import { STYLE_TAGS } from "@/lib/styles/meta-types";

describe("parseStylesSearchParams", () => {
  it.each(STYLE_TAGS)("restores the %s tag from a shared URL", (tag) => {
    const params = new URLSearchParams({ tags: tag });

    expect(parseStylesSearchParams(params).tags).toEqual([tag]);
  });

  it.each(["modern", "minimal", "expressive", "unknown-tag"])(
    "discards %s because it is not in the current tag vocabulary",
    (tag) => {
      const params = new URLSearchParams({ tags: tag });

      expect(parseStylesSearchParams(params).tags).toEqual([]);
    },
  );

  it("keeps other catalog filters and defaults when it discards an invalid tag", () => {
    const params = new URLSearchParams({
      type: "all",
      tags: "modern,dark-theme",
      fav: "1",
      sort: "popular",
      q: "glass",
      scenario: "saas",
    });

    expect(parseStylesSearchParams(params)).toEqual({
      type: "all",
      tags: ["dark-theme"],
      showFavorites: true,
      sort: "popular",
      query: "glass",
      scenario: "saas",
    });
    expect(parseStylesSearchParams(null).type).toBe(DEFAULT_TYPE_FILTER);
    expect(parseStylesSearchParams(new URLSearchParams("visual-baseline=1")).type).toBe("all");
  });
});
