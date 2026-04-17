/**
 * Keyword-based scoring utility shared by search_* tools.
 *
 * Scoring model:
 * - Full query appears in haystack: big bonus (fullMatchBonus)
 * - Each ≥2-char token appears: small bonus (tokenBonus)
 *
 * This is a simple deterministic ranker. For Phase B we may swap in BM25
 * or vector similarity, but the tool interface stays the same.
 */
export interface ScoringOptions {
  /** Bonus when entire query string is found. Default 10. */
  fullMatchBonus?: number;
  /** Bonus per matched token (length ≥ minTokenLength). Default 2. */
  tokenBonus?: number;
  /** Minimum token length to count. Default 2. */
  minTokenLength?: number;
}

export function scoreKeyword(
  haystack: string,
  query: string,
  options: ScoringOptions = {}
): number {
  const { fullMatchBonus = 10, tokenBonus = 2, minTokenLength = 2 } = options;
  const q = query.toLowerCase();
  const h = haystack.toLowerCase();
  if (!q) return 0;
  if (h.includes(q)) return fullMatchBonus;
  const tokens = q.split(/\s+/).filter((t) => t.length >= minTokenLength);
  return tokens.reduce((score, token) => (h.includes(token) ? score + tokenBonus : score), 0);
}
