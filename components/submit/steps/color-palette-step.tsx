"use client";

import { AlertCircle } from "lucide-react";
import { contrastRatio, meetsAA } from "@/lib/accessibility/wcag";

interface ColorPaletteStepProps {
  formData: {
    primaryColor: string;
    secondaryColor: string;
    accentColors: string[];
    background: string;
    foreground: string;
    muted: string;
  };
  updateField: (field: string, value: unknown) => void;
  getVisibleError: (field: string, step: number) => string;
  markTouched: (field: string) => void;
  isAnimating: boolean;
  text: {
    fields: {
      primaryColor: string;
      secondaryColor: string;
      accentColors: string;
      colorPreview: string;
    };
    addAccentColor: string;
  };
  addAccentColor: () => void;
  updateAccentColor: (index: number, value: string) => void;
  removeAccentColor: (index: number) => void;
}

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function isValidHex(color: string): boolean {
  return HEX_PATTERN.test(color.trim());
}

function ContrastBadge({ fg, bg }: { fg: string; bg: string }) {
  if (!isValidHex(fg) || !isValidHex(bg)) return null;
  const ratio = contrastRatio(fg, bg);
  const passes = meetsAA(ratio);
  const rounded = Math.round(ratio * 10) / 10;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs border ${
      passes
        ? "border-green-300 text-green-700 dark:border-green-700 dark:text-green-400"
        : "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400"
    }`}>
      {rounded}:1 {passes ? "AA" : "Fail"}
    </span>
  );
}

export function ColorPaletteStep({
  formData,
  updateField,
  getVisibleError,
  markTouched,
  isAnimating,
  text,
  addAccentColor,
  updateAccentColor,
  removeAccentColor,
}: ColorPaletteStepProps) {
  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm mb-2">{text.fields.primaryColor} *</label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={formData.primaryColor}
              onChange={(e) => updateField("primaryColor", e.target.value)}
              onBlur={() => markTouched("primaryColor")}
              className="w-12 h-12 border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.primaryColor}
              onChange={(e) => updateField("primaryColor", e.target.value)}
              onBlur={() => markTouched("primaryColor")}
              className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
            />
          </div>
          {getVisibleError("primaryColor", 2) && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {getVisibleError("primaryColor", 2)}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-2">{text.fields.secondaryColor} *</label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={formData.secondaryColor}
              onChange={(e) => updateField("secondaryColor", e.target.value)}
              onBlur={() => markTouched("secondaryColor")}
              className="w-12 h-12 border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.secondaryColor}
              onChange={(e) => updateField("secondaryColor", e.target.value)}
              onBlur={() => markTouched("secondaryColor")}
              className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
            />
          </div>
          {getVisibleError("secondaryColor", 2) && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              {getVisibleError("secondaryColor", 2)}
            </p>
          )}
        </div>
      </div>

      {/* Background / Foreground / Muted */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div>
          <label className="block text-sm mb-2">Background</label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={formData.background}
              onChange={(e) => updateField("background", e.target.value)}
              className="w-10 h-10 border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.background}
              onChange={(e) => updateField("background", e.target.value)}
              className="flex-1 px-3 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Foreground</label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={formData.foreground}
              onChange={(e) => updateField("foreground", e.target.value)}
              className="w-10 h-10 border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.foreground}
              onChange={(e) => updateField("foreground", e.target.value)}
              className="flex-1 px-3 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Muted</label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={formData.muted}
              onChange={(e) => updateField("muted", e.target.value)}
              className="w-10 h-10 border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.muted}
              onChange={(e) => updateField("muted", e.target.value)}
              className="flex-1 px-3 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Contrast Checks */}
      {isValidHex(formData.foreground) && isValidHex(formData.background) && (
        <div className="flex flex-wrap gap-3 p-3 border border-border bg-zinc-50 dark:bg-zinc-900">
          <span className="text-xs text-muted mr-2">Contrast:</span>
          <span className="text-xs text-muted">FG/BG</span>
          <ContrastBadge fg={formData.foreground} bg={formData.background} />
          {isValidHex(formData.primaryColor) && (
            <>
              <span className="text-xs text-muted">Primary/BG</span>
              <ContrastBadge fg={formData.primaryColor} bg={formData.background} />
            </>
          )}
          {isValidHex(formData.muted) && (
            <>
              <span className="text-xs text-muted">Muted/BG</span>
              <ContrastBadge fg={formData.muted} bg={formData.background} />
            </>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm mb-2">{text.fields.accentColors}</label>
        <div className="space-y-3">
          {formData.accentColors.map((color, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => updateAccentColor(index, e.target.value)}
                className="w-12 h-12 border border-border cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => updateAccentColor(index, e.target.value)}
                onBlur={() => markTouched("accentColors")}
                className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
              {formData.accentColors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAccentColor(index)}
                  className="px-3 py-3 border border-border hover:border-foreground text-muted hover:text-foreground transition-colors"
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
        {formData.accentColors.length < 5 && (
          <button
            type="button"
            onClick={addAccentColor}
            className="mt-3 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
          >
            + {text.addAccentColor}
          </button>
        )}
        {getVisibleError("accentColors", 2) && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
            <AlertCircle className="w-3 h-3" />
            {getVisibleError("accentColors", 2)}
          </p>
        )}
      </div>

      {/* Color Preview */}
      <div>
        <label className="block text-sm mb-2">{text.fields.colorPreview}</label>
        <div className="flex h-16 border border-border overflow-hidden">
          <div className="flex-1" style={{ backgroundColor: formData.primaryColor }} />
          <div className="flex-1" style={{ backgroundColor: formData.secondaryColor }} />
          <div className="flex-1" style={{ backgroundColor: formData.background }} />
          <div className="flex-1" style={{ backgroundColor: formData.foreground }} />
          <div className="flex-1" style={{ backgroundColor: formData.muted }} />
          {formData.accentColors.map((color, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  );
}
