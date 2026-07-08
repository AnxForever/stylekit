"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { StyleColorEntry } from "@/lib/styles/colors";

interface ColorsExplorerProps {
  entries: StyleColorEntry[];
  swatchCount: number;
}

function Swatch({
  hex,
  label,
  onCopy,
  copied,
}: {
  hex: string;
  label: string;
  onCopy: (hex: string) => void;
  copied: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(hex)}
      className="group/swatch flex flex-col items-stretch text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
      title={`${label} · ${hex}`}
      aria-label={`Copy ${hex}`}
    >
      <span
        className="aspect-square w-full border border-border transition-transform group-hover/swatch:scale-[1.03]"
        style={{ backgroundColor: hex }}
      />
      <span className="mt-1 font-mono text-[11px] text-muted group-hover/swatch:text-foreground">
        {copied ? "✓" : hex}
      </span>
    </button>
  );
}

export function ColorsExplorer({ entries, swatchCount }: ColorsExplorerProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) => {
      if (entry.nameEn.toLowerCase().includes(q)) return true;
      if (entry.name.toLowerCase().includes(q)) return true;
      if (entry.category.toLowerCase().includes(q)) return true;
      return entry.swatches.some((hex) => hex.includes(q));
    });
  }, [entries, query]);

  const handleCopy = (hex: string) => {
    void navigator.clipboard?.writeText(hex).then(() => {
      setCopied(hex);
      window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted">
          {isZh ? "色彩浏览器" : "Color Explorer"}
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">
          {isZh
            ? `${entries.length} 种设计风格的配色与色值`
            : `Color Palettes & Hex Codes from ${entries.length} Design Styles`}
        </h1>
        <p className="mt-4 text-muted">
          {isZh
            ? `浏览、搜索并一键复制 ${swatchCount}+ 个精选色值——每个 hex 都标注了它所属的设计风格。搜索色号（如 #667eea）、风格名或分类即可定位。`
            : `Browse, search, and copy ${swatchCount}+ curated hex codes — each one tagged with the design style it belongs to. Search by hex (e.g. #667eea), style name, or category.`}
        </p>
      </header>

      <div className="sticky top-0 z-10 mb-8 -mx-4 bg-background/90 px-4 py-3 backdrop-blur">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            isZh
              ? "搜索色号 / 风格 / 分类，如 #667eea、bauhaus、复古"
              : "Search hex / style / category — e.g. #667eea, bauhaus, retro"
          }
          className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
          aria-label={isZh ? "搜索颜色" : "Search colors"}
        />
        <p className="mt-2 text-xs text-muted">
          {isZh
            ? `${filtered.length} / ${entries.length} 个风格`
            : `${filtered.length} / ${entries.length} styles`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">
          {isZh ? "没有匹配的颜色或风格。" : "No matching colors or styles."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <section
              key={entry.slug}
              className="border border-border p-4"
              aria-label={`${entry.nameEn} palette`}
            >
              <div className="mb-3 flex items-baseline justify-between gap-2">
                <LocalizedLink
                  href={`/styles/${entry.slug}`}
                  className="font-semibold hover:underline"
                >
                  {isZh ? entry.name : entry.nameEn}
                </LocalizedLink>
                <span className="shrink-0 text-xs text-muted">
                  {entry.category}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {entry.swatches.map((hex, index) => (
                  <Swatch
                    key={`${entry.slug}-${hex}-${index}`}
                    hex={hex}
                    label={isZh ? entry.name : entry.nameEn}
                    onCopy={handleCopy}
                    copied={copied === hex}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
