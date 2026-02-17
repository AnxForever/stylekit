import { importTheme } from "@/lib/migration";
import type { MigrationResult } from "@/lib/migration/types";
import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import type { PipelineContext } from "@/lib/pipeline/types";

export async function runMigrateStage(
  draft: ExtractedStyleDraft,
  migration: MigrationResult | undefined,
  ctx: PipelineContext
): Promise<MigrationResult> {
  void ctx;
  if (migration?.success) {
    return migration;
  }

  return importTheme({
    type: "style-extractor",
    themeConfig: JSON.stringify(draft),
  });
}
