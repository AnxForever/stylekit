import type { Locale } from "@/lib/i18n/translations";

export type RagDocumentKind =
  | "style"
  | "styleRecipe"
  | "stylePrompt"
  | "template"
  | "componentPattern"
  | "promptTopic"
  | "webGuideline"
  | "reactGuideline";

export interface RagDocumentChunk {
  id: string;
  kind: RagDocumentKind;
  locale: Locale;
  title: string;
  section: string;
  href?: string;
  sourceLabel: string;
  sourcePath: string;
  summary: string;
  content: string;
  keywords: string[];
}

export interface RagCitation {
  id: string;
  kind: RagDocumentKind;
  title: string;
  section: string;
  href?: string;
  sourceLabel: string;
  sourcePath: string;
  snippet: string;
  score: number;
}

export interface RagSearchResult {
  citation: RagCitation;
  content: string;
}
