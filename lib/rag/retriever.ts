import type { Locale } from "@/lib/i18n/translations";
import { getStyleKitRagCorpus } from "./corpus";
import type { RagCitation, RagDocumentChunk, RagSearchResult } from "./types";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((token) => token.length >= 2);
}

function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function buildSnippet(content: string, queryTokens: string[], max = 180): string {
  const normalized = compactText(content);
  const anchor = queryTokens.find((token) => normalized.toLowerCase().includes(token));

  if (!anchor) {
    return normalized.length <= max ? normalized : `${normalized.slice(0, max - 3)}...`;
  }

  const index = normalized.toLowerCase().indexOf(anchor);
  const start = Math.max(0, index - Math.floor(max * 0.35));
  const end = Math.min(normalized.length, start + max);
  const slice = normalized.slice(start, end);
  return `${start > 0 ? "..." : ""}${slice}${end < normalized.length ? "..." : ""}`;
}

function scoreChunk(query: string, queryTokens: string[], chunk: RagDocumentChunk): number {
  const haystack = `${chunk.title} ${chunk.section} ${chunk.summary} ${chunk.content} ${chunk.keywords.join(" ")}`.toLowerCase();
  const title = chunk.title.toLowerCase();
  const section = chunk.section.toLowerCase();
  const summary = chunk.summary.toLowerCase();
  const queryLower = query.toLowerCase();
  let score = 0;

  if (title.includes(queryLower)) score += 14;
  if (summary.includes(queryLower)) score += 10;
  if (haystack.includes(queryLower)) score += 8;

  for (const token of queryTokens) {
    if (title.includes(token)) score += token.length >= 5 ? 7 : 5;
    if (section.includes(token)) score += 3;
    if (summary.includes(token)) score += token.length >= 5 ? 4 : 3;
    if (chunk.keywords.some((keyword) => keyword.toLowerCase().includes(token))) score += 4;
    if (haystack.includes(token)) score += token.length >= 5 ? 2 : 1;
  }

  if (chunk.kind === "style" && queryTokens.some((token) => title.includes(token))) score += 4;
  if (chunk.kind === "template" && queryTokens.some((token) => haystack.includes(` ${token} `))) score += 3;
  if (chunk.kind === "componentPattern" && queryTokens.some((token) => haystack.includes(token))) score += 2;

  return score;
}

export function searchStyleKitKnowledge({
  query,
  locale,
  limit = 6,
}: {
  query: string;
  locale: Locale;
  limit?: number;
}): RagSearchResult[] {
  const normalizedQuery = compactText(query);
  if (!normalizedQuery) {
    return [];
  }

  const queryTokens = tokenize(normalizedQuery);
  const scored = getStyleKitRagCorpus(locale)
    .map((chunk) => ({
      chunk,
      score: scoreChunk(normalizedQuery, queryTokens, chunk),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  const seen = new Set<string>();
  const results: RagSearchResult[] = [];

  for (const item of scored) {
    if (seen.has(item.chunk.id)) {
      continue;
    }
    seen.add(item.chunk.id);

    const citation: RagCitation = {
      id: item.chunk.id,
      kind: item.chunk.kind,
      title: item.chunk.title,
      section: item.chunk.section,
      href: item.chunk.href,
      sourceLabel: item.chunk.sourceLabel,
      sourcePath: item.chunk.sourcePath,
      snippet: buildSnippet(item.chunk.content, queryTokens),
      score: item.score,
    };

    results.push({ citation, content: item.chunk.content });
    if (results.length >= limit) {
      break;
    }
  }

  return results;
}
