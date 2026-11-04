"use client";

import { useCallback, useState } from "react";
import { ArrowRight, Check, Copy, Download, LoaderCircle } from "lucide-react";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { ConnectAiButton } from "@/components/ai/connect-ai-button";
import { DesignMarkdown } from "@/components/style-preview/design-md-content";
import { cn } from "@/lib/utils";

type Density = "compact" | "extended";

const DENSITIES: ReadonlyArray<{ id: Density; zh: string; en: string }> = [
  { id: "compact", zh: "精简", en: "Compact" },
  { id: "extended", zh: "完整", en: "Extended" },
];

interface DesignMdSectionProps {
  slug: string;
  styleName: string;
  /** False for styles that have not been backfilled yet. */
  hasSpec: boolean;
  /** Compact markdown for this locale, rendered on the server. */
  initialMarkdown: string;
}

/**
 * The style page's only export surface: one document, two densities.
 *
 * There used to be four sibling formats here — DESIGN.md, the Tailwind theme,
 * the CSS variable sheet and the DTCG token file. All four were renderings of
 * the same spec, so offering them side by side asked the reader to choose
 * between identical answers. The markdown carries the variables it needs, and
 * the other formats stay reachable through the API for anyone driving them
 * programmatically.
 */
export function DesignMdSection({
  slug,
  styleName,
  hasSpec,
  initialMarkdown,
}: DesignMdSectionProps) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const [density, setDensity] = useState<Density>("compact");
  const [content, setContent] = useState(initialMarkdown);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2200 });
  const copied = isCopied("design.md", content);

  const load = useCallback(
    async (nextDensity: Density) => {
      if (!hasSpec) return;
      setIsLoading(true);
      setLoadError(false);
      try {
        const response = await fetch(
          `/api/design/${encodeURIComponent(slug)}/design.md?density=${nextDensity}&locale=${locale}`,
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setContent(await response.text());
      } catch {
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [hasSpec, locale, slug],
  );

  // Loading is driven by the control rather than an effect: the only change
  // here is a user action, so there is no state to synchronise.
  function selectDensity(next: Density) {
    setDensity(next);
    void load(next);
    trackEvent("cta_click", { label: `design_md_${next}`, location: "style_detail" });
  }

  function handleDownload() {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}-${density}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackEvent("cta_click", { label: `design_md_download_${density}`, location: "style_detail" });
  }

  return (
    <section id="style-prompts" className="border-b border-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">DESIGN.md</p>
        <h2 className="text-2xl md:text-3xl mb-3">
          {zh ? `${styleName} 的设计文档` : `${styleName} as a design document`}
        </h2>
        <p className="text-muted mb-8 max-w-2xl">
          {hasSpec
            ? zh
              ? "一份文档说明这套风格的配色职责、字体规则、间距与组件构造。复制或下载后直接交给 Claude Code、Cursor、Codex 或 v0。"
              : "One document describes the colour roles, type rules, spacing and component construction behind this style. Copy or download it into Claude Code, Cursor, Codex or v0."
            : zh
              ? "这份 DESIGN.md 还在整理中，完成后会自动出现在这里。"
              : "This DESIGN.md is still being written and will appear here once it lands."}
        </p>

        {hasSpec ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
              <div
                role="group"
                aria-label={zh ? "文档详略" : "Document density"}
                className="flex items-center border border-border"
              >
                {DENSITIES.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    aria-pressed={density === entry.id}
                    onClick={() => selectDensity(entry.id)}
                    className={cn(
                      "px-3 py-1.5 text-xs tracking-wide transition-colors",
                      density === entry.id
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {zh ? entry.zh : entry.en}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => void copy(content, "design.md")}
                  className="inline-flex min-h-8 items-center gap-1.5 text-xs text-foreground transition-colors hover:text-accent"
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
                  className="inline-flex min-h-8 items-center gap-1.5 text-xs text-foreground transition-colors hover:text-accent"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {zh ? "下载" : "Download"}
                </button>
              </div>
            </div>

            <div className="relative mt-4">
              {isLoading ? (
                <div className="absolute inset-0 z-10 flex items-start justify-center bg-background/60 pt-10">
                  <LoaderCircle className="h-4 w-4 animate-spin text-muted" aria-hidden="true" />
                </div>
              ) : null}
              <div
                tabIndex={0}
                className="max-h-[32rem] overflow-auto border border-border bg-foreground/[0.025] p-4 md:p-6"
              >
                <DesignMarkdown markdown={content} />
              </div>
            </div>

            {loadError ? (
              <p role="status" className="mt-2 text-xs text-foreground">
                {zh ? "加载失败，请重试。" : "Failed to load. Try again."}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
              <ConnectAiButton location="style_detail" />
              <LocalizedLink
                href="/developers"
                className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
              >
                {zh ? "查看接入文档" : "Read the setup docs"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </LocalizedLink>
              <span className="text-xs text-muted">
                {zh ? "远程 MCP 端点，无需 token" : "Remote MCP endpoint, no token required"}
              </span>
            </div>
          </>
        ) : null}

        <p role="status" className="sr-only">
          {result?.state === "copied" ? (zh ? "已复制" : "Copied") : ""}
        </p>
      </div>
    </section>
  );
}
