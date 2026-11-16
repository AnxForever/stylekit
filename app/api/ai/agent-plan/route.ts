import replayPlan from "@/lib/bailian/fixtures/agent-plan.json";
import {
  BailianClientError,
  requestAgentPlan,
} from "@/lib/bailian";
import type { StyleIntentProvider } from "@/lib/bailian";
import {
  AGENT_ACTIONS,
  agentPlanSchema,
  agentPlanComponentSchema,
  validateAgentPlan,
  type AgentPlanComponent,
} from "@/lib/agent/plan";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_BODY_BYTES = 64 * 1024;

const agentPlanRequestSchema = z
  .object({
    goal: z.string().trim().min(1).max(300),
    snapshot: z.array(agentPlanComponentSchema).min(1).max(50),
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

function planResponse(
  source: string,
  model: string,
  plan: { steps: unknown[]; note?: string },
  snapshot: AgentPlanComponent[]
) {
  const parsed = agentPlanSchema.parse(plan);
  const validation = validateAgentPlan(parsed, snapshot);
  if (!validation.ok) {
    return NextResponse.json(
      {
        error: validation.error,
        code: "INVALID_MODEL_OUTPUT",
      },
      { status: 422 }
    );
  }

  return NextResponse.json({
    source,
    model,
    plan: { steps: validation.steps, note: parsed.note ?? null },
  });
}

export async function GET() {
  const provider = resolveProvider();
  const config = providerConfig(provider);
  return NextResponse.json({
    provider,
    model: process.env[config.modelEnv] ?? config.defaultModel,
    liveAvailable: Boolean(process.env[config.apiKeyEnv]?.trim()),
    replayAvailable: true,
    actions: [...AGENT_ACTIONS],
  });
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:ai-agent-plan",
    key: getRequestClientKey(request),
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many agent plan requests. Please try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  const bodyResult = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Agent plan payload is too large.",
    invalidJsonMessage: "Invalid JSON format.",
  });
  if (!bodyResult.ok) {
    return NextResponse.json(
      { error: bodyResult.error },
      { status: bodyResult.status }
    );
  }

  const parsedBody = agentPlanRequestSchema.safeParse(bodyResult.data);
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error:
          "Send a goal of 1-300 characters and 1-50 snapshot components, each with a ref, a component kind, and its actions. Extra fields are not allowed.",
      },
      { status: 400 }
    );
  }

  const { goal, snapshot, mode } = parsedBody.data;

  if (mode === "replay") {
    return planResponse("replay", "fixture", replayPlan, snapshot);
  }

  const provider = resolveProvider();
  const config = providerConfig(provider);
  const apiKey = process.env[config.apiKeyEnv]?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: `${config.apiKeyEnv} is not configured. Use replay mode or configure it in .env.local.`,
      },
      { status: 503 }
    );
  }

  try {
    const plan = await requestAgentPlan({
      goal,
      snapshot,
      apiKey,
      provider,
      model: process.env[config.modelEnv],
      baseUrl: process.env[config.baseUrlEnv],
    });
    return planResponse(
      provider,
      process.env[config.modelEnv] ?? config.defaultModel,
      plan,
      snapshot
    );
  } catch (error) {
    if (error instanceof BailianClientError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: "Agent plan request failed." },
      { status: 502 }
    );
  }
}
