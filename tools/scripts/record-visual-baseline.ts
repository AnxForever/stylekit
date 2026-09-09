/**
 * Rewrite the three frozen files that pin the approved-preview visual contract.
 *
 * They must agree on one baseline commit, and each was previously edited by
 * hand. That is how they drifted apart: at one point the source baseline had
 * moved to a new commit while the slug inventory and the snapshot hashes were
 * still on the old one, so the suite failed its own consistency assertions
 * before it could compare a single pixel.
 *
 * Run this after re-recording snapshots, from the same checkout that recorded
 * them:
 *
 *   pnpm run test:preview-visual:update
 *   pnpm run record:visual-baseline
 *
 * Pass --check to verify without writing (used by CI to prove the committed
 * files match the images actually in the tree).
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { stylesMeta } from "../../lib/styles/meta-registry";
import { PENDING_STYLE_SLUGS } from "../../lib/styles/review-status";

const ROOT = process.cwd();
const SNAPSHOT_DIR = "tests/e2e/approved-preview-visual.spec.ts-snapshots";
const BASELINE = "tests/visual/approved-preview-baseline.json";
const SOURCE_BASELINE = "tests/visual/approved-preview-source-baseline.json";
const SNAPSHOT_HASHES = "tests/visual/approved-preview-snapshot-hashes.json";
const PIN_TEST = "lib/styles/__tests__/approved-preview-baseline.test.ts";

// Files whose content decides how a cover renders. A change to any of them
// should force the baseline to be re-examined, which is what the source hashes
// are for. Per-style preview modules are appended per approved slug.
const SHARED_SOURCES = [
  "components/home/featured-carousel.tsx",
  "components/home/home-style-card.tsx",
  "components/home/style-card.tsx",
  "components/style-preview-switcher.tsx",
  "components/style-preview/style-cover-preview.tsx",
  "lib/style-components.tsx",
  "lib/style-preview/delivery.ts",
  "lib/style-preview/registry.ts",
  "lib/style-preview/types.ts",
  "lib/styles/meta-registry.ts",
] as const;

// Three shared card states (default, hover, focus) captured on both projects.
const SHARED_STATE_SNAPSHOTS = 3 * 2;

const checkOnly = process.argv.includes("--check");

async function sha256(relativePath: string): Promise<string> {
  const contents = await readFile(path.join(ROOT, relativePath));
  return createHash("sha256").update(contents).digest("hex");
}

function currentCommit(): string {
  return execFileSync("git", ["rev-parse", "--short=8", "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
}

async function main(): Promise<void> {
  const pending = new Set<string>(PENDING_STYLE_SLUGS);
  const approvedSlugs = stylesMeta
    .map((style) => style.slug)
    .filter((slug) => !pending.has(slug))
    .sort();

  const baselineCommit = currentCommit();

  const baseline = {
    baselineCommit,
    count: approvedSlugs.length,
    slugs: approvedSlugs,
  };

  const sourceFiles: Record<string, string> = {};
  for (const relativePath of [
    ...SHARED_SOURCES,
    ...approvedSlugs.map((slug) => `lib/style-preview/styles/${slug}.tsx`),
  ].sort()) {
    sourceFiles[relativePath] = await sha256(relativePath);
  }
  const sourceBaseline = {
    baselineCommit,
    algorithm: "sha256",
    files: sourceFiles,
  };

  const pngs = (await readdir(path.join(ROOT, SNAPSHOT_DIR)))
    .filter((file) => file.endsWith(".png"))
    .sort();
  const snapshotFiles: Record<string, string> = {};
  for (const file of pngs) {
    snapshotFiles[file] = await sha256(path.join(SNAPSHOT_DIR, file));
  }
  const snapshotHashes = {
    baselineCommit,
    algorithm: "sha256",
    count: pngs.length,
    files: snapshotFiles,
  };

  const expectedSnapshots =
    approvedSlugs.length * 2 + SHARED_STATE_SNAPSHOTS;
  if (pngs.length !== expectedSnapshots) {
    console.error(
      `[record:visual-baseline] FAIL - found ${pngs.length} snapshots but `
        + `${approvedSlugs.length} approved styles need `
        + `${expectedSnapshots} (${approvedSlugs.length} covers x 2 projects `
        + `+ 3 shared states x 2). Re-record before syncing.`,
    );
    process.exitCode = 1;
    return;
  }

  const writes: [string, string][] = [
    [BASELINE, `${JSON.stringify(baseline, null, 2)}\n`],
    [SOURCE_BASELINE, `${JSON.stringify(sourceBaseline, null, 2)}\n`],
    [SNAPSHOT_HASHES, `${JSON.stringify(snapshotHashes, null, 2)}\n`],
  ];

  const pinSource = await readFile(path.join(ROOT, PIN_TEST), "utf8");
  const pinPattern = /(expect\(baseline\.baselineCommit\)\.toBe\(")([0-9a-f]+)("\))/;
  if (!pinPattern.test(pinSource)) {
    console.error(
      `[record:visual-baseline] FAIL - could not find the baseline commit pin in ${PIN_TEST}.`,
    );
    process.exitCode = 1;
    return;
  }
  writes.push([
    PIN_TEST,
    pinSource.replace(pinPattern, `$1${baselineCommit}$3`),
  ]);

  if (checkOnly) {
    // The recorded commit legitimately differs once anything else lands, so it
    // is the one field to ignore. Blanking every 8-hex run would also shred the
    // sha256 digests into placeholders and quietly stop comparing them, which
    // is the only thing this check exists to compare.
    const normalise = (relativePath: string, value: string) =>
      relativePath === PIN_TEST
        ? value.replace(pinPattern, "$1<commit>$3")
        : value.replace(/"baselineCommit": "[0-9a-f]+"/, '"baselineCommit": "<commit>"');

    // Normalising the commit is what lets the rest be compared, so the four
    // recorded commits have to be checked against each other explicitly. They
    // drifting apart is the exact failure this contract has already hit once:
    // the source baseline moved forward while the slug inventory and snapshot
    // hashes stayed behind, and the suite then failed on its own consistency
    // assertions rather than on anything it was meant to catch.
    const recorded = new Map<string, string>();
    for (const relativePath of [BASELINE, SOURCE_BASELINE, SNAPSHOT_HASHES]) {
      const parsed = JSON.parse(
        await readFile(path.join(ROOT, relativePath), "utf8"),
      ) as { baselineCommit?: string };
      recorded.set(relativePath, String(parsed.baselineCommit));
    }
    recorded.set(
      PIN_TEST,
      (await readFile(path.join(ROOT, PIN_TEST), "utf8")).match(pinPattern)?.[2]
        ?? "missing",
    );
    const distinct = new Set(recorded.values());
    if (distinct.size > 1) {
      console.error(
        "[record:visual-baseline] FAIL - the frozen files pin different baseline commits:\n"
          + [...recorded]
            .map(([file, commit]) => `- ${commit}  ${file}`)
            .join("\n"),
      );
      process.exitCode = 1;
      return;
    }

    const drifted: string[] = [];
    for (const [relativePath, expected] of writes) {
      const actual = await readFile(path.join(ROOT, relativePath), "utf8");
      if (
        normalise(relativePath, actual) !== normalise(relativePath, expected)
      ) {
        drifted.push(relativePath);
      }
    }
    if (drifted.length) {
      console.error(
        `[record:visual-baseline] FAIL - these files disagree with the snapshots on disk:\n`
          + drifted.map((file) => `- ${file}`).join("\n"),
      );
      process.exitCode = 1;
      return;
    }
    console.log(
      `[record:visual-baseline] PASS - ${pngs.length} snapshots and ${approvedSlugs.length} approved styles match the committed baselines.`,
    );
    return;
  }

  for (const [relativePath, contents] of writes) {
    await writeFile(path.join(ROOT, relativePath), contents, "utf8");
  }

  console.log(
    `[record:visual-baseline] wrote baseline ${baselineCommit}: `
      + `${approvedSlugs.length} approved styles, ${pngs.length} snapshots, `
      + `${Object.keys(sourceFiles).length} source files.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
