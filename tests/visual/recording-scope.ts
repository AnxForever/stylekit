export interface RecordingContext {
  requestedSlug?: string;
  ci?: string;
  eventName?: string;
  updateSnapshots: string;
  approvedSlugs: readonly string[];
}

export const PREVIEW_SNAPSHOT_DIRECTORY = "tests/e2e/approved-preview-visual.spec.ts-snapshots";
export const FROZEN_BASELINE_FILES = [
  "tests/visual/approved-preview-baseline.json",
  "tests/visual/approved-preview-source-baseline.json",
  "tests/visual/approved-preview-snapshot-hashes.json",
  "lib/styles/__tests__/approved-preview-baseline.test.ts",
] as const;

export function resolveRecordingSlug(context: RecordingContext): string | null {
  const slug = context.requestedSlug?.trim();
  if (!slug) return null;
  if (
    context.ci !== "true" ||
    context.eventName !== "workflow_dispatch" ||
    !["all", "changed"].includes(context.updateSnapshots)
  ) {
    throw new Error("A style filter is only allowed during manual CI snapshot recording");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !context.approvedSlugs.includes(slug)) {
    throw new Error(`Cannot record an unknown or unapproved style: ${slug}`);
  }
  return slug;
}

export function targetedSnapshotNames(slug: string): string[] {
  return [
    `${slug}-cover-chromium-linux.png`,
    `${slug}-cover-mobile-chrome-linux.png`,
  ];
}

export function checkTargetedSnapshotChanges(
  before: Readonly<Record<string, string>>,
  after: Readonly<Record<string, string>>,
  slug: string,
): string[] {
  const beforeNames = Object.keys(before).sort();
  const afterNames = Object.keys(after).sort();
  if (JSON.stringify(beforeNames) !== JSON.stringify(afterNames)) {
    throw new Error("Targeted recording must preserve the complete PNG inventory");
  }
  const allowed = new Set(targetedSnapshotNames(slug));
  for (const name of allowed) {
    if (!(name in before)) throw new Error(`Target snapshot is missing: ${name}`);
  }
  const changed = beforeNames.filter((name) => before[name] !== after[name]);
  const unrelated = changed.filter((name) => !allowed.has(name));
  if (unrelated.length) {
    throw new Error(`Targeted recording changed unrelated PNGs: ${unrelated.join(", ")}`);
  }
  return changed;
}

export function checkTargetedWritePaths(
  changedPaths: readonly string[],
  slug: string,
  includeFrozenFiles: boolean,
): void {
  const allowed = new Set<string>([
    ...targetedSnapshotNames(slug).map((name) => `${PREVIEW_SNAPSHOT_DIRECTORY}/${name}`),
    ...(includeFrozenFiles ? FROZEN_BASELINE_FILES : []),
  ]);
  const unexpected = changedPaths.filter((name) => !allowed.has(name));
  if (unexpected.length) {
    throw new Error(`Targeted recording wrote outside its scope: ${unexpected.join(", ")}`);
  }
}
