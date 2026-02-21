import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("fs", () => ({
  existsSync: vi.fn(),
}));

vi.mock("fs/promises", () => ({
  readFile: vi.fn(),
  unlink: vi.fn(),
  writeFile: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer", () => ({
  isValidSubmissionId: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  getSubmissionSupabase: vi.fn(),
  deleteSubmissionSupabase: vi.fn(),
  updateSubmissionFormDataSupabase: vi.fn(),
}));

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/json-body", () => ({
  parseJsonBodyWithLimit: vi.fn(),
}));

import { DELETE, GET, PATCH } from "@/app/api/admin/submissions/[id]/route";
import { existsSync } from "fs";
import { readFile, unlink, writeFile } from "fs/promises";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import {
  deleteSubmissionSupabase,
  getSubmissionSupabase,
  isSupabaseConfigured,
  updateSubmissionFormDataSupabase,
} from "@/lib/submit/reviewer-supabase";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const mockedExistsSync = vi.mocked(existsSync);
const mockedReadFile = vi.mocked(readFile);
const mockedUnlink = vi.mocked(unlink);
const mockedWriteFile = vi.mocked(writeFile);
const mockedIsValidSubmissionId = vi.mocked(isValidSubmissionId);
const mockedDeleteSubmissionSupabase = vi.mocked(deleteSubmissionSupabase);
const mockedGetSubmissionSupabase = vi.mocked(getSubmissionSupabase);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedUpdateSubmissionFormDataSupabase = vi.mocked(updateSubmissionFormDataSupabase);
const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/submissions/[id]", () => {
  it("returns auth error when admin access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions/abc"), {
      params: Promise.resolve({ id: "abc" }),
    });

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("validates submission id", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsValidSubmissionId.mockReturnValue(false);

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions/bad"), {
      params: Promise.resolve({ id: "bad" }),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid submission ID" });
  });

  it("returns 404 when submission file does not exist", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedExistsSync.mockReturnValue(false);

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions/sub-1"), {
      params: Promise.resolve({ id: "sub-1" }),
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Submission not found" });
  });

  it("returns parsed submission payload", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(
      JSON.stringify({ id: "sub-2", slug: "neo-brutalist", status: "pending" }),
    );

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions/sub-2"), {
      params: Promise.resolve({ id: "sub-2" }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      id: "sub-2",
      slug: "neo-brutalist",
      status: "pending",
    });
  });

  it("reads submission from supabase when configured", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetSubmissionSupabase.mockResolvedValue({
      id: "sub-3",
      slug: "community-style",
      status: "approved",
    } as never);

    const response = await GET(new Request("https://stylekit.top/api/admin/submissions/sub-3"), {
      params: Promise.resolve({ id: "sub-3" }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      id: "sub-3",
      slug: "community-style",
      status: "approved",
    });
    expect(mockedGetSubmissionSupabase).toHaveBeenCalledWith("sub-3");
  });
});

describe("DELETE /api/admin/submissions/[id]", () => {
  it("rejects untrusted origins before admin auth", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied.",
      status: 403,
    });

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/submissions/sub-1", { method: "DELETE" }),
      { params: Promise.resolve({ id: "sub-1" }) },
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      error: "Cross-origin request denied.",
    });
    expect(mockedCheckAdminApiAccess).not.toHaveBeenCalled();
  });

  it("returns auth error when admin access is denied", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/submissions/sub-1", { method: "DELETE" }),
      { params: Promise.resolve({ id: "sub-1" }) },
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("deletes submission file when id is valid and file exists", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedExistsSync.mockReturnValue(true);
    mockedUnlink.mockResolvedValue(undefined);

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/submissions/sub-2", { method: "DELETE" }),
      { params: Promise.resolve({ id: "sub-2" }) },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      id: "sub-2",
    });
    expect(mockedUnlink).toHaveBeenCalledTimes(1);
  });

  it("deletes submission from supabase when configured", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedDeleteSubmissionSupabase.mockResolvedValue(true);

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/submissions/sub-4", { method: "DELETE" }),
      { params: Promise.resolve({ id: "sub-4" }) },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      id: "sub-4",
    });
    expect(mockedDeleteSubmissionSupabase).toHaveBeenCalledWith("sub-4");
  });
});

describe("PATCH /api/admin/submissions/[id]", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied.",
      status: 403,
    });

    const response = await PATCH(
      new Request("https://stylekit.top/api/admin/submissions/sub-1", { method: "PATCH" }),
      { params: Promise.resolve({ id: "sub-1" }) },
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      error: "Cross-origin request denied.",
    });
  });

  it("updates submission via supabase when configured", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { name: "New Name", description: "Updated by admin" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetSubmissionSupabase.mockResolvedValue({
      id: "sub-5",
      slug: "test-style",
      status: "approved",
      submittedAt: "2026-02-21T00:00:00.000Z",
      formData: {
        name: "Old Name",
        description: "Old",
        designStyle: { name: "Old Name", description: "Old", extra: "keep" },
      },
      designStyle: { name: "Old Name", description: "Old", extra: "keep" },
      tokens: {},
    } as never);
    mockedUpdateSubmissionFormDataSupabase.mockResolvedValue({
      id: "sub-5",
      slug: "test-style",
      status: "approved",
      submittedAt: "2026-02-21T00:00:00.000Z",
      formData: {
        name: "New Name",
        description: "Updated by admin",
        designStyle: { name: "New Name", description: "Updated by admin", extra: "keep" },
      },
      designStyle: { name: "New Name", description: "Updated by admin", extra: "keep" },
      tokens: {},
    } as never);

    const response = await PATCH(
      new Request("https://stylekit.top/api/admin/submissions/sub-5", {
        method: "PATCH",
        body: JSON.stringify({ name: "New Name", description: "Updated by admin" }),
      }),
      { params: Promise.resolve({ id: "sub-5" }) },
    );

    expect(response.status).toBe(200);
    expect(mockedUpdateSubmissionFormDataSupabase).toHaveBeenCalledWith("sub-5", {
      name: "New Name",
      description: "Updated by admin",
      designStyle: {
        name: "New Name",
        description: "Updated by admin",
        extra: "keep",
      },
    });
  });

  it("updates file-based submission when supabase is disabled", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { nameEn: "Updated Name EN" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(
      JSON.stringify({
        id: "sub-file-1",
        formData: {
          name: "旧名称",
          nameEn: "Old Name EN",
          designStyle: { name: "旧名称", nameEn: "Old Name EN" },
        },
        designStyle: { name: "旧名称", nameEn: "Old Name EN", extra: "keep" },
      }),
    );

    const response = await PATCH(
      new Request("https://stylekit.top/api/admin/submissions/sub-file-1", {
        method: "PATCH",
        body: JSON.stringify({ nameEn: "Updated Name EN" }),
      }),
      { params: Promise.resolve({ id: "sub-file-1" }) },
    );

    expect(response.status).toBe(200);
    expect(mockedWriteFile).toHaveBeenCalledTimes(1);
  });
});
