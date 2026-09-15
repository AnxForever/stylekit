import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { attachReplyContexts, isReplySchemaMissing, readCommentRows } from "@/lib/community/comment-threads";

function listStore(results: unknown[]) {
  const range = vi.fn();
  for (const result of results) range.mockResolvedValueOnce(result);
  const query = { select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), order: vi.fn().mockReturnThis(), range };
  const sb = { from: vi.fn().mockReturnValue(query) } as unknown as SupabaseClient;
  return { sb, query };
}

describe("contextual reply reads", () => {
  it("supports old schemas explicitly without silently enabling replies", async () => {
    const db = listStore([
      { error: { code: "42703", message: "column reply_to_id does not exist" }, data: null },
      { error: null, data: [{ id: "old" }], count: 1 },
    ]);
    const result = await readCommentRows(db.sb, "dark-mode", { limit: 10, offset: 10 });
    expect(result.repliesEnabled).toBe(false);
    expect(db.query.range).toHaveBeenCalledWith(10, 19);
    expect(db.query.select.mock.calls[1][0]).not.toContain("reply_to_id");
  });
  it("does not downgrade arbitrary database failures to a successful legacy response", async () => {
    const db = listStore([{ error: { code: "XX000", message: "query failed" }, data: null }]);
    expect((await readCommentRows(db.sb, "dark-mode", { limit: 10, offset: 0 })).error).toBeTruthy();
    expect(db.query.range).toHaveBeenCalledOnce();
    expect(isReplySchemaMissing({ code: "42703", message: "user_id missing" })).toBe(false);
  });
  it("fetches an exact linked comment only within its style", async () => {
    const db = listStore([{ data: [], count: 0, error: null }]);
    await readCommentRows(db.sb, "dark-mode", { limit: 1, offset: 0, commentId: "target" });
    expect(db.query.eq.mock.calls).toEqual([["style_slug", "dark-mode"], ["id", "target"]]);
  });
  it("batch-loads only public parent fields and reports deletion as missing context", async () => {
    const parents = [{ id: "parent", author_name: "Creator", content: "Original", session_id: "private" }];
    const query = { select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), in: vi.fn().mockResolvedValue({ data: parents, error: null }) };
    const sb = { from: vi.fn().mockReturnValue(query) } as unknown as SupabaseClient;
    const result = await attachReplyContexts(sb, "dark-mode", [{ reply_to_id: "parent", is_reply: true }, { reply_to_id: null, is_reply: true }]);
    expect(query.select).toHaveBeenCalledWith("id, author_name, content");
    expect(query.eq).toHaveBeenCalledWith("style_slug", "dark-mode");
    expect(result[0].reply_to).toEqual({ id: "parent", author_name: "Creator", content: "Original" });
    expect(result[1].reply_to).toBeNull();
    expect(JSON.stringify(result)).not.toContain("private");
  });
});
