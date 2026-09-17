import { describe, expect, it } from "vitest";

import { chunkStyles } from "@/lib/retrieval/chunk-styles";
import {
  DEFAULT_K_VALUES,
  PRIMARY_GRADE,
  dcgAtK,
  dedupeRanking,
  formatRate,
  idealDcgAtK,
  meanScores,
  ndcgAtK,
  primaryReciprocalRank,
  recallAtK,
  reciprocalRank,
  relevanceGrade,
  relevantSlugs,
  scoreQuery,
  setRecallAtK,
  topK,
  type QueryExpectation,
} from "@/lib/retrieval/eval-metrics";
import { styles } from "@/lib/styles/registry";
import {
  EVAL_QUERY_TYPES,
  EVAL_TYPE_TARGETS,
  RETRIEVAL_EVAL_SET,
  type RetrievalEvalCase,
} from "@/tests/fixtures/retrieval-eval-set";

/**
 * Two jobs here, and the second one is the important one.
 *
 * The metric tests pin the arithmetic down with hand-computed numbers, so a
 * later "small simplification" of NDCG or MRR has to argue with a decimal
 * rather than with a vibe. The eval-set tests are the guard rail: a label set
 * is hand-written data, and the failure mode nobody catches by reading is a
 * slug that does not exist, a query that got pasted twice, or a cross-lingual
 * entry whose language claim quietly stopped being true when style copy
 * changed. Those break the numbers silently, so they are tested.
 *
 * Nothing here touches the network: no embedding provider is constructed.
 */

const EXPECTATION: QueryExpectation = { primary: "swiss-style", alternates: ["bauhaus", "editorial"] };

describe("relevanceGrade", () => {
  it("grades the primary 1, an alternate 0.5 and anything else 0", () => {
    expect(relevanceGrade("swiss-style", EXPECTATION)).toBe(PRIMARY_GRADE);
    expect(relevanceGrade("bauhaus", EXPECTATION)).toBe(0.5);
    expect(relevanceGrade("memphis", EXPECTATION)).toBe(0);
  });

  it("keeps the primary's grade when it is also listed as an alternate", () => {
    const collision: QueryExpectation = { primary: "memphis", alternates: ["memphis", "bauhaus"] };
    expect(relevanceGrade("memphis", collision)).toBe(1);
    expect(relevantSlugs(collision)).toEqual(["memphis", "bauhaus"]);
  });
});

describe("dedupeRanking and topK", () => {
  it("keeps the first occurrence of a repeated slug", () => {
    expect(dedupeRanking(["a", "b", "a", "c", "b"])).toEqual(["a", "b", "c"]);
  });

  it("truncates to K and rejects non-positive K", () => {
    expect(topK(["a", "b", "c"], 2)).toEqual(["a", "b"]);
    expect(topK(["a", "b", "c"], 0)).toEqual([]);
    expect(topK(["a", "b", "c"], -3)).toEqual([]);
    expect(topK(["a", "b", "c"], Number.POSITIVE_INFINITY)).toEqual(["a", "b", "c"]);
  });
});

describe("recallAtK", () => {
  it("is 1 when any relevant style is inside the window", () => {
    expect(recallAtK(["memphis", "swiss-style"], EXPECTATION, 1)).toBe(0);
    expect(recallAtK(["memphis", "swiss-style"], EXPECTATION, 2)).toBe(1);
  });

  it("counts an alternate as a hit", () => {
    expect(recallAtK(["editorial"], EXPECTATION, 1)).toBe(1);
  });

  it("is 0 for an empty ranking or an empty window", () => {
    expect(recallAtK([], EXPECTATION, 5)).toBe(0);
    expect(recallAtK(["swiss-style"], EXPECTATION, 0)).toBe(0);
  });

  it("stops looking past K", () => {
    expect(recallAtK(["a", "b", "c", "swiss-style"], EXPECTATION, 3)).toBe(0);
    expect(recallAtK(["a", "b", "c", "swiss-style"], EXPECTATION, 5)).toBe(1);
  });
});

describe("setRecallAtK", () => {
  it("reports the share of the relevant set that was retrieved", () => {
    expect(setRecallAtK(["swiss-style", "bauhaus", "memphis"], EXPECTATION, 5)).toBeCloseTo(2 / 3, 10);
    expect(setRecallAtK(["swiss-style", "bauhaus", "editorial"], EXPECTATION, 5)).toBe(1);
    expect(setRecallAtK([], EXPECTATION, 5)).toBe(0);
  });

  it("does not double count a slug that appears twice", () => {
    expect(setRecallAtK(["swiss-style", "swiss-style"], EXPECTATION, 5)).toBeCloseTo(1 / 3, 10);
  });
});

describe("reciprocalRank", () => {
  it("scores 1 for rank 1, 1/2 for rank 2 and 0 when absent", () => {
    expect(reciprocalRank(["swiss-style"], EXPECTATION)).toBe(1);
    expect(reciprocalRank(["memphis", "swiss-style"], EXPECTATION)).toBe(0.5);
    expect(reciprocalRank(["memphis", "op-art"], EXPECTATION)).toBe(0);
    expect(reciprocalRank([], EXPECTATION)).toBe(0);
  });

  it("counts an alternate as the first relevant item", () => {
    expect(reciprocalRank(["bauhaus", "swiss-style"], EXPECTATION)).toBe(1);
  });

  it("measures the primary specifically when asked to", () => {
    expect(primaryReciprocalRank(["bauhaus", "swiss-style"], EXPECTATION)).toBe(0.5);
    expect(primaryReciprocalRank(["bauhaus"], EXPECTATION)).toBe(0);
  });
});

describe("ndcgAtK", () => {
  it("matches a hand-computed three-item case", () => {
    // Grades 1, 0, 0.5 at ranks 1, 2, 3:
    //   DCG  = 1/log2(2) + 0 + 0.4142/log2(4)                = 1.20710678
    //   IDCG = 1/log2(2) + 0.4142/log2(3) + 0.4142/log2(4)   = 1.46844644
    const ranking = ["swiss-style", "memphis", "editorial"];
    expect(dcgAtK(ranking, EXPECTATION, 5)).toBeCloseTo(1.2071067811865475, 10);
    expect(idealDcgAtK(EXPECTATION, 5)).toBeCloseTo(1.4684464420205599, 10);
    expect(ndcgAtK(ranking, EXPECTATION, 5)).toBeCloseTo(0.8220298314221028, 10);
  });

  it("is 1 when the ranking is the ideal one", () => {
    expect(ndcgAtK(["swiss-style", "bauhaus", "editorial"], EXPECTATION, 5)).toBe(1);
    expect(ndcgAtK(["swiss-style", "editorial", "bauhaus"], EXPECTATION, 5)).toBe(1);
  });

  it("gives an alternate-only top-1 a fraction of the credit", () => {
    // Gain of 0.5 discounted once, over the ideal gain of 1: 2^0.5 - 1.
    expect(ndcgAtK(["bauhaus"], EXPECTATION, 1)).toBeCloseTo(0.41421356237309515, 10);
  });

  it("is 0 when nothing relevant is retrieved or the window is empty", () => {
    expect(ndcgAtK(["memphis", "op-art"], EXPECTATION, 5)).toBe(0);
    expect(ndcgAtK([], EXPECTATION, 5)).toBe(0);
    expect(ndcgAtK(["swiss-style"], EXPECTATION, 0)).toBe(0);
  });

  it("discounts a later primary more than an earlier one", () => {
    const early = ndcgAtK(["swiss-style", "memphis"], EXPECTATION, 5);
    const late = ndcgAtK(["memphis", "swiss-style"], EXPECTATION, 5);
    expect(early).toBeGreaterThan(late);
  });
});

describe("scoreQuery and meanScores", () => {
  it("carries one entry per K for every K-indexed metric", () => {
    const score = scoreQuery(["swiss-style"], EXPECTATION, DEFAULT_K_VALUES);
    expect(score.ks).toEqual([1, 3, 5]);
    expect(score.recall).toEqual([1, 1, 1]);
    expect(score.ndcg).toHaveLength(3);
    expect(score.primaryAt1).toBe(1);
  });

  it("scores an empty ranking as a total miss without throwing", () => {
    const score = scoreQuery([], EXPECTATION, DEFAULT_K_VALUES);
    expect(score.recall).toEqual([0, 0, 0]);
    expect(score.mrr).toBe(0);
    expect(score.primaryMrr).toBe(0);
    expect(score.primaryAt1).toBe(0);
  });

  it("averages per-K metrics across queries", () => {
    const perfect = scoreQuery(["swiss-style"], EXPECTATION, DEFAULT_K_VALUES);
    const miss = scoreQuery([], EXPECTATION, DEFAULT_K_VALUES);
    const mean = meanScores([perfect, miss], DEFAULT_K_VALUES);

    expect(mean.queries).toBe(2);
    expect(mean.recall).toEqual([0.5, 0.5, 0.5]);
    expect(mean.mrr).toBe(0.5);
    expect(mean.primaryAt1).toBe(0.5);
  });

  it("returns zeros rather than NaN for an empty input", () => {
    const mean = meanScores([], DEFAULT_K_VALUES);
    expect(mean.queries).toBe(0);
    expect(mean.recall.every((value) => value === 0)).toBe(true);
    expect(mean.ndcg.every((value) => Number.isFinite(value))).toBe(true);
    expect(mean.mrr).toBe(0);
  });
});

describe("formatRate", () => {
  it("renders one decimal place as a percentage", () => {
    expect(formatRate(0)).toBe("0.0%");
    expect(formatRate(0.933333)).toBe("93.3%");
    expect(formatRate(1)).toBe("100.0%");
  });
});

describe("evaluation set integrity", () => {
  const registrySlugs = new Set(styles.map((style) => style.slug));

  const countOf = (type: string): number =>
    RETRIEVAL_EVAL_SET.filter((item) => item.type === type).length;

  it("ships at least the 60 entries the design doc asks for", () => {
    expect(RETRIEVAL_EVAL_SET.length).toBeGreaterThanOrEqual(60);
  });

  it("hits the per-type targets", () => {
    for (const type of EVAL_QUERY_TYPES) {
      expect(countOf(type), `count for ${type}`).toBe(EVAL_TYPE_TARGETS[type]);
    }
  });

  it("only ever names styles that exist in the registry", () => {
    const unknown: string[] = [];

    for (const item of RETRIEVAL_EVAL_SET) {
      for (const slug of [item.primary, ...item.alternates]) {
        if (!registrySlugs.has(slug)) unknown.push(`${item.id}: ${slug}`);
      }
    }

    expect(unknown).toEqual([]);
  });

  it("gives every entry a primary, two distinct alternates and a note", () => {
    for (const item of RETRIEVAL_EVAL_SET) {
      expect(item.alternates, `${item.id} alternates`).toHaveLength(2);
      expect(new Set(item.alternates).size, `${item.id} duplicate alternates`).toBe(2);
      expect(item.alternates, `${item.id} primary reused as alternate`).not.toContain(item.primary);
      expect(item.note.trim().length, `${item.id} note`).toBeGreaterThan(0);
      expect(item.query.trim().length, `${item.id} query`).toBeGreaterThan(0);
    }
  });

  it("keeps ids and queries unique", () => {
    const ids = RETRIEVAL_EVAL_SET.map((item) => item.id);
    const queries = RETRIEVAL_EVAL_SET.map((item) => item.query);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(queries).size).toBe(queries.length);
  });

  it("gives the cross-lingual group a claim on every entry", () => {
    for (const item of RETRIEVAL_EVAL_SET) {
      if (item.type === "cross-lingual") {
        expect(item.crossLingual, `${item.id} claim`).toBeDefined();
      } else {
        expect(item.crossLingual, `${item.id} unexpected claim`).toBeUndefined();
      }
    }
  });

  describe("cross-lingual claims survive the corpus as it is today", () => {
    // One blob per style per locale, so a substring check answers "does this
    // style's copy in that language ever say this word".
    const copyByStyle = new Map<string, { zh: string; en: string }>();
    for (const chunk of chunkStyles(styles)) {
      const entry = copyByStyle.get(chunk.styleSlug) ?? { zh: "", en: "" };
      if (chunk.locale === "zh-CN") entry.zh += `\n${chunk.text}`;
      else entry.en += `\n${chunk.text}`;
      copyByStyle.set(chunk.styleSlug, entry);
    }

    const contains = (haystack: string, needle: string): boolean =>
      haystack.toLowerCase().includes(needle.toLowerCase());

    const claimed: RetrievalEvalCase[] = RETRIEVAL_EVAL_SET.filter(
      (item) => item.crossLingual !== undefined,
    );

    it("has something to check", () => {
      expect(claimed.length).toBe(EVAL_TYPE_TARGETS["cross-lingual"]);
    });

    it("finds the signal term in the copy that is supposed to hold it", () => {
      for (const item of claimed) {
        const claim = item.crossLingual as NonNullable<RetrievalEvalCase["crossLingual"]>;
        const copy = copyByStyle.get(item.primary);
        expect(copy, `${item.id} primary has no chunks`).toBeDefined();

        const target = claim.inLocale === "zh-CN" ? copy?.zh : copy?.en;
        expect(contains(target ?? "", claim.targetTerm), `${item.id}: ${claim.targetTerm}`).toBe(true);
      }
    });

    it("keeps the query's own term out of the copy in the query's language", () => {
      for (const item of claimed) {
        const claim = item.crossLingual as NonNullable<RetrievalEvalCase["crossLingual"]>;
        const copy = copyByStyle.get(item.primary);
        const sameLanguageAsQuery = claim.inLocale === "zh-CN" ? copy?.en : copy?.zh;

        expect(
          contains(sameLanguageAsQuery ?? "", claim.queryTerm),
          `${item.id}: ${claim.queryTerm} leaked into the query's own language`,
        ).toBe(false);
      }
    });

    it("puts the query term in the query, except when the query is English", () => {
      for (const item of claimed) {
        const claim = item.crossLingual as NonNullable<RetrievalEvalCase["crossLingual"]>;

        if (claim.kind === "english-to-chinese") {
          expect(/[一-鿿]/u.test(item.query), `${item.id} is not English`).toBe(false);
          continue;
        }

        expect(contains(item.query, claim.queryTerm), `${item.id}: ${claim.queryTerm}`).toBe(true);
      }
    });
  });

  it("scores a perfect run of the whole set at 1.0 and an empty run at 0", () => {
    const perfect = RETRIEVAL_EVAL_SET.map((item) =>
      scoreQuery([item.primary, ...item.alternates], item, DEFAULT_K_VALUES),
    );
    const empty = RETRIEVAL_EVAL_SET.map((item) => scoreQuery([], item, DEFAULT_K_VALUES));

    const best = meanScores(perfect, DEFAULT_K_VALUES);
    expect(best.recall).toEqual([1, 1, 1]);
    expect(best.mrr).toBe(1);
    expect(best.ndcg[2]).toBeCloseTo(1, 10);
    expect(best.primaryAt1).toBe(1);

    const worst = meanScores(empty, DEFAULT_K_VALUES);
    expect(worst.recall).toEqual([0, 0, 0]);
    expect(worst.mrr).toBe(0);
    expect(worst.ndcg[2]).toBe(0);
  });
});
