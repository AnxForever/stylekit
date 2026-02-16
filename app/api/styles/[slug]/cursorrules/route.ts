import { NextResponse } from "next/server";
import { generateCursorRules } from "@/lib/export/ide-configs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const content = generateCursorRules(slug);

  if (!content) {
    return NextResponse.json(
      { error: "Style not found" },
      { status: 404 }
    );
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename=".cursorrules"',
    },
  });
}
