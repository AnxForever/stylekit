import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { isAdminPasswordConfigured } from "@/lib/auth/admin-session";
import type { ProductValidationAdminData } from "@/lib/admin/product-validation";
import {
  evaluateProductValidationReadiness,
} from "@/lib/product-validation/readiness";
import { isPackCheckoutConfigured } from "@/lib/product-validation/checkout";
import {
  getActiveOfferSnapshot,
  getActivePackExperiment,
  getExperimentLifecycle,
} from "@/lib/product-validation/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ParticipantRow = {
  identity_key: string;
  icp_status: "qualified" | "edge" | "not_qualified";
  variant_id: string;
  environment: string;
  is_bot: boolean;
  is_internal: boolean;
  is_test: boolean;
  updated_at?: string | null;
};

type EventRow = {
  identity_key: string;
  variant_id: string;
  event_type: string;
  occurred_at: string;
};

type InterviewRow = {
  occurred_at: string;
  icp_status: "qualified" | "edge" | "not_qualified";
  primary_variant_id: string | null;
  price_accepted: boolean;
  deposit_link_requested: boolean;
  checkout_started: boolean;
  non_refundable_deposit_paid: boolean;
  protocol_deviation: boolean;
  withdrawn: boolean;
};

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Product validation storage is not configured" },
      { status: 503 },
    );
  }

  const experiment = getActivePackExperiment();
  const [participantsResult, eventsResult, interviewsResult] = await Promise.all([
    supabase
      .from("product_validation_participants")
      .select(
        "identity_key,icp_status,variant_id,environment,is_bot,is_internal,is_test,updated_at",
      )
      .eq("experiment_id", experiment.experimentId)
      .eq("offer_version", experiment.offerVersion)
      .range(0, 99_999),
    supabase
      .from("product_validation_events")
      .select("identity_key,variant_id,event_type,occurred_at")
      .eq("experiment_id", experiment.experimentId)
      .eq("offer_version", experiment.offerVersion)
      .in("event_type", ["pack_offer_view", "pack_price_view", "pack_purchase_intent"])
      .range(0, 99_999),
    supabase
      .from("product_validation_interviews")
      .select(
        "occurred_at,icp_status,primary_variant_id,price_accepted,deposit_link_requested,checkout_started,non_refundable_deposit_paid,protocol_deviation,withdrawn",
      )
      .eq("experiment_id", experiment.experimentId)
      .eq("offer_version", experiment.offerVersion)
      .range(0, 99_999),
  ]);

  if (participantsResult.error || eventsResult.error || interviewsResult.error) {
    return NextResponse.json(
      {
        error: "产品验证数据表尚未接入，请在确认部署后执行 015_product_validation.sql。",
        code: "product_validation_migration_required",
        migration: "lib/supabase/migrations/015_product_validation.sql",
      },
      { status: 503 },
    );
  }

  const participants = (participantsResult.data ?? []) as ParticipantRow[];
  const events = (eventsResult.data ?? []) as EventRow[];
  const interviews = (interviewsResult.data ?? []) as InterviewRow[];
  const trustedParticipants = participants.filter(
    (participant) =>
      participant.environment === "production" &&
      !participant.is_bot &&
      !participant.is_internal &&
      !participant.is_test,
  );
  const qualifiedParticipants = trustedParticipants.filter(
    (participant) => participant.icp_status === "qualified",
  );
  const qualifiedKeys = new Set(
    qualifiedParticipants.map((participant) => participant.identity_key),
  );
  const trustedEvents = events.filter((event) => qualifiedKeys.has(event.identity_key));
  const acceptedInterviewRows = interviews.filter(
    (interview) => interview.icp_status === "qualified" && !interview.withdrawn,
  );

  const countUniqueEventIdentities = (eventType: string, variantId?: string) =>
    new Set(
      trustedEvents
        .filter(
          (event) =>
            event.event_type === eventType &&
            (!variantId || event.variant_id === variantId),
        )
        .map((event) => event.identity_key),
    ).size;

  const variants = experiment.variants.map((variant) => ({
    id: variant.id,
    currency: variant.currency,
    amountMinor: variant.amountMinor,
    qualifiedVisitors: qualifiedParticipants.filter(
      (participant) => participant.variant_id === variant.id,
    ).length,
    offerExposures: countUniqueEventIdentities("pack_offer_view", variant.id),
    priceExposures: countUniqueEventIdentities("pack_price_view", variant.id),
    priceAcceptances: countUniqueEventIdentities("pack_purchase_intent", variant.id),
  }));

  const latestEvidenceAt = [
    ...trustedEvents.map((event) => event.occurred_at),
    ...acceptedInterviewRows.map((interview) => interview.occurred_at),
  ].sort().at(-1) ?? null;

  const offerSnapshotVerified = await verifyOfferSnapshot(experiment.offerSnapshot.sha256);
  const offer = getActiveOfferSnapshot();
  const readiness = evaluateProductValidationReadiness({
    hmacSecretConfigured: (process.env.PRODUCT_VALIDATION_HMAC_SECRET?.trim().length ?? 0) >= 32,
    adminApiConfigured: Boolean(
      process.env.ADMIN_API_TOKEN?.trim() ||
        process.env.ADMIN_USER_IDS?.trim() ||
        isAdminPasswordConfigured(),
    ),
    offerSnapshotVerified,
    remoteTables: {
      product_validation_participants: !participantsResult.error,
      product_validation_events: !eventsResult.error,
      product_validation_interviews: !interviewsResult.error,
    },
    licenseReviewStatus: offer.commercialTerms.licenseReviewStatus,
    publicSaleAuthorized: offer.pack.publicSaleAuthorized,
    experimentLifecycle: getExperimentLifecycle(),
    checkoutProviderConfigured: isPackCheckoutConfigured(),
    qualifiedVisitors: qualifiedParticipants.length,
    qualifiedInterviews: acceptedInterviewRows.length,
    minimumQualifiedVisitors: experiment.thresholds.minimumQualifiedVisitors,
    minimumQualifiedInterviews: experiment.thresholds.minimumQualifiedInterviews,
  });

  const payload: ProductValidationAdminData = {
    generatedAt: new Date().toISOString(),
    experiment: {
      id: experiment.experimentId,
      offerVersion: experiment.offerVersion,
      packId: experiment.packId,
      packVersion: experiment.packVersion,
      lifecycle: getExperimentLifecycle(),
      window: experiment.window,
      variants,
    },
    funnel: {
      qualifiedVisitors: qualifiedParticipants.length,
      offerExposures: countUniqueEventIdentities("pack_offer_view"),
      priceExposures: countUniqueEventIdentities("pack_price_view"),
      priceAcceptances: countUniqueEventIdentities("pack_purchase_intent"),
      qualifiedInterviews: acceptedInterviewRows.length,
      depositLinkRequests: acceptedInterviewRows.filter((row) => row.deposit_link_requested).length,
      checkoutStarts: acceptedInterviewRows.filter((row) => row.checkout_started).length,
      depositsPaid: acceptedInterviewRows.filter((row) => row.non_refundable_deposit_paid).length,
    },
    readiness,
    latestEvidenceAt,
  };

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "private, no-store" },
  });
}

async function verifyOfferSnapshot(expectedHash: string): Promise<boolean> {
  try {
    const file = await readFile(
      path.join(process.cwd(), "docs/examples/corporate-clean-saas-offer-v2.json"),
    );
    const actualHash = `sha256:${createHash("sha256").update(file).digest("hex")}`;
    return actualHash === expectedHash;
  } catch {
    return false;
  }
}
