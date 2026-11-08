"use client";

import { ArrowRight, Check, Code2, Copy, Download, Eye } from "lucide-react";
import { useId, useState } from "react";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { ConnectAiButton } from "@/components/ai/connect-ai-button";
import { DesignMarkdown } from "@/components/style-preview/design-md-content";
import { cn } from "@/lib/utils";

interface DesignMdSectionProps {
  slug?: string;
  styleName: string;
  /** False for styles that have not been backfilled yet. */
  hasSpec: boolean;
  /** Complete markdown for this locale, rendered on the server. */
  markdown: string;
  className?: string;
}

/**
 * The style page's only prompt document. Preview, copy and download all use
 * the complete markdown rendered on the server.
 */
export function DesignMdSection({
  slug,
  styleName,
  hasSpec,
  markdown,
  className,
}: DesignMdSectionProps) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const [view, setView] = useState<"preview" | "markdown">("preview");
  const viewLabelId = useId();
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2200 });
  const copied = isCopied("design.md", markdown);

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "design.md";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackEvent("cta_click", { label: "design_md_download", location: "style_detail" });
  }

  return (
    <section
      id="style-prompts"
      className={cn("min-w-0 scroll-mt-24 border border-border bg-background", className)}
      aria-labelledby={`${viewLabelId}-title`}
    >
      <div className="p-4 sm:p-5">
        {hasSpec ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">design.md</p>
                <h2 id={`${viewLabelId}-title`} className="mt-1 text-lg font-normal tracking-tight">
                  {zh ? `${styleName} 的设计文档` : `${styleName} design document`}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                  type="button"
                  onClick={() => void copy(markdown, "design.md")}
                  className="inline-flex min-h-10 items-center gap-1.5 text-xs text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {copied ? (zh ? "已复制" : "Copied") : zh ? "复制" : "Copy"}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex min-h-10 items-center gap-1.5 text-xs text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {zh ? "下载" : "Download"}
                </button>
                <ConnectAiButton
                  location="style_detail"
                  styleContext={
                    slug
                      ? { slug, name: styleName, locale, markdown }
                      : undefined
                  }
                  className="min-h-10 px-3 text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
              <div role="group" aria-labelledby={viewLabelId} className="inline-flex items-center gap-1">
                <span id={viewLabelId} className="sr-only">
                  {zh ? "文档视图" : "Document view"}
                </span>
                <button
                  type="button"
                  aria-pressed={view === "preview"}
                  onClick={() => setView("preview")}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-1.5 border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    view === "preview"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:text-foreground",
                  )}
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {zh ? "预览" : "Preview"}
                </button>
                <button
                  type="button"
                  aria-pressed={view === "markdown"}
                  onClick={() => setView("markdown")}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-1.5 border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    view === "markdown"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:text-foreground",
                  )}
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Markdown
                </button>
              </div>
            </div>

            <ClipboardFeedback
              result={
                result?.state === "failed" && result.text === markdown
                  ? result
                  : null
              }
              currentText={markdown}
              locale={locale}
              className="mt-3 mb-0"
            />

            <div
              role="region"
              tabIndex={0}
              className="mt-3 max-h-[min(60dvh,32rem)] min-h-64 overflow-auto border border-border bg-foreground/[0.025] p-4 sm:p-5"
              aria-label={view === "preview" ? (zh ? "设计文档预览" : "Design document preview") : (zh ? "Markdown 源文档" : "Markdown source document")}
            >
              {view === "preview" ? (
                <DesignMarkdown markdown={markdown} />
              ) : (
                <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground/90">
                  <code>{markdown}</code>
                </pre>
              )}
            </div>

            {copied ? (
              <p role="status" className="sr-only">
                {zh ? "design.md 已复制到剪贴板。" : "design.md copied to clipboard."}
              </p>
            ) : null}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <LocalizedLink
                  href="/developers"
                  className="inline-flex min-h-10 items-center gap-1.5 text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {zh ? "查看接入文档" : "Read setup docs"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </LocalizedLink>
                <span className="text-muted">
                  {zh ? "远程 MCP 端点，无需 token" : "Remote MCP endpoint, no token required"}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">design.md</p>
            <h2 id={`${viewLabelId}-title`} className="mt-1 text-lg font-normal tracking-tight">
              {zh ? `${styleName} 的设计文档` : `${styleName} design document`}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {zh ? "这份 design.md 还在整理中，完成后会自动出现在这里。" : "This design.md is still being written and will appear here once it lands."}
            </p>
          </>
        )}

      </div>
    </section>
  );
}
