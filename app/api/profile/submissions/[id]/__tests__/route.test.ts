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
} from "@/app/api/profile/submissions/[id]/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { createClient } from "@supabase/supabase-js";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedCreateClient = vi.mocked(createClient);

const params = (id: string) => Promise.resolve({ id });
const SUBMISSION_ID = "11111111-1111-4111-8111-111111111111";

afterEach(() => {
  vi.clearAllMocks();
});

describe("profile submission mutate route", () => {
  it("PATCH requires authentication", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue(null);

    const response = await PATCH(
      new Request(`https://stylekit.top/api/profile/submissions/${SUBMISSION_ID}`, {
        method: "PATCH",
      }),
      { params: params(SUBMISSION_ID) }
    );

    expect(response.status).toBe(401);
  });

  it("PATCH updates own pending submission", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: {
        name: "New Name",
        nameEn: "New Name En",
        description: "New Desc",
      },
    });

    const ownerMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: SUBMISSION_ID,
        status: "pending",
        user_id: null,
        form_data: {
          name: "Old",
          nameEn: "Old En",
          description: "Old Desc",
          __author: { userId: "user-1" },
          designStyle: { name: "Old", nameEn: "Old En", description: "Old Desc", extra: "keep" },
        },
      },
      error: null,
    });
    const ownerEq = vi.fn().mockReturnValue({ maybeSingle: ownerMaybeSingle });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerEq });

    const updateEq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: updateEq });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: ownerSelect })
        .mockReturnValueOnce({ update }),
    } as never);

    const response = await PATCH(
      new Request(`https://stylekit.top/api/profile/submissions/${SUBMISSION_ID}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: "New Name",
          nameEn: "New Name En",
          description: "New Desc",
        }),
      }),
      { params: params(SUBMISSION_ID) }
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(update).toHaveBeenCalledWith({
      form_data: {
        name: "New Name",
        nameEn: "New Name En",
        description: "New Desc",
        __author: { userId: "user-1" },
        designStyle: {
          name: "New Name",
          nameEn: "New Name En",
          description: "New Desc",
          extra: "keep",
        },
      },
    });
  });

  it("PATCH rejects non-owner", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { name: "test" },
    });

    const ownerMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: SUBMISSION_ID,
        status: "pending",
        user_id: "user-1",
        form_data: {},
      },
      error: null,
    });
    const ownerEq = vi.fn().mockReturnValue({ maybeSingle: ownerMaybeSingle });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerEq });

    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select: ownerSelect }),
    } as never);

    const response = await PATCH(
      new Request(`https://stylekit.top/api/profile/submissions/${SUBMISSION_ID}`, {
        method: "PATCH",
        body: JSON.stringify({ name: "x" }),
      }),
      { params: params(SUBMISSION_ID) }
    );

    expect(response.status).toBe(403);
  });

  it("PATCH allows legacy owner matching by handle and provider", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({
      id: "user-legacy",
      user_metadata: {
        user_name: "legacy-owner",
        provider: "github",
      },
    } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { description: "legacy edit" },
    });

    const ownerMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: SUBMISSION_ID,
        status: "pending",
        user_id: null,
        form_data: {
          __author: {
            handle: "legacy-owner",
            provider: "github",
          },
          description: "old",
          designStyle: {},
        },
      },
      error: null,
    });
    const ownerEq = vi.fn().mockReturnValue({ maybeSingle: ownerMaybeSingle });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerEq });

    const updateEq = vi.fn().mockResolvedValue({ error: null });
    const update = vi.fn().mockReturnValue({ eq: updateEq });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: ownerSelect })
        .mockReturnValueOnce({ update }),
    } as never);

    const response = await PATCH(
      new Request(`https://stylekit.top/api/profile/submissions/${SUBMISSION_ID}`, {
        method: "PATCH",
        body: JSON.stringify({ description: "legacy edit" }),
      }),
      { params: params(SUBMISSION_ID) }
    );

    expect(response.status).toBe(200);
  });

  it("DELETE blocks approved submissions", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const ownerMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: SUBMISSION_ID,
        status: "approved",
        user_id: "user-1",
        form_data: {},
      },
      error: null,
    });
    const ownerEq = vi.fn().mockReturnValue({ maybeSingle: ownerMaybeSingle });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerEq });

    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select: ownerSelect }),
    } as never);

    const response = await DELETE(
      new Request(`https://stylekit.top/api/profile/submissions/${SUBMISSION_ID}`, {
        method: "DELETE",
      }),
      { params: params(SUBMISSION_ID) }
    );

    expect(response.status).toBe(409);
  });

  it("DELETE removes own pending submission", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const ownerMaybeSingle = vi.fn().mockResolvedValue({
      data: {
        id: SUBMISSION_ID,
        status: "pending",
        user_id: "user-1",
        form_data: {},
      },
      error: null,
    });
    const ownerEq = vi.fn().mockReturnValue({ maybeSingle: ownerMaybeSingle });
    const ownerSelect = vi.fn().mockReturnValue({ eq: ownerEq });

    const deleteEq = vi.fn().mockResolvedValue({ error: null });
    const deleteFn = vi.fn().mockReturnValue({ eq: deleteEq });

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce({ select: ownerSelect })
        .mockReturnValueOnce({ delete: deleteFn }),
    } as never);

    const response = await DELETE(
      new Request(`https://stylekit.top/api/profile/submissions/${SUBMISSION_ID}`, {
        method: "DELETE",
      }),
      { params: params(SUBMISSION_ID) }
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(deleteFn).toHaveBeenCalled();
  });
});
