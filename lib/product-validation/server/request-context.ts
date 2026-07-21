import type { NextRequest } from "next/server";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  ASSIGNMENT_ALGORITHM_VERSION,
  BOT_RULE_VERSION,
  createAnonymousCookieValue,
  deriveExperimentIdentity,
  getActivePackExperiment,
  isInternalValidationRequest,
  isLikelyBot,
  publicExperimentContext,
  QUALIFICATION_RULE_VERSION,
  readValidationEnvironment,
  requireValidationSecret,
  VALIDATION_COOKIE_NAME,
  type ValidationSourceChannel,
} from "./experiment";

export async function resolveValidationRequestContext(
  request: NextRequest,
  sourceChannel: ValidationSourceChannel = "direct",
) {
  const cookieValue =
    request.cookies.get(VALIDATION_COOKIE_NAME)?.value ??
    createAnonymousCookieValue();
  const user = await getServerUser();
  // The first-party experiment cookie is the canonical participant key for
  // the 30-day window. Authentication verifies authoritative intent, but does
  // not replace the key after exposure and qualification have already been
  // recorded, which would otherwise split one person into two participants.
  const identity = deriveExperimentIdentity({
    secret: requireValidationSecret(),
    authenticatedUserId: null,
    anonymousCookie: cookieValue,
  });
  const experiment = getActivePackExperiment();
  const publicContext = publicExperimentContext(identity);
  const environment = readValidationEnvironment();
  const isInternal = isInternalValidationRequest(request);

  return {
    cookieValue,
    shouldSetCookie: !request.cookies.has(VALIDATION_COOKIE_NAME),
    user,
    identity,
    experiment,
    publicContext,
    participant: {
      experimentId: experiment.experimentId,
      offerVersion: experiment.offerVersion,
      variantId: publicContext.variantId,
      identity,
      assignedAt: new Date().toISOString(),
      sourceChannel,
      environment,
      isBot: isLikelyBot(request.headers.get("user-agent")),
      isInternal,
      isTest: environment === "test" || isInternal,
      qualificationRuleVersion: QUALIFICATION_RULE_VERSION,
      botRuleVersion: BOT_RULE_VERSION,
      assignmentAlgorithmVersion: ASSIGNMENT_ALGORITHM_VERSION,
    },
  };
}
