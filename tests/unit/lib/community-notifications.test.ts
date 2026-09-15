import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { listCommunityNotifications, markCommunityNotificationsRead, notificationCursor, parseNotificationCursor, CommunityNotificationStoreError } from "@/lib/community/notifications";

const { publicStyles } = vi.hoisted(() => ({ publicStyles: vi.fn() }));
vi.mock("@/lib/community/public-style", () => ({ getPublicDiscussionStyles: publicStyles }));
const recipient = "11111111-1111-4111-8111-111111111111";
const commentId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const notificationId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const createdAt = "2026-09-15T00:00:00.123456+00:00";

function store(records: unknown[] = [], error: { code: string } | null = null) {
  const unread = {
    select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), in: vi.fn().mockReturnThis(),
    is: vi.fn().mockResolvedValue({ count: 3, error }),
  };
  const rows = {
    select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(), or: vi.fn().mockReturnThis(), limit: vi.fn().mockResolvedValue({ data: records, error }),
  };
  const from = vi.fn().mockReturnValueOnce(unread).mockReturnValue(rows);
  return { sb: { from } as unknown as SupabaseClient, rows, unread };
}

beforeEach(() => {
  vi.clearAllMocks();
  publicStyles.mockResolvedValue(new Map([
    ["dark-mode", { slug: "dark-mode", name: "暗色", nameEn: "Dark Mode", href: "/styles/dark-mode" }],
  ]));
});

describe("private reply inbox", () => {
  it("binds every query to the authenticated recipient and current public styles", async () => {
    const db = store([
      { id: notificationId, created_at: createdAt, read_at: null, style_slug: "dark-mode", comment: { id: commentId, content: "Reply text", author_name: "Member" }, recipient_id: "private-user-id" },
    ]);
    const page = await listCommunityNotifications(db.sb, recipient, { limit: 20, cursor: null });
    expect(db.rows.eq).toHaveBeenCalledWith("recipient_id", recipient);
    expect(db.unread.eq).toHaveBeenCalledWith("recipient_id", recipient);
    expect(db.rows.in).toHaveBeenCalledWith("style_slug", ["dark-mode"]);
    expect(page.items[0]).toMatchObject({ actorName: "Member", href: `/styles/dark-mode?comment=${commentId}#comment-${commentId}` });
    expect(page.unreadCount).toBe(3);
    expect(JSON.stringify(page)).not.toContain("private-user-id");
  });

  it("does not render hidden styles or deleted comment content", async () => {
    const db = store([
      { id: notificationId, created_at: createdAt, style_slug: "hidden-style", comment: { id: commentId, content: "Hidden text" } },
      { id: notificationId, created_at: createdAt, style_slug: "dark-mode", comment: null },
    ]);
    const page = await listCommunityNotifications(db.sb, recipient, { limit: 20, cursor: null });
    expect(page.items).toEqual([]);
  });

  it("returns a stable cursor instead of offsets that shift on new arrivals", async () => {
    const row = { id: notificationId, created_at: createdAt, read_at: null, style_slug: "dark-mode", comment: { id: commentId, content: "Reply", author_name: "Member" } };
    const db = store([row, { ...row, id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc" }]);
    const cursor = parseNotificationCursor(notificationCursor(createdAt, notificationId));
    const page = await listCommunityNotifications(db.sb, recipient, { limit: 1, cursor });
    expect(db.rows.or).toHaveBeenCalledWith(`created_at.lt.${createdAt},and(created_at.eq.${createdAt},id.lt.${notificationId})`);
    expect(parseNotificationCursor(page.nextCursor)).toEqual(cursor);
    expect(db.rows.limit).toHaveBeenCalledWith(2);
  });

  it("fails closed for unavailable visibility and distinguishes an upgrade from an empty inbox", async () => {
    const db = store([], { code: "42P01" });
    await expect(listCommunityNotifications(db.sb, recipient, { limit: 20, cursor: null })).rejects.toBeInstanceOf(CommunityNotificationStoreError);
    publicStyles.mockRejectedValue(new Error("Cannot verify visibility"));
    await expect(listCommunityNotifications(db.sb, recipient, { limit: 20, cursor: null })).rejects.toThrow("Cannot verify visibility");
  });

  it("only acknowledges explicitly selected, still-unread rows owned by the recipient", async () => {
    const query = { update: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), in: vi.fn().mockReturnThis(), is: vi.fn().mockResolvedValue({ error: null }) };
    const sb = { from: vi.fn().mockReturnValue(query) } as unknown as SupabaseClient;
    await markCommunityNotificationsRead(sb, recipient, [notificationId]);
    expect(query.eq).toHaveBeenCalledWith("recipient_id", recipient);
    expect(query.in).toHaveBeenCalledWith("id", [notificationId]);
    expect(query.is).toHaveBeenCalledWith("read_at", null);
  });

  it("rejects query-language injection, invalid dates, and malformed cursors", () => {
    expect(parseNotificationCursor(null)).toBeNull();
    expect(parseNotificationCursor(notificationCursor(createdAt, notificationId))).toEqual({ createdAt, id: notificationId });
    for (const value of ["not-base64", "x".repeat(257), notificationCursor("2026-09-15,recipient_id.neq.x", notificationId), notificationCursor(createdAt, "id),or=(recipient_id.neq.x")]) {
      expect(() => parseNotificationCursor(value)).toThrow("Invalid notification cursor");
    }
  });
});
