"use client";

import { useI18n } from "@/lib/i18n/context";
import type { TemplateType, OutputFormat } from "@/lib/generator/types";
import { FileText, Briefcase, BookOpen, LayoutDashboard, Code, FileCode } from "lucide-react";

interface TemplateStepProps {
  selectedTemplate: TemplateType;
  selectedFormat: OutputFormat;
  onSelect: (type: TemplateType) => void;
  onSelectFormat: (format: OutputFormat) => void;
}

const templates: {
  type: TemplateType;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
  available: boolean;
}[] = [
  {
    type: "landing",
    labelKey: "generator.landing",
    descKey: "generator.landingDesc",
    icon: <FileText className="w-6 h-6" />,
    available: true,
  },
  {
    type: "portfolio",
    labelKey: "generator.portfolio",
    descKey: "generator.portfolioDesc",
    icon: <Briefcase className="w-6 h-6" />,
    available: true,
  },
  {
    type: "blog",
    labelKey: "templates.typeBlog",
    descKey: "templates.description",
    icon: <BookOpen className="w-6 h-6" />,
    available: false,
  },
  {
    type: "dashboard",
    labelKey: "templates.typeDashboard",
    descKey: "templates.description",
    icon: <LayoutDashboard className="w-6 h-6" />,
    available: false,
  },
];

const outputFormats: {
  format: OutputFormat;
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
}[] = [
  {
    format: "html",
    labelKey: "generator.htmlFormat",
    descKey: "generator.htmlFormatDesc",
    icon: <FileCode className="w-5 h-5" />,
  },
  {
    format: "react",
    labelKey: "generator.reactFormat",
    descKey: "generator.reactFormatDesc",
    icon: <Code className="w-5 h-5" />,
  },
];

export function TemplateStep({ selectedTemplate, selectedFormat, onSelect, onSelectFormat }: TemplateStepProps) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-2">{t("generator.selectTemplate")}</h2>
      <p className="text-muted mb-6">{t("generator.selectTemplateDesc")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mb-10">
        {templates.map((template) => {
          const isSelected = template.type === selectedTemplate;
          const isDisabled = !template.available;

          return (
            <button
              key={template.type}
              onClick={() => template.available && onSelect(template.type)}
              disabled={isDisabled}
              className={`group text-left p-6 border transition-all ${
                isDisabled
                  ? "border-border opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "border-foreground ring-2 ring-foreground ring-offset-2"
                  : "border-border hover:border-foreground"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : "bg-zinc-100 dark:bg-zinc-800 text-muted"
                  }`}
                >
                  {template.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{t(template.labelKey as any)}</p>
                    {isSelected && (
                      <span className="text-xs px-2 py-0.5 bg-foreground text-background">
                        {t("generator.selected")}
                      </span>
                    )}
                    {isDisabled && (
                      <span className="text-xs px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-muted">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">{t(template.descKey as any)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Output Format Selection */}
      <h3 className="text-lg font-medium mb-2">{t("generator.outputFormat")}</h3>
      <p className="text-muted text-sm mb-4">{t("generator.selectFormatDesc")}</p>

      <div className="flex flex-wrap gap-3 max-w-3xl">
        {outputFormats.map((item) => {
          const isSelected = item.format === selectedFormat;

          return (
            <button
              key={item.format}
              onClick={() => onSelectFormat(item.format)}
              className={`flex items-center gap-3 px-4 py-3 border transition-all ${
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground"
              }`}
            >
              {item.icon}
              <div className="text-left">
                <p className="font-medium text-sm">{t(item.labelKey as any)}</p>
                <p className={`text-xs ${isSelected ? "text-background/70" : "text-muted"}`}>
                  {t(item.descKey as any)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
