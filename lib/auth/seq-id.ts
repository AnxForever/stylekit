/**
 * Sequential user ID assignment.
 *
 * Maintains a monotonically increasing counter in `.data/user-seq.json`.
 * Each Supabase user UUID is mapped to a stable sequential number (1, 2, 3…).
 *
 * Thread-safety: single-process only (suitable for serverless cold-start model).
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const SEQ_FILE = join(DATA_DIR, "user-seq.json");

interface SeqData {
  counter: number;
  map: Record<string, number>;
}

async function readSeqData(): Promise<SeqData> {
  try {
    const raw = await readFile(SEQ_FILE, "utf-8");
    return JSON.parse(raw) as SeqData;
  } catch {
    return { counter: 0, map: {} };
  }
}

async function writeSeqData(data: SeqData): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SEQ_FILE, JSON.stringify(data, null, 2));
}

/**
 * Return the sequential ID for a given Supabase user UUID.
 * If the user has not been assigned one yet, the next available number
 * is allocated and persisted.
 */
export async function getOrAssignSeqId(userId: string): Promise<number> {
  const data = await readSeqData();

  const existing = data.map[userId];
  if (existing !== undefined) return existing;

  data.counter += 1;
  data.map[userId] = data.counter;
  await writeSeqData(data);

  return data.counter;
}
