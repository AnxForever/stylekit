"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { buildPromptPair } from "@/lib/styles/prompt-pair";

interface PromptPairExporterProps {
  styleName: string;
  styleSlug: string;
  aiRules: string;
  enhancedRules?: string | null;
  doList: string[];
  dontList: string[];
  keywords: string[];
}

type PromptKind = "hard" | "soft";

export function PromptPairExporter({
  styleName,
  styleSlug,
  aiRules,
  enhancedRules,
  doList,
  dontList,
  keywords,
}: PromptPairExporterProps) {
  const { t } = useI18n();
  const [copiedKind, setCopiedKind] = useState<PromptKind | null>(null);

  const prompts = useMemo(
    () =>
      buildPromptPair({
        styleName,
        styleSlug,
        aiRules,
        enhancedRules,
        doList,
        dontList,
        keywords,
      }),
    [styleName, styleSlug, aiRules, enhancedRules, doList, dontList, keywords]
  );

  const promptItems: {
    kind: PromptKind;
    title: string;
    hint: string;
    content: string;
  }[] = [
    {
      kind: "hard",
      title: t("promptPair.hardTitle"),
      hint: t("promptPair.hardHint"),
      content: prompts.hardPrompt,
    },
    {
      kind: "soft",
      title: t("promptPair.softTitle"),
      hint: t("promptPair.softHint"),
      content: prompts.softPrompt,
    },
  ];

  const handleCopy = async (kind: PromptKind, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKind(kind);
      setTimeout(() => setCopiedKind(null), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedKind(kind);
      setTimeout(() => setCopiedKind(null), 2000);
    }
  };

  const handleDownload = (kind: PromptKind, content: string) => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${styleSlug}-${kind}-prompt.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {promptItems.map((item) => (
        <div key={item.kind} className="border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm tracking-wide mb-1">{item.title}</h3>
            <p className="text-xs text-muted">{item.hint}</p>
          </div>
          <div className="p-4 max-h-[320px] overflow-y-auto border-b border-border">
            <pre className="text-xs whitespace-pre-wrap text-foreground">
              <code>{item.content}</code>
            </pre>
          </div>
          <div className="flex">
            <button
              onClick={() => handleCopy(item.kind, item.content)}
              className="flex-1 px-4 py-3 text-sm tracking-wide hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-r border-border"
            >
              {copiedKind === item.kind ? t("promptPair.copied") : t("promptPair.copy")}
            </button>
            <button
              onClick={() => handleDownload(item.kind, item.content)}
              className="flex-1 px-4 py-3 text-sm tracking-wide hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {t("promptPair.download")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
