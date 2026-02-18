import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export type GeneratorApiEndpoint = "generate-style" | "generate-design-system";
export type GeneratorApiOutcome = "success" | "error";

export interface GeneratorApiEvent {
  endpoint: GeneratorApiEndpoint;
  outcome: GeneratorApiOutcome;
  status: number;
  code?: string;
  durationMs: number;
  timestamp: string;
  clientHash: string;
}

interface PersistedGeneratorApiEvents {
  events: GeneratorApiEvent[];
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const EVENTS_FILE = path.join(DATA_DIR, "generator-api-events.json");
const MAX_EVENTS = 1000;
const FLUSH_DELAY_MS = 5000;

let events: GeneratorApiEvent[] = [];
let loaded = false;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function load(): void {
  if (loaded) return;
  loaded = true;

  if (!existsSync(EVENTS_FILE)) return;

  try {
    const raw = readFileSync(EVENTS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as PersistedGeneratorApiEvents;
    if (Array.isArray(parsed.events)) {
      events = parsed.events;
    }
  } catch {
    events = [];
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

    const payload: PersistedGeneratorApiEvents = {
      events: events.slice(-MAX_EVENTS),
      updatedAt: new Date().toISOString(),
    };
    writeFileSync(EVENTS_FILE, JSON.stringify(payload, null, 2), "utf-8");
  } catch {
    // Non-fatal.
  }
}

export function hashGeneratorClientKey(key: string): string {
  return createHash("sha256").update(key).digest("hex").slice(0, 16);
}

export function recordGeneratorApiEvent(
  event: Omit<GeneratorApiEvent, "timestamp">
): void {
  load();
  events.push({
    ...event,
    timestamp: new Date().toISOString(),
  });
  if (events.length > MAX_EVENTS) {
    events = events.slice(-MAX_EVENTS);
  }
  scheduleFlush();
}

export function getGeneratorApiEvents(limit = 100): GeneratorApiEvent[] {
  load();
  return events.slice(-Math.max(1, limit));
}
