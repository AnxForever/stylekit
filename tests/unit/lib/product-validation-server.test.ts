import { describe, expect, it } from "vitest";
import {
  assignExperimentVariant,
  buildProductValidationBundleFromRows,
  canCollectVerifiedPriceIntent,
  deriveExperimentIdentity,
  getActivePackExperiment,
  isQualifiedIcp,
  publicExperimentContext,
} from "@/lib/product-validation/server";

describe("product validation server evidence", () => {
  it("derives non-PII stable identities and sticky server-side price assignments", () => {
    const secret = "s".repeat(64);
    const first = deriveExperimentIdentity({
      secret,
      authenticatedUserId: "linuxdo-user-123",
      anonymousCookie: "unused-cookie",
    });
    const second = deriveExperimentIdentity({
      secret,
      authenticatedUserId: "linuxdo-user-123",
      anonymousCookie: "different-cookie",
    });

    expect(first).toEqual(second);
    expect(first.identityKey).toMatch(/^hmac:[0-9a-f]{64}$/);
    expect(first.identityKey).not.toContain("linuxdo-user-123");
    expect(assignExperimentVariant(first.identityKey)).toEqual(
      assignExperimentVariant(first.identityKey),
    );
    expect(["pack-29", "pack-49"]).toContain(
      publicExperimentContext(first).variantId,
    );
  });

  it("requires every frozen ICP condition and research consent", () => {
    const qualified = {
      productionProjectWithin90Days: true,
      buildsB2bSaasOrProductionWeb: true,
      usesReactOrNext: true,
      usesTailwind: true,
      usesShadcn: true,
      usedAiCodingForRealFrontend: true,
      influencesPurchaseDecision: true,
      researchConsent: true as const,
    };
    expect(isQualifiedIcp(qualified)).toBe(true);
    expect(isQualifiedIcp({ ...qualified, usesShadcn: false })).toBe(false);
  });

  it("keeps verified intent locked while the commercial license is still a draft", () => {
    expect(canCollectVerifiedPriceIntent()).toBe(false);
  });

  it("exports de-identified production evidence into the evaluator bundle", () => {
    const experiment = getActivePackExperiment();
    const identityKey = `hmac:${"a".repeat(64)}`;
    const occurredAt = "2026-08-12T10:00:00.000Z";
    const bundle = buildProductValidationBundleFromRows(
      [
        {
          identity_key: identityKey,
          identity_confidence: "authenticated_account",
          icp_status: "qualified",
          variant_id: "pack-29",
          assigned_at: "2026-08-12T09:50:00.000Z",
          source_channel: "community",
          environment: "production",
          is_bot: false,
          is_internal: false,
          is_test: false,
        },
      ],
      [
        {
          event_id: "evt_offer_0001",
          occurred_at: occurredAt,
          identity_key: identityKey,
          experiment_id: experiment.experimentId,
          offer_version: experiment.offerVersion,
          variant_id: "pack-29",
          event_type: "pack_offer_view",
          trust: "client_validated",
          created_by: "client_exposure_api",
          event_data: { visibilityMs: 2_000, visibleRatioBps: 6_000 },
        },
        {
          event_id: "evt_price_0001",
          occurred_at: occurredAt,
          identity_key: identityKey,
          experiment_id: experiment.experimentId,
          offer_version: experiment.offerVersion,
          variant_id: "pack-29",
          event_type: "pack_price_view",
          trust: "client_validated",
          created_by: "client_exposure_api",
          event_data: { visibilityMs: 2_000, visibleRatioBps: 7_000 },
        },
        {
          event_id: "evt_intent_0001",
          occurred_at: occurredAt,
          identity_key: identityKey,
          experiment_id: experiment.experimentId,
          offer_version: experiment.offerVersion,
          variant_id: "pack-29",
          event_type: "pack_purchase_intent",
          trust: "server_verified",
          created_by: "authenticated_intent_api",
          event_data: {},
        },
      ],
    );

    expect(bundle.datasetStatus).toBe("collecting");
    expect(bundle.participants).toHaveLength(1);
    expect(bundle.onlineEvents).toHaveLength(3);
    expect(JSON.stringify(bundle)).not.toMatch(/@|email|user-agent|ip_address/i);
  });

  it("rejects a database row that only claims authoritative trust as a string", () => {
    const experiment = getActivePackExperiment();
    const identityKey = `anon:${"a".repeat(43)}`;
    expect(() =>
      buildProductValidationBundleFromRows(
        [
          {
            identity_key: identityKey,
            identity_confidence: "anonymous",
            icp_status: "qualified",
            variant_id: "pack-29",
            assigned_at: "2026-08-12T09:50:00.000Z",
            source_channel: "direct",
            environment: "production",
            is_bot: false,
            is_internal: false,
            is_test: false,
          },
        ],
        [
          {
            event_id: "evt_fake_intent_01",
            occurred_at: "2026-08-12T10:00:00.000Z",
            identity_key: identityKey,
            experiment_id: experiment.experimentId,
            offer_version: experiment.offerVersion,
            variant_id: "pack-29",
            event_type: "pack_purchase_intent",
            trust: "server_verified",
            created_by: "client_exposure_api",
            event_data: {},
          },
        ],
      ),
    ).toThrow(/Untrusted purchase-intent evidence/);
  });
});
