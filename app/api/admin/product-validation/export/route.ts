import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  buildProductValidationBundleFromRows,
  getActivePackExperiment,
} from "@/lib/product-validation/server";

export const dynamic = "force-dynamic";

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
      .select("identity_key,identity_confidence,icp_status,variant_id,assigned_at,source_channel,environment,is_bot,is_internal,is_test")
      .eq("experiment_id", experiment.experimentId)
      .eq("offer_version", experiment.offerVersion)
      .range(0, 999_999),
    supabase
      .from("product_validation_events")
      .select("event_id,occurred_at,identity_key,experiment_id,offer_version,variant_id,event_type,trust,event_data,created_by")
      .eq("experiment_id", experiment.experimentId)
      .eq("offer_version", experiment.offerVersion)
      .in("event_type", ["pack_offer_view", "pack_price_view", "pack_purchase_intent"])
      .range(0, 9_999_999),
    supabase
      .from("product_validation_interviews")
      .select("interview_id,occurred_at,participant_identity_key,icp_status,primary_variant_id,offer_snapshot_sha256,contact_verification_method,evidence_log_sha256,evidence_source,reviewed_by,consent_recorded,price_accepted,deposit_link_requested,checkout_started,non_refundable_deposit_paid,protocol_deviation,withdrawn")
      .eq("experiment_id", experiment.experimentId)
      .eq("offer_version", experiment.offerVersion)
      .range(0, 99_999),
  ]);
  if (participantsResult.error || eventsResult.error || interviewsResult.error) {
    return NextResponse.json(
      { error: "Unable to export product validation evidence" },
      { status: 500 },
    );
  }

  try {
    const bundle = buildProductValidationBundleFromRows(
      participantsResult.data ?? [],
      eventsResult.data ?? [],
      interviewsResult.data ?? [],
    );
    const serialized = JSON.stringify(bundle, null, 2) + "\n";
    const hash = createHash("sha256").update(serialized).digest("hex");
    return new Response(serialized, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${experiment.experimentId}.json"`,
        "Cache-Control": "private, no-store",
        "X-Content-SHA256": hash,
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Stored validation evidence failed schema verification" },
      { status: 500 },
    );
  }
}
