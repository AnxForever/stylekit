import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { lstat, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { stylesMeta } from "../../lib/styles/meta-registry";
import { PENDING_STYLE_SLUGS } from "../../lib/styles/review-status";
import { approvedPreviewSourcePaths } from "../../tests/visual/approved-preview-sources";
import {
  checkTargetedSnapshotChanges,
  checkTargetedWritePaths,
  FROZEN_BASELINE_FILES,
  PREVIEW_SNAPSHOT_DIRECTORY,
  resolveRecordingSlug,
} from "../../tests/visual/recording-scope";

interface RecordingBoundary {
  version: 1;
  slug: string;
  head: string;
  approvedSlugs: string[];
  pendingSlugs: string[];
  snapshots: Record<string, string>;
  sources: Record<string, string>;
}

const ROOT = process.cwd();
const git = (...args: string[]): string => execFileSync("git", args, {
  cwd: ROOT,
  encoding: "utf8",
}).trim();

function equal(actual: unknown, expected: unknown, message: string): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(message);
}

async function readJson<T>(relativePath: string): Promise<T> {
  return JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8")) as T;
}

async function hashes(relativePaths: readonly string[]): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const relativePath of [...relativePaths].sort()) {
    const filename = path.join(ROOT, relativePath);
    if (!(await lstat(filename)).isFile()) throw new Error(`Expected a regular file: ${relativePath}`);
    result[relativePath] = createHash("sha256").update(await readFile(filename)).digest("hex");
  }
  return result;
}

async function snapshotHashes(): Promise<Record<string, string>> {
  const names = (await readdir(path.join(ROOT, PREVIEW_SNAPSHOT_DIRECTORY)))
    .filter((name) => name.endsWith(".png"))
    .sort();
  const files = await hashes(names.map((name) => `${PREVIEW_SNAPSHOT_DIRECTORY}/${name}`));
  return Object.fromEntries(names.map((name) => [name, files[`${PREVIEW_SNAPSHOT_DIRECTORY}/${name}`]]));
}

function changedPaths(): string[] {
  return [...new Set([
    ...git("diff", "--name-only", "-z", "HEAD").split("\0"),
    ...git("ls-files", "--others", "--exclude-standard", "-z").split("\0"),
  ].filter(Boolean))].sort();
}

async function main(): Promise<void> {
  const mode = process.argv[2];
  if (!["capture", "verify-recording", "verify-frozen"].includes(mode)) {
    throw new Error("Use capture, verify-recording, or verify-frozen");
  }
  const boundaryFile = process.env.STYLEKIT_BASELINE_GUARD_FILE;
  if (!boundaryFile || !path.isAbsolute(boundaryFile)) {
    throw new Error("STYLEKIT_BASELINE_GUARD_FILE must be an absolute temporary path");
  }
  const pendingSlugs = [...PENDING_STYLE_SLUGS].sort();
  const pending = new Set<string>(pendingSlugs);
  const approvedSlugs = stylesMeta.map((style) => style.slug)
    .filter((slug) => !pending.has(slug)).sort();
  const head = git("rev-parse", "HEAD");
  const snapshots = await snapshotHashes();
  const sources = await hashes(approvedPreviewSourcePaths(approvedSlugs));
  const inventory = await readJson<{ count: number; slugs: string[]; baselineCommit: string }>(FROZEN_BASELINE_FILES[0]);
  equal(inventory.slugs, approvedSlugs, "Approved slug inventory changed before or during targeted recording");
  equal(inventory.count, approvedSlugs.length, "Approved style count changed");
  equal(Object.keys(snapshots).length, approvedSlugs.length * 2 + 6, "Snapshot count changed");

  if (mode === "capture") {
    const slug = resolveRecordingSlug({
      requestedSlug: process.env.STYLEKIT_RECORD_STYLE_SLUG,
      ci: process.env.CI,
      eventName: process.env.GITHUB_EVENT_NAME,
      updateSnapshots: "all",
      approvedSlugs,
    });
    if (!slug) throw new Error("A targeted recording boundary requires a style slug");
    if (changedPaths().length) throw new Error("Capture the boundary from a clean committed checkout");
    const recorded = await readJson<{ files: Record<string, string> }>(FROZEN_BASELINE_FILES[2]);
    equal(snapshots, recorded.files, "Existing PNGs differ from their frozen hashes");
    checkTargetedSnapshotChanges(snapshots, snapshots, slug);
    const boundary: RecordingBoundary = { version: 1, slug, head, approvedSlugs, pendingSlugs, snapshots, sources };
    await writeFile(boundaryFile, `${JSON.stringify(boundary, null, 2)}\n`, { flag: "wx" });
    console.log(`[visual-baseline-scope] captured ${Object.keys(snapshots).length} PNGs; only ${slug} may change`);
    return;
  }

  const boundary = JSON.parse(await readFile(boundaryFile, "utf8")) as RecordingBoundary;
  equal(boundary.version, 1, "Unknown recording boundary version");
  equal(head, boundary.head, "Recording checkout commit changed");
  equal(approvedSlugs, boundary.approvedSlugs, "Approved styles changed during recording");
  equal(pendingSlugs, boundary.pendingSlugs, "Pending styles changed during recording");
  equal(sources, boundary.sources, "Preview source changed during recording");
  const changed = checkTargetedSnapshotChanges(boundary.snapshots, snapshots, boundary.slug);
  checkTargetedWritePaths(changedPaths(), boundary.slug, mode === "verify-frozen");

  if (mode === "verify-frozen") {
    const sourceBaseline = await readJson<{ baselineCommit: string; files: Record<string, string> }>(FROZEN_BASELINE_FILES[1]);
    const snapshotBaseline = await readJson<{ baselineCommit: string; count: number; files: Record<string, string> }>(FROZEN_BASELINE_FILES[2]);
    equal(sourceBaseline.files, sources, "Frozen source hashes differ from the recorded source");
    equal(snapshotBaseline.files, snapshots, "Frozen PNG hashes differ from the recorded images");
    equal(snapshotBaseline.count, Object.keys(snapshots).length, "Frozen PNG count changed");
    equal(sourceBaseline.baselineCommit, inventory.baselineCommit, "Frozen source commit pin differs");
    equal(snapshotBaseline.baselineCommit, inventory.baselineCommit, "Frozen snapshot commit pin differs");
    equal(inventory.baselineCommit, git("rev-parse", "--short=8", "HEAD"), "Baseline commit differs from recording checkout");
    const pinTest = await readFile(path.join(ROOT, FROZEN_BASELINE_FILES[3]), "utf8");
    const pinned = pinTest.match(/expect\(baseline\.baselineCommit\)\.toBe\("([0-9a-f]+)"\)/)?.[1];
    equal(pinned, inventory.baselineCommit, "Baseline test pin differs");
  }
  console.log(`[visual-baseline-scope] PASS: ${changed.length} target PNGs changed; ${Object.keys(snapshots).length - 2} unrelated PNGs retained`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
