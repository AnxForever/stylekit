import { describe, expect, it } from "vitest";
import { evaluateProductValidationReadiness } from "@/lib/product-validation/readiness";

const readyInput = {
  hmacSecretConfigured: true,
  adminApiConfigured: true,
  offerSnapshotVerified: true,
  remoteTables: {
    product_validation_participants: true,
    product_validation_events: true,
    product_validation_interviews: true,
  },
  licenseReviewStatus: "approved",
  publicSaleAuthorized: true,
  experimentLifecycle: "collecting" as const,
  checkoutProviderConfigured: true,
  qualifiedVisitors: 200,
  qualifiedInterviews: 20,
  minimumQualifiedVisitors: 200,
  minimumQualifiedInterviews: 20,
};

describe("product validation production readiness", () => {
  it("reports ready only when every authority and storage gate is available", () => {
    const report = evaluateProductValidationReadiness(readyInput);
    expect(report.status).toBe("ready");
    expect(report.checks.some((check) => check.status === "blocked")).toBe(false);
  });

  it("blocks missing HMAC, remote tables, commercial approval and checkout evidence", () => {
    const report = evaluateProductValidationReadiness({
      ...readyInput,
      hmacSecretConfigured: false,
      remoteTables: { ...readyInput.remoteTables, product_validation_events: false },
      licenseReviewStatus: "draft_requires_final_review",
      publicSaleAuthorized: false,
      checkoutProviderConfigured: false,
    });
    expect(report.status).toBe("blocked");
    expect(report.checks.filter((check) => check.status === "blocked")).toHaveLength(5);
  });

  it("keeps window and sample progress pending instead of pretending failure", () => {
    const report = evaluateProductValidationReadiness({
      ...readyInput,
      experimentLifecycle: "planned",
      qualifiedVisitors: 0,
      qualifiedInterviews: 0,
    });
    expect(report.status).toBe("ready");
    expect(report.checks.filter((check) => check.status === "pending").map((check) => check.id)).toEqual([
      "experiment-window",
      "qualified-visitors",
      "qualified-interviews",
    ]);
  });
});
