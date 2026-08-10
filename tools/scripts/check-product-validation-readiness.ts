import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import validationBaseline from "@/docs/examples/product-validation-empty.json";
import { productValidationBundleSchema } from "@/lib/product-validation/schema";
import { evaluateProductValidationReadiness } from "@/lib/product-validation/readiness";
import { isPackCheckoutConfigured } from "@/lib/product-validation/checkout";
import { verifyValidationOfferSnapshot } from "@/lib/product-validation/verify-offer-snapshot";
import { getExperimentLifecycle } from "@/lib/product-validation/server";

const TABLES = [
  "product_validation_participants",
  "product_validation_events",
  "product_validation_interviews",
] as const;

const REQUIRED_COLUMNS: Record<(typeof TABLES)[number], string> = {
  product_validation_participants: "experiment_id,offer_version,identity_key,icp_status,withdrawn_at",
  product_validation_events: "event_id,experiment_id,identity_key,event_type,trust,created_by",
  product_validation_interviews: "interview_id,experiment_id,participant_identity_key,withdrawn",
};

async function main() {
  loadEnvConfig(process.cwd());
  const bundle = productValidationBundleSchema.parse(validationBaseline);
  const offerVerification = await verifyValidationOfferSnapshot(process.cwd(), bundle);
  const offer = offerVerification.artifact;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const tableState = Object.fromEntries(TABLES.map((table) => [table, false])) as Record<(typeof TABLES)[number], boolean>;
  let qualifiedVisitors = 0;
  let qualifiedInterviews = 0;

  if (url && serviceKey) {
    const client = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    for (const table of TABLES) {
      const result = await client
        .from(table)
        .select(REQUIRED_COLUMNS[table], { count: "exact", head: true })
        .limit(1);
      tableState[table] = !result.error;
      if (result.error) console.error(`[remote:${table}] ${result.error.code ?? "ERROR"} ${result.error.message}`);
    }
    if (tableState.product_validation_participants) {
      const result = await client
        .from("product_validation_participants")
        .select("*", { count: "exact", head: true })
        .eq("experiment_id", bundle.experiment.experimentId)
        .eq("offer_version", bundle.experiment.offerVersion)
        .eq("icp_status", "qualified")
        .eq("environment", "production")
        .eq("is_bot", false)
        .eq("is_internal", false)
        .eq("is_test", false)
        .is("withdrawn_at", null);
      qualifiedVisitors = result.count ?? 0;
    }
    if (tableState.product_validation_interviews) {
      const result = await client
        .from("product_validation_interviews")
        .select("*", { count: "exact", head: true })
        .eq("experiment_id", bundle.experiment.experimentId)
        .eq("offer_version", bundle.experiment.offerVersion)
        .eq("icp_status", "qualified")
        .eq("consent_recorded", true)
        .eq("withdrawn", false);
      qualifiedInterviews = result.count ?? 0;
    }
  }

  const report = evaluateProductValidationReadiness({
    hmacSecretConfigured: (process.env.PRODUCT_VALIDATION_HMAC_SECRET?.trim().length ?? 0) >= 32,
    adminApiConfigured: Boolean(process.env.ADMIN_API_TOKEN?.trim()),
    offerSnapshotVerified: offerVerification.ok,
    remoteTables: tableState,
    licenseReviewStatus: offer?.commercialTerms.licenseReviewStatus ?? "missing",
    publicSaleAuthorized: offer?.pack.publicSaleAuthorized ?? false,
    experimentLifecycle: getExperimentLifecycle(),
    checkoutProviderConfigured: isPackCheckoutConfigured(),
    qualifiedVisitors,
    qualifiedInterviews,
    minimumQualifiedVisitors: bundle.experiment.thresholds.minimumQualifiedVisitors,
    minimumQualifiedInterviews: bundle.experiment.thresholds.minimumQualifiedInterviews,
  });

  console.log(`[check:product-validation-readiness] ${report.status.toUpperCase()}`);
  for (const check of report.checks) console.log(`- [${check.status.toUpperCase()}] ${check.message}`);
  if (report.status === "blocked") process.exitCode = 1;
}

void main();
