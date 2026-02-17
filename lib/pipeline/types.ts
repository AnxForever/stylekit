import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import type { UrlExtractionEvidence } from "@/lib/style-extractor/url-extractor";
import type { AnalysisResult } from "@/lib/analyzer/project-analyzer";
import type { StyleDiffResult } from "@/lib/styles/style-diff";
import type { MigrationResult } from "@/lib/migration/types";
import type { GeneratedStyle } from "@/lib/ai-generator/style-generator";
import type { StylePackFile } from "@/lib/export/style-pack";

// ---------------------------------------------------------------------------
// Pipeline Stage
// ---------------------------------------------------------------------------

export type PipelineStageName =
  | "extract"
  | "analyze"
  | "match"
  | "migrate"
  | "generate"
  | "export";

export type PipelineStageStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "skipped";

export interface PipelineStage {
  name: PipelineStageName;
  status: PipelineStageStatus;
  durationMs: number;
  error?: string;
}

// ---------------------------------------------------------------------------
// Pipeline Run
// ---------------------------------------------------------------------------

export type PipelineRunStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export interface PipelineRun {
  id: string;
  status: PipelineRunStatus;
  sourceUrl: string;
  target: PipelineTarget;
  output: PipelineOutputConfig;
  options: PipelineOptions;
  stages: PipelineStage[];
  artifacts: PipelineArtifacts;
  createdAt: string;
  updatedAt: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Input Config
// ---------------------------------------------------------------------------

export interface PipelineTarget {
  framework: "html" | "react";
  styleSlug?: string;
}

export interface PipelineOutputConfig {
  format: "zip";
}

export interface PipelineOptions {
  autoMapTokens?: boolean;
}

export interface PipelineRunRequest {
  sourceUrl: string;
  target: PipelineTarget;
  output: PipelineOutputConfig;
  options?: PipelineOptions;
}

export interface PipelineRetryRequest {
  fromStage: PipelineStageName;
}

// ---------------------------------------------------------------------------
// Artifacts (accumulated across stages)
// ---------------------------------------------------------------------------

export interface PipelineArtifacts {
  // extract
  draft?: ExtractedStyleDraft;
  evidence?: UrlExtractionEvidence;
  rawMarkdown?: string;

  // analyze
  analysis?: AnalysisResult;

  // match
  matches?: StyleDiffResult[];

  // migrate
  migration?: MigrationResult;

  // generate
  generated?: GeneratedStyle;

  // export
  files?: StylePackFile[];
  downloadUrl?: string;
}

// ---------------------------------------------------------------------------
// Stage Context (passed between stages)
// ---------------------------------------------------------------------------

export interface PipelineContext {
  run: PipelineRun;
  abortSignal?: AbortSignal;
}

// ---------------------------------------------------------------------------
// Adapter Interface
// ---------------------------------------------------------------------------

export interface StageAdapter<TInput = unknown, TOutput = unknown> {
  name: PipelineStageName;
  execute(input: TInput, ctx: PipelineContext): Promise<TOutput>;
}

// ---------------------------------------------------------------------------
// Pipeline Events (for analytics)
// ---------------------------------------------------------------------------

export type PipelineEventType =
  | "pipeline_started"
  | "pipeline_stage_completed"
  | "pipeline_completed"
  | "pipeline_failed";

export interface PipelineEvent {
  type: PipelineEventType;
  runId: string;
  stage?: PipelineStageName;
  durationMs?: number;
  error?: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const PIPELINE_STAGES: PipelineStageName[] = [
  "extract",
  "analyze",
  "match",
  "migrate",
  "generate",
  "export",
];

export const STAGE_ORDER: Record<PipelineStageName, number> = {
  extract: 0,
  analyze: 1,
  match: 2,
  migrate: 3,
  generate: 4,
  export: 5,
};
