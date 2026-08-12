import replayIntent from "@/lib/bailian/fixtures/style-intent.json";
import {
  BailianClientError,
  type StyleIntentProvider,
  requestStyleIntent,
} from "@/lib/bailian";
import { parseDemoGenerationStyleIntent } from "@/lib/bailian/style-intent";
import { retrieveGeneratorKnowledge, retrieveKnowledgeForAdvisor, type KnowledgeAdvisorContext } from "@/lib/knowledge";
import { getStylePack } from "@/lib/styles";
import { WORKSPACE_SUPPORTED_STYLES } from "@/lib/workspace";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_BODY_BYTES = 32 * 1024;
const styleAdvisorRequestSchema = z
  .object({
    request: z.string().trim().min(1).max(2_000),
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

function summarizeStyle(slug: string) {
  const pack = getStylePack(slug);
  if (!pack) return null;
  const readiness = pack.readiness as { coverage?: unknown };
  return {
    slug: pack.slug,
    name: pack.name,
    nameEn: pack.nameEn,
    description: pack.description,
    colors: pack.colors,
    componentIds: Object.keys(pack.components),
    recipes: pack.recipes,
    readinessCoverage: readiness.coverage ?? null,
  };
}

export async function GET() {
  const provider = resolveProvider();
  const config = providerConfig(provider);
  return NextResponse.json({
    provider,
    model: process.env[config.modelEnv] ?? config.defaultModel,
    liveAvailable: Boolean(process.env[config.apiKeyEnv]?.trim()),
    replayAvailable: true,
    supportedStyles: [...WORKSPACE_SUPPORTED_STYLES],
  });
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:ai-style-advisor",
    key: getRequestClientKey(request),
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many style advisor requests. Please try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const bodyResult = await parseJsonBodyWithLimit<unknown>(
    request,
    {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Style advisor payload is too large.",
      invalidJsonMessage: "Invalid JSON format.",
    },
  );
  if (!bodyResult.ok) {
    return NextResponse.json(
      { error: bodyResult.error },
      { status: bodyResult.status },
    );
  }

  const parsedBody = styleAdvisorRequestSchema.safeParse(bodyResult.data);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "request must be a strict JSON object with 1–2,000 characters." },
      { status: 400 },
    );
  }

  const { request: requestText, mode } = parsedBody.data;

  if (mode === "replay") {
    const intent = parseDemoGenerationStyleIntent(replayIntent);
    return NextResponse.json({
      source: "replay",
      model: "fixture",
      provider: "fixture",
      intent,
      style: summarizeStyle(intent.styleSlug),
      knowledge: emptyKnowledgeContext(),
      generatorKnowledge: [],
    });
  }

  const resolvedProvider = resolveProvider();
  const config = providerConfig(resolvedProvider);
  const apiKey = process.env[config.apiKeyEnv]?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: `${config.apiKeyEnv} is not configured. Use replay mode or configure it in .env.local.` },
      { status: 503 },
    );
  }

  try {
    const knowledge = await retrieveKnowledgeForAdvisor(requestText);
    const generatorKnowledge = await retrieveGeneratorKnowledge(requestText);
    const intent = await requestStyleIntent({
      request: requestText,
      apiKey,
      provider: resolvedProvider,
      model: process.env[config.modelEnv],
      baseUrl: process.env[config.baseUrlEnv],
      knowledge: knowledge.references,
    });
    return NextResponse.json({
      source: resolvedProvider,
      provider: resolvedProvider,
      model: process.env[config.modelEnv] ?? config.defaultModel,
      intent,
      style: summarizeStyle(intent.styleSlug),
      knowledge,
      generatorKnowledge,
    });
  } catch (error) {
    if (error instanceof BailianClientError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { error: "Style advisor request failed." },
      { status: 502 },
    );
  }
}

function emptyKnowledgeContext(): KnowledgeAdvisorContext {
  return { query: "", references: [], retrieved: false };
}
