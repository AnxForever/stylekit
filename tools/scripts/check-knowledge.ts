#!/usr/bin/env tsx

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parseKnowledgeResource, type KnowledgeResource } from "../../lib/knowledge";

const ROOT = process.cwd();
const MANIFEST_DIR = path.join(ROOT, "knowledge", "manifests");

async function readManifests(): Promise<Array<{ file: string; resource: KnowledgeResource }>> {
  const entries = await readdir(MANIFEST_DIR, { withFileTypes: true });
  const manifests: Array<{ file: string; resource: KnowledgeResource }> = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const file = path.join(MANIFEST_DIR, entry.name);
    const raw = JSON.parse(await readFile(file, "utf8")) as unknown;
    manifests.push({ file: entry.name, resource: parseKnowledgeResource(raw) });
  }

  return manifests;
}

async function main(): Promise<void> {
  const manifests = await readManifests();
  const ids = new Set<string>();
  const errors: string[] = [];

  for (const { file, resource } of manifests) {
    if (ids.has(resource.id)) errors.push(`${file}: duplicate resource id ${resource.id}`);
    ids.add(resource.id);

    if (!file.startsWith(`${resource.id}.`)) {
      errors.push(`${file}: filename must start with resource id ${resource.id}`);
    }

    if (resource.publicationStatus === "published" && !resource.publishedAt) {
      errors.push(`${file}: published resource is missing publishedAt`);
    }
  }

  if (errors.length > 0) {
    console.error(`[check:knowledge] FAIL - ${errors.length} issue(s)`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  const counts = manifests.reduce<Record<string, number>>((acc, { resource }) => {
    acc[resource.reviewStatus] = (acc[resource.reviewStatus] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`[check:knowledge] PASS - ${manifests.length} manifest(s)`);
  console.log(`reviewStatus ${JSON.stringify(counts)}`);
  console.log(`generatorApproved ${manifests.filter(({ resource }) => resource.usagePolicy === "generator-approved" || resource.usagePolicy === "distribution-approved").length}`);
}

void main();
