# stylekit-feishu

让 AI 写出来的前端，风格不再随机。

一个住在飞书群里的设计规范机器人：

1. **选风格** — @它一句需求，它从 StyleKit 的 148 个设计风格里挑最合适的，流式展示推理过程，卡片按钮选定
2. **交工程包** — 23 件产物（AI 提示词 / Cursor·Claude 规则 / shadcn 主题 / Tailwind preset / Figma tokens / 组件代码 / Agent Skill）打包成 ZIP，同时生成《设计规范交付单》飞书文档、把记录写进多维表格
3. **体检代码** — 把 AI 写好的代码贴回群里，按该风格的规则引擎逐条体检，违规给修复建议，结果回写表格

## 安装

```bash
pnpm install
pnpm --filter stylekit-core build
npx @larksuite/cli@latest install
```

## 配置

```bash
pnpm --filter stylekit-feishu register
```

扫终端打印的二维码，凭据自动落终端。写进 `packages/feishu/.env`：

```bash
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
LLM_BASE_URL=https://api.stepfun.com/v1   # 任意 OpenAI 兼容端点
LLM_MODEL=step-3.7-flash
LLM_API_KEY=xxx
```

多维表格**零配置**：不填 `FEISHU_BASE_TOKEN` 时，第一次交付会自动建一张「StyleKit 风格台账」。

## 运行

```bash
pnpm --filter stylekit-feishu dev
```

单实例锁内置 —— 飞书会把同一应用的事件分流到多条连接，双开会互相拆台，锁直接阻止。

## 群内用法

- @它描述需求 → 流式选型 → 点按钮 → 工程包落进飞书
- 贴代码 → 体检卡片（违规 + 修复建议）→ 改完再贴 → 变绿
- 命令：`帮助` `风格列表` `多少个风格` `查 <slug>` `重置` `状态`

## 测试

```bash
npx vitest run --config tests/vitest.config.ts packages/feishu/src/tests
```

## 架构

```
src/
  cli.ts         入口：WS 长连接 + 单实例锁 + 事件路由
  register.ts    扫码注册（device-flow 协议自实现，抗弱网）
  llm/           OpenAI 兼容客户端 + 规划器系统提示词
  planner/       148 风格全量候选 → zod 校验 → 目录存在性兜底
  artifacts/     23 件产物生成 + ZIP 打包
  flows/         推荐 / 交付 / 体检 / 命令 / 目录浏览
  lark-cli.ts    lark-cli 子进程封装（写回层）
  cards.ts       卡片 JSON 2.0 构造器
  state.ts       每群记忆（当前风格 / 表格坐标 / 记录 id）
```

只依赖 `stylekit-core` 与 `@larksuite/channel`，不 import 任何 Next.js 应用内部代码，可作为独立 npm 包发布。
