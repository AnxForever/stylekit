import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer", () => ({
  isValidSubmissionId: vi.fn(),
  getSubmission: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  getSubmissionSupabase: vi.fn(),
}));

vi.mock("@/lib/submit/auto-register", () => ({
  autoRegisterStyle: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

import { POST } from "@/app/api/admin/submissions/[id]/register/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  getSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { autoRegisterStyle } from "@/lib/submit/auto-register";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedIsValidSubmissionId = vi.mocked(isValidSubmissionId);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedGetSubmissionSupabase = vi.mocked(getSubmissionSupabase);
const mockedAutoRegisterStyle = vi.mocked(autoRegisterStyle);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/admin/submissions/[id]/register", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/sub-1/register", { method: "POST" }),
      { params: Promise.resolve({ id: "sub-1" }) },
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("blocks codebase registration in production runtime", async () => {
    vi.stubEnv("NODE_ENV", "production");
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/sub-2/register", { method: "POST" }),
      { params: Promise.resolve({ id: "sub-2" }) },
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Codebase registration is disabled in production runtime.",
    });
    expect(mockedGetSubmissionSupabase).not.toHaveBeenCalled();
    expect(mockedAutoRegisterStyle).not.toHaveBeenCalled();
  });

  it("registers approved submission in non-production runtime", async () => {
    vi.stubEnv("NODE_ENV", "development");
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetSubmissionSupabase.mockResolvedValue({
      id: "sub-3",
      slug: "chaos-lab",
      status: "approved",
      formData: {},
      tokens: {},
      designStyle: {},
      submittedAt: "2026-02-21T00:00:00.000Z",
    } as never);
    mockedAutoRegisterStyle.mockResolvedValue({
      success: true,
      filesWritten: ["lib/styles/chaos-lab.ts"],
      registriesPatched: ["lib/styles/index.ts"],
      errors: [],
    });

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/sub-3/register", { method: "POST" }),
      { params: Promise.resolve({ id: "sub-3" }) },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      result: {
        success: true,
        filesWritten: ["lib/styles/chaos-lab.ts"],
        registriesPatched: ["lib/styles/index.ts"],
        errors: [],
      },
    });
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledTimes(1);
  });
});

