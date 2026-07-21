import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";

type Context = { params: Promise<{ projectId: string; revisionNumber: string }> };

export async function GET(_request: Request, { params }: Context) {
  const [{ projectId, revisionNumber }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(projectId).success || !z.coerce.number().int().positive().safeParse(revisionNumber).success) {
    return NextResponse.json({ success: false, error: "版本地址无效。" }, { status: 400 });
  }
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  const { data, error } = await client
    .from("stylekit_project_revisions")
    .select("id,revision_number,snapshot,document_schema_version,content_sha256,source,parent_revision_number,change_summary,created_at")
    .eq("project_id", projectId)
    .eq("revision_number", Number(revisionNumber))
    .maybeSingle();
  if (error) return NextResponse.json({ success: false, error: "版本读取失败。" }, { status: 500 });
  if (!data) return NextResponse.json({ success: false, error: "版本不存在。" }, { status: 404 });
  return NextResponse.json({ success: true, revision: data }, { headers: { "Cache-Control": "private, no-store" } });
}
