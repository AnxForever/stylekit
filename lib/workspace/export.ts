import { createHash } from "node:crypto";
import JSZip from "jszip";
import type { z } from "zod";
import { workspaceGenerationSchema } from "./schema";

type Generation = z.infer<typeof workspaceGenerationSchema>;

function safeProjectName(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || "stylekit-project";
}

export async function buildWorkspaceZip(input: {
  projectName: string;
  generatedAt: string;
  generation: Generation;
}) {
  const zip = new JSZip();
  const date = new Date(input.generatedAt);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid generation timestamp");
  for (const file of [...input.generation.files].sort((left, right) => left.name.localeCompare(right.name))) {
    const contentSha256 = `sha256:${createHash("sha256").update(file.content).digest("hex")}`;
    if (contentSha256 !== file.sha256) throw new Error(`Generated file hash mismatch: ${file.name}`);
    // Directory entries are unnecessary for extraction and JSZip timestamps
    // auto-created folders with the current clock, breaking artifact hashes.
    zip.file(file.name, file.content, { date, createFolders: false });
  }
  const content = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
    platform: "UNIX",
  });
  return {
    filename: `${safeProjectName(input.projectName)}-${input.generation.target}.zip`,
    content,
    sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
    fileCount: input.generation.files.length,
  };
}
