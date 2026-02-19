import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submit/reviewer", () => ({
  listSubmissions: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  listSubmissionsSupabase: vi.fn(),
}));

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

import { GET } from "@/app/api/admin/submissions/route";
import { listSubmissions } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  listSubmissionsSupabase,
} from "@/lib/submit/reviewer-supabase";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";

const mockedListSubmissions = vi.mocked(listSubmissions);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedListSubmissionsSupabase = vi.mocked(listSubmissionsSupabase);
const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/submissions", () => {
  it("returns auth error when access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions"));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("reads list from Supabase when configured", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "token", id: "token" } });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedListSubmissionsSupabase.mockResolvedValue([
      { id: "1", slug: "neo-brutalist", status: "pending" },
    ] as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/submissions?status=pending"),
    );

    expect(mockedListSubmissionsSupabase).toHaveBeenCalledWith("pending");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      submissions: [{ id: "1", slug: "neo-brutalist", status: "pending" }],
      total: 1,
    });
  });

  it("falls back to file-based reviewer when Supabase is disabled", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedListSubmissions.mockResolvedValue([
      { id: "2", slug: "glassmorphism", status: "approved" },
    ] as never);

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions"));

    expect(mockedListSubmissions).toHaveBeenCalledWith(undefined);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      submissions: [{ id: "2", slug: "glassmorphism", status: "approved" }],
      total: 1,
    });
  });
});
