import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  PublicationWrite,
  StylePublicationOptions,
  StylePublicationPlan,
  StylePublicationResult,
} from "./types";

interface StagedWrite {
  write: PublicationWrite;
  target: string;
  pending: string;
  backup?: string;
  attempted: boolean;
  retainBackup: boolean;
}

const activeRoots = new Set<string>();

class PublicationConflictError extends Error {}

function pathKey(value: string): string {
  const resolved = path.resolve(value);
  return process.platform === "win32" ? path.toNamespacedPath(resolved).toLowerCase() : resolved;
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function readCurrent(target: string): Promise<string | null> {
  try {
    return await readFile(target, "utf8");
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function assertPreimage(item: StagedWrite): Promise<void> {
  const expected = item.write.kind === "registry" ? item.write.previousContent : null;
  if (expected === undefined || await readCurrent(item.target) !== expected) {
    throw new PublicationConflictError("Publication target changed since planning: " + item.write.relativePath);
  }
}

/** Stage all content before replacing any live file, then restore on failure. */
export async function commitStylePublication(
  plan: StylePublicationPlan,
  rootDir: string,
  options: StylePublicationOptions = {},
): Promise<StylePublicationResult> {
  const result: StylePublicationResult = { success: false, filesWritten: [], registriesPatched: [], errors: [] };
  const staged: StagedWrite[] = [];
  const createdDirectories = new Set<string>();
  const resolvedRoot = path.resolve(rootDir);
  const lockKey = pathKey(resolvedRoot);
  if (activeRoots.has(lockKey)) {
    result.outcome = "busy";
    result.errors.push("A style publication is already in progress for this directory; retry after it completes.");
    return result;
  }
  const writeFileImpl = options.writeFile ?? writeFile;
  const renameImpl = options.rename ?? rename;
  const operationId = randomUUID();
  activeRoots.add(lockKey);
  try {
    for (const [index, write] of plan.writes.entries()) {
      const target = path.join(rootDir, write.relativePath);
      const suffix = ".publication-" + operationId + "-" + index;
      const item: StagedWrite = {
        write,
        target,
        pending: target + suffix + ".tmp",
        backup: write.kind === "registry" ? target + suffix + ".restore" : undefined,
        attempted: false,
        retainBackup: false,
      };
      // Record temporary paths before I/O: rejected writes can leave bytes.
      staged.push(item);
      const parent = path.dirname(target);
      const firstCreated = await mkdir(parent, { recursive: true });
      if (firstCreated) {
        const firstKey = pathKey(firstCreated);
        let directory = parent;
        while (pathKey(directory) === firstKey || pathKey(directory).startsWith(firstKey + path.sep)) {
          createdDirectories.add(directory);
          if (pathKey(directory) === firstKey) break;
          directory = path.dirname(directory);
        }
      }
      await assertPreimage(item);
      await writeFileImpl(item.pending, write.content, "utf8");
      if (await readCurrent(item.pending) !== write.content) {
        throw new Error("Incomplete staged publication file: " + write.relativePath);
      }
      if (item.backup) await writeFile(item.backup, write.previousContent!, "utf8");
    }
    for (const item of staged) {
      await assertPreimage(item);
      item.attempted = true;
      await renameImpl(item.pending, item.target);
      if (item.write.kind === "registry") result.registriesPatched.push(item.write.relativePath);
      else result.filesWritten.push(item.write.relativePath);
    }
    result.success = true;
    result.outcome = "applied";
  } catch (error: unknown) {
    result.outcome = error instanceof PublicationConflictError
      ? "conflict"
      : staged.some((entry) => entry.attempted) ? "rolled-back" : "not-applied";
    result.errors.push(message(error));
    for (const item of [...staged].reverse().filter((entry) => entry.attempted)) {
      try {
        const current = await readCurrent(item.target);
        const original = item.write.kind === "registry" ? item.write.previousContent : null;
        if (current === original) continue;
        if (current !== item.write.content) {
          throw new Error("Target changed after publication; the newer content was preserved");
        }
        if (item.backup) await renameImpl(item.backup, item.target);
        else await rm(item.target, { force: true });
      } catch (rollbackError: unknown) {
        try {
          const original = item.write.kind === "registry" ? item.write.previousContent : null;
          if (await readCurrent(item.target) === original) continue;
        } catch {
          // The original could not be verified; keep recovery material.
        }
        item.retainBackup = true;
        result.outcome = "recovery-needed";
        const recovery = path.relative(resolvedRoot, item.backup ?? item.target).split(path.sep).join("/");
        result.errors.push("Rollback failed for " + item.write.relativePath + ": " + message(rollbackError) + ". Recovery location: " + recovery);
        (result.recoveryFiles ??= []).push(recovery);
      }
    }
    result.filesWritten = [];
    result.registriesPatched = [];
  } finally {
    for (const item of staged) {
      const disposable = [item.pending, ...(!item.retainBackup && item.backup ? [item.backup] : [])];
      for (const temporary of disposable) {
        try {
          await rm(temporary, { force: true });
        } catch {
          // A leftover private temp does not change the committed result.
        }
      }
    }
    for (const directory of [...createdDirectories].sort((a, b) => b.length - a.length)) {
      try {
        await rmdir(directory);
      } catch {
        // Only empty directories created by this operation are removable.
      }
    }
    activeRoots.delete(lockKey);
  }
  return result;
}
