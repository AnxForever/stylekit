"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";
import type { GeneratorConfig, SectionConfig, TemplateType, StyleInput, OutputFormat } from "@/lib/generator/types";
import { getTemplateByType, landingTemplate } from "@/lib/generator";
import { generateHtmlFiles, generatePreviewHtml } from "@/lib/generator/renderers/html-renderer";
import { generateReactFiles } from "@/lib/generator/renderers/react-renderer";
import { downloadZip } from "@/lib/generator/zip-builder";
import { getStoredStyles } from "@/lib/style-creator/storage";
import type { StoredCustomStyle } from "@/lib/style-creator/types";
import { StepIndicator } from "./step-indicator";
import { StyleStep } from "./style-step";
import { TemplateStep } from "./template-step";
import { ContentStep } from "./content-step";
import { PreviewStep } from "./preview-step";

interface GeneratorWizardProps {
  styles: DesignStyle[];
}

const TOTAL_STEPS = 4;

export function GeneratorWizard({ styles }: GeneratorWizardProps) {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const previewHtml = useMemo(() => {
    if (!styleInput) return "";
    return generatePreviewHtml(config, styleInput);
  }, [config, styleInput]);

  // Handlers
  const handleSelectStyle = useCallback((slug: string, isCustom: boolean) => {
    if (isCustom) {
      setSelectedCustomId(slug);
      setSelectedStyleSlug(null);
    } else {
      setSelectedStyleSlug(slug);
      setSelectedCustomId(null);
    }
  }, []);

  const handleSelectTemplate = useCallback((type: TemplateType) => {
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

  const handleDownload = useCallback(async () => {
    if (!styleInput) return;

    setIsDownloading(true);
    try {
      const files = selectedFormat === "react"
        ? generateReactFiles(config, styleInput)
        : generateHtmlFiles(config, styleInput);
      const styleName = styleInput.type === "builtin"
        ? styleInput.style.slug
        : styleInput.style.id;
      const folderName = `${globalContent.siteName.toLowerCase().replace(/\s+/g, "-")}-${styleName}`;
      await downloadZip(files, folderName);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }, [config, styleInput, globalContent.siteName, selectedFormat]);

  // Navigation
  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return !!selectedStyleSlug || !!selectedCustomId;
      case 2:
        return !!selectedTemplate;
      case 3:
        return true;
      case 4:
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
    t("generator.step4"),
  ];

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
          <ContentStep
            templateDef={templateDef}
            sections={sections}
            globalContent={globalContent}
            onUpdateSection={handleUpdateSection}
            onUpdateSectionContent={handleUpdateSectionContent}
            onUpdateGlobalContent={setGlobalContent}
            previewHtml={previewHtml}
          />
        )}

        {currentStep === 4 && styleInput && (
          <PreviewStep
            previewHtml={previewHtml}
            styleName={
              styleInput.type === "builtin"
                ? `${styleInput.style.name} (${styleInput.style.nameEn})`
                : `${styleInput.style.name} (${styleInput.style.nameEn})`
            }
            templateType={selectedTemplate}
            outputFormat={selectedFormat}
            isDownloading={isDownloading}
            onDownload={handleDownload}
          />
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
            disabled={isDownloading}
            className="px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {isDownloading ? t("generator.downloading") : t("generator.download")}
          </button>
        )}
      </div>
    </div>
  );
}
