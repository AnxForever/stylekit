import { z } from "zod";
import type { AgentTool, ToolCall } from "./tools/types";
import type { OnUsageCallback, LLMUsage } from "./observability";

const DEFAULT_BASE_URL = "https://api.openai.com/v1";

const usageSchema = z
  .object({
    prompt_tokens: z.number().optional(),
    completion_tokens: z.number().optional(),
    total_tokens: z.number().optional(),
    prompt_tokens_details: z
      .object({ cached_tokens: z.number().optional() })
      .optional(),
  })
  .optional();

const chatCompletionResponseSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.union([
          z.string(),
          z.array(
            z.object({
              type: z.string().optional(),
              text: z.string().optional(),
            })
          ),
        ]),
      }),
    })
  ),
  usage: usageSchema,
  model: z.string().optional(),
});

function extractUsage(raw: z.infer<typeof usageSchema>): LLMUsage {
  return {
    promptTokens: raw?.prompt_tokens ?? 0,
    completionTokens: raw?.completion_tokens ?? 0,
    totalTokens: raw?.total_tokens ?? 0,
    cachedTokens: raw?.prompt_tokens_details?.cached_tokens,
  };
}

export class AgentProviderError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "AGENT_PROVIDER_ERROR", status = 500) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export interface AgentModelConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getAgentModelConfig(): AgentModelConfig | null {
  const apiKey = process.env.AGENT_API_KEY?.trim();
  const model = process.env.AGENT_MODEL?.trim();
  const baseUrl = trimTrailingSlash(
    process.env.AGENT_BASE_URL?.trim() || DEFAULT_BASE_URL
  );

  if (!apiKey || !model) {
    return null;
  }

  return {
    apiKey,
    model,
    baseUrl,
  };
}

export function isAgentModelConfigured(): boolean {
  return getAgentModelConfig() !== null;
}

function extractMessageContent(
  content: string | Array<{ type?: string; text?: string }>
): string {
  if (typeof content === "string") {
    return content.trim();
  }

  return content
    .map((item) => item.text ?? "")
    .join("")
    .trim();
}

function extractJsonCandidate(rawText: string): string {
  const trimmed = rawText.trim();
  if (!trimmed) {
    throw new AgentProviderError(
      "Model returned an empty response.",
      "AGENT_EMPTY_RESPONSE",
      502
    );
  }

  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n");
    const withoutFence = lines.slice(1, lines[lines.length - 1]?.startsWith("```") ? -1 : undefined);
    return withoutFence.join("\n").trim();
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return trimmed;
  }

  const objectStart = trimmed.indexOf("{");
  const objectEnd = trimmed.lastIndexOf("}");
  if (objectStart >= 0 && objectEnd > objectStart) {
    return trimmed.slice(objectStart, objectEnd + 1);
  }

  throw new AgentProviderError(
    "Model did not return valid JSON.",
    "AGENT_INVALID_RESPONSE",
    502
  );
}

export async function requestAgentJson<T>({
  schema,
  system,
  user,
  temperature = 0.2,
  normalize,
  onUsage,
}: {
  schema: z.ZodSchema<T>;
  system: string;
  user: string;
  temperature?: number;
  normalize?: (raw: Record<string, unknown>) => Record<string, unknown>;
  onUsage?: OnUsageCallback;
}): Promise<T> {
  const config = getAgentModelConfig();
  if (!config) {
    throw new AgentProviderError(
      "Agent model is not configured.",
      "AGENT_NOT_CONFIGURED",
      503
    );
  }

  const startedAt = Date.now();
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new AgentProviderError(
      `Agent provider request failed${errorText ? `: ${errorText}` : "."}`,
      "AGENT_PROVIDER_HTTP_ERROR",
      502
    );
  }

  const payload = chatCompletionResponseSchema.safeParse(await response.json());
  if (!payload.success) {
    throw new AgentProviderError(
      "Agent provider returned an unexpected payload.",
      "AGENT_PROVIDER_PAYLOAD_ERROR",
      502
    );
  }

  if (onUsage) {
    onUsage({
      purpose: "other",
      model: payload.data.model ?? config.model,
      usage: extractUsage(payload.data.usage),
      durationMs: Date.now() - startedAt,
    });
  }

  const rawText = extractMessageContent(payload.data.choices[0]?.message?.content ?? "");
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(extractJsonCandidate(rawText));
  } catch {
    throw new AgentProviderError(
      "Model did not return valid JSON.",
      "AGENT_INVALID_RESPONSE",
      502
    );
  }

  if (normalize && parsedJson && typeof parsedJson === "object" && !Array.isArray(parsedJson)) {
    parsedJson = normalize(parsedJson as Record<string, unknown>);
  }

  const parsed = schema.safeParse(parsedJson);

  if (!parsed.success) {
    throw new AgentProviderError(
      "Agent response did not match the expected schema.",
      "AGENT_SCHEMA_ERROR",
      502
    );
  }

  return parsed.data;
}

export async function requestAgentStream({
  system,
  user,
  temperature = 0.3,
}: {
  system: string;
  user: string;
  temperature?: number;
}): Promise<ReadableStream<string>> {
  const config = getAgentModelConfig();
  if (!config) {
    throw new AgentProviderError(
      "Agent model is not configured.",
      "AGENT_NOT_CONFIGURED",
      503
    );
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature,
      stream: true,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new AgentProviderError(
      `Agent provider request failed${errorText ? `: ${errorText}` : "."}`,
      "AGENT_PROVIDER_HTTP_ERROR",
      502
    );
  }

  if (!response.body) {
    throw new AgentProviderError(
      "Agent provider returned no response body.",
      "AGENT_PROVIDER_NO_BODY",
      502
    );
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  return new ReadableStream<string>({
    async start(controller) {
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(":")) continue;

            if (trimmed === "data: [DONE]") {
              controller.close();
              return;
            }

            if (trimmed.startsWith("data: ")) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const content = json.choices?.[0]?.delta?.content;
                if (typeof content === "string" && content.length > 0) {
                  controller.enqueue(content);
                }
              } catch {
                // skip malformed SSE chunks
              }
            }
          }
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

/* ======================================================================
 * Tool Calling Support (Phase A of L2)
 *
 * OpenAI `/chat/completions` with `tools` parameter.
 * Returns either final content or a list of tool_calls the model wants us
 * to execute. The caller (orchestrator) is responsible for the agentic loop.
 * ==================================================================== */

/**
 * Conversation message shape we accept for tool-enabled calls.
 * Kept permissive because we're talking across 4 roles (system/user/assistant/tool).
 */
export type AgentConversationMessage =
  | { role: "system"; content: string }
  | { role: "user"; content: string }
  | {
      role: "assistant";
      content?: string | null;
      tool_calls?: Array<{
        id: string;
        type: "function";
        function: { name: string; arguments: string };
      }>;
    }
  | {
      role: "tool";
      tool_call_id: string;
      content: string;
    };

export type AgentStopReason = "end_turn" | "tool_use" | "max_tokens" | "other";

export interface AgentToolTurnResult {
  stopReason: AgentStopReason;
  /** Assistant text content, null when the model chose to call tools instead. */
  content: string | null;
  /** Zero when stopReason !== "tool_use". */
  toolCalls: ToolCall[];
  /** Raw assistant message, to be echoed back into next turn's messages array. */
  rawAssistantMessage: {
    role: "assistant";
    content: string | null;
    tool_calls?: Array<{
      id: string;
      type: "function";
      function: { name: string; arguments: string };
    }>;
  };
}

/**
 * Convert one AgentTool to OpenAI's `tools[].function` shape.
 * Uses Zod 4's native `z.toJSONSchema()` — no extra deps.
 */
function toolToOpenAIFormat(tool: AgentTool): {
  type: "function";
  function: { name: string; description: string; parameters: Record<string, unknown> };
} {
  const paramsSchema = z.toJSONSchema(tool.parameters, { target: "draft-7" }) as Record<string, unknown>;
  /* OpenAI expects parameters.type = "object" at top level. Zod emits it correctly
   * for z.object schemas; defensively ensure. */
  if (paramsSchema.type !== "object") {
    throw new Error(
      `Tool '${tool.name}' parameters must be a z.object schema at the top level.`
    );
  }
  /* OpenAI doesn't accept $schema field in parameters. Strip it. */
  delete paramsSchema.$schema;
  return {
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: paramsSchema,
    },
  };
}

const toolCallResponseSchema = z.object({
  choices: z.array(
    z.object({
      finish_reason: z.string().optional().nullable(),
      message: z.object({
        role: z.literal("assistant"),
        content: z.string().nullable().optional(),
        tool_calls: z
          .array(
            z.object({
              id: z.string(),
              type: z.literal("function"),
              function: z.object({
                name: z.string(),
                arguments: z.string(),
              }),
            })
          )
          .optional()
          .nullable(),
      }),
    })
  ),
  usage: usageSchema,
  model: z.string().optional(),
});

function mapFinishReason(raw: string | null | undefined): AgentStopReason {
  switch (raw) {
    case "stop":
      return "end_turn";
    case "tool_calls":
    case "function_call":
      return "tool_use";
    case "length":
      return "max_tokens";
    default:
      return "other";
  }
}

/**
 * One-shot tool-enabled chat completion.
 *
 * Design: does NOT loop. Caller decides whether to execute tools and call again.
 */
export async function requestAgentWithTools({
  messages,
  tools,
  temperature = 0.2,
  toolChoice = "auto",
  onUsage,
}: {
  messages: readonly AgentConversationMessage[];
  tools: readonly AgentTool[];
  temperature?: number;
  toolChoice?: "auto" | "none" | "required";
  onUsage?: OnUsageCallback;
}): Promise<AgentToolTurnResult> {
  const config = getAgentModelConfig();
  if (!config) {
    throw new AgentProviderError(
      "Agent model is not configured.",
      "AGENT_NOT_CONFIGURED",
      503
    );
  }

  const body: Record<string, unknown> = {
    model: config.model,
    temperature,
    messages,
  };
  if (tools.length > 0) {
    body.tools = tools.map(toolToOpenAIFormat);
    body.tool_choice = toolChoice;
  }

  const startedAt = Date.now();
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new AgentProviderError(
      `Agent provider tool call failed${errorText ? `: ${errorText}` : "."}`,
      "AGENT_PROVIDER_HTTP_ERROR",
      502
    );
  }

  const parsed = toolCallResponseSchema.safeParse(await response.json());
  if (!parsed.success) {
    throw new AgentProviderError(
      "Agent provider returned an unexpected tool-call payload.",
      "AGENT_PROVIDER_PAYLOAD_ERROR",
      502
    );
  }

  if (onUsage) {
    onUsage({
      purpose: "other",
      model: parsed.data.model ?? config.model,
      usage: extractUsage(parsed.data.usage),
      durationMs: Date.now() - startedAt,
    });
  }

  const choice = parsed.data.choices[0];
  if (!choice) {
    throw new AgentProviderError(
      "Agent provider returned no choices.",
      "AGENT_PROVIDER_PAYLOAD_ERROR",
      502
    );
  }

  const stopReason = mapFinishReason(choice.finish_reason);
  const toolCalls: ToolCall[] = (choice.message.tool_calls ?? []).map((call) => ({
    id: call.id,
    name: call.function.name,
    argumentsJson: call.function.arguments,
  }));

  return {
    stopReason,
    content: choice.message.content ?? null,
    toolCalls,
    rawAssistantMessage: {
      role: "assistant",
      content: choice.message.content ?? null,
      ...(choice.message.tool_calls ? { tool_calls: choice.message.tool_calls } : {}),
    },
  };
}
