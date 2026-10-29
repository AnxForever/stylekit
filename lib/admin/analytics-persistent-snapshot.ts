import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

const SNAPSHOT_DIR = path.join(process.cwd(), ".data");
const SNAPSHOT_FILE = path.join(SNAPSHOT_DIR, "admin-analytics-snapshots.json");
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const SNAPSHOT_STORE_CACHE_MS = 10_000;

interface Entry {
  writtenAt: number;
  value: unknown;
}

type SnapshotStore = Record<string, Entry>;

let snapshotStore: SnapshotStore | null = null;
let snapshotStoreLoadedAt = 0;
let readInFlight: Promise<SnapshotStore> | null = null;
let writeInFlight: Promise<void> | null = null;
const pendingWrites = new Map<string, Entry>();

/**
 * Read the most recent process copy of the persistent store. Concurrent cold
 * reads share one file read and one JSON parse. The short cache bounds disk
 * work while allowing other server workers' snapshots to become visible.
 */
async function readSnapshotStore(forceRefresh = false): Promise<SnapshotStore> {
  if (readInFlight) return readInFlight;
  if (
    !forceRefresh &&
    snapshotStore !== null &&
    Date.now() - snapshotStoreLoadedAt < SNAPSHOT_STORE_CACHE_MS
  ) {
    return snapshotStore;
  }

  readInFlight = readFile(SNAPSHOT_FILE, "utf8")
    .then((contents) => parseSnapshotStore(contents))
    .catch(() => ({}))
    .then((loaded) => {
      snapshotStore = { ...loaded, ...Object.fromEntries(pendingWrites) };
      snapshotStoreLoadedAt = Date.now();
      return snapshotStore;
    })
    .finally(() => {
      readInFlight = null;
    });

  return readInFlight;
}

function parseSnapshotStore(contents: string): SnapshotStore {
  try {
    const parsed: unknown = JSON.parse(contents);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const store: SnapshotStore = {};
    for (const [key, entry] of Object.entries(parsed)) {
      if (
        entry &&
        typeof entry === "object" &&
        "writtenAt" in entry &&
        typeof entry.writtenAt === "number" &&
        Number.isFinite(entry.writtenAt) &&
        "value" in entry
      ) {
        store[key] = { writtenAt: entry.writtenAt, value: entry.value };
      }
    }
    return store;
  } catch {
    return {};
  }
}

export async function readPersistentAnalyticsSnapshot<T>(key: string): Promise<T | null> {
  const store = await readSnapshotStore();
  const entry = pendingWrites.get(key) ?? store[key];
  if (!entry || Date.now() - entry.writtenAt > MAX_AGE_MS) return null;
  return entry.value as T;
}

/**
 * Queue an optional fallback snapshot write. Writes arriving in the same turn
 * are merged into one JSON read, one serialization and one atomic replacement.
 * The durable write is intentionally never on the analytics response path.
 */
export function writePersistentAnalyticsSnapshot<T>(key: string, value: T): Promise<void> {
  const entry = { writtenAt: Date.now(), value };
  pendingWrites.set(key, entry);
  if (snapshotStore !== null) {
    snapshotStore = { ...snapshotStore, [key]: entry };
    snapshotStoreLoadedAt = Date.now();
  }
  return scheduleSnapshotFlush();
}

function scheduleSnapshotFlush(): Promise<void> {
  if (writeInFlight) return writeInFlight;
  if (pendingWrites.size === 0) return Promise.resolve();

  let batch = new Map<string, Entry>();
  let persisted = false;
  writeInFlight = Promise.resolve()
    .then(async () => {
      batch = new Map(pendingWrites);

      const current = await readSnapshotStore(true);
      const updated: SnapshotStore = { ...current, ...Object.fromEntries(batch) };
      await mkdir(SNAPSHOT_DIR, { recursive: true });
      const temporary = `${SNAPSHOT_FILE}.${process.pid}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(updated), "utf8");
      await rename(temporary, SNAPSHOT_FILE);

      for (const [batchKey, entry] of batch) {
        if (pendingWrites.get(batchKey) === entry) pendingWrites.delete(batchKey);
      }
      snapshotStore = { ...updated, ...Object.fromEntries(pendingWrites) };
      snapshotStoreLoadedAt = Date.now();
      persisted = true;
    })
    .catch(() => {
      // Persisted analytics are only a fallback; a write failure must not
      // reject the request that produced the current validated response.
      snapshotStore = {
        ...(snapshotStore ?? {}),
        ...Object.fromEntries(batch),
        ...Object.fromEntries(pendingWrites),
      };
      snapshotStoreLoadedAt = Date.now();
    })
    .finally(() => {
      writeInFlight = null;
      if (persisted && pendingWrites.size > 0) void scheduleSnapshotFlush();
    });

  return writeInFlight;
}
