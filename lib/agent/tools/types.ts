import type { z } from "zod";

/**
 * 通用 Tool 定义规范。
 *
 * 设计原则：
 * 1. parameters 用 Zod schema：运行时校验 + 可自动导出 JSON Schema 给 LLM
 * 2. execute 输入用 z.infer 推导，输出固定返回 unknown 交给调用方序列化
 * 3. description 要"像给新员工写 API 文档"——说清何时用、输入输出、失败表现
 */
export interface AgentTool<TSchema extends z.ZodTypeAny = z.ZodTypeAny> {
  /** Tool 唯一名，给 LLM 调用用。snake_case 或 camelCase 都行，保持一致即可 */
  name: string;

  /**
   * 给 LLM 看的使用说明。直接影响模型决策准确率——写得含糊 LLM 就乱调。
   * 必须覆盖：做什么、何时用、输入输出概要、失败情形。
   */
  description: string;

  /** Zod schema，定义参数结构 */
  parameters: TSchema;

  /** 真正执行的函数 */
  execute: (args: z.infer<TSchema>) => Promise<unknown> | unknown;
}

/**
 * Tool 执行结果。
 * 成功时返回 data，失败时返回 error，方便执行器统一打包给 LLM。
 */
export type ToolExecutionResult =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

/**
 * LLM 原生 API 返回的 tool call 结构（OpenAI 格式）。
 * 之后 provider.ts 会解析 API 返回并构造这个类型。
 */
export interface ToolCall {
  id: string;
  name: string;
  /** JSON 字符串，需 parse。API 返回就是字符串，不是 object */
  argumentsJson: string;
}
