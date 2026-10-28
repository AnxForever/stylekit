import type {
  AnalyticsBreakdown,
  AnalyticsBreakdownDimension,
} from "./analytics-api-contract";
/** Dimensions where a Umami count describes visitors rather than pageviews. */
const VISITOR_DIMENSIONS: Partial<Record<AnalyticsBreakdownDimension, true>> = {
  country: true,
  browser: true,
  os: true,
  device: true,
};

export function countsAreVisitors(dimension: AnalyticsBreakdownDimension): boolean {
  return VISITOR_DIMENSIONS[dimension] === true;
}

/**
 * The column a breakdown row actually measures. Activity dimensions count
 * pageviews; visitor dimensions count unique visitors. The traffic UI must use
 * this instead of assuming `page_views` is always populated.
 */
export function getBreakdownCount(
  row: AnalyticsBreakdown[number],
  dimension: AnalyticsBreakdownDimension
): number {
  return countsAreVisitors(dimension) ? row.visitors : row.page_views;
}
