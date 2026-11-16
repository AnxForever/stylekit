import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import {
  buildWorkspacePreview,
  createWorkspaceProjectSchema,
  WorkspaceGenerationError,
} from "@/lib/workspace";

const projectIdSchema = z.uuid();
type Context = { params: Promise<{ projectId: string }> };

const PROJECT_COLUMNS =
  "name,description,project_type,stack,brief,selected_style_slug,status,current_revision_number";

/**
 * Renders the project (or a style the user is still deciding on) to a single
 * HTML document. The editor shows it in a sandboxed iframe, so the user sees
 * the design before downloading code.
 */
export async function GET(request: Request, { params }: Context) {
  const [{ projectId }, user, client] = await Promise.all([
    params,
    getServerUser(),
    getAuthServerClient(),
  ]);
  if (!projectIdSchema.safeParse(projectId).success) {
    return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  }
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) {
    return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  }

  const styleParam = new URL(request.url).searchParams.get("style")?.trim() ?? "";
  const styleSlug = styleParam.length > 0 ? styleParam : null;

  const { data: row, error } = await client
    .from("stylekit_projects")
    .select(PROJECT_COLUMNS)
    .eq("id", projectId)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ success: false, error: "项目读取失败。" }, { status: 500 });
  }
  if (!row) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });

  const project = createWorkspaceProjectSchema.safeParse({
    name: row.name,
    description: row.description,
    projectType: row.project_type,
    stack: row.stack,
    brief: row.brief,
    selectedStyleSlug: row.selected_style_slug,
  });
  if (!project.success) {
    return NextResponse.json(
      { success: false, error: "项目规格不完整，无法预览。" },
      { status: 422 }
    );
  }

  try {
    const preview = buildWorkspacePreview(project.data, { styleSlug });
    return NextResponse.json(
      {
        success: true,
        preview: { ...preview, revisionNumber: row.current_revision_number },
      },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (previewError) {
    if (previewError instanceof WorkspaceGenerationError) {
      return NextResponse.json(
        { success: false, error: previewError.message, code: previewError.code },
        { status: 422 }
      );
    }
    return NextResponse.json({ success: false, error: "预览生成失败。" }, { status: 500 });
  }
}
