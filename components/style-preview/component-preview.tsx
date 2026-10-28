"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { CodeBlock } from "./code-block";
import type { ComponentTemplate } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";
import { sanitizePreviewHtml } from "@/lib/security/sanitize-html";
import { generatePreviewHTML } from "@/lib/style-preview/preview-html";
import { componentCodeWithAssets } from "@/lib/style-preview/motion-css";
import type { PreviewAssets } from "@/lib/style-preview/preview-assets";
import { ExtractedComponentPreview } from "./extracted-component-preview";
import { RecipeWorkbench } from "./recipe-workbench";
import { ComponentUsageGuide } from "./component-usage-guide";
import { isWorkbenchRecipe } from "@/lib/recipes/workbench";
import type { ComponentRecipe } from "@/lib/recipes/types";

interface ComponentPreviewProps {
  components: Record<string, ComponentTemplate>;
  defaultShowCode?: boolean;
  styleSlug?: string;
  previewBackground?: string;
  previewForeground?: string;
  previewAssets?: PreviewAssets;
  recipes?: Record<string, ComponentRecipe>;
}

export function ComponentPreview({
  components,
  defaultShowCode = true,
  styleSlug,
  previewBackground,
  previewForeground,
  previewAssets,
  recipes,
}: ComponentPreviewProps) {
  const componentKeys = Object.keys(components);
  const [activeTab, setActiveTab] = useState(componentKeys[0]);
  const [showCode, setShowCode] = useState(defaultShowCode);
  const [view, setView] = useState<"template" | "customize">("template");
  const activeComponent = components[activeTab];
  const activeRecipe = recipes?.[activeTab];
  const canCustomize = activeRecipe && isWorkbenchRecipe(activeRecipe);
  const customizing = view === "customize" && canCustomize;
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
            type="button"
            aria-pressed={activeTab === key}
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
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
          {canCustomize && (
            <fieldset className="inline-flex border border-border p-0.5">
              <legend className="sr-only">{locale === "zh" ? "组件视图" : "Component view"}</legend>
              {(["template", "customize"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={view === mode}
                  onClick={() => setView(mode)}
                  className={`px-3 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${view === mode ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
                >
                  {mode === "template"
                    ? (locale === "zh" ? "模板示例" : "Template")
                    : (locale === "zh" ? "调整组件" : "Customize")}
                </button>
              ))}
            </fieldset>
          )}
          {!customizing && (
            <button
              type="button"
              onClick={() => setShowCode((current) => !current)}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs tracking-wide border border-border text-muted hover:text-foreground hover:border-foreground transition-colors whitespace-nowrap"
            >
              {showCode
                ? (locale === "zh" ? "收起代码" : "Hide Code")
                : (locale === "zh" ? "查看代码" : "Show Code")}
            </button>
          )}
      </div>

      {customizing && activeRecipe ? (
        <RecipeWorkbench
          key={`${styleSlug ?? "style"}:${activeTab}`}
          recipe={activeRecipe}
          styleSlug={styleSlug}
          previewAssets={previewAssets}
        />
      ) : (
        <>
          <div
            className="p-4 md:p-6 bg-white dark:bg-zinc-900 flex items-start justify-center min-h-[160px] overflow-x-auto"
            style={{ backgroundColor: previewBackground, color: previewForeground }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Keep fixed-position examples inside the preview pane. */}
            <div className="relative isolate w-full min-h-[200px] transform-gpu">
              {previewAssets ? (
                <ExtractedComponentPreview key={activeTab} html={previewHtml} assets={previewAssets} componentKey={activeTab} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              )}
            </div>
          </div>
          {showCode && <CodeBlock code={componentCodeWithAssets(activeComponent.code, previewAssets, activeTab)} slug={styleSlug} />}
          <ComponentUsageGuide componentId={activeTab} styleSlug={styleSlug} />
        </>
      )}
    </div>
  );
}
