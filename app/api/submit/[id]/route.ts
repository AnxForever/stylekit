import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || /[/\\]/.test(id)) {
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
