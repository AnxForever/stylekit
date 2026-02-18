"use client";

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useDeferredValue,
} from "react";
import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";
import type {
  GeneratorConfig,
  OutputFormat,
  SectionConfig,
  StyleInput,
  TemplateType,
} from "@/lib/generator/types";
import { getTemplateByType } from "@/lib/generator";
import { generateHtmlFiles, generatePreviewHtml } from "@/lib/generator/renderers/html-renderer";
import {
  evaluateGeneratedFiles,
  sanitizeGeneratorConfig,
  validateGeneratorConfig,
} from "@/lib/generator/quality";
import type { ZipBuildStage, ZipProgressUpdate } from "@/lib/generator/zip-builder";
import { getStoredStyles } from "@/lib/style-creator/storage";
import type { StoredCustomStyle } from "@/lib/style-creator/types";
import {
  applyScenarioPackToSections,
  getScenarioPacksByTemplate,
  type GeneratorScenarioPack,
} from "@/lib/generator/scenario-packs";
import {
  deleteStoredScenarioPack,
  exportStoredScenarioPacks,
  getStoredScenarioPacks,
  importStoredScenarioPacks,
  saveScenarioPackFromConfig,
  updateStoredScenarioPack,
  type StoredScenarioPack,
} from "@/lib/generator/scenario-storage";
import { StepIndicator } from "./step-indicator";
import { StyleStep } from "./style-step";
import { TemplateStep } from "./template-step";
import { ContentStep } from "./content-step";

interface GeneratorWizardProps {
  styles: DesignStyle[];
}

const TOTAL_STEPS = 3;
const PREVIEW_DEBOUNCE_MS = 180;

const DEFAULT_GLOBAL_CONTENT_BY_LOCALE: Record<
  "zh" | "en",
  Record<TemplateType, GeneratorConfig["globalContent"]>
> = {
  zh: {
    landing: {
      siteName: "我的网站",
      siteDescription: "欢迎来到我的网站",
    },
    portfolio: {
      siteName: "我的作品集",
      siteDescription: "精选项目与实践经验",
    },
    blog: {
      siteName: "我的博客",
      siteDescription: "记录思考、教程与更新",
    },
    dashboard: {
      siteName: "运营仪表盘",
      siteDescription: "追踪核心指标与业务表现",
    },
  },
  en: {
    landing: {
      siteName: "My Website",
      siteDescription: "Welcome to my website",
    },
    portfolio: {
      siteName: "My Portfolio",
      siteDescription: "Selected projects and experience",
    },
    blog: {
      siteName: "My Blog",
      siteDescription: "Thoughts, tutorials, and updates",
    },
    dashboard: {
      siteName: "Operations Dashboard",
      siteDescription: "Track performance and critical metrics",
    },
  },
};

function buildSectionsFromTemplate(templateType: TemplateType): SectionConfig[] {
  const template = getTemplateByType(templateType);
  if (!template) return [];

  return template.sections.map((section) => ({
    id: section.id,
    name: section.name,
    nameEn: section.nameEn,
    description: section.description,
    enabled: section.defaultEnabled,
    content: Object.fromEntries(
      section.fields.map((field) => [field.id, field.defaultValue])
    ),
  }));
}

function getDefaultGlobalContent(
  templateType: TemplateType,
  locale: "zh" | "en"
): GeneratorConfig["globalContent"] {
  return { ...DEFAULT_GLOBAL_CONTENT_BY_LOCALE[locale][templateType] };
}

function getDownloadStageLabel(stage: ZipBuildStage, locale: "zh" | "en"): string {
  if (locale === "zh") {
    if (stage === "prepare") return "准备文件";
    if (stage === "compress") return "压缩文件";
    return "完成打包";
  }

  if (stage === "prepare") return "Preparing";
  if (stage === "compress") return "Compressing";
  return "Finalizing";
}

function downloadTextFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function GeneratorWizard({ styles }: GeneratorWizardProps) {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";

  const uiText = useMemo(
    () =>
      isZh
        ? {
            recommendationSiteName: "站点名称建议至少 2 个词，便于用户快速理解定位。",
            recommendationSiteDesc: "站点描述建议补充结果导向信息，提高表达完整度。",
            recommendationFillMore: "导出前请补全更多区块字段，减少占位内容。",
            recommendationShortField: "部分字段内容过短，建议补充更具体的信息。",
            recommendationRepeated: "检测到区块内容重复，建议调整文案避免雷同。",
            recommendationNextjs: "若导出 Next.js，请上线前检查路由分组和 metadata。",
            recommendationLooksGood: "内容质量较好，建议再做一次通读后导出。",
            readinessProduction: "可直接发布",
            readinessRefine: "再优化后发布",
            readinessDraft: "草稿阶段",
            noticeScenarioSaved: "场景预设已保存。",
            noticeScenarioDeleted: "场景预设已删除。",
            noticeScenarioUpdated: "场景预设已更新。",
            noticeScenarioExported: "场景预设已导出。",
            errorScenarioSaveFailed: "场景预设保存失败。",
            errorScenarioNotFound: "未找到对应场景预设。",
            errorScenarioExportFailed: "场景预设导出失败。",
            errorScenarioImportNone: "该文件中没有可导入的有效场景预设。",
            errorScenarioImportFailed: "场景预设导入失败。",
            noticeScenarioImported: (imported: number, skipped: number) =>
              skipped > 0
                ? `已导入 ${imported} 个预设，跳过 ${skipped} 个。`
                : `已导入 ${imported} 个预设。`,
            intelligenceTitle: "生成质量分析",
            metricSections: "区块数",
            metricFilledFields: "已填字段",
            metricShortFields: "短字段",
            metricRepeated: "重复片段",
            sectionCompletion: "区块完成度",
            recommendations: "优化建议",
          }
        : {
            recommendationSiteName: "Give the site name at least two words to improve clarity.",
            recommendationSiteDesc: "Expand the site description with outcome-focused copy.",
            recommendationFillMore:
              "Complete more section fields before exporting for production use.",
            recommendationShortField:
              "Some fields are too short; add more concrete details and context.",
            recommendationRepeated:
              "There are repeated snippets across sections; diversify wording.",
            recommendationNextjs:
              "For Next.js output, review generated route groups and metadata before shipping.",
            recommendationLooksGood:
              "Looks strong. Run one final copy pass and export.",
            readinessProduction: "Production-ready",
            readinessRefine: "Refine and launch",
            readinessDraft: "Draft mode",
            noticeScenarioSaved: "Saved scenario preset.",
            noticeScenarioDeleted: "Preset deleted.",
            noticeScenarioUpdated: "Preset updated.",
            noticeScenarioExported: "Scenario presets exported.",
            errorScenarioSaveFailed: "Failed to save scenario preset.",
            errorScenarioNotFound: "Preset not found.",
            errorScenarioExportFailed: "Failed to export scenario presets.",
            errorScenarioImportNone: "No valid scenario presets found in this file.",
            errorScenarioImportFailed: "Failed to import scenario presets.",
            noticeScenarioImported: (imported: number, skipped: number) =>
              skipped > 0
                ? `Imported ${imported} presets. Skipped ${skipped}.`
                : `Imported ${imported} presets.`,
            intelligenceTitle: "Generation intelligence",
            metricSections: "Sections",
            metricFilledFields: "Filled fields",
            metricShortFields: "Short fields",
            metricRepeated: "Repeated snippets",
            sectionCompletion: "Section completion",
            recommendations: "Recommendations",
          },
    [isZh]
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewPending, setIsPreviewPending] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<ZipProgressUpdate | null>(null);
  const [previewHtml, setPreviewHtml] = useState("");

  const [customStyles, setCustomStyles] = useState<StoredCustomStyle[]>([]);
  const [customScenarioPacks, setCustomScenarioPacks] = useState<StoredScenarioPack[]>([]);
  const [appliedScenarioId, setAppliedScenarioId] = useState<string | null>(null);

  const [selectedStyleSlug, setSelectedStyleSlug] = useState<string | null>(null);
  const [selectedCustomId, setSelectedCustomId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("landing");
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>("html");
  const [globalContent, setGlobalContent] = useState<GeneratorConfig["globalContent"]>(() =>
    getDefaultGlobalContent("landing", locale)
  );
  const [sections, setSections] = useState<SectionConfig[]>(() =>
    buildSectionsFromTemplate("landing")
  );

  useEffect(() => {
    setCustomStyles(getStoredStyles());
  }, []);

  useEffect(() => {
    setCustomScenarioPacks(getStoredScenarioPacks(selectedTemplate));
  }, [selectedTemplate]);

  const selectedStyle = useMemo(
    () => styles.find((style) => style.slug === selectedStyleSlug),
    [styles, selectedStyleSlug]
  );

  const selectedCustomStyle = useMemo(
    () => customStyles.find((style) => style.id === selectedCustomId),
    [customStyles, selectedCustomId]
  );

  const styleInput: StyleInput | null = useMemo(() => {
    if (selectedCustomId && selectedCustomStyle) {
      return { type: "custom", style: selectedCustomStyle };
    }
    if (selectedStyleSlug && selectedStyle) {
      return { type: "builtin", style: selectedStyle };
    }
    return null;
  }, [selectedCustomId, selectedCustomStyle, selectedStyleSlug, selectedStyle]);

  const templateDef = useMemo(
    () => getTemplateByType(selectedTemplate),
    [selectedTemplate]
  );

  const scenarioPacks = useMemo<GeneratorScenarioPack[]>(
    () => [...getScenarioPacksByTemplate(selectedTemplate), ...customScenarioPacks],
    [selectedTemplate, customScenarioPacks]
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
    [
      selectedStyleSlug,
      selectedCustomId,
      selectedTemplate,
      selectedFormat,
      sections,
      globalContent,
    ]
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

  const contentMetrics = useMemo(() => {
    const enabledSections = sections.filter((section) => section.enabled);
    const filledFields = enabledSections.reduce(
      (count, section) =>
        count +
        Object.values(section.content).filter((value) => value.trim().length > 0).length,
      0
    );
    const totalFields = enabledSections.reduce(
      (count, section) => count + Object.keys(section.content).length,
      0
    );
    const sectionProgress = enabledSections.map((section) => {
      const entries = Object.values(section.content);
      const filled = entries.filter((value) => value.trim().length > 0).length;
      const total = entries.length;
      const completion = total === 0 ? 0 : Math.round((filled / total) * 100);
      return {
        id: section.id,
        name: section.nameEn || section.name || section.id,
        filled,
        total,
        completion,
      };
    });

    const shortFieldCount = enabledSections.reduce((count, section) => {
      return count + Object.values(section.content)
        .filter((value) => value.trim().length > 0)
        .filter((value) => value.trim().length < 18).length;
    }, 0);

    const valueFrequency = new Map<string, number>();
    for (const section of enabledSections) {
      for (const value of Object.values(section.content)) {
        const normalized = value.trim().toLowerCase();
        if (!normalized) continue;
        valueFrequency.set(normalized, (valueFrequency.get(normalized) ?? 0) + 1);
      }
    }
    const repeatedSnippetCount = Array.from(valueFrequency.values()).filter((count) => count > 1).length;

    const fillRatio = totalFields === 0 ? 0 : filledFields / totalFields;
    const siteNameWordCount = globalContent.siteName.trim().split(/\s+/).filter(Boolean).length;
    const siteDescriptionWordCount = globalContent.siteDescription.trim().split(/\s+/).filter(Boolean).length;

    let readinessScore = Math.round(fillRatio * 55);
    if (siteNameWordCount >= 2) readinessScore += 15;
    if (siteDescriptionWordCount >= 10) readinessScore += 20;
    readinessScore = Math.max(0, Math.min(100, readinessScore - repeatedSnippetCount * 4 - shortFieldCount * 2));

    const recommendations: string[] = [];
    if (siteNameWordCount < 2) {
      recommendations.push(uiText.recommendationSiteName);
    }
    if (siteDescriptionWordCount < 10) {
      recommendations.push(uiText.recommendationSiteDesc);
    }
    if (fillRatio < 0.75) {
      recommendations.push(uiText.recommendationFillMore);
    }
    if (shortFieldCount > 0) {
      recommendations.push(uiText.recommendationShortField);
    }
    if (repeatedSnippetCount > 0) {
      recommendations.push(uiText.recommendationRepeated);
    }
    if (selectedFormat === "nextjs") {
      recommendations.push(uiText.recommendationNextjs);
    }
    if (recommendations.length === 0) {
      recommendations.push(uiText.recommendationLooksGood);
    }

    const readinessTier = readinessScore >= 85
      ? uiText.readinessProduction
      : readinessScore >= 65
        ? uiText.readinessRefine
        : uiText.readinessDraft;

    return {
      enabledSectionCount: enabledSections.length,
      totalSectionCount: sections.length,
      filledFields,
      totalFields,
      fillPercent: Math.round(fillRatio * 100),
      shortFieldCount,
      repeatedSnippetCount,
      siteNameWordCount,
      siteDescriptionWordCount,
      readinessScore,
      readinessTier,
      sectionProgress,
      recommendations,
    };
  }, [sections, globalContent, selectedFormat, uiText]);

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

  const resetFeedback = useCallback(() => {
    setDownloadError(null);
    setDownloadNotice(null);
  }, []);

  const handleSelectStyle = useCallback(
    (slug: string, isCustom: boolean) => {
      resetFeedback();
      if (isCustom) {
        setSelectedCustomId(slug);
        setSelectedStyleSlug(null);
      } else {
        setSelectedStyleSlug(slug);
        setSelectedCustomId(null);
      }
    },
    [resetFeedback]
  );

  const handleSelectTemplate = useCallback(
    (templateType: TemplateType) => {
      resetFeedback();
      setSelectedTemplate(templateType);
      setSections(buildSectionsFromTemplate(templateType));
      setGlobalContent(getDefaultGlobalContent(templateType, locale));
      setAppliedScenarioId(null);
    },
    [locale, resetFeedback]
  );

  const handleUpdateSection = useCallback(
    (sectionId: string, updates: Partial<SectionConfig>) => {
      resetFeedback();
      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId ? { ...section, ...updates } : section
        )
      );
    },
    [resetFeedback]
  );

  const handleUpdateSectionContent = useCallback(
    (sectionId: string, fieldId: string, value: string) => {
      resetFeedback();
      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? { ...section, content: { ...section.content, [fieldId]: value } }
            : section
        )
      );
    },
    [resetFeedback]
  );

  const handleUpdateGlobalContent = useCallback(
    (content: { siteName: string; siteDescription: string }) => {
      resetFeedback();
      setGlobalContent(content);
    },
    [resetFeedback]
  );

  const handleApplyScenarioPack = useCallback(
    (scenarioId: string) => {
      resetFeedback();
      const scenarioPack = scenarioPacks.find((pack) => pack.id === scenarioId);
      if (!scenarioPack) return;

      setGlobalContent((prev) => ({
        ...prev,
        ...scenarioPack.globalContent,
      }));
      setSections((prev) => applyScenarioPackToSections(prev, scenarioPack));
      setAppliedScenarioId(scenarioId);
    },
    [resetFeedback, scenarioPacks]
  );

  const handleResetContent = useCallback(() => {
    resetFeedback();
    setSections(buildSectionsFromTemplate(selectedTemplate));
    setGlobalContent(getDefaultGlobalContent(selectedTemplate, locale));
    setAppliedScenarioId(null);
  }, [locale, resetFeedback, selectedTemplate]);

  const handleSaveScenarioPack = useCallback(
    (name: string, description: string) => {
      resetFeedback();
      try {
        const savedPack = saveScenarioPackFromConfig({
          templateType: selectedTemplate,
          name,
          description,
          globalContent,
          sections,
        });
        setCustomScenarioPacks((prev) => [savedPack, ...prev.filter((pack) => pack.id !== savedPack.id)]);
        setAppliedScenarioId(savedPack.id);
        setDownloadNotice(uiText.noticeScenarioSaved);
      } catch (error) {
        console.error("Failed to save preset:", error);
        setDownloadError(uiText.errorScenarioSaveFailed);
      }
    },
    [globalContent, resetFeedback, sections, selectedTemplate, uiText]
  );

  const handleDeleteScenarioPack = useCallback(
    (scenarioId: string) => {
      resetFeedback();
      deleteStoredScenarioPack(scenarioId);
      setCustomScenarioPacks((prev) => prev.filter((pack) => pack.id !== scenarioId));
      if (appliedScenarioId === scenarioId) {
        setAppliedScenarioId(null);
      }
      setDownloadNotice(uiText.noticeScenarioDeleted);
    },
    [appliedScenarioId, resetFeedback, uiText]
  );

  const handleUpdateScenarioPack = useCallback(
    (scenarioId: string, name: string, description: string) => {
      resetFeedback();
      const updated = updateStoredScenarioPack(scenarioId, { name, description });
      if (!updated) {
        setDownloadError(uiText.errorScenarioNotFound);
        return;
      }

      setCustomScenarioPacks((prev) =>
        prev.map((pack) => (pack.id === scenarioId ? updated : pack))
      );
      setDownloadNotice(uiText.noticeScenarioUpdated);
    },
    [resetFeedback, uiText]
  );

  const handleExportScenarioPacks = useCallback(() => {
    resetFeedback();
    try {
      const exportedJson = exportStoredScenarioPacks(selectedTemplate);
      const date = new Date().toISOString().slice(0, 10);
      downloadTextFile(
        exportedJson,
        `stylekit-scenarios-${selectedTemplate}-${date}.json`,
        "application/json"
      );
      setDownloadNotice(uiText.noticeScenarioExported);
    } catch (error) {
      console.error("Failed to export presets:", error);
      setDownloadError(uiText.errorScenarioExportFailed);
    }
  }, [resetFeedback, selectedTemplate, uiText]);

  const handleImportScenarioPacks = useCallback(
    (jsonContent: string) => {
      resetFeedback();
      try {
        const result = importStoredScenarioPacks(jsonContent, selectedTemplate);
        const templatePacks = result.packs.filter(
          (pack) => pack.templateType === selectedTemplate
        );

        setCustomScenarioPacks(templatePacks);
        setAppliedScenarioId(null);

        if (result.imported === 0) {
          setDownloadError(uiText.errorScenarioImportNone);
          return;
        }

        const notice = uiText.noticeScenarioImported(result.imported, result.skipped);
        setDownloadNotice(notice);
      } catch (error) {
        console.error("Failed to import presets:", error);
        setDownloadError(uiText.errorScenarioImportFailed);
      }
    },
    [resetFeedback, selectedTemplate, uiText]
  );

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

      const files =
        selectedFormat === "react"
          ? (await import("@/lib/generator/renderers/react-renderer")).generateReactFiles(
            sanitizedConfig,
            styleInput
          )
          : selectedFormat === "nextjs"
            ? (await import("@/lib/generator/renderers/nextjs-renderer")).generateNextjsFiles(
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
      setDownloadError(message || t("generator.downloadFailed"));
    } finally {
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  }, [config, selectedFormat, styleInput, t, templateDef]);

  const canProceed = useCallback(() => {
    if (currentStep === 1) {
      return !!selectedStyleSlug || !!selectedCustomId;
    }
    if (currentStep === 2) {
      return !!selectedTemplate;
    }
    return true;
  }, [currentStep, selectedCustomId, selectedStyleSlug, selectedTemplate]);

  const handleNext = useCallback(() => {
    if (canProceed() && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [canProceed, currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const stepLabels = [t("generator.step1"), t("generator.step2"), t("generator.step3")];
  const blockingValidationMessage = configValidation.errors[0]?.message ?? null;

  const selectedTemplateLabel = selectedTemplate === "landing"
    ? t("generator.landing")
    : selectedTemplate === "portfolio"
      ? t("generator.portfolio")
      : selectedTemplate === "blog"
        ? t("generator.blog")
        : t("generator.dashboard");

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
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

      <StepIndicator
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        labels={stepLabels}
      />

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
              scenarioPacks={scenarioPacks}
              appliedScenarioId={appliedScenarioId}
              onUpdateSection={handleUpdateSection}
              onUpdateSectionContent={handleUpdateSectionContent}
              onUpdateGlobalContent={handleUpdateGlobalContent}
              onApplyScenarioPack={handleApplyScenarioPack}
              onResetContent={handleResetContent}
              onSaveScenarioPack={handleSaveScenarioPack}
              onDeleteScenarioPack={handleDeleteScenarioPack}
              onUpdateScenarioPack={handleUpdateScenarioPack}
              onExportScenarioPacks={handleExportScenarioPacks}
              onImportScenarioPacks={handleImportScenarioPacks}
              previewHtml={previewHtml}
              isPreviewPending={isPreviewPending}
              previewError={previewError}
            />

            {styleInput && (
              <div className="border border-border p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted mb-1">
                      Generation intelligence
                    </p>
                    <p className="text-sm text-muted">
                      {styleInput.style.name} / {selectedTemplateLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tabular-nums">
                      {contentMetrics.readinessScore}
                    </p>
                    <p className="text-xs text-muted">{contentMetrics.readinessTier}</p>
                  </div>
                </div>

                <div className="mt-4 h-2 w-full bg-border/40 overflow-hidden">
                  <div
                    className="h-full bg-foreground transition-all duration-300"
                    style={{ width: `${contentMetrics.readinessScore}%` }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="border border-border px-3 py-2">
                    <p className="text-muted">Sections</p>
                    <p className="font-medium mt-1">
                      {contentMetrics.enabledSectionCount}/{contentMetrics.totalSectionCount}
                    </p>
                  </div>
                  <div className="border border-border px-3 py-2">
                    <p className="text-muted">Filled fields</p>
                    <p className="font-medium mt-1">
                      {contentMetrics.filledFields}/{contentMetrics.totalFields} ({contentMetrics.fillPercent}%)
                    </p>
                  </div>
                  <div className="border border-border px-3 py-2">
                    <p className="text-muted">Short fields</p>
                    <p className="font-medium mt-1">{contentMetrics.shortFieldCount}</p>
                  </div>
                  <div className="border border-border px-3 py-2">
                    <p className="text-muted">Repeated snippets</p>
                    <p className="font-medium mt-1">{contentMetrics.repeatedSnippetCount}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs tracking-wide uppercase text-muted">Section completion</p>
                    {contentMetrics.sectionProgress.map((section) => (
                      <div key={section.id}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted">{section.name}</span>
                          <span className="tabular-nums">
                            {section.filled}/{section.total}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-border/40 overflow-hidden">
                          <div
                            className="h-full bg-foreground transition-all duration-300"
                            style={{ width: `${section.completion}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs tracking-wide uppercase text-muted">Recommendations</p>
                    {contentMetrics.recommendations.slice(0, 4).map((item) => (
                      <p key={item} className="text-xs text-muted leading-relaxed">
                        - {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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
