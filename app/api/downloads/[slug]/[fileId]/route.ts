import { getDownloadResponse } from "@/lib/downloads/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; fileId: string }> }
) {
  const { slug, fileId } = await params;
  return getDownloadResponse(slug, fileId);
}
