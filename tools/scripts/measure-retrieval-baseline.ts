#!/usr/bin/env tsx

/**
 * Measures how badly the current keyword matcher misses Chinese queries.
 *
 * This is the "group A" baseline from `docs/RAG_SEMANTIC_RETRIEVAL.md` section
 * 5.3: it exists to prove the defect is real before any retrieval work is
 * justified by it. Read-only - it writes nothing.
 *
 * Three methods are measured over the same query set:
 *
 *   A. the production `searchKnowledgeCatalog`, unmodified, over the knowledge
 *      manifests. Run with `includeUnpublished: true`: the published corpus is
 *      currently empty, and an empty corpus returns zero hits for every query
 *      in both languages, which would prove nothing.
 *   B. a faithful replica of that comparison (catalog.ts:103-139) applied to
 *      the 148 design styles, with the legacy tokenizer.
 *   C. the same replica and the same corpus, with the fixed tokenizer
 *      (`lib/retrieval/tokenize`) - this isolates the tokenizer, and still
 *      shows that fixing segmentation alone is not retrieval.
 *
 * Run from the repository root:
 *   npx --no-install tsx tools/scripts/measure-retrieval-baseline.ts
 */

import { loadKnowledgeCatalog, searchKnowledgeCatalog } from "@/lib/knowledge/catalog";
import { tokenizeForSearch, legacySplitTokens } from "@/lib/retrieval/tokenize";
import { styles } from "@/lib/styles/registry";
import type { DesignStyle } from "@/lib/styles/types";

/**
 * `zh-intent` are the queries that matter - a sentence with no single term the
 * corpus happens to use. `zh-term` are single style words, which occasionally
 * survive by coincidence when the word is listed as a space-separated keyword.
 * `en` is the control group. Keeping them apart stops the summary from
 * averaging a real zero into a flattering number.
 */
type QueryGroup = "zh-intent" | "zh-term" | "en";

interface BaselineQuery {
  text: string;
  group: QueryGroup;
}

const QUERIES: BaselineQuery[] = [
  // Chinese, phrased the way a user would actually ask.
  { text: "我要一个适合金融后台的克制风格", group: "zh-intent" },
  { text: "深色夜景毛玻璃质感", group: "zh-intent" },
  { text: "想做一个高端奢侈品官网", group: "zh-intent" },
  { text: "数据密集的表格后台", group: "zh-intent" },
  { text: "苹果风格的产品落地页", group: "zh-intent" },
  { text: "看起来很安静的日式极简", group: "zh-intent" },
  { text: "复古像素游戏界面", group: "zh-intent" },
  { text: "暗黑模式的仪表盘", group: "zh-intent" },
  { text: "杂志排版风格", group: "zh-intent" },
  { text: "水彩手绘的质感", group: "zh-intent" },
  // Chinese style terminology.
  { text: "毛玻璃", group: "zh-term" },
  { text: "玻璃拟态", group: "zh-term" },
  { text: "瑞士国际主义", group: "zh-term" },
  { text: "新粗野主义", group: "zh-term" },
  { text: "赛博朋克霓虹", group: "zh-term" },
  { text: "粘土拟态", group: "zh-term" },
  { text: "包豪斯设计", group: "zh-term" },
  { text: "孟菲斯几何图案", group: "zh-term" },
  { text: "蒸汽波风格", group: "zh-term" },
  { text: "扁平化设计", group: "zh-term" },
  // English controls, which the current matcher already handles.
  { text: "glassmorphism frosted blur", group: "en" },
  { text: "neo brutalist", group: "en" },
  { text: "swiss style grid", group: "en" },
  { text: "apple style landing page", group: "en" },
  { text: "dark mode dashboard", group: "en" },
  { text: "pixel art game ui", group: "en" },
  { text: "vaporwave aesthetic", group: "en" },
  { text: "claymorphism soft ui", group: "en" },
];

const GROUPS: QueryGroup[] = ["zh-intent", "zh-term", "en"];

type Tokenizer = (value: string) => string[];

interface StyleMatch {
  style: DesignStyle;
  score: number;
  matchedFields: string[];
}

/**
 * Replica of `searchKnowledgeCatalog`'s scoring loop (catalog.ts:103-139).
 *
 * The structure, the field set, the `matchedFields.length / queryTokens.length`
 * score, the `score > 0` filter and the sort are copied verbatim; only two
 * things differ, both deliberately:
 *
 *   - the documents are styles rather than knowledge resources, because that is
 *     the corpus the retrieval work targets, and the published knowledge
 *     catalog is currently empty;
 *   - the tokenizer is a parameter, so the same comparison can be run with the
 *     legacy split and with the fixed one, which is the whole point of the
 *     measurement.
 */
function searchStylesReplica(
  corpus: readonly DesignStyle[],
  query: string,
  tokenize: Tokenizer,
  limit = 5,
): StyleMatch[] {
  const queryTokens = tokenize(query);

  return corpus
    .map((style) => {
      const fields: Record<string, string> = {
        name: `${style.name} ${style.nameEn}`,
        description: `${style.description} ${style.descriptionEn ?? ""}`,
        philosophy: `${style.philosophy} ${style.philosophyEn ?? ""}`,
        keywords: `${style.keywords.join(" ")} ${(style.keywordsEn ?? []).join(" ")}`,
        doList: `${style.doList.join(" ")} ${(style.doListEn ?? []).join(" ")}`,
      };
      const matchedFields = Object.entries(fields)
        .filter(([, value]) => {
          const fieldTokens = new Set(tokenize(value));
          return queryTokens.some((token) => fieldTokens.has(token));
        })
        .map(([field]) => field);

      const score = queryTokens.length === 0 ? 0 : matchedFields.length / queryTokens.length;
      return { style, score, matchedFields };
    })
    .filter((hit) => queryTokens.length === 0 || hit.score > 0)
    .sort((left, right) => right.score - left.score || left.style.name.localeCompare(right.style.name))
    .slice(0, limit);
}

function rate(hits: number, total: number): string {
  if (total === 0) return "n/a";
  return `${((hits / total) * 100).toFixed(1)}%`;
}

async function main(): Promise<void> {
  console.log("[baseline] measuring the current keyword matcher");
  console.log(`[baseline] corpus: ${styles.length} design styles`);

  let resources: Awaited<ReturnType<typeof loadKnowledgeCatalog>> = [];
  try {
    resources = await loadKnowledgeCatalog({ includeUnpublished: true });
  } catch (error) {
    console.warn(
      `[baseline] knowledge manifests unavailable (${error instanceof Error ? error.message : String(error)}); method A will report zero.`,
    );
  }
  const knowledgeCorpusSize = resources.length;
  console.log(`[baseline] corpus: ${knowledgeCorpusSize} knowledge resources (unpublished included)`);
  console.log("");

  const totals: Record<QueryGroup, { count: number; a: number; b: number; c: number }> = {
    "zh-intent": { count: 0, a: 0, b: 0, c: 0 },
    "zh-term": { count: 0, a: 0, b: 0, c: 0 },
    en: { count: 0, a: 0, b: 0, c: 0 },
  };

  console.log("tokens(legacy/fixed) | A knowledge | B style legacy | C style fixed | query");
  console.log("-".repeat(96));

  for (const query of QUERIES) {
    const legacyTokens = legacySplitTokens(query.text).length;
    const fixedTokens = tokenizeForSearch(query.text).length;

    const methodA = searchKnowledgeCatalog(resources, {
      query: query.text,
      limit: 5,
      includeUnpublished: true,
    }).length;

    const methodB = searchStylesReplica(styles, query.text, legacySplitTokens).length;
    const methodC = searchStylesReplica(styles, query.text, tokenizeForSearch).length;

    totals[query.group].count += 1;
    if (methodA > 0) totals[query.group].a += 1;
    if (methodB > 0) totals[query.group].b += 1;
    if (methodC > 0) totals[query.group].c += 1;

    console.log(
      `${String(legacyTokens).padStart(6)}/${String(fixedTokens).padEnd(6)} | ${String(methodA).padStart(11)} | ${String(methodB).padStart(14)} | ${String(methodC).padStart(13)} | [${query.group}] ${query.text}`,
    );
  }

  console.log("");
  console.log("=== hit rate: at least one result returned (not a relevance measure) ===");
  const rows = [
    ["A", "production searchKnowledgeCatalog (knowledge corpus)"],
    ["B", "replica matcher + legacy tokenizer (style corpus)"],
    ["C", "replica matcher + fixed tokenizer (style corpus)"],
  ] as const;

  const header = GROUPS.map((group) => `${group}(${totals[group].count})`.padStart(16)).join("");
  console.log(`${"method".padEnd(52)}${header}`);
  for (const [key, description] of rows) {
    const column = key.toLowerCase() as "a" | "b" | "c";
    const cells = GROUPS.map((group) => {
      const { count } = totals[group];
      const hits = totals[group][column];
      return `${hits}/${count} ${rate(hits, count)}`.padStart(16);
    }).join("");
    console.log(`${`${key}. ${description}`.padEnd(52)}${cells}`);
  }

  console.log("");
  console.log(
    "[baseline] A Chinese sentence survives the legacy split as a single token, so intent",
  );
  console.log(
    "[baseline] queries (zh-intent) hit nothing in A or B. The few zh-term hits in B are",
  );
  console.log(
    "[baseline] coincidences: the term is listed verbatim as a space-separated keyword.",
  );
  console.log(
    "[baseline] C's numbers say \"returned something\", not \"returned the right style\" -",
  );
  console.log(
    "[baseline] C still has no notion of meaning, which is why the vector path exists.",
  );
}

main().catch((error: unknown) => {
  console.error(`[baseline] FAIL - ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
