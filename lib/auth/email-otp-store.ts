import { getSupabaseAdmin } from "@/lib/supabase/server";

export type OtpChallengeResult =
  | "valid"
  | "invalid"
  | "attempts"
  | "expired"
  | "missing";

interface CreateOtpChallengeInput {
  id: string;
  email: string;
  digest: string;
  expiresAt: number;
}

/**
 * Persists the OTP challenge in shared storage. The signed cookie is only a
 * lookup token; it is never the source of truth for attempts or consumption.
 */
export async function createOtpChallengeState(
  input: CreateOtpChallengeInput,
): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    throw new Error("Supabase is required for email OTP challenges");
  }

  const { error } = await admin.from("email_otp_challenges").insert({
    id: input.id,
    email: input.email,
    digest: input.digest,
    expires_at: new Date(input.expiresAt).toISOString(),
  });

  if (error) throw error;
}

/**
 * Atomically consumes a valid challenge or increments its failed-attempt
 * counter. The database function uses row locking so this remains correct
 * across restarts and multiple application instances.
 */
export async function consumeOtpChallengeState(input: {
  id: string;
  email: string;
  digest: string;
  maxAttempts: number;
}): Promise<OtpChallengeResult> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    throw new Error("Supabase is required for email OTP challenges");
  }

  const { data, error } = await admin.rpc("consume_email_otp_challenge", {
    p_challenge_id: input.id,
    p_email: input.email,
    p_digest: input.digest,
    p_max_attempts: input.maxAttempts,
  });

  if (error) throw error;

  switch (data) {
    case "valid":
    case "invalid":
    case "attempts":
    case "expired":
    case "missing":
      return data;
    default:
      throw new Error("Unexpected email OTP challenge result");
  }
}
