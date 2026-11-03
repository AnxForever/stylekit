import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { supportMethods, thankYouEntries } from "../../lib/site/support";

const runtimeAssetPrefixes = [
  "/support/acknowledgments/",
  "/support/receipts/",
  "/support/thank-you/",
] as const;

export type SupportAssetReference = {
  source: string;
  src: string;
};

export type SupportAssetCheckResult = {
  checked: number;
  skipped: number;
  failures: Array<SupportAssetReference & { reason: string }>;
};

type SupportAssetCheckOptions = {
  projectRoot: string;
  references: SupportAssetReference[];
  requireRuntimeAssets?: boolean;
  fileExists?: typeof existsSync;
  isIgnored?: (path: string) => boolean;
  fetchAsset?: typeof fetch;
  report?: (message: string) => void;
  timeoutMs?: number;
};

type ClassifiedAsset =
  | { kind: "external"; url: URL }
  | { kind: "local"; path: string; isRuntimeAsset: boolean }
  | { kind: "invalid"; reason: string };

export function classifySupportAsset(src: string, projectRoot: string): ClassifiedAsset {
  if (src.startsWith("/")) {
    const publicRoot = resolve(projectRoot, "public");
    const assetPath = resolve(publicRoot, `.${src}`);
    const pathFromPublic = relative(publicRoot, assetPath);
    if (!pathFromPublic || pathFromPublic.startsWith("..") || isAbsolute(pathFromPublic)) {
      return { kind: "invalid", reason: "local asset path leaves public directory" };
    }

    return {
      kind: "local",
      path: assetPath,
      isRuntimeAsset: runtimeAssetPrefixes.some((prefix) => src.startsWith(prefix)),
    };
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return { kind: "invalid", reason: "asset reference must be an absolute public URL or root-relative path" };
  }

  if (
    url.protocol !== "https:" ||
    !url.hostname ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    return { kind: "invalid", reason: "external runtime assets must use HTTPS without credentials, query or fragment" };
  }

  return { kind: "external", url };
}

export async function checkSupportAssets({
  projectRoot,
  references,
  requireRuntimeAssets = false,
  fileExists = existsSync,
  isIgnored = (path) =>
    spawnSync("git", ["check-ignore", "-q", path], { cwd: projectRoot }).status === 0,
  fetchAsset = fetch,
  report = console.log,
  timeoutMs = 10_000,
}: SupportAssetCheckOptions): Promise<SupportAssetCheckResult> {
  const uniqueReferences = new Map<string, SupportAssetReference>();
  for (const reference of references) {
    uniqueReferences.set(reference.src, reference);
  }

  const result: SupportAssetCheckResult = { checked: 0, skipped: 0, failures: [] };
  for (const reference of uniqueReferences.values()) {
    const classified = classifySupportAsset(reference.src, projectRoot);
    if (classified.kind === "invalid") {
      fail(reference, classified.reason);
      continue;
    }

    if (classified.kind === "external") {
      if (!requireRuntimeAssets) {
        result.skipped += 1;
        report(`SKIP ${reference.src}: external runtime asset is not fetched by default`);
        continue;
      }

      const availability = await checkExternalAsset(classified.url, fetchAsset, timeoutMs);
      if (!availability.ok) {
        fail(reference, availability.reason);
        continue;
      }

      result.checked += 1;
      report(`PASS ${reference.src}: external runtime asset returned HTTP ${availability.status}`);
      continue;
    }

    const exists = fileExists(classified.path);
    if (classified.isRuntimeAsset) {
      if (!exists && requireRuntimeAssets) {
        fail(reference, "missing runtime asset");
      } else {
        result.checked += exists ? 1 : 0;
        result.skipped += exists ? 0 : 1;
        report(`${exists ? "PASS" : "SKIP"} ${reference.src}: runtime asset${exists ? " is present" : " is not required in this checkout"}`);
      }
      continue;
    }

    const relativePath = relative(projectRoot, classified.path).split(sep).join("/");
    const ignored = isIgnored(relativePath);
    if (!exists || ignored) {
      fail(reference, `exists=${exists} ignored=${ignored}`);
      continue;
    }

    result.checked += 1;
    report(`PASS ${reference.src}: deployable static asset`);
  }

  return result;

  function fail(reference: SupportAssetReference, reason: string) {
    result.failures.push({ ...reference, reason });
    report(`FAIL ${reference.src}: ${reason} (${reference.source})`);
  }
}

async function checkExternalAsset(
  url: URL,
  fetchAsset: typeof fetch,
  timeoutMs: number,
): Promise<{ ok: true; status: number } | { ok: false; reason: string }> {
  const request = async (method: "HEAD" | "GET") =>
    fetchAsset(url, {
      method,
      redirect: "error",
      signal: AbortSignal.timeout(timeoutMs),
      ...(method === "GET" ? { headers: { Range: "bytes=0-0" } } : {}),
    });

  try {
    let response = await request("HEAD");
    if (response.status === 405 || response.status === 501) {
      await response.body?.cancel();
      response = await request("GET");
    }

    if (!response.ok) {
      await response.body?.cancel();
      return { ok: false, reason: `external runtime asset returned HTTP ${response.status}` };
    }

    await response.body?.cancel();
    return { ok: true, status: response.status };
  } catch (error) {
    const reason = error instanceof Error ? error.name : "network failure";
    return { ok: false, reason: `external runtime asset request failed (${reason})` };
  }
}

async function run() {
  const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const requireRuntimeAssets = process.argv.includes("--require-runtime");
  const references: SupportAssetReference[] = [
    ...supportMethods.flatMap((method) =>
      method.imageSrc ? [{ source: `support method ${method.id}`, src: method.imageSrc }] : [],
    ),
    ...thankYouEntries.flatMap((entry) => [
      ...(entry.receiptImage ? [{ source: `thank-you receipt ${entry.id}`, src: entry.receiptImage }] : []),
      ...(entry.celebrationImage ? [{ source: `thank-you celebration ${entry.id}`, src: entry.celebrationImage }] : []),
    ]),
  ];

  const result = await checkSupportAssets({ projectRoot, references, requireRuntimeAssets });
  if (result.failures.length > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  void run();
}
