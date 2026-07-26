// Recomputes the three frozen approved-preview baselines after new styles are added.
// Usage: node tools/remotion-assets/regen-baselines.mjs <baselineCommit> <slug1> [slug2 ...]
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const [commit, ...newSlugs] = process.argv.slice(2);
if (!commit || newSlugs.length === 0) {
  console.error("usage: regen-baselines.mjs <commit> <slugs...>");
  process.exit(1);
}

const sha = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");

// 1. slug inventory
const invPath = "tests/visual/approved-preview-baseline.json";
const inv = JSON.parse(readFileSync(invPath, "utf8"));
for (const s of newSlugs) if (!inv.slugs.includes(s)) inv.slugs.push(s);
inv.slugs.sort();
inv.count = inv.slugs.length;
inv.baselineCommit = commit;
writeFileSync(invPath, JSON.stringify(inv, null, 2) + "\n");

// 2. source hashes
const srcPath = "tests/visual/approved-preview-source-baseline.json";
const src = JSON.parse(readFileSync(srcPath, "utf8"));
for (const s of newSlugs) src.files[`lib/style-preview/styles/${s}.tsx`] = "";
const files = {};
for (const rel of Object.keys(src.files).sort()) files[rel] = sha(rel);
src.files = files;
src.baselineCommit = commit;
writeFileSync(srcPath, JSON.stringify(src, null, 2) + "\n");

// 3. snapshot hashes
const snapDir = "tests/e2e/approved-preview-visual.spec.ts-snapshots";
const snapPath = "tests/visual/approved-preview-snapshot-hashes.json";
const snap = JSON.parse(readFileSync(snapPath, "utf8"));
const pngs = readdirSync(snapDir).filter((f) => f.endsWith(".png")).sort();
snap.files = Object.fromEntries(pngs.map((f) => [f, sha(path.join(snapDir, f))]));
snap.count = pngs.length;
snap.baselineCommit = commit;
writeFileSync(snapPath, JSON.stringify(snap, null, 2) + "\n");

console.log("inventory:", inv.count, "| source files:", Object.keys(files).length, "| snapshots:", snap.count);
