/**
 * Chat commands and the help text.
 *
 * Everything is available through natural language; the commands exist so
 * the demo and the guide have an obvious affordance, and so tests have a
 * stable surface.
 */

export type BotCommand =
  | "help"
  | "styles"
  | "count"
  | "inspect"
  | "reset"
  | "status";

interface CommandSpec {
  match: RegExp;
  hint: string;
}

const COMMANDS: Record<BotCommand, CommandSpec> = {
  help: { match: /^(帮助|help|命令|usage)(?:$|\s)/i, hint: "帮助 — 看全部命令" },
  styles: { match: /^(风格列表|列风格|styles)(?:$|\s)/i, hint: "风格列表 — 按分类浏览 146 个风格" },
  count: { match: /^(多少个风格|风格数量|count)(?:$|\s)/i, hint: "多少个风格 — 目录规模" },
  inspect: { match: /^(?:查|看看|了解|inspect)\s+(?:风格\s+)?(\S+)/i, hint: "查 <slug> — 看某个风格的详情" },
  reset: { match: /^(重置|清空|reset)(?:$|\s)/i, hint: "重置 — 忘掉当前群的风格记忆" },
  status: { match: /^(状态|status|你是)(?:$|\s)/i, hint: "状态 — 谁在跑、LLM 配了没" },
};

export function parseCommand(content: string): BotCommand | null {
  for (const [command, spec] of Object.entries(COMMANDS)) {
    if (spec.match.test(content.trim())) return command as BotCommand;
  }
  return null;
}

export function buildHelpText(): string {
  return [
    "**我会做的三件事**",
    "",
    "1. **选风格** — @我 说一句需求，我从 146 个风格里挑最合适的，流式展示推理过程，点按钮选定",
    "2. **交工程包** — 选定后生成 23 件产物（AI 提示词 / Cursor·Claude 规则 / shadcn 主题 / Tailwind preset / Figma tokens / 组件代码），写入多维表格 + 生成飞书文档",
    "3. **体检代码** — 把写好的代码贴回群里，我按该风格的规则逐条体检，违规给修复建议，结果回写表格",
    "",
    "**命令**",
    ...Object.values(COMMANDS).map((spec) => `\`${spec.hint}\``),
  ].join("\n");
}
