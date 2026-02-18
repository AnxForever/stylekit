"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ClipboardCopy,
  Code2,
  Download,
  Sparkles,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

// ---------------------------------------------------------------------------
// Variant styles (back button matching each template's design)
// ---------------------------------------------------------------------------

export type TemplateBackButtonVariant =
  | "default"
  | "brutal"
  | "glass"
  | "editorial"
  | "neumorphic"
  | "minimalist"
  | "warm"
  | "dark"
  | "modern"
  | "social"
  | "recipe"
  | "fitness";

const variantStyles: Record<TemplateBackButtonVariant, string> = {
  default:
    "bg-black/90 text-white text-sm font-medium rounded-lg shadow-lg backdrop-blur-sm hover:bg-black dark:bg-white/90 dark:text-black dark:hover:bg-white",
  brutal:
    "bg-[#ccff00] text-black text-sm font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
  glass:
    "bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20",
  editorial:
    "text-zinc-500 hover:text-zinc-900 text-xs font-serif tracking-widest uppercase border-b border-zinc-300 hover:border-zinc-600 rounded-none pb-0.5",
  neumorphic:
    "bg-[#e0e5ec] text-gray-700 text-sm font-medium rounded-xl shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
  minimalist:
    "bg-white text-black text-sm font-bold border-2 border-black hover:bg-black hover:text-white",
  warm:
    "bg-[#4a9d9a] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#4a9d9a]/25 hover:bg-[#3d8785]",
  dark:
    "bg-zinc-800 text-zinc-200 text-sm font-medium rounded-lg border border-zinc-700 hover:bg-zinc-700 hover:text-white",
  modern:
    "bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]",
  social:
    "bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 shadow-md",
  recipe:
    "bg-gradient-to-r from-orange-400 to-rose-500 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02]",
  fitness:
    "bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02]",
};

// ---------------------------------------------------------------------------
// Action button style (toolbar icons — universal dark pill)
// ---------------------------------------------------------------------------

const actionBtnClass =
  "p-2 rounded-lg bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface TemplateBackButtonProps {
  variant?: TemplateBackButtonVariant;
}

export function TemplateBackButton({
  variant = "default",
}: TemplateBackButtonProps) {
  const { t } = useI18n();
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";

  const [sourceOpen, setSourceOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Fetch source code (lazy — only on first demand)
  const fetchSource = useCallback(async () => {
    if (source !== null || !slug) return source;
    setLoading(true);
    try {
      const res = await fetch(`/api/templates/${slug}/source`);
      if (!res.ok) throw new Error("fetch failed");
      const json = await res.json();
      setSource(json.source);
      return json.source as string;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, [slug, source]);

  // View source
  const handleViewSource = useCallback(async () => {
    await fetchSource();
    setSourceOpen(true);
  }, [fetchSource]);

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    const code = source ?? (await fetchSource());
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [source, fetchSource]);

  // Download file
  const handleDownload = useCallback(async () => {
    const code = source ?? (await fetchSource());
    if (!code) return;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.tsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [slug, source, fetchSource]);

  // Sync <dialog> open state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sourceOpen && !dialog.open) {
      dialog.showModal();
    } else if (!sourceOpen && dialog.open) {
      dialog.close();
    }
  }, [sourceOpen]);

  // Close on Escape
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setSourceOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const style = variantStyles[variant];

  return (
    <>
      {/* --- Floating toolbar --- */}
      <div className="fixed top-3 right-4 z-[9999] flex items-center gap-2">
        {/* Action buttons */}
        <button
          onClick={handleViewSource}
          className={actionBtnClass}
          title={t("templates.viewSource")}
          disabled={loading}
        >
          <Code2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleCopy}
          className={actionBtnClass}
          title={t("templates.copyCode")}
          disabled={loading}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <ClipboardCopy className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={handleDownload}
          className={actionBtnClass}
          title={t("templates.download")}
          disabled={loading}
        >
          <Download className="w-4 h-4" />
        </button>

        <Link
          href="/generate"
          className={actionBtnClass}
          title={t("templates.openGenerator")}
        >
          <Sparkles className="w-4 h-4" />
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-white/30" />

        {/* Back button (styled per variant) */}
        <Link
          href="/templates"
          className={`inline-flex items-center gap-2 px-4 py-2.5 transition-all duration-200 ${style}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t("templates.backToList")}</span>
        </Link>
      </div>

      {/* --- Source code modal --- */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-[10000] m-0 h-full w-full max-h-full max-w-full bg-transparent backdrop:bg-black/60"
      >
        <div className="flex h-full w-full items-start justify-center p-4 md:p-8">
          <div className="relative w-full max-w-4xl max-h-full flex flex-col rounded-xl bg-zinc-900 shadow-2xl border border-zinc-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700 bg-zinc-800/80">
              <div className="flex items-center gap-3">
                <Code2 className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-mono text-zinc-300">
                  {slug}.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-700 rounded-md hover:bg-zinc-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      {t("templates.copied")}
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-3.5 h-3.5" />
                      {t("templates.copyCode")}
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-700 rounded-md hover:bg-zinc-600 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t("templates.download")}
                </button>
                <button
                  onClick={() => setSourceOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code content */}
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
                  {t("templates.loadingSource")}
                </div>
              ) : source ? (
                <div className="flex text-sm font-mono leading-relaxed">
                  {/* Line numbers */}
                  <div className="select-none px-4 py-4 text-right text-zinc-600 bg-zinc-900/50 border-r border-zinc-800 shrink-0">
                    {source.split("\n").map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Code */}
                  <pre className="flex-1 px-4 py-4 text-zinc-300 overflow-x-auto">
                    <code>{source}</code>
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
                  {t("templates.sourceNotFound")}
                </div>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
