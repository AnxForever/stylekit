"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";

interface QuickStartGuideProps {
  aiRules: string;
  styleName: string;
  onScrollToRules?: () => void;
}

export function QuickStartGuide({ aiRules, styleName, onScrollToRules }: QuickStartGuideProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const handleQuickCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiRules);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = aiRules;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border border-border bg-zinc-50 dark:bg-zinc-900/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🚀</span>
        <h3 className="font-medium">{t("quickStart.title")}</h3>
      </div>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex gap-4">
          <div className="shrink-0 w-6 h-6 bg-foreground text-background text-xs flex items-center justify-center font-medium">
            1
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">{t("quickStart.step1.title")}</p>
            <button
              onClick={handleQuickCopy}
              className="px-4 py-2 text-sm border border-border hover:bg-foreground hover:text-background transition-colors"
            >
              {copied ? t("export.copied") : t("quickStart.step1.button")}
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4">
          <div className="shrink-0 w-6 h-6 bg-foreground text-background text-xs flex items-center justify-center font-medium">
            2
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">{t("quickStart.step2.title")}</p>
            <div className="text-xs text-muted space-y-1">
              <p>• <strong>Cursor</strong> → {t("quickStart.step2.cursor")}</p>
              <p>• <strong>Claude Code</strong> → {t("quickStart.step2.claudeCode")}</p>
              <p>• <strong>Trae</strong> → {t("quickStart.step2.trae")}</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4">
          <div className="shrink-0 w-6 h-6 bg-foreground text-background text-xs flex items-center justify-center font-medium">
            3
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">{t("quickStart.step3.title")}</p>
            <p className="text-xs text-muted">
              {t("quickStart.step3.example").replace("{style}", styleName)}
            </p>
          </div>
        </div>
      </div>

      {onScrollToRules && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={onScrollToRules}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            {t("quickStart.viewAllFormats")} →
          </button>
        </div>
      )}
    </div>
  );
}
