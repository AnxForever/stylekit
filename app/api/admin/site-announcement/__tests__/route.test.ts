import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

vi.mock("@/lib/site-announcements", () => ({
  clearSiteAnnouncementCache: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET, PUT } from "@/app/api/admin/site-announcement/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { clearSiteAnnouncementCache } from "@/lib/site-announcements";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);
const mockedClearSiteAnnouncementCache = vi.mocked(clearSiteAnnouncementCache);
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

type AnnouncementRow = {
  locale: "zh-CN" | "en";
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string | null;
};

type SupabaseResult = { data: AnnouncementRow | null; error: { message: string } | null };

const EXPECTED_UPDATED_AT = "2026-08-10T00:00:00.000Z";

function makeRow(overrides: Partial<AnnouncementRow> = {}): AnnouncementRow {
  return {
    locale: "zh-CN",
    enabled: true,
    title: "旧公告",
    body: "旧正文。",
    cta_label: "查看详情",
    cta_href: "/zh/changelog",
    starts_at: null,
    ends_at: null,
    updated_at: EXPECTED_UPDATED_AT,
    ...overrides,
  };
}

function rowFromWrite(value: Record<string, unknown>): AnnouncementRow {
  return {
    locale: value.locale as AnnouncementRow["locale"],
    enabled: value.enabled as boolean,
    title: value.title as string,
    body: value.body as string,
    cta_label: value.cta_label as string | null,
    cta_href: value.cta_href as string | null,
    starts_at: value.starts_at as string | null,
    ends_at: value.ends_at as string | null,
    updated_at: value.updated_at as string | null,
  };
}

function configureSupabase(options: {
  reads?: SupabaseResult[];
  updateResult?: SupabaseResult;
  insertResult?: SupabaseResult;
  upsertResult?: SupabaseResult;
} = {}) {
  const reads = [...(options.reads ?? [{ data: null, error: null }])];
  const queries: Array<{
    action: string;
    filters: Record<string, unknown>;
    value?: Record<string, unknown>;
  }> = [];
  const from = vi.fn(() => {
    const call: (typeof queries)[number] = { action: "read", filters: {} };
    queries.push(call);
    const query = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn((column: string, value: unknown) => {
        call.filters[column] = value;
        return query;
      }),
      maybeSingle: vi.fn(async () => {
        if (call.action === "read") return reads.shift() ?? { data: null, error: null };
        if (call.action === "update") {
          return options.updateResult ?? { data: rowFromWrite(call.value ?? {}), error: null };
        }
        if (call.action === "insert") {
          return options.insertResult ?? { data: rowFromWrite(call.value ?? {}), error: null };
        }
        return { data: null, error: { message: `Unexpected ${call.action} query` } };
      }),
      single: vi.fn(async () => options.upsertResult ?? {
        data: rowFromWrite(call.value ?? {}),
        error: null,
      }),
      upsert: vi.fn((value: Record<string, unknown>) => {
        call.action = "upsert";
        call.value = value;
        return query;
      }),
      insert: vi.fn((value: Record<string, unknown>) => {
        call.action = "insert";
        call.value = value;
        return query;
      }),
      update: vi.fn((value: Record<string, unknown>) => {
        call.action = "update";
        call.value = value;
        return query;
      }),
    };
    return query;
  });

  mockedGetSupabaseAdmin.mockReturnValue({ from } as never);
  return { from, queries };
}

function authorizeAdmin() {
  mockedCheckAdminApiAccess.mockResolvedValue({
    allowed: true,
    actor: { type: "user", id: "admin" },
  });
}

function withRevision(payload: Record<string, unknown>, expectedUpdatedAt: string | null) {
  return { ...payload, expectedUpdatedAt };
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

  it("rejects unauthorized writes before touching Supabase", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const request = makeRequest(withRevision(validPayload, EXPECTED_UPDATED_AT));
    const response = await PUT(request);

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
    expect(mockedClearSiteAnnouncementCache).toHaveBeenCalledWith("zh-CN");
  });

  it("keeps the old upsert contract when expectedUpdatedAt is omitted", async () => {
    authorizeAdmin();
    const { queries } = configureSupabase();

    const response = await PUT(makeRequest(validPayload));

    expect(response.status).toBe(200);
    expect(queries.map((query) => query.action)).toEqual(["upsert"]);
    expect(queries[0]?.value).toMatchObject({ locale: "zh-CN", title: "本周更新" });
  });

  it("inserts when expectedUpdatedAt is null and no locale row exists", async () => {
    authorizeAdmin();
    const { queries } = configureSupabase({ reads: [{ data: null, error: null }] });

    const response = await PUT(makeRequest(withRevision(validPayload, null)));

    expect(response.status).toBe(200);
    expect(queries.map((query) => query.action)).toEqual(["read", "insert"]);
    expect(queries[1]?.value).toMatchObject({ locale: "zh-CN", title: "本周更新" });
  });

  it("returns a database error when the failed first insert is absent on reread", async () => {
    authorizeAdmin();
    const { queries } = configureSupabase({
      reads: [
        { data: null, error: null },
        { data: null, error: null },
      ],
      insertResult: { data: null, error: { message: "database write failed" } },
    });

    const response = await PUT(makeRequest(withRevision(validPayload, null)));

    expect(response.status).toBe(502);
    expect(queries.map((query) => query.action)).toEqual(["read", "insert", "read"]);
    expect(mockedRecordAdminAuditEvent).not.toHaveBeenCalled();
    expect(mockedClearSiteAnnouncementCache).not.toHaveBeenCalled();
  });

  it("resolves a failed insert from the reread snapshot: identical succeeds, different conflicts", async () => {
    authorizeAdmin();
    const matching = makeRow({
      title: validPayload.title,
      body: validPayload.body,
      cta_label: validPayload.ctaLabel,
      cta_href: validPayload.ctaHref,
      starts_at: validPayload.startsAt,
      ends_at: validPayload.endsAt,
      updated_at: "2026-08-10T00:04:00.000Z",
    });
    configureSupabase({
      reads: [
        { data: null, error: null },
        { data: matching, error: null },
      ],
      insertResult: { data: null, error: { message: "duplicate locale row" } },
    });

    const idempotentResponse = await PUT(makeRequest(withRevision(validPayload, null)));

    expect(idempotentResponse.status).toBe(200);
    await expect(idempotentResponse.json()).resolves.toMatchObject({ announcement: matching });
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledOnce();
    expect(mockedClearSiteAnnouncementCache).toHaveBeenCalledWith("zh-CN");

    vi.clearAllMocks();
    authorizeAdmin();
    const different = makeRow({ title: "其他管理员刚创建的公告", updated_at: "2026-08-10T00:05:00.000Z" });
    const { queries } = configureSupabase({
      reads: [
        { data: null, error: null },
        { data: different, error: null },
      ],
      insertResult: { data: null, error: { message: "duplicate locale row" } },
    });

    const conflictResponse = await PUT(makeRequest(withRevision(validPayload, null)));

    expect(conflictResponse.status).toBe(409);
    await expect(conflictResponse.json()).resolves.toMatchObject({ latestAnnouncement: different });
    expect(queries.map((query) => query.action)).toEqual(["read", "insert", "read"]);
    expect(mockedRecordAdminAuditEvent).not.toHaveBeenCalled();
    expect(mockedClearSiteAnnouncementCache).not.toHaveBeenCalled();
  });

  it("updates only when the current timestamp matches the submitted revision", async () => {
    authorizeAdmin();
    const { queries } = configureSupabase({ reads: [{ data: makeRow(), error: null }] });
    const response = await PUT(makeRequest(withRevision(validPayload, EXPECTED_UPDATED_AT)));

    expect(response.status).toBe(200);
    expect(queries.map((query) => query.action)).toEqual(["read", "update"]);
    expect(queries[1]?.filters).toEqual({ locale: "zh-CN", updated_at: EXPECTED_UPDATED_AT });
    expect(Date.parse(String(queries[1]?.value?.updated_at))).toBeGreaterThan(Date.parse(EXPECTED_UPDATED_AT));
  });

  it("returns the latest row on a stale revision with different content", async () => {
    authorizeAdmin();
    const latest = makeRow({ title: "服务器新公告", updated_at: "2026-08-10T00:01:00.000Z" });
    const { queries } = configureSupabase({ reads: [{ data: latest, error: null }] });

    const response = await PUT(makeRequest(withRevision(validPayload, EXPECTED_UPDATED_AT)));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toMatchObject({ latestAnnouncement: latest });
    expect(queries).toHaveLength(1);
  });

  it("returns a conflict if a conditional update affects zero rows", async () => {
    authorizeAdmin();
    const latest = makeRow({ title: "另一位管理员的修改", updated_at: "2026-08-10T00:02:00.000Z" });
    const { queries } = configureSupabase({
      reads: [
        { data: makeRow(), error: null },
        { data: latest, error: null },
      ],
      updateResult: { data: null, error: null },
    });

    const response = await PUT(makeRequest(withRevision(validPayload, EXPECTED_UPDATED_AT)));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toMatchObject({ latestAnnouncement: latest });
    expect(queries.map((query) => query.action)).toEqual(["read", "update", "read"]);
  });

  it("acknowledges the same stored snapshot after a lost save response", async () => {
    authorizeAdmin();
    const savedSnapshot = makeRow({
      locale: "zh-CN",
      enabled: true,
      title: "本周更新",
      body: "新的内容已经上线。",
      cta_label: "查看详情",
      cta_href: "/zh/changelog",
      starts_at: "2026-08-10T00:00:00.000Z",
      ends_at: "2026-08-11T00:00:00.000Z",
      updated_at: "2026-08-10T00:03:00.000Z",
    });
    const { queries } = configureSupabase({ reads: [{ data: savedSnapshot, error: null }] });

    const response = await PUT(makeRequest(withRevision(validPayload, EXPECTED_UPDATED_AT)));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ announcement: savedSnapshot });
    expect(queries).toHaveLength(1);
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledOnce();
  });

  it("does not report success when Supabase read or write fails", async () => {
    authorizeAdmin();
    configureSupabase({ reads: [{ data: null, error: { message: "read failed" } }] });
    const readResponse = await PUT(makeRequest(withRevision(validPayload, null)));
    expect(readResponse.status).toBe(502);
    expect(mockedRecordAdminAuditEvent).not.toHaveBeenCalled();

    vi.clearAllMocks();
    authorizeAdmin();
    configureSupabase({
      reads: [{ data: makeRow(), error: null }],
      updateResult: { data: null, error: { message: "write failed" } },
    });
    const writeResponse = await PUT(makeRequest(withRevision(validPayload, EXPECTED_UPDATED_AT)));
    expect(writeResponse.status).toBe(502);
    expect(mockedRecordAdminAuditEvent).not.toHaveBeenCalled();
    expect(mockedClearSiteAnnouncementCache).not.toHaveBeenCalled();
  });
});
