import replayContent from "@/lib/bailian/fixtures/workspace-content.json";
import { BailianClientError, requestWorkspaceContent } from "@/lib/bailian";
import type { StyleIntentProvider } from "@/lib/bailian";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { normalizeWorkspaceContent } from "@/lib/workspace/content";
import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_BODY_BYTES = 2048;

const contentRequestSchema = z
  .object({
    mode: z.enum(["live", "replay"]).default("live"),
  })
  .strict();

function resolveProvider(): StyleIntentProvider {
  const configured = process.env.STYLE_ADVISOR_PROVIDER?.trim().toLowerCase();
  return configured === "deepseek" ? "deepseek" : "dashscope";
}

function providerConfig(provider: StyleIntentProvider) {
  const isDeepSeek = provider === "deepseek";
  return {
    provider,
    apiKeyEnv: isDeepSeek ? "DEEPSEEK_API_KEY" : "DASHSCOPE_API_KEY",
    modelEnv: isDeepSeek ? "DEEPSEEK_MODEL" : "DASHSCOPE_MODEL",
    baseUrlEnv: isDeepSeek ? "DEEPSEEK_BASE_URL" : "DASHSCOPE_BASE_URL",
    defaultModel: isDeepSeek ? "deepseek-chat" : "qwen3.7-max",
  } as const;
}

/**
 * Writes interface copy for the project. Nothing is persisted here: the client
 * puts the copy into its draft, the user sees it in the sandboxed preview, and
 * saving the project stores it inside the next revision snapshot.
 */
export async function POST(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) {
    return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  }
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "界面文案请求体过大。",
    invalidJsonMessage: "请求格式无效。",
  });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  const parsed = contentRequestSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "请求参数无效。只接受 mode 字段。" }, { status: 400 });
  }

  const [{ projectId }, user, client] = await Promise.all([params, getServerUser(), getAuthServerClient()]);
  if (!z.uuid().safeParse(projectId).success) {
    return NextResponse.json({ success: false, error: "项目 ID 无效。" }, { status: 400 });
  }
  if (!user) return NextResponse.json({ success: false, error: "请先登录。" }, { status: 401 });
  if (!client) {
    return NextResponse.json({ success: false, error: "项目存储尚未配置。" }, { status: 503 });
  }

  const rateLimit = checkRateLimit({
    namespace: "workspace-content",
    key: getRequestClientKey(request),
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "界面文案生成过于频繁，请稍后再试。", code: "RATE_LIMITED" },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  const { data: row, error } = await client
    .from("stylekit_projects")
    .select("name,description,project_type,brief,status")
    .eq("id", projectId)
    .maybeSingle();
  if (error) return NextResponse.json({ success: false, error: "项目读取失败。" }, { status: 500 });
  if (!row) return NextResponse.json({ success: false, error: "项目不存在。" }, { status: 404 });
  if (row.status === "archived") {
    return NextResponse.json({ success: false, error: "已归档项目不能生成界面文案。" }, { status: 409 });
  }
  if (row.project_type !== "dashboard") {
    return NextResponse.json(
      {
        success: false,
        error: "界面文案目前只覆盖已完成工程验证的 Next.js 数据后台。",
        code: "UNSUPPORTED_CAPABILITY",
      },
      { status: 422 }
    );
  }

  const project = {
    name: row.name as string,
    description: (row.description as string | null) ?? "",
    projectType: "dashboard" as const,
    brief: (row.brief ?? {}) as {
      audience?: string;
      primaryGoal?: string;
      requiredPages?: string[];
      brandPersonality?: string[];
      antiReferences?: string[];
      notes?: string;
    },
  };

  let plan: { sections: unknown; note?: string };
  let source: string;
  let model: string;

  if (parsed.data.mode === "replay") {
    plan = replayContent;
    source = "replay";
    model = "fixture";
  } else {
    const provider = resolveProvider();
    const config = providerConfig(provider);
    const apiKey = process.env[config.apiKeyEnv]?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: `${config.apiKeyEnv} 尚未配置。可以使用 replay 模式，或在 .env.local 中配置后再试。`,
          code: "CONFIGURATION_ERROR",
        },
        { status: 503 }
      );
    }
    try {
      plan = await requestWorkspaceContent({
        project,
        apiKey,
        provider,
        model: process.env[config.modelEnv],
        baseUrl: process.env[config.baseUrlEnv],
      });
      source = provider;
      model = process.env[config.modelEnv] ?? config.defaultModel;
    } catch (requestError) {
      if (requestError instanceof BailianClientError) {
        return NextResponse.json(
          { success: false, error: requestError.message, code: requestError.code },
          { status: requestError.status }
        );
      }
      return NextResponse.json({ success: false, error: "界面文案生成失败。" }, { status: 502 });
    }
  }

  const validation = normalizeWorkspaceContent("dashboard", plan.sections);
  if (!validation.ok) {
    return NextResponse.json(
      { success: false, error: validation.error, code: "INVALID_MODEL_OUTPUT" },
      { status: 422 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      source,
      model,
      content: validation.content,
      fieldCount: validation.fieldCount,
      summary: validation.summary,
      note: plan.note ?? null,
    },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
