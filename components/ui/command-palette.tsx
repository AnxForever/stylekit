"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, FileText, Palette, Layers, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { localizeHref } from "@/lib/i18n/routing";

interface SearchResult {
  id: string;
  type: "style" | "component" | "page";
  title: string;
  description?: string;
  href: string;
  keywords?: string[];
}

export function CommandPalette() {
  // Default to open since component is only mounted after Cmd+K activation
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { t, locale } = useI18n();

  // Component list hidden temporarily to keep only polished entry points
  const componentItems: SearchResult[] = React.useMemo(() => [], []);

  // Page items for search (i18n aware)
  const pageItems: SearchResult[] = React.useMemo(() => [
    { id: "styles", type: "page", title: t("search.page.styles"), description: t("search.page.stylesDesc"), href: "/styles", keywords: ["styles", "catalog"] },
    { id: "component-patterns", type: "page", title: t("search.page.componentPatterns"), description: t("search.page.componentPatternsDesc"), href: "/component-patterns", keywords: ["components", "patterns", "breadcrumb", "accordion", "tabs", "pagination"] },
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
    () => [...styleItems, ...componentItems, ...pageItems],
    [styleItems, componentItems, pageItems]
  );

  // Filter results based on query
  const filteredResults = React.useMemo(() => {
    if (!query.trim()) {
      return allItems;
    }

    const lowerQuery = query.toLowerCase();
    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchDescription = item.description?.toLowerCase().includes(lowerQuery);
      const matchKeywords = item.keywords?.some((kw) =>
        kw.toLowerCase().includes(lowerQuery)
      );
      return matchTitle || matchDescription || matchKeywords;
    });
  }, [query, allItems]);

  // Group results by type
  const groupedResults = React.useMemo(() => {
    const groups: { type: string; label: string; items: SearchResult[] }[] = [
      { type: "style", label: t("search.group.styles"), items: [] },
      { type: "component", label: t("search.group.components"), items: [] },
      { type: "page", label: t("search.group.pages"), items: [] },
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
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (flatResults[selectedIndex]) {
          const trimmedQuery = query.trim();
          if (trimmedQuery) {
            trackEvent("search", {
              query_present: true,
              query_length: trimmedQuery.length,
              results_count: filteredResults.length,
            });
          }
          router.push(localizeHref(flatResults[selectedIndex].href, locale));
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
      case "component":
        return <Layers className="w-4 h-4" />;
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
          className="fixed top-[20%] left-0 right-0 mx-auto z-50 w-full max-w-lg bg-background shadow-surface-lg rounded-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
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

          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 px-3 py-4 bg-transparent text-sm outline-none placeholder:text-muted"
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
          <div className="max-h-[400px] overflow-y-auto p-2">
            {groupedResults.length === 0 ? (
              <div className="py-8 text-center text-muted text-sm">
                {t("common.noResults")}
              </div>
            ) : (
              groupedResults.map((group) => (
                <div key={group.type} className="mb-4 last:mb-0">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.items.map((item) => {
                    const globalIndex = flatResults.indexOf(item);
                    const isSelected = globalIndex === selectedIndex;
                    return (
                      <button
                        key={item.id}
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
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <span className={isSelected ? "text-accent-foreground" : "text-muted"}>
                          {getIcon(item.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className={`text-xs truncate ${isSelected ? "text-accent-foreground/70" : "text-muted"}`}>
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
          <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted">
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
