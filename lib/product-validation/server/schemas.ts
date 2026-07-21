import { z } from "zod";

export const validationSourceChannelSchema = z.enum([
  "direct",
  "email",
  "community",
  "social",
  "referral",
  "paid",
  "interview",
]);

export const validationSessionRequestSchema = z
  .object({
    sourceChannel: validationSourceChannelSchema.default("direct"),
    landingPath: z.string().startsWith("/").max(512).default("/validation/corporate-clean-saas"),
    utmSource: z.string().trim().max(160).nullable().default(null),
    utmMedium: z.string().trim().max(160).nullable().default(null),
    utmCampaign: z.string().trim().max(160).nullable().default(null),
  })
  .strict();

export const validationQualificationRequestSchema = z
  .object({
    productionProjectWithin90Days: z.boolean(),
    buildsB2bSaasOrProductionWeb: z.boolean(),
    usesReactOrNext: z.boolean(),
    usesTailwind: z.boolean(),
    usesShadcn: z.boolean(),
    usedAiCodingForRealFrontend: z.boolean(),
    influencesPurchaseDecision: z.boolean(),
    researchConsent: z.literal(true),
  })
  .strict();

export const validationExposureRequestSchema = z
  .object({
    eventId: z
      .string()
      .min(12)
      .max(160)
      .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/),
    type: z.enum(["pack_offer_view", "pack_price_view"]),
    visibilityMs: z.number().int().positive().max(60 * 60 * 1000),
    visibleRatioBps: z.number().int().min(1).max(10_000),
  })
  .strict();

export const validationIntentRequestSchema = z
  .object({
    eventId: z
      .string()
      .min(12)
      .max(160)
      .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/),
    acceptsDisplayedPrice: z.literal(true),
    acceptsLicenseAndUpdateScope: z.literal(true),
    acceptsRefundAndDeliveryTerms: z.literal(true),
    termsVersion: z.string().min(1).max(160),
  })
  .strict();

export const validationWithdrawRequestSchema = z
  .object({
    confirmDeletion: z.literal(true),
  })
  .strict();

export function isQualifiedIcp(
  answers: z.infer<typeof validationQualificationRequestSchema>,
): boolean {
  return (
    answers.productionProjectWithin90Days &&
    answers.buildsB2bSaasOrProductionWeb &&
    answers.usesReactOrNext &&
    answers.usesTailwind &&
    answers.usesShadcn &&
    answers.usedAiCodingForRealFrontend &&
    answers.influencesPurchaseDecision
  );
}

export type ValidationQualificationAnswers = z.infer<
  typeof validationQualificationRequestSchema
>;
