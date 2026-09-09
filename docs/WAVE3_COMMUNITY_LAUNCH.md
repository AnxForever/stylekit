# Wave 3 — Community & Launch: Copy Pack

> Ready-to-post drafts. Core rule everywhere: **7 parts substance, 3 parts placement**
> (技术干货为主，产品植入为辅). Hard ads get rate-limited or deleted; value-first content
> with a soft mention converts. Each platform gets a DISTINCT angle — never paste the same
> text across platforms (dedup / 灌水 detection). Prepared 2026-09-06.
>
> Facts: repo https://github.com/AnxForever/stylekit (458★), site https://stylekit.top,
> npm stylekit-mcp / stylekit-cli / stylekit-core, 148 curated styles, EN + 中文, MIT.

---

## A. 掘金 (Juejin) — technical deep-dive (best for algorithmic reach + interaction)

**Angle:** a how-to with a real pain point, not a product tour. Read-completion >70%
triggers Juejin's second recommendation pool, so front-load value and keep it tight.

**Title options (15-35 chars, keyword up front):**
- 「让 Cursor 生成的界面不再一股 AI 味：给它喂设计约束的实操」
- 「给 Claude/Cursor 装一个设计风格 MCP，前端 UI 质量跳一档」

**Category:** 前端 · **Tags:** AI, 前端, Cursor, 设计

**Structure (aim 1,800-3,000 字):**
1. **痛点开场（前 100 字带关键词）：** AI 生成的前端总是「能跑但难看」—— 圆角卡片阵、
   彩色渐变、千篇一律。根因：你给的是风格「名字」（"做个现代的 dashboard"），AI 只能
   猜；你没给它可执行的**约束**（具体 token、do/don't 规则）。
2. **原理：** 好的提示词 = 视觉约束的集合。用玻璃拟态举例，对比「vague name」vs
   「concrete constraints（backdrop-blur 12-20px、1px 亮边、饱和度提升、禁止纯色填充）」
   两种提示词喂给 Cursor 的产出差异（放两张截图）。
3. **实操：** 三种接法 ——
   - 复制现成硬提示词（stylekit.top 每个风格页有一键复制）
   - CLI：`npx stylekit-cli` 从终端拉 token / recipe / shadcn 命令
   - MCP：给 Claude/Cursor 装 `stylekit-mcp`，让 AI 自己按需查风格约束（贴 mcp.json）
4. **踩坑：** 为什么野兽派的「禁模糊/禁渐变」不能当全局兜底（会和玻璃风、渐变风冲突）——
   约束必须 per-style，不能一刀切。（这是真实工程教训，是干货的分量所在。）
5. **收尾：** 一句话点题 + 仓库链接（放文末，不硬塞）。

**Pitfalls:** 原创检测（>50% 重复会被标记）；工具汇总/软件测评类被官方活动排除，所以写成
**教程**而非「安利」；organic reach 现在偏弱，当内容 SEO + 互动做，不指望它涨 star。

---

## B. 知乎 (Zhihu) — answer an existing high-intent question (best for long-tail SEO)

**Angle:** find a live question, give a genuinely complete answer, soft-mention at the end.
14+ 天冷启动但话题页权威能长期引流。

**Target questions (search & answer these):**
- 「有哪些好用的 AI 辅助设计/前端工具？」
- 「如何让 AI（ChatGPT/Cursor）生成的网页不那么丑？」
- 「前端如何快速实现玻璃拟态 / 新拟态效果？」

**Answer skeleton:**
> 直接回答问题本身（不提产品）：AI 生成 UI 丑的核心是「约束缺失」。给出 3 条可操作的
> 通用方法（明确 token、给参照系统、per-style 规则），每条配一个具体例子。
>
> 结尾一句自然带出：「我自己整理了一个开源的设计风格库，把 148 种风格的 token 和约束都
> 结构化了，需要的可以搜 StyleKit / 我主页有」——**链接放主页或评论区**（正文外链被限流）。

**Pitfalls:** 非认证作者靠「真有用」转化，不靠链接；用类比解释（知乎奖励通俗）。

---

## C. V2EX — honest "I built this" (best for direct dev traffic, self-promo tolerated)

**Node:** `推广` （自我推广在这里是被允许和预期的；首次也可用 `分享创造`）

**Post draft:**
> 标题：做了个开源设计风格库，专门喂给 AI 让它生成不像 AI 的前端 UI
>
> 起因：用 Cursor/Claude 写前端，生成的东西总是「能用但一眼 AI 味」。问题在于我给的是
> 风格名字，AI 只能猜，没有可执行约束。
>
> 于是整理了 StyleKit —— 148 种设计风格，每种都有结构化的 design token、组件 recipe、
> do/don't 规则和现成硬提示词。三种用法：网页一键复制提示词、`npx stylekit-cli` 终端拉、
> 或给 AI 装 `stylekit-mcp` 让它自己查。全开源、中英双语。
>
> 站点：https://stylekit.top  仓库：https://github.com/AnxForever/stylekit
> 欢迎拍砖，尤其是「哪种风格的约束写得不到位」。

**Pitfalls:** 会有「重复造轮子」冷嘲 —— 回复里把差异点讲清楚（广度 + 多渠道分发 + 双语 +
per-style 约束而非通用模板），那条讨论往往带来更多关注。别跨帖复制同一段开场。

---

## D. GitHub 中文周刊 / 榜单 (high-DR backlinks + amplification)

Submit to (each is a GitHub issue or PR — copy below fits all, trim per format):

- **阮一峰《科技爱好者周刊》** — `ruanyf/weekly` 提交入口（进这个引流实打实）
- **HelloGitHub** — `521xueweihan/HelloGitHub` issue
- **GithubDaily** — 投稿入口
- **中国独立开发者项目列表** — `1c7/chinese-independent-developer` PR
- **OSCHINA 开源软件库** + **Gitee** 镜像

**Submission blurb (中文):**
> StyleKit —— 面向 AI 辅助开发的开源设计风格库。收录 148 种网页视觉/布局风格，每种都提供
> 可直接使用的设计 token、组件代码、do/don't 规则和给 ChatGPT/Cursor/Claude 的硬提示词。
> 支持网页浏览、CLI（`npx stylekit-cli`）和 MCP（`stylekit-mcp`）三种接入，中英双语，MIT。
> https://github.com/AnxForever/stylekit

---

## E. AlternativeTo + SaaSHub (permanent listings — double as GEO third-party citations)

**AlternativeTo** (alternativeto.net → submit application):
- **Name:** StyleKit
- **Category:** Design Tools / Developer Tools
- **Tagline:** Design style library for AI-assisted development — 148 curated styles with
  tokens, recipes, and AI prompts for ChatGPT, Cursor, and Claude.
- **List it as an alternative to:** shadcn/ui, Tailwind UI, Mobbin, Refactoring UI
- **Platforms:** Web, npm, CLI, MCP · **License:** Open Source (MIT)

**SaaSHub** (saashub.com → submit):
- Same tagline; features: 148 styles, design tokens, component recipes, shadcn install,
  MCP server, CLI, bilingual, offline.
- Links: site, GitHub, npm.

---

## F. awesome-* lists (PRs — social proof + GEO citations)

**awesome-design-tokens** (sturobson) & **awesome-design-systems** (alexpate, ~25k★) &
**awesome-css** — draft entry:
```markdown
- [StyleKit](https://stylekit.top) - Open-source library of 148 curated design styles with
  design tokens, component recipes, and AI prompts (ChatGPT/Cursor/Claude). Web, CLI, and
  MCP; bilingual EN/中文. [[GitHub](https://github.com/AnxForever/stylekit)]
```
Match each list's exact section + formatting before opening the PR.

**awesome-mcp-servers** — covered in WAVE1_MCP_SUBMISSIONS.md #7 (do after Glama listing).

---

## G. Higher-upside single events (English, need a genuine hook)

- **Hacker News "Show HN"** — highest single-event upside (a good Show HN → GitHub
  Trending → thousands of stars). Needs English + a real hook. Draft title:
  *"Show HN: StyleKit – 148 design styles as AI prompts so Cursor stops generating AI slop"*
  Lead the post with the pain point + the MCP angle; be present in comments all day.
- **Dev Hunt / DEV Community (dev.to)** — repurpose the Juejin deep-dive in English.
- **Reddit** r/SideProject, r/webdev, r/opensource — organic, value-first; link in a comment.

---

## Sequencing & tokens only you can provide
1. **V2EX 推广帖** (fastest direct dev traffic) + **one Juejin deep-dive** + **one Zhihu
   answer** — first wave.
2. **GitHub weeklies** (阮一峰/HelloGitHub/GithubDaily) — high-DR, amplifies everything.
3. **AlternativeTo + SaaSHub + awesome PRs** — permanent citations (the GEO lever).
4. **Show HN** — when you want the big swing; needs you present in-thread for hours.

**Only you can:** post to every platform (accounts), and (for Juejin/Zhihu) provide the
before/after screenshots — I can't produce original product screenshots. All text above is
ready; adjust voice to taste.
