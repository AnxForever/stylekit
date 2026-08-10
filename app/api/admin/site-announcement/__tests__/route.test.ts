import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET, PUT } from "@/app/api/admin/site-announcement/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
});

const validPayload = {
  locale: "zh-CN",
  enabled: true,
  title: "本周更新",
  body: "新的内容已经上线。",
  ctaLabel: "查看详情",
  ctaHref: "/zh/changelog",
  startsAt: "2026-08-10T00:00:00.000Z",
  endsAt: "2026-08-11T00:00:00.000Z",
};

function makeRequest(body?: unknown, method = "PUT"): Request {
  return new Request("https://stylekit.top/api/admin/site-announcement", {
    method,
    ...(body === undefined ? {} : {
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    }),
  });
}

function configurePutAdmin() {
  const single = vi.fn().mockResolvedValue({
    data: {
      locale: "zh-CN",
      enabled: true,
      title: "本周更新",
      body: "新的内容已经上线。",
      cta_label: "查看详情",
      cta_href: "/zh/changelog",
      starts_at: "2026-08-10T00:00:00.000Z",
      ends_at: "2026-08-11T00:00:00.000Z",
      updated_at: "2026-08-10T00:00:00.000Z",
    },
    error: null,
  });
  const chain = {
    upsert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single,
  };
  mockedGetSupabaseAdmin.mockReturnValue({
    from: vi.fn().mockReturnValue(chain),
  } as never);
  return { chain, single };
}

describe("admin site announcement API", () => {
  it("rejects unauthorized reads before touching Supabase", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await GET(makeRequest(undefined, "GET"));

    expect(response.status).toBe(403);
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("rejects unsafe CTA URLs and invalid time windows", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    configurePutAdmin();

    const unsafeResponse = await PUT(makeRequest({ ...validPayload, ctaHref: "javascript:alert(1)" }));
    expect(unsafeResponse.status).toBe(400);

    const reversedResponse = await PUT(
      makeRequest({
        ...validPayload,
        startsAt: "2026-08-10T11:00:00+08:00",
        endsAt: "2026-08-10T03:00:00Z",
      }),
    );
    expect(reversedResponse.status).toBe(400);
  });

  it("upserts the announcement and records an audit event", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedRecordAdminAuditEvent.mockResolvedValue(undefined);
    const { chain } = configurePutAdmin();
    const request = makeRequest(validPayload);

    const response = await PUT(request);

    expect(response.status).toBe(200);
    expect(chain.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "zh-CN",
        enabled: true,
        cta_href: "/zh/changelog",
      }),
      { onConflict: "locale" },
    );
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledWith(
      request,
      expect.objectContaining({
        action: "site_announcement.update",
        targetType: "site_announcement",
        targetId: "zh-CN",
        metadata: { enabled: true },
      }),
    );
  });
});
