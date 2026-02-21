import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
}));

import { GET } from "@/app/api/admin/system/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);
const mockedExistsSync = vi.mocked(existsSync);
const mockedReadFile = vi.mocked(readFile);

const ENV_KEYS = [
  "NODE_ENV",
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_API_TOKEN",
  "ADMIN_USER_IDS",
] as const;

type EnvKey = (typeof ENV_KEYS)[number];

const ORIGINAL_ENV: Record<EnvKey, string | undefined> = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN,
  ADMIN_USER_IDS: process.env.ADMIN_USER_IDS,
};

const TRACKED_TABLES = [
  "analytics_events",
  "style_comments",
  "style_ratings",
  "style_favorites",
  "style_submissions",
] as const;

afterEach(() => {
  vi.clearAllMocks();

  for (const key of ENV_KEYS) {
    const value = ORIGINAL_ENV[key];
    if (value === undefined) {
      delete (process.env as Record<string, string | undefined>)[key];
    } else {
      (process.env as Record<string, string | undefined>)[key] = value;
    }
  }
});

describe("GET /api/admin/system", () => {
  it("returns auth error when admin access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/system"));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("returns runtime and environment details with safe fallbacks", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    delete (process.env as Record<string, string | undefined>).NEXT_PUBLIC_SUPABASE_URL;
    delete (process.env as Record<string, string | undefined>).SUPABASE_SERVICE_ROLE_KEY;
    delete (process.env as Record<string, string | undefined>).ADMIN_API_TOKEN;
    delete (process.env as Record<string, string | undefined>).ADMIN_USER_IDS;

    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedGetSupabaseAdmin.mockReturnValue(null);
    mockedExistsSync.mockReturnValue(false);

    const response = await GET(new Request("https://stylekit.top/api/admin/system"));

    expect(response.status).toBe(200);
    const payload = await response.json();

    expect(payload.environment).toEqual({
      nodeEnv: "test",
      supabaseConfigured: false,
      adminTokenConfigured: false,
      adminUserIdsConfigured: false,
    });
    expect(payload.database).toEqual({
      connected: false,
      tables: [],
    });
    expect(payload.audit).toEqual({
      fileEventCount: 0,
    });
    expect(payload.runtime.nodeVersion).toBe(process.version);
    expect(typeof payload.runtime.uptime).toBe("number");
    expect(payload.runtime.memoryUsage).toEqual(
      expect.objectContaining({
        rss: expect.any(Number),
        heapTotal: expect.any(Number),
        heapUsed: expect.any(Number),
      })
    );
    expect(mockedReadFile).not.toHaveBeenCalled();
  });

  it("returns tracked table health and parsed audit event count", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
    process.env.ADMIN_API_TOKEN = "admin-token";
    process.env.ADMIN_USER_IDS = "user-1,user-2";

    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "token", id: "admin-token" },
    });

    const queryResults: Record<
      (typeof TRACKED_TABLES)[number],
      { count: number | null; error: Error | null }
    > = {
      analytics_events: { count: 12, error: null },
      style_comments: { count: null, error: new Error("query failed") },
      style_ratings: { count: 42, error: null },
      style_favorites: { count: 7, error: null },
      style_submissions: { count: 3, error: null },
    };

    const fromMock = vi.fn((tableName: (typeof TRACKED_TABLES)[number]) => ({
      select: vi.fn().mockResolvedValue(queryResults[tableName]),
    }));

    mockedGetSupabaseAdmin.mockReturnValue({ from: fromMock } as never);
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(
      JSON.stringify([{ id: "evt-1" }, { id: "evt-2" }, { id: "evt-3" }])
    );

    const response = await GET(new Request("https://stylekit.top/api/admin/system"));

    expect(response.status).toBe(200);
    const payload = await response.json();

    expect(payload.environment).toEqual({
      nodeEnv: "production",
      supabaseConfigured: true,
      adminTokenConfigured: true,
      adminUserIdsConfigured: true,
    });
    expect(payload.database).toEqual({
      connected: true,
      tables: [
        { name: "analytics_events", rowCount: 12 },
        { name: "style_comments", rowCount: -1 },
        { name: "style_ratings", rowCount: 42 },
        { name: "style_favorites", rowCount: 7 },
        { name: "style_submissions", rowCount: 3 },
      ],
    });
    expect(payload.audit).toEqual({ fileEventCount: 3 });
    expect(fromMock).toHaveBeenCalledTimes(TRACKED_TABLES.length);
    expect(mockedReadFile).toHaveBeenCalledTimes(1);
  });

  it("falls back to zero audit events when audit file is invalid JSON", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedGetSupabaseAdmin.mockReturnValue(null);
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue("not-json");

    const response = await GET(new Request("https://stylekit.top/api/admin/system"));

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.audit).toEqual({ fileEventCount: 0 });
  });
});
