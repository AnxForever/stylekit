import { beforeEach, describe, expect, it, vi } from "vitest";
import type { StyleMeta } from "@/lib/styles/meta";

const mocks = vi.hoisted(() => ({
  getClient: vi.fn(),
  getStyles: vi.fn(),
  listCommunity: vi.fn(),
}));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: mocks.getClient }));
vi.mock("@/lib/styles/meta", () => ({ getAllStylesMeta: mocks.getStyles }));
vi.mock("@/lib/styles/community-runtime", () => ({ listCommunityStylesMeta: mocks.listCommunity }));

import { getRecentDiscussions } from "@/lib/community/discussions";
import { getCommunityCatalog } from "@/lib/community/catalog";

function style(slug: string): StyleMeta {
  return {
    slug, name: "测试风格", nameEn: slug, description: "测试", descriptionEn: "Test",
    cover: "/test.svg", category: "modern", styleType: "visual", tags: [], keywords: [],
    colors: { primary: "#111111", secondary: "#ffffff", accent: [] },
  };
}

function comment(slug: string, id = slug) {
  return {
    id, style_slug: slug, author_name: "Creator", content: `Feedback on ${slug}`,
    created_at: "2026-09-14T10:00:00.000Z",
  };
}

function database(rows: unknown[], error: unknown = null) {
  const query = {
    select: vi.fn().mockReturnThis(), in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(), limit: vi.fn().mockResolvedValue({ data: rows, error }),
  };
  const from = vi.fn().mockReturnValue(query);
  mocks.getClient.mockReturnValue({ from });
  return { ...query, from };
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getStyles.mockReturnValue([style("curated")]);
  mocks.listCommunity.mockResolvedValue([]);
});

describe("public community discussion discovery", () => {
  it("selects only public fields and links curated and approved work to the right discussion", async () => {
    const db = database([
      { ...comment("curated"), ip_address: "private-ip", session_id: "private-session" },
      comment("submitted"),
    ]);
    const result = await getRecentDiscussions([style("submitted")]);

    expect(db.from).toHaveBeenCalledWith("style_comments");
    expect(db.select).toHaveBeenCalledWith("id, style_slug, content, author_name, created_at");
    expect(db.in).not.toHaveBeenCalled();
    expect(db.order.mock.calls).toEqual([
      ["created_at", { ascending: false }], ["id", { ascending: false }],
    ]);
    expect(db.limit).toHaveBeenCalledWith(60);
    expect(result.status).toBe("ready");
    expect(result.items.map((item) => item.href)).toEqual([
      "/styles/curated?comment=curated#comment-curated",
      "/community/submitted?comment=submitted#comment-submitted",
    ]);
    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ messageCount: 1, authorCount: 1 }),
      ])
    );
    expect(JSON.stringify(result)).not.toContain("private-");
  });

  it("cannot surface hidden or unknown styles, even if an upstream result contains them", async () => {
    database([comment("hidden"), comment("unknown"), comment("curated")]);
    expect((await getRecentDiscussions([])).items.map((item) => item.style.slug)).toEqual(["curated"]);
  });

  it("starts the bounded activity query while the public catalog is still loading", async () => {
    const db = database([comment("submitted")]);
    let resolveStyles: ((styles: StyleMeta[]) => void) | undefined;
    const pendingStyles = new Promise<StyleMeta[]>((resolve) => {
      resolveStyles = resolve;
    });

    const resultPromise = getRecentDiscussions(pendingStyles);
    expect(db.limit).toHaveBeenCalledWith(60);

    resolveStyles?.([style("submitted")]);
    await expect(resultPromise).resolves.toMatchObject({
      status: "ready",
      items: [expect.objectContaining({ id: "submitted" })],
    });
  });

  it("deduplicates activity, prefers curated destinations on collisions, and caps the feed", async () => {
    const styles = Array.from({ length: 8 }, (_, index) => style(`style-${index}`));
    mocks.getStyles.mockReturnValue(styles);
    database([comment("style-0", "newest"), comment("style-0", "older"), ...styles.slice(1).map((entry) => comment(entry.slug))]);
    const result = await getRecentDiscussions([style("style-0")]);
    expect(result.items).toHaveLength(6);
    expect(result.items[0]).toMatchObject({
      id: "newest",
      href: "/styles/style-0?comment=newest#comment-newest",
      messageCount: 2,
      authorCount: 1,
    });
  });

  it("rejects malformed or empty comments and invalid publication dates", async () => {
    database([null, { ...comment("curated"), content: "  " }, { ...comment("curated"), created_at: "not-a-date" }]);
    expect(await getRecentDiscussions([])).toEqual({ status: "ready", items: [] });
  });

  it("distinguishes a genuinely empty discussion list from an unavailable database", async () => {
    database([]);
    expect(await getRecentDiscussions([])).toEqual({ status: "ready", items: [] });
    database([], { message: "internal database details" });
    expect(await getRecentDiscussions([])).toEqual({ status: "unavailable", items: [] });
    mocks.getClient.mockReturnValue(null);
    expect(await getRecentDiscussions([])).toEqual({ status: "unavailable", items: [] });
    mocks.getClient.mockImplementation(() => { throw new Error("network failure"); });
    expect(await getRecentDiscussions([])).toEqual({ status: "unavailable", items: [] });
  });
});

describe("community catalog availability", () => {
  it("does not turn an upstream error into an empty successful catalog", async () => {
    expect(await getCommunityCatalog()).toEqual({ status: "ready", styles: [] });
    mocks.listCommunity.mockRejectedValue(new Error("database unavailable"));
    expect(await getCommunityCatalog()).toEqual({ status: "unavailable", styles: [] });
  });
});
