"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  Check,
  Download,
  ChevronDown,
  ChevronUp,
  Gauge,
  Sparkles,
  Send,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { exportBlendedTokens } from "@/lib/styles/blend-engine";
import { styles } from "@/lib/styles/index";
import type { GeneratedStyle } from "@/lib/ai-generator";
import { useUser } from "@/lib/auth/use-user";
import {
  buildSubmissionFormFromGeneratedStyle,
} from "@/lib/ai-generator/submission";

interface StyleGenResultProps {
  result: GeneratedStyle & { candidates?: GeneratedStyle[] };
}

export function StyleGenResult({ result }: StyleGenResultProps) {
  const { t } = useI18n();
  const { user, loading: userLoading } = useUser();
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [showTokens, setShowTokens] = useState(false);
  const [activeCandidateIndex, setActiveCandidateIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    slug?: string;
    id?: string;
    error?: string;
  } | null>(null);

  const candidates = useMemo(
    () =>
      Array.isArray(result.candidates) && result.candidates.length > 0
        ? result.candidates
        : [result],
    [result]
  );
  const activeResult = candidates[activeCandidateIndex] ?? candidates[0];

  useEffect(() => {
    setActiveCandidateIndex(0);
    setSubmitResult(null);
  }, [result]);

  const getStyleLabel = (slug: string) =>
    styles.find((style) => style.slug === slug)?.nameEn || slug;

  async function handleCopy(format: "css" | "json" | "tailwind") {
    const exported = exportBlendedTokens(activeResult.tokens, format);
    await navigator.clipboard.writeText(exported);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  }

  function handleDownload() {
    const json = exportBlendedTokens(activeResult.tokens, "json");
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeResult.name.toLowerCase().replace(/\s+/g, "-")}-tokens.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function fetchExistingStyleSlugs(): Promise<Set<string>> {
    try {
      const response = await fetch("/api/styles", { cache: "no-store" });
      if (!response.ok) {
        return new Set();
      }

      const payload = (await response.json()) as {
        styles?: Array<{ slug?: string }>;
      };
      const slugs = payload.styles
        ?.map((item) => item.slug?.trim().toLowerCase())
        .filter((slug): slug is string => Boolean(slug));
      return new Set(slugs ?? []);
    } catch {
      return new Set();
    }
  }

  async function handleSubmitCommunity() {
    if (!user) {
      setSubmitResult({
        success: false,
        error: t("submit.signInToSubmit"),
      });
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);
    try {
      const existingSlugs = await fetchExistingStyleSlugs();
      const payload = buildSubmissionFormFromGeneratedStyle(activeResult, {
        existingSlugs,
      });

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await response.json().catch(() => null)) as
        | { id?: string; slug?: string; error?: string }
        | null;
      if (!response.ok) {
        setSubmitResult({
          success: false,
          error: body?.error ?? `HTTP ${response.status}`,
        });
        return;
      }

      setSubmitResult({
        success: true,
        slug: body?.slug ?? payload.slug,
        id: body?.id,
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        error: (error as Error).message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const confidenceColor =
    activeResult.confidence >= 50
      ? "text-green-600 dark:text-green-400"
      : activeResult.confidence >= 25
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-red-600 dark:text-red-400";

  return (
    <div className="space-y-6">
      {candidates.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {t("aiGen.candidates")}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {candidates.map((candidate, index) => (
              <button
                key={`${candidate.name}-${index}`}
                type="button"
                onClick={() => {
                  setActiveCandidateIndex(index);
                  setSubmitResult(null);
                }}
                className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                  activeCandidateIndex === index
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">
                    {t("aiGen.candidate")} {index + 1}
                  </span>
                  <span className="text-muted">
                    {Math.round(candidate.confidence)}%
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] text-muted">
                  {candidate.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{activeResult.name}</h3>
          <p className="text-sm text-muted mt-1">{activeResult.description}</p>
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-medium ${confidenceColor}`}>
          <Gauge className="w-4 h-4" />
          {Math.round(activeResult.confidence)}%
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
          className={`p-6 ${activeResult.tokens.colors.background.primary}`}
        >
          <div className="space-y-4">
            {/* Card preview */}
            <div
              className={`${activeResult.tokens.colors.background.secondary} ${activeResult.tokens.border.width} ${activeResult.tokens.border.color} ${activeResult.tokens.border.radius} ${activeResult.tokens.shadow.md} ${activeResult.tokens.spacing.card}`}
            >
              <h4
                className={`${activeResult.tokens.typography.heading} ${activeResult.tokens.typography.sizes.h3} ${activeResult.tokens.colors.text.primary} mb-2`}
              >
                Sample Card
              </h4>
              <p
                className={`${activeResult.tokens.typography.body} ${activeResult.tokens.typography.sizes.body} ${activeResult.tokens.colors.text.secondary}`}
              >
                This card demonstrates the generated style tokens applied to a real component.
              </p>
            </div>

            {/* Button preview */}
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 ${activeResult.tokens.colors.button.primary} ${activeResult.tokens.border.radius} ${activeResult.tokens.typography.sizes.body} font-medium ${activeResult.tokens.interaction.transition}`}
              >
                Primary
              </button>
              <button
                className={`px-4 py-2 ${activeResult.tokens.colors.button.secondary} ${activeResult.tokens.border.radius} ${activeResult.tokens.typography.sizes.body} font-medium ${activeResult.tokens.interaction.transition}`}
              >
                Secondary
              </button>
            </div>

            {/* Input preview */}
            <input
              type="text"
              placeholder="Sample input field..."
              readOnly
              className={`w-full px-3 py-2 ${activeResult.tokens.colors.background.primary} ${activeResult.tokens.border.width} ${activeResult.tokens.border.color} ${activeResult.tokens.border.radius} ${activeResult.tokens.typography.sizes.body} ${activeResult.tokens.colors.text.primary} placeholder:${activeResult.tokens.colors.text.muted}`}
            />
          </div>
        </div>
      </div>

      {/* Source Styles */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("aiGen.sourceStyles")}
        </p>
        <div className="space-y-2">
          {activeResult.sourceStyles.map(({ slug, weight }) => {
            const percentage = Math.round(weight * 100);
            return (
              <div
                key={slug}
                className="rounded-lg border border-border bg-muted/5 px-3 py-2"
              >
                <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium">{getStyleLabel(slug)}</span>
                  <span className="text-muted">
                    {percentage}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted/30">
                  <div
                    aria-label={`${getStyleLabel(slug)} influence ${percentage}%`}
                    className="h-full bg-foreground/75 transition-[width] duration-500"
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reasoning */}
      {activeResult.reasoning && activeResult.reasoning.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {t("aiGen.reasoning")}
          </p>
          <ul className="space-y-1.5 rounded-lg border border-border bg-muted/10 p-3">
            {activeResult.reasoning.map((hint, index) => (
              <li key={`${hint}-${index}`} className="text-xs text-muted leading-relaxed">
                {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Signals */}
      {activeResult.insights && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {t("aiGen.signals")}
          </p>
          <div className="space-y-2 rounded-lg border border-border bg-muted/10 p-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted">{t("aiGen.signalBase")}:</span>
              <span className="font-medium">
                {activeResult.insights.baseStyle ? getStyleLabel(activeResult.insights.baseStyle) : "-"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted">{t("aiGen.signalKeywords")}:</span>
              {activeResult.insights.matchedKeywords.length > 0 ? (
                activeResult.insights.matchedKeywords.slice(0, 6).map((keyword) => (
                  <span
                    key={`kw-${keyword}`}
                    className="rounded-full border border-border px-2 py-0.5"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted">{t("aiGen.signalNegativeKeywords")}:</span>
              {activeResult.insights.negativeKeywords.length > 0 ? (
                activeResult.insights.negativeKeywords.slice(0, 6).map((keyword) => (
                  <span
                    key={`nkw-${keyword}`}
                    className="rounded-full border border-red-300/70 px-2 py-0.5 text-red-600 dark:text-red-400"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted">{t("aiGen.signalDetectedStyles")}:</span>
              {activeResult.insights.detectedStyles.length > 0 ? (
                activeResult.insights.detectedStyles.slice(0, 4).map((slug) => (
                  <span
                    key={`detected-${slug}`}
                    className="rounded-full border border-border px-2 py-0.5"
                  >
                    {getStyleLabel(slug)}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted">{t("aiGen.signalAvoidedStyles")}:</span>
              {activeResult.insights.avoidedStyles.length > 0 ? (
                activeResult.insights.avoidedStyles.slice(0, 4).map((slug) => (
                  <span
                    key={`avoided-${slug}`}
                    className="rounded-full border border-red-300/70 px-2 py-0.5 text-red-600 dark:text-red-400"
                  >
                    {getStyleLabel(slug)}
                  </span>
                ))
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        </div>
      )}

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
              {JSON.stringify(activeResult.tokens, null, 2)}
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

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {t("aiGen.submit")}
        </p>
        <div className="rounded-lg border border-border bg-muted/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t("aiGen.submit")}
              </p>
              <p className="text-xs text-muted">
                {t("aiGen.submitHint")}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSubmitCommunity}
              disabled={!user || userLoading || submitting || submitResult?.success === true}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting
                ? t("aiGen.submitting")
                : submitResult?.success
                  ? t("aiGen.submitted")
                  : t("aiGen.submitNow")}
            </button>
          </div>

          {!user && !userLoading && (
            <p className="mt-3 text-xs text-muted">
              {t("aiGen.submitRequiresLogin")}{" "}
              <Link href="/login" className="underline hover:text-foreground">
                {t("auth.signIn")}
              </Link>
            </p>
          )}

          {submitResult?.success && (
            <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-2 text-xs text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-300">
              {t("aiGen.submitSuccess")}
              {submitResult.id ? ` #${submitResult.id}` : ""}
              {submitResult.slug ? ` (${t("aiGen.submitSlug")}: ${submitResult.slug})` : ""}
            </div>
          )}

          {submitResult && !submitResult.success && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
              {t("aiGen.submitFailurePrefix")} {submitResult.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
