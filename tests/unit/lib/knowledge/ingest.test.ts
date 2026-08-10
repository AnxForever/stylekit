import { describe, expect, it } from "vitest";

import {
  buildKnowledgeIngestPlan,
  hashKnowledgeManifest,
  type KnowledgeResource,
} from "@/lib/knowledge";

function resource(overrides: Partial<KnowledgeResource> = {}): KnowledgeResource {
  return {
    schemaVersion: "knowledge-resource-v1",
    id: "motion",
    name: "Motion",
    nameEn: "Motion",
    resourceKind: "animation",
    sourceUrl: "https://motion.dev/",
    repositoryUrl: "https://github.com/motiondivision/motion",
    sourceRef: "main",
    license: {
      classification: "allowlisted",
      spdx: "MIT",
      name: "MIT License",
      termsUrl: "https://example.com/license",
      commercialUse: true,
      modificationAllowed: true,
      redistributionAllowed: true,
      attributionRequired: true,
      attributionText: "Motion is licensed under the MIT License.",
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
      summary: "Animation library.",
      summaryEn: "Animation library.",
      useCases: ["Motion"],
      limitations: [],
      tags: ["animation"],
      frameworks: ["React"],
      relatedStyleSlugs: [],
      extractedTopics: ["motion"],
    },
    quality: {
      score: 80,
      documentationReviewed: true,
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
    ...overrides,
  };
}

describe("knowledge ingest plan", () => {
  it("is deterministic and creates pending records for new resources", () => {
    const first = buildKnowledgeIngestPlan([resource()]);
    const second = buildKnowledgeIngestPlan([resource()]);

    expect(first).toEqual(second);
    expect(first.counts["create-pending"]).toBe(1);
    expect(first.items[0].manifestHash).toBe(hashKnowledgeManifest(resource()));
  });

  it("is idempotent when the manifest hash is unchanged", () => {
    const current = resource();
    const plan = buildKnowledgeIngestPlan([current], [
      { id: current.id, manifestHash: hashKnowledgeManifest(current), reviewStatus: "pending" },
    ]);

    expect(plan.counts.unchanged).toBe(1);
  });

  it("requires re-review when an approved resource changes", () => {
    const current = resource();
    const plan = buildKnowledgeIngestPlan([current], [
      { id: current.id, manifestHash: "sha256:old", reviewStatus: "approved", publicationStatus: "published" },
    ]);

    expect(plan.counts["re-review-required"]).toBe(1);
  });
});
