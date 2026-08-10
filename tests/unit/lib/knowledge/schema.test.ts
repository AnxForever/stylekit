import { describe, expect, it } from "vitest";
import {
  isGeneratorApprovedResource,
  parseKnowledgeResource,
} from "@/lib/knowledge";

const candidate = {
  schemaVersion: "knowledge-resource-v1",
  id: "candidate-resource",
  name: "Candidate Resource",
  nameEn: "Candidate Resource",
  resourceKind: "component-library",
  sourceUrl: "https://example.com/docs",
  repositoryUrl: "https://github.com/example/resource",
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
    evidenceUrls: ["https://github.com/example/resource"],
    modificationStatus: "untouched",
  },
  knowledge: {
    summary: "A candidate resource.",
    summaryEn: "A candidate resource.",
    useCases: ["Component research"],
    limitations: [],
    tags: ["components"],
    frameworks: ["React"],
    relatedStyleSlugs: [],
    extractedTopics: ["components"],
  },
  quality: {
    score: 70,
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
  reviewStatus: "pending",
  publicationStatus: "unpublished",
  updatedAt: "2026-08-03T00:00:00.000Z",
} as const;

describe("knowledge resource contract", () => {
  it("accepts a pending candidate without allowing generator use", () => {
    const parsed = parseKnowledgeResource(candidate);

    expect(parsed.id).toBe("candidate-resource");
    expect(isGeneratorApprovedResource(parsed)).toBe(false);
  });

  it("requires a pinned commit and snapshot metadata for full mirrors", () => {
    expect(() => parseKnowledgeResource({ ...candidate, mirror: { mode: "full" } })).toThrow();
  });

  it("rejects generator approval before review and content hashing", () => {
    expect(() => parseKnowledgeResource({ ...candidate, usagePolicy: "generator-approved" })).toThrow();
  });

  it("rejects approved resources with an unknown license", () => {
    expect(() =>
      parseKnowledgeResource({
        ...candidate,
        reviewStatus: "approved",
        license: { ...candidate.license, classification: "unknown" },
        provenance: {
          ...candidate.provenance,
          auditedBy: "maintainer",
          auditedAt: "2026-08-03T00:00:00.000Z",
        },
        security: { ...candidate.security, secretScan: "pass" },
      }),
    ).toThrow();
  });
});
