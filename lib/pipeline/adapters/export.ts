import { generateStylePack } from "@/lib/export/style-pack";
import type { StylePackFile } from "@/lib/export/style-pack";
import type { DesignStyle } from "@/lib/styles";
import type { GeneratedStyle } from "@/lib/ai-generator/style-generator";
import type { PipelineContext, PipelineTarget } from "@/lib/pipeline/types";

export interface ExportStageResult {
  files: StylePackFile[];
  downloadUrl: string;
}

export async function runExportStage(
  generated: GeneratedStyle,
  target: PipelineTarget,
  runId: string,
  ctx: PipelineContext
): Promise<ExportStageResult> {
  void target;
  void ctx;
  const style: DesignStyle = {
    slug: `pipeline-${runId}`,
    name: generated.name,
    nameEn: generated.name,
    description: generated.description,
    cover: "",
    styleType: "visual",
    tags: ["modern"],
    category: "modern",
    colors: {
      primary: "",
      secondary: "",
      accent: [],
    },
    keywords: [],
    philosophy: generated.description,
    doList: [],
    dontList: [],
    components: {
      button: { name: "Button", description: "Generated button", code: "" },
      card: { name: "Card", description: "Generated card", code: "" },
      input: { name: "Input", description: "Generated input", code: "" },
    },
    globalCss: "",
    aiRules: "",
  };

  const files = generateStylePack(style, generated.tokens);

  return {
    files,
    downloadUrl: `/api/pipeline/run/${runId}/download`,
  };
}
