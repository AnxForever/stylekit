"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/analyzer";

const PLACEHOLDER_CODE = `<div className="bg-white rounded-2xl shadow-xl p-6">
  <h2 className="text-xl font-semibold text-gray-900">Card Title</h2>
  <p className="text-gray-600 mt-2">Some description text here.</p>
  <button className="mt-4 bg-indigo-500 text-white rounded-xl px-4 py-2 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
    Click me
  </button>
</div>`;

export function AnalyzeForm({
  onResult,
}: {
  onResult: (result: AnalysisResult) => void;
}) {
  const [code, setCode] = useState("");
  const [packageJson, setPackageJson] = useState("");
  const [tailwindConfig, setTailwindConfig] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProjectContext, setShowProjectContext] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          ...(packageJson.trim() ? { packageJson } : {}),
          ...(tailwindConfig.trim() ? { tailwindConfig } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const result: AnalysisResult = await res.json();
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="code-input"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Component Code (JSX/TSX with Tailwind classes)
        </label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={PLACEHOLDER_CODE}
          rows={12}
          className="w-full rounded-lg border border-border bg-card p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowProjectContext(!showProjectContext)}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {showProjectContext ? "- Hide" : "+ Show"} project context inputs (optional)
      </button>

      {showProjectContext && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="pkg-input"
              className="block text-sm font-medium text-foreground mb-1"
            >
              package.json (optional)
            </label>
            <textarea
              id="pkg-input"
              value={packageJson}
              onChange={(e) => setPackageJson(e.target.value)}
              placeholder='{"dependencies": { ... }}'
              rows={4}
              className="w-full rounded-lg border border-border bg-card p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            />
          </div>
          <div>
            <label
              htmlFor="tailwind-input"
              className="block text-sm font-medium text-foreground mb-1"
            >
              tailwind.config (optional)
            </label>
            <textarea
              id="tailwind-input"
              value={tailwindConfig}
              onChange={(e) => setTailwindConfig(e.target.value)}
              placeholder={`module.exports = {\n  theme: { extend: { colors: { brand: "#111827" } } }\n}`}
              rows={4}
              className="w-full rounded-lg border border-border bg-card p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !code.trim()}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze Style"}
      </button>
    </form>
  );
}
