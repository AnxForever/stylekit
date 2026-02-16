"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Download, FileJson, FileCode, Settings } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { StyleTokens } from "@/lib/styles/tokens";
import { exportBlendedTokens, exportAsStyleDefinition } from "@/lib/styles/blend-engine";

interface BlendExportProps {
  tokens: StyleTokens;
}

type ExportFormat = "css" | "json" | "tailwind" | "style";

export function BlendExport({ tokens }: BlendExportProps) {
  const { t } = useI18n();
  const [copiedFormat, setCopiedFormat] = useState<ExportFormat | null>(null);

  const handleCopy = useCallback(
    async (format: ExportFormat) => {
      const content = format === "style"
        ? exportAsStyleDefinition(tokens)
        : exportBlendedTokens(tokens, format);
      try {
        await navigator.clipboard.writeText(content);
        setCopiedFormat(format);
        setTimeout(() => setCopiedFormat(null), 2000);
      } catch {
        // Fallback: no-op
      }
    },
    [tokens]
  );

  const handleDownload = useCallback(
    (format: ExportFormat) => {
      const content = format === "style"
        ? exportAsStyleDefinition(tokens)
        : exportBlendedTokens(tokens, format);
      const ext = format === "style" ? "json" : format === "json" ? "json" : format === "tailwind" ? "js" : "css";
      const filename = `blend-tokens.${ext}`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    [tokens]
  );

  const formats: { key: ExportFormat; icon: typeof FileCode; labelKey: string }[] = [
    { key: "css", icon: FileCode, labelKey: "blend.export.css" },
    { key: "json", icon: FileJson, labelKey: "blend.export.json" },
    { key: "tailwind", icon: Settings, labelKey: "blend.export.tailwind" },
    { key: "style", icon: FileJson, labelKey: "blend.export.style" },
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium">
        {t("blend.export.title")}
      </div>
      <div className="p-4 space-y-2">
        {formats.map(({ key, icon: Icon, labelKey }) => (
          <div
            key={key}
            className="flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-muted" />
              <span className="text-sm">{t(labelKey as Parameters<typeof t>[0])}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleCopy(key)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors rounded border border-border hover:bg-muted/10"
              >
                {copiedFormat === key ? (
                  <>
                    <Check className="w-3 h-3" />
                    {t("export.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    {t("export.copy")}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleDownload(key)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-muted hover:text-foreground transition-colors rounded border border-border hover:bg-muted/10"
              >
                <Download className="w-3 h-3" />
                {t("export.download")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
