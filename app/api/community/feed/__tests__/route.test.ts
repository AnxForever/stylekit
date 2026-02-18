import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/community/feed", () => ({
  listCommunityFeed: vi.fn(),
}));

import { GET } from "@/app/api/community/feed/route";
import { listCommunityFeed } from "@/lib/community/feed";

const mockedListCommunityFeed = vi.mocked(listCommunityFeed);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/community/feed", () => {
  it("returns 400 for invalid slug", async () => {
    const response = await GET(
      new Request("https://stylekit.top/api/community/feed?slug=Not_Valid")
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid style slug",
    });
  });

  it("returns feed payload with normalized params", async () => {
    mockedListCommunityFeed.mockResolvedValue({
      items: [
        {
          id: "s1",
          slug: "neo-brutalist",
          status: "approved",
          submittedAt: "2026-02-10T00:00:00.000Z",
          reviewedAt: "2026-02-11T00:00:00.000Z",
          title: "Neo Brutalist Remix",
          titleEn: "Neo Brutalist Remix",
          description: "desc",
          cover: "/styles/neo-brutalist.svg",
          author: {
            handle: "anxforever",
            avatarUrl: null,
            provider: "github",
            userId: "user-1",
          },
        },
      ],
      total: 1,
    } as never);

    const response = await GET(
      new Request(
        "https://stylekit.top/api/community/feed?limit=999&offset=-12&slug=neo-brutalist"
      )
    );

    expect(mockedListCommunityFeed).toHaveBeenCalledWith({
      limit: 48,
      offset: 0,
      slug: "neo-brutalist",
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      items: [
        {
          id: "s1",
          slug: "neo-brutalist",
          status: "approved",
          submittedAt: "2026-02-10T00:00:00.000Z",
          reviewedAt: "2026-02-11T00:00:00.000Z",
          title: "Neo Brutalist Remix",
          titleEn: "Neo Brutalist Remix",
          description: "desc",
          cover: "/styles/neo-brutalist.svg",
          author: {
            handle: "anxforever",
            avatarUrl: null,
            provider: "github",
            userId: "user-1",
          },
        },
      ],
      total: 1,
      limit: 48,
      offset: 0,
    });
  });
});
