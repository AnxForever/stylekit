import type { AgentTool, ToolCall, ToolExecutionResult } from "./types";

/**
 * Tool 执行器：统一处理查找、校验、执行、错误隔离、可观测性。
 *
 * 设计理念：
 * - 永不 throw，所有错误打包成 { ok: false, error } 返回给 LLM
 *   LLM 看到错误会自己调整下一步，比抛异常中断循环更健壮
 * - 每次执行生成 trace，与项目现有 toolTrace 结构对齐
 */
export interface ToolExecutionTrace {
  tool: string;
  ok: boolean;
  meta?: Record<string, unknown>;
}

/**
 * 执行单个 tool call。
 */
export async function executeToolCall(
  toolCall: ToolCall,
  registry: ReadonlyMap<string, AgentTool>
): Promise<{ result: ToolExecutionResult; trace: ToolExecutionTrace }> {
  const tool = registry.get(toolCall.name);
  if (!tool) {
    return {
      result: {
        ok: false,
        error: `Unknown tool: ${toolCall.name}. Available tools: ${Array.from(registry.keys()).join(", ")}`,
      },
      trace: { tool: toolCall.name, ok: false, meta: { reason: "unknown_tool" } },
    };
  }

  /* Parse arguments string from LLM */
  let rawArgs: unknown;
  try {
    rawArgs = JSON.parse(toolCall.argumentsJson || "{}");
  } catch {
    return {
      result: {
        ok: false,
        error: `Invalid JSON arguments for ${toolCall.name}: ${toolCall.argumentsJson.slice(0, 120)}`,
      },
      trace: { tool: toolCall.name, ok: false, meta: { reason: "invalid_json" } },
    };
  }

  /* Validate against tool's Zod schema */
  const parsed = tool.parameters.safeParse(rawArgs);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const path = firstIssue?.path.join(".") || "(root)";
    return {
      result: {
        ok: false,
        error: `Invalid arguments for ${toolCall.name}: field '${path}' ${firstIssue?.message ?? "failed validation"}`,
      },
      trace: {
        tool: toolCall.name,
        ok: false,
        meta: { reason: "schema_error", path, issue: firstIssue?.message },
      },
    };
  }

  /* Execute with error isolation */
  try {
    const data = await tool.execute(parsed.data);
    return {
      result: { ok: true, data },
      trace: {
        tool: toolCall.name,
        ok: true,
        meta: { argsKeys: Object.keys(parsed.data as object) },
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      result: { ok: false, error: `Tool ${toolCall.name} failed: ${message}` },
      trace: {
        tool: toolCall.name,
        ok: false,
        meta: { reason: "runtime_error", message: message.slice(0, 200) },
      },
    };
  }
}

/**
 * 批量执行多个 tool calls（用于支持并行 tool calling）。
 * Phase A 暂时串行，Phase C 可改为 Promise.all 并行。
 */
export async function executeToolCalls(
  toolCalls: readonly ToolCall[],
  registry: ReadonlyMap<string, AgentTool>
): Promise<{
  results: Array<{ toolCallId: string; result: ToolExecutionResult }>;
  traces: ToolExecutionTrace[];
}> {
  const results: Array<{ toolCallId: string; result: ToolExecutionResult }> = [];
  const traces: ToolExecutionTrace[] = [];

  for (const call of toolCalls) {
    const { result, trace } = await executeToolCall(call, registry);
    results.push({ toolCallId: call.id, result });
    traces.push(trace);
  }

  return { results, traces };
}
