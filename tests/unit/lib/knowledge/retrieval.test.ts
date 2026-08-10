import { describe, expect, it } from "vitest";

import { searchKnowledgeCatalog, toAdvisorReference, type KnowledgeResource } from "@/lib/knowledge";

function resource(overrides: Partial<KnowledgeResource> = {}): KnowledgeResource {
  return {
    schemaVersion: "knowledge-resource-v1",
    id: "accessible-components",
    name: "可访问组件",
    nameEn: "Accessible Components",
    resourceKind: "component-library",
    sourceUrl: "https://example.com/docs",
    sourceRef: "main",
    license: { classification: "allowlisted", spdx: "MIT", name: "MIT", termsUrl: "https://example.com/license", commercialUse: true, modificationAllowed: true, redistributionAllowed: true, attributionRequired: false },
    mirror: { mode: "none" },
    provenance: { originType: "external-open-source", creator: "Example", acquiredAt: "2026-08-03T00:00:00.000Z", evidenceUrls: [], modificationStatus: "untouched" },
    knowledge: { summary: "Accessible React components", summaryEn: "Accessible React components", useCases: ["Dashboards"], limitations: [], tags: ["accessible", "react"], frameworks: ["React"], relatedStyleSlugs: [], extractedTopics: ["keyboard navigation"] },
    quality: { score: 90, documentationReviewed: true, runtimeVerified: true, accessibilityReviewed: true, performanceReviewed: true, notes: [] },
    security: { secretScan: "pass", dependencyAudit: "pass", sbomStatus: "present", criticalFindings: 0, notes: [] },
    usagePolicy: "retrieval-only",
    reviewStatus: "approved",
    publicationStatus: "published",
    publishedAt: "2026-08-03T00:00:00.000Z",
    updatedAt: "2026-08-03T00:00:00.000Z",
    ...overrides,
  };
}

describe("knowledge retrieval context", () => {
  it("turns approved catalog hits into explainable advisor references", () => {
    const [hit] = searchKnowledgeCatalog([resource()], { query: "accessible React dashboard" });
    const reference = toAdvisorReference(hit);
    expect(reference).toMatchObject({ id: "accessible-components", usagePolicy: "retrieval-only", sourceUrl: "https://example.com/docs" });
    expect(reference.summary).toContain("Accessible React components");
  });

  it("does not retrieve unpublished candidates", () => {
    const hits = searchKnowledgeCatalog([resource({ publicationStatus: "unpublished", reviewStatus: "pending" })], { query: "accessible" });
    expect(hits).toHaveLength(0);
  });
});
