"use client";

/**
 * Browser-side ZIP builder using JSZip
 */

import JSZip from "jszip";
import type { GeneratedFile } from "./types";

/**
 * Generate a ZIP file from generated files
 */
export async function generateZip(
  files: GeneratedFile[],
  folderName: string = "template"
): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder(folderName);

  if (!folder) {
    throw new Error("Failed to create ZIP folder");
  }

  for (const file of files) {
    folder.file(file.name, file.content);
  }

  return await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

/**
 * Trigger browser download of a Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate and download ZIP in one call
 */
export async function downloadZip(
  files: GeneratedFile[],
  folderName: string = "template"
): Promise<void> {
  const blob = await generateZip(files, folderName);
  const filename = `${folderName}.zip`;
  downloadBlob(blob, filename);
}
