import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { appendWorkspaceRevisionSchema, hashWorkspaceSnapshot } from "@/lib/workspace";
import { getStyleBySlug } from "@/lib/styles";

type Context = { params: Promise<{ projectId: string }> };
const idSchema = z.uuid();

export async function GET(_request: Request, { params }: Context) {
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!idSchema.safeParse(projectId).success) return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const { data, error } = await client
    .from("stylekit_project_revisions")
    .select("id,revision_number,document_schema_version,content_sha256,source,parent_revision_number,change_summary,created_at")
    .eq("project_id", projectId)
    .order("revision_number", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ success: false, error: "版本历史读取失败。" }, { status: 500 });
  return NextResponse.json({ success: true, revisions: data ?? [] }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request, { params }: Context) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const body = await parseJsonBodyWithLimit<unknown>(request, { maxBytes: 512 * 1024 });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = appendWorkspaceRevisionSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "版本快照无效。" }, { status: 400 });
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!idSchema.safeParse(projectId).success) return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const value = parsed.data;
  if (value.snapshot.selectedStyleSlug && !getStyleBySlug(value.snapshot.selectedStyleSlug)) {
    return NextResponse.json({ success: false, error: "所选风格不存在或已下线。" }, { status: 400 });
  }
  const { data, error } = await client.rpc("append_stylekit_project_revision", {
    target_project_id: projectId,
    expected_revision_number: value.expectedRevisionNumber,
    revision_snapshot: value.snapshot,
    revision_schema_version: 1,
    revision_content_sha256: hashWorkspaceSnapshot(value.snapshot),
    revision_source: value.source,
    revision_change_summary: value.changeSummary,
    revision_parent_number: value.parentRevisionNumber,
  });
  if (error) {
    if (error.message?.includes("PROJECT_REVISION_CONFLICT")) {
      return NextResponse.json({ success: false, error: "项目已在其他窗口更新，请刷新后再保存。", code: "PROJECT_REVISION_CONFLICT" }, { status: 409 });
    }
    if (error.message?.includes("PROJECT_NOT_FOUND")) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
    if (error.message?.includes("PROJECT_ARCHIVED")) return NextResponse.json({ success: false, error: "已归档项目不能新增版本。" }, { status: 409 });
    if (error.message?.includes("REVISION_LIMIT_REACHED")) return NextResponse.json({ success: false, error: "该项目已达到 200 个版本上限。", code: "REVISION_LIMIT_REACHED" }, { status: 409 });
    return NextResponse.json({ success: false, error: "版本保存失败。" }, { status: 500 });
  }
  return NextResponse.json({ success: true, revision: data }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
}
