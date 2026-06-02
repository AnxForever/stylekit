"use client";

import { useState, useMemo } from "react";
import { ChevronDown, X, ArrowLeftRight } from "lucide-react";
import { stylesMeta } from "@/lib/styles/meta";
import { useI18n } from "@/lib/i18n/context";

interface StyleComparisonProps {
  baseStyleSlug: string;
  onClose: () => void;
}

export function StyleComparison({ baseStyleSlug, onClose }: StyleComparisonProps) {
  const { locale } = useI18n();
  const [compareSlug, setCompareSlug] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const styles = useMemo(() => {
    return stylesMeta
      .filter((s) => s.styleType === "visual" && s.slug !== baseStyleSlug)
      .slice(0, 30);
  }, [baseStyleSlug]);

  const baseStyle = stylesMeta.find((s) => s.slug === baseStyleSlug);
  const compareStyle = stylesMeta.find((s) => s.slug === compareSlug);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            {locale === "zh" ? "风格对比" : "Style Comparison"}
          </h2>
          
          {/* Base style badge */}
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-sm">
            <span className="text-muted">
              {locale === "zh" ? "基础:" : "Base:"}
            </span>
            <span className="font-medium">{baseStyle?.name || baseStyleSlug}</span>
          </div>

          {/* VS */}
          <span className="text-muted text-xs">vs</span>

          {/* Compare style selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
            >
              {compareStyle ? (
                <span className="font-medium">{compareStyle.name}</span>
              ) : (
                <span className="text-muted">
                  {locale === "zh" ? "选择对比风格..." : "Select style..."}
                </span>
              )}
              <ChevronDown className="w-3 h-3" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 max-h-64 overflow-auto bg-background border border-border shadow-lg z-10">
                {styles.map((style) => (
                  <button
                    key={style.slug}
                    onClick={() => {
                      setCompareSlug(style.slug);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                      compareSlug === style.slug ? "bg-zinc-100 dark:bg-zinc-800" : ""
                    }`}
                  >
                    <span className="font-medium">{style.name}</span>
                    <span className="text-muted ml-2">{style.nameEn}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-muted hover:text-foreground transition-colors"
          aria-label="Close comparison"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Comparison view */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Base style */}
        <div className="flex-1 flex flex-col border-r border-border">
          <div className="px-3 py-2 border-b border-border bg-zinc-50 dark:bg-zinc-900">
            <span className="text-xs uppercase tracking-wider font-medium">
              {baseStyle?.name || baseStyleSlug}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`/styles/${baseStyleSlug}/showcase`}
              title={`${baseStyle?.nameEn || baseStyleSlug} preview`}
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Right: Compare style */}
        <div className="flex-1 flex flex-col">
          <div className="px-3 py-2 border-b border-border bg-zinc-50 dark:bg-zinc-900">
            <span className="text-xs uppercase tracking-wider font-medium">
              {compareStyle?.name || (locale === "zh" ? "选择对比风格" : "Select comparison style")}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            {compareSlug ? (
              <iframe
                src={`/styles/${compareSlug}/showcase`}
                title={`${compareStyle?.nameEn || compareSlug} preview`}
                className="w-full h-full border-0"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-muted text-sm">
                <div className="text-center">
                  <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>
                    {locale === "zh"
                      ? "从上方选择一个风格进行对比"
                      : "Select a style above to compare"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
