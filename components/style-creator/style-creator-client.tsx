"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import {
  CustomStyleDefinition,
  defaultStyleDefinition,
  colorPresets,
  fontOptions,
  radiusPresets,
  StoredCustomStyle,
} from "@/lib/style-creator/types";
import {
  getStoredStyles,
  saveStyle,
  deleteStyle,
  generateCssFromCustomStyle,
} from "@/lib/style-creator";
import { ColorSection } from "./color-section";
import { TypographySection } from "./typography-section";
import { BordersSection } from "./borders-section";
import { PreviewPanel } from "./preview-panel";
import { SaveDialog } from "./save-dialog";
import { MyStylesList } from "./my-styles-list";
import { Copy, Check, ArrowRight } from "lucide-react";

export function StyleCreatorClient() {
  const { t } = useI18n();
  const router = useRouter();

  // Style definition state
  const [definition, setDefinition] = useState<CustomStyleDefinition>(defaultStyleDefinition);

  // UI state
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [savedStyles, setSavedStyles] = useState<StoredCustomStyle[]>([]);

  // Load saved styles on mount
  useEffect(() => {
    setSavedStyles(getStoredStyles());
  }, []);

  // Generate CSS
  const generatedCss = useMemo(() => generateCssFromCustomStyle(definition), [definition]);

  // Update functions
  const updateColors = useCallback((colors: Partial<CustomStyleDefinition["colors"]>) => {
    setDefinition((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
  }, []);

  const updateTypography = useCallback((typography: Partial<CustomStyleDefinition["typography"]>) => {
    setDefinition((prev) => ({
      ...prev,
      typography: { ...prev.typography, ...typography },
    }));
  }, []);

  const updateBorders = useCallback((borders: Partial<CustomStyleDefinition["borders"]>) => {
    setDefinition((prev) => ({
      ...prev,
      borders: { ...prev.borders, ...borders },
    }));
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = colorPresets.find((p) => p.id === presetId);
    if (preset) {
      setDefinition((prev) => ({
        ...prev,
        colors: { ...preset.colors },
      }));
    }
  }, []);

  // Save handler
  const handleSave = useCallback(
    (name: string, nameEn: string) => {
      const saved = saveStyle(name, nameEn, definition);
      setSavedStyles(getStoredStyles());
      setShowSaveDialog(false);
      return saved;
    },
    [definition]
  );

  // Delete handler
  const handleDelete = useCallback((id: string) => {
    if (window.confirm(t("styleCreator.confirmDelete"))) {
      deleteStyle(id);
      setSavedStyles(getStoredStyles());
    }
  }, [t]);

  // Copy CSS
  const handleCopyCss = useCallback(async () => {
    await navigator.clipboard.writeText(generatedCss);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  }, [generatedCss]);

  // Use in generator
  const handleUseInGenerator = useCallback(() => {
    // Save first, then navigate
    setShowSaveDialog(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <p className="text-xs tracking-widest uppercase text-muted mb-2">
          {t("styleCreator.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
          {t("styleCreator.title")}
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          {t("styleCreator.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Editor */}
        <div className="space-y-8">
          {/* Color Presets */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleCreator.presets")}
            </p>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className="flex items-center gap-2 px-3 py-2 border border-border hover:border-foreground transition-colors text-sm"
                >
                  <div className="flex">
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: preset.colors.secondary }}
                    />
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: preset.colors.accent[0] }}
                    />
                  </div>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <ColorSection colors={definition.colors} onChange={updateColors} />

          {/* Typography */}
          <TypographySection
            typography={definition.typography}
            onChange={updateTypography}
            fontOptions={fontOptions}
          />

          {/* Borders */}
          <BordersSection
            borders={definition.borders}
            onChange={updateBorders}
            radiusPresets={radiusPresets}
          />

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <button
              onClick={() => setShowSaveDialog(true)}
              className="px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
            >
              {t("styleCreator.save")}
            </button>
            <button
              onClick={handleCopyCss}
              className="inline-flex items-center gap-2 px-4 py-3 border border-border hover:border-foreground transition-colors text-sm"
            >
              {copiedCss ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {t("styleCreator.exportCss")}
            </button>
            <button
              onClick={handleUseInGenerator}
              className="inline-flex items-center gap-2 px-4 py-3 border border-border hover:border-foreground transition-colors text-sm"
            >
              {t("styleCreator.useInGenerator")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <PreviewPanel definition={definition} />

          {/* My Styles */}
          <MyStylesList
            styles={savedStyles}
            onDelete={handleDelete}
            onSelect={(style) => setDefinition(style.definition)}
          />
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <SaveDialog
          onSave={handleSave}
          onClose={() => setShowSaveDialog(false)}
          onSaveAndNavigate={(name, nameEn) => {
            handleSave(name, nameEn);
            router.push("/generate");
          }}
        />
      )}
    </div>
  );
}
