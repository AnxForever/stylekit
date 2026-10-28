#!/usr/bin/env node
/** Compare the exact local version and executable package contents against npm. */
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { artifactContents } from "../lib/package-artifact.mjs";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PACKAGES = ["core", "mcp", "cli"];
// Windows exposes pnpm as a `.cmd` shim that Node cannot spawn directly, so
// resolve the JavaScript entry behind it and run it with this Node binary.
const PNPM_CLI = [
  ...(process.env.APPDATA
    ? [join(process.env.APPDATA, "npm", "node_modules", "pnpm", "bin", "pnpm.cjs")]
    : []),
  join(dirname(process.execPath), "node_modules", "pnpm", "bin", "pnpm.cjs"),
].find((candidate) => existsSync(candidate));
const packLocally = (cwd, out) => execFileSync(
  PNPM_CLI ? process.execPath : "pnpm",
  PNPM_CLI ? [PNPM_CLI, "pack", "--out", out] : ["pack", "--out", out],
  { cwd, stdio: "pipe", timeout: 60_000 },
);

let failed = false;
let unavailable = false;
for (const pkg of PACKAGES) {
  const cwd = join(ROOT, "packages", pkg);
  const manifest = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
  const { name, version } = manifest;
  if (!existsSync(join(cwd, "dist"))) {
    console.error(`[publish-check] FAIL ${name}: build the package first`);
    failed = true;
    continue;
  }
  let temporary;
  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`Registry HTTP ${response.status}`);
    const metadata = await response.json();
    const published = metadata.versions?.[version];
    const tags = Object.entries(metadata["dist-tags"] ?? {}).map(([tag, value]) => `${tag}=${value}`).join(", ");
    if (!published) {
      console.log(`[publish-check] PENDING ${name}@${version}: exact version is not published (${tags})`);
      failed = true;
      continue;
    }
    const matchingTags = Object.entries(metadata["dist-tags"] ?? {}).filter(([, value]) => value === version).map(([tag]) => tag);
    temporary = mkdtempSync(join(tmpdir(), "stylekit-publish-check-"));
    const remoteTar = join(temporary, "remote.tgz");
    const localTar = join(temporary, "local.tgz");
    const artifact = await fetch(published.dist.tarball, { signal: AbortSignal.timeout(30_000) });
    if (!artifact.ok) throw new Error(`Tarball HTTP ${artifact.status}`);
    writeFileSync(remoteTar, Buffer.from(await artifact.arrayBuffer()));
    packLocally(cwd, localTar);
    const local = artifactContents(localTar);
    const remote = artifactContents(remoteTar);
    const changed = [...new Set([...local.keys(), ...remote.keys()])].filter((entry) => local.get(entry) !== remote.get(entry));
    if (changed.length) {
      console.error(`[publish-check] DRIFT ${name}@${version}: ${changed.length} executable/manifest file(s) differ; bump and publish a new version`);
      for (const entry of changed.slice(0, 5)) console.error(`  ${entry}`);
      failed = true;
    } else console.log(`[publish-check] OK ${name}@${version}: executable contents match (${matchingTags.join(", ") || "no dist-tag"})`);
  } catch (error) {
    console.error(`[publish-check] UNVERIFIED ${name}@${version}: ${error.message}`);
    unavailable = true;
  } finally {
    if (temporary) rmSync(temporary, { recursive: true, force: true });
  }
}
console.log(`[publish-check] ${failed ? "FAIL" : unavailable ? "INCONCLUSIVE" : "PASS"}`);
process.exitCode = failed ? 1 : unavailable ? 3 : 0;
