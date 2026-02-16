"use client";

import { useState } from "react";
import {
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Palette,
  Type,
  Maximize,
  Square,
} from "lucide-react";
import type { MigrationResult } from "@/lib/migration/types";
import type { StyleTokens } from "@/lib/styles/tokens";

interface Props {
  result: MigrationResult;
}

function tokensToCssVariables(tokens: Partial<StyleTokens>): string {
  const lines: string[] = [":root {"];

  if (tokens.colors) {
    const c = tokens.colors;
    lines.push(`  /* Colors */`);
    lines.push(`  --sk-bg-primary: ${extractColor(c.background.primary)};`);
    lines.push(`  --sk-bg-secondary: ${extractColor(c.background.secondary)};`);
    lines.push(`  --sk-text-primary: ${extractColor(c.text.primary)};`);
    lines.push(`  --sk-text-secondary: ${extractColor(c.text.secondary)};`);
    lines.push(`  --sk-text-muted: ${extractColor(c.text.muted)};`);
  }

  if (tokens.border) {
    lines.push(`  /* Borders */`);
    lines.push(`  --sk-border-radius: ${tokens.border.radius};`);
  }

  lines.push("}");
  return lines.join("\n");
}

function extractColor(twClass: string): string {
  const match = twClass.match(/\[(.+?)\]/);
  return match?.[1] ?? twClass;
}

export function MigrationResultView({ result }: Props) {
  const [warningsOpen, setWarningsOpen] = useState(false);
  const [unmappedOpen, setUnmappedOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(content: string, key: string) {
    navigator.clipboard.writeText(content);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const jsonExport = JSON.stringify(result.tokens, null, 2);
  const cssExport = tokensToCssVariables(result.tokens);

  return (
    <div className="space-y-6">
      {/* Coverage bar */}
      <div className="rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Migration Coverage
          </span>
          <span
            className={`text-sm font-bold ${
              result.coverage >= 70
                ? "text-green-600 dark:text-green-400"
                : result.coverage >= 40
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
            }`}
          >
            {result.coverage}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              result.coverage >= 70
                ? "bg-green-500"
                : result.coverage >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${result.coverage}%` }}
          />
        </div>
      </div>

      {/* Token preview grid */}
      {result.tokens.colors && (
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Colors</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ColorSwatch
              label="Background"
              value={result.tokens.colors.background.primary}
            />
            <ColorSwatch
              label="Secondary"
              value={result.tokens.colors.background.secondary}
            />
            <ColorSwatch
              label="Text"
              value={result.tokens.colors.text.primary}
            />
            <ColorSwatch
              label="Accent"
              value={result.tokens.colors.background.accent[0] ?? "bg-blue-500"}
            />
          </div>
        </div>
      )}

      {result.tokens.typography && (
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Typography</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heading</span>
              <code className="text-xs bg-muted/30 px-2 py-0.5 rounded">
                {result.tokens.typography.heading}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Body</span>
              <code className="text-xs bg-muted/30 px-2 py-0.5 rounded">
                {result.tokens.typography.body}
              </code>
            </div>
          </div>
        </div>
      )}

      {result.tokens.border && (
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Borders</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Border Radius</span>
            <code className="text-xs bg-muted/30 px-2 py-0.5 rounded">
              {result.tokens.border.radius}
            </code>
          </div>
        </div>
      )}

      {result.tokens.spacing && (
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Maximize className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Spacing</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Section</span>
              <code className="text-xs bg-muted/30 px-2 py-0.5 rounded">
                {result.tokens.spacing.section}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card</span>
              <code className="text-xs bg-muted/30 px-2 py-0.5 rounded">
                {result.tokens.spacing.card}
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="rounded-lg border border-yellow-200 dark:border-yellow-800">
          <button
            type="button"
            onClick={() => setWarningsOpen(!warningsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-yellow-700 dark:text-yellow-300"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {result.warnings.length} Warning{result.warnings.length > 1 ? "s" : ""}
            </span>
            {warningsOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {warningsOpen && (
            <ul className="px-4 pb-3 space-y-1">
              {result.warnings.map((w, i) => (
                <li key={i} className="text-xs text-yellow-600 dark:text-yellow-400">
                  {w}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Unmapped */}
      {result.unmapped.length > 0 && (
        <div className="rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setUnmappedOpen(!unmappedOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground"
          >
            <span>
              {result.unmapped.length} Unmapped propert{result.unmapped.length > 1 ? "ies" : "y"}
            </span>
            {unmappedOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {unmappedOpen && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {result.unmapped.map((u, i) => (
                <code
                  key={i}
                  className="text-xs bg-muted/30 px-2 py-0.5 rounded text-muted-foreground"
                >
                  {u}
                </code>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Export */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleCopy(jsonExport, "json")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        >
          {copied === "json" ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          Copy JSON
        </button>
        <button
          type="button"
          onClick={() => handleCopy(cssExport, "css")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        >
          {copied === "css" ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          Copy CSS Variables
        </button>
        <button
          type="button"
          onClick={() => {
            const blob = new Blob([jsonExport], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "stylekit-tokens.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download JSON
        </button>
      </div>
    </div>
  );
}

function ColorSwatch({ label, value }: { label: string; value: string }) {
  const colorMatch = value.match(/\[(.+?)\]/);
  const color = colorMatch?.[1];

  return (
    <div className="space-y-1.5">
      <div
        className="w-full h-10 rounded-md border border-border"
        style={color ? { backgroundColor: color } : undefined}
      />
      <div className="text-xs text-muted-foreground">{label}</div>
      <code className="text-xs text-muted-foreground block truncate">{value}</code>
    </div>
  );
}
