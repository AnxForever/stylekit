import { describe, expect, it } from "vitest";

import { buildKnowledgeDocuments, type KnowledgeResource } from "@/lib/knowledge";

const resource = {
  schemaVersion: "knowledge-resource-v1",
  id: "resource",
  name: "资源",
  nameEn: "Resource",
  resourceKind: "component-library",
  sourceUrl: "https://example.com/docs",
  sourceRef: "main",
  license: { classification: "allowlisted", spdx: "MIT", name: "MIT", termsUrl: "https://example.com/license", commercialUse: true, modificationAllowed: true, redistributionAllowed: true, attributionRequired: false },
  mirror: { mode: "none" },
  provenance: { originType: "external-open-source", creator: "Example", acquiredAt: "2026-08-03T00:00:00.000Z", evidenceUrls: [], modificationStatus: "untouched" },
  knowledge: { summary: "中文摘要", summaryEn: "English summary", useCases: ["组件"], limitations: ["限制"], tags: ["ui"], frameworks: ["React"], relatedStyleSlugs: [], extractedTopics: ["accessibility"] },
  quality: { score: 80, documentationReviewed: true, runtimeVerified: false, accessibilityReviewed: false, performanceReviewed: false, notes: [] },
  security: { secretScan: "pending", dependencyAudit: "pending", sbomStatus: "pending", criticalFindings: 0, notes: [] },
  usagePolicy: "retrieval-only",
  reviewStatus: "pending",
  publicationStatus: "unpublished",
  updatedAt: "2026-08-03T00:00:00.000Z",
} satisfies KnowledgeResource;

describe("knowledge document extraction", () => {
  it("creates bilingual searchable documents without changing usage policy", () => {
    const documents = buildKnowledgeDocuments(resource);
    expect(documents).toHaveLength(2);
    expect(documents[0].text).toContain("中文摘要");
    expect(documents[1].text).toContain("English summary");
    expect(documents[0].tags).toEqual(expect.arrayContaining(["ui", "accessibility"]));
    expect(documents[0].usagePolicy).toBe("retrieval-only");
  });
});
