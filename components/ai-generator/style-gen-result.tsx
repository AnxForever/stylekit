"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Download,
  ChevronDown,
  ChevronUp,
  Gauge,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { exportBlendedTokens } from "@/lib/styles/blend-engine";
import { styles } from "@/lib/styles/index";
import type { GeneratedStyle } from "@/lib/ai-generator";

interface StyleGenResultProps {
  result: GeneratedStyle;
}

export function StyleGenResult({ result }: StyleGenResultProps) {
  const { t } = useI18n();
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [showTokens, setShowTokens] = useState(false);

  async function handleCopy(format: "css" | "json" | "tailwind") {
    const exported = exportBlendedTokens(result.tokens, format);
    await navigator.clipboard.writeText(exported);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  }

  function handleDownload() {
    const json = exportBlendedTokens(result.tokens, "json");
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.name.toLowerCase().replace(/\s+/g, "-")}-tokens.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const confidenceColor =
    result.confidence >= 50
      ? "text-green-600 dark:text-green-400"
      : result.confidence >= 25
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-red-600 dark:text-red-400";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{result.name}</h3>
          <p className="text-sm text-muted mt-1">{result.description}</p>
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-medium ${confidenceColor}`}>
          <Gauge className="w-4 h-4" />
          {Math.round(result.confidence)}%
        </div>
      </div>

      {/* Live Preview */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-2 border-b border-border bg-muted/10">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {t("aiGen.preview")}
          </p>
        </div>
        <div
          className={`p-6 ${result.tokens.colors.background.primary}`}
        >
          <div className="space-y-4">
            {/* Card preview */}
            <div
              className={`${result.tokens.colors.background.secondary} ${result.tokens.border.width} ${result.tokens.border.color} ${result.tokens.border.radius} ${result.tokens.shadow.md} ${result.tokens.spacing.card}`}
            >
              <h4
                className={`${result.tokens.typography.heading} ${result.tokens.typography.sizes.h3} ${result.tokens.colors.text.primary} mb-2`}
              >
                Sample Card
              </h4>
              <p
                className={`${result.tokens.typography.body} ${result.tokens.typography.sizes.body} ${result.tokens.colors.text.secondary}`}
              >
                This card demonstrates the generated style tokens applied to a real component.
              </p>
            </div>

            {/* Button preview */}
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 ${result.tokens.colors.button.primary} ${result.tokens.border.radius} ${result.tokens.typography.sizes.body} font-medium ${result.tokens.interaction.transition}`}
              >
                Primary
              </button>
              <button
                className={`px-4 py-2 ${result.tokens.colors.button.secondary} ${result.tokens.border.radius} ${result.tokens.typography.sizes.body} font-medium ${result.tokens.interaction.transition}`}
              >
                Secondary
              </button>
            </div>

            {/* Input preview */}
            <input
              type="text"
              placeholder="Sample input field..."
              readOnly
              className={`w-full px-3 py-2 ${result.tokens.colors.background.primary} ${result.tokens.border.width} ${result.tokens.border.color} ${result.tokens.border.radius} ${result.tokens.typography.sizes.body} ${result.tokens.colors.text.primary} placeholder:${result.tokens.colors.text.muted}`}
            />
          </div>
        </div>
      </div>

      {/* Source Styles */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("aiGen.sourceStyles")}
        </p>
        <div className="flex flex-wrap gap-2">
          {result.sourceStyles.map(({ slug, weight }) => {
            const style = styles.find((s) => s.slug === slug);
            return (
              <div
                key={slug}
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full text-xs"
              >
                <span className="font-medium">{style?.nameEn || slug}</span>
                <span className="text-muted">
                  {Math.round(weight * 100)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Token Details (Collapsible) */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setShowTokens(!showTokens)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/10 transition-colors"
        >
          <span className="text-sm font-medium">
            {t("aiGen.tokenDetails")}
          </span>
          {showTokens ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>
        {showTokens && (
          <div className="border-t border-border p-4">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono text-muted">
              {JSON.stringify(result.tokens, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("aiGen.export")}
        </p>
        <div className="flex flex-wrap gap-2">
          {(["css", "json", "tailwind"] as const).map((format) => (
            <button
              key={format}
              onClick={() => handleCopy(format)}
              className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs font-medium hover:bg-muted/10 transition-colors"
            >
              {copiedFormat === format ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {format === "css"
                ? t("aiGen.exportCSS")
                : format === "json"
                  ? t("aiGen.exportJSON")
                  : t("aiGen.exportTailwind")}
            </button>
          ))}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-xs font-medium hover:bg-muted/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            {t("aiGen.download")}
          </button>
        </div>
      </div>
    </div>
  );
}
