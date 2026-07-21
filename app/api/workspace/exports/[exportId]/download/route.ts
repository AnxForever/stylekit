import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { buildWorkspaceZip, workspaceGenerationSchema } from "@/lib/workspace";

export async function GET(_request: Request, { params }: { params: Promise<{ exportId: string }> }) {
  const [{ exportId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(exportId).success) return NextResponse.json({ success: false, error: "导出 ID 无效。" }, { status: 400 });
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const { data: exportRow, error } = await client.from("stylekit_project_exports").select("project_id,revision_number,artifact_sha256,status,verification").eq("id", exportId).maybeSingle();
  if (error) return NextResponse.json({ success: false, error: "导出记录读取失败。" }, { status: 500 });
  if (!exportRow) return NextResponse.json({ success: false, error: "导出不存在。" }, { status: 404 });
  if (exportRow.status !== "generated") return NextResponse.json({ success: false, error: "该导出当前不可下载。" }, { status: 409 });
  const [{ data: project, error: projectError }, { data: revision, error: revisionError }] = await Promise.all([
    client.from("stylekit_projects").select("name").eq("id", exportRow.project_id).maybeSingle(),
    client.from("stylekit_project_revisions").select("snapshot,created_at").eq("project_id", exportRow.project_id).eq("revision_number", exportRow.revision_number).maybeSingle(),
  ]);
  if (projectError || revisionError) return NextResponse.json({ success: false, error: "导出来源读取失败。" }, { status: 500 });
  if (!project || !revision) return NextResponse.json({ success: false, error: "导出来源版本不存在。" }, { status: 404 });
  const snapshot = revision.snapshot as { name?: unknown; generation?: unknown };
  const generation = workspaceGenerationSchema.safeParse(snapshot.generation);
  if (!generation.success) return NextResponse.json({ success: false, error: "导出来源无效。" }, { status: 409 });
  const revisionProjectName = typeof snapshot.name === "string" && snapshot.name.trim() ? snapshot.name : project.name;
  let artifact;
  try {
    artifact = await buildWorkspaceZip({ projectName: revisionProjectName, generatedAt: revision.created_at, generation: generation.data });
  } catch {
    return NextResponse.json({ success: false, error: "导出来源文件完整性校验失败。" }, { status: 409 });
  }
  if (artifact.sha256 !== exportRow.artifact_sha256) return NextResponse.json({ success: false, error: "导出内容哈希不一致，下载已停止。" }, { status: 409 });
  return new Response(new Uint8Array(artifact.content), { headers: { "Content-Type": "application/zip", "Content-Disposition": `attachment; filename="${artifact.filename}"`, "Content-Length": String(artifact.content.byteLength), "X-Content-SHA256": artifact.sha256, "Cache-Control": "private, no-store" } });
}
