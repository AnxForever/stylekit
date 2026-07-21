import { NextResponse } from "next/server";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { createWorkspaceProjectSchema, hashWorkspaceSnapshot } from "@/lib/workspace";
import { getStyleBySlug } from "@/lib/styles";

export async function GET() {
  const [user, client] = await Promise.all([getServerUser(), getAuthServerClient()]);
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const { data, error } = await client
    .from("stylekit_projects")
    .select("id,name,description,project_type,stack,brief,selected_style_slug,status,current_revision_number,created_at,updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ success: false, error: "项目列表读取失败。" }, { status: 500 });
  return NextResponse.json({ success: true, projects: data ?? [] }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const body = await parseJsonBodyWithLimit<unknown>(request, { maxBytes: 16 * 1024 });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = createWorkspaceProjectSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "项目资料不完整或超出限制。" }, { status: 400 });
  const [user, client] = await Promise.all([getServerUser(), getAuthServerClient()]);
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const input = parsed.data;
  if (input.selectedStyleSlug && !getStyleBySlug(input.selectedStyleSlug)) {
    return NextResponse.json({ success: false, error: "所选风格不存在或已下线。" }, { status: 400 });
  }
  const snapshot = { ...input, status: "active" as const };
  const { data: created, error: createError } = await client.rpc("create_stylekit_project", {
    project_snapshot: snapshot,
    revision_schema_version: 1,
    revision_content_sha256: hashWorkspaceSnapshot(snapshot),
  });
  if (createError?.message?.includes("PROJECT_LIMIT_REACHED")) {
    return NextResponse.json({ success: false, error: "活跃项目已达到 50 个上限，请先归档或删除不再使用的项目。", code: "PROJECT_LIMIT_REACHED" }, { status: 409 });
  }
  if (createError) return NextResponse.json({ success: false, error: "项目与初始版本创建失败。" }, { status: 500 });
  const projectId = (created as { projectId?: unknown } | null)?.projectId;
  if (typeof projectId !== "string") return NextResponse.json({ success: false, error: "项目创建结果无效。" }, { status: 500 });
  const { data, error } = await client
    .from("stylekit_projects")
    .select("id,name,description,project_type,stack,brief,selected_style_slug,status,current_revision_number,created_at,updated_at")
    .eq("id", projectId)
    .maybeSingle();
  if (error || !data) return NextResponse.json({ success: false, error: "项目创建后读取失败。" }, { status: 500 });
  return NextResponse.json({ success: true, project: data }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
}
