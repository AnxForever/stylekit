import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  checkTargetedSnapshotChanges,
  checkTargetedWritePaths,
  FROZEN_BASELINE_FILES,
  PREVIEW_SNAPSHOT_DIRECTORY,
  resolveRecordingSlug,
  targetedSnapshotNames,
} from "@/tests/visual/recording-scope";
import {
  approvedPreviewSourcePaths,
  LIQUID_GLASS_PREVIEW_DEPENDENCIES,
} from "@/tests/visual/approved-preview-sources";

const context = {
  requestedSlug: "liquid-glass",
  ci: "true",
  eventName: "workflow_dispatch",
  updateSnapshots: "all",
  approvedSlugs: ["liquid-glass", "swiss-style"],
};
const [desktop, mobile] = targetedSnapshotNames("liquid-glass");
const before = {
  [desktop]: "old-desktop",
  [mobile]: "old-mobile",
  "swiss-style-cover-chromium-linux.png": "swiss",
  "shared-card-hover-chromium-linux.png": "shared",
};

describe("targeted visual baseline recording", () => {
  it("keeps an unfiltered full comparison as the default", () => {
    expect(resolveRecordingSlug({ ...context, requestedSlug: undefined, updateSnapshots: "none", eventName: "push" })).toBeNull();
    expect(resolveRecordingSlug({ ...context, requestedSlug: " " })).toBeNull();
  });

  it("allows one approved slug only in manual CI recording", () => {
    expect(resolveRecordingSlug(context)).toBe("liquid-glass");
    expect(resolveRecordingSlug({ ...context, updateSnapshots: "changed" })).toBe("liquid-glass");
    for (const override of [
      { ci: "false" }, { eventName: "push" }, { eventName: "pull_request" },
      { updateSnapshots: "none" }, { updateSnapshots: "missing" },
      { requestedSlug: "e-ink" }, { requestedSlug: "../liquid-glass" },
      { requestedSlug: "liquid-glass,swiss-style" },
    ]) {
      expect(() => resolveRecordingSlug({ ...context, ...override })).toThrow();
    }
  });

  it("allows target PNG updates and preserves every other PNG hash", () => {
    expect(checkTargetedSnapshotChanges(before, { ...before, [desktop]: "new", [mobile]: "new" }, "liquid-glass")).toEqual([desktop, mobile].sort());
    expect(checkTargetedSnapshotChanges(before, before, "liquid-glass")).toEqual([]);
    expect(() => checkTargetedSnapshotChanges(before, { ...before, "swiss-style-cover-chromium-linux.png": "changed" }, "liquid-glass")).toThrow("unrelated");
    expect(() => checkTargetedSnapshotChanges(before, { ...before, "shared-card-hover-chromium-linux.png": "changed" }, "liquid-glass")).toThrow("unrelated");
  });

  it("rejects added, removed, or missing target PNGs", () => {
    expect(() => checkTargetedSnapshotChanges(before, { ...before, "new.png": "hash" }, "liquid-glass")).toThrow("inventory");
    const after = { ...before };
    delete after[desktop];
    expect(() => checkTargetedSnapshotChanges(before, after, "liquid-glass")).toThrow("inventory");
    expect(() => checkTargetedSnapshotChanges({}, {}, "liquid-glass")).toThrow("missing");
  });

  it("permits frozen-file sync only after the recording boundary passed", () => {
    const targetPath = `${PREVIEW_SNAPSHOT_DIRECTORY}/${desktop}`;
    expect(() => checkTargetedWritePaths([targetPath], "liquid-glass", false)).not.toThrow();
    expect(() => checkTargetedWritePaths([FROZEN_BASELINE_FILES[0]], "liquid-glass", false)).toThrow("scope");
    expect(() => checkTargetedWritePaths([targetPath, ...FROZEN_BASELINE_FILES], "liquid-glass", true)).not.toThrow();
    expect(() => checkTargetedWritePaths(["lib/styles/review-status.ts"], "liquid-glass", true)).toThrow("scope");
    expect(() => checkTargetedWritePaths(["tests/playwright.config.ts"], "liquid-glass", true)).toThrow("scope");
  });

  it("pins the renderer, CSS, optics, and glacier used by the cover", () => {
    const sourcePaths = approvedPreviewSourcePaths(context.approvedSlugs);
    for (const dependency of LIQUID_GLASS_PREVIEW_DEPENDENCIES) {
      expect(sourcePaths).toContain(dependency);
    }
    expect(sourcePaths).toContain("lib/style-preview/styles/liquid-glass.tsx");
    expect(sourcePaths).toContain("lib/styles/meta-registry.ts");
    expect(new Set(sourcePaths).size).toBe(sourcePaths.length);
    expect(approvedPreviewSourcePaths(["swiss-style"])).not.toContain("lib/liquid-glass/optics.ts");
  });

  it("keeps the replay unfiltered and compare-only in the manual workflow", async () => {
    const workflow = await readFile(path.join(process.cwd(), ".github/workflows/record-visual-baselines.yml"), "utf8");
    const replay = workflow.split("- name: Replay against the new baselines")[1]?.split("- name:")[0];
    expect(replay).toBeDefined();
    expect(replay).toContain("tests/e2e/approved-preview-visual.spec.ts");
    expect(replay).not.toContain("STYLEKIT_RECORD_STYLE_SLUG");
    expect(replay).not.toContain("--update-snapshots");
    expect(workflow).toContain("check-visual-baseline-recording.ts verify-recording");
    expect(workflow).toContain("check-visual-baseline-recording.ts verify-frozen");
  });
});
