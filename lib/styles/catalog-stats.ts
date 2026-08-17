/**
 * Shared contract for the public per-style aggregate signals served by
 * `GET /api/styles/stats` and consumed by the catalog sort.
 */

export interface StyleStatsEntry {
  /** Style detail page views. */
  views: number;
  /** Page views plus API reads, used as the popularity signal. */
  usage: number;
  favorites: number;
  averageRating: number;
  totalRatings: number;
}

export interface StyleStatsPayload {
  generatedAt: string;
  /** Signals that could not be loaded, so clients can degrade honestly. */
  degraded: string[];
  stats: Record<string, StyleStatsEntry>;
}

export function emptyStyleStatsEntry(): StyleStatsEntry {
  return {
    views: 0,
    usage: 0,
    favorites: 0,
    averageRating: 0,
    totalRatings: 0,
  };
}
