import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { clearRemoteCache, getImplementationBrief } from "stylekit-core/discovery";
import { runLint } from "../src/lint.js";

const dynamicSlug = "live-only-lint-check";
const liveOnlyClass = "sk-live-only-forbidden-970px";
const sourceBrief = getImplementationBrief("neo-brutalist");
assert.ok(sourceBrief, "a bundled brief is available as a valid contract fixture");

const liveBrief = structuredClone(sourceBrief);
liveBrief.slug = dynamicSlug;
liveBrief.name = "Live-only lint fixture";
liveBrief.nameEn = "Live-only lint fixture";
liveBrief.provenance = {
  ...liveBrief.provenance,
  source: "static",
  contentHash: "test-live-lint-contract",
  url: `http://127.0.0.1/api/styles/${dynamicSlug}/brief`,
};
const lintRules = liveBrief.lintRules as unknown as {
  forbiddenClasses: Array<{ className: string; reason: string; source: "tokens" | "curated" }>;
};
lintRules.forbiddenClasses.push({
  className: liveOnlyClass,
  reason: "This rule exists only in the live test brief.",
  source: "tokens",
});

const httpServer = createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  if (pathname === `/api/styles/${dynamicSlug}/brief`) {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(liveBrief));
    return;
  }
  if (pathname === "/api/styles/neo-brutalist/brief") {
    response.writeHead(503, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "test source unavailable" }));
    return;
  }
  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "not found" }));
});

await new Promise<void>((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
const address = httpServer.address();
assert.ok(address && typeof address !== "string");
const baseUrl = `http://127.0.0.1:${address.port}`;
const tempDirectory = mkdtempSync(path.join(tmpdir(), "stylekit-cli-live-lint-"));
const sourceFile = path.join(tempDirectory, "sample.tsx");
const originalLog = console.log;
const originalError = console.error;
const originalExitCode = process.exitCode;

async function lintJson(slug: string, code: string) {
  writeFileSync(sourceFile, code);
  const output: string[] = [];
  console.log = (...values: unknown[]) => output.push(values.join(" "));
  console.error = (...values: unknown[]) => output.push(values.join(" "));
  process.exitCode = undefined;
  try {
    await runLint(slug, [sourceFile], {
      json: true,
      remoteOptions: { baseUrl, timeoutMs: 1_000, cacheTtlMs: 0 },
    });
    return { report: JSON.parse(output.join("\n")) as {
      origin: string;
      contentSource?: string;
      fallbackReason?: string;
      status: string;
      files: Array<{ report: { violations: Array<{ className: string; reason: string }> } }>;
    }, exitCode: process.exitCode };
  } finally {
    console.log = originalLog;
    console.error = originalError;
    process.exitCode = originalExitCode;
  }
}

try {
  clearRemoteCache();
  const live = await lintJson(dynamicSlug, `<div className="${liveOnlyClass}" />`);
  assert.equal(live.report.origin, "live");
  assert.equal(live.report.contentSource, "static");
  assert.equal(live.report.status, "fail");
  assert.deepEqual(
    live.report.files[0]?.report.violations.map(({ className, reason }) => ({ className, reason })),
    [{ className: liveOnlyClass, reason: "This rule exists only in the live test brief." }],
  );

  clearRemoteCache();
  const bundled = await lintJson("neo-brutalist", '<div className="rounded-xl" />');
  assert.equal(bundled.report.origin, "bundled");
  assert.equal(bundled.report.contentSource, "bundled");
  assert.match(String(bundled.report.fallbackReason), /503|unavailable/i);
  assert.equal(bundled.report.files[0]?.report.violations[0]?.className, "rounded-xl");

  console.log("PASS: CLI lint applies a live-only rule and reports live and bundled provenance correctly");
} finally {
  clearRemoteCache();
  rmSync(tempDirectory, { recursive: true, force: true });
  await new Promise<void>((resolve, reject) => httpServer.close((error) => error ? reject(error) : resolve()));
}
