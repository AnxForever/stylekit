/// <reference lib="webworker" />

import JSZip from "jszip";
import type { GeneratedFile } from "./types";
import type { ZipBuildStage } from "./zip-builder";

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

const workerScope = self as DedicatedWorkerGlobalScope;

workerScope.addEventListener("message", async (event: MessageEvent<ZipWorkerRequest>) => {
  const payload = event.data;

  if (!payload || typeof payload.id !== "number" || !Array.isArray(payload.files)) {
    const invalidResponse: ZipWorkerFailure = {
      id: payload?.id ?? -1,
      kind: "done",
      ok: false,
      error: "Invalid ZIP worker payload.",
    };
    workerScope.postMessage(invalidResponse);
    return;
  }

  try {
    const prepareEvent: ZipWorkerProgress = {
      id: payload.id,
      kind: "progress",
      stage: "prepare",
      progress: 0,
    };
    workerScope.postMessage(prepareEvent);

    const zip = new JSZip();
    const folder = zip.folder(payload.folderName || "template");
    if (!folder) {
      throw new Error("Failed to create ZIP folder");
    }

    for (const file of payload.files) {
      folder.file(file.name, file.content);
    }

    let lastProgress = 0;
    const blob = await zip.generateAsync(
      {
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      },
      (metadata) => {
        const progress = Math.max(0, Math.min(100, metadata.percent));
        if (progress - lastProgress < 1 && progress !== 100) {
          return;
        }
        lastProgress = progress;
        const progressEvent: ZipWorkerProgress = {
          id: payload.id,
          kind: "progress",
          stage: "compress",
          progress,
        };
        workerScope.postMessage(progressEvent);
      }
    );

    const finalizeEvent: ZipWorkerProgress = {
      id: payload.id,
      kind: "progress",
      stage: "finalize",
      progress: 100,
    };
    workerScope.postMessage(finalizeEvent);

    const response: ZipWorkerSuccess = {
      id: payload.id,
      kind: "done",
      ok: true,
      blob,
    };
    workerScope.postMessage(response);
  } catch (error) {
    const response: ZipWorkerFailure = {
      id: payload.id,
      kind: "done",
      ok: false,
      error: (error as Error).message || "Failed to generate ZIP in worker",
    };
    workerScope.postMessage(response);
  }
});
