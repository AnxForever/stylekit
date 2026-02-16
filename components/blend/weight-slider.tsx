"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { BlendDimension, BlendWeights } from "@/lib/styles/blend-engine";

interface WeightSliderProps {
  dimension: BlendDimension;
  value: number; // 0-100
  styleAName: string;
  styleBName: string;
  onChange: (value: number) => void;
}

const DIMENSION_COLORS: Record<BlendDimension, string> = {
  colors: "accent-pink-500",
  typography: "accent-gray-700",
  spacing: "accent-emerald-500",
  shadows: "accent-gray-400",
  borders: "accent-orange-500",
  interaction: "accent-cyan-500",
};

export function WeightSlider({
  dimension,
  value,
  styleAName,
  styleBName,
  onChange,
}: WeightSliderProps) {
  const { t } = useI18n();

  const dimensionLabel = t(`blend.dimensions.${dimension}` as Parameters<typeof t>[0]);

  const displayValue = useMemo(() => {
    if (value >= 90) return styleAName;
    if (value <= 10) return styleBName;
    return `${value}% / ${100 - value}%`;
  }, [value, styleAName, styleBName]);

  return (
    <div className="py-3 border-b border-border last:border-b-0 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{dimensionLabel}</span>
        <span className="text-xs text-muted tabular-nums">{displayValue}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-muted w-8 text-right truncate" title={styleBName}>B</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`flex-1 h-1.5 rounded-full cursor-pointer ${DIMENSION_COLORS[dimension]}`}
        />
        <span className="text-[10px] text-muted w-8 truncate" title={styleAName}>A</span>
      </div>
    </div>
  );
}

interface WeightSlidersProps {
  weights: BlendWeights;
  styleAName: string;
  styleBName: string;
  onWeightChange: (dimension: BlendDimension, value: number) => void;
  onResetAll: () => void;
}

const ALL_DIMENSIONS: BlendDimension[] = [
  "colors",
  "typography",
  "spacing",
  "shadows",
  "borders",
  "interaction",
];

export function WeightSliders({
  weights,
  styleAName,
  styleBName,
  onWeightChange,
  onResetAll,
}: WeightSlidersProps) {
  const allFifty = ALL_DIMENSIONS.every((d) => weights[d] === 50);

  return (
    <div>
      {ALL_DIMENSIONS.map((dim) => (
        <WeightSlider
          key={dim}
          dimension={dim}
          value={weights[dim]}
          styleAName={styleAName}
          styleBName={styleBName}
          onChange={(v) => onWeightChange(dim, v)}
        />
      ))}
      {!allFifty && (
        <button
          onClick={onResetAll}
          className="mt-2 text-xs text-muted hover:text-foreground transition-colors"
        >
          Reset to 50/50
        </button>
      )}
    </div>
  );
}
