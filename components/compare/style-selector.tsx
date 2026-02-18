"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { getAllStylesMeta, type StyleMeta } from "@/lib/styles/meta";
import { useI18n } from "@/lib/i18n/context";

interface StyleSelectorProps {
  value: string | null;
  onChange: (slug: string | null) => void;
  label: string;
  excludeSlugs?: string[];
}

export function StyleSelector({
  value,
  onChange,
  label,
  excludeSlugs = [],
}: StyleSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useI18n();

  const allStyles = getAllStylesMeta();
  const filtered = allStyles.filter((s) => {
    if (excludeSlugs.includes(s.slug)) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.nameEn.toLowerCase().includes(q) ||
      s.slug.includes(q) ||
      s.tags.some((t) => t.includes(q))
    );
  });

  const selected = value
    ? allStyles.find((s) => s.slug === value) ?? null
    : null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const categoryColors: Record<string, string> = {
    modern: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    retro: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    minimal:
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    expressive:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setSearch("");
          setHighlightedIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
            onChange(filtered[highlightedIndex].slug);
            setOpen(false);
            setSearch("");
            setHighlightedIndex(-1);
          }
          break;
      }
    },
    [open, filtered, highlightedIndex, onChange]
  );

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <label className="block text-xs font-medium text-muted mb-1.5">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 border border-border bg-background text-left text-sm hover:border-foreground/30 transition-colors"
      >
        {selected ? (
          <span className="flex items-center gap-2 min-w-0">
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-border"
              style={{ backgroundColor: selected.colors.primary }}
            />
            <span className="truncate">
              {locale === "zh" ? selected.name : selected.nameEn}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${categoryColors[selected.category] ?? ""}`}
            >
              {selected.category}
            </span>
          </span>
        ) : (
          <span className="text-muted">--</span>
        )}
        <div className="flex items-center gap-1 shrink-0">
          {value && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="p-0.5 hover:bg-muted/20 rounded"
            >
              <X className="w-3.5 h-3.5 text-muted" />
            </span>
          )}
          <ChevronDown className="w-4 h-4 text-muted" />
        </div>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-background border border-border shadow-lg max-h-72 overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-muted/10">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(-1);
                }}
                placeholder={t("compare.searchPlaceholder")}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-56">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-muted text-center">
                {t("compare.noStylesFound")}
              </div>
            ) : (
              filtered.map((style, idx) => (
                <StyleOption
                  key={style.slug}
                  style={style}
                  selected={style.slug === value}
                  highlighted={idx === highlightedIndex}
                  locale={locale}
                  categoryColors={categoryColors}
                  onClick={() => {
                    onChange(style.slug);
                    setOpen(false);
                    setSearch("");
                    setHighlightedIndex(-1);
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StyleOption({
  style,
  selected,
  highlighted,
  locale,
  categoryColors,
  onClick,
}: {
  style: StyleMeta;
  selected: boolean;
  highlighted: boolean;
  locale: string;
  categoryColors: Record<string, string>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted/10 transition-colors ${
        selected ? "bg-muted/20 font-medium" : ""
      }${highlighted ? " bg-muted/15 outline-none" : ""}`}
    >
      <span
        className="w-3 h-3 rounded-full shrink-0 border border-border"
        style={{ backgroundColor: style.colors.primary }}
      />
      <span className="truncate">
        {locale === "zh" ? style.name : style.nameEn}
      </span>
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ml-auto ${categoryColors[style.category] ?? ""}`}
      >
        {style.category}
      </span>
    </button>
  );
}
