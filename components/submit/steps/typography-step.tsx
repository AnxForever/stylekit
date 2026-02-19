"use client";

import { fontOptions, radiusPresets } from "@/lib/style-creator/types";

interface TypographyStepProps {
  formData: {
    headingFont: string;
    bodyFont: string;
    fontSizeBase: string;
    fontSizeHeading: string;
    fontSizeSmall: string;
    fontWeightNormal: string;
    fontWeightBold: string;
    lineHeightNormal: string;
    lineHeightTight: string;
    borderRadius: string;
    spacingSm: string;
    spacingMd: string;
    spacingLg: string;
  };
  updateField: (field: string, value: unknown) => void;
  isAnimating: boolean;
}

export function TypographyStep({ formData, updateField, isAnimating }: TypographyStepProps) {
  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      {/* Essential: Font Families */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm mb-2">Heading Font</label>
          <select
            value={formData.headingFont}
            onChange={(e) => updateField("headingFont", e.target.value)}
            className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
          >
            {fontOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({opt.category})
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm" style={{ fontFamily: formData.headingFont }}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div>
          <label className="block text-sm mb-2">Body Font</label>
          <select
            value={formData.bodyFont}
            onChange={(e) => updateField("bodyFont", e.target.value)}
            className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
          >
            {fontOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({opt.category})
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm" style={{ fontFamily: formData.bodyFont }}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>

      {/* Advanced: Collapsed by default */}
      <details className="border-t border-border pt-4">
        <summary className="text-sm font-medium cursor-pointer select-none hover:text-foreground/80 transition-colors">
          Advanced Typography &amp; Spacing
        </summary>
        <div className="mt-4 space-y-6">
          {/* Font Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm mb-2">Heading Size</label>
              <input
                type="text"
                value={formData.fontSizeHeading}
                onChange={(e) => updateField("fontSizeHeading", e.target.value)}
                placeholder="2.25rem"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Body Size</label>
              <input
                type="text"
                value={formData.fontSizeBase}
                onChange={(e) => updateField("fontSizeBase", e.target.value)}
                placeholder="1rem"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Small Size</label>
              <input
                type="text"
                value={formData.fontSizeSmall}
                onChange={(e) => updateField("fontSizeSmall", e.target.value)}
                placeholder="0.875rem"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
          </div>

          {/* Font Weights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm mb-2">Normal Weight</label>
              <select
                value={formData.fontWeightNormal}
                onChange={(e) => updateField("fontWeightNormal", e.target.value)}
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
              >
                {["300", "400", "500"].map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Bold Weight</label>
              <select
                value={formData.fontWeightBold}
                onChange={(e) => updateField("fontWeightBold", e.target.value)}
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
              >
                {["600", "700", "800", "900"].map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Line Heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm mb-2">Normal Line Height</label>
              <input
                type="text"
                value={formData.lineHeightNormal}
                onChange={(e) => updateField("lineHeightNormal", e.target.value)}
                placeholder="1.5"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Tight Line Height</label>
              <input
                type="text"
                value={formData.lineHeightTight}
                onChange={(e) => updateField("lineHeightTight", e.target.value)}
                placeholder="1.25"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm mb-2">Border Radius</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {radiusPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => updateField("borderRadius", preset.value)}
                  className={`px-3 py-1.5 text-sm border transition-colors ${
                    formData.borderRadius === preset.value
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={formData.borderRadius}
              onChange={(e) => updateField("borderRadius", e.target.value)}
              placeholder="0.5rem"
              className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
            />
            <div className="mt-2 flex items-center gap-4">
              <div
                className="w-16 h-16 bg-foreground/10 border border-foreground/30"
                style={{ borderRadius: formData.borderRadius }}
              />
              <span className="text-xs text-muted">{formData.borderRadius}</span>
            </div>
          </div>

          {/* Spacing Scale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm mb-2">Spacing SM</label>
              <input
                type="text"
                value={formData.spacingSm}
                onChange={(e) => updateField("spacingSm", e.target.value)}
                placeholder="0.5rem"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Spacing MD</label>
              <input
                type="text"
                value={formData.spacingMd}
                onChange={(e) => updateField("spacingMd", e.target.value)}
                placeholder="1rem"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Spacing LG</label>
              <input
                type="text"
                value={formData.spacingLg}
                onChange={(e) => updateField("spacingLg", e.target.value)}
                placeholder="2rem"
                className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </details>

      {/* Typography Preview (always visible) */}
      <div className="p-6 border border-border bg-background">
        <p className="text-xs text-muted mb-3">Typography Preview</p>
        <h3
          style={{
            fontFamily: formData.headingFont,
            fontSize: formData.fontSizeHeading || "2.25rem",
            fontWeight: Number(formData.fontWeightBold) || 700,
            lineHeight: formData.lineHeightTight || "1.25",
          }}
        >
          Heading Text
        </h3>
        <p
          className="mt-2"
          style={{
            fontFamily: formData.bodyFont,
            fontSize: formData.fontSizeBase || "1rem",
            fontWeight: Number(formData.fontWeightNormal) || 400,
            lineHeight: formData.lineHeightNormal || "1.5",
          }}
        >
          Body text looks like this. The quick brown fox jumps over the lazy dog.
          This demonstrates the chosen typography settings applied together.
        </p>
        <p
          className="mt-1 text-muted"
          style={{
            fontFamily: formData.bodyFont,
            fontSize: formData.fontSizeSmall || "0.875rem",
          }}
        >
          Small text and captions appear at this size.
        </p>
      </div>
    </div>
  );
}
