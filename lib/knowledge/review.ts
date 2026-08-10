import type { KnowledgeResource } from "./schema";

export const KNOWLEDGE_REVIEW_DECISIONS = [
  "approve",
  "reject",
  "request-changes",
  "revoke",
] as const;

export type KnowledgeReviewDecision = (typeof KNOWLEDGE_REVIEW_DECISIONS)[number];

export interface KnowledgeApprovalEvaluation {
  ok: boolean;
  blockers: string[];
}

export function evaluateKnowledgeApproval(resource: KnowledgeResource): KnowledgeApprovalEvaluation {
  const blockers: string[] = [];

  if (resource.license.classification !== "allowlisted") blockers.push("license is not allowlisted");
  if (!resource.license.commercialUse) blockers.push("commercial use is not confirmed");
  if (!resource.license.modificationAllowed) blockers.push("modification rights are not confirmed");
  if (!resource.license.redistributionAllowed) blockers.push("redistribution rights are not confirmed");
  if (!resource.provenance.auditedBy || !resource.provenance.auditedAt) blockers.push("auditor identity and timestamp are missing");
  if (resource.security.secretScan !== "pass") blockers.push("secret scan has not passed");
  if (!["pass", "not-applicable"].includes(resource.security.dependencyAudit)) blockers.push("dependency audit has not passed");
  if (!["present", "not-required"].includes(resource.security.sbomStatus)) blockers.push("SBOM is not present or marked not required");
  if (resource.security.criticalFindings > 0) blockers.push("critical security findings remain");
  if (!resource.quality.documentationReviewed) blockers.push("documentation review is incomplete");
  if (!resource.quality.runtimeVerified) blockers.push("runtime verification is incomplete");
  if (!resource.quality.accessibilityReviewed) blockers.push("accessibility review is incomplete");
  if (!resource.quality.performanceReviewed) blockers.push("performance review is incomplete");

  return { ok: blockers.length === 0, blockers };
}

export function isKnowledgeReviewDecision(value: unknown): value is KnowledgeReviewDecision {
  return typeof value === "string" && (KNOWLEDGE_REVIEW_DECISIONS as readonly string[]).includes(value);
}
