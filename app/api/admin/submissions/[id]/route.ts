import { NextResponse } from "next/server";
import { readFile, unlink, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { z } from "zod";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import {
  deleteSubmissionSupabase,
  getSubmissionSupabase,
  isSupabaseConfigured,
  updateSubmissionFormDataSupabase,
} from "@/lib/submit/reviewer-supabase";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");
const MAX_BODY_BYTES = 32 * 1024;
const adminUpdateSchema = z
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

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function patchSubmissionFormData(
  formData: Record<string, unknown>,
  updates: z.infer<typeof adminUpdateSchema>
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
    ...(typeof updates.name === "string" ? { name: updates.name.trim() } : {}),
    ...(typeof updates.nameEn === "string" ? { nameEn: updates.nameEn.trim() } : {}),
    ...(typeof updates.description === "string"
      ? { description: updates.description.trim() }
      : {}),
  };

  return next;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await checkAdminApiAccess(_request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { id } = await params;

  if (!isValidSubmissionId(id)) {
    return NextResponse.json(
      { error: "Invalid submission ID" },
      { status: 400 }
    );
  }

  if (isSupabaseConfigured()) {
    const submission = await getSubmissionSupabase(id);
    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  }

  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  try {
    const content = await readFile(filePath, "utf-8");
    const submission = JSON.parse(content);
    return NextResponse.json(submission);
  } catch {
    return NextResponse.json(
      { error: "Failed to read submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const originCheck = verifyTrustedOrigin(_request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error ?? "Cross-origin request denied." },
      { status: originCheck.status ?? 403 }
    );
  }

  const access = await checkAdminApiAccess(_request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { id } = await params;

  if (!isValidSubmissionId(id)) {
    return NextResponse.json(
      { error: "Invalid submission ID" },
      { status: 400 }
    );
  }

  if (isSupabaseConfigured()) {
    const deleted = await deleteSubmissionSupabase(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, id });
  }

  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  try {
    await unlink(filePath);
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error ?? "Cross-origin request denied." },
      { status: originCheck.status ?? 403 }
    );
  }

  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { id } = await params;

  if (!isValidSubmissionId(id)) {
    return NextResponse.json(
      { error: "Invalid submission ID" },
      { status: 400 }
    );
  }

  const bodyResult = await parseJsonBodyWithLimit(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Submission payload is too large.",
    invalidJsonMessage: "Invalid request body",
  });
  if (!bodyResult.ok) {
    return NextResponse.json(
      { error: bodyResult.error },
      { status: bodyResult.status }
    );
  }

  const payload = adminUpdateSchema.safeParse(bodyResult.data);
  if (!payload.success) {
    return NextResponse.json(
      { error: "Invalid submission update payload" },
      { status: 400 }
    );
  }

  if (isSupabaseConfigured()) {
    const submission = await getSubmissionSupabase(id);
    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    const nextFormData = patchSubmissionFormData(
      asRecord(submission.formData),
      payload.data
    );
    const updated = await updateSubmissionFormDataSupabase(id, nextFormData);
    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, submission: updated });
  }

  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "Submission not found" },
      { status: 404 }
    );
  }

  try {
    const content = await readFile(filePath, "utf-8");
    const record = JSON.parse(content) as Record<string, unknown>;
    const nextFormData = patchSubmissionFormData(
      asRecord(record.formData),
      payload.data
    );
    const nextDesignStyle = {
      ...asRecord(record.designStyle),
      ...(typeof payload.data.name === "string"
        ? { name: payload.data.name.trim() }
        : {}),
      ...(typeof payload.data.nameEn === "string"
        ? { nameEn: payload.data.nameEn.trim() }
        : {}),
      ...(typeof payload.data.description === "string"
        ? { description: payload.data.description.trim() }
        : {}),
    };

    const nextRecord = {
      ...record,
      formData: nextFormData,
      designStyle: nextDesignStyle,
    };
    await writeFile(filePath, JSON.stringify(nextRecord, null, 2), "utf-8");

    return NextResponse.json({ success: true, submission: nextRecord });
  } catch {
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
