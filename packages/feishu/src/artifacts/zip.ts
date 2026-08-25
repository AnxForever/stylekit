/**
 * Packs artifacts into a single ZIP, staged on disk for upload via lark-cli.
 *
 * JSZip is CJS and lives in the web app's dependency tree; it is required
 * lazily via createRequire so the bot's own package.json stays lean and a
 * missing package degrades to a manifest listing instead of stranding the
 * delivery flow.
 */

import { createRequire } from "node:module";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Artifact } from "./index.js";

const requireFromRepo = createRequire(
  join(fileURLToPath(new URL("../../..", import.meta.url)), "package.json"),
);

interface JSZipCjs {
  file(path: string, content: string): void;
  generateAsync(options: {
    type: "nodebuffer";
    compression: "DEFLATE";
    compressionOptions: { level: number };
  }): Promise<Buffer>;
}

export async function zipArtifacts(
  slug: string,
  artifacts: Artifact[],
): Promise<string> {
  const dir = mkdtempSync(join(tmpdir(), "stylekit-zip-"));
  const outPath = join(dir, `${slug}-stylekit.zip`);

  try {
    let JSZip: new () => JSZipCjs;
    try {
      JSZip = requireFromRepo("jszip") as new () => JSZipCjs;
    } catch {
      // No jszip available — degrade to a manifest listing so the flow never
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
