"use client";

import { useState } from "react";
import { Upload, FileCode, Loader2 } from "lucide-react";
import { muiExample, antExample, chakraExample } from "@/lib/migration/examples";
import type { MigrationResult } from "@/lib/migration/types";
import { MigrationResultView } from "@/components/migration/migration-result";

type SourceType = "material-ui" | "ant-design" | "chakra-ui";

const SOURCE_OPTIONS: Array<{ value: SourceType; label: string; shortLabel: string }> = [
  { value: "material-ui", label: "Material UI", shortLabel: "MUI" },
  { value: "ant-design", label: "Ant Design", shortLabel: "Ant" },
  { value: "chakra-ui", label: "Chakra UI", shortLabel: "Chakra" },
];

const EXAMPLES: Record<SourceType, string> = {
  "material-ui": muiExample,
  "ant-design": antExample,
  "chakra-ui": chakraExample,
};

export function ThemeImporter() {
  const [sourceType, setSourceType] = useState<SourceType>("material-ui");
  const [jsonInput, setJsonInput] = useState("");
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleLoadExample() {
    setJsonInput(EXAMPLES[sourceType]);
    setResult(null);
    setError(null);
  }

  async function handleImport() {
    if (!jsonInput.trim()) {
      setError("Please paste a theme configuration JSON.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/import-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: sourceType, themeConfig: jsonInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Import failed.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Source selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Source Design System
        </label>
        <div className="flex gap-2">
          {SOURCE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setSourceType(opt.value);
                setResult(null);
                setError(null);
              }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                ${
                  sourceType === opt.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:bg-muted/50"
                }
              `}
            >
              <FileCode className="w-4 h-4" />
              <span className="hidden sm:inline">{opt.label}</span>
              <span className="sm:hidden">{opt.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* JSON input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            Theme Configuration (JSON)
          </label>
          <button
            type="button"
            onClick={handleLoadExample}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Load Example
          </button>
        </div>
        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setError(null);
          }}
          placeholder={`Paste your ${SOURCE_OPTIONS.find((o) => o.value === sourceType)?.label} theme JSON here...`}
          className="w-full h-64 rounded-lg border border-border bg-background px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-y"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Import button */}
      <button
        type="button"
        onClick={handleImport}
        disabled={loading || !jsonInput.trim()}
        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium transition-colors hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        Import Theme
      </button>

      {/* Results */}
      {result && <MigrationResultView result={result} />}
    </div>
  );
}
