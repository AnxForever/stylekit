"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { Plus, Palette } from "lucide-react";
import type { DesignStyle } from "@/lib/styles";
import type { StoredCustomStyle } from "@/lib/style-creator/types";
import { getStoredStyles } from "@/lib/style-creator/storage";

interface StyleStepProps {
  styles: DesignStyle[];
  selectedSlug: string | null;
  selectedCustomId: string | null;
  onSelect: (slug: string, isCustom: boolean) => void;
}

export function StyleStep({
  styles,
  selectedSlug,
  selectedCustomId,
  onSelect,
}: StyleStepProps) {
  const { t } = useI18n();
  const [customStyles, setCustomStyles] = useState<StoredCustomStyle[]>([]);

  // Load custom styles on mount
  useEffect(() => {
    setCustomStyles(getStoredStyles());
  }, []);

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-2">{t("generator.selectStyle")}</h2>

      {/* Custom Styles Section */}
      {customStyles.length > 0 && (
        <div className="mb-8">
          <p className="text-muted mb-4">{t("generator.customStyles")}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {customStyles.map((style) => {
              const isSelected = style.id === selectedCustomId;

              return (
                <button
                  key={style.id}
                  onClick={() => onSelect(style.id, true)}
                  className={`group text-left border transition-all ${
                    isSelected
                      ? "border-foreground ring-2 ring-foreground ring-offset-2"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {/* Custom style preview */}
                  <div
                    className="aspect-[4/3] flex items-center justify-center relative"
                    style={{ backgroundColor: style.definition.colors.background }}
                  >
                    <div className="text-center">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{ backgroundColor: style.definition.colors.primary }}
                      >
                        <Palette
                          className="w-6 h-6"
                          style={{ color: style.definition.colors.background }}
                        />
                      </div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: style.definition.colors.foreground }}
                      >
                        Custom
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Color bar */}
                  <div className="h-1 flex">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: style.definition.colors.primary }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: style.definition.colors.secondary }}
                    />
                    {style.definition.colors.accent.slice(0, 2).map((color, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                    ))}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="font-medium text-sm group-hover:text-accent transition-colors">
                      {style.name}
                    </p>
                    <p className="text-xs text-muted">{style.nameEn}</p>
                  </div>
                </button>
              );
            })}

            {/* Create new style link */}
            <Link
              href="/create-style"
              className="group flex flex-col items-center justify-center border border-dashed border-border hover:border-foreground transition-colors aspect-[4/3] text-muted hover:text-foreground"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm">{t("generator.createStyle")}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Built-in Styles Section */}
      <p className="text-muted mb-4">
        {t("generator.builtinStyles")}
        {customStyles.length === 0 && (
          <Link
            href="/create-style"
            className="ml-2 text-sm underline hover:text-foreground transition-colors"
          >
            {t("generator.createStyle")}
          </Link>
        )}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {styles.map((style) => {
          const isSelected = style.slug === selectedSlug && !selectedCustomId;

          return (
            <button
              key={style.slug}
              onClick={() => onSelect(style.slug, false)}
              className={`group text-left border transition-all ${
                isSelected
                  ? "border-foreground ring-2 ring-foreground ring-offset-2"
                  : "border-border hover:border-foreground"
              }`}
            >
              {/* Cover */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <StyleCoverPreview styleSlug={style.slug} />
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Color bar */}
              <div className="h-1 flex">
                <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
                <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
                {style.colors.accent.slice(0, 2).map((color, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="font-medium text-sm group-hover:text-accent transition-colors">
                  {style.name}
                </p>
                <p className="text-xs text-muted">{style.nameEn}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
