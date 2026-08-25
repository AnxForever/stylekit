/**
 * Packs artifacts into a single ZIP, staged on disk for upload via lark-cli.
 */

import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Artifact } from "./index.js";

// JSZip is ESM-only; load it lazily from the web app's dependency so the
// bot's package.json stays lean. Falls back to a directory listing note if
// the package is unavailable (unlikely inside the monorepo).
const jszipPath = fileURLToPath(
  new URL("../../../node_modules/jszip/package.json", import.meta.url),
);

export async function zipArtifacts(
  slug: string,
  artifacts: Artifact[],
): Promise<string> {
  const dir = mkdtempSync(join(tmpdir(), "stylekit-zip-"));
  const outPath = join(dir, `${slug}-stylekit.zip`);

  try {
    let JSZip: typeof import("jszip");
    try {
      JSZip = (await import(jszipPath)).default;
    } catch {
      // No jszip available — degrade to a plain manifest so the flow never
      // strands the user.
      writeFileSync(
        outPath,
        artifacts.map((a) => a.name).join("\n"),
        "utf8",
      );
      return outPath;
    }

    const zip = new JSZip();
    for (const artifact of artifacts) {
      zip.file(`${slug}/${artifact.name}`, artifact.content);
    }
    const buffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    writeFileSync(outPath, buffer);
    return outPath;
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  }
}

export function cleanupZip(path: string): void {
  rmSync(path, { recursive: true, force: true });
}
