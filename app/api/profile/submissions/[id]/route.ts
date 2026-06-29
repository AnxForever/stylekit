import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const submissionIdSchema = z.string().uuid();
const MAX_BODY_BYTES = 32 * 1024;

const updateSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    nameEn: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().min(1).max(500).optional(),
  })
  .refine(
    (value) =>
      typeof value.name === "string" ||
      typeof value.nameEn === "string" ||
      typeof value.description === "string",
    {
      message: "No editable fields provided",
      path: ["name"],
    }
  );

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface SubmissionOwnerRow {
  id: string;
  status: "pending" | "approved" | "rejected";
  user_id: string | null;
  form_data: Record<string, unknown>;
}

interface SupabaseLike {
  from: (tableName: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => Promise<{ data: unknown; error: DbErrorLike | null }>;
      };
    };
    update: (payload: Record<string, unknown>) => {
      eq: (column: string, value: string) => Promise<{ error: DbErrorLike | null }>;
    };
    delete: () => {
      eq: (column: string, value: string) => Promise<{ error: DbErrorLike | null }>;
    };
  };
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
  return asString(value)?.toLowerCase() ?? null;
}

function getCurrentUserHandles(user: {
  user_metadata?: Record<string, unknown> | null;
  email?: string | null;
}): Set<string> {
  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const handles = new Set<string>();

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

function normalizeSubmissionRow(row: unknown): SubmissionOwnerRow | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }

  const record = row as Record<string, unknown>;
  const id = asString(record.id);
  const status = asString(record.status);
  if (!id || !status) {
    return null;
  }

  if (status !== "pending" && status !== "approved" && status !== "rejected") {
    return null;
  }

  return {
    id,
    status,
    user_id: asString(record.user_id),
    form_data: asRecord(record.form_data),
  };
}

function getSubmissionOwnerId(row: SubmissionOwnerRow): string | null {
  if (row.user_id) {
    return row.user_id;
  }

  const author = asRecord(row.form_data.__author);
  return asString(author.userId);
}

function canMutateSubmission(
  row: SubmissionOwnerRow,
  user: {
    id: string;
    user_metadata?: Record<string, unknown> | null;
    app_metadata?: Record<string, unknown> | null;
    email?: string | null;
  }
): boolean {
  const ownerId = getSubmissionOwnerId(row);
  if (ownerId && ownerId === user.id) {
    return true;
  }

  const userHandles = getCurrentUserHandles({
    user_metadata: user.user_metadata ?? null,
    email: user.email ?? null,
  });
  if (userHandles.size === 0) {
    return false;
  }

  const author = asRecord(row.form_data.__author);
  const authorHandle =
    normalizeHandle(asString(author.handle)) ??
    normalizeHandle(asString(row.form_data.authorName));
  if (!authorHandle || !userHandles.has(authorHandle)) {
    return false;
  }

  const authorProvider = normalizeProvider(author.provider);
  const userProvider = normalizeProvider(
    (user.user_metadata ?? {})["provider"] ?? (user.app_metadata ?? {})["provider"]
  );
  if (!authorProvider || !userProvider) {
    return true;
  }

  return authorProvider === userProvider;
}

function patchSubmissionFormData(
  formData: Record<string, unknown>,
  updates: z.infer<typeof updateSchema>
): Record<string, unknown> {
  const next = { ...formData };

  if (typeof updates.name === "string") {
    next.name = updates.name.trim();
  }
  if (typeof updates.nameEn === "string") {
    next.nameEn = updates.nameEn.trim();
  }
  if (typeof updates.description === "string") {
    next.description = updates.description.trim();
  }

  const existingDesignStyle = asRecord(next.designStyle);
  next.designStyle = {
    ...existingDesignStyle,
    ...(typeof updates.name === "string"
      ? { name: updates.name.trim() }
      : {}),
    ...(typeof updates.nameEn === "string"
      ? { nameEn: updates.nameEn.trim() }
      : {}),
    ...(typeof updates.description === "string"
      ? { description: updates.description.trim() }
      : {}),
  };

  return next;
}

function parseSubmissionId(
  value: string
): { ok: true; id: string } | { ok: false; response: NextResponse } {
  const parsed = submissionIdSchema.safeParse(value);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: "Invalid submission id" },
        { status: 400 }
      ),
    };
  }

  return { ok: true, id: parsed.data };
}

async function createServiceClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  ) as unknown as SupabaseLike;
}

async function loadSubmission(
  sb: SupabaseLike,
  submissionId: string
): Promise<{ row: SubmissionOwnerRow | null; error: DbErrorLike | null }> {
  const result = await sb
    .from("submissions")
    .select("id, status, user_id, form_data")
    .eq("id", submissionId)
    .maybeSingle();

  if (result.error) {
    return { row: null, error: result.error as DbErrorLike };
  }

  return { row: normalizeSubmissionRow(result.data), error: null };
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const idResult = parseSubmissionId((await context.params).id);
  if (!idResult.ok) {
    return idResult.response;
  }

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Submissions require database configuration" },
      { status: 503 }
    );
  }

  const bodyResult = await parseJsonBodyWithLimit(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Submission payload is too large.",
    invalidJsonMessage: "Invalid request body",
  });
  if (!bodyResult.ok) {
    return NextResponse.json(
      { success: false, error: bodyResult.error },
      { status: bodyResult.status }
    );
  }

  const payload = updateSchema.safeParse(bodyResult.data);
  if (!payload.success) {
    return NextResponse.json(
      { success: false, error: "Invalid submission update payload" },
      { status: 400 }
    );
  }

  const sb = await createServiceClient();
  const loaded = await loadSubmission(sb, idResult.id);
  if (loaded.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load submission" },
      { status: 500 }
    );
  }

  if (!loaded.row) {
    return NextResponse.json(
      { success: false, error: "Submission not found" },
      { status: 404 }
    );
  }

  if (!canMutateSubmission(loaded.row, user)) {
    return NextResponse.json(
      { success: false, error: "You can only edit your own submissions" },
      { status: 403 }
    );
  }

  const nextFormData = patchSubmissionFormData(loaded.row.form_data, payload.data);
  const { error: updateError } = await sb
    .from("submissions")
    .update({ form_data: nextFormData })
    .eq("id", idResult.id);

  if (updateError) {
    return NextResponse.json(
      { success: false, error: "Failed to update submission" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const idResult = parseSubmissionId((await context.params).id);
  if (!idResult.ok) {
    return idResult.response;
  }

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Submissions require database configuration" },
      { status: 503 }
    );
  }

  const sb = await createServiceClient();
  const loaded = await loadSubmission(sb, idResult.id);
  if (loaded.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load submission" },
      { status: 500 }
    );
  }

  if (!loaded.row) {
    return NextResponse.json(
      { success: false, error: "Submission not found" },
      { status: 404 }
    );
  }

  if (!canMutateSubmission(loaded.row, user)) {
    return NextResponse.json(
      { success: false, error: "You can only delete your own submissions" },
      { status: 403 }
    );
  }

  const { error: deleteError } = await sb
    .from("submissions")
    .delete()
    .eq("id", idResult.id);

  if (deleteError) {
    return NextResponse.json(
      { success: false, error: "Failed to delete submission" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
