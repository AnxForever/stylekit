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
const ZIP_RETRY_ATTEMPTS = 3;
const ZIP_RETRY_BACKOFF_MS = 250;
const ZIP_FAILURE_THRESHOLD = 3;
const ZIP_CIRCUIT_COOLDOWN_MS = 60_000;

interface ZipCircuitState {
  consecutiveFailures: number;
  openUntilMs: number;
}

const zipCircuitState: ZipCircuitState = {
  consecutiveFailures: 0,
  openUntilMs: 0,
};

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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getCircuitOpenError(waitMs: number): Error {
  const waitSeconds = Math.ceil(waitMs / 1000);
  return new Error(
    `ZIP export is temporarily unavailable after repeated failures. Please retry in ${waitSeconds}s.`
  );
}

function ensureZipCircuitClosed(): void {
  const remaining = zipCircuitState.openUntilMs - Date.now();
  if (remaining > 0) {
    throw getCircuitOpenError(remaining);
  }
}

function markZipSuccess(): void {
  zipCircuitState.consecutiveFailures = 0;
  zipCircuitState.openUntilMs = 0;
}

function markZipFailure(): void {
  zipCircuitState.consecutiveFailures += 1;
  if (zipCircuitState.consecutiveFailures >= ZIP_FAILURE_THRESHOLD) {
    zipCircuitState.openUntilMs = Date.now() + ZIP_CIRCUIT_COOLDOWN_MS;
  }
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

async function generateZipWithFallback(
  files: GeneratedFile[],
  folderName: string,
  options?: ZipBuildOptions
): Promise<Blob> {
  try {
    return await generateZipInWorker(files, folderName, options);
  } catch (error) {
    console.warn("ZIP worker failed, falling back to main thread:", error);
    return await generateZip(files, folderName, options);
  }
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
  ensureZipCircuitClosed();

  let lastError: unknown;
  let blob: Blob | null = null;

  for (let attempt = 1; attempt <= ZIP_RETRY_ATTEMPTS; attempt += 1) {
    try {
      blob = await generateZipWithFallback(files, folderName, options);
      markZipSuccess();
      break;
    } catch (error) {
      lastError = error;
      markZipFailure();

      if (zipCircuitState.openUntilMs > Date.now()) {
        throw getCircuitOpenError(zipCircuitState.openUntilMs - Date.now());
      }

      if (attempt < ZIP_RETRY_ATTEMPTS) {
        await sleep(ZIP_RETRY_BACKOFF_MS * attempt);
      }
    }
  }

  if (!blob) {
    if (lastError instanceof Error) {
      throw lastError;
    }
    throw new Error("Failed to generate ZIP file after retries.");
  }

  const filename = `${folderName}.zip`;
  downloadBlob(blob, filename);
}
