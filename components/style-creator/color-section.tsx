"use client";

import { useI18n } from "@/lib/i18n/context";
import type { CustomStyleDefinition } from "@/lib/style-creator/types";

interface ColorSectionProps {
  colors: CustomStyleDefinition["colors"];
  onChange: (colors: Partial<CustomStyleDefinition["colors"]>) => void;
}

export function ColorSection({ colors, onChange }: ColorSectionProps) {
  const { t } = useI18n();

  const colorFields: { key: keyof typeof colors; label: string }[] = [
    { key: "primary", label: t("styleCreator.primary") },
    { key: "secondary", label: t("styleCreator.secondary") },
    { key: "background", label: t("styleCreator.background") },
    { key: "foreground", label: t("styleCreator.foreground") },
    { key: "muted", label: t("styleCreator.muted") },
  ];

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("styleCreator.colors")}
      </p>

      {/* Main colors */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {colorFields.map((field) => (
          <div key={field.key}>
            <label className="text-xs text-muted mb-1 block">{field.label}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={colors[field.key] as string}
                onChange={(e) => onChange({ [field.key]: e.target.value })}
                className="w-10 h-10 cursor-pointer border border-border"
              />
              <input
                type="text"
                value={colors[field.key] as string}
                onChange={(e) => onChange({ [field.key]: e.target.value })}
                className="flex-1 px-2 py-1 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground"
                placeholder="#000000"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Accent colors */}
      <div>
        <label className="text-xs text-muted mb-2 block">{t("styleCreator.accent")}</label>
        <div className="flex flex-wrap gap-3">
          {colors.accent.map((color, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  const newAccent = [...colors.accent];
                  newAccent[index] = e.target.value;
                  onChange({ accent: newAccent });
                }}
                className="w-8 h-8 cursor-pointer border border-border"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const newAccent = [...colors.accent];
                  newAccent[index] = e.target.value;
                  onChange({ accent: newAccent });
                }}
                className="w-24 px-2 py-1 border border-border bg-transparent text-xs focus:outline-none focus:border-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
