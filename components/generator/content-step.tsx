"use client";

import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";
import type { StoredCustomStyle } from "@/lib/style-creator/types";
import type {
  FieldDefinition,
  SectionConfig,
  TemplateDefinition,
} from "@/lib/generator/types";
import type { GeneratorScenarioPack } from "@/lib/generator/scenario-packs";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Code2,
  ClipboardCopy,
  ExternalLink,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback, type ChangeEvent } from "react";

interface ContentStepProps {
  templateDef: TemplateDefinition;
  sections: SectionConfig[];
  globalContent: { siteName: string; siteDescription: string };
  scenarioPacks: GeneratorScenarioPack[];
  appliedScenarioId: string | null;
  onUpdateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
  onUpdateSectionContent: (sectionId: string, fieldId: string, value: string) => void;
  onUpdateGlobalContent: (content: { siteName: string; siteDescription: string }) => void;
  onApplyScenarioPack: (scenarioId: string) => void;
  onResetContent: () => void;
  onSaveScenarioPack: (name: string, description: string) => void;
  onDeleteScenarioPack: (scenarioId: string) => void;
  onUpdateScenarioPack: (scenarioId: string, name: string, description: string) => void;
  onExportScenarioPacks: () => void;
  onImportScenarioPacks: (jsonContent: string) => void;
  previewHtml: string;
  isPreviewPending?: boolean;
  previewError?: string | null;
  onReorderSection: (fromIndex: number, toIndex: number) => void;
  allStyles: DesignStyle[];
  customStyles: StoredCustomStyle[];
  currentStyleSlug: string | null;
  currentCustomId: string | null;
  onStyleChange: (slug: string, isCustom: boolean) => void;
}

type PreviewViewport = "desktop" | "tablet" | "mobile";

interface PreviewViewportOption {
  id: PreviewViewport;
  label: string;
  hint: string;
  width: string;
}

function getPreviewViewportOptions(locale: "zh" | "en"): PreviewViewportOption[] {
  if (locale === "zh") {
    return [
      { id: "desktop", label: "桌面", hint: "1440px 画布", width: "100%" },
      { id: "tablet", label: "平板", hint: "820px 画布", width: "820px" },
      { id: "mobile", label: "手机", hint: "390px 画布", width: "390px" },
    ];
  }

  return [
    { id: "desktop", label: "Desktop", hint: "1440px canvas", width: "100%" },
    { id: "tablet", label: "Tablet", hint: "820px canvas", width: "820px" },
    { id: "mobile", label: "Mobile", hint: "390px canvas", width: "390px" },
  ];
}

const LIST_FIELD_PATTERN = /(links|tags|categories|social|navitems|chartlabels|seriesvalues|columns)/i;
const STABLE_FIELD_PATTERN = /(email|version|rowcount|charttype|date|value|change|count|type)/i;

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function appendDetailSentence(base: string, detail: string): string {
  const trimmedBase = base.trim();
  if (!trimmedBase) return "";
  if (!detail.trim()) return trimmedBase;
  return trimmedBase.endsWith(".")
    ? `${trimmedBase} ${detail}`
    : `${trimmedBase}. ${detail}`;
}

function buildEnrichedFieldValue(options: {
  fieldId: string;
  fieldType: FieldDefinition["type"];
  currentValue: string;
  defaultValue: string;
  siteName: string;
  siteDescription: string;
  locale: "zh" | "en";
}): string {
  const {
    fieldId,
    fieldType,
    currentValue,
    defaultValue,
    siteName,
    siteDescription,
    locale,
  } = options;

  const currentTrimmed = currentValue.trim();
  const fallback = defaultValue.trim();
  const base = currentTrimmed || fallback;
  if (!base) return currentValue;

  const normalizedFieldId = fieldId.toLowerCase();
  if (LIST_FIELD_PATTERN.test(normalizedFieldId) || STABLE_FIELD_PATTERN.test(normalizedFieldId)) {
    return currentTrimmed ? currentTrimmed : fallback;
  }

  const shortThreshold = fieldType === "textarea" ? 80 : 28;
  if (currentTrimmed.length >= shortThreshold) {
    return currentTrimmed;
  }

  const normalizedName = siteName.trim() || (locale === "zh" ? "你的品牌" : "your brand");
  const normalizedDescription =
    siteDescription.trim() || (locale === "zh" ? "清晰的业务价值" : "clear business outcomes");

  if (normalizedFieldId.includes("cta") || normalizedFieldId.includes("button")) {
    if (locale === "zh") {
      return currentTrimmed ? `${currentTrimmed}，立即行动` : `从 ${normalizedName} 开始`;
    }
    return currentTrimmed
      ? `${currentTrimmed} with confidence`
      : `Start with ${normalizedName}`;
  }

  if (
    normalizedFieldId.includes("headline") ||
    normalizedFieldId.includes("title") ||
    normalizedFieldId.includes("tagline")
  ) {
    return base.includes(normalizedName) ? base : `${base} - ${normalizedName}`;
  }

  if (
    normalizedFieldId.includes("desc") ||
    normalizedFieldId.includes("bio") ||
    normalizedFieldId.includes("summary") ||
    normalizedFieldId.includes("excerpt") ||
    normalizedFieldId.includes("subtitle") ||
    fieldType === "textarea"
  ) {
    if (locale === "zh") {
      return appendDetailSentence(base, `围绕${normalizedDescription}展开。`);
    }
    return appendDetailSentence(base, `Built around ${normalizedDescription}.`);
  }

  if (locale === "zh") {
    return base.length < shortThreshold ? `${base}（${normalizedDescription}）` : base;
  }

  return base.length < shortThreshold
    ? `${base} (${normalizedDescription})`
    : base;
}

function getFieldSignal(
  value: string,
  fieldType: FieldDefinition["type"],
  locale: "zh" | "en"
): { chars: number; words: number; label: string; tone: string } {
  const trimmed = value.trim();
  const chars = trimmed.length;
  const words = countWords(trimmed);

  if (chars === 0) {
    return { chars, words, label: locale === "zh" ? "空白" : "empty", tone: "text-red-500" };
  }
  if (chars < 18) {
    return { chars, words, label: locale === "zh" ? "偏短" : "thin", tone: "text-amber-600" };
  }
  if (fieldType === "textarea" && chars < 70) {
    return {
      chars,
      words,
      label: locale === "zh" ? "需要更深入" : "needs depth",
      tone: "text-amber-600",
    };
  }
  if (fieldType === "text" && chars > 90) {
    return {
      chars,
      words,
      label: locale === "zh" ? "可再精简" : "condense",
      tone: "text-amber-600",
    };
  }
  return { chars, words, label: locale === "zh" ? "良好" : "strong", tone: "text-emerald-600" };
}

export function ContentStep({
  templateDef,
  sections,
  globalContent,
  scenarioPacks,
  appliedScenarioId,
  onUpdateSection,
  onUpdateSectionContent,
  onUpdateGlobalContent,
  onApplyScenarioPack,
  onResetContent,
  onSaveScenarioPack,
  onDeleteScenarioPack,
  onUpdateScenarioPack,
  onExportScenarioPacks,
  onImportScenarioPacks,
  previewHtml,
  isPreviewPending = false,
  previewError = null,
  onReorderSection,
  allStyles,
  customStyles,
  currentStyleSlug,
  currentCustomId,
  onStyleChange,
}: ContentStepProps) {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";
  const previewViewportOptions = getPreviewViewportOptions(locale);
  const uiText = isZh
    ? {
        scenarioPresets: "场景预设",
        scenarioDesc: "可一键应用起步文案，并保存团队常用预设。",
        resetDefaults: "恢复默认",
        exportJson: "导出 JSON",
        importJson: "导入 JSON",
        customTag: "自定义",
        builtinTag: "内置",
        edit: "编辑",
        delete: "删除",
        presetName: "预设名称",
        presetDescription: "预设描述",
        save: "保存",
        cancel: "取消",
        saveCurrentAsPreset: "将当前内容保存为新预设",
        newPresetName: "新预设名称",
        presetDescriptionOptional: "预设描述（可选）",
        savePreset: "保存预设",
        siteNameWords: "站点名称",
        descriptionWords: "描述",
        wordsUnit: "词",
        fieldsFilled: "已填字段",
        sectionCopyControls: "区块文案控制",
        autoEnrich: "自动补全",
        charsUnit: "字符",
        previewTitle: "预览",
        previewFrameTitle: "预览",
      }
    : {
        scenarioPresets: "Scenario presets",
        scenarioDesc: "Apply starter copy and save team-specific presets.",
        resetDefaults: "Reset defaults",
        exportJson: "Export JSON",
        importJson: "Import JSON",
        customTag: "Custom",
        builtinTag: "Built-in",
        edit: "Edit",
        delete: "Delete",
        presetName: "Preset name",
        presetDescription: "Preset description",
        save: "Save",
        cancel: "Cancel",
        saveCurrentAsPreset: "Save current content as a new preset",
        newPresetName: "New preset name",
        presetDescriptionOptional: "Preset description (optional)",
        savePreset: "Save preset",
        siteNameWords: "Site name",
        descriptionWords: "Description",
        wordsUnit: "words",
        fieldsFilled: "fields filled",
        sectionCopyControls: "Section copy controls",
        autoEnrich: "Auto enrich",
        charsUnit: "chars",
        previewTitle: "Preview",
        previewFrameTitle: "Preview",
      };

  const [expandedSection, setExpandedSection] = useState<string | null>(
    sections[0]?.id || null
  );
  const [scenarioNameDraft, setScenarioNameDraft] = useState("");
  const [scenarioDescriptionDraft, setScenarioDescriptionDraft] = useState("");
  const [editingScenarioId, setEditingScenarioId] = useState<string | null>(null);
  const [editingScenarioName, setEditingScenarioName] = useState("");
  const [editingScenarioDescription, setEditingScenarioDescription] = useState("");
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleSaveScenario = () => {
    const normalizedName = scenarioNameDraft.trim();
    if (!normalizedName) return;
    onSaveScenarioPack(normalizedName, scenarioDescriptionDraft.trim());
    setScenarioNameDraft("");
    setScenarioDescriptionDraft("");
  };

  const handleStartScenarioEdit = (pack: GeneratorScenarioPack) => {
    setEditingScenarioId(pack.id);
    setEditingScenarioName(pack.name);
    setEditingScenarioDescription(pack.description);
  };

  const handleCancelScenarioEdit = () => {
    setEditingScenarioId(null);
    setEditingScenarioName("");
    setEditingScenarioDescription("");
  };

  const handleCommitScenarioEdit = () => {
    if (!editingScenarioId) return;
    const normalizedName = editingScenarioName.trim();
    if (!normalizedName) return;
    onUpdateScenarioPack(editingScenarioId, normalizedName, editingScenarioDescription.trim());
    handleCancelScenarioEdit();
  };

  const handleImportFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const jsonContent = await file.text();
    onImportScenarioPacks(jsonContent);
    event.target.value = "";
  };

  const handleOpenInNewTab = useCallback(() => {
    if (!previewHtml) return;
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, [previewHtml]);

  const handleCopyCode = useCallback(async () => {
    if (!previewHtml) return;
    try {
      await navigator.clipboard.writeText(previewHtml);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = previewHtml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  }, [previewHtml]);

  const currentStyleName = currentCustomId
    ? customStyles.find((s) => s.id === currentCustomId)?.name ?? "Custom"
    : allStyles.find((s) => s.slug === currentStyleSlug)?.name ?? "---";

  const styleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showStyleDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(event.target as Node)) {
        setShowStyleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showStyleDropdown]);

  const handleEnrichSection = (section: SectionConfig) => {
    const sectionDef = templateDef.sections.find((item) => item.id === section.id);
    if (!sectionDef) return;

    const nextContent: Record<string, string> = { ...section.content };
    let changed = false;

    for (const field of sectionDef.fields) {
      const currentValue = nextContent[field.id] || "";
      const enrichedValue = buildEnrichedFieldValue({
        fieldId: field.id,
        fieldType: field.type,
        currentValue,
        defaultValue: field.defaultValue,
        siteName: globalContent.siteName,
        siteDescription: globalContent.siteDescription,
        locale,
      });

      if (enrichedValue !== currentValue) {
        nextContent[field.id] = enrichedValue;
        changed = true;
      }
    }

    if (changed) {
      onUpdateSection(section.id, { content: nextContent });
    }
  };

  useEffect(() => {
    if (!iframeRef.current || !previewHtml) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(previewHtml);
    doc.close();
  }, [previewHtml]);

  const activeViewportOption = previewViewportOptions.find(
    (option) => option.id === previewViewport
  ) ?? previewViewportOptions[0];

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-2">{t("generator.editContent")}</h2>
      <p className="text-muted mb-6">
        {isZh ? templateDef.name : `${templateDef.nameEn} - ${templateDef.name}`}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">
          {scenarioPacks.length > 0 && (
            <div className="border border-border p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted">
                    {uiText.scenarioPresets}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {uiText.scenarioDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onResetContent}
                  className="text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                >
                  {uiText.resetDefaults}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onExportScenarioPacks}
                  className="text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                >
                  {uiText.exportJson}
                </button>
                <button
                  type="button"
                  onClick={() => importInputRef.current?.click()}
                  className="text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                >
                  {uiText.importJson}
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={handleImportFileChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                {scenarioPacks.map((pack) => {
                  const isActive = appliedScenarioId === pack.id;
                  const isCustom = pack.source === "custom";
                  const isEditing = editingScenarioId === pack.id;
                  const displayName = locale === "zh" ? pack.nameZh ?? pack.name : pack.name;
                  const displayDescription = locale === "zh"
                    ? pack.descriptionZh ?? pack.description
                    : pack.description;

                  return (
                    <div
                      key={pack.id}
                      className={`border px-3 py-2 transition-colors ${
                        isActive
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onApplyScenarioPack(pack.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">{displayName}</p>
                          <span className="text-[10px] uppercase tracking-wider text-muted">
                            {isCustom ? uiText.customTag : uiText.builtinTag}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-1">{displayDescription}</p>
                      </button>

                      {isCustom && (
                        <div className="mt-2 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => handleStartScenarioEdit(pack)}
                            className="text-xs text-muted hover:text-foreground transition-colors"
                          >
                            {uiText.edit}
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteScenarioPack(pack.id)}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors"
                          >
                            {uiText.delete}
                          </button>
                        </div>
                      )}

                      {isCustom && isEditing && (
                        <div className="mt-3 border-t border-border pt-3 space-y-2">
                          <input
                            type="text"
                            value={editingScenarioName}
                            onChange={(event) => setEditingScenarioName(event.target.value)}
                            placeholder={uiText.presetName}
                            className="w-full px-3 py-2 border border-border bg-transparent text-xs focus:outline-none focus:border-foreground transition-colors"
                          />
                          <input
                            type="text"
                            value={editingScenarioDescription}
                            onChange={(event) => setEditingScenarioDescription(event.target.value)}
                            placeholder={uiText.presetDescription}
                            className="w-full px-3 py-2 border border-border bg-transparent text-xs focus:outline-none focus:border-foreground transition-colors"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleCommitScenarioEdit}
                              disabled={!editingScenarioName.trim()}
                              className="text-xs px-2 py-1 border border-border hover:border-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {uiText.save}
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelScenarioEdit}
                              className="text-xs px-2 py-1 border border-border hover:border-foreground transition-colors"
                            >
                              {uiText.cancel}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <p className="text-xs tracking-wide uppercase text-muted">
                  {uiText.saveCurrentAsPreset}
                </p>
                <input
                  type="text"
                  value={scenarioNameDraft}
                  onChange={(event) => setScenarioNameDraft(event.target.value)}
                  placeholder={uiText.newPresetName}
                  className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="text"
                  value={scenarioDescriptionDraft}
                  onChange={(event) => setScenarioDescriptionDraft(event.target.value)}
                  placeholder={uiText.presetDescriptionOptional}
                  className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  type="button"
                  onClick={handleSaveScenario}
                  disabled={!scenarioNameDraft.trim()}
                  className="px-3 py-2 text-xs border border-border hover:border-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uiText.savePreset}
                </button>
              </div>
            </div>
          )}

          <div className="border border-border p-4">
            <p className="text-xs tracking-widest uppercase text-muted mb-3">
              {t("generator.siteName")}
            </p>
            <input
              type="text"
              value={globalContent.siteName}
              onChange={(event) =>
                onUpdateGlobalContent({ ...globalContent, siteName: event.target.value })
              }
              className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
              placeholder={t("generator.siteName")}
            />
            <div className="mt-3">
              <p className="text-xs tracking-widest uppercase text-muted mb-2">
                {t("generator.siteDescription")}
              </p>
              <input
                type="text"
                value={globalContent.siteDescription}
                onChange={(event) =>
                  onUpdateGlobalContent({
                    ...globalContent,
                    siteDescription: event.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                placeholder={t("generator.siteDescription")}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted">
              <span>{uiText.siteNameWords}: {countWords(globalContent.siteName)} {uiText.wordsUnit}</span>
              <span>{uiText.descriptionWords}: {countWords(globalContent.siteDescription)} {uiText.wordsUnit}</span>
            </div>
          </div>

          {sections.map((section, sectionIndex) => {
            const sectionDef = templateDef.sections.find((item) => item.id === section.id);
            if (!sectionDef) return null;

            const isExpanded = expandedSection === section.id;
            const totalFieldCount = Object.keys(section.content).length;
            const filledFieldCount = Object.values(section.content).filter(
              (value) => value.trim().length > 0
            ).length;
            const completionPercent = totalFieldCount === 0
              ? 0
              : Math.round((filledFieldCount / totalFieldCount) * 100);

            return (
              <div key={section.id} className="border border-border">
                <button
                  type="button"
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={section.enabled}
                        onChange={(event) => {
                          event.stopPropagation();
                          onUpdateSection(section.id, { enabled: !section.enabled });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-600 peer-checked:bg-foreground rounded-full transition-colors relative">
                        <div
                          className={`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-transform ${
                            section.enabled ? "translate-x-4" : "translate-x-0.5"
                          }`}
                        />
                      </div>
                    </label>
                    <div className="text-left">
                      <p className="font-medium text-sm">{section.name}</p>
                      <p className="text-xs text-muted">
                        {isZh ? section.description : section.nameEn}
                      </p>
                      <p className="text-[11px] text-muted mt-1">
                        {filledFieldCount}/{totalFieldCount} {uiText.fieldsFilled} ({completionPercent}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={sectionIndex === 0}
                      onClick={(event) => {
                        event.stopPropagation();
                        onReorderSection(sectionIndex, sectionIndex - 1);
                      }}
                      className="p-1 text-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title={isZh ? "上移" : "Move up"}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={sectionIndex === sections.length - 1}
                      onClick={(event) => {
                        event.stopPropagation();
                        onReorderSection(sectionIndex, sectionIndex + 1);
                      }}
                      className="p-1 text-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title={isZh ? "下移" : "Move down"}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted" />
                    )}
                  </div>
                </button>

                {isExpanded && section.enabled && (
                  <div className="border-t border-border p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] tracking-wide uppercase text-muted">
                        {uiText.sectionCopyControls}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleEnrichSection(section)}
                        className="text-[11px] px-2.5 py-1 border border-border hover:border-foreground transition-colors"
                      >
                        {uiText.autoEnrich}
                      </button>
                    </div>
                    {sectionDef.fields.map((field) => {
                      const fieldValue = section.content[field.id] || "";
                      const fieldSignal = getFieldSignal(fieldValue, field.type, locale);

                      return (
                        <div key={field.id}>
                          <label className="text-xs text-muted mb-1 block">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              value={fieldValue}
                              onChange={(event) =>
                                onUpdateSectionContent(section.id, field.id, event.target.value)
                              }
                              placeholder={field.placeholder}
                              rows={3}
                              className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={fieldValue}
                              onChange={(event) =>
                                onUpdateSectionContent(section.id, field.id, event.target.value)
                              }
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                            />
                          )}
                          <p className={`mt-1 text-[11px] ${fieldSignal.tone}`}>
                            {fieldSignal.chars} {uiText.charsUnit} - {fieldSignal.words} {uiText.wordsUnit} - {fieldSignal.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-widest uppercase text-muted">
                {uiText.previewTitle}
              </p>
              <div className="relative" ref={styleDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowStyleDropdown((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] border border-border hover:border-foreground transition-colors"
                >
                  <span className="max-w-[120px] truncate">{currentStyleName}</span>
                  <ChevronDown className="w-3 h-3 text-muted" />
                </button>
                {showStyleDropdown && (
                  <div className="absolute top-full left-0 mt-1 z-50 w-56 max-h-64 overflow-y-auto border border-border bg-background shadow-lg">
                    {allStyles.map((style) => (
                      <button
                        key={style.slug}
                        type="button"
                        onClick={() => {
                          onStyleChange(style.slug, false);
                          setShowStyleDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors ${
                          currentStyleSlug === style.slug ? "bg-foreground/5 font-medium" : ""
                        }`}
                      >
                        {isZh ? style.name : style.nameEn}
                      </button>
                    ))}
                    {customStyles.length > 0 && (
                      <div className="border-t border-border">
                        {customStyles.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => {
                              onStyleChange(style.id, true);
                              setShowStyleDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors ${
                              currentCustomId === style.id ? "bg-foreground/5 font-medium" : ""
                            }`}
                          >
                            {style.name}
                            <span className="ml-1.5 text-[10px] text-muted uppercase">custom</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="inline-flex border border-border overflow-hidden">
                {previewViewportOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPreviewViewport(option.id)}
                    className={`px-2.5 py-1 text-[11px] transition-colors ${
                      previewViewport === option.id
                        ? "bg-foreground text-background"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowSource((prev) => !prev)}
                className={`p-1.5 border border-border transition-colors ${
                  showSource ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
                title={isZh ? "查看源码" : "View source"}
              >
                <Code2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleOpenInNewTab}
                disabled={!previewHtml}
                className="p-1.5 border border-border text-muted hover:text-foreground transition-colors disabled:opacity-30"
                title={isZh ? "新标签页打开" : "Open in new tab"}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                className="p-1.5 border border-border text-muted hover:text-foreground transition-colors"
                title={isZh ? "全屏" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-muted mb-3">
            {activeViewportOption.hint}
          </p>
          {previewError && (
            <p className="text-xs text-red-500 mb-3">{previewError}</p>
          )}
          {isPreviewPending && !previewError && (
            <p className="text-xs text-muted mb-3">{t("generator.previewGenerating")}</p>
          )}
          <div className="border border-border bg-zinc-100 overflow-auto p-3">
            {showSource ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-1 text-[11px] border border-border bg-background hover:border-foreground transition-colors"
                >
                  <ClipboardCopy className="w-3 h-3" />
                  {codeCopied ? (isZh ? "已复制" : "Copied") : (isZh ? "复制" : "Copy")}
                </button>
                <pre
                  className="overflow-auto text-xs leading-relaxed p-3 bg-white dark:bg-zinc-950 text-foreground"
                  style={{
                    height: "70vh",
                    minHeight: "500px",
                    maxHeight: "90vh",
                  }}
                >
                  <code>{previewHtml}</code>
                </pre>
              </div>
            ) : (
              <div
                className="mx-auto border border-border bg-white overflow-hidden transition-[width] duration-300"
                style={{
                  width: activeViewportOption.width,
                  maxWidth: "100%",
                  height: "70vh",
                  minHeight: "500px",
                }}
              >
                <iframe
                  ref={iframeRef}
                  title={uiText.previewFrameTitle}
                  className="w-full h-full"
                  sandbox="allow-same-origin"
                  style={{ border: "none" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="w-full h-full bg-white overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-zinc-100 border-b border-border">
              <p className="text-xs tracking-widest uppercase text-muted">
                {uiText.previewTitle}
              </p>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 border border-border text-muted hover:text-foreground transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
            {showSource ? (
              <pre className="overflow-auto text-xs leading-relaxed p-4 bg-white dark:bg-zinc-950 text-foreground h-[calc(100vh-48px)]">
                <code>{previewHtml}</code>
              </pre>
            ) : (
              <iframe
                title={uiText.previewFrameTitle}
                srcDoc={previewHtml}
                className="w-full h-[calc(100vh-48px)]"
                sandbox="allow-same-origin"
                style={{ border: "none" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
