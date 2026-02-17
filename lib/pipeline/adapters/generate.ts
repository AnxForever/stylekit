import { generateStyleFromDescription } from "@/lib/ai-generator/style-generator";
import type { GeneratedStyle } from "@/lib/ai-generator/style-generator";
import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import type { PipelineContext, PipelineTarget } from "@/lib/pipeline/types";

export async function runGenerateStage(
  draft: ExtractedStyleDraft,
  matchedSlug: string | undefined,
  target: PipelineTarget,
  ctx: PipelineContext
): Promise<GeneratedStyle> {
  void target;
  void ctx;
  const parts: string[] = [];

  if (draft.description) {
    parts.push(draft.description);
  }
  if (draft.philosophy) {
    parts.push(draft.philosophy);
  }
  if (draft.keywords && draft.keywords.length > 0) {
    parts.push(draft.keywords.join(", "));
  }

  const description = parts.join(". ") || "modern clean style";

  return generateStyleFromDescription({
    description,
    baseStyle: matchedSlug,
  });
}
