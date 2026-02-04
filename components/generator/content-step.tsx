"use client";

import { useI18n } from "@/lib/i18n/context";
import type { TemplateDefinition, SectionConfig } from "@/lib/generator/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ContentStepProps {
  templateDef: TemplateDefinition;
  sections: SectionConfig[];
  globalContent: { siteName: string; siteDescription: string };
  onUpdateSection: (sectionId: string, updates: Partial<SectionConfig>) => void;
  onUpdateSectionContent: (sectionId: string, fieldId: string, value: string) => void;
  onUpdateGlobalContent: (content: { siteName: string; siteDescription: string }) => void;
  previewHtml: string;
}

export function ContentStep({
  templateDef,
  sections,
  globalContent,
  onUpdateSection,
  onUpdateSectionContent,
  onUpdateGlobalContent,
  previewHtml,
}: ContentStepProps) {
  const { t } = useI18n();
  const [expandedSection, setExpandedSection] = useState<string | null>(
    sections[0]?.id || null
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update preview iframe
  useEffect(() => {
    if (iframeRef.current && previewHtml) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(previewHtml);
        doc.close();
      }
    }
  }, [previewHtml]);

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-2">{t("generator.editContent")}</h2>
      <p className="text-muted mb-6">{templateDef.name} - {templateDef.nameEn}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Form */}
        <div className="space-y-4">
          {/* Global content */}
          <div className="border border-border p-4">
            <p className="text-xs tracking-widest uppercase text-muted mb-3">
              {t("generator.siteName")}
            </p>
            <input
              type="text"
              value={globalContent.siteName}
              onChange={(e) =>
                onUpdateGlobalContent({ ...globalContent, siteName: e.target.value })
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
                onChange={(e) =>
                  onUpdateGlobalContent({ ...globalContent, siteDescription: e.target.value })
                }
                className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                placeholder={t("generator.siteDescription")}
              />
            </div>
          </div>

          {/* Section editors */}
          {sections.map((section) => {
            const sectionDef = templateDef.sections.find((s) => s.id === section.id);
            if (!sectionDef) return null;

            const isExpanded = expandedSection === section.id;

            return (
              <div key={section.id} className="border border-border">
                {/* Section header */}
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={section.enabled}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateSection(section.id, { enabled: !section.enabled });
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-zinc-300 dark:bg-zinc-600 peer-checked:bg-foreground rounded-full transition-colors relative">
                        <div className={`absolute top-0.5 w-4 h-4 bg-background rounded-full transition-transform ${
                          section.enabled ? "translate-x-4" : "translate-x-0.5"
                        }`} />
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

                {/* Section fields */}
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
                            onChange={(e) =>
                              onUpdateSectionContent(section.id, field.id, e.target.value)
                            }
                            placeholder={field.placeholder}
                            rows={3}
                            className="w-full px-3 py-2 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={section.content[field.id] || ""}
                            onChange={(e) =>
                              onUpdateSectionContent(section.id, field.id, e.target.value)
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

        {/* Right: Preview */}
        <div className="lg:sticky lg:top-24 h-fit">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">
            {t("generator.preview")}
          </p>
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
