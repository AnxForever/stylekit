import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("fs", () => ({
  existsSync: vi.fn(),
}));

vi.mock("fs/promises", () => ({
  readFile: vi.fn(),
  unlink: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer", () => ({
  isValidSubmissionId: vi.fn(),
}));

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

import { DELETE, GET } from "@/app/api/admin/submissions/[id]/route";
import { existsSync } from "fs";
import { readFile, unlink } from "fs/promises";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const mockedExistsSync = vi.mocked(existsSync);
const mockedReadFile = vi.mocked(readFile);
const mockedUnlink = vi.mocked(unlink);
const mockedIsValidSubmissionId = vi.mocked(isValidSubmissionId);
const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);

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
});
