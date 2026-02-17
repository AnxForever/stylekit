import { NextResponse } from "next/server";
import { approveSubmission, rejectSubmission } from "@/lib/submit/reviewer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, note } = body as { action?: string; note?: string };

    if (action === "approve") {
      const result = await approveSubmission(id, note);
      if (!result) {
        return NextResponse.json(
          { success: false, error: "Submission not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, submission: result });
    }

    if (action === "reject") {
      const result = await rejectSubmission(id, note);
      if (!result) {
        return NextResponse.json(
          { success: false, error: "Submission not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, submission: result });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Use 'approve' or 'reject'" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
