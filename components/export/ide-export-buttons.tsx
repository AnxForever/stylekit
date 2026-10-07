"use client";

import { useId, useRef, useState } from "react";
import {
  Download,
  Copy,
  Check,
  Monitor,
  ChevronDown,
  LoaderCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { IdeConfigFormat } from "@/lib/export/ide-configs";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";

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
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFormat, setPendingFormat] = useState<IdeConfigFormat | null>(null);
  const [feedbackFormat, setFeedbackFormat] = useState<IdeConfigFormat | null>(null);
  const [loadError, setLoadError] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { copy, result: clipboardResult, isCopied } = useClipboard({ copiedDuration: 2000 });
  const zh = locale === "zh";

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
    if (pendingFormat) return;
    setPendingFormat(format);
    setFeedbackFormat(null);
    setLoadError(false);

    try {
      const content = await fetchConfig(format);
      if (!content) {
        setLoadError(true);
        return;
      }

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
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setIsOpen(false);
    } catch {
      setLoadError(true);
    } finally {
      setPendingFormat(null);
    }
  }

  async function handleCopy(format: IdeConfigFormat) {
    if (pendingFormat) return;
    setPendingFormat(format);
    setFeedbackFormat(null);
    setLoadError(false);

    try {
      const content = await fetchConfig(format);
      if (!content) {
        setLoadError(true);
        return;
      }

      setFeedbackFormat(format);
      await copy(content, format);
    } catch {
      setLoadError(true);
    } finally {
      setPendingFormat(null);
    }
  }

  return (
    <div className="relative w-full min-w-0">
      <div className="flex items-center gap-2">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          aria-busy={pendingFormat !== null}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-border px-4 py-2 text-sm transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
        >
          <Monitor className="w-4 h-4" aria-hidden="true" />
          <span>{t("ideExport.exportToIde")}</span>
          <ChevronDown
            aria-hidden="true"
            className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          id={menuId}
          aria-busy={pendingFormat !== null}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              setIsOpen(false);
              triggerRef.current?.focus();
            }
          }}
          className="absolute left-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] max-w-full min-w-0 border border-border bg-background shadow-lg"
        >
          <div className="p-3 border-b border-border">
            <p className="text-xs tracking-widest uppercase text-muted">
              {t("ideExport.chooseFormat")}
            </p>
          </div>
          {loadError && (
            <p role="alert" className="border-b border-border px-3 py-2 text-sm text-foreground">
              {zh ? "无法加载配置，请重试。" : "Couldn't load the configuration. Please try again."}
            </p>
          )}
          <div className="divide-y divide-border">
            {FORMAT_OPTIONS.map((option) => (
              <div
                key={option.id}
                className="flex flex-col gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 break-words sm:flex-1">
                  <p className="break-words text-sm font-medium">{option.label}</p>
                  <p className="break-words text-xs text-muted">{option.description}</p>
                </div>
                <div className="flex items-center justify-end gap-1 sm:ml-3 sm:justify-start">
                  <button
                    type="button"
                    onClick={() => handleCopy(option.id)}
                    disabled={pendingFormat !== null}
                    aria-label={zh ? `复制 ${option.label}` : `Copy ${option.label}`}
                    title={t("ideExport.copyToClipboard")}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-transparent hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-wait disabled:opacity-50 dark:hover:bg-zinc-700"
                  >
                    {pendingFormat === option.id ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : isCopied(option.id) ? (
                      <Check className="w-4 h-4 text-green-600" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload(option.id)}
                    disabled={pendingFormat !== null}
                    aria-label={zh ? `下载 ${option.label}` : `Download ${option.label}`}
                    title={t("ideExport.download")}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center border border-transparent hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-wait disabled:opacity-50 dark:hover:bg-zinc-700"
                  >
                    {pendingFormat === option.id ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Download className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ClipboardFeedback
            result={
              feedbackFormat && clipboardResult?.id === feedbackFormat ? clipboardResult : null
            }
            locale={locale}
            className="mx-3 mt-3 mb-3"
          />
        </div>
      )}
    </div>
  );
}
