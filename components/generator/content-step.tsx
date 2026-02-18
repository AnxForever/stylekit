"use client";

import { useI18n } from "@/lib/i18n/context";
import type { SectionConfig, TemplateDefinition } from "@/lib/generator/types";
import type { GeneratorScenarioPack } from "@/lib/generator/scenario-packs";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect, type ChangeEvent } from "react";

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
}: ContentStepProps) {
  const { t } = useI18n();

  const [expandedSection, setExpandedSection] = useState<string | null>(
    sections[0]?.id || null
  );
  const [scenarioNameDraft, setScenarioNameDraft] = useState("");
  const [scenarioDescriptionDraft, setScenarioDescriptionDraft] = useState("");
  const [editingScenarioId, setEditingScenarioId] = useState<string | null>(null);
  const [editingScenarioName, setEditingScenarioName] = useState("");
  const [editingScenarioDescription, setEditingScenarioDescription] = useState("");

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

  useEffect(() => {
    if (!iframeRef.current || !previewHtml) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(previewHtml);
    doc.close();
  }, [previewHtml]);

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-2">{t("generator.editContent")}</h2>
      <p className="text-muted mb-6">{templateDef.name} - {templateDef.nameEn}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">
          {scenarioPacks.length > 0 && (
            <div className="border border-border p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted">
                    Scenario presets
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Apply starter copy and save team-specific presets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onResetContent}
                  className="text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                >
                  Reset defaults
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onExportScenarioPacks}
                  className="text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                >
                  Export JSON
                </button>
                <button
                  type="button"
                  onClick={() => importInputRef.current?.click()}
                  className="text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                >
                  Import JSON
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
                          <p className="text-sm font-medium">{pack.name}</p>
                          <span className="text-[10px] uppercase tracking-wider text-muted">
                            {isCustom ? "Custom" : "Built-in"}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-1">{pack.description}</p>
                      </button>

                      {isCustom && (
                        <div className="mt-2 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => handleStartScenarioEdit(pack)}
                            className="text-xs text-muted hover:text-foreground transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteScenarioPack(pack.id)}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {isCustom && isEditing && (
                        <div className="mt-3 border-t border-border pt-3 space-y-2">
                          <input
                            type="text"
                            value={editingScenarioName}
                            onChange={(event) => setEditingScenarioName(event.target.value)}
                            placeholder="Preset name"
                            className="w-full px-3 py-2 border border-border bg-transparent text-xs focus:outline-none focus:border-foreground transition-colors"
                          />
                          <input
                            type="text"
                            value={editingScenarioDescription}
                            onChange={(event) => setEditingScenarioDescription(event.target.value)}
                            placeholder="Preset description"
                            className="w-full px-3 py-2 border border-border bg-transparent text-xs focus:outline-none focus:border-foreground transition-colors"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleCommitScenarioEdit}
                              disabled={!editingScenarioName.trim()}
                              className="text-xs px-2 py-1 border border-border hover:border-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelScenarioEdit}
                              className="text-xs px-2 py-1 border border-border hover:border-foreground transition-colors"
                            >
                              Cancel
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
                  Save current content as a new preset
                </p>
                <input
                  type="text"
                  value={scenarioNameDraft}
                  onChange={(event) => setScenarioNameDraft(event.target.value)}
                  placeholder="New preset name"
                  className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="text"
                  value={scenarioDescriptionDraft}
                  onChange={(event) => setScenarioDescriptionDraft(event.target.value)}
                  placeholder="Preset description (optional)"
                  className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  type="button"
                  onClick={handleSaveScenario}
                  disabled={!scenarioNameDraft.trim()}
                  className="px-3 py-2 text-xs border border-border hover:border-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save preset
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
          </div>

          {sections.map((section) => {
            const sectionDef = templateDef.sections.find((item) => item.id === section.id);
            if (!sectionDef) return null;

            const isExpanded = expandedSection === section.id;

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
                      <p className="text-xs text-muted">{section.nameEn}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </button>

                {isExpanded && section.enabled && (
                  <div className="border-t border-border p-4 space-y-3">
                    {sectionDef.fields.map((field) => (
                      <div key={field.id}>
                        <label className="text-xs text-muted mb-1 block">
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            value={section.content[field.id] || ""}
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
                            value={section.content[field.id] || ""}
                            onChange={(event) =>
                              onUpdateSectionContent(section.id, field.id, event.target.value)
                            }
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">
            {t("generator.preview")}
          </p>
          {previewError && (
            <p className="text-xs text-red-500 mb-3">{previewError}</p>
          )}
          {isPreviewPending && !previewError && (
            <p className="text-xs text-muted mb-3">{t("generator.previewGenerating")}</p>
          )}
          <div className="border border-border bg-white overflow-hidden" style={{ height: "600px" }}>
            <iframe
              ref={iframeRef}
              title="Preview"
              className="w-full h-full"
              sandbox="allow-same-origin"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
