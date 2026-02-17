import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/submit/reviewer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("status") as
    | "pending"
    | "approved"
    | "rejected"
    | null;

  const submissions = await listSubmissions(filter ?? undefined);

  return NextResponse.json({
    submissions,
    total: submissions.length,
  });
}
