import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/security/rate-limit";
import { buildWorkspaceZip, workspaceGenerationSchema } from "@/lib/workspace";

const requestSchema = z.object({ revisionNumber: z.number().int().positive() }).strict();

export async function GET(_request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(projectId).success) return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const rateLimit = checkRateLimit({ namespace: "workspace-export", key: user.id, limit: 30, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false, error: "导出请求过于频繁，请稍后再试。", code: "RATE_LIMITED" }, { status: 429, headers: createRateLimitHeaders(rateLimit) });
  }
  const { data, error } = await client.from("stylekit_project_exports").select("id,revision_number,format,artifact_sha256,file_count,status,verification,created_at").eq("project_id", projectId).order("created_at", { ascending: false }).limit(100);
  if (error) return NextResponse.json({ success: false, error: "导出记录读取失败。" }, { status: 500 });
  return NextResponse.json({ success: true, exports: data ?? [] }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const body = await parseJsonBodyWithLimit<unknown>(request, { maxBytes: 2048 });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = requestSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "导出参数无效。" }, { status: 400 });
  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(projectId).success) return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const [{ data: project, error: projectError }, { data: revision, error: revisionError }] = await Promise.all([
    client.from("stylekit_projects").select("name,status").eq("id", projectId).maybeSingle(),
    client.from("stylekit_project_revisions").select("snapshot,created_at").eq("project_id", projectId).eq("revision_number", parsed.data.revisionNumber).maybeSingle(),
  ]);
  if (projectError || revisionError) return NextResponse.json({ success: false, error: "项目版本读取失败。" }, { status: 500 });
  if (!project || !revision) return NextResponse.json({ success: false, error: "项目版本不存在。" }, { status: 404 });
  if (project.status === "archived") return NextResponse.json({ success: false, error: "已归档项目不能创建新导出。" }, { status: 409 });
  const snapshot = revision.snapshot as { name?: unknown; generation?: unknown };
  const generation = workspaceGenerationSchema.safeParse(snapshot.generation);
  if (!generation.success) return NextResponse.json({ success: false, error: "该版本没有可导出的真实生成文件。" }, { status: 422 });
  const revisionProjectName = typeof snapshot.name === "string" && snapshot.name.trim() ? snapshot.name : project.name;
  let artifact;
  try {
    artifact = await buildWorkspaceZip({ projectName: revisionProjectName, generatedAt: revision.created_at, generation: generation.data });
  } catch {
    return NextResponse.json({ success: false, error: "版本文件完整性校验失败。" }, { status: 409 });
  }
  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ success: false, error: "权威导出记录存储尚未配置。" }, { status: 503 });
  const { data, error } = await admin.from("stylekit_project_exports").upsert({
    project_id: projectId,
    user_id: user.id,
    revision_number: parsed.data.revisionNumber,
    format: "zip",
    artifact_sha256: artifact.sha256,
    file_count: artifact.fileCount,
    status: "generated",
    verification: { target: generation.data.target, engineVersion: generation.data.engineVersion, filename: artifact.filename },
  }, { onConflict: "project_id,revision_number,format,artifact_sha256" }).select("id,revision_number,format,artifact_sha256,file_count,status,verification,created_at").single();
  if (error) return NextResponse.json({ success: false, error: "导出记录创建失败。" }, { status: 500 });
  return NextResponse.json({ success: true, export: data, downloadUrl: `/api/workspace/exports/${data.id}/download` }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
}
