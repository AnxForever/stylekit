import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const SNAPSHOT_DIR = path.join(process.cwd(), ".data");
const SNAPSHOT_FILE = path.join(SNAPSHOT_DIR, "admin-analytics-snapshots.json");
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface Entry { writtenAt: number; value: unknown }
type SnapshotStore = Record<string, Entry>;
let writeQueue = Promise.resolve();

export async function readPersistentAnalyticsSnapshot<T>(key: string): Promise<T | null> {
  try {
    const store = JSON.parse(await readFile(SNAPSHOT_FILE, "utf8")) as SnapshotStore;
    const entry = store[key];
    if (!entry || Date.now() - entry.writtenAt > MAX_AGE_MS) return null;
    return entry.value as T;
  } catch {
    return null;
  }
}

export function writePersistentAnalyticsSnapshot<T>(key: string, value: T): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await mkdir(SNAPSHOT_DIR, { recursive: true });
    let store: SnapshotStore = {};
    try { store = JSON.parse(await readFile(SNAPSHOT_FILE, "utf8")) as SnapshotStore; } catch {}
    store[key] = { writtenAt: Date.now(), value };
    const temporary = `${SNAPSHOT_FILE}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify(store), "utf8");
    await rename(temporary, SNAPSHOT_FILE);
  }).catch(() => undefined);
  return writeQueue;
}
