import { describe, expect, it } from "vitest";
import {
  buildSystemPreflightChecks,
  getSystemPreflightOverallStatus,
} from "@/lib/admin/system-preflight";

const baseInput = {
  auth: {
    sessionSecretConfigured: true,
    passwordConfigured: true,
    passwordPlaintextConfigured: false,
    passwordSha256Configured: true,
    adminTokenConfigured: false,
    adminUserIdsConfigured: false,
  },
  supabaseConfigured: true,
  analyticsSignalVersion: 2,
  tables: {
    site_announcements: true,
    support_acknowledgments: true,
    knowledge_resources: true,
    knowledge_ingest_runs: true,
    knowledge_reviews: true,
    knowledge_publications: true,
    knowledge_search_documents: true,
    knowledge_audit_events: true,
    product_validation_participants: true,
    product_validation_events: true,
    product_validation_interviews: true,
  },
  localFiles: {
    health: true,
    cleanup: true,
    verify: true,
  },
};

describe("system preflight", () => {
  it("keeps payment confirmation as a manual warning", () => {
    const checks = buildSystemPreflightChecks(baseInput);
    expect(checks.find((check) => check.id === "payment-confirmation")).toMatchObject({
      status: "warning",
      severity: "manual",
    });
    expect(getSystemPreflightOverallStatus(checks)).toBe("warning");
  });

  it("warns when the brief intent aggregate has not been migrated", () => {
    const checks = buildSystemPreflightChecks({
      ...baseInput,
      analyticsSignalVersion: null,
    });

    expect(checks.find((check) => check.id === "analytics-signal")).toMatchObject({
      status: "warning",
      severity: "recommended",
      migration: "031_project_brief_analytics_signal.sql",
    });
  });

  it("marks plaintext password configuration for migration while accepting hash-only mode", () => {
    const plaintextChecks = buildSystemPreflightChecks({
      ...baseInput,
      auth: {
        ...baseInput.auth,
        passwordPlaintextConfigured: true,
        passwordSha256Configured: false,
      },
    });
    expect(plaintextChecks.find((check) => check.id === "admin-auth")).toMatchObject({
      status: "warning",
      summary: expect.stringContaining("明文"),
    });

    const hashOnlyChecks = buildSystemPreflightChecks(baseInput);
    expect(hashOnlyChecks.find((check) => check.id === "admin-auth")).toMatchObject({
      status: "ready",
      summary: expect.stringContaining("SHA-256"),
    });
  });

  it("blocks required content tables but only warns for optional validation tables", () => {
    const checks = buildSystemPreflightChecks({
      ...baseInput,
      tables: {
        ...baseInput.tables,
        site_announcements: false,
        product_validation_events: false,
      },
    });

    expect(checks.find((check) => check.id === "公告与赞助")).toMatchObject({
      status: "blocked",
      severity: "required",
    });
    expect(checks.find((check) => check.id === "产品验证数据")).toMatchObject({
      status: "warning",
      severity: "recommended",
    });
    expect(getSystemPreflightOverallStatus(checks)).toBe("blocked");
  });
});
