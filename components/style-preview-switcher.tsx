"use client";

import { useEffect, useId, useState, startTransition } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { ChevronDown } from "lucide-react";

type ComponentType = "button" | "card" | "input";

// Translation keys for the three preview rows. Resolved through
// useI18n in the component so English / Chinese users see the
// matching label and translators only need to edit translations.ts.
const componentLabelKeys: Record<ComponentType, TranslationKey> = {
  button: "previewSwitcher.component.button",
  card: "previewSwitcher.component.card",
  input: "previewSwitcher.component.input",
};

type RenderStyleComponentFn = (
  styleSlug: string,
  component: ComponentType
) => React.ReactNode;

let renderStyleComponentPromise: Promise<RenderStyleComponentFn> | null = null;

function loadRenderStyleComponent(): Promise<RenderStyleComponentFn> {
  if (!renderStyleComponentPromise) {
    renderStyleComponentPromise = import("@/lib/style-components").then(
      (module) => module.renderStyleComponent as RenderStyleComponentFn
    );
  }
  return renderStyleComponentPromise;
}

export function StylePreviewSwitcher() {
  const styles = getAllStylesMeta();
  const labelId = useId();
  const triggerId = useId();
  const listboxId = useId();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [renderStyleComponent, setRenderStyleComponent] = useState<RenderStyleComponentFn | null>(null);
  const { t, locale } = useI18n();

  const selectedStyle = styles.find((s) => s.slug === selectedSlug);
  const isPreviewLoading = Boolean(selectedSlug) && !renderStyleComponent;

  useEffect(() => {
    if (!selectedSlug || renderStyleComponent) {
      return;
    }

    let cancelled = false;

    loadRenderStyleComponent()
      .then((renderFn) => {
        if (cancelled) {
          return;
        }

        setRenderStyleComponent(() => renderFn);
      });

    return () => {
      cancelled = true;
    };
  }, [renderStyleComponent, selectedSlug]);

  return (
    <div className="border border-border bg-zinc-50 dark:bg-zinc-900/50">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p id={labelId} className="text-xs tracking-widest uppercase text-muted mb-1">
            {t("previewSwitcher.title")}
          </p>
          <p className="text-sm text-muted">
            {t("previewSwitcher.description")}
          </p>
        </div>

        {/* Style Selector */}
        <div className="relative">
          <button
            id={triggerId}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
            aria-labelledby={labelId}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-background hover:border-foreground/50 transition-colors text-sm min-w-[180px]"
          >
            <span>
              {selectedStyle
                ? selectedStyle.name
                : t("previewSwitcher.placeholder")}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted transition-transform ml-auto ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              className="absolute z-10 top-full right-0 mt-1 border border-border bg-background shadow-lg min-w-[200px]"
            >
              {styles.map((style) => (
                <button
                  key={style.slug}
                  type="button"
                  role="option"
                  aria-selected={selectedSlug === style.slug}
                  onClick={() => {
                    startTransition(() => {
                      setSelectedSlug(style.slug);
                      setIsOpen(false);
                    });
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 ${
                    selectedSlug === style.slug
                      ? "bg-zinc-100 dark:bg-zinc-800"
                      : ""
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: style.colors.primary }}
                  />
                  {style.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Content */}
      {selectedSlug ? (
        <div className="p-6">
          {isPreviewLoading || !renderStyleComponent ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(Object.keys(componentLabelKeys) as ComponentType[]).map((comp) => (
                <div key={comp}>
                  <p className="text-xs text-muted mb-3">{t(componentLabelKeys[comp])}</p>
                  <div className="min-h-[120px] rounded-lg border border-border bg-background animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(componentLabelKeys) as ComponentType[]).map((comp) => (
                <div key={comp}>
                  <p className="text-xs text-muted mb-3">{t(componentLabelKeys[comp])}</p>
                  <div className="p-4 bg-background rounded-lg border border-border flex items-center justify-center min-h-[120px]">
                    {renderStyleComponent(selectedSlug, comp)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex items-center justify-between">
            <Link
              href={`/styles/${selectedSlug}`}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("previewSwitcher.viewDocs").replace("{name}", selectedStyle?.name ?? "")}{" "}
              →
            </Link>
            <Link
              href="/styles"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("previewSwitcher.browseMore")} →
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-muted">
          {t("previewSwitcher.empty")}
        </div>
      )}
    </div>
  );
}
