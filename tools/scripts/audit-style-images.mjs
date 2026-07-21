#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import sharp from "sharp";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = join(SCRIPT_DIR, "..", "..", "public", "images", "styles");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function isIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function validateProvenance(record, expectedAssetPath, actualHash) {
  const issues = [];
  if (record?.schemaVersion !== 1) issues.push("unsupported-provenance-schema");
  if (record?.provider !== "unsplash") issues.push("unknown-provider");
  if (record?.assetPath !== expectedAssetPath) issues.push("asset-path-mismatch");
  if (!record?.photoId) issues.push("missing-photo-id");
  if (!record?.creator?.name || !record?.creator?.username) issues.push("missing-creator");
  if (!record?.sourceUrl) issues.push("missing-source-url");
  if (!record?.downloadLocation) issues.push("missing-download-location");
  if (!isIsoDate(record?.acquiredAt)) issues.push("invalid-acquired-at");
  if (record?.contentHash !== actualHash) issues.push("content-hash-mismatch");
  if (record?.usage?.purpose !== "internal-visual-research") issues.push("invalid-purpose");
  if (record?.usage?.distributable !== false) issues.push("must-not-be-distributable");
  if (record?.usage?.auditStatus !== "pending") issues.push("unexpected-audit-status");
  if (record?.tracking?.downloadEndpointTriggered !== true) issues.push("download-not-tracked");
  return issues;
}

export async function auditStyleImages(rootDir = DEFAULT_ROOT) {
  const allFiles = await walk(rootDir);
  const imageFiles = allFiles
    .filter((file) => extname(file).toLowerCase() === ".webp")
    .sort((left, right) => left.localeCompare(right));
  const items = [];

  for (const file of imageFiles) {
    const buffer = await readFile(file);
    const info = await sharp(buffer).metadata();
    const fileStats = await stat(file);
    const relativePath = relative(rootDir, file).split("\\").join("/");
    const assetPath = `/images/styles/${relativePath}`;
    const provenancePath = file.replace(/\.webp$/i, ".provenance.json");
    const actualHash = `sha256:${createHash("sha256").update(buffer).digest("hex")}`;
    let provenance = null;
    let issues = [];

    try {
      provenance = JSON.parse(await readFile(provenancePath, "utf8"));
      issues = validateProvenance(provenance, assetPath, actualHash);
    } catch (error) {
      issues = error?.code === "ENOENT" ? ["missing-provenance"] : ["invalid-provenance-json"];
    }

    if (!info.width || !info.height) issues.push("missing-image-dimensions");

    items.push({
      assetPath,
      bytes: fileStats.size,
      width: info.width ?? null,
      height: info.height ?? null,
      contentHash: actualHash,
      provenancePath: provenance ? assetPath.replace(/\.webp$/i, ".provenance.json") : null,
      commercialReadiness: issues.length === 0 ? "research-only" : "blocked",
      issues,
    });
  }

  const blocked = items.filter((item) => item.commercialReadiness === "blocked");
  const large = items.filter((item) => item.bytes > 500 * 1024);
  const totalBytes = items.reduce((sum, item) => sum + item.bytes, 0);
  const styles = new Set(items.map((item) => item.assetPath.split("/").at(-2)));

  return {
    generatedAt: new Date().toISOString(),
    root: rootDir,
    summary: {
      images: items.length,
      styles: styles.size,
      totalBytes,
      blocked: blocked.length,
      researchOnly: items.length - blocked.length,
      over500KiB: large.length,
      paidDistributable: 0,
    },
    policy: {
      existingUse: "internal-visual-research",
      paidRedistribution: "prohibited-until-separate-rights-audit",
      source: "https://unsplash.com/documentation",
    },
    items,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const report = await auditStyleImages(
    args.find((argument) => !argument.startsWith("--")) || DEFAULT_ROOT,
  );
  const jsonMode = args.includes("--json");
  const strictMode = args.includes("--strict");

  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const { summary } = report;
    console.log(
      `[audit:style-images] ${summary.images} images across ${summary.styles} styles, ` +
      `${summary.blocked} blocked, ${summary.researchOnly} research-only, ` +
      `${summary.over500KiB} over 500 KiB, 0 approved for paid redistribution.`,
    );
    for (const item of report.items.filter((entry) => entry.issues.length > 0)) {
      console.log(`- ${item.assetPath}: ${item.issues.join(", ")}`);
    }
  }

  if (strictMode && report.summary.blocked > 0) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await main();
}
