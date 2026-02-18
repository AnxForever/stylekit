"use client";

import { useState, useMemo, useCallback, useEffect, useDeferredValue } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";
import type { GeneratorConfig, SectionConfig, TemplateType, StyleInput, OutputFormat } from "@/lib/generator/types";
import { getTemplateByType, landingTemplate } from "@/lib/generator";
import { generateHtmlFiles, generatePreviewHtml } from "@/lib/generator/renderers/html-renderer";
import {
  evaluateGeneratedFiles,
  sanitizeGeneratorConfig,
  validateGeneratorConfig,
} from "@/lib/generator/quality";
import type { ZipBuildStage, ZipProgressUpdate } from "@/lib/generator/zip-builder";
import { getStoredStyles } from "@/lib/style-creator/storage";
import type { StoredCustomStyle } from "@/lib/style-creator/types";
import { StepIndicator } from "./step-indicator";
import { StyleStep } from "./style-step";
import { TemplateStep } from "./template-step";
import { ContentStep } from "./content-step";

interface GeneratorWizardProps {
  styles: DesignStyle[];
}

const TOTAL_STEPS = 3;
const PREVIEW_DEBOUNCE_MS = 180;

function getDownloadStageLabel(stage: ZipBuildStage, locale: "zh" | "en"): string {
  if (locale === "zh") {
    if (stage === "prepare") return "准备文件";
    if (stage === "compress") return "压缩中";
    return "收尾中";
  }

  if (stage === "prepare") return "Preparing";
  if (stage === "compress") return "Compressing";
  return "Finalizing";
}

export function GeneratorWizard({ styles }: GeneratorWizardProps) {
  const { t, locale } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewPending, setIsPreviewPending] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<ZipProgressUpdate | null>(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [customStyles, setCustomStyles] = useState<StoredCustomStyle[]>([]);

  // Load custom styles on mount
  useEffect(() => {
    setCustomStyles(getStoredStyles());
  }, []);

  // Configuration state
  const [selectedStyleSlug, setSelectedStyleSlug] = useState<string | null>(null);
  const [selectedCustomId, setSelectedCustomId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("landing");
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>("html");
  const [globalContent, setGlobalContent] = useState({
    siteName: "My Website",
    siteDescription: "Welcome to my website",
  });
  const [sections, setSections] = useState<SectionConfig[]>(() => {
    // Initialize from landing template
    return landingTemplate.sections.map((section) => ({
      id: section.id,
      name: section.name,
      nameEn: section.nameEn,
      description: section.description,
      enabled: section.defaultEnabled,
      content: Object.fromEntries(
        section.fields.map((field) => [field.id, field.defaultValue])
      ),
    }));
  });

  // Computed values
  const selectedStyle = useMemo(
    () => styles.find((s) => s.slug === selectedStyleSlug),
    [styles, selectedStyleSlug]
  );

  const selectedCustomStyle = useMemo(
    () => customStyles.find((s) => s.id === selectedCustomId),
    [customStyles, selectedCustomId]
  );

  // Create StyleInput for renderer
  const styleInput: StyleInput | null = useMemo(() => {
    if (selectedCustomId && selectedCustomStyle) {
      return { type: "custom", style: selectedCustomStyle };
    }
    if (selectedStyleSlug && selectedStyle) {
      return { type: "builtin", style: selectedStyle };
    }
    return null;
  }, [selectedStyleSlug, selectedStyle, selectedCustomId, selectedCustomStyle]);

  const templateDef = useMemo(
    () => getTemplateByType(selectedTemplate),
    [selectedTemplate]
  );

  const deferredSections = useDeferredValue(sections);
  const deferredGlobalContent = useDeferredValue(globalContent);

  const config: GeneratorConfig = useMemo(
    () => ({
      styleSlug: selectedStyleSlug || selectedCustomId || "",
      templateType: selectedTemplate,
      outputFormat: selectedFormat,
      sections,
      globalContent,
    }),
    [selectedStyleSlug, selectedCustomId, selectedTemplate, selectedFormat, sections, globalContent]
  );

  const previewConfig: GeneratorConfig = useMemo(
    () => ({
      styleSlug: selectedStyleSlug || selectedCustomId || "",
      templateType: selectedTemplate,
      outputFormat: "html",
      sections: deferredSections,
      globalContent: deferredGlobalContent,
    }),
    [
      selectedStyleSlug,
      selectedCustomId,
      selectedTemplate,
      deferredSections,
      deferredGlobalContent,
    ]
  );

  const sanitizedPreviewConfig = useMemo(
    () => sanitizeGeneratorConfig(previewConfig, templateDef),
    [previewConfig, templateDef]
  );

  const configValidation = useMemo(
    () => validateGeneratorConfig(config, templateDef),
    [config, templateDef]
  );

  useEffect(() => {
    if (!styleInput) {
      setPreviewHtml("");
      setPreviewError(null);
      setIsPreviewPending(false);
      return;
    }

    setIsPreviewPending(true);
    const timeoutId = window.setTimeout(() => {
      try {
        setPreviewHtml(generatePreviewHtml(sanitizedPreviewConfig, styleInput));
        setPreviewError(null);
      } catch (error) {
        setPreviewHtml("");
        setPreviewError(t("generator.previewFailed"));
        console.error("Failed to generate preview:", error);
      } finally {
        setIsPreviewPending(false);
      }
    }, PREVIEW_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [sanitizedPreviewConfig, styleInput, t]);

  // Handlers
  const handleSelectStyle = useCallback((slug: string, isCustom: boolean) => {
    setDownloadError(null);
    setDownloadNotice(null);
    if (isCustom) {
      setSelectedCustomId(slug);
      setSelectedStyleSlug(null);
    } else {
      setSelectedStyleSlug(slug);
      setSelectedCustomId(null);
    }
  }, []);

  const handleSelectTemplate = useCallback((type: TemplateType) => {
    setDownloadError(null);
    setDownloadNotice(null);
    setSelectedTemplate(type);
    const template = getTemplateByType(type);
    if (template) {
      setSections(
        template.sections.map((section) => ({
          id: section.id,
          name: section.name,
          nameEn: section.nameEn,
          description: section.description,
          enabled: section.defaultEnabled,
          content: Object.fromEntries(
            section.fields.map((field) => [field.id, field.defaultValue])
          ),
        }))
      );
    }
  }, []);

  const handleUpdateSection = useCallback(
    (sectionId: string, updates: Partial<SectionConfig>) => {
      setDownloadError(null);
      setDownloadNotice(null);
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, ...updates } : s
        )
      );
    },
    []
  );

  const handleUpdateSectionContent = useCallback(
    (sectionId: string, fieldId: string, value: string) => {
      setDownloadError(null);
      setDownloadNotice(null);
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId
            ? { ...s, content: { ...s.content, [fieldId]: value } }
            : s
        )
      );
    },
    []
  );

  const handleUpdateGlobalContent = useCallback((content: {
    siteName: string;
    siteDescription: string;
  }) => {
    setDownloadError(null);
    setDownloadNotice(null);
    setGlobalContent(content);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!styleInput || !templateDef) return;

    setDownloadError(null);
    setDownloadNotice(null);
    setDownloadProgress({ stage: "prepare", progress: 0 });
    setIsDownloading(true);
    try {
      const sanitizedConfig = sanitizeGeneratorConfig(config, templateDef);
      const validation = validateGeneratorConfig(sanitizedConfig, templateDef);
      if (validation.errors.length > 0) {
        throw new Error(validation.errors[0].message);
      }
      if (validation.warnings.length > 0) {
        setDownloadNotice(validation.warnings[0].message);
      }

      const files = selectedFormat === "react"
        ? (await import("@/lib/generator/renderers/react-renderer")).generateReactFiles(
          sanitizedConfig,
          styleInput
        )
        : generateHtmlFiles(sanitizedConfig, styleInput);

      const quality = evaluateGeneratedFiles(sanitizedConfig, files);
      if (quality.errors.length > 0) {
        throw new Error(quality.errors[0]);
      }
      if (quality.warnings.length > 0) {
        setDownloadNotice(quality.warnings[0]);
      }

      const { downloadZip } = await import("@/lib/generator/zip-builder");
      const styleName = styleInput.type === "builtin"
        ? styleInput.style.slug
        : styleInput.style.id;
      const folderBase = sanitizedConfig.globalContent.siteName || "stylekit-site";
      const folderName = `${folderBase.toLowerCase().replace(/\s+/g, "-")}-${styleName}`;
      await downloadZip(files, folderName, {
        onProgress: (update) => {
          setDownloadProgress({
            stage: update.stage,
            progress: Math.round(update.progress),
          });
        },
      });
    } catch (error) {
      console.error("Download failed:", error);
      const message = error instanceof Error ? error.message : "";
      if (message) {
        setDownloadError(message);
      } else {
        setDownloadError(t("generator.downloadFailed"));
      }
    } finally {
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  }, [config, styleInput, templateDef, selectedFormat, t]);

  // Navigation
  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return !!selectedStyleSlug || !!selectedCustomId;
      case 2:
        return !!selectedTemplate;
      case 3:
        return true;
      default:
        return false;
    }
  }, [currentStep, selectedStyleSlug, selectedCustomId, selectedTemplate]);

  const handleNext = () => {
    if (canProceed() && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Step labels
  const stepLabels = [
    t("generator.step1"),
    t("generator.step2"),
    t("generator.step3"),
  ];
  const blockingValidationMessage = configValidation.errors[0]?.message ?? null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <p className="text-xs tracking-widest uppercase text-muted mb-2">
          {t("generator.subtitle")}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
          {t("generator.title")}
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          {t("generator.description")}
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        labels={stepLabels}
      />

      {/* Step Content */}
      <div className="mt-8 md:mt-12">
        {currentStep === 1 && (
          <StyleStep
            styles={styles}
            customStyles={customStyles}
            selectedSlug={selectedStyleSlug}
            selectedCustomId={selectedCustomId}
            onSelect={handleSelectStyle}
          />
        )}

        {currentStep === 2 && (
          <TemplateStep
            selectedTemplate={selectedTemplate}
            selectedFormat={selectedFormat}
            onSelect={handleSelectTemplate}
            onSelectFormat={setSelectedFormat}
          />
        )}

        {currentStep === 3 && templateDef && (
          <div className="space-y-6">
            <ContentStep
              templateDef={templateDef}
              sections={sections}
              globalContent={globalContent}
              onUpdateSection={handleUpdateSection}
              onUpdateSectionContent={handleUpdateSectionContent}
              onUpdateGlobalContent={handleUpdateGlobalContent}
              previewHtml={previewHtml}
              isPreviewPending={isPreviewPending}
              previewError={previewError}
            />

            {styleInput && (
              <div className="border border-border p-4 md:p-5">
                <div className="text-sm text-muted">
                  <p>{t("generator.preview")}</p>
                  <p>
                    {styleInput.style.name} /{" "}
                    {selectedTemplate === "landing"
                      ? t("generator.landing")
                      : selectedTemplate === "portfolio"
                        ? t("generator.portfolio")
                        : selectedTemplate}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 md:mt-12 pt-6 border-t border-border">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-3 text-sm tracking-wide transition-colors ${
            currentStep === 1
              ? "text-muted cursor-not-allowed"
              : "border border-border hover:border-foreground"
          }`}
        >
          {t("generator.prev")}
        </button>

        {currentStep < TOTAL_STEPS ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 py-3 text-sm tracking-wide transition-colors ${
              canProceed()
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-muted text-background cursor-not-allowed"
            }`}
          >
            {t("generator.next")}
          </button>
        ) : (
          <button
            onClick={handleDownload}
            disabled={isDownloading || !styleInput || !!blockingValidationMessage}
            className="px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {isDownloading
              ? `${t("generator.downloading")}${downloadProgress ? ` ${downloadProgress.progress}% - ${getDownloadStageLabel(downloadProgress.stage, locale)}` : ""}`
              : t("generator.download")}
          </button>
        )}
      </div>

      {isDownloading && downloadProgress && (
        <div className="mt-3">
          <div className="h-1.5 w-full bg-border/50 overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-200"
              style={{ width: `${Math.min(100, Math.max(0, downloadProgress.progress))}%` }}
            />
          </div>
        </div>
      )}

      {currentStep === TOTAL_STEPS && blockingValidationMessage && (
        <p className="mt-3 text-sm text-amber-600">{blockingValidationMessage}</p>
      )}

      {downloadNotice && (
        <p className="mt-3 text-sm text-amber-600">{downloadNotice}</p>
      )}

      {downloadError && (
        <p className="mt-3 text-sm text-red-500">{downloadError}</p>
      )}
    </div>
  );
}
