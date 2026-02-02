"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { renderStyleComponent, componentLabels, type ComponentType } from "@/lib/style-components";
import { ChevronDown } from "lucide-react";

export function StylePreviewSwitcher() {
  const styles = getAllStylesMeta();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();

  const selectedStyle = styles.find((s) => s.slug === selectedSlug);

  return (
    <div className="border border-border bg-zinc-50 dark:bg-zinc-900/50">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted mb-1">
            {locale === "zh" ? "风格预览" : "Style Preview"}
          </p>
          <p className="text-sm text-muted">
            {locale === "zh"
              ? "查看这些组件在不同风格下的样式"
              : "See how these components look in different styles"}
          </p>
        </div>

        {/* Style Selector */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-background hover:border-foreground/50 transition-colors text-sm min-w-[180px]"
          >
            <span>
              {selectedStyle
                ? selectedStyle.name
                : locale === "zh"
                  ? "选择风格..."
                  : "Select style..."}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted transition-transform ml-auto ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 top-full right-0 mt-1 border border-border bg-background shadow-lg min-w-[200px]">
              {styles.map((style) => (
                <button
                  key={style.slug}
                  onClick={() => {
                    setSelectedSlug(style.slug);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 ${
                    selectedSlug === style.slug
                      ? "bg-zinc-100 dark:bg-zinc-800"
                      : ""
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: style.colors.primary }}
                  />
                  {style.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Content */}
      {selectedSlug ? (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(componentLabels) as ComponentType[]).map((comp) => (
              <div key={comp}>
                <p className="text-xs text-muted mb-3">{componentLabels[comp]}</p>
                <div className="p-4 bg-background rounded-lg border border-border flex items-center justify-center min-h-[120px]">
                  {renderStyleComponent(selectedSlug, comp)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Link
              href={`/styles/${selectedSlug}`}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {locale === "zh"
                ? `查看 ${selectedStyle?.name} 完整文档`
                : `View ${selectedStyle?.name} documentation`}{" "}
              →
            </Link>
            <Link
              href={`/compare?left=${selectedSlug}&right=${styles[0]?.slug !== selectedSlug ? styles[0]?.slug : styles[1]?.slug}`}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {locale === "zh" ? "对比其他风格" : "Compare with others"} →
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-muted">
          {locale === "zh"
            ? "选择一个风格查看组件预览"
            : "Select a style to preview components"}
        </div>
      )}
    </div>
  );
}
