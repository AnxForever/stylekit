"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { hasStyleTokens } from "@/lib/styles/tokens-registry";
import type { BlendDimension } from "@/lib/styles/blend-engine";

interface DimensionPickerProps {
  dimension: BlendDimension;
  value: string | null;
  onChange: (slug: string) => void;
}

const DIMENSION_ICONS: Record<BlendDimension, string> = {
  colors: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500",
  typography: "bg-gray-700",
  spacing: "bg-emerald-500",
  shadows: "bg-gray-400",
  borders: "bg-orange-500",
  interaction: "bg-cyan-500",
};

export function DimensionPicker({ dimension, value, onChange }: DimensionPickerProps) {
  const { locale, t } = useI18n();

  const allStyles = useMemo(() => {
    return getAllStylesMeta()
      .filter((s) => s.styleType === "visual" && hasStyleTokens(s.slug))
      .sort((a, b) => {
        const nameA = locale === "zh" ? a.name : a.nameEn;
        const nameB = locale === "zh" ? b.name : b.nameEn;
        return nameA.localeCompare(nameB);
      });
  }, [locale]);

  const selectedStyle = allStyles.find((s) => s.slug === value);
  const dimensionLabel = t(`blend.dimensions.${dimension}` as Parameters<typeof t>[0]);

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-b-0">
      {/* Dimension indicator */}
      <div className="flex items-center gap-2.5 min-w-[120px] md:min-w-[140px]">
        <div className={`w-3 h-3 rounded-full shrink-0 ${DIMENSION_ICONS[dimension]}`} />
        <span className="text-sm font-medium text-foreground">{dimensionLabel}</span>
      </div>

      {/* Style selector */}
      <div className="relative flex-1">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-muted/10 border border-border rounded-lg px-3 py-2 pr-8 text-sm text-foreground cursor-pointer hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20"
        >
          {allStyles.map((s) => (
            <option key={s.slug} value={s.slug}>
              {locale === "zh" ? s.name : s.nameEn}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>

      {/* Mini color swatch for the selected style */}
      {selectedStyle && (
        <div className="hidden md:flex items-center gap-1">
          <div
            className="w-4 h-4 rounded-sm border border-border"
            style={{ backgroundColor: selectedStyle.colors.primary }}
            title={selectedStyle.colors.primary}
          />
          <div
            className="w-4 h-4 rounded-sm border border-border"
            style={{ backgroundColor: selectedStyle.colors.secondary }}
            title={selectedStyle.colors.secondary}
          />
          {selectedStyle.colors.accent[0] && (
            <div
              className="w-4 h-4 rounded-sm border border-border"
              style={{ backgroundColor: selectedStyle.colors.accent[0] }}
              title={selectedStyle.colors.accent[0]}
            />
          )}
        </div>
      )}
    </div>
  );
}
