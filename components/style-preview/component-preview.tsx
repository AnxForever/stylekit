"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { CodeBlock } from "./code-block";
import type { ComponentTemplate } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";
import { sanitizePreviewHtml } from "@/lib/security/sanitize-html";

interface ComponentPreviewProps {
  components: Record<string, ComponentTemplate>;
  defaultShowCode?: boolean;
}

export function ComponentPreview({
  components,
  defaultShowCode = true,
}: ComponentPreviewProps) {
  const componentKeys = Object.keys(components);
  const [activeTab, setActiveTab] = useState(componentKeys[0]);
  const [showCode, setShowCode] = useState(defaultShowCode);
  const activeComponent = components[activeTab];
  const { t, locale } = useI18n();
  const touchStartX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) < 50) return;
      const currentIndex = componentKeys.indexOf(activeTab);
      if (dx < 0 && currentIndex < componentKeys.length - 1) {
        setActiveTab(componentKeys[currentIndex + 1]);
      } else if (dx > 0 && currentIndex > 0) {
        setActiveTab(componentKeys[currentIndex - 1]);
      }
    },
    [activeTab, componentKeys]
  );

  // Tab labels with i18n support
  const getTabLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
      button: t("preview.tab.button"),
      card: t("preview.tab.card"),
      input: t("preview.tab.input"),
      nav: t("preview.tab.nav"),
      hero: "Hero",
      footer: t("preview.tab.footer"),
    };
    return labelMap[key] || components[key].name;
  };

  const previewHtml = useMemo(() => {
    if (!activeComponent) return "";
    return sanitizePreviewHtml(
      activeComponent.preview || generatePreviewHTML(activeComponent.code)
    );
  }, [activeComponent]);
  if (!activeComponent) return null;

  return (
    <div className="border border-border">
      {/* Tab Bar */}
      <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
        {componentKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3 text-sm tracking-wide whitespace-nowrap transition-colors ${
              activeTab === key
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            {getTabLabel(key)}
          </button>
        ))}
      </div>

      {/* Component Info */}
      <div className="px-4 md:px-6 py-4 border-b border-border flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h4 className="font-serif text-lg">{activeComponent.name}</h4>
          <p className="text-sm text-muted mt-1">
            {activeComponent.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCode((current) => !current)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs tracking-wide border border-border text-muted hover:text-foreground hover:border-foreground transition-colors whitespace-nowrap"
        >
          {showCode
            ? (locale === "zh" ? "收起代码" : "Hide Code")
            : (locale === "zh" ? "查看代码" : "Show Code")}
        </button>
      </div>

      {/* Preview Area */}
      <div
        className="p-6 md:p-10 bg-white dark:bg-zinc-900 flex items-start justify-center min-h-[200px] overflow-x-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 
          Create a containing block for position: fixed preview snippets
          (common in nav examples). Without this, fixed elements attach to the
          viewport and the preview pane can appear blank.
        */}
        <div className="relative isolate w-full min-h-[200px] transform-gpu">
          <div
            dangerouslySetInnerHTML={{
              __html: previewHtml,
            }}
          />
        </div>
      </div>

      {/* Code */}
      {showCode && <CodeBlock code={activeComponent.code} />}
    </div>
  );
}

// Non-void HTML elements that must have explicit closing tags.
// In JSX <div ... /> is valid, but browsers treat it as an unclosed <div> tag,
// swallowing all subsequent siblings into it and breaking layout completely.
const BLOCK_ELEMENTS =
  "div|span|p|h[1-6]|section|article|nav|aside|header|footer|main|ul|ol|li|button|label|blockquote|pre|code|form|fieldset|figure|figcaption|details|summary|a|strong|em|time|address";

// 从 JSX 代码生成可预览的 HTML
function generatePreviewHTML(code: string): string {
  return code
    .replace(/className=/g, "class=")
    .replace(/\{`([^`]*)`\}/g, "$1")
    // Handle both single-line and multi-line JSX comments
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    // Convert self-closing non-void elements: <div ... /> → <div ...></div>
    .replace(
      new RegExp(`<(${BLOCK_ELEMENTS})((?:[^>"]+?|"[^"]*"|'[^']*')*?)\\s*\\/>`, "g"),
      "<$1$2></$1>"
    )
    .trim();
}
