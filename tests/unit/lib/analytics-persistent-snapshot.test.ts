import { beforeEach, describe, expect, it, vi } from "vitest";

const fsState = vi.hoisted(() => ({
  contents: "",
  temporaryFiles: new Map<string, string>(),
  mkdir: vi.fn(),
  readFile: vi.fn(),
  rename: vi.fn(),
  writeFile: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("node:fs/promises", () => ({
  mkdir: fsState.mkdir,
  readFile: fsState.readFile,
  rename: fsState.rename,
  writeFile: fsState.writeFile,
}));

async function loadSnapshots() {
  vi.resetModules();
  return import("@/lib/admin/analytics-persistent-snapshot");
}

describe("persistent analytics snapshots", () => {
  beforeEach(() => {
    fsState.contents = "";
    fsState.temporaryFiles.clear();
    fsState.mkdir.mockReset().mockResolvedValue(undefined);
    fsState.readFile.mockReset().mockImplementation(async () => fsState.contents);
    fsState.writeFile.mockReset().mockImplementation(async (filePath: string, data: string) => {
      fsState.temporaryFiles.set(filePath, data);
    });
    fsState.rename.mockReset().mockImplementation(async (from: string) => {
      const contents = fsState.temporaryFiles.get(from);
      if (contents === undefined) throw new Error("temporary snapshot not found");
      fsState.contents = contents;
    });
  });

  it("loads and parses the snapshot file once for concurrent cold reads", async () => {
    const now = Date.now();
    fsState.contents = JSON.stringify({
      content: { writtenAt: now, value: { count: 3, generatedAt: "original-time" } },
      events: { writtenAt: now, value: [{ event: "prompt_copy" }] },
    });
    fsState.readFile.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      return fsState.contents;
    });

    const snapshots = await loadSnapshots();
    const [content, events] = await Promise.all([
      snapshots.readPersistentAnalyticsSnapshot("content"),
      snapshots.readPersistentAnalyticsSnapshot("events"),
    ]);

    expect(content).toEqual({ count: 3, generatedAt: "original-time" });
    expect(events).toEqual([{ event: "prompt_copy" }]);
    expect(fsState.readFile).toHaveBeenCalledTimes(1);
  });

  it("drops expired fallbacks instead of relabeling them as fresh", async () => {
    const now = Date.now();
    fsState.contents = JSON.stringify({
      old: {
        writtenAt: now - 8 * 24 * 60 * 60 * 1000,
        value: { count: 11, generatedAt: "original-time" },
      },
    });

    const snapshots = await loadSnapshots();
    await expect(snapshots.readPersistentAnalyticsSnapshot("old")).resolves.toBeNull();
  });

  it("merges same-turn writes into one read and one atomic replacement", async () => {
    const snapshots = await loadSnapshots();

    await Promise.all([
      snapshots.writePersistentAnalyticsSnapshot("content", { count: 1 }),
      snapshots.writePersistentAnalyticsSnapshot("events", [{ event: "copy" }]),
    ]);

    const persisted = JSON.parse(fsState.contents);
    expect(persisted.content.value).toEqual({ count: 1 });
    expect(persisted.events.value).toEqual([{ event: "copy" }]);
    expect(fsState.readFile).toHaveBeenCalledTimes(1);
    expect(fsState.writeFile).toHaveBeenCalledTimes(1);
    expect(fsState.rename).toHaveBeenCalledTimes(1);
  });

  it("keeps validated snapshots usable in process when persistence fails", async () => {
    const snapshots = await loadSnapshots();
    fsState.writeFile.mockRejectedValueOnce(new Error("disk full"));

    await expect(
      snapshots.writePersistentAnalyticsSnapshot("content", {
        count: 5,
        generatedAt: "original-time",
      }),
    ).resolves.toBeUndefined();
    await expect(snapshots.readPersistentAnalyticsSnapshot("content")).resolves.toEqual({
      count: 5,
      generatedAt: "original-time",
    });
  });
});
