import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET } from "@/app/api/admin/newsletter/subscribers/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

function createSupabaseMock(rows: { email: string; subscribed_at: string }[]) {
  const limit = vi.fn().mockResolvedValue({ data: rows, error: null });
  const order = vi.fn(() => ({ limit }));
  const select = vi.fn(() => ({ order }));
  const from = vi.fn(() => ({ select }));
  return { client: { from }, from, order, limit };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/newsletter/subscribers", () => {
  it("rejects requests without an admin session", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: false, status: 403, error: "Forbidden" });

    const response = await GET(new Request("https://stylekit.top/api/admin/newsletter/subscribers"));

    expect(response.status).toBe(403);
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("exports subscribers as a CSV attachment", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "password-session", id: "admin" },
    });
    const supabase = createSupabaseMock([
      { email: "reader@example.com", subscribed_at: "2026-10-28T09:00:00.000Z" },
      { email: "second@example.com", subscribed_at: "2026-10-27T09:00:00.000Z" },
    ]);
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);

    const response = await GET(new Request("https://stylekit.top/api/admin/newsletter/subscribers"));
    const csv = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(response.headers.get("content-disposition")).toContain("attachment");
    expect(csv.trim().split("\n")).toEqual([
      "email,subscribed_at",
      "reader@example.com,2026-10-28T09:00:00.000Z",
      "second@example.com,2026-10-27T09:00:00.000Z",
    ]);
    expect(supabase.limit).toHaveBeenCalledWith(10_000);
  });

  it("quotes values that would break the CSV", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "password-session", id: "admin" },
    });
    const supabase = createSupabaseMock([
      { email: '"odd,address"@example.com', subscribed_at: "2026-10-28T09:00:00.000Z" },
    ]);
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);

    const csv = await (
      await GET(new Request("https://stylekit.top/api/admin/newsletter/subscribers"))
    ).text();

    expect(csv).toContain('"""odd,address""@example.com"');
  });

  it("reports a missing Supabase configuration", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "password-session", id: "admin" },
    });
    mockedGetSupabaseAdmin.mockReturnValue(null);

    const response = await GET(new Request("https://stylekit.top/api/admin/newsletter/subscribers"));
    expect(response.status).toBe(503);
  });
});
