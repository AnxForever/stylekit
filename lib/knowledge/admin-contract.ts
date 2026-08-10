import type { KnowledgeApprovalEvaluation } from "./review";
import type { KnowledgeResourcePayload } from "./catalog";

export interface KnowledgeAdminResource extends KnowledgeResourcePayload {
  approval: KnowledgeApprovalEvaluation;
}

export interface KnowledgeAdminResourcesData {
  schemaVersion: "knowledge-admin-resources-v1";
  source: "git-manifests";
  counts: {
    total: number;
    pending: number;
    blocked: number;
    ready: number;
  };
  resources: KnowledgeAdminResource[];
}

export interface KnowledgeAdminReview {
  id: string;
  resource_id: string;
  reviewer_id: string | null;
  decision: "approve" | "reject" | "request-changes" | "revoke";
  notes: string | null;
  evidence: Record<string, unknown>;
  created_at: string;
}

export interface KnowledgeAdminReviewsData {
  resourceId: string;
  reviews: KnowledgeAdminReview[];
}

export interface KnowledgeAdminPublication {
  id: string;
  resource_id: string;
  action: "publish" | "deprecate" | "revoke";
  content_hash: string | null;
  publisher_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface KnowledgeAdminPublicationsData {
  resourceId: string | null;
  publications: KnowledgeAdminPublication[];
}
