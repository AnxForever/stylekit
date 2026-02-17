import { analyzeProjectStyle } from "@/lib/analyzer/project-analyzer";
import type { AnalysisResult } from "@/lib/analyzer/project-analyzer";
import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import type { PipelineContext } from "@/lib/pipeline/types";

export async function runAnalyzeStage(
  draft: ExtractedStyleDraft,
  ctx: PipelineContext
): Promise<AnalysisResult> {
  void ctx;
  const codeFragments = [
    draft.buttonCode,
    draft.cardCode,
    draft.inputCode,
  ].filter(Boolean);

  const code = codeFragments.join("\n");

  if (!code) {
    return { topMatches: [], classesFound: [], dominantPatterns: [] };
  }

  return analyzeProjectStyle({ code });
}
