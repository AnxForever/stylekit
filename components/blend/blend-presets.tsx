"use client";

import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getBlendPresets, type BlendPreset } from "@/lib/styles/blend-engine";

interface BlendPresetsProps {
  onSelect: (preset: BlendPreset) => void;
}

export function BlendPresets({ onSelect }: BlendPresetsProps) {
  const { locale } = useI18n();
  const presets = getBlendPresets();

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-muted" />
        {locale === "zh" ? "预设组合" : "Presets"}
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="text-left p-3 rounded-lg border border-border hover:border-foreground/30 hover:bg-muted/10 transition-colors"
          >
            <div className="text-sm font-medium text-foreground">
              {locale === "zh" ? p.nameZh : p.name}
            </div>
            <div className="text-[11px] text-muted mt-0.5 line-clamp-2">
              {p.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
