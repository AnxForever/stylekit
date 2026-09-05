import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submit/reviewer", () => ({
  approveSubmission: vi.fn(),
  rejectSubmission: vi.fn(),
  isValidSubmissionId: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  approveSubmissionSupabase: vi.fn(),
  rejectSubmissionSupabase: vi.fn(),
}));

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/json-body", () => ({
  parseJsonBodyWithLimit: vi.fn(),
}));

import { POST } from "@/app/api/admin/submissions/[id]/review/route";
import { rejectSubmission, isValidSubmissionId } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  approveSubmissionSupabase,
  rejectSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const mockedRejectSubmission = vi.mocked(rejectSubmission);
const mockedIsValidSubmissionId = vi.mocked(isValidSubmissionId);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedApproveSubmissionSupabase = vi.mocked(approveSubmissionSupabase);
const mockedRejectSubmissionSupabase = vi.mocked(rejectSubmissionSupabase);
const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/admin/submissions/[id]/review", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/sub-1/review", { method: "POST" }),
      { params: Promise.resolve({ id: "sub-1" }) },
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("validates submission id before processing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(false);

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/bad/review", { method: "POST" }),
      { params: Promise.resolve({ id: "bad" }) },
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Invalid submission ID",
    });
  });

  it("approves submission and records admin audit event", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { action: "approve", note: "Looks good" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedApproveSubmissionSupabase.mockResolvedValue({
      id: "sub-2",
      slug: "neo-brutalist",
      status: "approved",
    } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/sub-2/review", { method: "POST" }),
      { params: Promise.resolve({ id: "sub-2" }) },
    );

    expect(response.status).toBe(200);
    expect(mockedApproveSubmissionSupabase).toHaveBeenCalledWith("sub-2", "Looks good");
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledTimes(1);
    // `notified` reports whether the contributor email went out. It is false
    // here because the test fixture carries no account to mail.
    await expect(response.json()).resolves.toEqual({
      success: true,
      notified: false,
      submission: {
        id: "sub-2",
        slug: "neo-brutalist",
        status: "approved",
      },
    });
  });

  it("returns 404 when rejection target is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedIsValidSubmissionId.mockReturnValue(true);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { action: "reject" },
    });
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedRejectSubmission.mockResolvedValue(null);

    const response = await POST(
      new Request("https://stylekit.top/api/admin/submissions/sub-3/review", { method: "POST" }),
      { params: Promise.resolve({ id: "sub-3" }) },
    );

    expect(mockedRejectSubmissionSupabase).not.toHaveBeenCalled();
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Submission not found",
    });
  });
});
