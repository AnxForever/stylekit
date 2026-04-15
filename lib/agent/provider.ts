import { z } from "zod";

const DEFAULT_BASE_URL = "https://api.openai.com/v1";

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
});

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
}: {
  schema: z.ZodSchema<T>;
  system: string;
  user: string;
  temperature?: number;
  normalize?: (raw: Record<string, unknown>) => Record<string, unknown>;
}): Promise<T> {
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

