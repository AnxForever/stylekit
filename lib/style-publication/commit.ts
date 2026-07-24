import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  PublicationWrite,
  StylePublicationOptions,
  StylePublicationPlan,
  StylePublicationResult,
} from "./types";

/** Apply a previously validated plan and restore every completed write on failure. */
export async function commitStylePublication(
  plan: StylePublicationPlan,
  rootDir: string,
  options: StylePublicationOptions = {},
): Promise<StylePublicationResult> {
  const result: StylePublicationResult = {
    success: false,
    filesWritten: [],
    registriesPatched: [],
    errors: [],
  };
  const committedWrites: PublicationWrite[] = [];
  const writeFileImpl = options.writeFile ?? writeFile;

  try {
    for (const write of plan.writes) {
      const absolutePath = path.join(rootDir, write.relativePath);
      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFileImpl(absolutePath, write.content, "utf8");
      committedWrites.push(write);

      if (write.kind === "registry") {
        result.registriesPatched.push(write.relativePath);
      } else {
        result.filesWritten.push(write.relativePath);
      }
    }

    result.success = true;
  } catch (error: unknown) {
    result.errors.push(error instanceof Error ? error.message : String(error));
    result.errors.push(...(await rollbackPublication(committedWrites, rootDir, writeFileImpl)));
    result.filesWritten = [];
    result.registriesPatched = [];
  }

  return result;
}

async function rollbackPublication(
  writes: readonly PublicationWrite[],
  rootDir: string,
  writeFileImpl: NonNullable<StylePublicationOptions["writeFile"]>,
): Promise<string[]> {
  const errors: string[] = [];

  for (const write of [...writes].reverse()) {
    const absolutePath = path.join(rootDir, write.relativePath);
    try {
      if (write.kind === "registry" && write.previousContent !== undefined) {
        await writeFileImpl(absolutePath, write.previousContent, "utf8");
      } else {
        await rm(absolutePath, { force: true });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`Rollback failed for ${write.relativePath}: ${message}`);
    }
  }

  return errors;
}
