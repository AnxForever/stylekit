import {
  productValidationBundleSchema,
  type ProductValidationBundle,
  type ValidationOnlineEvent,
  type ValidationParticipant,
} from "@/lib/product-validation/schema";

export type GateStatus = "pass" | "fail" | "inconclusive";
export type ProductValidationDecision =
  | "continue_pack_1"
  | "revise_offer_once"
  | "stop_expansion"
  | "reposition_to_private_brand_kit"
  | "inconclusive_sample";

export interface ValidationIssue {
  code: string;
  severity: "warning" | "error";
  message: string;
}

export interface VariantDemandResult {
  qualifiedVisitors: number;
  softIntentPeople: number;
  strongIntentPeople: number;
  softIntentRateBps: number;
  strongIntentRateBps: number;
  status: GateStatus;
}

export interface ProductValidationResult {
  experimentId: string;
  offerVersion: string;
  evaluatedAt: string;
  decision: ProductValidationDecision;
  demandStatus: GateStatus;
  online: {
    status: GateStatus;
    targetQualifiedVisitors: number;
    qualifiedVisitors: number;
    softIntentPeople: number;
    strongIntentPeople: number;
    purchasers: number;
    softIntentRateBps: number;
    strongIntentRateBps: number;
    duplicateEventIds: number;
    exclusions: {
      sessionOnly: number;
      notQualified: number;
      bot: number;
      internal: number;
      test: number;
      nonProduction: number;
      invalidAssignment: number;
      incompleteExposure: number;
    };
    variants: Record<string, VariantDemandResult>;
  };
  interviews: {
    status: GateStatus;
    targetQualifiedInterviews: number;
    qualifiedInterviews: number;
    priceAcceptances: number;
    depositLinkRequests: number;
    checkoutStarts: number;
    nonRefundableDeposits: number;
    excluded: number;
    variants: Record<
      string,
      {
        qualifiedInterviews: number;
        priceAcceptances: number;
        depositLinkRequests: number;
        sampleStatus: "sufficient" | "inconclusive";
      }
    >;
  };
  economics: {
    status: "pass" | "fail";
    currency: "CNY" | "USD";
    fixedCostMinor: number;
    maximumBreakEvenUnits: number;
    variants: Record<
      string,
      {
        contributionMinor: number;
        contributionMarginBps: number;
        breakEvenUnits: number | null;
        status: "pass" | "fail";
      }
    >;
  };
  brandKit: {
    status: GateStatus;
    economicsStatus: "pass" | "fail" | "inconclusive";
    qualifiedConversations: number;
    proposalRequests: number;
    paidCommitments: number;
    contributionMinor: number | null;
    contributionMarginBps: number | null;
  };
  issues: ValidationIssue[];
}

function rateBps(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 10_000);
}

function isWithinWindow(value: string, start: number, end: number): boolean {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && timestamp >= start && timestamp <= end;
}

function classifyParticipantExclusion(
  participant: ValidationParticipant,
  variantIds: Set<string>,
  start: number,
  end: number,
): keyof ProductValidationResult["online"]["exclusions"] | null {
  if (participant.identityConfidence === "session_only") return "sessionOnly";
  if (participant.icpStatus !== "qualified") return "notQualified";
  if (participant.isBot) return "bot";
  if (participant.isInternal) return "internal";
  if (participant.isTest) return "test";
  if (participant.environment !== "production") return "nonProduction";
  if (
    !variantIds.has(participant.variantId) ||
    !isWithinWindow(participant.assignedAt, start, end)
  ) {
    return "invalidAssignment";
  }
  return null;
}

function validVisibilityEvent(
  event: ValidationOnlineEvent | undefined,
  minimumVisibilityMs: number,
  minimumVisibleRatioBps: number,
): boolean {
  if (!event || !("visibilityMs" in event) || !("visibleRatioBps" in event)) {
    return false;
  }
  return (
    event.visibilityMs >= minimumVisibilityMs &&
    event.visibleRatioBps >= minimumVisibleRatioBps
  );
}

export function evaluateProductValidation(
  input: ProductValidationBundle,
): ProductValidationResult {
  const bundle = productValidationBundleSchema.parse(input);
  const { experiment } = bundle;
  const start = Date.parse(experiment.window.start);
  const end = Date.parse(experiment.window.end);
  const variantIds = new Set(experiment.variants.map((variant) => variant.id));
  const participantById = new Map(
    bundle.participants.map((participant) => [participant.identityKey, participant]),
  );
  const issues: ValidationIssue[] = [];
  const uniqueEvents: ValidationOnlineEvent[] = [];
  const eventById = new Map<string, ValidationOnlineEvent>();
  let duplicateEventIds = 0;

  for (const event of bundle.onlineEvents) {
    const existingEvent = eventById.get(event.eventId);
    if (existingEvent) {
      duplicateEventIds += 1;
      if (JSON.stringify(existingEvent) !== JSON.stringify(event)) {
        issues.push({
          code: "CONFLICTING_DUPLICATE_EVENT_ID",
          severity: "error",
          message: `Event id ${event.eventId} contains conflicting evidence`,
        });
      }
      continue;
    }
    eventById.set(event.eventId, event);

    const participant = participantById.get(event.identityKey);
    if (!participant) {
      issues.push({
        code: "UNKNOWN_EVENT_PARTICIPANT",
        severity: "error",
        message: `Event ${event.eventId} references an unknown participant`,
      });
      continue;
    }
    if (
      event.experimentId !== experiment.experimentId ||
      event.offerVersion !== experiment.offerVersion ||
      event.variantId !== participant.variantId ||
      !variantIds.has(event.variantId) ||
      !isWithinWindow(event.occurredAt, start, end)
    ) {
      issues.push({
        code: "EVENT_CONTEXT_MISMATCH",
        severity: "error",
        message: `Event ${event.eventId} does not match the frozen assignment or window`,
      });
      continue;
    }
    uniqueEvents.push(event);
  }

  if (duplicateEventIds > 0) {
    issues.push({
      code: "DUPLICATE_EVENT_IDS",
      severity: "warning",
      message: `${duplicateEventIds} duplicate event ids were ignored`,
    });
  }

  const eventsByParticipant = new Map<string, ValidationOnlineEvent[]>();
  for (const event of uniqueEvents) {
    const events = eventsByParticipant.get(event.identityKey) ?? [];
    events.push(event);
    eventsByParticipant.set(event.identityKey, events);
  }

  const exclusions: ProductValidationResult["online"]["exclusions"] = {
    sessionOnly: 0,
    notQualified: 0,
    bot: 0,
    internal: 0,
    test: 0,
    nonProduction: 0,
    invalidAssignment: 0,
    incompleteExposure: 0,
  };
  const qualifiedByVariant = new Map<string, Set<string>>();
  const softByVariant = new Map<string, Set<string>>();
  const strongByVariant = new Map<string, Set<string>>();
  const purchasersByVariant = new Map<string, Set<string>>();
  for (const variant of experiment.variants) {
    qualifiedByVariant.set(variant.id, new Set());
    softByVariant.set(variant.id, new Set());
    strongByVariant.set(variant.id, new Set());
    purchasersByVariant.set(variant.id, new Set());
  }

  for (const participant of bundle.participants) {
    const exclusion = classifyParticipantExclusion(
      participant,
      variantIds,
      start,
      end,
    );
    if (exclusion) {
      exclusions[exclusion] += 1;
      continue;
    }

    const events = eventsByParticipant.get(participant.identityKey) ?? [];
    const offerView = events.find((event) => event.type === "pack_offer_view");
    const priceView = events.find((event) => event.type === "pack_price_view");
    if (
      !validVisibilityEvent(
        offerView,
        experiment.thresholds.minimumVisibilityMs,
        experiment.thresholds.minimumVisibleRatioBps,
      ) ||
      !validVisibilityEvent(
        priceView,
        experiment.thresholds.minimumVisibilityMs,
        experiment.thresholds.minimumVisibleRatioBps,
      )
    ) {
      exclusions.incompleteExposure += 1;
      continue;
    }

    qualifiedByVariant.get(participant.variantId)?.add(participant.identityKey);
    if (events.some((event) => event.type === "pack_purchase_intent")) {
      softByVariant.get(participant.variantId)?.add(participant.identityKey);
    }
    if (
      events.some(
        (event) =>
          event.type === "pack_checkout_start" || event.type === "pack_purchase",
      )
    ) {
      strongByVariant.get(participant.variantId)?.add(participant.identityKey);
    }
    if (events.some((event) => event.type === "pack_purchase")) {
      purchasersByVariant.get(participant.variantId)?.add(participant.identityKey);
    }
  }

  const onlineVariants: Record<string, VariantDemandResult> = {};
  let qualifiedVisitors = 0;
  let softIntentPeople = 0;
  let strongIntentPeople = 0;
  let purchasers = 0;
  for (const variant of experiment.variants) {
    const qualified = qualifiedByVariant.get(variant.id)?.size ?? 0;
    const soft = softByVariant.get(variant.id)?.size ?? 0;
    const strong = strongByVariant.get(variant.id)?.size ?? 0;
    qualifiedVisitors += qualified;
    softIntentPeople += soft;
    strongIntentPeople += strong;
    purchasers += purchasersByVariant.get(variant.id)?.size ?? 0;

    const enough = qualified >= experiment.thresholds.minimumVisitorsPerVariant;
    const softRate = rateBps(soft, qualified);
    const strongRate = rateBps(strong, qualified);
    onlineVariants[variant.id] = {
      qualifiedVisitors: qualified,
      softIntentPeople: soft,
      strongIntentPeople: strong,
      softIntentRateBps: softRate,
      strongIntentRateBps: strongRate,
      status: !enough
        ? "inconclusive"
        : softRate >= experiment.thresholds.minimumSoftIntentRateBps &&
            strongRate >= experiment.thresholds.minimumStrongIntentRateBps
          ? "pass"
          : "fail",
    };
  }

  const maxVariantShareBps = qualifiedVisitors > 0
    ? Math.max(
        ...Object.values(onlineVariants).map((variant) =>
          rateBps(variant.qualifiedVisitors, qualifiedVisitors),
        ),
      )
    : 0;
  const onlineSampleSufficient =
    qualifiedVisitors >= experiment.thresholds.minimumQualifiedVisitors &&
    Object.values(onlineVariants).every((variant) => variant.status !== "inconclusive") &&
    maxVariantShareBps <= experiment.thresholds.maximumVariantShareBps;
  const softIntentRateBps = rateBps(softIntentPeople, qualifiedVisitors);
  const strongIntentRateBps = rateBps(strongIntentPeople, qualifiedVisitors);
  const onlineStatus: GateStatus = !onlineSampleSufficient
    ? "inconclusive"
    : softIntentRateBps >= experiment.thresholds.minimumSoftIntentRateBps &&
        strongIntentRateBps >= experiment.thresholds.minimumStrongIntentRateBps &&
        Object.values(onlineVariants).some((variant) => variant.status === "pass")
      ? "pass"
      : "fail";
  if (!onlineSampleSufficient) {
    issues.push({
      code: "ONLINE_SAMPLE_INCOMPLETE",
      severity: "warning",
      message: "Online evidence has not reached the frozen sample and balance gate",
    });
  }

  const eligibleInterviews = bundle.interviews.filter(
    (interview) =>
      interview.icpStatus === "qualified" &&
      !interview.protocolDeviation &&
      !interview.withdrawn &&
      isWithinWindow(interview.occurredAt, start, end),
  );
  const qualifiedInterviews = eligibleInterviews.length;
  const priceAcceptances = eligibleInterviews.filter(
    (interview) => interview.priceAccepted,
  ).length;
  const depositLinkRequests = eligibleInterviews.filter(
    (interview) => interview.depositLinkRequested,
  ).length;
  const checkoutStarts = eligibleInterviews.filter(
    (interview) => interview.checkoutStarted,
  ).length;
  const nonRefundableDeposits = eligibleInterviews.filter(
    (interview) => interview.nonRefundableDepositPaid,
  ).length;
  const interviewVariants: ProductValidationResult["interviews"]["variants"] = {};
  for (const variant of experiment.variants) {
    const interviews = eligibleInterviews.filter(
      (interview) => interview.primaryVariantId === variant.id,
    );
    interviewVariants[variant.id] = {
      qualifiedInterviews: interviews.length,
      priceAcceptances: interviews.filter((interview) => interview.priceAccepted).length,
      depositLinkRequests: interviews.filter(
        (interview) => interview.depositLinkRequested,
      ).length,
      sampleStatus:
        interviews.length >= experiment.thresholds.minimumInterviewsPerVariant
          ? "sufficient"
          : "inconclusive",
    };
  }
  const interviewVariantSamplesSufficient = Object.values(
    interviewVariants,
  ).every((variant) => variant.sampleStatus === "sufficient");
  const interviewStatus: GateStatus =
    qualifiedInterviews < experiment.thresholds.minimumQualifiedInterviews ||
    !interviewVariantSamplesSufficient
      ? "inconclusive"
      : priceAcceptances >= experiment.thresholds.minimumPriceAcceptances &&
          depositLinkRequests >= experiment.thresholds.minimumDepositLinkRequests
        ? "pass"
        : "fail";
  if (
    qualifiedInterviews < experiment.thresholds.minimumQualifiedInterviews
  ) {
    issues.push({
      code: "INTERVIEW_SAMPLE_INCOMPLETE",
      severity: "warning",
      message: "Interview evidence has not reached the frozen qualified sample gate",
    });
  }

  const fixedCostMinor = Math.round(
    bundle.economicsForecast.productionHours *
      bundle.economicsForecast.maintainerHourlyCostMinor +
      bundle.economicsForecast.assetCostMinor +
      bundle.economicsForecast.otherFixedCostMinor,
  );
  const economicsVariants: ProductValidationResult["economics"]["variants"] = {};
  for (const variant of experiment.variants) {
    const refundCost = Math.round(
      (variant.amountMinor * bundle.economicsForecast.expectedRefundRateBps) /
        10_000,
    );
    const taxCost = Math.round(
      (variant.amountMinor * bundle.economicsForecast.taxRateBps) / 10_000,
    );
    const paymentFee = Math.round(
      (variant.amountMinor * bundle.economicsForecast.paymentFeeBps) / 10_000,
    );
    const supportCost = Math.round(
      (bundle.economicsForecast.expectedSupportMinutes / 60) *
        bundle.economicsForecast.supportHourlyCostMinor,
    );
    const contributionMinor =
      variant.amountMinor -
      refundCost -
      taxCost -
      paymentFee -
      bundle.economicsForecast.perOrderDeliveryCostMinor -
      supportCost -
      bundle.economicsForecast.attributableCacMinor;
    const breakEvenUnits = contributionMinor > 0
      ? Math.ceil(fixedCostMinor / contributionMinor)
      : null;
    const status =
      contributionMinor > 0 &&
      breakEvenUnits !== null &&
      breakEvenUnits <= experiment.thresholds.maximumBreakEvenUnits
        ? "pass"
        : "fail";
    economicsVariants[variant.id] = {
      contributionMinor,
      contributionMarginBps: rateBps(contributionMinor, variant.amountMinor),
      breakEvenUnits,
      status,
    };
  }

  const economicsStatus =
    bundle.economicsForecast.productionHours <=
      experiment.thresholds.maximumProductionHours &&
    bundle.economicsForecast.assetCostMinor <=
      experiment.thresholds.maximumAssetCostMinor &&
    Object.values(economicsVariants).some((variant) => variant.status === "pass")
      ? "pass"
      : "fail";
  if (economicsStatus === "fail") {
    issues.push({
      code: "ECONOMICS_GATE_FAILED",
      severity: "error",
      message: "The frozen production budget or break-even gate is not viable",
    });
  }

  const demandStatus: GateStatus =
    onlineStatus === "pass" || interviewStatus === "pass"
      ? "pass"
      : onlineStatus === "fail" || interviewStatus === "fail"
        ? "fail"
        : "inconclusive";
  const eligibleBrandKitEvidence = (bundle.brandKitEvidence ?? []).filter(
    (evidence) =>
      evidence.qualified &&
      !evidence.protocolDeviation &&
      !evidence.withdrawn &&
      isWithinWindow(evidence.occurredAt, start, end),
  );
  const brandKitQualifiedConversations = eligibleBrandKitEvidence.length;
  const brandKitProposalRequests = eligibleBrandKitEvidence.filter(
    (evidence) => evidence.proposalRequested,
  ).length;
  const brandKitPaidCommitments = eligibleBrandKitEvidence.filter(
    (evidence) => evidence.commitment !== "none",
  ).length;
  const brandKitStatus: GateStatus =
    brandKitQualifiedConversations <
    experiment.thresholds.minimumBrandKitConversations
      ? "inconclusive"
      : brandKitProposalRequests >=
            experiment.thresholds.minimumBrandKitProposals &&
          brandKitPaidCommitments >=
            experiment.thresholds.minimumBrandKitPaidCommitments
        ? "pass"
        : "fail";
  let brandKitContributionMinor: number | null = null;
  let brandKitContributionMarginBps: number | null = null;
  let brandKitEconomicsStatus: "pass" | "fail" | "inconclusive" =
    "inconclusive";
  if (bundle.brandKitForecast) {
    const laborCost = Math.round(
      bundle.brandKitForecast.estimatedHours *
        bundle.brandKitForecast.hourlyCostMinor,
    );
    const paymentFee = Math.round(
      (bundle.brandKitForecast.priceMinor *
        bundle.brandKitForecast.paymentFeeBps) /
        10_000,
    );
    const taxCost = Math.round(
      (bundle.brandKitForecast.priceMinor * bundle.brandKitForecast.taxRateBps) /
        10_000,
    );
    brandKitContributionMinor =
      bundle.brandKitForecast.priceMinor -
      laborCost -
      bundle.brandKitForecast.externalCostMinor -
      paymentFee -
      taxCost;
    brandKitContributionMarginBps = rateBps(
      brandKitContributionMinor,
      bundle.brandKitForecast.priceMinor,
    );
    brandKitEconomicsStatus =
      brandKitContributionMinor > 0 &&
      brandKitContributionMarginBps >=
        bundle.brandKitForecast.minimumContributionMarginBps
        ? "pass"
        : "fail";
  }
  const demandPassingVariantIds = new Set<string>();
  if (onlineStatus === "pass") {
    for (const [variantId, variant] of Object.entries(onlineVariants)) {
      if (variant.status === "pass") demandPassingVariantIds.add(variantId);
    }
  }
  if (interviewStatus === "pass") {
    for (const [variantId, variant] of Object.entries(interviewVariants)) {
      if (variant.priceAcceptances > 0) demandPassingVariantIds.add(variantId);
    }
  }
  const hasSharedDemandEconomicsVariant = Array.from(
    demandPassingVariantIds,
  ).some((variantId) => economicsVariants[variantId]?.status === "pass");
  if (
    demandStatus === "pass" &&
    economicsStatus === "pass" &&
    !hasSharedDemandEconomicsVariant
  ) {
    issues.push({
      code: "NO_SHARED_DEMAND_ECONOMICS_VARIANT",
      severity: "error",
      message: "No single price variant passes both demand and economics",
    });
  }
  const hasIntegrityError = issues.some(
    (issue) =>
      issue.severity === "error" &&
      issue.code !== "ECONOMICS_GATE_FAILED" &&
      issue.code !== "NO_SHARED_DEMAND_ECONOMICS_VARIANT",
  );
  const decision: ProductValidationDecision =
    hasIntegrityError
      ? "inconclusive_sample"
      : demandStatus !== "pass" &&
          brandKitStatus === "pass" &&
          brandKitEconomicsStatus === "pass"
        ? "reposition_to_private_brand_kit"
      : demandStatus === "inconclusive"
      ? "inconclusive_sample"
      : demandStatus === "pass" &&
          economicsStatus === "pass" &&
          hasSharedDemandEconomicsVariant
        ? "continue_pack_1"
        : experiment.revisionNumber === 0
          ? "revise_offer_once"
          : "stop_expansion";

  return {
    experimentId: experiment.experimentId,
    offerVersion: experiment.offerVersion,
    evaluatedAt: experiment.window.end,
    decision,
    demandStatus,
    online: {
      status: onlineStatus,
      targetQualifiedVisitors:
        experiment.thresholds.minimumQualifiedVisitors,
      qualifiedVisitors,
      softIntentPeople,
      strongIntentPeople,
      purchasers,
      softIntentRateBps,
      strongIntentRateBps,
      duplicateEventIds,
      exclusions,
      variants: onlineVariants,
    },
    interviews: {
      status: interviewStatus,
      targetQualifiedInterviews:
        experiment.thresholds.minimumQualifiedInterviews,
      qualifiedInterviews,
      priceAcceptances,
      depositLinkRequests,
      checkoutStarts,
      nonRefundableDeposits,
      excluded: bundle.interviews.length - eligibleInterviews.length,
      variants: interviewVariants,
    },
    economics: {
      status: economicsStatus,
      currency: bundle.economicsForecast.currency,
      fixedCostMinor,
      maximumBreakEvenUnits:
        experiment.thresholds.maximumBreakEvenUnits,
      variants: economicsVariants,
    },
    brandKit: {
      status: brandKitStatus,
      economicsStatus: brandKitEconomicsStatus,
      qualifiedConversations: brandKitQualifiedConversations,
      proposalRequests: brandKitProposalRequests,
      paidCommitments: brandKitPaidCommitments,
      contributionMinor: brandKitContributionMinor,
      contributionMarginBps: brandKitContributionMarginBps,
    },
    issues,
  };
}
