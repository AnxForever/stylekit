import { afterEach, describe, expect, it } from "vitest";
import {
  escapeCsvCell,
  getAdminAuditExportMaxRows,
  toAdminAuditCsv,
} from "@/lib/admin/audit-csv";
import type { AdminAuditEvent } from "@/lib/admin/audit-log";

const ORIGINAL_EXPORT_MAX_ROWS = process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS;

afterEach(() => {
  if (ORIGINAL_EXPORT_MAX_ROWS === undefined) {
    delete process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS;
  } else {
    process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS = ORIGINAL_EXPORT_MAX_ROWS;
  }
});

describe("admin audit csv export", () => {
  it("escapes quotes and commas", () => {
    const metadataCell = escapeCsvCell(
      JSON.stringify({
        note: "hello, \"stylekit\"",
      })
    );

    expect(metadataCell.startsWith("\"{")).toBe(true);
    expect(metadataCell).toContain("\"\"note\"\"");
    expect(metadataCell).toContain("\\\"\"stylekit\\\"\"");

    const csv = toAdminAuditCsv([
      createEvent({
        metadata: {
          note: "hello, \"stylekit\"",
        },
      }),
    ]);
    expect(csv).toContain(metadataCell);
  });

  it("neutralizes spreadsheet formulas in exported cells", () => {
    expect(escapeCsvCell("=SUM(A1:A2)")).toBe("'=SUM(A1:A2)");
    expect(escapeCsvCell("+1+2")).toBe("'+1+2");
    expect(escapeCsvCell("-cmd")).toBe("'-cmd");
    expect(escapeCsvCell("@calc")).toBe("'@calc");
  });

  it("applies export max rows env with clamps", () => {
    delete process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS;
    expect(getAdminAuditExportMaxRows()).toBe(5000);

    process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS = "20";
    expect(getAdminAuditExportMaxRows()).toBe(100);

    process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS = "60000";
    expect(getAdminAuditExportMaxRows()).toBe(20000);

    process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS = "1500";
    expect(getAdminAuditExportMaxRows()).toBe(1500);
  });
});

function createEvent(overrides: Partial<AdminAuditEvent> = {}): AdminAuditEvent {
  return {
    id: "evt-1",
    action: "submission.approve",
    targetType: "submission",
    targetId: "sub-1",
    actor: { type: "user", id: "admin-1" },
    ipAddress: "127.0.0.1",
    userAgent: "test-agent",
    metadata: { slug: "modern-minimal" },
    createdAt: "2026-02-17T00:00:00.000Z",
    ...overrides,
  };
}
