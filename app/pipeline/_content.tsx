"use client";

import { useState, useCallback, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import type {
  PipelineRun,
  PipelineRunRequest,
  PipelineStageName,
  PipelineStageStatus,
} from "@/lib/pipeline/types";
import { PIPELINE_STAGES } from "@/lib/pipeline/types";

type ViewState = "input" | "running" | "completed" | "failed";

function StageIcon({ status }: { status: PipelineStageStatus }) {
  if (status === "running") {
    return (
      <svg
        className="w-5 h-5 text-foreground animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    );
  }
  if (status === "completed") {
    return (
      <svg
        className="w-5 h-5 text-green-600 dark:text-green-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }
  if (status === "failed") {
    return (
      <svg
        className="w-5 h-5 text-red-600 dark:text-red-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    );
  }
  // pending / skipped
  return (
    <svg
      className="w-5 h-5 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function stageI18nKey(name: PipelineStageName): string {
  return `pipeline.stage.${name}`;
}

function unwrapPipelineRun(payload: unknown): PipelineRun | null {
  if (!payload || typeof payload !== "object") return null;

  const maybeWrapped = payload as { run?: unknown };
  if (maybeWrapped.run && typeof maybeWrapped.run === "object") {
    return maybeWrapped.run as PipelineRun;
  }

  const maybeRun = payload as Partial<PipelineRun>;
  if (
    typeof maybeRun.id === "string" &&
    typeof maybeRun.status === "string" &&
    Array.isArray(maybeRun.stages)
  ) {
    return maybeRun as PipelineRun;
  }

  return null;
}

export function PipelineContent() {
  const { t } = useI18n();
  const [viewState, setViewState] = useState<ViewState>("input");
  const [sourceUrl, setSourceUrl] = useState("");
  const [framework, setFramework] = useState<"html" | "react">("html");
  const [targetStyle, setTargetStyle] = useState("");
  const [pipelineRun, setPipelineRun] = useState<PipelineRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setViewState("running");
      setError(null);

      const body: PipelineRunRequest = {
        sourceUrl,
        target: {
          framework,
          ...(targetStyle ? { styleSlug: targetStyle } : {}),
        },
        output: { format: "zip" },
      };

      try {
        const res = await fetch("/api/pipeline/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        const payload = await res.json();
        const run = unwrapPipelineRun(payload);
        if (!run) {
          throw new Error("Invalid pipeline response payload");
        }
        setPipelineRun(run);

        if (run.status === "completed") {
          setViewState("completed");
        } else if (run.status === "failed") {
          setError(run.error || "Pipeline failed");
          setViewState("failed");
        } else {
          setViewState("running");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setViewState("failed");
      }
    },
    [sourceUrl, framework, targetStyle]
  );

  const handleRetry = useCallback(async () => {
    if (!pipelineRun) return;
    setViewState("running");
    setError(null);

    const failedStage = pipelineRun.stages.find((s) => s.status === "failed");

    try {
      const res = await fetch(`/api/pipeline/run/${pipelineRun.id}/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromStage: failedStage?.name || "extract",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Retry failed (${res.status})`);
      }

      const payload = await res.json();
      const run = unwrapPipelineRun(payload);
      if (!run) {
        throw new Error("Invalid pipeline retry response payload");
      }
      setPipelineRun(run);

      if (run.status === "completed") {
        setViewState("completed");
      } else if (run.status === "failed") {
        setError(run.error || "Pipeline failed");
        setViewState("failed");
      } else {
        setViewState("running");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setViewState("failed");
    }
  }, [pipelineRun]);

  useEffect(() => {
    if (viewState !== "running" || !pipelineRun?.id) return;
    if (pipelineRun.status === "completed" || pipelineRun.status === "failed") return;

    const intervalId = window.setInterval(async () => {
      try {
        const res = await fetch(`/api/pipeline/run/${pipelineRun.id}`, {
          cache: "no-store",
        });
        if (!res.ok) return;

        const payload = await res.json();
        const run = unwrapPipelineRun(payload);
        if (!run) return;

        setPipelineRun((prev) => {
          if (!prev) return run;
          if (prev.status === run.status && prev.updatedAt === run.updatedAt) {
            return prev;
          }
          return run;
        });

        if (run.status === "completed") {
          setViewState("completed");
          setError(null);
        } else if (run.status === "failed") {
          setViewState("failed");
          setError(run.error || "Pipeline failed");
        }
      } catch {
        // best-effort polling
      }
    }, 1500);

    return () => window.clearInterval(intervalId);
  }, [viewState, pipelineRun?.id, pipelineRun?.status]);

  const handleReset = useCallback(() => {
    setViewState("input");
    setPipelineRun(null);
    setError(null);
    setSourceUrl("");
    setFramework("html");
    setTargetStyle("");
  }, []);

  // -- Stages list used in running/completed/failed views --
  const stages = pipelineRun?.stages ?? PIPELINE_STAGES.map((name) => ({
    name,
    status: "pending" as PipelineStageStatus,
    durationMs: 0,
  }));

  // -- Input View --
  if (viewState === "input") {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Pipeline
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("pipeline.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("pipeline.description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source URL */}
          <div>
            <label
              htmlFor="source-url"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("pipeline.sourceUrl")}
            </label>
            <input
              id="source-url"
              type="url"
              required
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder={t("pipeline.sourceUrlPlaceholder")}
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-colors"
            />
          </div>

          {/* Framework */}
          <div>
            <label
              htmlFor="framework"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("pipeline.framework")}
            </label>
            <select
              id="framework"
              value={framework}
              onChange={(e) => setFramework(e.target.value as "html" | "react")}
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-colors"
            >
              <option value="html">HTML</option>
              <option value="react">React</option>
            </select>
          </div>

          {/* Target Style (optional) */}
          <div>
            <label
              htmlFor="target-style"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("pipeline.targetStyle")}
            </label>
            <input
              id="target-style"
              type="text"
              value={targetStyle}
              onChange={(e) => setTargetStyle(e.target.value)}
              placeholder={t("pipeline.targetStylePlaceholder")}
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
          >
            {t("pipeline.start")}
          </button>
        </form>
      </div>
    );
  }

  // -- Running View --
  if (viewState === "running") {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t("pipeline.running")}
          </h1>
          <p className="text-muted-foreground">{sourceUrl}</p>
        </div>

        <div className="space-y-4">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="flex items-center gap-4 px-4 py-3 border border-border rounded-lg"
            >
              <StageIcon status={stage.status} />
              <span className="text-sm font-medium text-foreground flex-1">
                {t(stageI18nKey(stage.name) as Parameters<typeof t>[0])}
              </span>
              {stage.durationMs > 0 && (
                <span className="text-xs text-muted-foreground">
                  {formatDuration(stage.durationMs)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -- Completed View --
  if (viewState === "completed" && pipelineRun) {
    const matchedStyle = pipelineRun.artifacts.matches?.[0];
    const migration = pipelineRun.artifacts.migration;
    const generated = pipelineRun.artifacts.generated;

    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t("pipeline.completed")}
          </h1>
          <p className="text-muted-foreground">{sourceUrl}</p>
        </div>

        {/* Stages */}
        <div className="space-y-4 mb-8">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="flex items-center gap-4 px-4 py-3 border border-border rounded-lg"
            >
              <StageIcon status={stage.status} />
              <span className="text-sm font-medium text-foreground flex-1">
                {t(stageI18nKey(stage.name) as Parameters<typeof t>[0])}
              </span>
              {stage.durationMs > 0 && (
                <span className="text-xs text-muted-foreground">
                  {formatDuration(stage.durationMs)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="rounded-lg border border-border divide-y divide-border mb-8">
          {matchedStyle && (
            <>
              <div className="flex justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("pipeline.matchedStyle")}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {matchedStyle.name || matchedStyle.slug}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("pipeline.confidence")}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {Math.round(matchedStyle.overallSimilarity)}%
                </span>
              </div>
            </>
          )}
          {migration && (
            <div className="flex justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">
                {t("pipeline.coverage")}
              </span>
              <span className="text-sm font-medium text-foreground">
                {Math.round(migration.coverage)}%
              </span>
            </div>
          )}
          {generated && (
            <div className="flex justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">
                {t("pipeline.generatedName")}
              </span>
              <span className="text-sm font-medium text-foreground">
                {generated.name}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {pipelineRun.artifacts.downloadUrl && (
            <a
              href={pipelineRun.artifacts.downloadUrl}
              className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
            >
              {t("pipeline.download")}
            </a>
          )}
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-border text-sm font-medium tracking-wide rounded-lg hover:border-foreground transition-colors"
          >
            {t("pipeline.startNew")}
          </button>
        </div>
      </div>
    );
  }

  // -- Failed View --
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
          {t("pipeline.failed")}
        </h1>
        <p className="text-muted-foreground">{sourceUrl}</p>
      </div>

      {/* Stages */}
      <div className="space-y-4 mb-8">
        {stages.map((stage) => (
          <div
            key={stage.name}
            className="flex items-center gap-4 px-4 py-3 border border-border rounded-lg"
          >
            <StageIcon status={stage.status} />
            <span className="text-sm font-medium text-foreground flex-1">
              {t(stageI18nKey(stage.name) as Parameters<typeof t>[0])}
            </span>
            {stage.durationMs > 0 && (
              <span className="text-xs text-muted-foreground">
                {formatDuration(stage.durationMs)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-3 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-700 dark:text-red-300 mb-8">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide rounded-lg hover:bg-foreground/90 transition-colors"
        >
          {t("pipeline.retry")}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-border text-sm font-medium tracking-wide rounded-lg hover:border-foreground transition-colors"
        >
          {t("pipeline.startNew")}
        </button>
      </div>
    </div>
  );
}
