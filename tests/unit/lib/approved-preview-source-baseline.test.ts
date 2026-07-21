import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sourceBaseline from "@/tests/visual/approved-preview-source-baseline.json";
import approvedPreviews from "@/tests/visual/approved-preview-baseline.json";
import snapshotBaseline from "@/tests/visual/approved-preview-snapshot-hashes.json";

const ROOT = process.cwd();
const SNAPSHOT_DIRECTORY = path.join(
  ROOT,
  "tests/e2e/approved-preview-visual.spec.ts-snapshots"
);

describe("approved preview source baseline", () => {
  it("fails immediately when approved preview sources change", async () => {
    expect(sourceBaseline.baselineCommit).toBe(approvedPreviews.baselineCommit);
    expect(sourceBaseline.algorithm).toBe("sha256");

    for (const [relativePath, expectedHash] of Object.entries(
      sourceBaseline.files
    )) {
      const contents = await readFile(path.join(ROOT, relativePath));
      const actualHash = createHash("sha256").update(contents).digest("hex");
      expect(actualHash, relativePath).toBe(expectedHash);
    }
  });

  it("keeps visual snapshots complete and compare-only", async () => {
    const files = await readdir(SNAPSHOT_DIRECTORY);
    const pngFiles = files.filter((file) => file.endsWith(".png")).sort();
    const expectedCoverSnapshots = approvedPreviews.count * 2;
    const expectedSharedStateSnapshots = 3 * 2;

    expect(snapshotBaseline.baselineCommit).toBe(approvedPreviews.baselineCommit);
    expect(snapshotBaseline.algorithm).toBe("sha256");
    expect(snapshotBaseline.count).toBe(
      expectedCoverSnapshots + expectedSharedStateSnapshots
    );
    expect(pngFiles).toEqual(Object.keys(snapshotBaseline.files).sort());

    for (const file of pngFiles) {
      const contents = await readFile(path.join(SNAPSHOT_DIRECTORY, file));
      const actualHash = createHash("sha256").update(contents).digest("hex");
      const expectedHash = snapshotBaseline.files[
        file as keyof typeof snapshotBaseline.files
      ];
      expect(actualHash, file).toBe(expectedHash);
    }

    const packageJson = await readFile(path.join(ROOT, "package.json"), "utf8");
    const playwrightConfig = await readFile(
      path.join(ROOT, "tests/playwright.config.ts"),
      "utf8"
    );
    const ciWorkflow = await readFile(
      path.join(ROOT, ".github/workflows/ci.yml"),
      "utf8"
    );

    expect(packageJson).not.toContain("--update-snapshots");
    expect(ciWorkflow).not.toContain("--update-snapshots");
    expect(playwrightConfig).toContain('updateSnapshots: "none"');
  });
});
