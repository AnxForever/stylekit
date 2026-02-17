/**
 * Pipeline Event Tracker
 *
 * Lightweight analytics for pipeline events.
 * Persists to .data/pipeline-events.json with debounced writes.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import type { PipelineEventType, PipelineStageName } from "@/lib/pipeline/types";

// ── Persistence ──────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const EVENTS_FILE = path.join(DATA_DIR, "pipeline-events.json");
const FLUSH_DELAY_MS = 5_000;
const MAX_EVENTS = 500;

interface PipelineEventRecord {
  type: PipelineEventType;
  runId: string;
  stage?: PipelineStageName;
  durationMs?: number;
  error?: string;
  timestamp: string;
}

interface PersistedEvents {
  events: PipelineEventRecord[];
  updatedAt: string;
}

let events: PipelineEventRecord[] = [];
let loaded = false;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function load(): void {
  if (loaded) return;
  loaded = true;

  if (!existsSync(EVENTS_FILE)) return;

  try {
    const raw = readFileSync(EVENTS_FILE, "utf-8");
    const data = JSON.parse(raw) as PersistedEvents;
    if (Array.isArray(data.events)) {
      events = data.events;
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
    const data: PersistedEvents = {
      events: events.slice(-MAX_EVENTS),
      updatedAt: new Date().toISOString(),
    };
    writeFileSync(EVENTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Non-fatal
  }
}

function record(event: PipelineEventRecord): void {
  load();
  events.push(event);
  if (events.length > MAX_EVENTS) {
    events = events.slice(-MAX_EVENTS);
  }
  scheduleFlush();
}

// ── Public API ──────────────────────────────────────────────

export function trackPipelineStarted(runId: string): void {
  record({
    type: "pipeline_started",
    runId,
    timestamp: new Date().toISOString(),
  });
}

export function trackPipelineStageCompleted(
  runId: string,
  stage: PipelineStageName,
  durationMs: number,
): void {
  record({
    type: "pipeline_stage_completed",
    runId,
    stage,
    durationMs,
    timestamp: new Date().toISOString(),
  });
}

export function trackPipelineCompleted(runId: string, durationMs: number): void {
  record({
    type: "pipeline_completed",
    runId,
    durationMs,
    timestamp: new Date().toISOString(),
  });
}

export function trackPipelineFailed(
  runId: string,
  stage: PipelineStageName | undefined,
  error: string,
): void {
  record({
    type: "pipeline_failed",
    runId,
    stage,
    error,
    timestamp: new Date().toISOString(),
  });
}

export function getPipelineEvents(limit = 100): PipelineEventRecord[] {
  load();
  return events.slice(-limit);
}
