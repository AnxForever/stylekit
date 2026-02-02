"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { ExamplePrompt } from "@/lib/styles";

interface ExamplePromptsProps {
  prompts: ExamplePrompt[];
  styleName: string;
  aiRules: string;
}

export function ExamplePrompts({ prompts, styleName, aiRules }: ExamplePromptsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { locale, t } = useI18n();

  const handleCopy = async (prompt: ExamplePrompt, index: number) => {
    // Copy the prompt along with a simplified version of the AI rules
    const content = `${prompt.prompt}

---
以上是具体需求，以下是 ${styleName} 风格的设计规范，请严格遵守：

${aiRules}`;

    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (!prompts || prompts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className="border border-border p-4 hover:border-foreground transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-medium text-sm">
                {locale === "zh" ? prompt.title : prompt.titleEn}
              </h4>
              <button
                onClick={() => handleCopy(prompt, index)}
                className="shrink-0 px-2 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-colors"
              >
                {copiedIndex === index ? t("export.copied") : t("export.copy")}
              </button>
            </div>
            <p className="text-xs text-muted mb-3">
              {locale === "zh" ? prompt.description : prompt.descriptionEn}
            </p>
            <div className="text-xs text-muted bg-zinc-50 dark:bg-zinc-900 p-3 max-h-24 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono">{prompt.prompt}</pre>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">
        {t("examplePrompts.hint")}
      </p>
    </div>
  );
}
