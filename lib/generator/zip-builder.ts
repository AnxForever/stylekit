"use client";

/**
 * Browser-side ZIP builder using JSZip
 */

import JSZip from "jszip";
import type { GeneratedFile } from "./types";

export type ZipBuildStage = "prepare" | "compress" | "finalize";

export interface ZipProgressUpdate {
  stage: ZipBuildStage;
  progress: number;
}

interface ZipWorkerRequest {
  id: number;
  files: GeneratedFile[];
  folderName: string;
}

interface ZipWorkerProgress {
  id: number;
  kind: "progress";
  stage: ZipBuildStage;
  progress: number;
}

interface ZipWorkerSuccess {
  id: number;
  kind: "done";
  ok: true;
  blob: Blob;
}

interface ZipWorkerFailure {
  id: number;
  kind: "done";
  ok: false;
  error: string;
}

type ZipWorkerResponse = ZipWorkerProgress | ZipWorkerSuccess | ZipWorkerFailure;

export interface ZipBuildOptions {
  onProgress?: (update: ZipProgressUpdate) => void;
}

let zipWorkerMessageId = 0;

/**
 * Generate a ZIP file from generated files
 */
export async function generateZip(
  files: GeneratedFile[],
  folderName: string = "template",
  options?: ZipBuildOptions
): Promise<Blob> {
  options?.onProgress?.({
    stage: "prepare",
    progress: 0,
  });

  const zip = new JSZip();
  const folder = zip.folder(folderName);

  if (!folder) {
    throw new Error("Failed to create ZIP folder");
  }

  for (const file of files) {
    folder.file(file.name, file.content);
  }

  const blob = await zip.generateAsync(
    {
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      options?.onProgress?.({
        stage: "compress",
        progress: metadata.percent,
      });
    }
  );

  options?.onProgress?.({
    stage: "finalize",
    progress: 100,
  });
  return blob;
}

function createZipWorker(): Worker | null {
  if (typeof Worker === "undefined") {
    return null;
  }

  try {
    return new Worker(new URL("./zip-worker.ts", import.meta.url), {
      type: "module",
      name: "stylekit-zip-worker",
    });
  } catch {
    return null;
  }
}

async function generateZipInWorker(
  files: GeneratedFile[],
  folderName: string,
  options?: ZipBuildOptions
): Promise<Blob> {
  const worker = createZipWorker();
  if (!worker) {
    return generateZip(files, folderName, options);
  }

  const id = ++zipWorkerMessageId;

  return await new Promise<Blob>((resolve, reject) => {
    const cleanup = () => {
      worker.removeEventListener("message", handleMessage);
      worker.removeEventListener("error", handleError);
      worker.terminate();
    };

    const handleMessage = (event: MessageEvent<ZipWorkerResponse>) => {
      const payload = event.data;
      if (!payload || payload.id !== id) {
        return;
      }

      if (payload.kind === "progress") {
        options?.onProgress?.({
          stage: payload.stage,
          progress: payload.progress,
        });
        return;
      }

      cleanup();

      if (payload.ok) {
        options?.onProgress?.({
          stage: "finalize",
          progress: 100,
        });
        resolve(payload.blob);
      } else {
        reject(new Error(payload.error || "Failed to generate ZIP in worker"));
      }
    };

    const handleError = (event: ErrorEvent) => {
      cleanup();
      reject(new Error(event.message || "Failed to generate ZIP in worker"));
    };

    worker.addEventListener("message", handleMessage);
    worker.addEventListener("error", handleError);

    const request: ZipWorkerRequest = {
      id,
      files,
      folderName,
    };
    worker.postMessage(request);
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
  folderName: string = "template",
  options?: ZipBuildOptions
): Promise<void> {
  let blob: Blob;
  try {
    blob = await generateZipInWorker(files, folderName, options);
  } catch (error) {
    console.warn("ZIP worker failed, falling back to main thread:", error);
    blob = await generateZip(files, folderName, options);
  }
  const filename = `${folderName}.zip`;
  downloadBlob(blob, filename);
}
