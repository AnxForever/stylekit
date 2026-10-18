import { createHash } from "node:crypto";
import { constants as fsConstants } from "node:fs";
import { lstat, open, realpath } from "node:fs/promises";
import path from "node:path";
import { getDownloadPack } from "@/lib/downloads/catalog";
import type { DownloadFile, DownloadPack } from "@/lib/downloads/types";

const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FILE_COMPONENT = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,199}$/;
const SHA256 = /^[a-f0-9]{64}$/i;
const MAX_FILE_BYTES = 128 * 1024 * 1024;

const CONTENT_TYPES: Record<string, string> = {
  ".zip": "application/zip",
  ".glb": "model/gltf-binary",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function isIdentifier(value: string): boolean {
  return value.length <= 100 && IDENTIFIER.test(value);
}

function isFileComponent(value: string): boolean {
  return FILE_COMPONENT.test(value) && !value.includes("..");
}

function isInside(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative !== "" && relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function unavailable(message: string, status: number): Response {
  return Response.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function readVerifiedFile(pack: DownloadPack, file: DownloadFile): Promise<Buffer> {
  if (
    !isIdentifier(pack.slug) || !isFileComponent(pack.version) ||
    !isFileComponent(file.name) || !SHA256.test(file.sha256) ||
    !Number.isSafeInteger(file.bytes) || file.bytes < 1 || file.bytes > MAX_FILE_BYTES
  ) {
    throw new Error("Invalid download manifest");
  }

  // This root is server-controlled. Files stay outside public/ so draft assets
  // cannot bypass the publication and license checks through a static URL.
  const root = path.resolve(process.cwd(), "content", "downloads");
  const directory = path.resolve(root, pack.slug, pack.version);
  const candidate = path.resolve(directory, file.name);
  if (!isInside(root, directory) || !isInside(directory, candidate)) {
    throw new Error("Invalid download path");
  }

  const [realRoot, realDirectory, realCandidate, metadata] = await Promise.all([
    realpath(root),
    realpath(directory),
    realpath(candidate),
    lstat(candidate),
  ]);
  if (
    path.relative(root, realRoot) !== "" ||
    path.relative(directory, realDirectory) !== "" ||
    path.relative(candidate, realCandidate) !== "" ||
    !isInside(realRoot, realDirectory) || !isInside(realDirectory, realCandidate) ||
    metadata.isSymbolicLink() || !metadata.isFile() || metadata.size !== file.bytes
  ) {
    throw new Error("Download file is unavailable");
  }

  const handle = await open(realCandidate, fsConstants.O_RDONLY | (fsConstants.O_NOFOLLOW ?? 0));
  try {
    const openedMetadata = await handle.stat();
    if (!openedMetadata.isFile() || openedMetadata.size !== file.bytes) {
      throw new Error("Download file changed");
    }
    const content = await handle.readFile();
    const hash = createHash("sha256").update(content).digest("hex");
    if (content.byteLength !== file.bytes || hash !== file.sha256.toLowerCase()) {
      throw new Error("Download file failed integrity verification");
    }
    return content;
  } finally {
    await handle.close();
  }
}

export async function getDownloadResponse(slug: string, fileId: string): Promise<Response> {
  if (!isIdentifier(slug) || !isIdentifier(fileId)) {
    return unavailable("Invalid download identifier", 400);
  }

  const pack = getDownloadPack(slug);
  const file = pack?.files.find((entry) => entry.id === fileId);
  if (!pack || pack.slug !== slug || !file) {
    return unavailable("Download not found", 404);
  }

  if (pack.publication !== "published" || pack.license.status !== "confirmed") {
    return unavailable("This resource is awaiting publication and license confirmation", 403);
  }

  try {
    const content = await readVerifiedFile(pack, file);
    const sha256 = file.sha256.toLowerCase();
    return new Response(new Uint8Array(content), {
      headers: {
        "Content-Type": CONTENT_TYPES[path.extname(file.name).toLowerCase()] ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Content-Length": String(content.byteLength),
        "ETag": `"${sha256}"`,
        "X-Content-SHA256": sha256,
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "sandbox; default-src 'none'",
        // Publication and license changes must apply on the next request.
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return unavailable("Download file is temporarily unavailable", 503);
  }
}
