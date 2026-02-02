"use client";

import { useState, useCallback, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { hasStyleTokens } from "@/lib/styles/tokens-registry";
import { getArchetypesByCategory } from "@/lib/archetypes";
import {
  generatePrompt,
} from "@/lib/prompt-builder/generator";
import {
  PAGE_TYPE_OPTIONS,
  TECH_STACK_OPTIONS,
  COMP_LIB_OPTIONS,
  INTERACTION_OPTIONS,
  type PromptConfig,
} from "@/lib/prompt-builder/types";
import { Copy, Check, Download, Wand2, FileJson } from "lucide-react";

export default function PromptBuilderPage() {
  const { t, locale } = useI18n();
  const styles = getAllStylesMeta();

  const [config, setConfig] = useState<PromptConfig>({
    style: styles[0]?.slug || "",
    pageType: "landing",
    techStack: "nextjs",
    componentLib: "shadcn",
    interactionLevel: "standard",
    includeTokens: true,
    includeExamples: true,
    includeUIPlan: false,
    archetypeId: undefined,
  });

  const [copied, setCopied] = useState(false);

  // Get available archetypes for the selected page type
  const availableArchetypes = useMemo(
    () => getArchetypesByCategory(config.pageType),
    [config.pageType]
  );

  const prompt = useMemo(() => {
    if (!config.style) return null;
    try {
      return generatePrompt(config);
    } catch {
      return null;
    }
  }, [config]);

  const handleCopy = useCallback(async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  const handleDownload = useCallback(() => {
    if (!prompt) return;
    const blob = new Blob([prompt.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.style}-${config.pageType}-prompt.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [prompt, config]);

  const selectedMeta = styles.find((s) => s.slug === config.style);
  const hasTokens = hasStyleTokens(config.style);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Prompt Generator
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
              {t("promptBuilder.title")}
            </h1>
            <p className="text-lg text-muted max-w-2xl">
              {t("promptBuilder.description")}
            </p>
          </div>
        </section>

        {/* Builder Content */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Config Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* Style Selector */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                    {t("promptBuilder.style")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((style) => (
                      <button
                        key={style.slug}
                        onClick={() => setConfig((c) => ({ ...c, style: style.slug }))}
                        className={`px-3 py-2 text-sm text-left transition-colors ${
                          config.style === style.slug
                            ? "bg-foreground text-background"
                            : "border border-border hover:border-foreground"
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page Type */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                    {t("promptBuilder.pageType")}
                  </label>
                  <select
                    value={config.pageType}
                    onChange={(e) => setConfig((c) => ({ ...c, pageType: e.target.value as PromptConfig["pageType"] }))}
                    className="w-full px-4 py-2 border border-border bg-transparent focus:outline-none focus:border-foreground"
                  >
                    {PAGE_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {locale === "zh" ? opt.labelZh : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                    {t("promptBuilder.techStack")}
                  </label>
                  <select
                    value={config.techStack}
                    onChange={(e) => setConfig((c) => ({ ...c, techStack: e.target.value as PromptConfig["techStack"] }))}
                    className="w-full px-4 py-2 border border-border bg-transparent focus:outline-none focus:border-foreground"
                  >
                    {TECH_STACK_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {locale === "zh" ? opt.labelZh : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Component Library */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                    {t("promptBuilder.componentLib")}
                  </label>
                  <select
                    value={config.componentLib}
                    onChange={(e) => setConfig((c) => ({ ...c, componentLib: e.target.value as PromptConfig["componentLib"] }))}
                    className="w-full px-4 py-2 border border-border bg-transparent focus:outline-none focus:border-foreground"
                  >
                    {COMP_LIB_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {locale === "zh" ? opt.labelZh : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interaction Level */}
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                    {t("promptBuilder.interactionLevel")}
                  </label>
                  <div className="flex gap-2">
                    {INTERACTION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setConfig((c) => ({ ...c, interactionLevel: opt.value }))}
                        className={`flex-1 px-3 py-2 text-sm transition-colors ${
                          config.interactionLevel === opt.value
                            ? "bg-foreground text-background"
                            : "border border-border hover:border-foreground"
                        }`}
                      >
                        {locale === "zh" ? opt.labelZh : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.includeTokens}
                      onChange={(e) => setConfig((c) => ({ ...c, includeTokens: e.target.checked }))}
                      disabled={!hasTokens}
                      className="w-4 h-4 border border-border bg-transparent"
                    />
                    <span className={`text-sm ${!hasTokens ? "text-muted" : ""}`}>
                      {t("promptBuilder.includeTokens")}
                      {!hasTokens && <span className="text-xs ml-1">(N/A)</span>}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.includeExamples}
                      onChange={(e) => setConfig((c) => ({ ...c, includeExamples: e.target.checked }))}
                      className="w-4 h-4 border border-border bg-transparent"
                    />
                    <span className="text-sm">{t("promptBuilder.includeExamples")}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.includeUIPlan}
                      onChange={(e) => setConfig((c) => ({ ...c, includeUIPlan: e.target.checked }))}
                      className="w-4 h-4 border border-border bg-transparent"
                    />
                    <span className="text-sm flex items-center gap-1.5">
                      <FileJson className="w-3.5 h-3.5" />
                      {locale === "zh" ? "输出 UI Plan JSON" : "Output UI Plan JSON"}
                    </span>
                  </label>
                </div>

                {/* Archetype Selector (shown when UI Plan is enabled) */}
                {config.includeUIPlan && availableArchetypes.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <label className="text-xs tracking-widest uppercase text-muted mb-3 block">
                      {locale === "zh" ? "布局原型" : "Layout Archetype"}
                    </label>
                    <select
                      value={config.archetypeId || ""}
                      onChange={(e) => setConfig((c) => ({ ...c, archetypeId: e.target.value || undefined }))}
                      className="w-full px-4 py-2 border border-border bg-transparent focus:outline-none focus:border-foreground"
                    >
                      <option value="">
                        {locale === "zh" ? "自动选择" : "Auto select"}
                      </option>
                      {availableArchetypes.map((arch) => (
                        <option key={arch.id} value={arch.id}>
                          {arch.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted mt-2">
                      {config.archetypeId
                        ? availableArchetypes.find((a) => a.id === config.archetypeId)?.description
                        : locale === "zh"
                        ? "AI 将根据需求自动选择合适的布局"
                        : "AI will auto-select an appropriate layout"}
                    </p>
                  </div>
                )}

                {/* Current config summary */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 text-sm">
                  <p className="flex items-center gap-2 text-muted mb-2">
                    <Wand2 className="w-4 h-4" />
                    {t("promptBuilder.summary")}
                  </p>
                  <p className="font-medium">
                    {selectedMeta?.name} × {PAGE_TYPE_OPTIONS.find((o) => o.value === config.pageType)?.[locale === "zh" ? "labelZh" : "labelEn"]}
                  </p>
                </div>
              </div>

              {/* Output Panel */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs tracking-widest uppercase text-muted">
                    {t("promptBuilder.output")}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      disabled={!prompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors disabled:opacity-40"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {t("export.download")}
                    </button>
                    <button
                      onClick={handleCopy}
                      disabled={!prompt}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-40"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          {t("export.copied")}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {t("promptBuilder.copy")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="border border-border bg-zinc-50 dark:bg-zinc-900 h-[600px] overflow-y-auto">
                  {prompt ? (
                    <pre className="p-4 md:p-6 text-sm font-mono whitespace-pre-wrap">
                      {prompt.content}
                    </pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted text-sm">
                      {t("promptBuilder.selectStyle")}
                    </div>
                  )}
                </div>

                {/* Usage hint */}
                <div className="mt-4 p-4 border border-dashed border-border text-sm text-muted">
                  <p className="font-medium mb-2">{t("promptBuilder.usageHint")}</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>{t("promptBuilder.step1")}</li>
                    <li>{t("promptBuilder.step2")}</li>
                    <li>{t("promptBuilder.step3")}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
