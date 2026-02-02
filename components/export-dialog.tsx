"use client";

import { useState } from "react";
import type { DesignStyle } from "@/lib/styles";
import { exportStyleTokens, downloadTokens, ExportFormat } from "@/lib/export/figma-tokens";

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
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const preview = exportStyleTokens(style, selectedFormat);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadTokens(style, selectedFormat);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-background border border-border shadow-xl mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-medium">Export Design Tokens</h2>
            <p className="text-sm text-muted mt-1">{style.name} - {style.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Format Selection */}
        <div className="p-6 border-b border-border">
          <p className="text-sm text-muted mb-3">Export Format</p>
          <div className="flex flex-wrap gap-2">
            {formatOptions.map((format) => (
              <button
                key={format.key}
                onClick={() => setSelectedFormat(format.key)}
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
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted">Preview</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs overflow-auto max-h-[300px] font-mono">
            {preview}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
          <p className="text-xs text-muted">
            Tip: Use the <strong>Figma Tokens</strong> plugin to import these tokens directly into your Figma project.
          </p>
        </div>
      </div>
    </div>
  );
}
