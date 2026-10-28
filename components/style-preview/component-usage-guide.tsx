"use client";

import { CodeBlock } from "@/components/style-preview/code-block";
import { useI18n } from "@/lib/i18n/context";
import { getComponentUsageGuidance } from "@/lib/recipes/usage-guidance";

export interface ComponentUsageArtifact {
  fileName: string;
  componentName: string;
  usage: string;
  dependencies: string[];
  requiresClient: boolean;
}

export interface ComponentUsageGuideProps {
  componentId: string;
  styleSlug?: string;
  artifact?: ComponentUsageArtifact;
}

export function ComponentUsageGuide({ componentId, styleSlug, artifact }: ComponentUsageGuideProps) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const guidance = getComponentUsageGuidance(componentId);
  const copy = (value: { zh: string; en: string }) => zh ? value.zh : value.en;

  return (
    <details className="border-t border-border">
      <summary className="cursor-pointer px-4 py-2.5 text-xs text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
        {zh ? "用法与接入" : "Usage and setup"}
      </summary>
      <div className="space-y-3 px-4 pb-4 text-sm leading-6">
        {artifact ? (
          <>
            <p className="text-xs text-muted">{artifact.fileName} · React · Tailwind CSS 4</p>
            {artifact.usage.trim() && (
              <CodeBlock
                code={artifact.usage}
                language="tsx"
                slug={styleSlug}
                copyLabel={zh ? "复制调用示例" : "Copy usage example"}
              />
            )}
            {artifact.dependencies.length > 0 && (
              <p>{zh ? "依赖：" : "Dependencies: "}{artifact.dependencies.join(", ")}</p>
            )}
            {artifact.requiresClient && (
              <p>{zh ? "包含客户端交互，请添加 use client。" : "Add use client for this interactive component."}</p>
            )}
            <p className="text-xs text-muted">
              {zh ? "颜色与样式按当前配方导出，可在代码中修改。" : "Colors and styles follow this recipe; edit them in the code as needed."}
            </p>
          </>
        ) : (
          <p>{copy(guidance.whenToUse)}</p>
        )}
        <p className="text-xs text-muted">{copy(guidance.whenNotToUse)}</p>
      </div>
    </details>
  );
}
