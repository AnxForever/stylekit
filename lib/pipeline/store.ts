/**
 * Pipeline Run Store
 *
 * JSON-file-based persistence layer for pipeline runs.
 * Uses in-memory cache with debounced disk writes.
 * Pattern follows lib/analytics/tracker.ts.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type {
  PipelineRun,
  PipelineRunRequest,
  PipelineStage,
} from "@/lib/pipeline/types";
import { PIPELINE_STAGES } from "@/lib/pipeline/types";

// ── Persistence ──────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "pipeline-runs.json");
const FLUSH_DELAY_MS = 5_000;
const MAX_RUNS = 100;

let flushTimer: ReturnType<typeof setTimeout> | null = null;
let loaded = false;

// ── In-memory state ──────────────────────────────────────────
const runs: Record<string, PipelineRun> = {};

// ── Disk I/O ─────────────────────────────────────────────────

interface PersistedData {
  runs: Record<string, PipelineRun>;
  updatedAt: string;
}

function load(): void {
  if (loaded) return;
  loaded = true;

  if (!existsSync(STORE_FILE)) return;

  try {
    const raw = readFileSync(STORE_FILE, "utf-8");
    const data = JSON.parse(raw) as PersistedData;

    if (data.runs) {
      for (const [id, run] of Object.entries(data.runs)) {
        runs[id] = { ...run };
      }
    }
  } catch {
    // Corrupted file — start fresh
  }
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_DELAY_MS);
}

function flush(): void {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    const data: PersistedData = {
      runs: { ...runs },
      updatedAt: new Date().toISOString(),
    };
    writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Disk write failure is non-fatal
  }
}

function ensureLoaded(): void {
  load();
}

// ── Cleanup ──────────────────────────────────────────────────

function pruneOldRuns(): void {
  const ids = Object.keys(runs);
  if (ids.length <= MAX_RUNS) return;

  const completedRuns = ids
    .filter((id) => runs[id].status === "completed" || runs[id].status === "failed")
    .map((id) => ({ id, createdAt: runs[id].createdAt }))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const toDelete = completedRuns.slice(0, ids.length - MAX_RUNS);
  for (const { id } of toDelete) {
    delete runs[id];
  }
}

// ── ID Generation ────────────────────────────────────────────

function generateId(): string {
  return "pl_" + crypto.randomUUID().slice(0, 12);
}

// ── Public API ───────────────────────────────────────────────

function buildInitialStages(): PipelineStage[] {
  return PIPELINE_STAGES.map((name) => ({
    name,
    status: "pending" as const,
    durationMs: 0,
  }));
}

export function createPipelineRun(request: PipelineRunRequest): PipelineRun {
  ensureLoaded();

  const now = new Date().toISOString();
  const run: PipelineRun = {
    id: generateId(),
    status: "pending",
    sourceUrl: request.sourceUrl,
    target: { ...request.target },
    output: { ...request.output },
    options: { ...request.options },
    stages: buildInitialStages(),
    artifacts: {},
    createdAt: now,
    updatedAt: now,
  };

  runs[run.id] = run;
  pruneOldRuns();
  scheduleFlush();

  return { ...run };
}

export function getPipelineRun(id: string): PipelineRun | null {
  ensureLoaded();
  const run = runs[id];
  return run ? { ...run } : null;
}

export function updatePipelineRun(
  id: string,
  update: Partial<PipelineRun>
): PipelineRun {
  ensureLoaded();

  const existing = runs[id];
  if (!existing) {
    throw new Error(`Pipeline run not found: ${id}`);
  }

  const merged: PipelineRun = {
    ...existing,
    ...update,
    id: existing.id, // ID is immutable
    createdAt: existing.createdAt, // createdAt is immutable
    updatedAt: new Date().toISOString(),
  };

  runs[id] = merged;
  scheduleFlush();

  return { ...merged };
}

export function listPipelineRuns(limit = 50): PipelineRun[] {
  ensureLoaded();

  return Object.values(runs)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit)
    .map((run) => ({ ...run }));
}

export function deletePipelineRun(id: string): boolean {
  ensureLoaded();

  if (!runs[id]) return false;

  delete runs[id];
  scheduleFlush();

  return true;
}
