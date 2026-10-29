import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));

const { getAllStylesMetaMock, listCommunityStylesMetaMock } = vi.hoisted(() => ({
  getAllStylesMetaMock: vi.fn(),
  listCommunityStylesMetaMock: vi.fn(),
}));

vi.mock("@/lib/styles/meta", () => ({ getAllStylesMeta: getAllStylesMetaMock }));
vi.mock("@/lib/styles/community-runtime", () => ({
  listCommunityStylesMeta: listCommunityStylesMetaMock,
}));

const staticStyles = [
  { slug: "neo-brutalist", name: "新野兽派", nameEn: "Neo-Brutalist" },
  { slug: "editorial", name: "编辑风格", nameEn: "Editorial" },
];

describe("prompt-copy style labels", () => {
  beforeEach(() => {
    vi.resetModules();
    getAllStylesMetaMock.mockReset().mockReturnValue(staticStyles);
    listCommunityStylesMetaMock.mockReset();
  });

  afterEach(() => vi.useRealTimers());

  it("shares concurrent loads, keeps curated labels and caches community labels", async () => {
    vi.useFakeTimers();
    listCommunityStylesMetaMock.mockResolvedValue([
      { slug: "neo-brutalist", name: "Changed", nameEn: "Changed" },
      { slug: "community-style", name: "社区风格", nameEn: "Community Style" },
    ]);
    const { getPromptCopyStyleLabels } = await import("@/lib/admin/prompt-copy-style-labels");

    const [first, concurrent] = await Promise.all([
      getPromptCopyStyleLabels(),
      getPromptCopyStyleLabels(),
    ]);

    expect(first).toEqual([
      { slug: "neo-brutalist", name: "新野兽派", nameEn: "Neo-Brutalist" },
      { slug: "editorial", name: "编辑风格", nameEn: "Editorial" },
      { slug: "community-style", name: "社区风格", nameEn: "Community Style" },
    ]);
    expect(concurrent).toEqual(first);
    expect(listCommunityStylesMetaMock).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(5 * 60 * 1000 + 1);
    await getPromptCopyStyleLabels();
    expect(listCommunityStylesMetaMock).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("falls back to curated styles if community metadata is unavailable", async () => {
    listCommunityStylesMetaMock.mockRejectedValue(new Error("community store unavailable"));
    const { getPromptCopyStyleLabels } = await import("@/lib/admin/prompt-copy-style-labels");

    await expect(getPromptCopyStyleLabels()).resolves.toEqual(staticStyles);
  });
});
