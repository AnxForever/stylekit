import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { validationInterviewSchema } from "@/lib/product-validation/schema";
import { getActivePackExperiment } from "@/lib/product-validation/server";

const interviewInputSchema = z
  .object({
    interviewId: z.string().regex(/^INT-[0-9]{6}-[0-9]{3,6}$/),
    occurredAt: z.iso.datetime(),
    participantIdentityKey: z
      .string()
      .regex(/^(?:hmac:[0-9a-f]{64}|anon:[A-Za-z0-9_-]{16,128})$/),
    icpStatus: z.enum(["qualified", "edge", "not_qualified"]),
    primaryVariantId: z.enum(["pack-29", "pack-49"]).nullable(),
    contactVerificationMethod: z.enum([
      "authenticated_account",
      "verified_email",
      "manual_interview",
    ]),
    evidenceLogSha256: z.string().regex(/^sha256:[0-9a-f]{64}$/),
    evidenceSource: z.enum([
      "interview_notes",
      "transcript",
      "payment_provider",
      "manual_reconciliation",
    ]),
    consentRecorded: z.literal(true),
    priceAccepted: z.boolean(),
    depositLinkRequested: z.boolean(),
    checkoutStarted: z.boolean(),
    nonRefundableDepositPaid: z.boolean(),
    protocolDeviation: z.boolean(),
    withdrawn: z.boolean(),
  })
  .strict();

export async function POST(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed || !access.actor) {
    return NextResponse.json(
      { error: access.error ?? "Admin access required" },
      { status: access.status ?? 403 },
    );
  }
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: 16 * 1024,
    tooLargeMessage: "Interview evidence payload too large",
    invalidJsonMessage: "Invalid interview evidence payload",
  });
  if (!body.ok) {
    return NextResponse.json({ error: body.error }, { status: body.status });
  }
  const parsed = interviewInputSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Interview evidence failed validation" },
      { status: 400 },
    );
  }
  const experiment = getActivePackExperiment();
  const reviewedBy = `reviewer:${createHash("sha256")
    .update(`${access.actor.type}:${access.actor.id}`)
    .digest("hex")
    .slice(0, 32)}`;
  const interview = validationInterviewSchema.safeParse({
    ...parsed.data,
    offerSnapshotSha256: experiment.offerSnapshot.sha256,
    reviewedBy,
  });
  if (!interview.success) {
    return NextResponse.json(
      { error: "Interview evidence contradicts the frozen protocol" },
      { status: 400 },
    );
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Product validation storage is not configured" },
      { status: 503 },
    );
  }
  const value = interview.data;
  const { error } = await supabase.from("product_validation_interviews").insert({
    interview_id: value.interviewId,
    experiment_id: experiment.experimentId,
    offer_version: experiment.offerVersion,
    occurred_at: value.occurredAt,
    participant_identity_key: value.participantIdentityKey,
    icp_status: value.icpStatus,
    primary_variant_id: value.primaryVariantId,
    offer_snapshot_sha256: value.offerSnapshotSha256,
    contact_verification_method: value.contactVerificationMethod,
    evidence_log_sha256: value.evidenceLogSha256,
    evidence_source: value.evidenceSource,
    reviewed_by: value.reviewedBy,
    consent_recorded: value.consentRecorded,
    price_accepted: value.priceAccepted,
    deposit_link_requested: value.depositLinkRequested,
    checkout_started: value.checkoutStarted,
    non_refundable_deposit_paid: value.nonRefundableDepositPaid,
    protocol_deviation: value.protocolDeviation,
    withdrawn: value.withdrawn,
  });
  if (error?.code === "23505") {
    return NextResponse.json(
      { error: "Interview evidence already exists" },
      { status: 409 },
    );
  }
  if (error) {
    return NextResponse.json(
      { error: "Unable to store interview evidence" },
      { status: 500 },
    );
  }
  return NextResponse.json({ success: true, interviewId: value.interviewId });
}
