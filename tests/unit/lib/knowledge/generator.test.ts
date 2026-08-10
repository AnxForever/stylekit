import { describe, expect, it } from "vitest";

import { selectGeneratorKnowledge, type KnowledgeResource } from "@/lib/knowledge";

function resource(overrides: Partial<KnowledgeResource> = {}): KnowledgeResource {
  return {
    schemaVersion: "knowledge-resource-v1",
    id: "approved-library",
    name: "Approved Library",
    nameEn: "Approved Library",
    resourceKind: "component-library",
    sourceUrl: "https://example.com/docs",
    sourceRef: "main",
    license: { classification: "allowlisted", spdx: "MIT", name: "MIT", termsUrl: "https://example.com/license", commercialUse: true, modificationAllowed: true, redistributionAllowed: true, attributionRequired: false },
    mirror: { mode: "full", path: "knowledge/mirrors/approved-library", licensePath: "knowledge/mirrors/approved-library/LICENSE", snapshotHash: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    provenance: { originType: "external-open-source", creator: "Example", acquiredAt: "2026-08-03T00:00:00.000Z", auditedBy: "reviewer", auditedAt: "2026-08-03T00:00:00.000Z", evidenceUrls: [], modificationStatus: "untouched" },
    knowledge: { summary: "Approved components", summaryEn: "Approved components", useCases: ["Dashboards"], limitations: [], tags: ["components", "dashboard"], frameworks: ["React"], relatedStyleSlugs: [], extractedTopics: ["accessible UI"] },
    quality: { score: 95, documentationReviewed: true, runtimeVerified: true, accessibilityReviewed: true, performanceReviewed: true, notes: [] },
    security: { secretScan: "pass", dependencyAudit: "pass", sbomStatus: "present", criticalFindings: 0, notes: [] },
    usagePolicy: "generator-approved",
    reviewStatus: "approved",
    publicationStatus: "published",
    contentHash: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    publishedAt: "2026-08-03T00:00:00.000Z",
    updatedAt: "2026-08-03T00:00:00.000Z",
    ...overrides,
  };
}

describe("generator knowledge allowlist", () => {
  it("returns only published generator-approved resources with hashes", () => {
    expect(selectGeneratorKnowledge([resource(), resource({ id: "pending-library", reviewStatus: "pending", publicationStatus: "unpublished" })], "dashboard").map((item) => item.id)).toEqual(["approved-library"]);
  });

  it("does not treat retrieval-only resources as generator input", () => {
    expect(selectGeneratorKnowledge([resource({ usagePolicy: "retrieval-only" })], "dashboard")).toEqual([]);
  });
});
