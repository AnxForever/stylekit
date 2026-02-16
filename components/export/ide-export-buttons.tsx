"use client";

import { useState } from "react";
import {
  Download,
  Copy,
  Check,
  Monitor,
  ChevronDown,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { IdeConfigFormat } from "@/lib/export/ide-configs";

interface IdeExportButtonsProps {
  slug: string;
}

interface FormatOption {
  id: IdeConfigFormat;
  label: string;
  filename: string;
  description: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: "cursorrules",
    label: "Cursor (.cursorrules)",
    filename: ".cursorrules",
    description: "Cursor IDE rules file",
  },
  {
    id: "claude-rules",
    label: "Claude Code (.md)",
    filename: "rules.md",
    description: "Claude Code rules markdown",
  },
  {
    id: "windsurf-rules",
    label: "Windsurf (.windsurf-rules)",
    filename: ".windsurf-rules",
    description: "Windsurf IDE rules file",
  },
  {
    id: "generic",
    label: "Generic (.md)",
    filename: "rules.md",
    description: "Works with any AI tool",
  },
];

export function IdeExportButtons({ slug }: IdeExportButtonsProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  async function fetchConfig(format: IdeConfigFormat): Promise<string | null> {
    const endpoint =
      format === "cursorrules"
        ? `/api/styles/${slug}/cursorrules`
        : `/api/styles/${slug}/claude-rules`;

    // For windsurf and generic, we use the claude-rules endpoint as base
    // but generate client-side from the same data
    if (format === "windsurf-rules" || format === "generic") {
      // Use dynamic import to generate client-side
      const { generateIdeConfig } = await import("@/lib/export/ide-configs");
      return generateIdeConfig(slug, format);
    }

    const res = await fetch(endpoint);
    if (!res.ok) return null;
    return res.text();
  }

  async function handleDownload(format: IdeConfigFormat) {
    const content = await fetchConfig(format);
    if (!content) return;

    const option = FORMAT_OPTIONS.find((o) => o.id === format);
    const filename =
      format === "claude-rules"
        ? `${slug}.md`
        : format === "generic"
          ? `${slug}-rules.md`
          : option?.filename ?? "rules.txt";

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  }

  async function handleCopy(format: IdeConfigFormat) {
    const content = await fetchConfig(format);
    if (!content) return;

    await navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:border-foreground transition-colors"
        >
          <Monitor className="w-4 h-4" />
          <span>{t("ideExport.exportToIde")}</span>
          <ChevronDown
            className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 w-80 bg-background border border-border shadow-lg">
          <div className="p-3 border-b border-border">
            <p className="text-xs tracking-widest uppercase text-muted">
              {t("ideExport.chooseFormat")}
            </p>
          </div>
          <div className="divide-y divide-border">
            {FORMAT_OPTIONS.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-muted">{option.description}</p>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => handleCopy(option.id)}
                    className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    title={t("ideExport.copyToClipboard")}
                  >
                    {copiedFormat === option.id ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDownload(option.id)}
                    className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                    title={t("ideExport.download")}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
