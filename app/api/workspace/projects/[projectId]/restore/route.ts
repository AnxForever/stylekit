import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const restoreSchema = z.object({
  revisionNumber: z.number().int().positive(),
  expectedRevisionNumber: z.number().int().min(0),
}).strict();

export async function POST(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const body = await parseJsonBodyWithLimit<unknown>(request, { maxBytes: 2048 });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = restoreSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "恢复参数无效。" }, { status: 400 });
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(projectId).success) return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const { data: source, error: sourceError } = await client
    .from("stylekit_project_revisions")
    .select("snapshot,document_schema_version,content_sha256,revision_number")
    .eq("project_id", projectId)
    .eq("revision_number", parsed.data.revisionNumber)
    .maybeSingle();
  if (sourceError) return NextResponse.json({ success: false, error: "历史版本读取失败。" }, { status: 500 });
  if (!source) return NextResponse.json({ success: false, error: "历史版本不存在。" }, { status: 404 });
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ success: false, error: "项目恢复存储尚未配置。" }, { status: 503 });
  const { data, error } = await admin.rpc("append_stylekit_project_revision", {
    target_project_id: projectId,
    expected_revision_number: parsed.data.expectedRevisionNumber,
    revision_snapshot: source.snapshot,
    revision_schema_version: source.document_schema_version,
    revision_content_sha256: source.content_sha256,
    revision_source: "restore",
    revision_change_summary: `恢复自 v${source.revision_number}`,
    revision_parent_number: source.revision_number,
    target_owner_id: user.id,
  });
  if (error?.message?.includes("PROJECT_REVISION_CONFLICT")) {
    return NextResponse.json({ success: false, error: "项目已在其他窗口更新，请刷新后再恢复。", code: "PROJECT_REVISION_CONFLICT" }, { status: 409 });
  }
  if (error?.message?.includes("REVISION_LIMIT_REACHED")) return NextResponse.json({ success: false, error: "该项目已达到 200 个版本上限。", code: "REVISION_LIMIT_REACHED" }, { status: 409 });
  if (error) return NextResponse.json({ success: false, error: "版本恢复失败。" }, { status: 500 });
  return NextResponse.json({ success: true, revision: data }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
}
