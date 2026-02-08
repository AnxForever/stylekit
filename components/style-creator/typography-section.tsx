"use client";

import { useI18n } from "@/lib/i18n/context";
import type { CustomStyleDefinition, FontOption } from "@/lib/style-creator/types";

interface TypographySectionProps {
  typography: CustomStyleDefinition["typography"];
  onChange: (typography: Partial<CustomStyleDefinition["typography"]>) => void;
  fontOptions: FontOption[];
}

export function TypographySection({
  typography,
  onChange,
  fontOptions,
}: TypographySectionProps) {
  const { t } = useI18n();
  const headingInOptions = fontOptions.some((font) => font.value === typography.headingFont);
  const bodyInOptions = fontOptions.some((font) => font.value === typography.bodyFont);

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("styleCreator.typography")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Heading Font */}
        <div>
          <label className="text-xs text-muted mb-1 block">
            {t("styleCreator.headingFont")}
          </label>
          <select
            value={typography.headingFont}
            onChange={(e) => onChange({ headingFont: e.target.value })}
            className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground"
          >
            {!headingInOptions && (
              <option value={typography.headingFont}>{typography.headingFont}</option>
            )}
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Body Font */}
        <div>
          <label className="text-xs text-muted mb-1 block">
            {t("styleCreator.bodyFont")}
          </label>
          <select
            value={typography.bodyFont}
            onChange={(e) => onChange({ bodyFont: e.target.value })}
            className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground"
          >
            {!bodyInOptions && (
              <option value={typography.bodyFont}>{typography.bodyFont}</option>
            )}
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
