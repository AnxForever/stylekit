"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import {
  STYLE_SCENARIOS,
  getScenarioLabel,
  type StyleScenario,
} from "@/lib/styles/scenarios";

// Radix Select (the previous control) forbade empty-string values, and the
// workspace submit handlers already map this sentinel back to null - keep the
// same FormData contract so nothing changes server-side.
export const NO_STYLE = "__none__";

export type PickerStyle = {
  slug: string;
  name: string;
  nameEn: string;
  colors: { primary: string; secondary: string; accent: string[] };
  scenarios: StyleScenario[];
  keywords: string[];
  isNew?: boolean;
};

// Workspace project types map onto the curated scenario taxonomy; "other"
// intentionally has no mapping (no recommended pre-filter).
const PROJECT_TYPE_SCENARIOS: Record<string, StyleScenario[]> = {
  dashboard: ["dashboard", "admin", "saas"],
  landing: ["marketing"],
  app: ["saas", "dashboard"],
  portfolio: ["portfolio"],
  blog: ["blog", "editorial", "docs"],
};

type Filter = "recommended" | "all" | StyleScenario;

function ColorStrip({ colors, className }: { colors: PickerStyle["colors"]; className?: string }) {
  return (
    <span className={`flex overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <span className="flex-1" style={{ backgroundColor: colors.primary }} />
      <span className="flex-1" style={{ backgroundColor: colors.secondary }} />
      {colors.accent.slice(0, 2).map((color, i) => (
        <span key={i} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

export function StylePicker({
  styles,
  name = "selectedStyleSlug",
  defaultValue = null,
  noneLabel,
  projectType,
  supportedSlugs,
}: {
  styles: PickerStyle[];
  name?: string;
  defaultValue?: string | null;
  noneLabel: string;
  projectType?: string;
  supportedSlugs?: string[];
}) {
  const [selected, setSelected] = useState<string | null>(
    defaultValue && defaultValue !== NO_STYLE ? defaultValue : null
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const recommendedScenarios = projectType ? PROJECT_TYPE_SCENARIOS[projectType] : undefined;
  const [filter, setFilter] = useState<Filter>(recommendedScenarios ? "recommended" : "all");
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedStyle = useMemo(
    () => styles.find((style) => style.slug === selected) ?? null,
    [styles, selected]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return styles.filter((style) => {
      if (q) {
        const haystack = `${style.name} ${style.nameEn} ${style.slug} ${style.keywords.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (q || filter === "all") return true;
      if (filter === "recommended") {
        return recommendedScenarios
          ? style.scenarios.some((scenario) => recommendedScenarios.includes(scenario))
          : true;
      }
      return style.scenarios.includes(filter);
    });
  }, [styles, query, filter, recommendedScenarios]);

  const pick = (slug: string | null) => {
    setSelected(slug);
    setOpen(false);
  };

  return (
    <>
      <input type="hidden" name={name} value={selected ?? NO_STYLE} />
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex w-full items-center gap-3 border border-border bg-background px-3 py-2.5 text-left text-sm outline-none transition-colors focus:border-foreground"
      >
        {selectedStyle ? (
          <>
            <ColorStrip colors={selectedStyle.colors} className="h-5 w-14 shrink-0 border border-border" />
            <span className="truncate">
              {selectedStyle.name} <span className="text-muted">/ {selectedStyle.nameEn}</span>
            </span>
          </>
        ) : (
          <span className="text-muted">{noneLabel} · 浏览 {styles.length} 个风格</span>
        )}
        <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent
          className="max-w-3xl gap-0 p-0"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            searchRef.current?.focus();
          }}
        >
          <div className="border-b border-border p-4 pb-3">
            <ModalTitle className="text-base font-medium">选择风格</ModalTitle>
            <ModalDescription className="mt-0.5 text-xs text-muted">
              按项目场景筛选，或直接搜索名称与关键词。
            </ModalDescription>
            <div className="mt-3 flex items-center gap-2 border border-border px-3">
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索：玻璃拟态、brutalist、暗色…"
                className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="清空搜索">
                  <X className="h-4 w-4 text-muted hover:text-foreground" />
                </button>
              )}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label="场景筛选">
              {recommendedScenarios && (
                <FilterChip active={!query && filter === "recommended"} onClick={() => setFilter("recommended")}>
                  推荐（当前项目类型）
                </FilterChip>
              )}
              <FilterChip active={!query && filter === "all"} onClick={() => setFilter("all")}>
                全部
              </FilterChip>
              {STYLE_SCENARIOS.map((scenario) => (
                <FilterChip
                  key={scenario}
                  active={!query && filter === scenario}
                  onClick={() => setFilter(scenario)}
                >
                  {getScenarioLabel(scenario, "zh")}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="max-h-[55vh] overflow-y-auto p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-muted">
              <span aria-live="polite">{filtered.length} 个风格</span>
              {selected && (
                <button
                  type="button"
                  onClick={() => pick(null)}
                  className="border border-border px-2 py-1 hover:border-foreground hover:text-foreground transition-colors"
                >
                  清除选择（{noneLabel}）
                </button>
              )}
            </div>
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted">没有匹配的风格，换个关键词试试。</p>
            ) : (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {filtered.map((style) => {
                  const isSelected = style.slug === selected;
                  return (
                    <li key={style.slug}>
                      <button
                        type="button"
                        onClick={() => pick(style.slug)}
                        aria-pressed={isSelected}
                        className={`group w-full border text-left transition-colors ${
                          isSelected
                            ? "border-foreground"
                            : "border-border hover:border-foreground/60"
                        }`}
                      >
                        <ColorStrip colors={style.colors} className="h-9 w-full" />
                        <span className="block p-2">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-sm font-medium">{style.name}</span>
                            {style.isNew && (
                              <span className="shrink-0 border border-border px-1 text-[10px] leading-4 text-muted">
                                新收录
                              </span>
                            )}
                            {supportedSlugs?.includes(style.slug) && (
                              <span className="shrink-0 border border-border px-1 text-[10px] leading-4 text-muted">
                                支持生成
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted">{style.nameEn}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-2 py-1 text-xs transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted hover:border-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
