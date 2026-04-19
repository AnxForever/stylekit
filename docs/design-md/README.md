# DESIGN.md Documentation Hub

> StyleKit 的 DESIGN.md 知识库，为 Phase 1 社区复活 + Phase 2 新 Agent 开发奠基。

## 背景一句话

**DESIGN.md** 是 Google Stitch 在 2026 年 3 月正式提出的设计系统文档格式，和 `AGENTS.md` / `CLAUDE.md` 并列：

| 文件 | 读者 | 作用 |
|---|---|---|
| `AGENTS.md` | Coding agents | 怎么**构建**项目 |
| `CLAUDE.md` | Claude Code agent | 项目规则与约束 |
| `DESIGN.md` | Design agents | 项目应该**长什么样** |

AI 生成 UI 时，DESIGN.md 告诉它"品牌 DNA 是什么"，避免千篇一律的"AI 味道"。

## 三份核心文档

| 文件 | 面向 | 用途 |
|---|---|---|
| [spec.md](./spec.md) | 工程师 / 研究者 | 格式规范、官方来源、与 StyleKit DesignStyle 的映射 |
| [template.md](./template.md) | 社区投稿者 | 空白骨架 + Neo Brutalist 完整样例，复制即用 |
| [agent-prompt.md](./agent-prompt.md) | Agent 开发者 | Phase 2 新 agent 的 system prompt + 对话流程 + tool catalog |

## 关键链接

- 官方提案: <https://stitch.withgoogle.com/docs/design-md/format/>
- Google 官方 SKILL: <https://github.com/google-labs-code/stitch-skills/tree/main/skills/design-md>
- VoltAgent 精选库: <https://github.com/VoltAgent/awesome-design-md>
- 浏览器目录: <https://getdesign.md/>
- CLI 安装: `npx getdesign@latest add <brand>`

## 研究日期

2026-04-19 — StyleKit Phase 1 Research
