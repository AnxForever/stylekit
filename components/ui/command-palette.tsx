"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, FileText, Palette, Layers, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();

  // Component list for search (i18n aware)
  const componentItems: SearchResult[] = React.useMemo(() => [
    { id: "button", type: "component", title: "Button", description: t("search.comp.button"), href: "/components#button", keywords: ["button", "click", "cta"] },
    { id: "card", type: "component", title: "Card", description: t("search.comp.card"), href: "/components#card", keywords: ["card", "container", "panel"] },
    { id: "input", type: "component", title: "Input", description: t("search.comp.input"), href: "/components#input", keywords: ["input", "field", "form"] },
    { id: "dialog", type: "component", title: "Dialog", description: t("search.comp.dialog"), href: "/components#dialog", keywords: ["dialog", "modal", "overlay"] },
    { id: "tooltip", type: "component", title: "Tooltip", description: t("search.comp.tooltip"), href: "/components#tooltip", keywords: ["tooltip", "hint"] },
    { id: "tabs", type: "component", title: "Tabs", description: t("search.comp.tabs"), href: "/components#tabs", keywords: ["tabs", "switch"] },
    { id: "accordion", type: "component", title: "Accordion", description: t("search.comp.accordion"), href: "/components#accordion", keywords: ["accordion", "collapse"] },
    { id: "drawer", type: "component", title: "Drawer", description: t("search.comp.drawer"), href: "/components#drawer", keywords: ["drawer", "sidebar", "panel"] },
    { id: "popover", type: "component", title: "Popover", description: t("search.comp.popover"), href: "/components#popover", keywords: ["popover", "floating"] },
    { id: "toast", type: "component", title: "Toast", description: t("search.comp.toast"), href: "/components#toast", keywords: ["toast", "notification"] },
  ], [t]);

  // Page items for search (i18n aware)
  const pageItems: SearchResult[] = React.useMemo(() => [
    { id: "home", type: "page", title: t("search.page.home"), description: t("search.page.homeDesc"), href: "/", keywords: ["home", "index"] },
    { id: "styles", type: "page", title: t("search.page.styles"), description: t("search.page.stylesDesc"), href: "/styles", keywords: ["styles", "catalog"] },
    { id: "components", type: "page", title: t("search.page.components"), description: t("search.page.componentsDesc"), href: "/components", keywords: ["components", "ui"] },
    { id: "templates", type: "page", title: t("search.page.templates"), description: t("search.page.templatesDesc"), href: "/templates", keywords: ["templates", "pages"] },
    { id: "generate", type: "page", title: t("nav.generator"), description: "Generate frontend with selected style and layout.", href: "/generate", keywords: ["generate", "builder", "frontend"] },
    { id: "create-style", type: "page", title: t("nav.createStyle"), description: "Import style-extractor output or create custom style.", href: "/create-style", keywords: ["create", "import", "extractor", "style"] },
    { id: "about", type: "page", title: t("search.page.about"), description: t("search.page.aboutDesc"), href: "/about", keywords: ["about", "project"] },
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
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset on open
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Focus input after dialog animation
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

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
          router.push(flatResults[selectedIndex].href);
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
          className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 bg-background border border-border shadow-2xl rounded-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          onKeyDown={handleKeyDown}
        >
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
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
            >
              <X className="w-4 h-4 text-muted" />
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
                          router.push(item.href);
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
