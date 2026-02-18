import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("fs", () => ({
  existsSync: vi.fn(),
}));

vi.mock("fs/promises", () => ({
  readFile: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer", () => ({
  isValidSubmissionId: vi.fn(),
}));

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

import { GET } from "@/app/api/submit/[id]/route";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";

const mockedExistsSync = vi.mocked(existsSync);
const mockedReadFile = vi.mocked(readFile);
const mockedIsValidSubmissionId = vi.mocked(isValidSubmissionId);
const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/submit/[id]", () => {
  it("returns auth error when admin access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await GET(new Request("https://stylekit.top/api/submit/abc"), {
      params: Promise.resolve({ id: "abc" }),
    });

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("validates submission id", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsValidSubmissionId.mockReturnValue(false);

    const response = await GET(new Request("https://stylekit.top/api/submit/bad"), {
      params: Promise.resolve({ id: "bad" }),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid submission ID" });
  });

  it("returns 404 when submission file does not exist", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedExistsSync.mockReturnValue(false);

    const response = await GET(new Request("https://stylekit.top/api/submit/sub-1"), {
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

    const response = await GET(new Request("https://stylekit.top/api/submit/sub-2"), {
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
