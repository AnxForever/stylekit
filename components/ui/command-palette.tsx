"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, FileText, Palette, Layers, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllStylesMeta } from "@/lib/styles";

interface SearchResult {
  id: string;
  type: "style" | "component" | "page";
  title: string;
  description?: string;
  href: string;
  keywords?: string[];
}

// Component list for search
const componentItems: SearchResult[] = [
  { id: "button", type: "component", title: "Button", description: "按钮组件", href: "/components#button", keywords: ["按钮", "button", "点击"] },
  { id: "card", type: "component", title: "Card", description: "卡片组件", href: "/components#card", keywords: ["卡片", "card", "容器"] },
  { id: "input", type: "component", title: "Input", description: "输入框组件", href: "/components#input", keywords: ["输入", "input", "表单"] },
  { id: "dialog", type: "component", title: "Dialog", description: "对话框组件", href: "/components#dialog", keywords: ["对话框", "modal", "弹窗"] },
  { id: "tooltip", type: "component", title: "Tooltip", description: "工具提示组件", href: "/components#tooltip", keywords: ["提示", "tooltip"] },
  { id: "tabs", type: "component", title: "Tabs", description: "标签页组件", href: "/components#tabs", keywords: ["标签", "tabs", "切换"] },
  { id: "accordion", type: "component", title: "Accordion", description: "手风琴组件", href: "/components#accordion", keywords: ["折叠", "accordion"] },
  { id: "drawer", type: "component", title: "Drawer", description: "抽屉组件", href: "/components#drawer", keywords: ["抽屉", "drawer", "侧边"] },
  { id: "popover", type: "component", title: "Popover", description: "弹出框组件", href: "/components#popover", keywords: ["弹出", "popover"] },
  { id: "toast", type: "component", title: "Toast", description: "消息提示组件", href: "/components#toast", keywords: ["消息", "toast", "通知"] },
];

// Page items for search
const pageItems: SearchResult[] = [
  { id: "home", type: "page", title: "首页", description: "StyleKit 首页", href: "/", keywords: ["home", "首页"] },
  { id: "styles", type: "page", title: "风格目录", description: "浏览所有设计风格", href: "/styles", keywords: ["风格", "styles", "目录"] },
  { id: "components", type: "page", title: "组件库", description: "查看所有 UI 组件", href: "/components", keywords: ["组件", "components", "UI"] },
  { id: "templates", type: "page", title: "页面模板", description: "完整页面模板", href: "/templates", keywords: ["模板", "templates", "页面"] },
  { id: "compare", type: "page", title: "风格对比", description: "对比不同风格的组件", href: "/compare", keywords: ["对比", "compare", "比较"] },
  { id: "about", type: "page", title: "关于", description: "了解 StyleKit", href: "/about", keywords: ["关于", "about"] },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    [styleItems]
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
      { type: "style", label: "设计风格", items: [] },
      { type: "component", label: "组件", items: [] },
      { type: "page", label: "页面", items: [] },
    ];

    filteredResults.forEach((item) => {
      const group = groups.find((g) => g.type === item.type);
      if (group) {
        group.items.push(item);
      }
    });

    return groups.filter((g) => g.items.length > 0);
  }, [filteredResults]);

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
              placeholder="搜索风格、组件、页面..."
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
                没有找到匹配的结果
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
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">↑↓</kbd>
                <span>导航</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">↵</kbd>
                <span>打开</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px]">esc</kbd>
                <span>关闭</span>
              </span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
