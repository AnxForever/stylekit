"use client";

import { useI18n } from "@/lib/i18n/context";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

interface StyleSwitcherProps {
  styles: Array<{
    slug: string;
    name: string;
    nameEn: string;
    category: string;
  }>;
  value: string;
  onChange: (slug: string) => void;
}

export function StyleSwitcher({ styles, value, onChange }: StyleSwitcherProps) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = styles.find((s) => s.slug === value);
  const displayName = selected
    ? locale === "zh" ? selected.name : selected.nameEn
    : value;

  const filtered = useMemo(() => {
    if (!search) return styles;
    const q = search.toLowerCase();
    return styles.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.slug.includes(q)
    );
  }, [styles, search]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          setSearch("");
        }}
        className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:border-foreground/50 transition-colors bg-background min-w-[180px]"
      >
        <span className="flex-1 text-left truncate">{displayName}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 max-h-80 bg-background border border-border shadow-lg z-50 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-2 border-b border-border">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("playground.searchStyles")}
              className="w-full px-2 py-1.5 text-sm border border-border rounded bg-transparent focus:outline-none focus:border-foreground/50"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-sm text-muted text-center">
                {t("playground.noStylesFound")}
              </p>
            )}
            {filtered.map((style) => {
              const isActive = style.slug === value;
              const label = locale === "zh" ? style.name : style.nameEn;
              return (
                <button
                  key={style.slug}
                  onClick={() => {
                    onChange(style.slug);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                    isActive
                      ? "bg-foreground text-background"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex-1 truncate">{label}</span>
                  <span className="text-xs text-muted tabular-nums">{style.slug}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
