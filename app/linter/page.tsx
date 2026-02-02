"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { lintCode, type LintResult } from "@/lib/linter";
import { Copy, Check, AlertTriangle, CheckCircle2, Code2, FileWarning } from "lucide-react";

export default function LinterPage() {
  const { t } = useI18n();
  const styles = getAllStylesMeta();
  const [selectedStyle, setSelectedStyle] = useState(styles[0]?.slug || "");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<LintResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLint = useCallback(() => {
    if (!code.trim() || !selectedStyle) return;
    const lintResult = lintCode(selectedStyle, code);
    setResult(lintResult);
  }, [code, selectedStyle]);

  const handleCopyFix = useCallback(async () => {
    if (!result?.fixPrompt) return;
    await navigator.clipboard.writeText(result.fixPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const selectedMeta = styles.find((s) => s.slug === selectedStyle);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Style Checker
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
              {t("linter.title")}
            </h1>
            <p className="text-lg text-muted max-w-2xl">
              {t("linter.description")}
            </p>
          </div>
        </section>

        {/* Linter Content */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            {/* Style Selector */}
            <div className="mb-8">
              <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                {t("linter.selectStyle")}
              </label>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <button
                    key={style.slug}
                    onClick={() => {
                      setSelectedStyle(style.slug);
                      setResult(null);
                    }}
                    className={`px-4 py-2 text-sm transition-colors ${
                      selectedStyle === style.slug
                        ? "bg-foreground text-background"
                        : "border border-border hover:border-foreground"
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor and Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Input */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs tracking-widest uppercase text-muted flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    {t("linter.input")}
                  </label>
                  <span className="text-xs text-muted">
                    JSX / Tailwind Classes
                  </span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setResult(null);
                  }}
                  placeholder={`<button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg p-4">\n  Click me\n</button>`}
                  className="w-full h-64 md:h-80 p-4 font-mono text-sm border border-border bg-zinc-50 dark:bg-zinc-900 resize-none focus:outline-none focus:border-foreground transition-colors"
                  spellCheck={false}
                />
                <button
                  onClick={handleLint}
                  disabled={!code.trim()}
                  className="mt-4 w-full px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {t("linter.check")}
                </button>
              </div>

              {/* Results Panel */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-xs tracking-widest uppercase text-muted flex items-center gap-2">
                    <FileWarning className="w-3.5 h-3.5" />
                    {t("linter.results")}
                  </label>
                  {result && (
                    <span className="text-xs text-muted ml-auto">
                      {result.stats.totalClasses} classes checked
                    </span>
                  )}
                </div>

                <div className="border border-border bg-zinc-50 dark:bg-zinc-900 h-64 md:h-80 overflow-y-auto">
                  {!result ? (
                    <div className="h-full flex items-center justify-center text-muted text-sm">
                      {t("linter.placeholder")}
                    </div>
                  ) : result.valid ? (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                      <p className="text-sm font-medium">{t("linter.noViolations")}</p>
                      <p className="text-xs text-muted">
                        {selectedMeta?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {result.violations.map((v, i) => (
                        <div key={i} className="p-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                v.severity === "error" ? "text-red-500" : "text-amber-500"
                              }`}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-mono font-medium">
                                {v.class}
                              </p>
                              <p className="text-xs text-muted mt-1">{v.reason}</p>
                              {v.line && (
                                <p className="text-[10px] text-muted mt-1">
                                  Line {v.line}
                                </p>
                              )}
                              {/* Show suggestion inline */}
                              {result.suggestions.find((s) => s.original === v.class) && (
                                <div className="mt-2 text-xs">
                                  <span className="text-muted">{t("linter.suggestion")}: </span>
                                  <code className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                    {result.suggestions.find((s) => s.original === v.class)?.replacement || t("linter.remove")}
                                  </code>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary bar */}
                {result && !result.valid && (
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted">
                    <span className="text-red-500">
                      {result.stats.violationCount} error{result.stats.violationCount !== 1 ? "s" : ""}
                    </span>
                    {result.stats.warningCount > 0 && (
                      <span className="text-amber-500">
                        {result.stats.warningCount} warning{result.stats.warningCount !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Fix Prompt */}
            {result && !result.valid && result.fixPrompt && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs tracking-widest uppercase text-muted">
                    {t("linter.fixPrompt")}
                  </label>
                  <button
                    onClick={handleCopyFix}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        {t("export.copied")}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        {t("linter.copyFix")}
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 md:p-6 border border-border bg-zinc-50 dark:bg-zinc-900 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                  {result.fixPrompt}
                </pre>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
