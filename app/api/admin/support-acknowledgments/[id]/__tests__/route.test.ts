import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { PATCH, DELETE } from "@/app/api/admin/support-acknowledgments/[id]/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
});

describe("admin support acknowledgment mutations", () => {
  it("updates metadata and records an audit event without exposing receipt data", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedRecordAdminAuditEvent.mockResolvedValue(undefined);

    const single = vi.fn().mockResolvedValue({
      data: {
        id: "ack-1",
        donor_label: "新的支持者",
        amount: "¥12.00",
        published: false,
      },
      error: null,
    });
    const chain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single,
    };
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue(chain),
    } as never);

    const request = new Request("https://stylekit.top/api/admin/support-acknowledgments/ack-1", {
      method: "PATCH",
      body: JSON.stringify({ published: false, donorLabel: "新的支持者", amount: "¥12.00" }),
      headers: { "content-type": "application/json" },
    });
    const response = await PATCH(request, { params: Promise.resolve({ id: "ack-1" }) });

    expect(response.status).toBe(200);
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledWith(
      request,
      expect.objectContaining({
        action: "support_acknowledgment.update",
        targetType: "support_acknowledgment",
        targetId: "ack-1",
        metadata: {
          fields: ["published", "donor_label", "amount"],
          published: false,
        },
      }),
    );
  });

  it("normalizes a blank donor label to the anonymous default", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });

    const update = vi.fn().mockReturnThis();
    const single = vi.fn().mockResolvedValue({
      data: { id: "ack-blank-label", donor_label: "匿名支持者", published: true },
      error: null,
    });
    const chain = {
      update,
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single,
    };
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue(chain),
    } as never);

    const request = new Request(
      "https://stylekit.top/api/admin/support-acknowledgments/ack-blank-label",
      {
        method: "PATCH",
        body: JSON.stringify({ donorLabel: "   " }),
        headers: { "content-type": "application/json" },
      },
    );
    const response = await PATCH(request, {
      params: Promise.resolve({ id: "ack-blank-label" }),
    });

    expect(response.status).toBe(200);
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ donor_label: "匿名支持者" }),
    );
  });

  it("deletes the row, removes its storage object, and records an audit event", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedRecordAdminAuditEvent.mockResolvedValue(undefined);

    const loadChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          id: "ack-2",
          receipt_path: "https://project.supabase.co/storage/v1/object/public/support-acknowledgments/ack/receipt.png",
        },
        error: null,
      }),
    };
    const deleteChain = {
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    };
    const storageRemove = vi.fn().mockResolvedValue({ error: null });
    const from = vi
      .fn()
      .mockReturnValueOnce(loadChain)
      .mockReturnValueOnce(deleteChain);
    mockedGetSupabaseAdmin.mockReturnValue({
      from,
      storage: { from: vi.fn().mockReturnValue({ remove: storageRemove }) },
    } as never);

    const request = new Request("https://stylekit.top/api/admin/support-acknowledgments/ack-2", {
      method: "DELETE",
    });
    const response = await DELETE(request, { params: Promise.resolve({ id: "ack-2" }) });

    expect(response.status).toBe(200);
    expect(storageRemove).toHaveBeenCalledWith(["ack/receipt.png"]);
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledWith(
      request,
      expect.objectContaining({
        action: "support_acknowledgment.delete",
        targetType: "support_acknowledgment",
        targetId: "ack-2",
        metadata: expect.objectContaining({
          storageRemoved: true,
          storageCleanupFailed: false,
        }),
      }),
    );
  });

  it("reports a storage cleanup warning instead of hiding an orphaned object", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedRecordAdminAuditEvent.mockResolvedValue(undefined);

    const loadChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          id: "ack-storage-failure",
          receipt_path: "https://project.supabase.co/storage/v1/object/public/support-acknowledgments/ack/receipt.png",
        },
        error: null,
      }),
    };
    const deleteChain = {
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    };
    const storageRemove = vi.fn().mockResolvedValue({ error: new Error("storage unavailable") });
    const from = vi.fn()
      .mockReturnValueOnce(loadChain)
      .mockReturnValueOnce(deleteChain);
    mockedGetSupabaseAdmin.mockReturnValue({
      from,
      storage: { from: vi.fn().mockReturnValue({ remove: storageRemove }) },
    } as never);

    const request = new Request("https://stylekit.top/api/admin/support-acknowledgments/ack-storage-failure", {
      method: "DELETE",
    });
    const response = await DELETE(request, { params: Promise.resolve({ id: "ack-storage-failure" }) });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      storageRemoved: false,
      warning: expect.stringContaining("Storage"),
    });
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledWith(
      request,
      expect.objectContaining({
        metadata: { storageRemoved: false, storageCleanupFailed: true },
      }),
    );
  });
});
