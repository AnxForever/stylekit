#!/usr/bin/env tsx

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  getManifestSummary,
  validateStyleSubmissionManifest,
} from "../../lib/submit/manifest-validator";

function printUsage(): void {
  console.log("Usage:");
  console.log(
    "  npx --no-install tsx tools/submission/validate-manifest.ts <manifest.json>"
  );
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    printUsage();
    process.exit(1);
  }

  const absolutePath = resolve(process.cwd(), target);
  let content = "";

  try {
    content = await readFile(absolutePath, "utf-8");
  } catch (error) {
    console.error(`Failed to read manifest: ${(error as Error).message}`);
    process.exit(1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    console.error(`Invalid JSON: ${(error as Error).message}`);
    process.exit(1);
  }

  const result = validateStyleSubmissionManifest(parsed);
  if (!result.ok) {
    console.error("Manifest is invalid.");
    for (const issue of result.issues) {
      console.error(`- ${issue.path}: ${issue.message} (${issue.code})`);
    }
    process.exit(1);
  }

  const summary = getManifestSummary(result.data);
  console.log("Manifest is valid.");
  console.log(`- slug: ${summary.slug}`);
  console.log(`- name: ${summary.name}`);
  console.log(`- nameEn: ${summary.nameEn}`);
  console.log(`- category: ${summary.category}`);
  console.log(`- styleType: ${summary.styleType}`);
}

void main();
