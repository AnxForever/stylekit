# DESIGN.md 单一核心改造蓝图

目标形态：StyleKit 从「风格素材站」收缩成「AI 可读设计系统库」。一个风格 = 一份 DESIGN.md，站点的全部功能都围绕生成、展示、分发这份文档展开。

本文基于对 refero.design/styles 的实测（页面结构、导出格式、sitemap、MCP 数据模型）与本仓库现状盘点，给出可执行的路由筛减、数据模型、生成管线与迁移顺序。

## 一、对方做对了什么

实测结论，每条都能直接落地。

**一份数据，四种输出，两档密度。** 详情页的 tab 是 Preview / DESIGN.md / Tailwind v4 / CSS Variables / Design Tokens。前三者不是并列产品，而是同一份 spec 的四个编译目标。DESIGN.md 再分 Compact（12490 字符）与 Extended（19902 字符）：Compact 去掉 token 列、Agent Prompt Guide 与 Quick Start 代码块，只留人能扫读的角色描述；Extended 保留 `--color-*` token 列、可直接粘贴的 prompt 与 `:root` 变量块。同一份数据服务人和 Agent 两种读者。

**色彩不是色板，是带职责的命名条目。** 每个色包含 `name / value / token / role` 四元组，role 写「何时用」而非「是什么」：

| Name | Value | Token | Role |
|------|-------|-------|------|
| Aubergine Black | `#302023` | `--color-aubergine-black` | Dramatic dark-section backgrounds — the only near-saturated tone, used to invert the page temperature |

StyleKit 现在只有 `primary / secondary / accent[]` 三个槽位，Agent 拿到后不知道哪个色该用在深色区块。这是最大的语义缺口。

**字体章节把「选字体」降级成「可用规则」。** 除 family 外必带：substitute（"Inter, or Söhne — 任何 x-height 相近、开口舒展的几何 grotesque"）、weights、sizes、三档 line-height、两档 letter-spacing、OpenType features（`ss04`/`ss11`）。用户装不上 ABC Favorit 也不会崩。

**组件写成可复原的构造说明。** 不是代码片段，是「100px 圆角、1px Ink Black 描边、透明填充、15px/400、padding 8px 20px」这种参数句。谁都能照着重建，谁也不依赖我们的实现。

**Do / Don't 双向约束，Don't 更狠。** "不要引入任何彩色强调色""不要用阴影做层次，深度只来自表面明度与 1px 线条""容器圆角不得超 8px"。禁止项比允许项更能刻画风格，因为它排除掉了 Agent 的默认审美。

**Agent Prompt Guide 把文档变成操作手册。** 一段 QUICK COLOR REFERENCE（text/background/card/dark/border/muted 六个槽位），加 5 条可直接粘贴的组件生成 prompt，每条都带具体数值与文案。

**分发走 MCP，字段即产品。** `refero_get_style` 返回 `northStar / theme / colors / typography / typeScale / spacing / layout / elevation / elevationPhilosophy / components / imagery / dos / donts / customSections`。文档结构就是 API 结构，没有二次翻译。

**SEO 分层。** 1342 个 style 页 + 52 个集合页两套 sitemap；集合页按「项目类型 / 站点类型 / Agent 平台」三轴铺；`/design-md/*` 概念页承接 "what is design.md"、"design.md for cursor" 一类搜索。robots.txt 对 GPTBot、ClaudeBot、CCBot 等训练爬虫全部 Disallow，只放行普通搜索与用户访问。URL 用 uuid 而非 slug，我们不必学，slug 对 SEO 更有利。

## 二、StyleKit 现状

337 个 `page.tsx`：53 个 locale 路由、151 个 showcase、47 个模板页、22 个 admin 页。`lib/` 67 个子目录，`components/` 57 个。

现有 `DesignStyle`（`lib/styles/types.ts`）与目标 spec 的字段落差：

| 现有字段 | 目标 | 处理 |
|---|---|---|
| `colors.primary/secondary/accent[]` | `colors[]` 带 name/role/group/token | 重构，需 149 次人工命名 |
| `philosophy` / `philosophyEn` | `summary` + `northStar` | 拆分：一句话论点 + 长段落 |
| `doList` / `dontList` | `dos` / `donts` | 直接沿用 |
| `components.*.code` | `components[].construction` + 可选 html | 由代码反写参数句，或人工重写 |
| `globalCss` / `tailwindConfig` | 生成物，不入库 | 改为编译输出 |
| `aiRules` / `aiRulesEn` | `promptGuide.prompts` | 拆成结构化 prompt |
| `atoms` / `tags` / `category` / `compatibleWith` | `tags` / `collection` 归属 | 收敛 |
| 无 | `typeScale` / `spacing` / `radii` / `surfaces` / `elevation` / `imagery` / `layout` / `similar` | 新增 |

结论：`aiRules` 与 `globalCss` 是过去两年的核心资产，但它们是字符串。要把站点筛减到只剩 DESIGN.md，必须先把这两段长文本逆向成结构化 spec，否则所有导出都只能靠正则拼接。

## 三、SEO 硬约束

改造对象是「产品投入」，不是「URL 面」。所有已进入 sitemap 而被索引的地址在改造后必须继续返回 200，且主题连续。这一条不接受性能、简洁或审美上的例外。

当前基线（`node tools/scripts/seo-sitemap-baseline.mjs`，生产 sitemap 实测，2026-11-03）：

```
total sitemap URLs: 1163
   496  /colors/[hex]
   298  /styles/[slug]
   122  /animations/[slug]
    70  /templates/*
    36  /recipes/[id]
    24  /collections/[slug]
    16  /prompts/[topic]
     7  /blog/[slug]
     6  /guides/[slug]
    约 70 条静态页，各 2 个语言
```

第一行就否掉了「砍掉颜色库」的方案：496 条颜色页是全站最大的一块索引资产，比 149 个风格页还多。它们必须留下，改内容不改地址。这也是整个改造的第一原则：先看 sitemap，再决定改什么。

流量基线（自托管 Umami `website_event` 表，近 90 天完整聚合：1,019,487 次 pageview，32,267 个不同路径；GSC 28 天 2077 点击 / 23442 曝光 / 平均排名 6.9）：

```
  301,357  29.6%  /styles/[slug]/showcase
  232,160  22.8%  /styles
  228,904  22.5%  /styles/[slug]
   56,832   5.6%  /templates
   46,177   4.5%  /templates/*
   37,247   3.7%  /colors/[hex]
   32,890   3.2%  /
   14,166   1.4%  /ui-prompts
   12,436   1.2%  /collections/[slug]
    9,832   1.0%  /animations
```

三个 styles 族合计 762,421 次，占 **74.8%**。这是全站的主干，也是改造的全部风险所在。

一个反直觉的数字：颜色页只占 sitemap 的 42%（496/1163），却贡献 3.7% 流量，且完全靠长尾累积——只统计 top 2000 路径时它只有 0.7%，把 32,267 条路径全算上才显出真实体量。**做路由决策必须用全量数据，抽样会把长尾资产判死。**

完整快照、单页头部与复取命令见 [`docs/analytics-baseline.md`](./analytics-baseline.md)；两台的服务器拓扑与数据位置见 `ops/SERVERS.md`（本地运维文件，被 `.gitignore` 排除，克隆仓库不可见）。本文件只保留结论，数字以那两份为准。

不可做：

- 删除 sitemap 条目。`app/sitemap.ts` 是全站索引的唯一真相，任何从 sitemap 消失的 URL 都会在一到两个抓取周期内掉出索引。
- 批量 301，尤其是 301 到 `/` 或 `/styles`。Google 视之为 soft 404，会同时清掉新旧两条 URL。
- 改 slug、改 URL 结构、改 `/styles/[slug]` 的层级。
- 改 `hreflang` 与 locale 前缀结构。现有 `getIndexableLocalesForPath` 决定哪些路径出双语、哪些只出英文，改造期不得松开。
- 大规模改 title。一个 URL 的 title 与其排名关键词绑定，重写等于重新排队。
- 一次性发布。要分批，每批不超过 20 个 URL，观察 14 天再下一批。

可做：

- 同 URL 内容替换。地址不变，页面讲的东西从「素材展示」升级为「DESIGN.md 的形态」。这是本次改造的主力手段。
- 新增 URL。只要旧的不动，新的随便加。
- 调整导航与内链。但收缩导航会削弱权重传递，必须配合内链补偿。
- 保留旧页面代码但停止迭代。维护成本降为零，SEO 收益不减。

唯一允许的 301：已存在内容重复、且目标页主题完全同义的少数成对地址（例如 `/guide` 与 `/guides`）。规则是同语言 1:1、目标必须是活页、跳转链不超过一跳、同批提交 sitemap 变更。

## 四、页面处置

判据从「主题距离」升级为「主题距离 × 真实流量」。流量来自自托管 Umami 的 `website_event` 表（近 90 天全量聚合，1,019,487 次 pageview，32,267 个路径）与 GSC 28 天数据。全部保留 URL。

| 层 | 路由族 | 90 天浏览量 | 占比 | 动作 |
|---|---|---|---|---|
| 1 | `/styles/[slug]/showcase` | 301,357 | 29.6% | A |
| 1 | `/styles` | 232,160 | 22.8% | A |
| 1 | `/styles/[slug]` | 228,904 | 22.5% | A |
| 2 | `/templates` 与 `/templates/*` | 103,009 | 10.1% | B |
| 2 | `/colors/[hex]` | 37,247 | 3.7% | A |
| 2 | `/` 首页 | 32,890 | 3.2% | A |
| 2 | `/ui-prompts` | 14,166 | 1.4% | A |
| 2 | `/collections` 与子页 | 20,355 | 2.0% | A |
| 2 | `/animations` 与子页 | 15,679 | 1.5% | B |
| 3 | `/prompts/[topic]` | 7,046 | 0.7% | A |
| 3 | `/resources` `/component-patterns` `/recipes` | 5,133 | 0.5% | B |
| 3 | `/changelog` `/community` `/learn` `/guides` | 4,495 | 0.4% | C |
| 3 | `/mouse-interactions` `/kit` `/landing-page-prompts` 等 | 3,750 | 0.4% | C |
| 4 | `/login` `/profile` `/submit` `/launch` 等工具页 | 约 1,600 | 0.2% | C |

三条由数据直接得出的结论：

1. **showcase 是全站第一大流量面，占 29.6%**，比 `/styles` 与 `/styles/[slug]` 都高。原方案把它当附属是错的，它是改造的头号对象，也是必须先做小样本验证的对象。
2. **三个 styles 族合计 74.8%**。任何动到它们的发布都是高风险批次，20 个 slug 一批、14 天观察期在这个量级上没有余量可以缩短。
3. **颜色页 496 条 URL 贡献 3.7%**，是长尾累积而非头部贡献，单页最高 389 次。它既不是可以随手删的负担，也不值得优先重写；处置是「加厚并保留」，排在 styles 与 templates 之后。

动作定义：

A 类，重写为 DESIGN.md 承载面（主题同义）：

- `/styles/[slug]`：五区块 + 五 tab，本次改造的核心页面。
- `/styles/[slug]/showcase`：内容从「UI demo」换成「该风格 DESIGN.md 的可视化演示」。搜索意图继续成立（想看看这个风格长什么样），新增部分服务文档定位（这套规则长什么样）。**但这是 29.6% 流量的所在地，只能小步改，先拿 3 个 slug 观察两周。**
- `/colors`、`/colors/[hex]`：改为「这个颜色在 DESIGN.md 里承担什么 role」，保留色值关键词与色卡，不删任何 hex 页，逐步加厚。
- `/type-scale`、`/spacing`、`/visual-hierarchy`、`/color-theory`、`/design-principles`：改为设计规则教学页，每页内嵌对应 DESIGN.md 章节的真实样本。
- `/ui-prompts`、`/landing-page-prompts`、`/dashboard-prompts`、`/tailwind-ui-prompts`、`/dark-mode-ui-prompts`、`/prompts/[topic]`：改为「按场景聚合的 Agent Prompt Guide 片段」，与详情页的 promptGuide 同源。
- 首页：搜索 + 集合 chips + 卡片墙，保留现有场景入口。
- `/ai-ui-design`、`/ai-web-design`、`/ai-frontend-design`、`/avoid-ai-slop`、`/claude-code-ui-design`、`/codex-ui-design` 等长尾落地页：改为「为什么 Agent 需要 DESIGN.md」的论证页，每页带 3 个真实样本与接入按钮。

B 类，保留原页，只改内链与导航权重（不投入迭代）：

- `/templates` 及其 46 个子页、`/animations` 及其子页、`/components`、`/component-patterns`、`/recipes`、`/guides`、`/learn`、`/resources`、`/downloads`、`/mobile`、`/developers`。

C 类，冻结（代码保留、导航移除、内容不动）：

- `/liquid-glass`、`/mouse-interactions`、`/repair`、`/style-advisor`、`/launch`、`/experiments/*`、`/support`、`/submit`、`/profile`、`/community`、`/blog`、`/changelog`。

不进 sitemap、robots 已 disallow，无需处理：`/admin/*`、`/preview`、`/kit`、`/workspace`、`/validation`、`/api/*`。

导航收缩必须配内链补偿，否则 B、C 类页面会失去唯一入口：

- 每个 `/styles/[slug]` 底部「More like this」链 4 条相邻风格。
- `/collections` 页把 149 个风格按字母与标签双索引列全。
- 页脚保留一条「全部风格」与一条「全部集合」的直达链接。
- 旧功能页之间维持其内部互链，不让它们变成孤岛。

SEO 增量（只加不减）：

- 新增 `/styles/[slug]/design.md` 作为 markdown 响应，写进 `llms.txt`，不进 sitemap（避免与 HTML 版竞争）。
- 新增集合轴：按项目（dashboard / pricing / onboarding / settings）、按站点类型（SaaS / editorial / devtool / commerce）、按 Agent（Claude Code / Cursor / v0）三套，全部是新地址。
- `robots.ts` 保持现状：普通爬虫全放行，训练爬虫维持既有策略。不要在这个窗口期收紧，收紧会影响既有的 AI 引用量。

度量口径：改造前先留 90 天基线（GSC 的页面级 impressions / clicks / position，加上 `indexed` 页面数）。每批发布后第 7、14、30 天对同一批 URL 做对比，任一 URL 的 position 下滑超过 3 位就暂停下一批，先查内容是否真的同义。

sitemap 门禁：上线前跑一次 `node tools/scripts/seo-sitemap-baseline.mjs --json .tmp/seo-before.json`，上线后跑 `--compare .tmp/seo-before.json`。它按路由族计数并逐条列出消失的 URL，只要 `removed` 非空就返回非零退出码。放进发布 checklist，比事后在 GSC 里发现掉页便宜得多。

## 五、数据模型

```ts
// lib/design-spec/types.ts
export interface DesignSpec {
  slug: string;
  name: string;
  nameEn: string;
  sourceUrl?: string;
  cover: string;
  theme: "light" | "dark" | "mixed";
  northStar: { zh: string; en: string };
  summary: { zh: string; en: string };

  colors: Array<{
    name: string;
    nameEn: string;
    value: string;
    group: "brand" | "neutral" | "surface" | "accent";
    role: { zh: string; en: string };
    token: string; // --color-ink-black
  }>;

  fonts: Array<{
    family: string;
    substitute: string;
    weights: number[];
    sizes: number[];
    lineHeight: { display: number; heading: number; body: number };
    tracking: { display: string; label: string };
    features?: string[];
    role: { zh: string; en: string };
    token: string;
  }>;

  typeScale: Array<{
    role: string;
    font?: string;
    weight?: number;
    size: number;
    lineHeight: number;
    tracking?: string;
    token: string;
  }>;

  spacing: {
    base: number;
    density: "compact" | "comfortable" | "airy";
    scale: number[];
    maxWidth: number;
    sectionGap: number;
    cardPadding: number;
    elementGap: number;
  };

  radii: Array<{ element: string; value: string }>;
  surfaces: Array<{ level: number; name: string; value: string; purpose: string }>;
  elevation: Array<{ name: string; value: string }>;

  components: Array<{
    name: string;
    role: string;
    construction: string;
    sizes?: string;
    states?: string;
    html?: string;
  }>;

  imagery: { zh: string; en: string };
  layout: { zh: string; en: string };
  dos: string[];
  donts: string[];

  promptGuide: {
    quickColors: Record<string, string>;
    prompts: string[];
  };

  similar: Array<{ name: string; slug?: string; why: string }>;
  customSections?: Array<{ title: string; body: string }>;

  // 渐进迁移用：缺失的章节不渲染，不阻塞上线
  completeness: "stub" | "partial" | "full";
}
```

`completeness` 是关键。149 个风格不可能一夜补齐，标 `stub` 的只渲染 Colors 与 Do/Don't，页面照常工作，MCP 照常返回。

## 六、生成管线

单一入口，四个渲染器，全部纯函数，便于快照测试：

```ts
// lib/design-spec/render/index.ts
export { renderDesignMd } from "./design-md";      // (spec, "compact" | "extended") => string
export { renderTailwindTheme } from "./tailwind";  // => "@theme { ... }"
export { renderCssVariables } from "./css-vars";   // => ":root { ... }"
export { renderDtcg } from "./dtcg";               // => tokens.json (DTCG)
```

章节顺序固定，与人读习惯一致：

```
# {name} — Style Reference
> {northStar.en}
**Theme:** light | dark | mixed
{summary}

## Colors                    表格：Name / Value / Token / Role
## Typography                字体块 + Type Scale 表格
## Spacing & Layout          基础单位、密度、max-width、间距表、圆角表
## Components                逐个组件：Role / 构造 / 尺寸 / 状态
## Do's and Don'ts
## Surfaces && Elevation
## Imagery && Layout
## Agent Prompt Guide        QUICK COLOR REFERENCE + 示例 prompt
## Similar Brands
## Quick Start               CSS 变量块（仅 Extended）
```

Compact 规则：删 Token 列，删 Agent Prompt Guide，删 Quick Start，Components 只留 Role + 构造首句。用它保证「人能 90 秒读完一份」。

导出接口（全部走同一渲染器，不再各页自己拼字符串）：

```
GET /api/design/[slug]/design.md?density=compact|extended
GET /api/design/[slug]/theme.css
GET /api/design/[slug]/variables.css
GET /api/design/[slug]/tokens.json
```

MCP 侧同步：`get_style` 返回 `DesignSpec` 原对象（而不是拼好的字符串），让客户端自己决定怎么用。

## 七、详情页结构

一屏五区块，对应五份数据的可视化身：

1. 头部：名称、northStar、source 链接、主题徽标、Copy DESIGN.md 与接入 AI 两个动作
2. Color Palette：按 group 分栏，每格显示色块 + Name + 值 + 一行 role，点击复制 HEX
3. Typography：字体块（weights/sizes/features/substitute）+ Type Scale 表格，每行右侧字号
4. Spacing & Shape：基础单位、密度、max-width、间距刻度条、圆角示意
5. Guidelines：Do / Don't 双栏；Dark 风格时整块反色，正好演示规则本身

其后是「More like this」横向卡片，四条内链。页脚保留 tab 区（DESIGN.md / Tailwind v4 / CSS Variables / Design Tokens）与 Compact/Extended 切换，Code block 提供 Copy 与下载。

## 八、执行顺序

阶段 0，一周量级，零 SEO 影响：新增 `lib/design-spec/` 类型与四个渲染器，选 3 个风格（`neo-brutalist`、`glassmorphism`、`editorial`）手写 spec 作为金标准样本，挂 `/api/design/[slug]/design.md`，写快照测试。新增 URL，不动旧页面。

阶段 1，主要成本：把 149 个风格的 `aiRules` / `globalCss` / `components.code` / `philosophy` 逆向成 spec。半自动抽取色值、字号阶、圆角与禁区句式，人工只补 `role` 与 `construction`。每批 20 个，`completeness` 标 partial。

阶段 2，单页切换：`/styles/[slug]` 逐批换新模板。每批 20 个 slug，同一 URL、同样语义的 title。这族占 23.1% 流量，是第一个动到主干的批次，发布后第 7 天对比这批 URL 的 position 与 clicks，无下滑再放下一批。旧模板保留到全部切换完成。

阶段 3，showcase 升级：`/styles/[slug]/showcase` 同 URL 替换内容为 DESIGN.md 可视化演示。**这族占 29.6%，是全站第一大流量面，不能当成阶段 2 的附属。**先取 3 个 slug（`corporate-clean`、`neumorphism`、`glassmorphism`，正好是流量前三）做完整验证，两周后确认 position、跳出率、停留时长都稳，再扩到每批 10 个。整批一次上线是这次改造里唯一能一次性打掉三成流量的操作。

阶段 4，导航与聚合页：导航收缩到 Styles / Collections / DESIGN.md / Docs，同时补齐内链补偿（相邻风格、双索引、页脚直达）。A 类聚合页（`/ui-prompts` 等）逐页重写。首页改版放在这一阶段而不是更早，因为 `/` 只占 3%，但它是指向三个 Tier 1 路由的枢纽，改了会连带改变内链分布。

阶段 5，清 bundle：`meta-registry.ts` 127 KB 只留 spec 字段；MCP 与 `llms.txt` 对齐；i18n 两个文件在确认无路由引用后瘦身。删除任何代码前，先确认对应 URL 仍在 sitemap 中且有页面渲染。

每阶段可独立发布。阶段 2 到 5 之间必须留出抓取周期，不留就等着看索引数掉。

## 九、风险

- 回填是人工密集型。149 个风格，每份 spec 保守估计 30 分钟（命名 + role + 构造句），即 75 小时。接受 `stub` 分批上线可摊到数月。
- 同 URL 内容替换仍有风险：若新内容与原搜索意图偏离，排名会掉。判据是「同一个 slug 的主题是否延续」，所以 showcase 升级必须保持风格不变，只换叙述方式。
- `aiRules` 是既有用户的实际依赖（Cursor 规则文件）。下线 IDE 规则导出前保留 `/api/styles/[slug]/claude-rules` 至少一个版本周期，或改为由 spec 渲染。
- 双语。spec 的 role/summary/imagery 都需 zh + en，内容成本翻倍；可先做 en，中文用 `stub` 兜底，但已有中文排名的 URL 不得降级为纯英文。
- 流量基线已经取到（1,019,487 次 pageview / 90 天 / 32,267 个路径），但它是站内行为，不等于 Google 的判定。每次发布仍要同时看 GSC 的 impressions 与 position，两者背离时以 GSC 为准。
- Umami 路径表里有噪音（把整段中文查询或外链粘进地址栏的记录，占不足 0.05%）。统计时按路由族聚合可以自动吞掉它们，不要用单条路径做决策。

基线复取方式（只读，不改服务器）：

```bash
# 页面级流量：Postgres 直查，pg 从 /www/umami/import/node_modules 解析
scp ops/analytics/query-umami-paths.mjs stylekit-jd:/tmp/
ssh stylekit-jd 'node /tmp/query-umami-paths.mjs --days 90 --limit 40000 --json /tmp/paths.json'
scp stylekit-jd:/tmp/paths.json .tmp/umami-full.json

# GSC 汇总：由 gsc-pull-117.sh 每日刷新，走本机 7890 代理
ssh stylekit-jd 'cat /www/umami/insights/gsc-latest.json'

# 索引面：发布前后各跑一次，removed 非零即失败
node tools/scripts/seo-sitemap-baseline.mjs --json .tmp/seo-before.json
node tools/scripts/seo-sitemap-baseline.mjs --compare .tmp/seo-before.json
```

拓扑：Umami 与 Postgres 在 `117.72.199.116`（`/www/umami`，连接串在 `/www/umami/.env` 的 `DATABASE_URL`）；GSC 拉取脚本与 token 在同机 `/www/umami/import/`；生产 Next 进程在 `59.110.91.219` 的 `/www/stylekit`，它只读 insights 快照，没有 Umami 登录凭据，所以别去那里找用户名密码。

## 十、本轮不做

不删任何路由，不改现有页面，不动 `lib/styles/*` 149 个数据文件，不动 `app/sitemap.ts` 与 `app/robots.ts`。第一步只产出 `lib/design-spec/` 的类型、四个渲染器与 3 份样本 spec，用测试证明输出与参考文档同构。
