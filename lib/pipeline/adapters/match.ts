import { importTheme } from "@/lib/migration";
import type { MigrationResult } from "@/lib/migration/types";
import { findClosestStyles } from "@/lib/styles/style-diff";
import type { StyleDiffResult } from "@/lib/styles/style-diff";
import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import type { PipelineContext } from "@/lib/pipeline/types";

export interface MatchStageResult {
  matches: StyleDiffResult[];
  migration: MigrationResult;
}

export async function runMatchStage(
  draft: ExtractedStyleDraft,
  ctx: PipelineContext
): Promise<MatchStageResult> {
  void ctx;
  const themeConfig = JSON.stringify(draft);

  const migration = importTheme({
    type: "style-extractor",
    themeConfig,
  });

  if (!migration.success) {
    return { matches: [], migration };
  }

  const matches = findClosestStyles(migration.tokens, 5);

  return { matches, migration };
}
