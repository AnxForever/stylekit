import { NextResponse } from "next/server";
import { readFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");

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
