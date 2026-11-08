import { parseCatalogSort } from "./catalog-sort";
import { STYLE_SCENARIOS, type StyleScenario } from "./scenarios";
import { STYLE_TAGS, type StyleTag, type StyleType } from "./meta-types";

export type TypeFilter = StyleType | "all";

/** Visual systems lead the catalog; layouts remain addressable with ?type=all. */
export const DEFAULT_TYPE_FILTER: TypeFilter = "visual";

export interface SearchParamsLike {
  get(name: string): string | null;
}

/** Parse shareable catalogue state against the current category and tag vocabularies. */
export function parseStylesSearchParams(searchParams: SearchParamsLike | null) {
  const typeParam = searchParams?.get("type");
  // Visual-regression baselines include layouts as well as visual styles.
  const isBaseline = searchParams?.get("visual-baseline") === "1";
  const type: TypeFilter =
    typeParam === "visual" || typeParam === "layout" || typeParam === "all"
      ? typeParam
      : isBaseline
        ? "all"
        : DEFAULT_TYPE_FILTER;

  const tags = (searchParams?.get("tags") ?? "")
    .split(",")
    .filter((tag): tag is StyleTag => STYLE_TAGS.includes(tag as StyleTag));

  const showFavorites = searchParams?.get("fav") === "1";
  const sort = parseCatalogSort(searchParams?.get("sort"));
  const query = searchParams?.get("q") ?? "";
  const scenarioParam = searchParams?.get("scenario");
  const scenario: StyleScenario | "all" = STYLE_SCENARIOS.includes(
    scenarioParam as StyleScenario
  )
    ? (scenarioParam as StyleScenario)
    : "all";

  return { type, tags, showFavorites, sort, query, scenario };
}
