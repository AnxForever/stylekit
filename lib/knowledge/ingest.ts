import { createHash } from "node:crypto";

import type { KnowledgeResource, KnowledgeReviewStatus } from "./schema";

export type KnowledgeIngestAction =
  | "create-pending"
  | "unchanged"
  | "update-pending"
  | "re-review-required";

export interface ExistingKnowledgeResource {
  id: string;
  manifestHash?: string | null;
  reviewStatus?: KnowledgeReviewStatus;
  publicationStatus?: KnowledgeResource["publicationStatus"];
}

export interface KnowledgeIngestPlanItem {
  id: string;
  action: KnowledgeIngestAction;
  manifestHash: string;
  reviewStatus: KnowledgeReviewStatus;
  publicationStatus: KnowledgeResource["publicationStatus"];
}

export interface KnowledgeIngestPlan {
  schemaVersion: "knowledge-ingest-plan-v1";
  total: number;
  counts: Record<KnowledgeIngestAction, number>;
  items: KnowledgeIngestPlanItem[];
}

export interface KnowledgeResourceRecord {
  id: string;
  schema_version: string;
  name: string;
  name_en: string;
  resource_kind: KnowledgeResource["resourceKind"];
  source_url: string;
  repository_url: string | null;
  source_ref: string;
  commit_sha: string | null;
  license: KnowledgeResource["license"];
  mirror: KnowledgeResource["mirror"];
  provenance: KnowledgeResource["provenance"];
  knowledge: KnowledgeResource["knowledge"];
  quality: KnowledgeResource["quality"];
  security: KnowledgeResource["security"];
  usage_policy: KnowledgeResource["usagePolicy"];
  review_status: KnowledgeReviewStatus;
  publication_status: KnowledgeResource["publicationStatus"];
  content_hash: string | null;
  manifest_hash: string;
  published_at: string | null;
  updated_at: string;
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${stableSerialize(entry)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function hashKnowledgeManifest(resource: KnowledgeResource): string {
  return `sha256:${createHash("sha256").update(stableSerialize(resource)).digest("hex")}`;
}

export function toKnowledgeResourceRecord(
  resource: KnowledgeResource,
  manifestHash = hashKnowledgeManifest(resource),
): KnowledgeResourceRecord {
  return {
    id: resource.id,
    schema_version: resource.schemaVersion,
    name: resource.name,
    name_en: resource.nameEn,
    resource_kind: resource.resourceKind,
    source_url: resource.sourceUrl,
    repository_url: resource.repositoryUrl ?? null,
    source_ref: resource.sourceRef,
    commit_sha: resource.commitSha ?? null,
    license: resource.license,
    mirror: resource.mirror,
    provenance: resource.provenance,
    knowledge: resource.knowledge,
    quality: resource.quality,
    security: resource.security,
    usage_policy: resource.usagePolicy,
    // Import never promotes a resource. Approval and publication are separate
    // reviewer actions in Supabase.
    review_status: resource.reviewStatus === "approved" ? "pending" : resource.reviewStatus,
    publication_status: resource.publicationStatus === "published" ? "unpublished" : resource.publicationStatus,
    content_hash: resource.contentHash ?? null,
    manifest_hash: manifestHash,
    published_at: null,
    updated_at: resource.updatedAt,
  };
}

function resolveAction(
  resource: KnowledgeResource,
  manifestHash: string,
  existing?: ExistingKnowledgeResource,
): KnowledgeIngestAction {
  if (!existing) return "create-pending";
  if (existing.manifestHash === manifestHash) return "unchanged";
  if (existing.reviewStatus === "approved" || existing.publicationStatus === "published") {
    return "re-review-required";
  }
  return "update-pending";
}

export function buildKnowledgeIngestPlan(
  resources: KnowledgeResource[],
  existing: ExistingKnowledgeResource[] = [],
): KnowledgeIngestPlan {
  const existingById = new Map(existing.map((resource) => [resource.id, resource]));
  const items = resources
    .map((resource) => {
      const manifestHash = hashKnowledgeManifest(resource);
      return {
        id: resource.id,
        action: resolveAction(resource, manifestHash, existingById.get(resource.id)),
        manifestHash,
        reviewStatus: resource.reviewStatus,
        publicationStatus: resource.publicationStatus,
      } satisfies KnowledgeIngestPlanItem;
    })
    .sort((left, right) => left.id.localeCompare(right.id));

  const counts: Record<KnowledgeIngestAction, number> = {
    "create-pending": 0,
    unchanged: 0,
    "update-pending": 0,
    "re-review-required": 0,
  };
  for (const item of items) counts[item.action] += 1;

  return {
    schemaVersion: "knowledge-ingest-plan-v1",
    total: items.length,
    counts,
    items,
  };
}
