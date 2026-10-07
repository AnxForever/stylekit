"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { DesignStyle } from "@/lib/styles";
import { exportStyleTokens, downloadTokens, ExportFormat } from "@/lib/export/figma-tokens";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { useClipboard } from "@/lib/hooks/use-clipboard";

interface ExportDialogProps {
  style: DesignStyle;
  isOpen: boolean;
  onClose: () => void;
}

const formatOptions: { key: ExportFormat; label: string; description: string }[] = [
  {
    key: "figma-tokens",
    label: "Figma Tokens",
    description: "Compatible with Figma Tokens plugin",
  },
  {
    key: "style-dictionary",
    label: "Style Dictionary",
    description: "Amazon Style Dictionary format",
  },
  {
    key: "css-variables",
    label: "CSS Variables",
    description: "Native CSS custom properties",
  },
];

export function ExportDialog({ style, isOpen, onClose }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("figma-tokens");
  const [formatRevision, setFormatRevision] = useState(0);
  const clipboard = useClipboard();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const preview = exportStyleTokens(style, selectedFormat);
  const copyId = `export-dialog:${selectedFormat}:${formatRevision}`;
  const clipboardResult = clipboard.result?.id === copyId && clipboard.result.text === preview
    ? clipboard.result
    : null;

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-background border border-border shadow-lg mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Export</p>
            <h2 className="text-lg">Design Tokens</h2>
            <p className="text-sm text-muted">{style.name} - {style.nameEn}</p>
          </div>
          <button
            type="button"
            aria-label="Close token export"
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Format Selection */}
        <div className="px-6 py-4 border-b border-border">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">Format</p>
          <div className="flex flex-wrap gap-2">
            {formatOptions.map((format) => (
              <button
                key={format.key}
                onClick={() => handleFormatChange(format.key)}
                className={`px-4 py-2 text-sm transition-colors ${
                  selectedFormat === format.key
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted mt-2">
            {formatOptions.find((f) => f.key === selectedFormat)?.description}
          </p>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs tracking-widest uppercase text-muted">Preview</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
              >
                {clipboard.isCopied(copyId, preview) ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
          <div className="border border-border overflow-auto max-h-[280px]">
            <pre className="p-4 text-xs font-mono text-foreground whitespace-pre-wrap">
              {preview}
            </pre>
          </div>
          <ClipboardFeedback
            result={clipboardResult}
            locale="en"
            currentText={preview}
            className="mt-3 mb-0"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border">
          <p className="text-xs text-muted">
            Tip: Use the <strong>Figma Tokens</strong> plugin to import these tokens directly into your Figma project.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
