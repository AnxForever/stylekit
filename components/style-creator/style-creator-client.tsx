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
import {
  parseStyleExtractorInput,
  type ExtractedStyleDraft,
} from "@/lib/style-extractor/adapter";
import {
  applyExtractedDraftToCustomStyle,
  type ExtractedEvidenceSnapshot,
} from "@/lib/style-extractor/to-custom-style";
import { ColorSection } from "./color-section";
import { TypographySection } from "./typography-section";
import { BordersSection } from "./borders-section";
import { PreviewPanel } from "./preview-panel";
import { SaveDialog } from "./save-dialog";
import { MyStylesList } from "./my-styles-list";
import { Copy, Check, ArrowRight } from "lucide-react";

interface ExtractEvidence extends ExtractedEvidenceSnapshot {
  stylesheetRequested?: number;
  stylesheetFetched?: number;
  colorCount?: number;
  hasGridLayout?: boolean;
}

interface ExtractResponse {
  draft?: ExtractedStyleDraft;
  raw?: string;
  error?: string;
  evidence?: ExtractEvidence;
}

interface ImportSummary {
  source: "json" | "markdown" | "url";
  draft: ExtractedStyleDraft;
  evidence?: ExtractEvidence;
}

export function StyleCreatorClient() {
  const { t } = useI18n();
  const router = useRouter();

  // Style definition state
  const [definition, setDefinition] = useState<CustomStyleDefinition>(defaultStyleDefinition);

  // UI state
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [savedStyles, setSavedStyles] = useState<StoredCustomStyle[]>([]);
  const [importUrl, setImportUrl] = useState("");
  const [importInput, setImportInput] = useState("");
  const [importingFromUrl, setImportingFromUrl] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(null);

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

  const applyImportedDraft = useCallback(
    (draft: ExtractedStyleDraft, source: ImportSummary["source"], evidence?: ExtractEvidence) => {
      setDefinition((prev) => applyExtractedDraftToCustomStyle(draft, prev, evidence));
      setImportSummary({ source, draft, evidence });
      setImportStatus({
        type: "success",
        message: `${t("styleCreator.importSuccess")} ${
          source === "json"
            ? t("styleCreator.importSourceJson")
            : source === "markdown"
              ? t("styleCreator.importSourceMarkdown")
              : t("styleCreator.importSourceUrl")
        }`,
      });
    },
    [t]
  );

  const handleApplyImportInput = useCallback(() => {
    if (!importInput.trim()) {
      setImportStatus({
        type: "error",
        message: t("styleCreator.importErrorEmpty"),
      });
      return;
    }

    const parsed = parseStyleExtractorInput(importInput);
    if (!parsed.ok || !parsed.data) {
      setImportStatus({
        type: "error",
        message: `${t("styleCreator.importErrorPrefix")} ${parsed.error ?? "Unknown format."}`,
      });
      return;
    }

    applyImportedDraft(parsed.data, parsed.source);
  }, [applyImportedDraft, importInput, t]);

  const handleImportFromUrl = useCallback(async () => {
    const trimmedUrl = importUrl.trim();
    if (!trimmedUrl) {
      setImportStatus({
        type: "error",
        message: t("styleCreator.importErrorUrlRequired"),
      });
      return;
    }

    if (!/^https?:\/\//i.test(trimmedUrl)) {
      setImportStatus({
        type: "error",
        message: t("styleCreator.importErrorUrlProtocol"),
      });
      return;
    }

    setImportingFromUrl(true);
    setImportStatus(null);
    try {
      const response = await fetch("/api/style-extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      const payload = (await response.json()) as ExtractResponse;

      if (!response.ok) {
        setImportStatus({
          type: "error",
          message: `${t("styleCreator.importErrorPrefix")} ${
            payload.error ?? `HTTP ${response.status}`
          }`,
        });
        return;
      }

      if (!payload.draft) {
        setImportStatus({
          type: "error",
          message: `${t("styleCreator.importErrorPrefix")} Empty draft from extractor.`,
        });
        return;
      }

      if (typeof payload.raw === "string" && payload.raw.trim()) {
        setImportInput(payload.raw);
      }
      applyImportedDraft(payload.draft, "url", payload.evidence);
    } catch (error) {
      setImportStatus({
        type: "error",
        message: `${t("styleCreator.importErrorPrefix")} ${(error as Error).message}`,
      });
    } finally {
      setImportingFromUrl(false);
    }
  }, [applyImportedDraft, importUrl, t]);

  const clearImportInputs = useCallback(() => {
    setImportInput("");
    setImportStatus(null);
    setImportSummary(null);
  }, []);

  const evidenceBoolText = useCallback(
    (value: boolean | undefined) => (value ? t("styleCreator.importYes") : t("styleCreator.importNo")),
    [t]
  );

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
          {/* Extractor Import */}
          <div className="border border-border p-4 md:p-5 space-y-4 bg-zinc-50/40 dark:bg-zinc-900/20">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2">
                {t("styleCreator.importTitle")}
              </p>
              <p className="text-sm text-muted">
                {t("styleCreator.importDescription")}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <input
                value={importUrl}
                onChange={(event) => setImportUrl(event.target.value)}
                placeholder={t("styleCreator.importUrlPlaceholder")}
                className="flex-1 px-3 py-2 text-sm border border-border bg-background"
              />
              <button
                onClick={handleImportFromUrl}
                disabled={importingFromUrl}
                className="px-4 py-2 border border-border hover:border-foreground disabled:opacity-60 disabled:cursor-not-allowed text-sm transition-colors"
              >
                {importingFromUrl
                  ? t("styleCreator.importing")
                  : t("styleCreator.importFromUrl")}
              </button>
            </div>

            <textarea
              value={importInput}
              onChange={(event) => setImportInput(event.target.value)}
              placeholder={t("styleCreator.importTextPlaceholder")}
              className="w-full min-h-[180px] p-3 border border-border bg-background text-xs font-mono leading-relaxed"
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleApplyImportInput}
                className="px-4 py-2 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
              >
                {t("styleCreator.applyImport")}
              </button>
              <button
                onClick={clearImportInputs}
                className="px-4 py-2 border border-border hover:border-foreground text-sm transition-colors"
              >
                {t("styleCreator.clearImport")}
              </button>
            </div>

            {importStatus && (
              <p
                className={`text-sm ${
                  importStatus.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {importStatus.message}
              </p>
            )}

            {importSummary && (
              <div className="border border-border bg-background p-3 space-y-3">
                <p className="text-sm font-medium">
                  {importSummary.draft.nameEn ??
                    importSummary.draft.name ??
                    t("styleCreator.importUnnamed")}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 border border-border">
                    {importSummary.source === "json"
                      ? t("styleCreator.importSourceJson")
                      : importSummary.source === "markdown"
                        ? t("styleCreator.importSourceMarkdown")
                        : t("styleCreator.importSourceUrl")}
                  </span>
                  {importSummary.draft.category && (
                    <span className="px-2 py-1 border border-border">{importSummary.draft.category}</span>
                  )}
                  {importSummary.draft.styleType && (
                    <span className="px-2 py-1 border border-border">{importSummary.draft.styleType}</span>
                  )}
                  {importSummary.draft.primaryColor && (
                    <span className="px-2 py-1 border border-border">{importSummary.draft.primaryColor}</span>
                  )}
                </div>
                {importSummary.evidence && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted">
                    <p>
                      {t("styleCreator.importEvidenceStylesheets")}:{" "}
                      {importSummary.evidence.stylesheetFetched ??
                        importSummary.evidence.stylesheetRequested ??
                        0}
                    </p>
                    <p>
                      {t("styleCreator.importEvidenceColors")}:{" "}
                      {importSummary.evidence.colorCount ?? 0}
                    </p>
                    <p>
                      {t("styleCreator.importEvidenceAnimation")}:{" "}
                      {evidenceBoolText(importSummary.evidence.hasAnimation)}
                    </p>
                    <p>
                      {t("styleCreator.importEvidenceLayout")}:{" "}
                      {evidenceBoolText(importSummary.evidence.hasGridLayout)}
                    </p>
                    <p>
                      {t("styleCreator.importEvidenceGlass")}:{" "}
                      {evidenceBoolText(importSummary.evidence.hasGlassEffect)}
                    </p>
                    <p>
                      {t("styleCreator.importEvidenceNeon")}:{" "}
                      {evidenceBoolText(importSummary.evidence.hasNeonEffect)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

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
