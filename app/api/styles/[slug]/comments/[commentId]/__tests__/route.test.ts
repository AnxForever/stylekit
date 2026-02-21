import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/json-body", () => ({
  parseJsonBodyWithLimit: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

import {
  DELETE,
  PATCH,
} from "@/app/api/styles/[slug]/comments/[commentId]/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { createClient } from "@supabase/supabase-js";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedCreateClient = vi.mocked(createClient);

const params = (slug: string, commentId: string) => Promise.resolve({ slug, commentId });

afterEach(() => {
  vi.clearAllMocks();
});

describe("style comment mutate route", () => {
  it("PATCH requires authentication", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue(null);

    const response = await PATCH(
      new Request("https://stylekit.top/api/styles/editorial/comments/11111111-1111-4111-8111-111111111111", {
        method: "PATCH",
      }),
      { params: params("editorial", "11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(401);
  });

  it("PATCH updates own comment", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { content: "updated" },
    });

    const ownerSelectMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: "comment-1",
        user_id: "user-1",
        session_id: null,
      },
      error: null,
    });
    const ownerSelectEq2 = vi.fn().mockReturnValue({ maybeSingle: ownerSelectMaybeSingle });
    const ownerSelectEq1 = vi.fn().mockReturnValue({ eq: ownerSelectEq2 });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerSelectEq1 });

    const updateEq2 = vi.fn().mockResolvedValue({ error: null });
    const updateEq1 = vi.fn().mockReturnValue({ eq: updateEq2 });
    const update = vi.fn().mockReturnValue({ eq: updateEq1 });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: ownerSelect })
        .mockReturnValueOnce({ update }),
    } as never);

    const response = await PATCH(
      new Request("https://stylekit.top/api/styles/editorial/comments/11111111-1111-4111-8111-111111111111", {
        method: "PATCH",
        body: JSON.stringify({ content: "updated" }),
      }),
      { params: params("editorial", "11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(update).toHaveBeenCalledWith({ content: "updated" });
  });

  it("DELETE rejects non-owner", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const ownerSelectMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: "comment-1",
        user_id: "user-1",
        session_id: null,
      },
      error: null,
    });
    const ownerSelectEq2 = vi.fn().mockReturnValue({ maybeSingle: ownerSelectMaybeSingle });
    const ownerSelectEq1 = vi.fn().mockReturnValue({ eq: ownerSelectEq2 });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerSelectEq1 });

    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select: ownerSelect }),
    } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/styles/editorial/comments/11111111-1111-4111-8111-111111111111", {
        method: "DELETE",
      }),
      { params: params("editorial", "11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(403);
  });

  it("DELETE allows legacy session owner", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "11111111-1111-4111-8111-111111111111" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const ownerSelectMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: "comment-1",
        user_id: null,
        session_id: "user:11111111-1111-4111-8111-111111111111",
      },
      error: null,
    });
    const ownerSelectEq2 = vi.fn().mockReturnValue({ maybeSingle: ownerSelectMaybeSingle });
    const ownerSelectEq1 = vi.fn().mockReturnValue({ eq: ownerSelectEq2 });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerSelectEq1 });

    const deleteEq2 = vi.fn().mockResolvedValue({ error: null });
    const deleteEq1 = vi.fn().mockReturnValue({ eq: deleteEq2 });
    const deleteFn = vi.fn().mockReturnValue({ eq: deleteEq1 });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: ownerSelect })
        .mockReturnValueOnce({ delete: deleteFn }),
    } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/styles/editorial/comments/11111111-1111-4111-8111-111111111111", {
        method: "DELETE",
      }),
      { params: params("editorial", "11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(deleteFn).toHaveBeenCalled();
  });
});
