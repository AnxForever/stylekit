"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import type { DesignStyle } from "@/lib/styles";
import {
  exportStyleTokens,
  downloadTokens,
  type ExportFormat,
} from "@/lib/export/figma-tokens";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n/context";

interface ExportDialogProps {
  style: DesignStyle;
}

const formatOptions: { key: ExportFormat; label: string }[] = [
  { key: "figma-tokens", label: "Figma Tokens" },
  { key: "style-dictionary", label: "Style Dictionary" },
  { key: "css-variables", label: "CSS Variables" },
];

const formatDescriptions: Record<ExportFormat, { zh: string; en: string }> = {
  "figma-tokens": {
    zh: "兼容 Figma Tokens 插件",
    en: "Compatible with the Figma Tokens plugin",
  },
  "style-dictionary": {
    zh: "Amazon Style Dictionary 格式",
    en: "Amazon Style Dictionary format",
  },
  "css-variables": {
    zh: "原生 CSS 自定义属性",
    en: "Native CSS custom properties",
  },
};

export function ExportDialog({ style }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] =
    useState<ExportFormat>("figma-tokens");
  const [formatRevision, setFormatRevision] = useState(0);
  const clipboard = useClipboard();
  const { locale } = useI18n();

  const preview = exportStyleTokens(style, selectedFormat);
  const copyId = ["export-dialog", selectedFormat, formatRevision].join(":");
  const clipboardResult =
    clipboard.result?.id === copyId && clipboard.result.text === preview
      ? clipboard.result
      : null;
  const copied = clipboard.isCopied(copyId, preview);

  const handleCopy = async () => {
    await clipboard.copy(preview, copyId);
  };

  const handleFormatChange = (format: ExportFormat) => {
    if (format === selectedFormat) return;
    setSelectedFormat(format);
    setFormatRevision((revision) => revision + 1);
  };

  const handleDownload = () => {
    downloadTokens(style, selectedFormat);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-sm" />
      <Dialog.Content
        aria-modal="true"
        className="fixed left-1/2 top-1/2 z-[9999] flex max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col border border-border bg-background shadow-lg outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-muted">
              {locale === "zh" ? "导出" : "Export"}
            </p>
            <Dialog.Title className="text-lg">
              {locale === "zh" ? "设计令牌" : "Design Tokens"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted">
              {style.name} · {style.nameEn}
            </Dialog.Description>
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label={locale === "zh" ? "关闭令牌导出" : "Close token export"}
              className="p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </Dialog.Close>
        </div>

        <div className="border-b border-border px-6 py-4">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted">
            {locale === "zh" ? "格式" : "Format"}
          </p>
          <div
            role="group"
            aria-label={locale === "zh" ? "令牌格式" : "Token format"}
            className="flex flex-wrap gap-2"
          >
            {formatOptions.map((format) => {
              const selected = selectedFormat === format.key;

              return (
                <button
                  key={format.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleFormatChange(format.key)}
                  className={`px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    selected
                      ? "bg-foreground text-background"
                      : "border border-border hover:border-foreground"
                  }`}
                >
                  {format.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted">
            {formatDescriptions[selectedFormat][locale === "zh" ? "zh" : "en"]}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted">
              {locale === "zh" ? "预览" : "Preview"}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="border border-border px-3 py-1.5 text-xs transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {copied
                  ? locale === "zh"
                    ? "已复制"
                    : "Copied!"
                  : locale === "zh"
                    ? "复制"
                    : "Copy"}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="bg-foreground px-3 py-1.5 text-xs text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {locale === "zh" ? "下载" : "Download"}
              </button>
            </div>
          </div>
          <div className="max-h-[280px] overflow-auto border border-border">
            <pre className="whitespace-pre-wrap p-4 text-xs font-mono text-foreground">
              {preview}
            </pre>
          </div>
          <ClipboardFeedback
            result={clipboardResult}
            locale={locale}
            currentText={preview}
            className="mt-3 mb-0"
          />
        </div>

        <div className="border-t border-border px-6 py-4">
          <p className="text-xs text-muted">
            {locale === "zh" ? (
              <>
                提示：可使用 <strong>Figma Tokens</strong> 插件，将这些令牌直接导入
                Figma 项目。
              </>
            ) : (
              <>
                Tip: Use the <strong>Figma Tokens</strong> plugin to import these
                tokens directly into your Figma project.
              </>
            )}
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
