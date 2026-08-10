import { z } from "zod";

export const KNOWLEDGE_RESOURCE_SCHEMA_VERSION = "knowledge-resource-v1" as const;

const identifierSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case identifier");

const commitShaSchema = z
  .string()
  .regex(/^[0-9a-f]{7,64}$/i, "Use a git commit SHA");

const contentHashSchema = z
  .string()
  .regex(/^sha256:[0-9a-f]{64}$/, "Use a sha256:<64 lowercase hex> content hash");

const resourceKindSchema = z.enum([
  "design-system",
  "component-library",
  "animation",
  "typography",
  "font",
  "gradient",
  "shadow",
  "background-pattern",
  "icon",
  "illustration",
  "chart",
  "design-md",
  "agent-skill",
  "design-to-code-tool",
  "accessibility-guideline",
]);

const usagePolicySchema = z.enum([
  "research-only",
  "retrieval-only",
  "snippet-approved",
  "generator-approved",
  "distribution-approved",
  "revoked",
]);

const reviewStatusSchema = z.enum(["draft", "pending", "approved", "rejected", "revoked"]);
const publicationStatusSchema = z.enum(["unpublished", "published", "deprecated", "revoked"]);

export const knowledgeResourceSchema = z
  .object({
    schemaVersion: z.literal(KNOWLEDGE_RESOURCE_SCHEMA_VERSION),
    id: identifierSchema,
    name: z.string().min(1).max(160),
    nameEn: z.string().min(1).max(160),
    resourceKind: resourceKindSchema,
    sourceUrl: z.url(),
    repositoryUrl: z.url().optional(),
    sourceRef: z.string().min(1).max(200),
    commitSha: commitShaSchema.optional(),
    license: z
      .object({
        classification: z.enum(["allowlisted", "restricted", "unknown", "pending"]),
        spdx: z.string().min(1),
        name: z.string().min(1),
        termsUrl: z.url(),
        commercialUse: z.boolean(),
        modificationAllowed: z.boolean(),
        redistributionAllowed: z.boolean(),
        attributionRequired: z.boolean(),
        attributionText: z.string().min(1).optional(),
        notes: z.string().min(1).optional(),
      })
      .strict(),
    mirror: z
      .object({
        mode: z.enum(["none", "source-only", "full"]),
        path: z.string().min(1).optional(),
        licensePath: z.string().min(1).optional(),
        noticePath: z.string().min(1).optional(),
        sbomPath: z.string().min(1).optional(),
        snapshotHash: contentHashSchema.optional(),
      })
      .strict(),
    provenance: z
      .object({
        originType: z.literal("external-open-source"),
        creator: z.string().min(1),
        acquiredAt: z.iso.datetime(),
        auditedBy: z.string().min(1).optional(),
        auditedAt: z.iso.datetime().optional(),
        evidenceUrls: z.array(z.url()).default([]),
        modificationStatus: z.enum(["untouched", "modified"]),
        modificationNotes: z.string().min(1).optional(),
      })
      .strict(),
    knowledge: z
      .object({
        summary: z.string().min(1).max(1200),
        summaryEn: z.string().min(1).max(1200),
        useCases: z.array(z.string().min(1)).min(1),
        limitations: z.array(z.string().min(1)).default([]),
        tags: z.array(z.string().min(1)).min(1),
        frameworks: z.array(z.string().min(1)).default([]),
        relatedStyleSlugs: z.array(identifierSchema).default([]),
        extractedTopics: z.array(z.string().min(1)).default([]),
      })
      .strict(),
    quality: z
      .object({
        score: z.number().int().min(0).max(100),
        documentationReviewed: z.boolean(),
        runtimeVerified: z.boolean(),
        accessibilityReviewed: z.boolean(),
        performanceReviewed: z.boolean(),
        notes: z.array(z.string().min(1)).default([]),
      })
      .strict(),
    security: z
      .object({
        secretScan: z.enum(["pending", "pass", "fail"]),
        dependencyAudit: z.enum(["not-applicable", "pending", "pass", "warn", "fail"]),
        sbomStatus: z.enum(["not-required", "pending", "present"]),
        criticalFindings: z.number().int().min(0),
        notes: z.array(z.string().min(1)).default([]),
      })
      .strict(),
    usagePolicy: usagePolicySchema,
    reviewStatus: reviewStatusSchema,
    publicationStatus: publicationStatusSchema,
    contentHash: contentHashSchema.optional(),
    publishedAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime(),
  })
  .strict()
  .superRefine((resource, ctx) => {
    if (resource.mirror.mode === "full") {
      if (!resource.repositoryUrl) {
        ctx.addIssue({ code: "custom", path: ["repositoryUrl"], message: "Full mirrors require a repository URL" });
      }
      if (!resource.commitSha) {
        ctx.addIssue({ code: "custom", path: ["commitSha"], message: "Full mirrors require a pinned commit SHA" });
      }
      if (!resource.mirror.path || !resource.mirror.licensePath) {
        ctx.addIssue({ code: "custom", path: ["mirror"], message: "Full mirrors require source and license paths" });
      }
      if (!resource.mirror.snapshotHash) {
        ctx.addIssue({ code: "custom", path: ["mirror", "snapshotHash"], message: "Full mirrors require a snapshot hash" });
      }
    }

    if (resource.reviewStatus === "approved") {
      if (!resource.provenance.auditedBy || !resource.provenance.auditedAt) {
        ctx.addIssue({ code: "custom", path: ["provenance"], message: "Approved resources require auditor identity and timestamp" });
      }
      if (resource.license.classification !== "allowlisted") {
        ctx.addIssue({ code: "custom", path: ["license", "classification"], message: "Approved resources require an allowlisted license" });
      }
      if (resource.security.secretScan !== "pass") {
        ctx.addIssue({ code: "custom", path: ["security", "secretScan"], message: "Approved resources require a passing secret scan" });
      }
      if (resource.security.criticalFindings > 0) {
        ctx.addIssue({ code: "custom", path: ["security", "criticalFindings"], message: "Approved resources cannot have critical findings" });
      }
    }

    if (["generator-approved", "distribution-approved"].includes(resource.usagePolicy)) {
      if (resource.reviewStatus !== "approved") {
        ctx.addIssue({ code: "custom", path: ["usagePolicy"], message: "Generator and distribution use require approved review status" });
      }
      if (!resource.license.commercialUse || !resource.license.modificationAllowed || !resource.license.redistributionAllowed) {
        ctx.addIssue({ code: "custom", path: ["license"], message: "Generator and distribution use require commercial modification and redistribution rights" });
      }
      if (!resource.contentHash) {
        ctx.addIssue({ code: "custom", path: ["contentHash"], message: "Generator and distribution use require a content hash" });
      }
    }

    if (resource.publicationStatus === "published") {
      if (resource.reviewStatus !== "approved") {
        ctx.addIssue({ code: "custom", path: ["publicationStatus"], message: "Published resources require approved review status" });
      }
      if (!resource.publishedAt) {
        ctx.addIssue({ code: "custom", path: ["publishedAt"], message: "Published resources require a publication timestamp" });
      }
    }

    if (resource.provenance.modificationStatus === "modified" && !resource.provenance.modificationNotes) {
      ctx.addIssue({ code: "custom", path: ["provenance", "modificationNotes"], message: "Modified resources require modification notes" });
    }

    if (resource.license.attributionRequired && !resource.license.attributionText) {
      ctx.addIssue({ code: "custom", path: ["license", "attributionText"], message: "Attribution text is required by the license" });
    }

    if (resource.reviewStatus === "revoked" && resource.usagePolicy !== "revoked") {
      ctx.addIssue({ code: "custom", path: ["usagePolicy"], message: "Revoked resources must have revoked usage policy" });
    }
  });

export type KnowledgeResource = z.infer<typeof knowledgeResourceSchema>;
export type KnowledgeResourceInput = z.input<typeof knowledgeResourceSchema>;
export type KnowledgeResourceKind = z.infer<typeof resourceKindSchema>;
export type KnowledgeUsagePolicy = z.infer<typeof usagePolicySchema>;
export type KnowledgeReviewStatus = z.infer<typeof reviewStatusSchema>;

export function parseKnowledgeResource(value: unknown): KnowledgeResource {
  return knowledgeResourceSchema.parse(value);
}

export function isGeneratorApprovedResource(resource: KnowledgeResource): boolean {
  return resource.usagePolicy === "generator-approved" || resource.usagePolicy === "distribution-approved";
}

export const ALLOWLISTED_LICENSES = [
  "MIT",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "ISC",
  "CC0-1.0",
  "OFL-1.1",
] as const satisfies ReadonlyArray<
  | "MIT"
  | "Apache-2.0"
  | "BSD-2-Clause"
  | "BSD-3-Clause"
  | "ISC"
  | "CC0-1.0"
  | "OFL-1.1"
>;
