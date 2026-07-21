import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { updateWorkspaceProjectSchema } from "@/lib/workspace";

const projectIdSchema = z.uuid();
type Context = { params: Promise<{ projectId: string }> };

async function context(params: Context["params"]) {
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!projectIdSchema.safeParse(projectId).success) return { response: NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 }) };
  if (!user) return { response: NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 }) };
  if (!client) return { response: NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 }) };
  return { projectId, user, client };
}

export async function GET(_request: Request, { params }: Context) {
  const resolved = await context(params);
  if ("response" in resolved) return resolved.response;
  const { data, error } = await resolved.client
    .from("stylekit_projects")
    .select("id,name,description,project_type,stack,brief,selected_style_slug,status,current_revision_number,created_at,updated_at")
    .eq("id", resolved.projectId)
    .maybeSingle();
  if (error) return NextResponse.json({ success: false, error: "项目读取失败。" }, { status: 500 });
  if (!data) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
  return NextResponse.json({ success: true, project: data }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function PATCH(request: Request, { params }: Context) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const body = await parseJsonBodyWithLimit<unknown>(request, { maxBytes: 16 * 1024 });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = updateWorkspaceProjectSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "项目更新内容无效。" }, { status: 400 });
  const resolved = await context(params);
  if ("response" in resolved) return resolved.response;
  const input = parsed.data;
  const { data, error } = await resolved.client.rpc("update_stylekit_project", {
    target_project_id: resolved.projectId,
    project_patch: input,
  });
  if (error?.message?.includes("PROJECT_LIMIT_REACHED")) {
    return NextResponse.json({ success: false, error: "活跃项目已达到 50 个上限，请先归档或删除不再使用的项目。", code: "PROJECT_LIMIT_REACHED" }, { status: 409 });
  }
  if (error?.message?.includes("PROJECT_NOT_FOUND")) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
  if (error) return NextResponse.json({ success: false, error: "项目更新失败。" }, { status: 500 });
  if (!data) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
  return NextResponse.json({ success: true, project: data }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function DELETE(request: Request, { params }: Context) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const resolved = await context(params);
  if ("response" in resolved) return resolved.response;
  const { data, error } = await resolved.client.rpc("delete_stylekit_project", {
    target_project_id: resolved.projectId,
  });
  if (error) return NextResponse.json({ success: false, error: "项目删除失败。" }, { status: 500 });
  if (!data) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
  return NextResponse.json({ success: true }, { headers: { "Cache-Control": "private, no-store" } });
}
