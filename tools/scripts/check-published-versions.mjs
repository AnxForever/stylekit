#!/usr/bin/env node
/**
 * Compare each publishable package against what is actually on npm.
 *
 * Two failure modes have already happened here, and only one of them is
 * visible from a version number:
 *
 *  1. Local version is ahead of npm. Someone bumped and built but never
 *     published, so users keep receiving the old build.
 *  2. Local version EQUALS npm, but the contents differ. This is the worse
 *     one: the style library grew from 127 to 146 entries while the version
 *     stayed at 1.0.0-beta.1, so nothing about the version number revealed
 *     that installers were getting stale data. npm refuses to overwrite a
 *     published version, so the fix is always a bump -- but only if someone
 *     notices.
 *
 * Comparing packed tarball size catches the second case without downloading
 * and diffing every file. It is a heuristic, deliberately: an exact content
 * hash would also flag build-nondeterminism noise, and a check that cries wolf
 * gets muted.
 *
 * Network failures report as skipped rather than failed, so this never blocks
 * an offline build.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PACKAGES = ["core", "mcp", "cli"];

/** Difference in packed size that suggests the contents really changed. */
const SIZE_TOLERANCE = 0.02;

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 120_000,
    ...options,
  });
}

function localManifest(pkg) {
  const path = join(ROOT, "packages", pkg, "package.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function publishedVersion(name) {
  try {
    return run("npm", ["view", name, "version"]).trim();
  } catch {
    return null;
  }
}

function publishedSize(name, version) {
  try {
    const raw = run("npm", ["view", `${name}@${version}`, "dist.unpackedSize", "--json"]).trim();
    if (!raw || raw === "undefined") return null;
    const value = JSON.parse(raw);
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}

function localPackedSize(pkg) {
  try {
    const raw = run("npm", ["pack", "--dry-run", "--json"], {
      cwd: join(ROOT, "packages", pkg),
    });
    const parsed = JSON.parse(raw);
    return typeof parsed?.[0]?.unpackedSize === "number" ? parsed[0].unpackedSize : null;
  } catch {
    return null;
  }
}

const findings = [];
let skipped = 0;

for (const pkg of PACKAGES) {
  const manifest = localManifest(pkg);
  if (!manifest) continue;

  const { name, version } = manifest;
  const remote = publishedVersion(name);

  if (remote === null) {
    process.stdout.write(`[publish-check] SKIP  ${name}: npm unreachable\n`);
    skipped += 1;
    continue;
  }

  if (version !== remote) {
    process.stdout.write(
      `[publish-check] AHEAD ${name}: local ${version}, npm ${remote} -- unpublished changes\n`,
    );
    findings.push(`${name} is built at ${version} but npm still serves ${remote}`);
    continue;
  }

  const remoteSize = publishedSize(name, remote);
  const localSize = localPackedSize(pkg);
  if (remoteSize === null || localSize === null) {
    process.stdout.write(`[publish-check] SKIP  ${name}@${version}: size unavailable\n`);
    skipped += 1;
    continue;
  }

  const drift = Math.abs(localSize - remoteSize) / Math.max(1, remoteSize);
  if (drift > SIZE_TOLERANCE) {
    const delta = ((localSize - remoteSize) / 1024 / 1024).toFixed(2);
    process.stdout.write(
      `[publish-check] DRIFT ${name}@${version}: contents differ by ${delta} MB ` +
        `(${(drift * 100).toFixed(1)}%) at the same version -- bump required\n`,
    );
    findings.push(
      `${name}@${version} differs from the published build by ${delta} MB; npm cannot be overwritten, so bump the version`,
    );
    continue;
  }

  process.stdout.write(`[publish-check] OK    ${name}@${version} matches npm\n`);
}

if (findings.length > 0) {
  process.stdout.write("\n[publish-check] FAIL\n");
  for (const finding of findings) process.stdout.write(`  - ${finding}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `\n[publish-check] PASS${skipped > 0 ? ` (${skipped} skipped, offline or unpublished)` : ""}\n`,
  );
}
