import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({ checkAdminApiAccess: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: vi.fn() }));

import { POST } from "@/app/api/admin/product-validation/interviews/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedAccess = vi.mocked(checkAdminApiAccess);
const mockedSupabase = vi.mocked(getSupabaseAdmin);

const validBody = {
  interviewId: "INT-202608-001",
  occurredAt: "2026-08-12T10:00:00.000Z",
  participantIdentityKey: `hmac:${"a".repeat(64)}`,
  icpStatus: "qualified",
  primaryVariantId: "pack-29",
  contactVerificationMethod: "manual_interview",
  evidenceLogSha256: `sha256:${"b".repeat(64)}`,
  evidenceSource: "interview_notes",
  consentRecorded: true,
  priceAccepted: true,
  depositLinkRequested: true,
  checkoutStarted: false,
  nonRefundableDepositPaid: false,
  protocolDeviation: false,
  withdrawn: false,
};

function request(body: unknown) {
  return new Request("https://stylekit.top/api/admin/product-validation/interviews", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedAccess.mockResolvedValue({
    allowed: true,
    actor: { type: "user", id: "admin-user-id" },
  });
});

describe("admin product validation interview evidence", () => {
  it("stores only de-identified, offer-linked interview evidence", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    mockedSupabase.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(request(validBody));
    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledOnce();
    const stored = insert.mock.calls[0]?.[0];
    expect(stored).toMatchObject({
      interview_id: validBody.interviewId,
      offer_snapshot_sha256: expect.stringMatching(/^sha256:[0-9a-f]{64}$/),
      evidence_log_sha256: validBody.evidenceLogSha256,
      consent_recorded: true,
    });
    expect(JSON.stringify(stored)).not.toMatch(/raw_email|company_name|raw_notes|transcript_text/i);
  });

  it("rejects boolean-only conclusions without a hashed evidence log", async () => {
    const insert = vi.fn();
    mockedSupabase.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const missingEvidence: Record<string, unknown> = { ...validBody };
    delete missingEvidence.evidenceLogSha256;
    const response = await POST(request(missingEvidence));
    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });
});
