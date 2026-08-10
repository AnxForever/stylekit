import { describe, expect, it } from "vitest";
import { searchKnowledgeCatalog, type KnowledgeResource } from "@/lib/knowledge";

function resource(overrides: Partial<KnowledgeResource> = {}): KnowledgeResource {
  return {
    schemaVersion: "knowledge-resource-v1",
    id: "component-library",
    name: "Component Library",
    nameEn: "Component Library",
    resourceKind: "component-library",
    sourceUrl: "https://example.com/docs",
    repositoryUrl: "https://github.com/example/library",
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
      summary: "Accessible React components for dashboards.",
      summaryEn: "Accessible React components for dashboards.",
      useCases: ["Dashboard UI"],
      limitations: [],
      tags: ["react", "accessible", "dashboard"],
      frameworks: ["React"],
      relatedStyleSlugs: [],
      extractedTopics: ["components", "accessibility"],
    },
    quality: {
      score: 80,
      documentationReviewed: true,
      runtimeVerified: true,
      accessibilityReviewed: true,
      performanceReviewed: false,
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
    reviewStatus: "approved",
    publicationStatus: "published",
    publishedAt: "2026-08-03T00:00:00.000Z",
    updatedAt: "2026-08-03T00:00:00.000Z",
    ...overrides,
  };
}

describe("knowledge catalog search", () => {
  it("matches searchable knowledge fields and returns explainable fields", () => {
    const [hit] = searchKnowledgeCatalog([resource()], { query: "accessible React dashboard" });

    expect(hit.resource.id).toBe("component-library");
    expect(hit.score).toBeGreaterThan(0);
    expect(hit.matchedFields).toEqual(expect.arrayContaining(["tags", "useCases", "frameworks"]));
  });

  it("does not return unpublished resources by default", () => {
    const hits = searchKnowledgeCatalog([resource({ publicationStatus: "unpublished" })], { query: "dashboard" });

    expect(hits).toHaveLength(0);
  });

  it("supports candidate inspection when explicitly requested", () => {
    const hits = searchKnowledgeCatalog(
      [resource({ reviewStatus: "pending", publicationStatus: "unpublished" })],
      { query: "dashboard", includeUnpublished: true },
    );

    expect(hits).toHaveLength(1);
  });
});
