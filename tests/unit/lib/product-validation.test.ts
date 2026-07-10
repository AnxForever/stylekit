import { describe, expect, it } from "vitest";
import {
  evaluateProductValidation,
  productValidationBundleSchema,
  renderProductValidationReport,
  type ProductValidationBundle,
} from "@/lib/product-validation";

const START = "2026-08-01T00:00:00.000Z";
const END = "2026-08-31T23:59:59.000Z";

function baseBundle(): ProductValidationBundle {
  return {
    schemaVersion: 1,
    experiment: {
      experimentId: "cc-saas-pack-price-2026-01",
      offerVersion: "cc-saas-pack-offer-v1",
      packId: "corporate-clean-saas",
      packVersion: "0.1.0",
      revisionNumber: 0,
      window: { start: START, end: END },
      variants: [
        { id: "pack-199", currency: "CNY", amountMinor: 19_900 },
        { id: "pack-399", currency: "CNY", amountMinor: 39_900 },
      ],
      thresholds: {
        minimumQualifiedVisitors: 200,
        minimumVisitorsPerVariant: 100,
        minimumSoftIntentRateBps: 500,
        minimumStrongIntentRateBps: 200,
        maximumVariantShareBps: 5_500,
        minimumQualifiedInterviews: 20,
        minimumInterviewsPerVariant: 10,
        minimumPriceAcceptances: 6,
        minimumDepositLinkRequests: 3,
        minimumVisibilityMs: 2_000,
        minimumVisibleRatioBps: 5_000,
        maximumProductionHours: 80,
        maximumAssetCostMinor: 150_000,
        maximumBreakEvenUnits: 25,
        minimumBrandKitConversations: 5,
        minimumBrandKitProposals: 2,
        minimumBrandKitPaidCommitments: 1,
      },
    },
    participants: [],
    onlineEvents: [],
    interviews: [],
    economicsForecast: {
      currency: "CNY",
      productionHours: 60,
      maintainerHourlyCostMinor: 10_000,
      assetCostMinor: 100_000,
      otherFixedCostMinor: 0,
      expectedRefundRateBps: 500,
      taxRateBps: 600,
      paymentFeeBps: 300,
      perOrderDeliveryCostMinor: 500,
      expectedSupportMinutes: 20,
      supportHourlyCostMinor: 6_000,
      attributableCacMinor: 1_000,
    },
  };
}

function addQualifiedParticipant(
  bundle: ProductValidationBundle,
  index: number,
  variantId: "pack-199" | "pack-399",
  commitment: "none" | "soft" | "strong" = "none",
) {
  const identityKey = `anon:${String(index).padStart(16, "0")}`;
  bundle.participants.push({
    identityKey,
    identityConfidence: "anonymous",
    icpStatus: "qualified",
    variantId,
    assignedAt: START,
    sourceChannel: "direct",
    environment: "production",
    isBot: false,
    isInternal: false,
    isTest: false,
  });

  const common = {
    occurredAt: "2026-08-10T10:00:00.000Z",
    identityKey,
    experimentId: bundle.experiment.experimentId,
    offerVersion: bundle.experiment.offerVersion,
    variantId,
  } as const;
  bundle.onlineEvents.push(
    {
      ...common,
      eventId: `evt-offer-${index}`,
      type: "pack_offer_view",
      trust: "client_validated",
      visibilityMs: 2_500,
      visibleRatioBps: 6_000,
    },
    {
      ...common,
      eventId: `evt-price-${index}`,
      type: "pack_price_view",
      trust: "client_validated",
      visibilityMs: 2_500,
      visibleRatioBps: 6_000,
    },
  );

  if (commitment === "soft" || commitment === "strong") {
    bundle.onlineEvents.push({
      ...common,
      eventId: `evt-intent-${index}`,
      type: "pack_purchase_intent",
      trust: "server_verified",
    });
  }
  if (commitment === "strong") {
    bundle.onlineEvents.push({
      ...common,
      eventId: `evt-checkout-${index}`,
      type: "pack_checkout_start",
      trust: "server_verified",
    });
  }
}

describe("product validation evidence contract", () => {
  it("rejects direct personal identifiers and duplicate participant identities", () => {
    const bundle = baseBundle();
    bundle.participants.push(
      {
        identityKey: "person@example.com",
        identityConfidence: "verified_contact_hmac",
        icpStatus: "qualified",
        variantId: "pack-199",
        assignedAt: START,
        sourceChannel: "email",
        environment: "production",
        isBot: false,
        isInternal: false,
        isTest: false,
      },
      {
        identityKey: "person@example.com",
        identityConfidence: "verified_contact_hmac",
        icpStatus: "qualified",
        variantId: "pack-399",
        assignedAt: START,
        sourceChannel: "email",
        environment: "production",
        isBot: false,
        isInternal: false,
        isTest: false,
      },
    );

    const parsed = productValidationBundleSchema.safeParse(bundle);
    expect(parsed.success).toBe(false);
  });

  it("deduplicates repeated events and excludes low-confidence or invalid traffic", () => {
    const bundle = baseBundle();
    addQualifiedParticipant(bundle, 1, "pack-199", "soft");
    bundle.onlineEvents.push({ ...bundle.onlineEvents[0] });
    bundle.participants.push({
      identityKey: "session:abcdefghijklmno",
      identityConfidence: "session_only",
      icpStatus: "qualified",
      variantId: "pack-399",
      assignedAt: START,
      sourceChannel: "direct",
      environment: "production",
      isBot: false,
      isInternal: false,
      isTest: false,
    });

    const result = evaluateProductValidation(bundle);
    expect(result.online.qualifiedVisitors).toBe(1);
    expect(result.online.softIntentPeople).toBe(1);
    expect(result.online.exclusions.sessionOnly).toBe(1);
    expect(result.online.duplicateEventIds).toBe(1);
  });

  it("passes the quantitative demand gate only with balanced per-variant evidence", () => {
    const bundle = baseBundle();
    for (let index = 0; index < 200; index += 1) {
      const variantId = index < 100 ? "pack-199" : "pack-399";
      const withinVariant = index % 100;
      const commitment = withinVariant < 2
        ? "strong"
        : withinVariant < 5
          ? "soft"
          : "none";
      addQualifiedParticipant(bundle, index, variantId, commitment);
    }

    const result = evaluateProductValidation(bundle);
    expect(result.online.status).toBe("pass");
    expect(result.online.qualifiedVisitors).toBe(200);
    expect(result.online.softIntentRateBps).toBe(500);
    expect(result.online.strongIntentRateBps).toBe(200);
    expect(result.online.variants["pack-199"].status).toBe("pass");
    expect(result.online.variants["pack-399"].status).toBe("pass");
    expect(result.economics.status).toBe("pass");
    expect(result.decision).toBe("continue_pack_1");
  });

  it("passes the documented interview path without counting edge or deviated interviews", () => {
    const bundle = baseBundle();
    for (let index = 0; index < 22; index += 1) {
      bundle.interviews.push({
        interviewId: `INT-202608-${String(index + 1).padStart(3, "0")}`,
        occurredAt: "2026-08-12T10:00:00.000Z",
        icpStatus: index === 20 ? "edge" : "qualified",
        primaryVariantId: index % 2 === 0 ? "pack-199" : "pack-399",
        priceAccepted: index < 6,
        depositLinkRequested: index < 3,
        checkoutStarted: false,
        nonRefundableDepositPaid: false,
        protocolDeviation: index === 21,
        withdrawn: false,
      });
    }

    const result = evaluateProductValidation(bundle);
    expect(result.interviews.qualifiedInterviews).toBe(20);
    expect(result.interviews.priceAcceptances).toBe(6);
    expect(result.interviews.depositLinkRequests).toBe(3);
    expect(result.interviews.status).toBe("pass");
    expect(result.decision).toBe("continue_pack_1");
  });

  it("does not authorize Pack 1 when the sample is incomplete", () => {
    const bundle = baseBundle();
    for (let index = 0; index < 20; index += 1) {
      addQualifiedParticipant(bundle, index, index < 10 ? "pack-199" : "pack-399", "strong");
    }

    const result = evaluateProductValidation(bundle);
    expect(result.online.status).toBe("inconclusive");
    expect(result.interviews.status).toBe("inconclusive");
    expect(result.decision).toBe("inconclusive_sample");
  });

  it("stops after one failed offer revision and never treats waitlist-like evidence as intent", () => {
    const bundle = baseBundle();
    bundle.experiment.revisionNumber = 1;
    for (let index = 0; index < 200; index += 1) {
      addQualifiedParticipant(bundle, index, index < 100 ? "pack-199" : "pack-399");
    }

    const result = evaluateProductValidation(bundle);
    expect(result.online.status).toBe("fail");
    expect(result.online.softIntentPeople).toBe(0);
    expect(result.decision).toBe("stop_expansion");
  });

  it("holds demand that cannot meet the frozen unit-economics gate", () => {
    const bundle = baseBundle();
    bundle.experiment.thresholds.maximumBreakEvenUnits = 2;
    for (let index = 0; index < 20; index += 1) {
      bundle.interviews.push({
        interviewId: `INT-202608-${String(index + 1).padStart(3, "0")}`,
        occurredAt: "2026-08-12T10:00:00.000Z",
        icpStatus: "qualified",
        primaryVariantId: index % 2 === 0 ? "pack-199" : "pack-399",
        priceAccepted: index < 6,
        depositLinkRequested: index < 3,
        checkoutStarted: false,
        nonRefundableDepositPaid: false,
        protocolDeviation: false,
        withdrawn: false,
      });
    }

    const result = evaluateProductValidation(bundle);
    expect(result.interviews.status).toBe("pass");
    expect(result.economics.status).toBe("fail");
    expect(result.decision).toBe("revise_offer_once");
    expect(result.issues.map((issue) => issue.code)).toContain("ECONOMICS_GATE_FAILED");
  });

  it("does not combine demand from one price with economics from another", () => {
    const bundle = baseBundle();
    bundle.experiment.thresholds.maximumBreakEvenUnits = 25;
    for (let index = 0; index < 200; index += 1) {
      const variantId = index < 100 ? "pack-199" : "pack-399";
      const withinVariant = index % 100;
      const commitment = variantId === "pack-199" && withinVariant < 10
        ? withinVariant < 4
          ? "strong"
          : "soft"
        : "none";
      addQualifiedParticipant(bundle, index, variantId, commitment);
    }

    const result = evaluateProductValidation(bundle);
    expect(result.online.variants["pack-199"].status).toBe("pass");
    expect(result.online.variants["pack-399"].status).toBe("fail");
    expect(result.economics.variants["pack-199"].status).toBe("fail");
    expect(result.economics.variants["pack-399"].status).toBe("pass");
    expect(result.decision).toBe("revise_offer_once");
    expect(result.issues.map((issue) => issue.code)).toContain(
      "NO_SHARED_DEMAND_ECONOMICS_VARIANT",
    );
  });

  it("holds the decision when duplicate event ids contain conflicting evidence", () => {
    const bundle = baseBundle();
    for (let index = 0; index < 200; index += 1) {
      const variantId = index < 100 ? "pack-199" : "pack-399";
      const withinVariant = index % 100;
      addQualifiedParticipant(
        bundle,
        index,
        variantId,
        withinVariant < 2 ? "strong" : withinVariant < 5 ? "soft" : "none",
      );
    }
    bundle.onlineEvents.push({
      ...bundle.onlineEvents[0],
      identityKey: bundle.participants[1].identityKey,
    });

    const result = evaluateProductValidation(bundle);
    expect(result.online.status).toBe("pass");
    expect(result.decision).toBe("inconclusive_sample");
    expect(result.issues.map((issue) => issue.code)).toContain(
      "CONFLICTING_DUPLICATE_EVENT_ID",
    );
  });

  it("rejects mixed-currency economics", () => {
    const bundle = baseBundle();
    bundle.experiment.variants[1].currency = "USD";
    expect(productValidationBundleSchema.safeParse(bundle).success).toBe(false);
  });

  it("repositions to Private Brand Kit only with E5 evidence and positive service economics", () => {
    const bundle = baseBundle();
    for (let index = 0; index < 200; index += 1) {
      addQualifiedParticipant(bundle, index, index < 100 ? "pack-199" : "pack-399");
    }
    bundle.brandKitEvidence = Array.from({ length: 5 }, (_, index) => ({
      leadId: `brand-lead-${index + 1}`,
      occurredAt: "2026-08-15T10:00:00.000Z",
      qualified: true,
      proposalRequested: index < 2,
      commitment: index === 0 ? "non_refundable_deposit" : "none",
      amountMinor: index === 0 ? 100_000 : 0,
      currency: "CNY",
      trust: index === 0 ? "manual_reconciled" : "interview_verified",
      protocolDeviation: false,
      withdrawn: false,
    }));
    bundle.brandKitForecast = {
      currency: "CNY",
      priceMinor: 300_000,
      estimatedHours: 12,
      hourlyCostMinor: 10_000,
      externalCostMinor: 20_000,
      paymentFeeBps: 300,
      taxRateBps: 600,
      minimumContributionMarginBps: 3_000,
    };

    const result = evaluateProductValidation(bundle);
    expect(result.online.status).toBe("fail");
    expect(result.brandKit.status).toBe("pass");
    expect(result.brandKit.economicsStatus).toBe("pass");
    expect(result.decision).toBe("reposition_to_private_brand_kit");
  });

  it("renders a deterministic report with the gate decision and no identities", () => {
    const bundle = baseBundle();
    const result = evaluateProductValidation(bundle);
    const report = renderProductValidationReport(result);

    expect(report).toContain("Decision: inconclusive_sample");
    expect(report).toContain("Qualified visitors: 0 / 200");
    expect(report).not.toContain("identityKey");
  });
});
