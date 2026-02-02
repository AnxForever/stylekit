"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import { styles, getStyleBySlug } from "@/lib/styles";
import { ChevronDown, Copy, Check, Download } from "lucide-react";

type ExportFormat = "trae" | "cursor" | "claude-code" | "prompt";

export function QuickExport() {
  const [selectedSlug, setSelectedSlug] = useState(styles[0].slug);
  const [format, setFormat] = useState<ExportFormat>("claude-code");
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t, locale } = useI18n();

  const selectedStyle = useMemo(
    () => getStyleBySlug(selectedSlug),
    [selectedSlug]
  );

  const getContent = () => {
    if (!selectedStyle) return "";
    const { aiRules, globalCss, name } = selectedStyle;

    switch (format) {
      case "trae":
        return aiRules;
      case "cursor":
        return `# ${name} Design Style Rules\n\n${aiRules}`;
      case "claude-code":
        return `# ${name} Design Style Guidelines

## Overview
This document defines the design rules for ${name} style. All generated code must strictly follow these guidelines.

## AI Instructions
${aiRules}

## Global CSS
\`\`\`css
${globalCss}
\`\`\`

## Usage
When generating UI components, always:
1. Follow the design patterns specified above
2. Use the color palette defined in the rules
3. Apply the correct spacing, typography, and interaction styles
4. Verify the output matches the style requirements`;
      case "prompt":
        return `${t("export.promptPrefix")}\n\n${t("export.styleLabel")}${name}\n\n${aiRules}\n\n## ${t("export.globalCss")}\n\n\`\`\`css\n${globalCss}\n\`\`\``;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = getContent();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = getContent();
    let filename: string;
    switch (format) {
      case "trae":
        filename = "trae-rules.md";
        break;
      case "cursor":
        filename = ".cursorrules";
        break;
      case "claude-code":
        filename = "CLAUDE.md";
        break;
      case "prompt":
        filename = `${selectedStyle?.name.toLowerCase().replace(/\s+/g, "-")}-prompt.md`;
        break;
    }

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatOptions: { key: ExportFormat; label: string; file: string }[] = [
    { key: "claude-code", label: "Claude Code", file: "CLAUDE.md" },
    { key: "cursor", label: "Cursor", file: ".cursorrules" },
    { key: "trae", label: "Trae", file: "trae-rules.md" },
    { key: "prompt", label: "Prompt", file: ".md" },
  ];

  return (
    <div className="border border-border bg-zinc-50 dark:bg-zinc-900/50">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-xs tracking-widest uppercase text-muted mb-1">
          {t("quickExport.label")}
        </p>
        <h3 className="text-lg font-medium">{t("quickExport.title")}</h3>
      </div>

      {/* Style Selector + Format Tabs */}
      <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row gap-4">
        {/* Style Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-border bg-background hover:border-foreground/50 transition-colors text-sm"
          >
            <span>
              {selectedStyle?.name}{" "}
              <span className="text-muted">({selectedStyle?.nameEn})</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 border border-border bg-background shadow-lg max-h-64 overflow-y-auto">
              {styles.map((style) => (
                <button
                  key={style.slug}
                  onClick={() => {
                    setSelectedSlug(style.slug);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                    selectedSlug === style.slug
                      ? "bg-zinc-100 dark:bg-zinc-800"
                      : ""
                  }`}
                >
                  {style.name}{" "}
                  <span className="text-muted">({style.nameEn})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Format Tabs */}
        <div className="flex border border-border">
          {formatOptions.map((f) => (
            <button
              key={f.key}
              onClick={() => setFormat(f.key)}
              className={`px-3 py-2 text-xs tracking-wide transition-colors ${
                format === f.key
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              title={f.file}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="px-6 py-4 max-h-48 overflow-y-auto">
        <pre className="text-xs text-muted whitespace-pre-wrap line-clamp-6">
          {getContent().slice(0, 500)}
          {getContent().length > 500 && "..."}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex border-t border-border">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm tracking-wide hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-r border-border"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {t("export.copied")}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              {t("export.copy")}
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm tracking-wide hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          {t("export.download")}
        </button>
      </div>
    </div>
  );
}
