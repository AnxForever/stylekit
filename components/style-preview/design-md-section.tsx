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

interface DesignMdSectionProps {
  slug?: string;
  styleName: string;
  /** False for styles that have not been backfilled yet. */
  hasSpec: boolean;
  /** Complete markdown for this locale, rendered on the server. */
  markdown: string;
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
}: DesignMdSectionProps) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const [view, setView] = useState<"preview" | "markdown">("preview");
  const viewLabelId = useId();
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2200 });
  const copied = isCopied("design.md", markdown);
  const currentCopyError =
    result?.state === "failed" && result.text === markdown ? result : null;

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
    <section id="style-prompts" className="border-b border-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <p className="text-xs tracking-widest text-muted mb-4">design.md</p>
        <h2 className="text-2xl md:text-3xl mb-3">
          {zh ? `${styleName} 的设计文档` : `${styleName} as a design document`}
        </h2>
        <p className="text-muted mb-8 max-w-2xl">
          {hasSpec
            ? zh
              ? "一份文档说明这套风格的配色职责、字体规则、间距与组件构造。复制或下载后直接交给 Claude Code 或 Codex。"
              : "One document describes the colour roles, type rules, spacing and component construction behind this style. Copy or download it into Claude Code or Codex."
            : zh
              ? "这份 design.md 还在整理中，完成后会自动出现在这里。"
              : "This design.md is still being written and will appear here once it lands."}
        </p>

        {hasSpec ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
              <div role="group" aria-labelledby={viewLabelId} className="inline-flex items-center gap-1">
                <span id={viewLabelId} className="sr-only">
                  {zh ? "文档视图" : "Document view"}
                </span>
                <button
                  type="button"
                  aria-pressed={view === "preview"}
                  onClick={() => setView("preview")}
                  className={`inline-flex min-h-10 items-center gap-1.5 border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    view === "preview"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {zh ? "预览" : "Preview"}
                </button>
                <button
                  type="button"
                  aria-pressed={view === "markdown"}
                  onClick={() => setView("markdown")}
                  className={`inline-flex min-h-10 items-center gap-1.5 border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    view === "markdown"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Markdown
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
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
                  variant="document"
                />
              </div>
            </div>

            <ClipboardFeedback
              result={currentCopyError}
              currentText={markdown}
              locale={locale}
              className="mt-4 mb-0"
            />

            <div className="mt-4">
              <div
                role="region"
                aria-label={view === "preview" ? (zh ? "设计文档预览" : "Design document preview") : (zh ? "Markdown 源文档" : "Markdown source document")}
                tabIndex={0}
                className="max-h-[32rem] overflow-auto border border-border bg-foreground/[0.025] p-4 md:p-6"
              >
                {view === "preview" ? (
                  <DesignMarkdown markdown={markdown} />
                ) : (
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground/90">
                    <code>{markdown}</code>
                  </pre>
                )}
              </div>
            </div>

            {copied ? (
              <p role="status" className="sr-only">
                {zh ? "design.md 已复制到剪贴板。" : "design.md copied to clipboard."}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
              <LocalizedLink
                href="/developers"
                className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
              >
                {zh ? "查看接入文档" : "Read the setup docs"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </LocalizedLink>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
