/**
 * Retrieval metrics for the labelled evaluation set.
 *
 * Design doc section 5.2: Recall@K (K = 1, 3, 5) is the headline number, MRR
 * says where the first relevant style sits, and NDCG@5 is the one metric that
 * respects the labels' two relevance levels - the primary answer and the two
 * accepted alternates.
 *
 * Every function here is pure and takes an already-computed ranking: a list of
 * style slugs, best first. Nothing in this module retrieves anything. Keeping
 * scoring separate from retrieval is what lets the same implementation judge
 * all three experiment groups in `tools/scripts/evaluate-retrieval.ts`, and it
 * is why the metrics can be unit tested without a corpus.
 *
 * Two definitions worth being explicit about, because both have a defensible
 * alternative and the difference matters when reading the numbers:
 *
 *   - `recallAtK` is binary: did *any* relevant style make the top K. The label
 *     set is one intent with one primary answer and two acceptable ones, i.e. a
 *     known-item task, and "Top-3 hit rate" in the design doc's success
 *     criterion (section 1.3) means exactly this. `setRecallAtK` answers the
 *     other question - the share of the relevant set retrieved - but with three
 *     relevant styles a top-5 list caps it at 1/3, so it is a diagnostic only.
 *   - `reciprocalRank` counts the first item with any positive grade, which is
 *     the textbook "first relevant" reading. An alternate at rank 1 is not a
 *     failure. `primaryReciprocalRank` and `primaryAt1` are provided for when
 *     the primary answer specifically is what has to be right.
 *
 * An expectation's alternates are deduplicated and the primary wins any
 * collision, so a mislabelled entry (primary also listed as an alternate)
 * cannot silently count twice.
 */

/** Relevance grade of the expected answer itself. */
export const PRIMARY_GRADE = 1;
/** Relevance grade of an accepted alternate. Partial credit, by design. */
export const ALTERNATE_GRADE = 0.5;
/** The K values the evaluation reports. */
export const DEFAULT_K_VALUES: readonly number[] = [1, 3, 5];

export interface QueryExpectation {
  /** The one style that must be retrieved. */
  primary: string;
  /** Acceptable alternatives; graded below the primary but above zero. */
  alternates: readonly string[];
}

/** The relevant set, primary first, deduplicated. */
export function relevantSlugs(expectation: QueryExpectation): string[] {
  const ordered = [expectation.primary, ...expectation.alternates];
  return [...new Set(ordered)];
}

/** 1 for the primary, 0.5 for an alternate, 0 for anything else. */
export function relevanceGrade(slug: string, expectation: QueryExpectation): number {
  if (slug === expectation.primary) return PRIMARY_GRADE;
  return expectation.alternates.includes(slug) ? ALTERNATE_GRADE : 0;
}

/**
 * Collapses repeats, keeping the first occurrence.
 *
 * A retriever that returns the same slug twice must not score twice for it -
 * the second copy is not additional evidence, and leaving it in would let a
 * bug inflate Recall and NDCG alike.
 */
export function dedupeRanking(ranking: readonly string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const slug of ranking) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    unique.push(slug);
  }

  return unique;
}

/**
 * K as a window size: 0 for anything that asks for nothing (zero, negative,
 * NaN), the whole list for an infinite K, and the floor otherwise.
 */
function windowSize(k: number): number {
  if (Number.isNaN(k) || k <= 0) return 0;
  return Number.isFinite(k) ? Math.floor(k) : Number.POSITIVE_INFINITY;
}

/** The deduplicated ranking truncated to K. Non-positive K yields an empty list. */
export function topK(ranking: readonly string[], k: number): string[] {
  const size = windowSize(k);
  if (size === 0) return [];
  return dedupeRanking(ranking).slice(0, size);
}

/** 1 when a relevant style appears in the top K, 0 otherwise. */
export function recallAtK(ranking: readonly string[], expectation: QueryExpectation, k: number): number {
  return topK(ranking, k).some((slug) => relevanceGrade(slug, expectation) > 0) ? 1 : 0;
}

/** Share of the relevant set retrieved in the top K, in [0, 1]. */
export function setRecallAtK(
  ranking: readonly string[],
  expectation: QueryExpectation,
  k: number,
): number {
  const relevant = relevantSlugs(expectation);
  if (relevant.length === 0) return 0;

  const window = new Set(topK(ranking, k));
  return relevant.filter((slug) => window.has(slug)).length / relevant.length;
}

/** 1 / rank of the first style with a positive grade; 0 when none is retrieved. */
export function reciprocalRank(ranking: readonly string[], expectation: QueryExpectation): number {
  const index = dedupeRanking(ranking).findIndex((slug) => relevanceGrade(slug, expectation) > 0);
  return index === -1 ? 0 : 1 / (index + 1);
}

/** 1 / rank of the primary answer; 0 when it is not retrieved at all. */
export function primaryReciprocalRank(
  ranking: readonly string[],
  expectation: QueryExpectation,
): number {
  const index = dedupeRanking(ranking).indexOf(expectation.primary);
  return index === -1 ? 0 : 1 / (index + 1);
}

/** Exponential gain, `2^grade - 1`, discounted by `log2(rank + 1)`. */
function gain(grade: number): number {
  return 2 ** grade - 1;
}

function discount(rank: number): number {
  return Math.log2(rank + 1);
}

/** Discounted cumulative gain of the top K against the labels. */
export function dcgAtK(ranking: readonly string[], expectation: QueryExpectation, k: number): number {
  return topK(ranking, k).reduce((sum, slug, index) => {
    const grade = relevanceGrade(slug, expectation);
    if (grade <= 0) return sum;
    return sum + gain(grade) / discount(index + 1);
  }, 0);
}

/**
 * DCG of the best ranking the labels allow, i.e. every relevant style first in
 * grade order: primary, alternate, alternate.
 */
export function idealDcgAtK(expectation: QueryExpectation, k: number): number {
  const grades = relevantSlugs(expectation)
    .map((slug) => relevanceGrade(slug, expectation))
    .sort((left, right) => right - left)
    .slice(0, windowSize(k));

  return grades.reduce((sum, grade, index) => sum + gain(grade) / discount(index + 1), 0);
}

/** NDCG@K in [0, 1]; 0 when the labels define nothing to gain. */
export function ndcgAtK(ranking: readonly string[], expectation: QueryExpectation, k: number): number {
  const ideal = idealDcgAtK(expectation, k);
  if (ideal === 0) return 0;
  return dcgAtK(ranking, expectation, k) / ideal;
}

export interface QueryScore {
  /** The K values this score was computed at, ascending. */
  ks: readonly number[];
  /** Recall@K per entry of `ks`. */
  recall: readonly number[];
  /** Share-of-relevant-set per entry of `ks`. */
  setRecall: readonly number[];
  ndcg: readonly number[];
  /** Reciprocal rank of the first relevant style. */
  mrr: number;
  /** Reciprocal rank of the primary answer. */
  primaryMrr: number;
  /** 1 when the primary answer is ranked first. */
  primaryAt1: number;
}

/** Scores one query's ranking against its labels. */
export function scoreQuery(
  ranking: readonly string[],
  expectation: QueryExpectation,
  ks: readonly number[] = DEFAULT_K_VALUES,
): QueryScore {
  return {
    ks: [...ks],
    recall: ks.map((k) => recallAtK(ranking, expectation, k)),
    setRecall: ks.map((k) => setRecallAtK(ranking, expectation, k)),
    ndcg: ks.map((k) => ndcgAtK(ranking, expectation, k)),
    mrr: reciprocalRank(ranking, expectation),
    primaryMrr: primaryReciprocalRank(ranking, expectation),
    primaryAt1: dedupeRanking(ranking)[0] === expectation.primary ? 1 : 0,
  };
}

export interface AggregateScore {
  queries: number;
  ks: readonly number[];
  /** Mean Recall@K. */
  recall: readonly number[];
  setRecall: readonly number[];
  /** Mean NDCG@K. */
  ndcg: readonly number[];
  mrr: number;
  primaryMrr: number;
  /** Mean of `primaryAt1` - the precision-at-1 of the primary answer. */
  primaryAt1: number;
}

function mean(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Averages per-query scores. An empty input yields zeros, not NaN. */
export function meanScores(
  scores: readonly QueryScore[],
  ks: readonly number[] = DEFAULT_K_VALUES,
): AggregateScore {
  const at = (pick: (score: QueryScore) => readonly number[], index: number): number =>
    mean(scores.map((score) => pick(score)[index] ?? 0));

  return {
    queries: scores.length,
    ks: [...ks],
    recall: ks.map((_, index) => at((score) => score.recall, index)),
    setRecall: ks.map((_, index) => at((score) => score.setRecall, index)),
    ndcg: ks.map((_, index) => at((score) => score.ndcg, index)),
    mrr: mean(scores.map((score) => score.mrr)),
    primaryMrr: mean(scores.map((score) => score.primaryMrr)),
    primaryAt1: mean(scores.map((score) => score.primaryAt1)),
  };
}

/** `0.733` style formatting shared by the evaluation script's tables. */
export function formatRate(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
