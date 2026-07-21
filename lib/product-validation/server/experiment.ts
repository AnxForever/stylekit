import { createHmac, randomBytes } from "node:crypto";
import validationBaseline from "@/docs/examples/product-validation-empty.json";
import offerSnapshot from "@/docs/examples/corporate-clean-saas-offer-v2.json";
import { productValidationBundleSchema } from "@/lib/product-validation/schema";
import { validationOfferSnapshotArtifactSchema } from "@/lib/product-validation/schema";

export const VALIDATION_COOKIE_NAME = "stylekit_pack_validation";
export const VALIDATION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const QUALIFICATION_RULE_VERSION = "qualified-visitor-v1";
export const BOT_RULE_VERSION = "bot-exclusion-v1";
export const ASSIGNMENT_ALGORITHM_VERSION = "sticky-price-assignment-v1";
export const TERMS_VERSION = "cc-saas-preorder-terms-v1";

export type ValidationEnvironment = "production" | "preview" | "development" | "test";
export type ValidationSourceChannel =
  | "direct"
  | "email"
  | "community"
  | "social"
  | "referral"
  | "paid"
  | "interview";

export type ExperimentIdentity = {
  identityKey: string;
  identityConfidence: "authenticated_account" | "anonymous";
};

const baseline = productValidationBundleSchema.parse(validationBaseline);
const offer = validationOfferSnapshotArtifactSchema.parse(offerSnapshot);

export function getActivePackExperiment() {
  return baseline.experiment;
}

export function getValidationDatasetTemplate() {
  return baseline;
}

export function getActiveOfferSnapshot() {
  return offer;
}

export function canCollectVerifiedPriceIntent(): boolean {
  return (
    offer.pack.publicSaleAuthorized &&
    offer.commercialTerms.licenseReviewStatus !== "draft_requires_final_review"
  );
}

export function createAnonymousCookieValue(): string {
  return randomBytes(32).toString("base64url");
}

export function requireValidationSecret(): string {
  const secret = process.env.PRODUCT_VALIDATION_HMAC_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error("PRODUCT_VALIDATION_HMAC_SECRET must contain at least 32 characters");
  }
  return secret;
}

function digest(secret: string, namespace: string, value: string): Buffer {
  return createHmac("sha256", secret)
    .update(`${namespace}\0${value}`, "utf8")
    .digest();
}

export function deriveExperimentIdentity(input: {
  secret: string;
  authenticatedUserId?: string | null;
  anonymousCookie: string;
}): ExperimentIdentity {
  if (input.authenticatedUserId) {
    return {
      identityKey: `hmac:${digest(input.secret, "authenticated-account", input.authenticatedUserId).toString("hex")}`,
      identityConfidence: "authenticated_account",
    };
  }

  return {
    identityKey: `anon:${digest(input.secret, "anonymous-cookie", input.anonymousCookie).toString("base64url")}`,
    identityConfidence: "anonymous",
  };
}

export function assignExperimentVariant(identityKey: string) {
  const experiment = getActivePackExperiment();
  const bucket = digest(
    experiment.experimentId,
    ASSIGNMENT_ALGORITHM_VERSION,
    identityKey,
  ).readUInt32BE(0);
  return experiment.variants[bucket % experiment.variants.length];
}

export function readValidationEnvironment(): ValidationEnvironment {
  if (process.env.NODE_ENV === "test") return "test";
  if (process.env.VERCEL_ENV === "preview") return "preview";
  if (process.env.NODE_ENV === "development") return "development";
  return "production";
}

export function isLikelyBot(userAgent: string | null): boolean {
  return /(bot|crawler|spider|preview|headless|lighthouse|pagespeed|curl|wget)/i.test(
    userAgent ?? "",
  );
}

export function isInternalValidationRequest(request: Request): boolean {
  const marker = request.headers.get("x-stylekit-validation-internal");
  return marker === "1" && process.env.PRODUCT_VALIDATION_INTERNAL_KEY
    ? request.headers.get("x-stylekit-validation-key") ===
        process.env.PRODUCT_VALIDATION_INTERNAL_KEY
    : false;
}

export function publicExperimentContext(identity: ExperimentIdentity) {
  const experiment = getActivePackExperiment();
  const variant = assignExperimentVariant(identity.identityKey);
  return {
    experimentId: experiment.experimentId,
    offerVersion: experiment.offerVersion,
    packId: experiment.packId,
    packVersion: experiment.packVersion,
    variantId: variant.id,
    currency: variant.currency,
    amountMinor: variant.amountMinor,
    minimumVisibilityMs: experiment.thresholds.minimumVisibilityMs,
    minimumVisibleRatioBps: experiment.thresholds.minimumVisibleRatioBps,
    termsVersion: TERMS_VERSION,
  } as const;
}

export function getExperimentLifecycle(now = new Date()): "planned" | "collecting" | "ended" {
  const experiment = getActivePackExperiment();
  const timestamp = now.getTime();
  if (timestamp < Date.parse(experiment.window.start)) return "planned";
  if (timestamp > Date.parse(experiment.window.end)) return "ended";
  return "collecting";
}
