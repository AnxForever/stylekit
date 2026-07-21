import { afterEach, describe, expect, it, vi } from "vitest";
import { buildWorkspaceZip, generateWorkspaceProject } from "@/lib/workspace";

afterEach(() => vi.useRealTimers());

describe("workspace deterministic export", () => {
  it("produces byte-identical ZIP artifacts for one saved generation", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const generation = generateWorkspaceProject({
      name: "Editorial Dashboard", description: "数据后台", projectType: "dashboard", stack: ["nextjs", "typescript"], selectedStyleSlug: "editorial",
      brief: { audience: "工程师", primaryGoal: "查看项目状态", requiredPages: ["概览"], requiredStates: ["loading", "empty", "error", "success"], brandPersonality: ["克制"], antiReferences: [], notes: "" },
      target: "nextjs", generatedAt: "2026-07-11T00:00:00.000Z",
    });
    const input = { projectName: "Editorial Dashboard", generatedAt: "2026-07-11T00:00:00.000Z", generation };
    vi.setSystemTime(new Date("2026-07-11T01:00:00.000Z"));
    const first = await buildWorkspaceZip(input);
    vi.setSystemTime(new Date("2027-08-12T02:03:04.000Z"));
    const second = await buildWorkspaceZip(input);
    expect(first.sha256).toBe(second.sha256);
    expect(first.content.equals(second.content)).toBe(true);
    expect(first.fileCount).toBe(generation.files.length);
  });

  it("rejects a saved generation whose file content no longer matches its hash", async () => {
    const generation = generateWorkspaceProject({
      name: "Editorial Dashboard", description: "数据后台", projectType: "dashboard", stack: ["nextjs", "typescript"], selectedStyleSlug: "editorial",
      brief: { audience: "工程师", primaryGoal: "查看项目状态", requiredPages: ["概览"], requiredStates: ["success"], brandPersonality: ["克制"], antiReferences: [], notes: "" },
      target: "nextjs", generatedAt: "2026-07-11T00:00:00.000Z",
    });
    const tampered = { ...generation, files: generation.files.map((file, index) => index === 0 ? { ...file, content: `${file.content}\n篡改` } : file) };
    await expect(buildWorkspaceZip({ projectName: "Editorial Dashboard", generatedAt: "2026-07-11T00:00:00.000Z", generation: tampered })).rejects.toThrow("Generated file hash mismatch");
  });
});
