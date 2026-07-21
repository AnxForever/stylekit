import { z } from "zod";

const identifierSchema = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/);
const packIdSchema = z
  .string()
  .min(1)
  .max(96)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const identityKeySchema = z
  .string()
  .max(160)
  .regex(
    /^(?:hmac:[0-9a-f]{64}|anon:[A-Za-z0-9_-]{16,128}|session:[A-Za-z0-9_-]{10,128})$/,
    "Use a non-PII hmac:, anon:, or session: identity key",
  );
const basisPointsSchema = z.number().int().min(0).max(10_000);
const positiveMoneySchema = z.number().int().positive().max(1_000_000_000_000);
const nonNegativeMoneySchema = z.number().int().nonnegative().max(1_000_000_000_000);
const sha256Schema = z
  .string()
  .regex(/^sha256:[0-9a-f]{64}$/, "Use a sha256:<64 lowercase hex> content hash");
const repositoryArtifactPathSchema = z
  .string()
  .min(1)
  .max(240)
  .regex(/^[A-Za-z0-9._/-]+\.json$/, "Use a repository-relative JSON artifact path")
  .refine(
    (value) =>
      !value.startsWith("/") &&
      !value.includes("\\") &&
      value.split("/").every((segment) => segment !== "" && segment !== "." && segment !== ".."),
    "Artifact path must stay inside the repository",
  );

export const validationVariantSchema = z
  .object({
    id: identifierSchema,
    currency: z.enum(["CNY", "USD"]),
    amountMinor: positiveMoneySchema,
  })
  .strict();

export const validationOfferSnapshotReferenceSchema = z
  .object({
    artifactPath: repositoryArtifactPathSchema,
    sha256: sha256Schema,
  })
  .strict();

export const validationContractVersionsSchema = z
  .object({
    qualification: identifierSchema,
    bot: identifierSchema,
    assignment: identifierSchema,
    authoritative: identifierSchema,
  })
  .strict();

export const validationOfferSnapshotArtifactSchema = z
  .object({
    schemaVersion: z.literal(1),
    offerVersion: identifierSchema,
    sealedAt: z.iso.datetime(),
    pack: z
      .object({
        id: packIdSchema,
        version: z.string().min(1).max(80),
        name: z.string().min(1).max(160),
        outcome: z.string().min(1).max(1_000),
        status: z.literal("preview"),
        primaryDelivery: z.literal("registry"),
        publicSaleAuthorized: z.literal(false),
      })
      .strict(),
    icp: z
      .object({
        summary: z.string().min(1).max(2_000),
      })
      .strict(),
    deliverables: z.array(z.string().min(1).max(500)).min(1).max(100),
    compatibility: z
      .object({
        next: z.string().min(1).max(80),
        react: z.string().min(1).max(80),
        tailwind: z.string().min(1).max(160),
        shadcn: z.string().min(1).max(160),
        conflictPolicy: z.literal("fail"),
      })
      .strict(),
    commercialTerms: z
      .object({
        licenseId: identifierSchema,
        licenseReviewStatus: z.literal("draft_requires_final_review"),
        commercialUse: z.literal(true),
        maximumContributors: z.number().int().positive().max(10_000),
        updateMonths: z.number().int().nonnegative().max(120),
        installationSupportDays: z.number().int().nonnegative().max(3_650),
        refundPolicy: z.string().min(1).max(2_000),
        deliveryTiming: z.string().min(1).max(1_000),
      })
      .strict(),
    variants: z.array(validationVariantSchema).min(2).max(8),
    priceIsolation: z
      .object({
        onlyVariable: z.literal("amountMinor"),
        sharedOfferFields: z.array(z.string().min(1).max(160)).min(1).max(100),
      })
      .strict(),
  })
  .strict();

export const validationExperimentSchema = z
  .object({
    experimentId: identifierSchema,
    offerVersion: identifierSchema,
    offerSnapshot: validationOfferSnapshotReferenceSchema,
    contractVersions: validationContractVersionsSchema,
    packId: packIdSchema,
    packVersion: z.string().min(1).max(80),
    revisionNumber: z.number().int().min(0).max(1),
    window: z
      .object({
        start: z.iso.datetime(),
        end: z.iso.datetime(),
      })
      .strict(),
    variants: z.array(validationVariantSchema).min(2).max(8),
    thresholds: z
      .object({
        minimumQualifiedVisitors: z.number().int().positive(),
        minimumVisitorsPerVariant: z.number().int().positive(),
        minimumSoftIntentRateBps: basisPointsSchema,
        minimumStrongIntentRateBps: basisPointsSchema,
        maximumVariantShareBps: z.number().int().min(5_000).max(10_000),
        minimumQualifiedInterviews: z.number().int().positive(),
        minimumInterviewsPerVariant: z.number().int().positive(),
        minimumPriceAcceptances: z.number().int().nonnegative(),
        minimumDepositLinkRequests: z.number().int().nonnegative(),
        minimumVisibilityMs: z.number().int().positive().max(60 * 60 * 1000),
        minimumVisibleRatioBps: z.number().int().min(1).max(10_000),
        maximumProductionHours: z.number().positive().max(100_000),
        maximumAssetCostMinor: nonNegativeMoneySchema,
        maximumBreakEvenUnits: z.number().int().positive().max(1_000_000),
        minimumBrandKitConversations: z.number().int().positive(),
        minimumBrandKitProposals: z.number().int().nonnegative(),
        minimumBrandKitPaidCommitments: z.number().int().nonnegative(),
      })
      .strict(),
  })
  .strict()
  .superRefine((experiment, ctx) => {
    if (Date.parse(experiment.window.start) >= Date.parse(experiment.window.end)) {
      ctx.addIssue({
        code: "custom",
        path: ["window", "end"],
        message: "Experiment end must be after start",
      });
    }

    const variantIds = new Set<string>();
    for (const [index, variant] of experiment.variants.entries()) {
      if (variantIds.has(variant.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["variants", index, "id"],
          message: `Duplicate variant id: ${variant.id}`,
        });
      }
      variantIds.add(variant.id);
    }

    if (
      experiment.thresholds.minimumQualifiedVisitors <
      experiment.thresholds.minimumVisitorsPerVariant * experiment.variants.length
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["thresholds", "minimumQualifiedVisitors"],
        message: "Total visitor minimum cannot be lower than all per-variant minimums",
      });
    }
    if (
      experiment.thresholds.minimumStrongIntentRateBps >
      experiment.thresholds.minimumSoftIntentRateBps
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["thresholds", "minimumStrongIntentRateBps"],
        message: "Strong-intent threshold cannot exceed soft-intent threshold",
      });
    }
    if (
      experiment.thresholds.minimumPriceAcceptances >
        experiment.thresholds.minimumQualifiedInterviews ||
      experiment.thresholds.minimumDepositLinkRequests >
        experiment.thresholds.minimumQualifiedInterviews
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["thresholds"],
        message: "Interview success counts cannot exceed the qualified interview minimum",
      });
    }
    if (
      experiment.thresholds.minimumQualifiedInterviews <
      experiment.thresholds.minimumInterviewsPerVariant * experiment.variants.length
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["thresholds", "minimumQualifiedInterviews"],
        message: "Interview minimum cannot be lower than all per-variant minimums",
      });
    }
    if (
      experiment.thresholds.minimumBrandKitProposals >
        experiment.thresholds.minimumBrandKitConversations ||
      experiment.thresholds.minimumBrandKitPaidCommitments >
        experiment.thresholds.minimumBrandKitConversations
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["thresholds"],
        message: "Brand Kit success counts cannot exceed qualified conversations",
      });
    }
  });

export const validationParticipantSchema = z
  .object({
    identityKey: identityKeySchema,
    identityConfidence: z.enum([
      "authenticated_account",
      "verified_contact_hmac",
      "anonymous",
      "session_only",
    ]),
    icpStatus: z.enum(["qualified", "edge", "not_qualified"]),
    variantId: identifierSchema,
    assignedAt: z.iso.datetime(),
    sourceChannel: z.enum([
      "direct",
      "email",
      "community",
      "social",
      "referral",
      "paid",
      "interview",
    ]),
    environment: z.enum(["production", "preview", "development", "test"]),
    isBot: z.boolean(),
    isInternal: z.boolean(),
    isTest: z.boolean(),
  })
  .strict()
  .superRefine((participant, ctx) => {
    if (
      (participant.identityConfidence === "authenticated_account" ||
        participant.identityConfidence === "verified_contact_hmac") &&
      !participant.identityKey.startsWith("hmac:")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["identityKey"],
        message: "Authenticated and verified-contact identities require a one-way HMAC key",
      });
    }
    if (
      participant.identityConfidence === "session_only" &&
      !participant.identityKey.startsWith("session:")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["identityKey"],
        message: "Session-only identities require a session: key",
      });
    }
  });

const onlineEventBase = z.object({
  eventId: identifierSchema,
  occurredAt: z.iso.datetime(),
  identityKey: identityKeySchema,
  experimentId: identifierSchema,
  offerVersion: identifierSchema,
  variantId: identifierSchema,
});

const visibilityEventFields = {
  trust: z.literal("client_validated"),
  visibilityMs: z.number().int().positive().max(60 * 60 * 1000),
  visibleRatioBps: z.number().int().min(1).max(10_000),
};

export const validationOnlineEventSchema = z.discriminatedUnion("type", [
  onlineEventBase
    .extend({
      type: z.literal("pack_offer_view"),
      ...visibilityEventFields,
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_price_view"),
      ...visibilityEventFields,
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_purchase_intent"),
      trust: z.literal("server_verified"),
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_checkout_start"),
      trust: z.literal("server_verified"),
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_purchase"),
      trust: z.enum(["payment_provider", "manual_reconciled"]),
      purchaseId: identifierSchema,
      purchaseKind: z.enum(["full", "preorder", "deposit"]),
      amountMinor: positiveMoneySchema,
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_refund"),
      trust: z.enum(["payment_provider", "manual_reconciled"]),
      purchaseId: identifierSchema,
      refundId: identifierSchema,
      amountMinor: positiveMoneySchema,
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_install_attempt"),
      trust: z.enum([
        "install_verifier",
        "support_verified",
        "customer_self_reported",
      ]),
      installId: identifierSchema,
      installContext: z.enum(["clean_project", "existing_project"]),
    })
    .strict(),
  onlineEventBase
    .extend({
      type: z.literal("pack_install_success"),
      trust: z.enum([
        "install_verifier",
        "support_verified",
        "customer_self_reported",
      ]),
      installId: identifierSchema,
      installContext: z.enum(["clean_project", "existing_project"]),
      supportMinutes: z.number().nonnegative().max(100_000),
    })
    .strict(),
]);

export const validationInterviewSchema = z
  .object({
    interviewId: z
      .string()
      .regex(/^INT-[0-9]{6}-[0-9]{3,6}$/),
    occurredAt: z.iso.datetime(),
    participantIdentityKey: identityKeySchema,
    icpStatus: z.enum(["qualified", "edge", "not_qualified"]),
    primaryVariantId: identifierSchema.nullable(),
    offerSnapshotSha256: sha256Schema,
    contactVerificationMethod: z.enum([
      "authenticated_account",
      "verified_email",
      "manual_interview",
    ]),
    evidenceLogSha256: sha256Schema,
    evidenceSource: z.enum([
      "interview_notes",
      "transcript",
      "payment_provider",
      "manual_reconciliation",
    ]),
    reviewedBy: identifierSchema,
    consentRecorded: z.literal(true),
    priceAccepted: z.boolean(),
    depositLinkRequested: z.boolean(),
    checkoutStarted: z.boolean(),
    nonRefundableDepositPaid: z.boolean(),
    protocolDeviation: z.boolean(),
    withdrawn: z.boolean(),
  })
  .strict()
  .superRefine((interview, ctx) => {
    if (
      interview.priceAccepted &&
      interview.primaryVariantId === null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["primaryVariantId"],
        message: "Price acceptance requires the frozen primary price variant",
      });
    }
    if (interview.depositLinkRequested && !interview.priceAccepted) {
      ctx.addIssue({
        code: "custom",
        path: ["priceAccepted"],
        message: "A deposit-link request requires explicit acceptance of the shown price",
      });
    }
    if (interview.checkoutStarted && !interview.priceAccepted) {
      ctx.addIssue({
        code: "custom",
        path: ["priceAccepted"],
        message: "A checkout start requires explicit acceptance of the shown price",
      });
    }
    if (interview.nonRefundableDepositPaid && !interview.checkoutStarted) {
      ctx.addIssue({
        code: "custom",
        path: ["checkoutStarted"],
        message: "A paid deposit requires a recorded checkout start",
      });
    }
  });

export const economicsForecastSchema = z
  .object({
    currency: z.enum(["CNY", "USD"]),
    productionHours: z.number().nonnegative().max(100_000),
    maintainerHourlyCostMinor: nonNegativeMoneySchema,
    assetCostMinor: nonNegativeMoneySchema,
    otherFixedCostMinor: nonNegativeMoneySchema,
    expectedRefundRateBps: basisPointsSchema,
    taxRateBps: basisPointsSchema,
    paymentFeeBps: basisPointsSchema,
    perOrderDeliveryCostMinor: nonNegativeMoneySchema,
    expectedSupportMinutes: z.number().nonnegative().max(100_000),
    supportHourlyCostMinor: nonNegativeMoneySchema,
    attributableCacMinor: nonNegativeMoneySchema,
  })
  .strict();

export const brandKitEvidenceSchema = z
  .object({
    leadId: identifierSchema,
    occurredAt: z.iso.datetime(),
    qualified: z.boolean(),
    proposalRequested: z.boolean(),
    commitment: z.enum([
      "none",
      "non_refundable_deposit",
      "full_payment",
    ]),
    amountMinor: nonNegativeMoneySchema,
    currency: z.enum(["CNY", "USD"]),
    trust: z.enum([
      "interview_verified",
      "payment_provider",
      "manual_reconciled",
    ]),
    protocolDeviation: z.boolean(),
    withdrawn: z.boolean(),
  })
  .strict()
  .superRefine((evidence, ctx) => {
    const paid = evidence.commitment !== "none";
    if (paid && evidence.amountMinor <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["amountMinor"],
        message: "Paid Brand Kit evidence requires a positive amount",
      });
    }
    if (
      paid &&
      evidence.trust !== "payment_provider" &&
      evidence.trust !== "manual_reconciled"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["trust"],
        message: "Paid Brand Kit evidence requires provider or manual reconciliation",
      });
    }
    if (!paid && evidence.amountMinor !== 0) {
      ctx.addIssue({
        code: "custom",
        path: ["amountMinor"],
        message: "Unpaid Brand Kit evidence must use zero amount",
      });
    }
  });

export const brandKitForecastSchema = z
  .object({
    currency: z.enum(["CNY", "USD"]),
    priceMinor: positiveMoneySchema,
    estimatedHours: z.number().positive().max(100_000),
    hourlyCostMinor: nonNegativeMoneySchema,
    externalCostMinor: nonNegativeMoneySchema,
    paymentFeeBps: basisPointsSchema,
    taxRateBps: basisPointsSchema,
    minimumContributionMarginBps: basisPointsSchema,
  })
  .strict();

export const productValidationBundleSchema = z
  .object({
    schemaVersion: z.literal(1),
    datasetStatus: z.enum(["template", "collecting", "sealed"]),
    capturedAt: z.iso.datetime(),
    sealedAt: z.iso.datetime().nullable(),
    experiment: validationExperimentSchema,
    participants: z.array(validationParticipantSchema).max(1_000_000),
    onlineEvents: z.array(validationOnlineEventSchema).max(10_000_000),
    interviews: z.array(validationInterviewSchema).max(100_000),
    economicsForecast: economicsForecastSchema,
    brandKitEvidence: z.array(brandKitEvidenceSchema).max(100_000).optional(),
    brandKitForecast: brandKitForecastSchema.optional(),
  })
  .strict()
  .superRefine((bundle, ctx) => {
    const variantIds = new Set(bundle.experiment.variants.map((variant) => variant.id));
    const participantIds = new Set<string>();
    const interviewIds = new Set<string>();
    const brandLeadIds = new Set<string>();

    if (bundle.datasetStatus === "sealed" && bundle.sealedAt === null) {
      ctx.addIssue({
        code: "custom",
        path: ["sealedAt"],
        message: "A sealed dataset requires sealedAt",
      });
    }
    if (bundle.datasetStatus !== "sealed" && bundle.sealedAt !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["sealedAt"],
        message: "Only a sealed dataset may set sealedAt",
      });
    }
    if (
      bundle.sealedAt !== null &&
      Date.parse(bundle.sealedAt) < Date.parse(bundle.capturedAt)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["sealedAt"],
        message: "sealedAt cannot be earlier than capturedAt",
      });
    }
    if (
      bundle.datasetStatus === "template" &&
      (bundle.participants.length > 0 ||
        bundle.onlineEvents.length > 0 ||
        bundle.interviews.length > 0 ||
        (bundle.brandKitEvidence?.length ?? 0) > 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["datasetStatus"],
        message: "A template dataset cannot contain collected evidence",
      });
    }

    for (const [index, variant] of bundle.experiment.variants.entries()) {
      if (variant.currency !== bundle.economicsForecast.currency) {
        ctx.addIssue({
          code: "custom",
          path: ["experiment", "variants", index, "currency"],
          message: "All prices and economics must use the same currency",
        });
      }
    }

    for (const [index, participant] of bundle.participants.entries()) {
      if (participantIds.has(participant.identityKey)) {
        ctx.addIssue({
          code: "custom",
          path: ["participants", index, "identityKey"],
          message: `Duplicate participant identity: ${participant.identityKey}`,
        });
      }
      participantIds.add(participant.identityKey);
      if (!variantIds.has(participant.variantId)) {
        ctx.addIssue({
          code: "custom",
          path: ["participants", index, "variantId"],
          message: `Unknown experiment variant: ${participant.variantId}`,
        });
      }
    }

    for (const [index, interview] of bundle.interviews.entries()) {
      if (interviewIds.has(interview.interviewId)) {
        ctx.addIssue({
          code: "custom",
          path: ["interviews", index, "interviewId"],
          message: `Duplicate interview id: ${interview.interviewId}`,
        });
      }
      interviewIds.add(interview.interviewId);
      if (
        interview.offerSnapshotSha256 !==
        bundle.experiment.offerSnapshot.sha256
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["interviews", index, "offerSnapshotSha256"],
          message: "Interview evidence must reference the frozen offer snapshot",
        });
      }
      if (
        interview.primaryVariantId &&
        !variantIds.has(interview.primaryVariantId)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["interviews", index, "primaryVariantId"],
          message: `Unknown experiment variant: ${interview.primaryVariantId}`,
        });
      }
    }

    for (const [index, evidence] of (bundle.brandKitEvidence ?? []).entries()) {
      if (brandLeadIds.has(evidence.leadId)) {
        ctx.addIssue({
          code: "custom",
          path: ["brandKitEvidence", index, "leadId"],
          message: `Duplicate Brand Kit lead id: ${evidence.leadId}`,
        });
      }
      brandLeadIds.add(evidence.leadId);
      if (
        bundle.brandKitForecast &&
        evidence.currency !== bundle.brandKitForecast.currency
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["brandKitEvidence", index, "currency"],
          message: "Brand Kit evidence and forecast must use the same currency",
        });
      }
    }
  });

export type ProductValidationBundle = z.infer<typeof productValidationBundleSchema>;
export type ValidationOfferSnapshotArtifact = z.infer<
  typeof validationOfferSnapshotArtifactSchema
>;
export type ValidationExperiment = z.infer<typeof validationExperimentSchema>;
export type ValidationParticipant = z.infer<typeof validationParticipantSchema>;
export type ValidationOnlineEvent = z.infer<typeof validationOnlineEventSchema>;
export type ValidationInterview = z.infer<typeof validationInterviewSchema>;
