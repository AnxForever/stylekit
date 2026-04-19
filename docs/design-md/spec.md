# DESIGN.md 规范研究笔记

> 来源综合：Google Stitch 官方 SKILL.md + VoltAgent awesome-design-md + designproject.io / mindstudio.ai 行业文章。
> 研究日期：2026-04-19

## 1. 背景与定位

**DESIGN.md 由 Google Stitch 于 2026 年 3 月正式提出**，作为其 AI 设计工具（Stitch）的输入约束层。与已有两类 agent 指令文件形成互补：

```
AGENTS.md  ── 告诉 agent 怎么构建（行为、命令、工具）
CLAUDE.md  ── 告诉 agent 项目规则（代码风格、约束）
DESIGN.md  ── 告诉 agent 应该长什么样（视觉语言、品牌 DNA）
```

### 为什么要有

AI 代码 agent 生成 UI 的"Day 3 Wall"现象：前两天很棒，第三天开始出现一致性崩溃——圆角混乱、色彩漂移、字体权重不一。根因：agent 没有"单一视觉真相"，每次生成都重新猜。DESIGN.md 是把品牌 DNA 写成可读文件，每次生成时作为 context 注入。

### 核心哲学铁律

| 铁律 | 示范 |
|---|---|
| Semantic over syntactic（按用途命名，不按外观） | `Vercel Black (#171717)` 而非 `black` |
| Natural language for mood（用自然语言描述氛围） | `Airy / Dense / Utilitarian / Minimalist` |
| Hex precision in parentheses（精确值括注） | `Ocean-deep Cerulean (#0077B6)` |
| Physical over technical（物理描述代替 CSS） | `Pill-shaped` 而非 `rounded-full` |
| Functional roles（总是附带功能角色） | `Used for primary CTA` |

## 2. 官方 Schema（Google Stitch 权威版）

源自 `google-labs-code/stitch-skills/skills/design-md/SKILL.md`（3.7k stars）。5 个必选章节：

```markdown
# Design System: [Project Title]
**Project ID:** [optional identifier]

## 1. Visual Theme & Atmosphere
（Description of the mood, density, and aesthetic philosophy.）

## 2. Color Palette & Roles
（List colors by Descriptive Name + Hex Code + Functional Role.）

## 3. Typography Rules
（Description of font family, weight usage for headers vs. body, and letter-spacing character.）

## 4. Component Stylings
* **Buttons:** (Shape description, color assignment, behavior).
* **Cards/Containers:** (Corner roundness description, background color, shadow depth).
* **Inputs/Forms:** (Stroke style, background).

## 5. Layout Principles
（Description of whitespace strategy, margins, and grid alignment.）
```

## 3. StyleKit 推荐扩展章节

官方 5 章节是最小必选集。结合 VoltAgent 实践、designproject.io 经验、及 StyleKit 自身 `DesignStyle` 接口字段，StyleKit 推荐社区投稿**额外包含**以下章节（标记为可选）：

| # | 章节 | 为什么加 |
|---|---|---|
| 6 | Spacing Scale | 不写清楚 agent 会用各种随机间距 |
| 7 | Elevation & Depth | 阴影是"高级感"的主要来源，独立章节更清晰 |
| 8 | Do's & Don'ts | 约束清单比开放描述对 agent 更友好 |
| 9 | AI Rules | 明确给 agent 的 imperative 指令（"Never use gradients"） |
| 10 | Responsive Breakpoints | 移动端适配的 anchor |

见 [template.md](./template.md) 的完整骨架。

## 4. YAML Frontmatter 约定

官方 Stitch 版本不带 frontmatter，但社区（包括 VoltAgent）倾向用 frontmatter 承载 metadata。StyleKit 建议：

```yaml
---
name: "Neo Brutalist"
slug: "neo-brutalist"
category: "expressive"     # modern | retro | minimal | expressive
style_type: "visual"       # visual | layout
inspired_by: "https://example.com"
tags: ["high-contrast", "expressive", "retro"]
version: "1.0"
author: "@username"
license: "CC-BY-4.0"
---
```

**为什么加 frontmatter**：便于 StyleKit 社区 feed 列表展示（卡片缩略）、Zod schema 校验、以及和现有 `submissions.form_data` 字段映射。渲染器应容错：没有 frontmatter 也能解析。

## 5. 与 StyleKit `DesignStyle` 接口的映射

现有 `lib/styles/index.ts` 的 `DesignStyle` 本身就是 "JSON 版 DESIGN.md"。映射表：

| DESIGN.md 章节 | StyleKit DesignStyle 字段 | 转换逻辑 |
|---|---|---|
| Frontmatter.name | `name` / `nameEn` | 直接映射 |
| Frontmatter.slug | `slug` | 直接映射 |
| Frontmatter.category | `category` | 直接映射 |
| Frontmatter.tags | `tags` | 直接映射 |
| `## Overview` | `description` / `descriptionEn` | 一句话摘要 |
| `## Visual Theme & Atmosphere` | `philosophy` / `philosophyEn` | Mood 描述 |
| `## Color Palette & Roles` | `colors` + `variants[].colors` | 色板 |
| `## Typography Rules` | `globalCss` 里的字体段 | 字体规则 |
| `## Component Stylings` | `components.{button,card,input,nav,hero,footer}` | 组件样式 |
| `## Spacing Scale` | `globalCss` 里的 spacing | 间距体系 |
| `## Do's & Don'ts` | `doList` / `dontList` / `doListEn` / `dontListEn` | 约束列表 |
| `## AI Rules` | `aiRules` / `aiRulesEn` | Agent 指令 |
| `## Responsive Breakpoints` | `tailwindConfig` 的 screens | 断点 |

**结论**：StyleKit 现有 130+ styles 可以**自动渲染**成 DESIGN.md 格式（Phase 1 做一个 `lib/design-md/renderer.tsx` 即可）。反向：用户提交的 DESIGN.md 也可以**自动解析**回 DesignStyle JSON。

## 6. 真实样例节选

从 getdesign.md 提炼的 Vercel 示例（Light theme）：

```markdown
## Color Palette & Roles

**Primary**
- Vercel Black (#171717) — Primary text, headings, high-contrast CTAs
- Paper White (#FFFFFF) — Default background, card surfaces
- Hairline Gray (#EAEAEA) — Borders, dividers, subtle separators

**Semantic**
- Success Green (#0070F3) — Deployment success, "Ready" states
- Danger Red (#EE0000) — Errors, destructive actions
- Warning Amber (#F5A623) — Build warnings, caution banners

## Typography Rules

- **Font Family**: Geist Variable (sans), Geist Mono (code)
- **Weight Strategy**: 600 for headings (tight but confident), 400 for body,
  500 for emphasis. Never use 700 outside marketing hero.
- **Letter-spacing**: Negative on large display (-0.02em),
  neutral on body, positive on all-caps micro labels (+0.05em).
- **Character**: Technical precision. No warmth, no flourish.
```

## 7. 参考来源

- Stitch 官方规范：<https://stitch.withgoogle.com/docs/design-md/format/>
- Google SKILL（权威 prompt）：<https://github.com/google-labs-code/stitch-skills/tree/main/skills/design-md>
- VoltAgent awesome-design-md：<https://github.com/VoltAgent/awesome-design-md>
- 官方浏览站：<https://getdesign.md/>
- designproject.io 实践指南：<https://designproject.io/blog/design-md-file/>
- MindStudio 解读：<https://www.mindstudio.ai/blog/what-is-design-md-google-stitch>
- Medium 实战总结：<https://medium.com/@creativeaininja/design-md-the-missing-instruction-manual-your-ai-coding-agent-actually-needs-a463f78daf31>

## 8. 对 StyleKit 产品决策的关键 Insight

1. **DESIGN.md 的事实标准还在形成**：Google 官方 spec 只有 5 章节且相对简洁，VoltAgent/designproject.io 都在加扩展。**StyleKit 的 11 章节模板可以成为业界更完整的变体**。
2. **社区机会**：VoltAgent 的 68 个 DESIGN.md 全部来自知名品牌（Vercel / Linear / Apple / SpaceX）。**StyleKit 130+ styles 如果批量导出 DESIGN.md，瞬间成为业界最大的风格库**（130 vs 68）。
3. **agent 差异化**：Google Stitch 的 DESIGN.md skill 只做"从 Stitch 项目逆向生成"。**StyleKit 新 agent 如果支持"任意 URL / 截图 / 对话 → DESIGN.md"**，是独立产品机会。
4. **CLI 入口**: VoltAgent 有 `npx getdesign@latest add <brand>` 这样的 CLI。**StyleKit 可以做 `npx stylekit@latest add <slug>` 对标**，直接接入现有 130+ styles。
