/**
 * Usage Analytics Tracker
 *
 * In-memory anonymous counter for tracking style usage across API, MCP, and page views.
 * Privacy-first: no PII collected, only aggregate counts.
 * Persists to .data/analytics.json with debounced writes; loads on first access.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

export interface StyleUsageData {
  slug: string;
  apiCalls: number;
  mcpCalls: number;
  pageViews: number;
  total: number;
  lastAccessed: string;
}

export interface AnalyticsData {
  styles: Record<string, StyleUsageData>;
  combinations: Record<string, number>;
  updatedAt: string;
}

type Source = "api" | "mcp" | "page";

interface Counter {
  api: number;
  mcp: number;
  page: number;
  lastAccessed: string;
}

// ── Persistence ──────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
const FLUSH_DELAY_MS = 5_000; // debounce: flush at most every 5s

let flushTimer: ReturnType<typeof setTimeout> | null = null;
let loaded = false;

interface PersistedData {
  counters: Record<string, Counter>;
  combinations: Record<string, number>;
}

function loadFromDisk(): void {
  if (loaded) return;
  loaded = true;

  if (!existsSync(ANALYTICS_FILE)) return;

  try {
    const raw = readFileSync(ANALYTICS_FILE, "utf-8");
    const data = JSON.parse(raw) as PersistedData;

    if (data.counters) {
      for (const [slug, c] of Object.entries(data.counters)) {
        counters[slug] = { ...c };
      }
    }
    if (data.combinations) {
      for (const [key, count] of Object.entries(data.combinations)) {
        combinationCounters[key] = count;
      }
    }
  } catch {
    // Corrupted file — start fresh
  }
}

function schedulFlush(): void {
  if (flushTimer) return; // already scheduled
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushToDisk();
  }, FLUSH_DELAY_MS);
}

function flushToDisk(): void {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    const data: PersistedData = {
      counters: { ...counters },
      combinations: { ...combinationCounters },
    };
    writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Disk write failure is non-fatal
  }
}

// ── In-memory state ──────────────────────────────────────────
const counters: Record<string, Counter> = {};
const combinationCounters: Record<string, number> = {};

function ensureLoaded(): void {
  loadFromDisk();
}

function ensureCounter(slug: string): Counter {
  ensureLoaded();
  if (!counters[slug]) {
    counters[slug] = { api: 0, mcp: 0, page: 0, lastAccessed: new Date().toISOString() };
  }
  return counters[slug];
}

function makeCombinationKey(slugA: string, slugB: string): string {
  return [slugA, slugB].sort().join("+");
}

export function trackStyleUsage(slug: string, source: Source): void {
  const counter = ensureCounter(slug);
  counter[source]++;
  counter.lastAccessed = new Date().toISOString();
  schedulFlush();
}

export function trackStyleCombination(slugA: string, slugB: string): void {
  ensureLoaded();
  const key = makeCombinationKey(slugA, slugB);
  combinationCounters[key] = (combinationCounters[key] || 0) + 1;
  schedulFlush();
}

export function getUsageStats(): AnalyticsData {
  ensureLoaded();
  const styles: Record<string, StyleUsageData> = {};

  for (const [slug, counter] of Object.entries(counters)) {
    styles[slug] = {
      slug,
      apiCalls: counter.api,
      mcpCalls: counter.mcp,
      pageViews: counter.page,
      total: counter.api + counter.mcp + counter.page,
      lastAccessed: counter.lastAccessed,
    };
  }

  return {
    styles,
    combinations: { ...combinationCounters },
    updatedAt: new Date().toISOString(),
  };
}

export function getTopStyles(limit = 10): { slug: string; total: number }[] {
  ensureLoaded();
  return Object.entries(counters)
    .map(([slug, c]) => ({ slug, total: c.api + c.mcp + c.page }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

export function getTrendingStyles(limit = 10): { slug: string; total: number }[] {
  ensureLoaded();
  // For MVP, trending is the same as top styles sorted by recency + volume.
  // Styles with recent activity and higher counts rank higher.
  const now = Date.now();
  return Object.entries(counters)
    .map(([slug, c]) => {
      const total = c.api + c.mcp + c.page;
      const recencyMs = now - new Date(c.lastAccessed).getTime();
      const recencyBonus = Math.max(0, 1 - recencyMs / (1000 * 60 * 60 * 24)); // Decays over 24h
      return { slug, total, score: total + recencyBonus * 10 };
    })
    .filter((s) => s.total > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ slug, total }) => ({ slug, total }));
}

export function getPopularCombinations(
  limit = 5
): { pair: string[]; count: number }[] {
  ensureLoaded();
  return Object.entries(combinationCounters)
    .map(([key, count]) => ({ pair: key.split("+"), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
