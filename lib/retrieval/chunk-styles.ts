/**
 * Slices design styles into embeddable chunks.
 *
 * `docs/RAG_SEMANTIC_RETRIEVAL.md` section 2.2: cut on semantic fields, not on
 * a character budget. Each style produces up to four kinds of chunk, each with
 * its own retrieval weight, and each written per locale so a Chinese query can
 * also recall an English chunk (and the other way round).
 *
 * The function is pure and deterministic: the same styles always produce the
 * same ids, in the same order, which is what lets the vector index be rebuilt
 * incrementally and re-derived at query time.
 */

import { createHash } from "node:crypto";
import type { ComponentTemplate, DesignStyle } from "@/lib/styles/types";
import { detectLocale, normalizeText, type TextLocale } from "./tokenize";

export type StyleChunkKind = "identity" | "philosophy" | "rules" | "recipes";

export type StyleChunkLocale = TextLocale;

export interface StyleChunk {
  /** Stable across rebuilds: `style:{slug}:{kind}:{locale}`. */
  id: string;
  styleSlug: string;
  kind: StyleChunkKind;
  locale: StyleChunkLocale;
  text: string;
  weight: number;
  /** sha256 of `text`, also the embedding cache key. */
  contentHash: string;
}

/**
 * Chunk weights from the design doc, section 2.2 - **metadata only, not part
 * of the retrieval score.**
 *
 * The values still travel with every chunk as `StyleChunk.weight` and land in
 * the vector index metadata, but `hybrid-search.ts` no longer multiplies them
 * into anything, and nothing else reads them either. Ranking by chunk kind was
 * measured to hurt: applied after RRF it reordered 28 of the 60 labelled
 * queries for the worse and cost 16.7 points of Recall@1. The mechanism and
 * the numbers are in the header of `lib/retrieval/hybrid-search.ts`.
 *
 * Reading the table is still useful - `philosophy` leads because it is
 * long-form and semantically dense, which is exactly what an embedding is good
 * at, while `identity` is short enough that keyword matching already finds it.
 * That reasoning was sound; acting on it was not, because RRF's score scale at
 * k = 60 makes a 1.2 factor worth about twelve ranks.
 */
export const CHUNK_WEIGHTS: Readonly<Record<StyleChunkKind, number>> = {
  identity: 1.0,
  philosophy: 1.2,
  rules: 1.0,
  recipes: 0.8,
};

/** Chunks below this length carry too little signal and make noisy neighbours. */
export const MIN_CHUNK_LENGTH = 32;

/** The order chunks are emitted in, so index rebuilds stay byte-identical. */
export const CHUNK_KINDS: readonly StyleChunkKind[] = ["identity", "philosophy", "rules", "recipes"];

export function styleChunkId(slug: string, kind: StyleChunkKind, locale: StyleChunkLocale): string {
  return `style:${slug}:${kind}:${locale}`;
}

export function hashChunkText(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

interface ChunkDraft {
  kind: StyleChunkKind;
  locale: StyleChunkLocale;
  text: string;
}

function joinLines(parts: ReadonlyArray<string | undefined>): string {
  return parts
    .map((part) => normalizeText(part ?? ""))
    .filter(Boolean)
    .join("\n");
}

function joinList(values: ReadonlyArray<string> | undefined): string {
  return (values ?? [])
    .map((value) => normalizeText(value))
    .filter(Boolean)
    .join(", ");
}

function joinBullets(values: ReadonlyArray<string> | undefined): string {
  return (values ?? [])
    .map((value) => normalizeText(value))
    .filter(Boolean)
    .map((value) => `- ${value}`)
    .join("\n");
}

/**
 * Component recipes, summarised as `name: description`.
 *
 * Component copy is not bilingual - most styles describe their components in
 * Chinese while a minority (neo-brutalist and friends) write them in English -
 * so instead of forcing two locales we detect the dominant script and tag the
 * single chunk with it.
 */
function buildRecipeText(style: DesignStyle): string {
  return Object.values(style.components)
    .filter((component): component is ComponentTemplate => Boolean(component))
    .map((component) => joinLines([component.name, component.description]).replace("\n", ": "))
    .filter(Boolean)
    .join("\n");
}

function buildDrafts(style: DesignStyle): ChunkDraft[] {
  const drafts: ChunkDraft[] = [];

  const identityZh = joinLines([style.name, style.description, joinList(style.keywords)]);
  const identityEn = joinLines([style.nameEn, style.descriptionEn, joinList(style.keywordsEn)]);
  const philosophyZh = normalizeText(style.philosophy);
  const philosophyEn = normalizeText(style.philosophyEn ?? "");
  const rulesZh = joinBullets(style.doList);
  const rulesEn = joinBullets(style.doListEn);

  drafts.push({ kind: "identity", locale: "zh-CN", text: identityZh });
  drafts.push({ kind: "identity", locale: "en-US", text: identityEn });
  drafts.push({ kind: "philosophy", locale: "zh-CN", text: philosophyZh });
  drafts.push({ kind: "philosophy", locale: "en-US", text: philosophyEn });
  drafts.push({ kind: "rules", locale: "zh-CN", text: rulesZh });
  drafts.push({ kind: "rules", locale: "en-US", text: rulesEn });

  const recipeText = buildRecipeText(style);
  if (recipeText) {
    drafts.push({ kind: "recipes", locale: detectLocale(recipeText), text: recipeText });
  }

  return drafts;
}

/**
 * Turns every style into its chunks, dropping drafts below `MIN_CHUNK_LENGTH`.
 *
 * Two styles can legitimately produce the same text; they keep distinct ids and
 * share a `contentHash`, which is what makes the embedding cache collapse them
 * into a single API call.
 */
export function chunkStyles(styles: readonly DesignStyle[]): StyleChunk[] {
  const chunks: StyleChunk[] = [];

  for (const style of styles) {
    for (const draft of buildDrafts(style)) {
      const text = normalizeText(draft.text);
      if (text.length < MIN_CHUNK_LENGTH) continue;

      chunks.push({
        id: styleChunkId(style.slug, draft.kind, draft.locale),
        styleSlug: style.slug,
        kind: draft.kind,
        locale: draft.locale,
        text,
        weight: CHUNK_WEIGHTS[draft.kind],
        contentHash: hashChunkText(text),
      });
    }
  }

  return chunks;
}

export interface ChunkStats {
  total: number;
  styles: number;
  byKind: Record<StyleChunkKind, number>;
  byLocale: Record<StyleChunkLocale, number>;
  averageLength: number;
  shortestLength: number;
  longestLength: number;
}

/** Summary used by the build script and by tests, so both report the same numbers. */
export function summarizeChunks(chunks: readonly StyleChunk[]): ChunkStats {
  const byKind: Record<StyleChunkKind, number> = { identity: 0, philosophy: 0, rules: 0, recipes: 0 };
  const byLocale: Record<StyleChunkLocale, number> = { "zh-CN": 0, "en-US": 0 };
  const slugs = new Set<string>();
  let totalLength = 0;
  let shortestLength = Number.POSITIVE_INFINITY;
  let longestLength = 0;

  for (const chunk of chunks) {
    byKind[chunk.kind] += 1;
    byLocale[chunk.locale] += 1;
    slugs.add(chunk.styleSlug);
    totalLength += chunk.text.length;
    shortestLength = Math.min(shortestLength, chunk.text.length);
    longestLength = Math.max(longestLength, chunk.text.length);
  }

  return {
    total: chunks.length,
    styles: slugs.size,
    byKind,
    byLocale,
    averageLength: chunks.length === 0 ? 0 : Math.round(totalLength / chunks.length),
    shortestLength: Number.isFinite(shortestLength) ? shortestLength : 0,
    longestLength,
  };
}
