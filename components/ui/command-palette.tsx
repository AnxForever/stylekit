"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, FileText, Palette, Wrench, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { localizeHref } from "@/lib/i18n/routing";
import { getToolSearchItems } from "@/lib/search/tool-pages";

interface SearchResult {
  id: string;
  type: "style" | "tool" | "page";
  title: string;
  description?: string;
  href: string;
  keywords?: string[];
}

function searchScore(item: SearchResult, query: string): number {
  const title = item.title.toLowerCase();
  const keywords = item.keywords?.map((keyword) => keyword.toLowerCase()) ?? [];
  if (title === query || keywords.includes(query)) return 4;
  if (title.includes(query)) return 3;
  if (keywords.some((keyword) => keyword.includes(query))) return 2;
  return item.description?.toLowerCase().includes(query) ? 1 : 0;
}

export function CommandPalette() {
  // Default to open since component is only mounted after Cmd+K activation
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const resultsId = React.useId();
  const { t, locale } = useI18n();

  const toolItems = React.useMemo(() => getToolSearchItems(locale), [locale]);

  // Page items for search (i18n aware)
  const pageItems: SearchResult[] = React.useMemo(() => [
    { id: "styles", type: "page", title: t("search.page.styles"), description: t("search.page.stylesDesc"), href: "/styles", keywords: ["styles", "catalog"] },
    { id: "component-patterns", type: "page", title: t("search.page.componentPatterns"), description: t("search.page.componentPatternsDesc"), href: "/component-patterns", keywords: ["components", "patterns", "breadcrumb", "accordion", "tabs", "pagination"] },
    { id: "mobile-design", type: "page", title: t("search.page.mobileDesign"), description: t("search.page.mobileDesignDesc"), href: "/mobile", keywords: ["mobile", "responsive", "touch", "mobile ui", "移动端", "手机界面", "底部导航", "组件库", "chunui", "swiftui", "ios", "shipswift", "vant"] },
    { id: "templates", type: "page", title: t("search.page.templates"), description: t("search.page.templatesDesc"), href: "/templates", keywords: ["templates", "pages"] },
  ], [t]);

  // Get all styles and convert to search results
  const styleItems: SearchResult[] = React.useMemo(() => {
    const styles = getAllStylesMeta();
    return styles.map((style) => ({
      id: style.slug,
      type: "style" as const,
      title: style.name,
      description: style.nameEn,
      href: `/styles/${style.slug}`,
      keywords: style.keywords,
    }));
  }, []);

  // Combine all searchable items
  const allItems = React.useMemo(
    () => [...toolItems, ...pageItems, ...styleItems],
    [styleItems, toolItems, pageItems]
  );

  // Filter results based on query
  const filteredResults = React.useMemo(() => {
    if (!query.trim()) {
      return allItems;
    }

    const lowerQuery = query.trim().toLowerCase();
    return allItems
      .map((item) => ({ item, score: searchScore(item, lowerQuery) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }, [query, allItems]);

  // Group results by type
  const groupedResults = React.useMemo(() => {
    const groups: { type: string; label: string; items: SearchResult[] }[] = [
      { type: "tool", label: t("search.group.tools"), items: [] },
      { type: "page", label: t("search.group.pages"), items: [] },
      { type: "style", label: t("search.group.styles"), items: [] },
    ];

    filteredResults.forEach((item) => {
      const group = groups.find((g) => g.type === item.type);
      if (group) {
        group.items.push(item);
      }
    });

    return groups.filter((g) => g.items.length > 0);
  }, [filteredResults, t]);

  // Flatten for keyboard navigation
  const flatResults = React.useMemo(
    () => groupedResults.flatMap((g) => g.items),
    [groupedResults]
  );
  const activeIndex = Math.max(0, Math.min(selectedIndex, flatResults.length - 1));
  const activeResultId = flatResults.length ? `${resultsId}-${activeIndex}` : undefined;

  React.useEffect(() => {
    if (open && activeResultId) {
      resultsRef.current?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView?.({ block: "nearest" });
    }
  }, [open, activeResultId, query]);

  // Global keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Reset transient state alongside re-opening so the
        // previous query / selection don't bleed into the new session.
        setQuery("");
        setSelectedIndex(0);
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click-outside to close is handled by Radix Dialog (the Overlay
  // triggers onOpenChange(false) on outside pointerdown). No custom
  // global listener needed — and any added one would need cleanup.

  // Keyboard navigation within dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(Math.min(activeIndex + 1, Math.max(0, flatResults.length - 1)));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(Math.max(activeIndex - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (flatResults[activeIndex]) {
          const trimmedQuery = query.trim();
          if (trimmedQuery) {
            trackEvent("search", {
              query_present: true,
              query_length: trimmedQuery.length,
              results_count: filteredResults.length,
            });
          }
          router.push(localizeHref(flatResults[activeIndex].href, locale));
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "style":
        return <Palette className="w-4 h-4" />;
      case "tool":
        return <Wrench className="w-4 h-4" />;
      case "page":
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed top-[10dvh] sm:top-[20dvh] left-0 right-0 mx-auto z-50 w-[calc(100%-1rem)] max-w-lg bg-background shadow-surface-lg rounded-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onKeyDown={handleKeyDown}
          onOpenAutoFocus={(e) => {
            // Take over focus management so we can target the search
            // input directly (Radix's default would focus the first
            // tabbable element, which is the close-X).
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <Dialog.Title className="sr-only">
            {locale === "zh" ? "搜索 StyleKit" : "Search StyleKit"}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {t("search.description")}
          </Dialog.Description>

          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label={t("search.placeholder")}
              aria-expanded={open}
              aria-controls={resultsId}
              aria-activedescendant={activeResultId}
              aria-autocomplete="list"
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="min-w-0 flex-1 px-3 py-4 bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
              aria-label={locale === "zh" ? "关闭搜索" : "Close search"}
            >
              <X className="w-4 h-4 text-muted" aria-hidden="true" />
            </button>
          </div>

          {/* Results */}
          <div
            ref={resultsRef}
            id={resultsId}
            role="listbox"
            aria-label={t("search.results")}
            className="max-h-[min(400px,55dvh)] overflow-y-auto p-2"
          >
            {groupedResults.length === 0 ? (
              <div role="status" className="py-8 text-center text-muted text-sm">
                {t("common.noResults")}
              </div>
            ) : (
              groupedResults.map((group) => (
                <div key={group.type} role="group" aria-labelledby={`${resultsId}-${group.type}`} className="mb-4 last:mb-0">
                  <div id={`${resultsId}-${group.type}`} className="px-2 py-1.5 text-xs font-medium text-muted uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.items.map((item) => {
                    const globalIndex = flatResults.indexOf(item);
                    const isSelected = globalIndex === activeIndex;
                    return (
                      <button
                        key={item.id}
                        id={`${resultsId}-${globalIndex}`}
                        type="button"
                        role="option"
                        tabIndex={-1}
                        aria-selected={isSelected}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          const trimmedQuery = query.trim();
                          if (trimmedQuery) {
                            trackEvent("search", {
                              query_present: true,
                              query_length: trimmedQuery.length,
                              results_count: filteredResults.length,
                            });
                          }
                          router.push(localizeHref(item.href, locale));
                          setOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                          isSelected
                            ? "bg-foreground text-background"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <span className={isSelected ? "text-background" : "text-muted"}>
                          {getIcon(item.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className={`text-xs truncate ${isSelected ? "text-background/80" : "text-foreground/70"}`}>
                              {item.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-foreground/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">Up/Down</kbd>
                <span>{t("search.navigate")}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">Enter</kbd>
                <span>{t("search.open")}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">esc</kbd>
                <span>{t("search.close")}</span>
              </span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
