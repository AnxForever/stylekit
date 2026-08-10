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

import { POST } from "@/app/api/admin/support-acknowledgments/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
});

function makeRequest(options: {
  file?: File;
  donatedOn?: string;
  donorLabel?: string;
  amount?: string;
  contentLength?: string;
  published?: string;
} = {}): Request {
  const form = new FormData();
  if (options.file) form.set("file", options.file);
  if (options.donatedOn !== undefined) form.set("donatedOn", options.donatedOn);
  if (options.donorLabel !== undefined) form.set("donorLabel", options.donorLabel);
  if (options.amount !== undefined) form.set("amount", options.amount);
  if (options.published !== undefined) form.set("published", options.published);
  const headers = options.contentLength
    ? { "content-length": options.contentLength }
    : undefined;
  return new Request("https://stylekit.top/api/admin/support-acknowledgments", {
    method: "POST",
    body: form,
    headers,
  });
}

function makeFile(
  contents?: string,
  name = "receipt.png",
  type = "image/png",
): File {
  const defaultPng = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  return new File([contents ?? defaultPng], name, { type });
}

function configureAdmin(options: {
  uploadError?: Error | null;
  insertError?: Error | null;
} = {}) {
  const upload = vi.fn().mockResolvedValue({ error: options.uploadError ?? null });
  const remove = vi.fn().mockResolvedValue({ error: null });
  const getPublicUrl = vi.fn().mockReturnValue({
    data: { publicUrl: "https://project.supabase.co/storage/v1/object/public/support-acknowledgments/acknowledgments/receipt.png" },
  });
  const single = vi.fn().mockResolvedValue({
    data: options.insertError
      ? null
      : {
          id: "ack-1",
          donated_on: "2026-08-10",
          donor_label: "匿名支持者",
          amount: "¥12.00",
          receipt_path: "https://project.supabase.co/storage/v1/object/public/support-acknowledgments/acknowledgments/receipt.png",
          receipt_alt: "匿名支持者的赞助截图",
          celebration_path: null,
          celebration_alt: null,
          published: true,
          created_at: "2026-08-10T00:00:00.000Z",
          updated_at: "2026-08-10T00:00:00.000Z",
        },
    error: options.insertError ?? null,
  });
  const insertChain = {
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single,
  };

  mockedGetSupabaseAdmin.mockReturnValue({
    from: vi.fn().mockReturnValue(insertChain),
    storage: {
      from: vi.fn().mockReturnValue({ upload, getPublicUrl, remove }),
    },
  } as never);

  return { upload, remove, getPublicUrl, insertChain };
}

describe("POST /api/admin/support-acknowledgments", () => {
  it("rejects unauthenticated requests before touching Supabase", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await POST(makeRequest({ file: makeFile() }));

    expect(response.status).toBe(403);
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("rejects unsupported files and invalid dates before upload", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    const { upload } = configureAdmin();

    const unsupportedResponse = await POST(
      makeRequest({ file: makeFile("not an image", "receipt.gif", "image/gif"), donatedOn: "2026-02-30" }),
    );
    expect(unsupportedResponse.status).toBe(415);

    const invalidDateResponse = await POST(
      makeRequest({ file: makeFile(), donatedOn: "2026-02-30" }),
    );

    expect(invalidDateResponse.status).toBe(400);
    expect(upload).not.toHaveBeenCalled();
  });

  it("uploads the receipt, inserts the record, and records an audit event", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    mockedRecordAdminAuditEvent.mockResolvedValue(undefined);
    const { upload, getPublicUrl, insertChain } = configureAdmin();
    const request = makeRequest({
      file: makeFile(),
      donatedOn: "2026-08-10",
      donorLabel: "  支持者  ",
      amount: "¥12.00",
      published: "false",
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect(upload).toHaveBeenCalledWith(
      expect.stringMatching(/^acknowledgments\/[0-9a-f-]+\.png$/),
      expect.any(File),
      expect.objectContaining({ contentType: "image/png", upsert: false }),
    );
    expect(getPublicUrl).toHaveBeenCalledOnce();
    expect(insertChain.insert).toHaveBeenCalledWith({
      donated_on: "2026-08-10",
      donor_label: "支持者",
      amount: "¥12.00",
      receipt_path: expect.stringContaining("support-acknowledgments/acknowledgments/receipt.png"),
      receipt_alt: "支持者 的赞助截图",
          published: false,
    });
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledWith(
      request,
      expect.objectContaining({
        action: "support_acknowledgment.create",
        targetType: "support_acknowledgment",
        targetId: "ack-1",
        metadata: { published: false, hasAmount: true },
      }),
    );
  });

  it("rejects a spoofed MIME type before writing to Storage", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    const { upload } = configureAdmin();

    const response = await POST(
      makeRequest({ file: makeFile("<svg xmlns=\"http://www.w3.org/2000/svg\" />", "receipt.png") }),
    );

    expect(response.status).toBe(415);
    expect(upload).not.toHaveBeenCalled();
  });

  it("rejects an oversized request before parsing multipart data", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    const { upload } = configureAdmin();

    const response = await POST(
      makeRequest({
        file: makeFile(),
        contentLength: String(10 * 1024 * 1024 + 64 * 1024 + 1),
      }),
    );

    expect(response.status).toBe(413);
    expect(upload).not.toHaveBeenCalled();
  });

  it("returns a client error for malformed multipart bodies", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    const { upload } = configureAdmin();
    const request = new Request("https://stylekit.top/api/admin/support-acknowledgments", {
      method: "POST",
      body: "not-a-multipart-body",
      headers: { "content-type": "multipart/form-data; boundary=missing" },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "上传数据格式无效，请重新选择图片后再试。",
    });
    expect(upload).not.toHaveBeenCalled();
  });

  it("removes an uploaded object when the database insert fails", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true, actor: { type: "user", id: "admin" } });
    const { upload, remove } = configureAdmin({ insertError: new Error("migration missing") });

    const response = await POST(makeRequest({ file: makeFile(), donatedOn: "2026-08-10" }));

    expect(response.status).toBe(503);
    expect(upload).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledWith([expect.stringMatching(/^acknowledgments\/[0-9a-f-]+\.png$/)]);
    expect(mockedRecordAdminAuditEvent).not.toHaveBeenCalled();
  });
});
