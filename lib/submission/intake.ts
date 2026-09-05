/**
 * Shared intake concerns for the submission API routes.
 *
 * Lives here rather than in a route file so `/api/submit` and
 * `/api/submit/validate` can share it without importing one route module from
 * another.
 */

import {
  hasActiveSubmissionSlugSupabase,
  isSupabaseConfigured,
} from "@/lib/submit/reviewer-supabase";
import { hasActiveSubmissionSlug } from "@/lib/submit/reviewer";

/** A manifest carries six component snippets plus a full cover SVG. */
export const MAX_MANIFEST_BYTES = 512 * 1024;

/**
 * Checks whether a slug is already claimed by a submission in flight.
 *
 * Returns false when the lookup itself fails. The slug gate would otherwise
 * block every submission whenever the database hiccups, and a genuine duplicate
 * is still caught by the unique constraints at insert time.
 */
export async function isSlugTaken(manifest: unknown): Promise<boolean> {
  return isSlugTakenBySlug(readManifestSlug(manifest));
}

/**
 * Whether a bare slug is already claimed by a submission in flight.
 *
 * Split out so the slug-availability endpoint can ask about a slug the
 * contributor is still typing, before a full manifest exists. Returns false on
 * an empty slug or a lookup failure, for the same reason as above.
 */
export async function isSlugTakenBySlug(slug: string): Promise<boolean> {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return false;

  try {
    return isSupabaseConfigured()
      ? await hasActiveSubmissionSlugSupabase(normalized)
      : await hasActiveSubmissionSlug(normalized);
  } catch {
    return false;
  }
}

/** Reads formData.slug out of an unvalidated payload. */
export function readManifestSlug(manifest: unknown): string {
  if (!manifest || typeof manifest !== "object") return "";
  const form = (manifest as Record<string, unknown>).formData;
  if (!form || typeof form !== "object") return "";
  const slug = (form as Record<string, unknown>).slug;
  return typeof slug === "string" ? slug.trim().toLowerCase() : "";
}
