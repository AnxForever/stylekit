# 外部投稿文案（2026-11）

统一口径，任何渠道都不要改动这两句：

> StyleKit（stylekit.top）收录 149 种网页与 UI 设计风格，每种都附可直接复制的 AI 提示词、设计 tokens 与组件配方，可导出到 Tailwind、shadcn 与 Claude Code、Cursor、v0。

英文：StyleKit is an open-source design style library for AI-generated web interfaces: 149 curated styles, each with copy-ready prompts, design tokens, and component recipes.

发帖顺序按《30 天排期》执行；这里只放可直接粘贴的正文。

---

## 1. 阮一峰周刊 issue

标题：`【开源自荐】StyleKit：149 套 AI 网页设计风格，附提示词与设计 tokens`

正文：

```markdown
## 一句话介绍

StyleKit 收录 149 种网页与 UI 设计风格，每种都附可直接复制的 AI 提示词、设计 tokens 与组件配方。

- 项目地址：https://github.com/AnxForever/stylekit
- 在线试用：https://www.stylekit.top/zh/styles
- 许可：MIT

## 解决什么问题

用 ChatGPT、Claude Code、Cursor、v0 写前端时，说"做得高级一点""参考 Stripe"这类话，模型给出的往往是同一套模板：紫色渐变、圆角卡片、居中 hero。原因是这些词没有约束力。

StyleKit 把"风格"翻译成可执行的约束：主辅色 hex、字号阶梯、间距基线、圆角、阴影、组件状态、以及"禁止出现什么"。每种风格都有：

- 可直接复制的提示词（落地页 / 仪表盘 / 作品集等场景）
- 完整的设计 tokens 与 Tailwind 约束
- 组件配方与真实页面演示
- 生成后的自检清单，用来防止风格漂移

## 三种用法

1. 直接复制提示词：打开任一风格页，粘贴到 ChatGPT / Claude Code / Codex。
2. shadcn 主题：`npx shadcn add https://stylekit.top/r/<slug>.json`
3. MCP / Agent Skill：`npx -y stylekit-mcp`，编辑器和 Agent 可直接检索风格、取 tokens、并校验生成代码是否符合该风格。

## 技术栈

Next.js 16（App Router）、React 19、TypeScript、Tailwind CSS v4。风格数据与组件完全静态化，站点自身不依赖数据库即可浏览。

## 想收到的反馈

风格覆盖是否有明显缺口？提示词在 Claude Code / Codex 上的实际效果如何？哪一类页面（后台、落地页、电商）最需要补风格？
```

---

## 2. HelloGitHub

投递入口：HelloGitHub 官网「推荐项目」表单。字段照下面填。

- 项目名称：StyleKit
- 仓库地址：https://github.com/AnxForever/stylekit
- 官网：https://www.stylekit.top
- 语言 / 技术栈：TypeScript / Next.js / Tailwind CSS
- 许可：MIT
- 简介（一段，勿改）：
  > StyleKit 收录 149 种网页与 UI 设计风格，每种都附可直接复制的 AI 提示词、设计 tokens 与组件配方，支持导出到 Tailwind、shadcn，也提供 MCP 与 Agent Skill，让 ChatGPT、Claude Code、Cursor 按统一视觉规则生成界面。
- 亮点（三条）：
  1. 149 套风格，每套含 tokens、组件配方、AI 规则与可直接复制的提示词
  2. 支持 shadcn registry、MCP、CLI 三种接入方式，中英双语
  3. 全部静态数据 + `llms.txt`，便于 Agent 与第三方工具直接消费

---

## 3. GithubDaily

邮件 / 表单正文：

```text
推荐项目：StyleKit

链接：https://github.com/AnxForever/stylekit
官网：https://www.stylekit.top

简介：StyleKit 收录 149 种网页与 UI 设计风格，每种都附可直接复制的 AI 提示词、设计 tokens 与组件配方。用它可以把"做得高级一点"变成可执行的视觉约束，减少 AI 生成界面的模板感。支持复制提示词、shadcn 主题安装、MCP 与 Agent Skill 三种用法，MIT 开源。
```

---

## 4. LINUX DO（#开源推广）

前置动作：README 已加 LINUX DO 致谢与回链；发帖时必须插入官方推广模板并逐项如实选择。

标题：`[开源推广] StyleKit：149 套 AI 网页视觉风格，支持 MCP / Agent Skill`

正文：

```markdown
项目：StyleKit
地址：https://www.stylekit.top
仓库：https://github.com/AnxForever/stylekit（MIT）

## 为什么做这个

用 AI 写前端的人大概都遇到过：说"高级一点""参考 Stripe"，生成出来还是同一套紫渐变圆角卡片。问题不在模型，在描述——形容词没有约束力。

StyleKit 做的是把风格拆成可执行的约束：色值、字号阶梯、间距基线、圆角、阴影、组件状态，以及明确的"禁止项"。共 149 套，分十类（现代科技、粗野主义、品牌启发、复古、艺术、日式动漫、赛博朋克、布局模式、文化地域、自然温馨）。

## 这一版更新

- 每个风格页新增"示例提示词 + 生成后自检清单"，可直接粘贴到 Claude Code / Codex
- 整库导出：`/api/styles/all.json` 一次拿到全部 149 套的 tokens 与规则，`/all-styles.md` 是一张完整表格
- 新增九站对比页，说明同类站点各自适合什么：/zh/prompt-sites

## 三种用法

1. 复制提示词直接用
2. shadcn：`npx shadcn add https://stylekit.top/r/<slug>.json`
3. MCP：`npx -y stylekit-mcp`，可检索风格、取 tokens、并用 `stylekit_lint_code` 校验生成代码是否符合该风格

## 想听的意见

- 风格分类是否合理？有没有明显缺失的方向？
- `stylekit_lint_code` 的误报率如何？
- 你希望 Agent Skill 里补哪些能力？

（按社区规则：本项目 MIT 完整开源，README 已添加 LINUX DO 回链与致谢，无群组引流。）
```

---

## 5. V2EX（/go/create 分享创造，需满 30 天）

标题：`[分享创造] StyleKit：给 AI 生成网页的 149 套视觉风格（开源 / MCP）`

正文：

```markdown
## 背景

给 Claude Code、Cursor、v0 写需求时，"做得高级一点"基本等于没说。想让它做出特定观感，得给足够具体的约束：颜色、字号、间距、圆角、组件状态、以及不要出现什么。

我把这件事做成了一个开源风格库：https://www.stylekit.top

## 内容

149 套网页与 UI 设计风格，分十类。每套包含：

- 设计 tokens（色值、字号、间距、圆角、阴影、动效）
- 组件配方（按钮、卡片、输入框、导航等）
- 一段可直接复制的提示词，按页面类型分开（落地页 / 仪表盘 / 作品集）
- 生成后的自检清单：哪些默认样式必须消失

## 三种用法

1. 复制提示词，粘到 AI 里
2. shadcn 主题：`npx shadcn add https://stylekit.top/r/<slug>.json`
3. MCP：`npx -y stylekit-mcp`，编辑器里直接检索风格并校验生成代码

## 技术

Next.js 16 + React 19 + Tailwind v4，风格数据全静态，站点自身不依赖数据库。MIT 开源：https://github.com/AnxForever/stylekit

## 希望了解

- 哪类风格最缺？
- 提示词在 Claude Code / Codex 上的实测效果如何？
- 需要我补哪些页面类型的模板？

不设注册，直接浏览。
```
