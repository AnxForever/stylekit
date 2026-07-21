import {
  productValidationBundleSchema,
  type ProductValidationBundle,
} from "@/lib/product-validation/schema";
import { getValidationDatasetTemplate } from "./experiment";

type ParticipantRow = {
  identity_key: string;
  identity_confidence: "authenticated_account" | "verified_contact_hmac" | "anonymous" | "session_only";
  icp_status: "qualified" | "edge" | "not_qualified";
  variant_id: string;
  assigned_at: string;
  source_channel: ProductValidationBundle["participants"][number]["sourceChannel"];
  environment: ProductValidationBundle["participants"][number]["environment"];
  is_bot: boolean;
  is_internal: boolean;
  is_test: boolean;
};

type EventRow = {
  event_id: string;
  occurred_at: string;
  identity_key: string;
  experiment_id: string;
  offer_version: string;
  variant_id: string;
  event_type: string;
  trust: string;
  created_by?: string;
  event_data: Record<string, unknown> | null;
};

type InterviewRow = {
  interview_id: string;
  occurred_at: string;
  participant_identity_key: string;
  icp_status: ProductValidationBundle["interviews"][number]["icpStatus"];
  primary_variant_id: string | null;
  offer_snapshot_sha256: string;
  contact_verification_method: ProductValidationBundle["interviews"][number]["contactVerificationMethod"];
  evidence_log_sha256: string;
  evidence_source: ProductValidationBundle["interviews"][number]["evidenceSource"];
  reviewed_by: string;
  consent_recorded: true;
  price_accepted: boolean;
  deposit_link_requested: boolean;
  checkout_started: boolean;
  non_refundable_deposit_paid: boolean;
  protocol_deviation: boolean;
  withdrawn: boolean;
};

function numberField(data: Record<string, unknown>, key: string): number {
  const value = data[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Validation event is missing numeric ${key}`);
  }
  return value;
}

export function buildProductValidationBundleFromRows(
  participantRows: ParticipantRow[],
  eventRows: EventRow[],
  interviewRows: InterviewRow[] = [],
): ProductValidationBundle {
  const baseline = getValidationDatasetTemplate();
  const onlineEvents = eventRows.map((row) => {
    const base = {
      eventId: row.event_id,
      occurredAt: row.occurred_at,
      identityKey: row.identity_key,
      experimentId: row.experiment_id,
      offerVersion: row.offer_version,
      variantId: row.variant_id,
    };
    const data = row.event_data ?? {};
    if (row.event_type === "pack_offer_view" || row.event_type === "pack_price_view") {
      if (row.trust !== "client_validated" || row.created_by !== "client_exposure_api") {
        throw new Error(`Untrusted exposure evidence: ${row.event_id}`);
      }
      return {
        ...base,
        type: row.event_type,
        trust: "client_validated" as const,
        visibilityMs: numberField(data, "visibilityMs"),
        visibleRatioBps: numberField(data, "visibleRatioBps"),
      };
    }
    if (row.event_type === "pack_purchase_intent") {
      if (
        row.trust !== "server_verified" ||
        row.created_by !== "authenticated_intent_api"
      ) {
        throw new Error(`Untrusted purchase-intent evidence: ${row.event_id}`);
      }
      return {
        ...base,
        type: "pack_purchase_intent" as const,
        trust: "server_verified" as const,
      };
    }
    throw new Error(`Unsupported live validation event type: ${row.event_type}`);
  });

  return productValidationBundleSchema.parse({
    ...baseline,
    datasetStatus: "collecting",
    capturedAt: new Date().toISOString(),
    sealedAt: null,
    participants: participantRows.map((row) => ({
      identityKey: row.identity_key,
      identityConfidence: row.identity_confidence,
      icpStatus: row.icp_status,
      variantId: row.variant_id,
      assignedAt: row.assigned_at,
      sourceChannel: row.source_channel,
      environment: row.environment,
      isBot: row.is_bot,
      isInternal: row.is_internal,
      isTest: row.is_test,
    })),
    onlineEvents,
    interviews: interviewRows.map((row) => ({
      interviewId: row.interview_id,
      occurredAt: row.occurred_at,
      participantIdentityKey: row.participant_identity_key,
      icpStatus: row.icp_status,
      primaryVariantId: row.primary_variant_id,
      offerSnapshotSha256: row.offer_snapshot_sha256,
      contactVerificationMethod: row.contact_verification_method,
      evidenceLogSha256: row.evidence_log_sha256,
      evidenceSource: row.evidence_source,
      reviewedBy: row.reviewed_by,
      consentRecorded: row.consent_recorded,
      priceAccepted: row.price_accepted,
      depositLinkRequested: row.deposit_link_requested,
      checkoutStarted: row.checkout_started,
      nonRefundableDepositPaid: row.non_refundable_deposit_paid,
      protocolDeviation: row.protocol_deviation,
      withdrawn: row.withdrawn,
    })),
  });
}
