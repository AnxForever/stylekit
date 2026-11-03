import { beforeEach, describe, expect, it, vi } from "vitest";

const { readFile } = vi.hoisted(() => ({ readFile: vi.fn() }));
vi.mock("node:fs/promises", () => ({ readFile }));

describe("social preview logo loading", () => {
  beforeEach(() => {
    vi.resetModules();
    readFile.mockReset();
  });

  it("recovers from a temporary read failure without restarting the process", async () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" />';
    const failure = new Error("temporary filesystem failure");
    readFile.mockRejectedValueOnce(failure).mockResolvedValue(svg);
    const { getOgBrandLogoDataUri } = await import("@/lib/og/shared");

    await expect(getOgBrandLogoDataUri()).rejects.toBe(failure);
    const [first, second] = await Promise.all([
      getOgBrandLogoDataUri(), getOgBrandLogoDataUri(),
    ]);
    expect(first).toBe("data:image/svg+xml;base64," + Buffer.from(svg).toString("base64"));
    expect(second).toBe(first);
    expect(readFile).toHaveBeenCalledTimes(2);
  });
});
