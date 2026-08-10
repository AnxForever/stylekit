import { describe, expect, it } from "vitest";

import { evaluateKnowledgeApproval, isKnowledgeReviewDecision, type KnowledgeResource } from "@/lib/knowledge";

const resource = {
  schemaVersion: "knowledge-resource-v1",
  id: "reviewable",
  name: "Reviewable",
  nameEn: "Reviewable",
  resourceKind: "component-library",
  sourceUrl: "https://example.com",
  sourceRef: "main",
  license: {
    classification: "allowlisted",
    spdx: "MIT",
    name: "MIT License",
    termsUrl: "https://example.com/license",
    commercialUse: true,
    modificationAllowed: true,
    redistributionAllowed: true,
    attributionRequired: false,
  },
  mirror: { mode: "none" },
  provenance: {
    originType: "external-open-source",
    creator: "Example",
    acquiredAt: "2026-08-03T00:00:00.000Z",
    auditedBy: "reviewer",
    auditedAt: "2026-08-03T00:00:00.000Z",
    evidenceUrls: [],
    modificationStatus: "untouched",
  },
  knowledge: {
    summary: "Reviewable.",
    summaryEn: "Reviewable.",
    useCases: ["Testing"],
    limitations: [],
    tags: ["test"],
    frameworks: [],
    relatedStyleSlugs: [],
    extractedTopics: [],
  },
  quality: {
    score: 90,
    documentationReviewed: true,
    runtimeVerified: true,
    accessibilityReviewed: true,
    performanceReviewed: true,
    notes: [],
  },
  security: {
    secretScan: "pass",
    dependencyAudit: "pass",
    sbomStatus: "present",
    criticalFindings: 0,
    notes: [],
  },
  usagePolicy: "retrieval-only",
  reviewStatus: "pending",
  publicationStatus: "unpublished",
  updatedAt: "2026-08-03T00:00:00.000Z",
} satisfies KnowledgeResource;

describe("knowledge review gates", () => {
  it("approves only after all license, security, and quality gates pass", () => {
    expect(evaluateKnowledgeApproval(resource)).toEqual({ ok: true, blockers: [] });
    expect(evaluateKnowledgeApproval({ ...resource, security: { ...resource.security, secretScan: "pending" } }).blockers).toContain("secret scan has not passed");
  });

  it("recognizes only supported review decisions", () => {
    expect(isKnowledgeReviewDecision("approve")).toBe(true);
    expect(isKnowledgeReviewDecision("publish")).toBe(false);
  });
});
