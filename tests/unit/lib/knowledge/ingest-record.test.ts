import { describe, expect, it } from "vitest";

import { toKnowledgeResourceRecord, type KnowledgeResource } from "@/lib/knowledge";

const candidate = {
  schemaVersion: "knowledge-resource-v1",
  id: "candidate",
  name: "Candidate",
  nameEn: "Candidate",
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
    evidenceUrls: [],
    modificationStatus: "untouched",
  },
  knowledge: {
    summary: "Candidate.",
    summaryEn: "Candidate.",
    useCases: ["Testing"],
    limitations: [],
    tags: ["test"],
    frameworks: [],
    relatedStyleSlugs: [],
    extractedTopics: [],
  },
  quality: {
    score: 1,
    documentationReviewed: false,
    runtimeVerified: false,
    accessibilityReviewed: false,
    performanceReviewed: false,
    notes: [],
  },
  security: {
    secretScan: "pending",
    dependencyAudit: "pending",
    sbomStatus: "pending",
    criticalFindings: 0,
    notes: [],
  },
  usagePolicy: "retrieval-only",
  reviewStatus: "approved",
  publicationStatus: "published",
  publishedAt: "2026-08-03T00:00:00.000Z",
  updatedAt: "2026-08-03T00:00:00.000Z",
} satisfies KnowledgeResource;

describe("knowledge resource import record", () => {
  it("never promotes approved or published manifest data during import", () => {
    const record = toKnowledgeResourceRecord(candidate);

    expect(record.review_status).toBe("pending");
    expect(record.publication_status).toBe("unpublished");
    expect(record.published_at).toBeNull();
    expect(record.manifest_hash).toMatch(/^sha256:[0-9a-f]{64}$/);
  });
});
