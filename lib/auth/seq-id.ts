/**
 * Sequential user ID assignment backed by Supabase/Postgres.
 *
 * Requires migration that creates:
 * - public.user_seq_ids table
 * - public.assign_user_seq_id(uuid) RPC function
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SeqRow = { seq_id: unknown };

let adminClient: SupabaseClient | null = null;

function getAdminClient(): SupabaseClient {
  if (adminClient) return adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service role credentials are required");
  }

  adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return adminClient;
}

function normalizeSeqId(value: unknown): number {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  throw new Error("Invalid seq_id value returned from database");
}

async function assignViaRpc(client: SupabaseClient, userId: string): Promise<number> {
  const { data, error } = await client.rpc("assign_user_seq_id", {
    p_user_id: userId,
  });

  if (error) {
    throw error;
  }

  return normalizeSeqId(data);
}

async function assignViaUpsert(
  client: SupabaseClient,
  userId: string,
): Promise<number> {
  const { data, error } = await client
    .from("user_seq_ids")
    .upsert({ user_id: userId }, { onConflict: "user_id" })
    .select("seq_id")
    .single();

  if (error) {
    throw error;
  }

  return normalizeSeqId((data as SeqRow | null)?.seq_id);
}

/**
 * Return a stable sequential ID for a Supabase user UUID.
 *
 * This is safe under concurrent requests when the DB migration is applied.
 */
export async function getOrAssignSeqId(userId: string): Promise<number> {
  const client = getAdminClient();

  try {
    return await assignViaRpc(client, userId);
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
      )
      ? (error as { message: string }).message
      : String(error);
    const isMissingRpc =
      message.includes("assign_user_seq_id") ||
      message.includes("Could not find the function");

    if (!isMissingRpc) {
      throw error;
    }

    return assignViaUpsert(client, userId);
  }
}
