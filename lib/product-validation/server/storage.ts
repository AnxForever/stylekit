import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ExperimentIdentity,
  ValidationEnvironment,
  ValidationSourceChannel,
} from "./experiment";

export type ValidationParticipantContext = {
  experimentId: string;
  offerVersion: string;
  variantId: string;
  identity: ExperimentIdentity;
  assignedAt: string;
  sourceChannel: ValidationSourceChannel;
  environment: ValidationEnvironment;
  isBot: boolean;
  isInternal: boolean;
  isTest: boolean;
  qualificationRuleVersion: string;
  botRuleVersion: string;
  firstTouch: Record<string, string | null>;
};

export async function ensureValidationParticipant(
  client: SupabaseClient,
  context: ValidationParticipantContext,
) {
  const { error } = await client.from("product_validation_participants").upsert(
    {
      experiment_id: context.experimentId,
      offer_version: context.offerVersion,
      identity_key: context.identity.identityKey,
      identity_confidence: context.identity.identityConfidence,
      variant_id: context.variantId,
      assigned_at: context.assignedAt,
      source_channel: context.sourceChannel,
      environment: context.environment,
      qualification_rule_version: context.qualificationRuleVersion,
      bot_rule_version: context.botRuleVersion,
      is_bot: context.isBot,
      is_internal: context.isInternal,
      is_test: context.isTest,
      first_touch: context.firstTouch,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "experiment_id,identity_key",
      ignoreDuplicates: true,
    },
  );
  if (error) throw new Error("Unable to persist validation participant");
}

export async function updateValidationQualification(
  client: SupabaseClient,
  input: {
    experimentId: string;
    identityKey: string;
    icpStatus: "qualified" | "not_qualified";
    answers: Record<string, boolean>;
    qualifiedAt: string | null;
  },
) {
  const { error } = await client
    .from("product_validation_participants")
    .update({
      icp_status: input.icpStatus,
      qualification_answers: input.answers,
      qualified_at: input.qualifiedAt,
      updated_at: new Date().toISOString(),
    })
    .eq("experiment_id", input.experimentId)
    .eq("identity_key", input.identityKey);
  if (error) throw new Error("Unable to persist ICP qualification");
}

export async function insertValidationEvent(
  client: SupabaseClient,
  input: {
    eventId: string;
    occurredAt: string;
    identityKey: string;
    experimentId: string;
    offerVersion: string;
    variantId: string;
    eventType:
      | "pack_offer_view"
      | "pack_price_view"
      | "pack_purchase_intent";
    trust: "client_validated" | "server_verified";
    eventData: Record<string, string | number | boolean | null>;
    createdBy: "client_exposure_api" | "authenticated_intent_api";
  },
): Promise<"inserted" | "duplicate"> {
  const { error } = await client.from("product_validation_events").insert({
    event_id: input.eventId,
    occurred_at: input.occurredAt,
    identity_key: input.identityKey,
    experiment_id: input.experimentId,
    offer_version: input.offerVersion,
    variant_id: input.variantId,
    event_type: input.eventType,
    trust: input.trust,
    event_data: input.eventData,
    created_by: input.createdBy,
  });
  if (!error) return "inserted";
  if (error.code === "23505") return "duplicate";
  throw new Error("Unable to persist validation event");
}

export async function readValidationParticipant(
  client: SupabaseClient,
  experimentId: string,
  identityKey: string,
) {
  const { data, error } = await client
    .from("product_validation_participants")
    .select("*")
    .eq("experiment_id", experimentId)
    .eq("identity_key", identityKey)
    .maybeSingle();
  if (error) throw new Error("Unable to read validation participant");
  return data as Record<string, unknown> | null;
}

export async function readValidationExposureTypes(
  client: SupabaseClient,
  experimentId: string,
  identityKey: string,
) {
  const { data, error } = await client
    .from("product_validation_events")
    .select("event_type")
    .eq("experiment_id", experimentId)
    .eq("identity_key", identityKey)
    .in("event_type", ["pack_offer_view", "pack_price_view"]);
  if (error) throw new Error("Unable to read validation exposure evidence");
  return new Set(
    ((data ?? []) as Array<{ event_type?: string }>).map((row) => row.event_type),
  );
}

export async function withdrawValidationParticipant(
  client: SupabaseClient,
  input: { experimentId: string; identityKey: string },
): Promise<boolean> {
  const { data, error } = await client.rpc("withdraw_product_validation_participant", {
    target_experiment_id: input.experimentId,
    target_identity_key: input.identityKey,
  });
  if (error) throw new Error("Unable to withdraw validation participant");
  return data === true;
}
