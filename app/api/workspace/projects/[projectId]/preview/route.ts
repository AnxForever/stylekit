import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  buildWorkspacePreview,
  createWorkspaceProjectSchema,
  workspaceContentSchema,
  workspaceRevisionSnapshotSchema,
  WorkspaceGenerationError,
  type WorkspaceContent,
} from "@/lib/workspace";
import { workspaceContentSignature } from "@/lib/workspace/content";

const projectIdSchema = z.uuid();
type Context = { params: Promise<{ projectId: string }> };

const PROJECT_COLUMNS =
  "name,description,project_type,stack,brief,selected_style_slug,status,current_revision_number";

const previewBodySchema = z
  .object({
    styleSlug: z.string().trim().max(80).nullable().default(null),
    content: workspaceContentSchema.optional(),
  })
  .strict();

async function readSavedContent(
  client: NonNullable<Awaited<ReturnType<typeof getAuthServerClient>>>,
  projectId: string,
  revisionNumber: number
): Promise<{ content: WorkspaceContent; failed: boolean }> {
  if (!Number.isInteger(revisionNumber) || revisionNumber < 1) {
    return { content: {}, failed: false };
  }
  const { data, error } = await client
    .from("stylekit_project_revisions")
    .select("snapshot")
    .eq("project_id", projectId)
    .eq("revision_number", revisionNumber)
    .maybeSingle();
  if (error) return { content: {}, failed: true };
  const parsed = workspaceRevisionSnapshotSchema.safeParse(data?.snapshot);
  return { content: parsed.success ? parsed.data.content : {}, failed: false };
}

/**
 * Renders the project to a single HTML document. The editor shows it in a
 * sandboxed iframe, so the user sees the design before downloading code.
 *
 * `POST` takes copy the user has not saved yet (AI-filled or edited), so the
 * preview can show it before it becomes a revision. `GET` renders saved state.
 */
async function render(
  params: Context["params"],
  draft: { styleSlug: string | null; content?: WorkspaceContent } | null
) {
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

  const { data: row, error } = await client
    .from("stylekit_projects")
    .select(PROJECT_COLUMNS)
    .eq("id", projectId)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ success: false, error: "项目读取失败。" }, { status: 500 });
  }
  if (!row) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });

  const saved = await readSavedContent(client, projectId, row.current_revision_number);
  if (saved.failed) {
    return NextResponse.json({ success: false, error: "项目版本读取失败。" }, { status: 500 });
  }

  const project = createWorkspaceProjectSchema.safeParse({
    name: row.name,
    description: row.description,
    projectType: row.project_type,
    stack: row.stack,
    brief: row.brief,
    selectedStyleSlug: row.selected_style_slug,
    content: draft?.content ?? saved.content,
  });
  if (!project.success) {
    return NextResponse.json(
      { success: false, error: "项目规格不完整，无法预览。" },
      { status: 422 }
    );
  }

  try {
    const preview = buildWorkspacePreview(project.data, {
      styleSlug: draft?.styleSlug ?? null,
    });
    return NextResponse.json(
      {
        success: true,
        preview: {
          ...preview,
          revisionNumber: row.current_revision_number,
          unsavedContent: draft?.content
            ? workspaceContentSignature(draft.content) !== workspaceContentSignature(saved.content)
            : false,
        },
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

export async function GET(request: Request, { params }: Context) {
  const styleParam = new URL(request.url).searchParams.get("style")?.trim() ?? "";
  return render(params, {
    styleSlug: styleParam.length > 0 ? styleParam : null,
  });
}

export async function POST(request: Request, { params }: Context) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) {
    return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  }
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: 64 * 1024,
    tooLargeMessage: "预览请求体过大。",
    invalidJsonMessage: "请求格式无效。",
  });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = previewBodySchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "预览参数无效。" }, { status: 400 });
  }
  return render(params, {
    styleSlug: parsed.data.styleSlug,
    ...(parsed.data.content ? { content: parsed.data.content } : {}),
  });
}
