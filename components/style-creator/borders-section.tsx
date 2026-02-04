"use client";

import { useI18n } from "@/lib/i18n/context";
import type { CustomStyleDefinition } from "@/lib/style-creator/types";

interface BordersSectionProps {
  borders: CustomStyleDefinition["borders"];
  onChange: (borders: Partial<CustomStyleDefinition["borders"]>) => void;
  radiusPresets: { value: string; label: string }[];
}

export function BordersSection({
  borders,
  onChange,
  radiusPresets,
}: BordersSectionProps) {
  const { t } = useI18n();

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("styleCreator.borders")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Border Radius */}
        <div>
          <label className="text-xs text-muted mb-2 block">
            {t("styleCreator.borderRadius")}
          </label>
          <div className="flex flex-wrap gap-2">
            {radiusPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onChange({ radius: preset.value })}
                className={`px-3 py-1 text-xs border transition-colors ${
                  borders.radius === preset.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={borders.radius}
            onChange={(e) => onChange({ radius: e.target.value })}
            className="mt-2 w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground"
            placeholder="0.5rem"
          />
        </div>

        {/* Border Width */}
        <div>
          <label className="text-xs text-muted mb-2 block">
            {t("styleCreator.borderWidth")}
          </label>
          <div className="flex flex-wrap gap-2">
            {["0", "1px", "2px", "3px", "4px"].map((width) => (
              <button
                key={width}
                onClick={() => onChange({ width })}
                className={`px-3 py-1 text-xs border transition-colors ${
                  borders.width === width
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
              >
                {width || "None"}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={borders.width}
            onChange={(e) => onChange({ width: e.target.value })}
            className="mt-2 w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground"
            placeholder="1px"
          />
        </div>
      </div>
    </div>
  );
}
