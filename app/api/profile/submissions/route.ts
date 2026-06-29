import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface ProfileSubmission {
  id: string;
  slug: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  user_id?: string | null;
  name: string | null;
  name_en: string | null;
  description: string | null;
  form_data?: unknown;
}

function isMissingUserIdColumnError(error: DbErrorLike | null | undefined): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }

  const message = `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
  return message.includes("user_id");
}

function mergeSubmissions(
  modernSubmissions: ProfileSubmission[] | null,
  fallbackSubmissions: ProfileSubmission[] | null
): ProfileSubmission[] {
  const seen = new Set<string>();
  const merged: ProfileSubmission[] = [];

  for (const item of [...(modernSubmissions ?? []), ...(fallbackSubmissions ?? [])]) {
    if (!item?.id || seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    merged.push(item);
  }

  merged.sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
  return merged.slice(0, 50).map(mapSubmissionRow);
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeHandle(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const normalized = value.trim().replace(/^@+/, "").toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

function normalizeProvider(value: unknown): string | null {
  const provider = asString(value)?.toLowerCase() ?? null;
  return provider;
}

function getCurrentUserHandles(user: {
  user_metadata?: Record<string, unknown> | null;
  email?: string | null;
}): Set<string> {
  const handles = new Set<string>();
  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;

  const candidates = [
    asString(metadata.user_name),
    asString(metadata.preferred_username),
    asString(metadata.name),
    asString(metadata.full_name),
  ];
  for (const candidate of candidates) {
    const normalized = normalizeHandle(candidate);
    if (normalized) {
      handles.add(normalized);
    }
  }

  const emailPrefix = asString(user.email)?.split("@")[0] ?? null;
  const normalizedEmailPrefix = normalizeHandle(emailPrefix);
  if (normalizedEmailPrefix) {
    handles.add(normalizedEmailPrefix);
  }

  return handles;
}

function matchesSubmissionOwnerByIdentity(
  submission: ProfileSubmission,
  userId: string,
  userHandles: Set<string>,
  userProvider: string | null
): boolean {
  if (submission.user_id && submission.user_id === userId) {
    return true;
  }

  const formData = asRecord(submission.form_data);
  const author = asRecord(formData.__author);
  const authorUserId = asString(author.userId);
  if (authorUserId && authorUserId === userId) {
    return true;
  }

  if (userHandles.size === 0) {
    return false;
  }

  const authorHandle =
    normalizeHandle(asString(author.handle)) ??
    normalizeHandle(asString(formData.authorName));
  if (!authorHandle || !userHandles.has(authorHandle)) {
    return false;
  }

  const authorProvider = normalizeProvider(author.provider);
  if (!authorProvider || !userProvider) {
    return true;
  }
  return authorProvider === userProvider;
}

function mapSubmissionRow(row: ProfileSubmission): ProfileSubmission {
  const formData = asRecord(row.form_data);
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    submitted_at: row.submitted_at,
    name: row.name ?? asString(formData.name),
    name_en: row.name_en ?? asString(formData.nameEn),
    description: row.description ?? asString(formData.description),
  };
}

export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, submissions: [] });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const modernResult = await sb
    .from("submissions")
    .select("id, slug, status, submitted_at, user_id, form_data")
    .eq("user_id", user.id)
    .order("submitted_at", { ascending: false })
    .limit(50);

  if (modernResult.error && !isMissingUserIdColumnError(modernResult.error as DbErrorLike)) {
    return NextResponse.json(
      { success: false, error: "Failed to load submissions" },
      { status: 500 }
    );
  }

  const fallbackResult = await sb
    .from("submissions")
    .select("id, slug, status, submitted_at, form_data")
    .order("submitted_at", { ascending: false })
    .limit(300);

  if (fallbackResult.error && modernResult.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load submissions" },
      { status: 500 }
    );
  }

  const userHandles = getCurrentUserHandles({
    user_metadata: (user.user_metadata as Record<string, unknown> | null) ?? null,
    email: user.email ?? null,
  });
  const userProvider = normalizeProvider(
    (user.user_metadata as Record<string, unknown> | null)?.provider ??
      (user.app_metadata as Record<string, unknown> | null)?.provider
  );

  const submissions = mergeSubmissions(
    modernResult.error ? [] : ((modernResult.data ?? []) as ProfileSubmission[]),
    fallbackResult.error
      ? []
      : ((fallbackResult.data ?? []) as ProfileSubmission[]).filter((item) =>
          matchesSubmissionOwnerByIdentity(item, user.id, userHandles, userProvider)
        )
  );

  return NextResponse.json({ success: true, submissions });
}
