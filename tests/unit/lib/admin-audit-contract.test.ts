import { describe, expect, it } from "vitest";
import {
  ADMIN_AUDIT_ACTION_OPTIONS,
  getAdminAuditActionLabel,
  getAdminAuditActionTone,
} from "@/lib/admin/audit-contract";

describe("admin audit action contract", () => {
  it("exposes the support actions in the shared filter options", () => {
    const values = ADMIN_AUDIT_ACTION_OPTIONS.map((option) => option.value);

    expect(values).toContain("support_acknowledgment.create");
    expect(values).toContain("support_acknowledgment.update");
    expect(values).toContain("support_acknowledgment.delete");
  });

  it("uses stable labels and semantic tones for operations", () => {
    expect(getAdminAuditActionLabel("support_acknowledgment.update")).toBe("更新赞助鸣谢");
    expect(getAdminAuditActionTone("support_acknowledgment.delete")).toBe("danger");
    expect(getAdminAuditActionTone("support_acknowledgment.update")).toBe("info");
    expect(getAdminAuditActionTone("support_acknowledgment.create")).toBe("success");
  });
});
