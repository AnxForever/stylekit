/**
 * Pipeline Orchestrator
 *
 * Coordinates the 6-stage pipeline: extract -> analyze -> match -> migrate -> generate -> export.
 * Each stage updates the run in the store and accumulates artifacts.
 */

import type {
  PipelineRun,
  PipelineContext,
  PipelineStageName,
  PipelineStageStatus,
} from "@/lib/pipeline/types";
import { STAGE_ORDER, PIPELINE_STAGES } from "@/lib/pipeline/types";
import { updatePipelineRun } from "@/lib/pipeline/store";
import {
  runExtractStage,
  runAnalyzeStage,
  runMatchStage,
  runMigrateStage,
  runGenerateStage,
  runExportStage,
} from "@/lib/pipeline/adapters";
import {
  trackPipelineStarted,
  trackPipelineStageCompleted,
  trackPipelineCompleted,
  trackPipelineFailed,
} from "@/lib/pipeline/events";

// ---------------------------------------------------------------------------
// Stage Runner
// ---------------------------------------------------------------------------

function updateStage(
  run: PipelineRun,
  stageName: PipelineStageName,
  status: PipelineStageStatus,
  durationMs?: number,
  error?: string,
): PipelineRun {
  const stages = run.stages.map((s) =>
    s.name === stageName
      ? {
          ...s,
          status,
          ...(durationMs !== undefined ? { durationMs } : {}),
          ...(error ? { error } : {}),
        }
      : s,
  );
  return updatePipelineRun(run.id, { stages });
}

async function runStage<T>(
  run: PipelineRun,
  stageName: PipelineStageName,
  fn: () => Promise<T>,
): Promise<{ run: PipelineRun; result: T }> {
  run = updateStage(run, stageName, "running");
  run = updatePipelineRun(run.id, { status: "running" });

  const start = Date.now();
  try {
    const result = await fn();
    const durationMs = Date.now() - start;
    run = updateStage(run, stageName, "completed", durationMs);
    trackPipelineStageCompleted(run.id, stageName, durationMs);
    return { run, result };
  } catch (err) {
    const durationMs = Date.now() - start;
    const message = err instanceof Error ? err.message : String(err);
    run = updateStage(run, stageName, "failed", durationMs, message);
    const taggedError =
      (err instanceof Error ? err : new Error(message)) as Error & {
        stageName?: PipelineStageName;
        runSnapshot?: PipelineRun;
      };
    taggedError.stageName = stageName;
    taggedError.runSnapshot = run;
    throw taggedError;
  }
}

// ---------------------------------------------------------------------------
// Main Orchestrator
// ---------------------------------------------------------------------------

export async function executePipeline(
  run: PipelineRun,
  fromStage?: PipelineStageName,
): Promise<PipelineRun> {
  const ctx: PipelineContext = { run };
  const startIndex = fromStage ? STAGE_ORDER[fromStage] : 0;

  // Mark skipped stages
  for (let i = 0; i < startIndex; i++) {
    const stageName = PIPELINE_STAGES[i];
    const existing = run.stages.find((s) => s.name === stageName);
    if (existing && existing.status !== "completed") {
      run = updateStage(run, stageName, "skipped");
    }
  }

  // Reset stages from startIndex onward
  for (let i = startIndex; i < PIPELINE_STAGES.length; i++) {
    run = updateStage(run, PIPELINE_STAGES[i], "pending");
  }

  run = updatePipelineRun(run.id, { status: "running", error: undefined });
  const pipelineStart = Date.now();
  trackPipelineStarted(run.id);

  try {
    // ── Extract ─────────────────────────────────
    if (startIndex <= STAGE_ORDER.extract) {
      const { run: r, result } = await runStage(run, "extract", () =>
        runExtractStage(run.sourceUrl, ctx),
      );
      run = updatePipelineRun(r.id, {
        artifacts: {
          ...r.artifacts,
          draft: result.draft,
          evidence: result.evidence,
          rawMarkdown: result.rawMarkdown,
        },
      });
      ctx.run = run;
    }

    const draft = run.artifacts.draft;
    if (!draft) {
      throw new Error("Extract stage did not produce a draft");
    }

    // ── Analyze ─────────────────────────────────
    if (startIndex <= STAGE_ORDER.analyze) {
      const { run: r, result } = await runStage(run, "analyze", () =>
        runAnalyzeStage(draft, ctx),
      );
      run = updatePipelineRun(r.id, {
        artifacts: { ...r.artifacts, analysis: result },
      });
      ctx.run = run;
    }

    // ── Match ───────────────────────────────────
    if (startIndex <= STAGE_ORDER.match) {
      const { run: r, result } = await runStage(run, "match", () =>
        runMatchStage(draft, ctx),
      );
      run = updatePipelineRun(r.id, {
        artifacts: {
          ...r.artifacts,
          matches: result.matches,
          migration: result.migration,
        },
      });
      ctx.run = run;
    }

    // ── Migrate ─────────────────────────────────
    if (startIndex <= STAGE_ORDER.migrate) {
      const existingMigration = run.artifacts.migration;
      const { run: r, result } = await runStage(run, "migrate", () =>
        runMigrateStage(draft, existingMigration ?? undefined, ctx),
      );
      run = updatePipelineRun(r.id, {
        artifacts: { ...r.artifacts, migration: result },
      });
      ctx.run = run;
    }

    // ── Generate ────────────────────────────────
    if (startIndex <= STAGE_ORDER.generate) {
      const matchedSlug = run.artifacts.matches?.[0]?.slug ?? run.target.styleSlug;
      const { run: r, result } = await runStage(run, "generate", () =>
        runGenerateStage(draft, matchedSlug, run.target, ctx),
      );
      run = updatePipelineRun(r.id, {
        artifacts: { ...r.artifacts, generated: result },
      });
      ctx.run = run;
    }

    const generated = run.artifacts.generated;
    if (!generated) {
      throw new Error("Generate stage did not produce output");
    }

    // ── Export ───────────────────────────────────
    if (startIndex <= STAGE_ORDER.export) {
      const { run: r, result } = await runStage(run, "export", () =>
        runExportStage(generated, run.target, run.id, ctx),
      );
      run = updatePipelineRun(r.id, {
        artifacts: {
          ...r.artifacts,
          files: result.files,
          downloadUrl: result.downloadUrl,
        },
      });
      ctx.run = run;
    }

    // ── Complete ────────────────────────────────
    run = updatePipelineRun(run.id, { status: "completed" });
    trackPipelineCompleted(run.id, Date.now() - pipelineStart);
    return run;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const tagged = err as {
      stageName?: PipelineStageName;
      runSnapshot?: PipelineRun;
    };
    if (tagged.runSnapshot) {
      run = tagged.runSnapshot;
    }
    const failedStageName =
      tagged.stageName || run.stages.find((s) => s.status === "failed")?.name;
    run = updatePipelineRun(run.id, { status: "failed", error: message });
    trackPipelineFailed(run.id, failedStageName, message);
    return run;
  }
}
