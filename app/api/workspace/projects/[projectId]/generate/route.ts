import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  createWorkspaceProjectSchema,
  generateWorkspaceProject,
  hashWorkspaceSnapshot,
  WorkspaceGenerationError,
} from "@/lib/workspace";

const requestSchema = z.object({
  expectedRevisionNumber: z.number().int().min(0),
  target: z.enum(["nextjs", "react", "html"]),
}).strict();

export async function POST(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const body = await parseJsonBodyWithLimit<unknown>(request, { maxBytes: 2048 });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = requestSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "生成参数无效。" }, { status: 400 });
  if (parsed.data.target !== "nextjs") {
    return NextResponse.json({ success: false, error: "当前只开放已完成干净安装与生产构建验证的 Next.js 目标。", code: "UNSUPPORTED_CAPABILITY" }, { status: 422 });
  }
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(projectId).success) return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const rateLimit = checkRateLimit({ namespace: "workspace-generate", key: user.id, limit: 10, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false, error: "生成请求过于频繁，请稍后再试。", code: "RATE_LIMITED" }, { status: 429, headers: createRateLimitHeaders(rateLimit) });
  }
  const { data: row, error: readError } = await client
    .from("stylekit_projects")
    .select("name,description,project_type,stack,brief,selected_style_slug,status,current_revision_number")
    .eq("id", projectId)
    .maybeSingle();
  if (readError) return NextResponse.json({ success: false, error: "项目读取失败。" }, { status: 500 });
  if (!row) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
  if (row.status === "archived") return NextResponse.json({ success: false, error: "已归档项目不能生成。" }, { status: 409 });
  if (row.current_revision_number !== parsed.data.expectedRevisionNumber) {
    return NextResponse.json({ success: false, error: "项目已更新，请刷新后再生成。", code: "PROJECT_REVISION_CONFLICT" }, { status: 409 });
  }
  const project = createWorkspaceProjectSchema.safeParse({
    name: row.name,
    description: row.description,
    projectType: row.project_type,
    stack: row.stack,
    brief: row.brief,
    selectedStyleSlug: row.selected_style_slug,
  });
  if (!project.success) return NextResponse.json({ success: false, error: "项目规格不完整，无法生成。" }, { status: 422 });
  try {
    const generation = generateWorkspaceProject({
      ...project.data,
      target: parsed.data.target,
      generatedAt: new Date().toISOString(),
    });
    const snapshot = { ...project.data, status: "active" as const, generation };
    const admin = getSupabaseAdmin();
    if (!admin) return NextResponse.json({ success: false, error: "项目生成存储尚未配置。" }, { status: 503 });
    const { data, error } = await admin.rpc("append_stylekit_project_revision", {
      target_project_id: projectId,
      expected_revision_number: parsed.data.expectedRevisionNumber,
      revision_snapshot: snapshot,
      revision_schema_version: 1,
      revision_content_sha256: hashWorkspaceSnapshot(snapshot),
      revision_source: "generation",
      revision_change_summary: `生成 ${parsed.data.target} 工程（${generation.files.length} 个文件）`,
      revision_parent_number: parsed.data.expectedRevisionNumber || null,
      target_owner_id: user.id,
    });
    if (error?.message?.includes("PROJECT_REVISION_CONFLICT")) return NextResponse.json({ success: false, error: "项目已更新，请刷新后再生成。", code: "PROJECT_REVISION_CONFLICT" }, { status: 409 });
    if (error?.message?.includes("REVISION_LIMIT_REACHED")) return NextResponse.json({ success: false, error: "该项目已达到 200 个版本上限。", code: "REVISION_LIMIT_REACHED" }, { status: 409 });
    if (error) return NextResponse.json({ success: false, error: "生成结果保存失败。" }, { status: 500 });
    return NextResponse.json({ success: true, revision: data, generation: { target: generation.target, fileCount: generation.files.length, warningCount: generation.quality.warnings.length } }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch (generationError) {
    if (generationError instanceof WorkspaceGenerationError) {
      const status = generationError.code === "GENERATION_QUALITY_FAILED" ? 500 : 422;
      return NextResponse.json({ success: false, error: generationError.message, code: generationError.code }, { status });
    }
    return NextResponse.json({ success: false, error: "工程生成失败。" }, { status: 500 });
  }
}
