# StyleKit 衍生工具成熟度审查

审查日期：2026-09-30。主仓库 HEAD：`39bffebc`；独立 skill 仓库 HEAD：`c2f7c32`。

**结论：这套工具已经具备可集成的 Beta 基础。继续提升的主要空间在规格一致性、验收可信度和完整页面交付，而不是继续增加风格数量或接入入口。** Skill 的流程设计比执行脚本成熟；MCP/Core 的工程基础比设计效果验证成熟。

本次检查了主仓库的 Core、MCP、CLI、HTTP API、shadcn registry、导出器、提取服务和 Experience Pack，也检查了 `/home/anx4758/stylekit-skill`。独立 `stylekit-mcp` 仓库是说明入口，源码在主仓库 `packages/mcp`。`agent/skills` 下的本地辅助技能没有被主仓库跟踪，其中包含第三方技能，不计入 StyleKit 已发布能力。

公开 skill 的 SKILL.md 与四个主要执行脚本已逐文件对照 GitHub main，均与本地一致。另下载了 npm `stylekit-mcp@0.2.5` 和 `stylekit-core@1.0.0-beta.4` 的实际 tarball，对 Core 数据及 MCP stdio 工具做了检查。npm MCP 测试复用了本地已安装的 SDK 依赖；本次没有重做全新消费者依赖安装。

## 1. 当前水平

以下评级是基于此次代码审查和运行证据的工程判断，不是市场排名或用户效果统计。

| 工具 | 当前判断 | 已有价值 | 主要缺口 |
| --- | --- | --- | --- |
| 独立 StyleKit skill | 流程完整，执行可靠性需要修复 | 上下文检测、选型、取规格、生成、验收，以及迁移/修饰任务分流 | 配方解析和检索有实际错误；验收漏报；没有完整 skill 的效果证明 |
| MCP | 可集成 Beta | 六个只读工具、Zod schema、结构化输出、分页、错误提示、stdio smoke | 规格信息不完整；本地/联网能力断层；校验通过含义不够明确 |
| Core | 有价值的共享基础库 | 离线目录、tokens、recipes、搜索、可访问性辅助、质量元数据 | 数据与规则存在冲突；质量字段主要衡量覆盖；包体积超预算 |
| CLI | 稳定的查询型 Beta | 无运行时依赖的离线查询、JSON 输出、错误码、消费者 tarball smoke 发布流程 | 缺少 lint/项目验收；recipe 无参数化入口 |
| HTTP API / shadcn registry | 有效的分发入口 | 在线规格与主题可获取；registry 可以投影语义色与圆角 | HTTP、Core、skill 对同一数据结构的理解不一致；安装主题还不足以交付布局、效果和交互 |
| Tailwind / Figma / IDE / skill 导出 | 完成度不一致 | 多格式接入降低使用成本 | Tailwind JS 有语法错误；Figma 多项值固定；多个导出入口仍有旧域名 |
| Experience Pack | 较接近可验收交付，但只覆盖一个样板 | 独立源码、资产哈希、来源记录、安装与业务状态证据 | 目前只有一个 preview pack；尚未成为 skill/MCP 的主要交付路径 |
| URL 提取服务 | 有实际能力，生产边界仍需补齐 | computed styles、字体、交互/动效捕获、manifest 转换、认证和资源保护 | 重定向/子请求出站保护、并发槽位和超时边界有静态代码风险 |

值得保留的架构：MCP 与 CLI 共用 Core/discovery；Core 从主目录构建；联网搜索有超时、缓存、熔断与离线回退；MCP 提供结构化结果和只读注解。这些是实际的产品基础。

协议审查参考 [MCP Tools 规范](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) 中的 inputSchema、outputSchema、structuredContent 与错误约定。Skill 包结构参考 [Agent Skills 规范](https://agentskills.io/specification)。缺少 MCP resources/prompts 或远程 HTTP，并不自动构成协议缺陷；它们应按实际用户场景决定。

## 2. 全目录实测

本地构建 Core 的 148 个风格均有 tokens、recipes 和 button/card/input 模板。项目的 catalog integrity 检查通过。

| 项目自身的指标 | 结果 | 解释 |
| --- | --- | --- |
| 风格数 | 148 | 与在线 `/api/styles` 数量一致 |
| tokens / recipes 覆盖 | 148 / 148 | 存在数据，不代表每份输出已验收 |
| 专门编写的 readiness profile | 9 | 其余 139 使用 fallback profile |
| 暗色 readiness | partial 9、fallback 22、missing 117 | 没有 complete；不等于这些风格完全无法做暗色 UI |
| accessibility-review-needed 标记 | 77 | 来自项目自身的静态评分，不是浏览器 WCAG 审计结论 |
| 有 variants 的风格 | 136 | 当前 MCP recipe 调用不能指定 variant/params/slots |

`curated` 在这里指 readiness 的人工编写覆盖，不能把 139 个 baseline 解读成 139 个视觉设计质量差的风格。相关实现：[`quality.ts`](../lib/styles/quality.ts)、[`readiness.ts`](../lib/styles/readiness.ts)。

对 444 个默认渲染的核心配方、444 个核心模板，调用项目自身 `lintStyleCode`：

- 13 个配方触发 forbidden；263 个配方报告 missingRequired。
- 43 个模板触发 forbidden；250 个模板报告 missingRequired。
- missingRequired 统计包含等价 CSS 写法和不同状态要求造成的误报，不能直接解释为坏组件数量。
- forbidden 也需要区分规则范围问题与数据错误，但至少证明“官方配方”和“官方校验器”尚未形成一致契约。

一个已在 npm MCP 上复现的例子：`stylekit_get_component_recipe("swiss-style", "button")` 返回 `rounded-sm`，随后 `stylekit_lint_code` 报告它违反 `^rounded-(?!none)`，建议改为 `rounded-none`。

另用 skill 的 `verify-spec.py` 对同一份本地全目录数据检查，得到 0 issues、112 个风格有 notices、共 385 notices。这不是数据已全部通过验证的证据：它与 TypeScript 校验器采用不同规则和豁免方式。

## 3. 最需要修复的问题

### P1：Skill 拉取配方时丢失内容

位置：独立 skill 的 [`fetch-style.py:50`](https://github.com/AnxForever/stylekit-skill/blob/main/scripts/fetch-style.py#L50)；生产 API 结构见 [`app/api/styles/[slug]/route.ts`](../app/api/styles/[slug]/route.ts)。

生产响应是 `recipes: { styleSlug, recipes: { button, card, input, ... } }`。脚本只识别 `components` 包装，没有展开 `recipes.recipes`。

实际执行：

```bash
python3 /home/anx4758/stylekit-skill/scripts/fetch-style.py glassmorphism --recipes
```

输出只有 STYLE 信息和 `RECIPES / recipes:`，没有 button/card/input 配方。默认 full 模式还没有单独输出 philosophy、components 代码与 globalCss，尽管 SKILL.md 要求代理使用这些字段。aiRules 内部可能自带示例，但不能据此认为模板和全局 CSS 已被完整传递。

建议：规范化 API 响应后输出一个有 schemaVersion 的 JSON，文本只是它的阅读视图；用真实响应样本验证展开结构及关键字段。

### P1：Skill 搜索的过滤逻辑有错误

位置：[`fetch-style.py:96`](https://github.com/AnxForever/stylekit-skill/blob/main/scripts/fetch-style.py#L96)。

列表推导里意外出现了第二个 `if`，slug/name/description 匹配与 keywords/tags 判断变成串联过滤。

```bash
python3 /home/anx4758/stylekit-skill/scripts/fetch-style.py --search glassmorphism
# No styles match 'glassmorphism'.
```

在本次线上目录中精确 slug 搜索失败；受控样本也复现了这个问题。建议复用统一检索接口，或至少为精确 slug、关键词、标签、中文查询分别保留行为样本。

### P1：两个验收器的判断差异很大

位置：skill [`eval-check.py:44`](https://github.com/AnxForever/stylekit-skill/blob/main/scripts/eval-check.py#L44)、主仓库 [`style-linter.ts`](../lib/styles/style-linter.ts)。

针对同一个禁止 `rounded-lg` 的规格，受控测试结果：

| 输入 | Python skill evaluator | TypeScript/Core evaluator |
| --- | --- | --- |
| `className="rounded-lg"` | 报错 | 报错 |
| `className="md:rounded-lg"` | 漏报 | 报错 |
| `className={cn("rounded-lg")}` | 漏报 | 报错 |
| HTML `class="rounded-lg"` | 漏报 | 报错 |

Python 只交集匹配完整 token，没有拆 variant，也没有支持 HTML class 和 helper 表达式；没有执行 `forbidden.patterns`。颜色检查主要扫描 hex，不能完整验证命名色、CSS 变量或透明度。`--dir` 包含 CSS 文件，但没有对应的 CSS 规则解析。

同时，TypeScript/Core 的 `ok` 只取决于 forbidden：即使传了 checkRequired 且必需项大量缺失，仍可返回 `ok: true`。这个行为是当前实现明确规定的，不是偶发异常；但它与“验收通过”的常见理解不一致。npm MCP 的 `<button className="px-4" />` 实测就是这种结果。

建议：共享规范化规则与测试向量，逐步收敛到一个引擎；增加 `status: pass | fail | inconclusive`、`coverage` 和 `unsupportedSyntax`。将组件级必需项纳入显式 strict 模式；动态 class、未解析代码必须显示检查范围。必需项需关联组件/元素与状态，不能仅用全文件 class 集合证明。

### P1：官方配方、模板、required 与 forbidden 不一致

全目录结果见上。应优先修正数据/规则意图，再强化 gate，避免代理复制官方配方后被迫反复修补。

建议用可执行的统一组件定义派生模板、配方与约束。人工审核 13 个配方 forbidden 冲突；对 missingRequired 建立等价值归一化与状态范围，避免直接要求两种 shadow 或 focus 写法同时存在。

skill 的 `verify-spec.py` 也需要校正两处规则：

- 颜色校验先把被检查的 token colors 全部加入 `defined_colors`，然后再检查相同字段，缺少独立依据，不能发现这部分未定义颜色问题。
- 小元素豁免搜索邻近文本；同一模板中任意小元素命中即可豁免该 class 的冲突，范围过宽。

不要通过削弱检测来换取更高的 pass rate。

### P1：Tailwind preset 导出不是合法 JavaScript

位置：[`tailwind-preset.ts:107`](../lib/export/tailwind-preset.ts)。

代码移除了所有对象键的引号，包括 `accent-1`、`brutal-md`，因此生成文件出现 `accent-1: ...`。实际把 neo-brutalist 导出交给 JavaScript 解析器得到：`SyntaxError: Unexpected token '-'`。

建议保留 JSON 键引号，并提供独立的 Tailwind v4 CSS `@theme` 导出。现有 JS preset 应明确适用版本，不能用一个格式宣称所有 Tailwind 接入都已完成。

### P1：GitHub lint Action 接到了不存在的入口

位置：[`.github/actions/stylekit-lint/action.yml`](../.github/actions/stylekit-lint/action.yml)。

它安装 `@stylekit/core`，本次 npm registry 查询返回 404；实际包名是 `stylekit-core`。随后调用 `npx stylekit lint`，而当前 StyleKit CLI 只有 list/search/show/tokens/recipe/add，没有 lint 子命令。

建议先交付并发布明确的 CLI lint 入口，再让 Action 复用它。验收应在新消费者项目中运行并检查真实错误注解与退出码。

### P2：项目检测会漏掉常见 shadcn 安装

位置：[`detect-project.py:82`](https://github.com/AnxForever/stylekit-skill/blob/main/scripts/detect-project.py#L82)。

脚本把 `@/components` 当作物理路径，并枚举目录而不是 `components/ui/*.tsx`。受控项目有 `src/components/ui/button.tsx`、常见 aliases 与 tsconfig paths，结果仍为 `installedComponents: []`。安装了 `stylekit-core` 也返回 `styleKitInstalled: false`，因为脚本查的是其他包名。

建议解析 ui alias 和 tsconfig paths、枚举组件文件；按实际包名识别安装。CSS 扫描也应剪枝 node_modules/.next/dist，而不是先递归整个项目再筛结果。

### P2：MCP 不是完整规格交付入口

`stylekit_get_style` 没有 aiRules、globalCss、完整组件模板或详细 readiness；recipe 也不能指定 variant、params、slots。它能够提供风格信息，但与 skill 的生成契约不同。

联网 search/detail 能认识 bundle 外的风格，recipe/install/lint 仍使用本地 slug 判断。受控新风格测试：detail 成功，recipe 和 install 却报 Unknown style。联网 detail 还把 `{styleSlug, recipes}` 的键直接作为 recipeIds，结果是 `["styleSlug", "recipes"]`。

建议增加一个聚合的 `stylekit_get_implementation_brief`，输出规则、tokens、相关配方、必要 CSS、状态要求与明确的 capability。遇到 bundle 外风格，应区分 unknown、known-but-unsupported、upgrade-required，不能伪报不存在。

### P2：发布检查会同时产生误报与漏报

本次 `check:published` 报 core beta.4 未发布，但 npm 实际已有 beta.4，挂在 `beta` tag；`latest` 指向 beta.3。这是 tag 策略，不应直接说 beta.4 不存在。

它又报告 MCP 0.2.5 与本地匹配，但 npm tarball 与本地实现不同：本地 search 具有 hybrid/keyword/local ranking 输出与 `/api/search` 路径，公开 0.2.5 没有这套 ranking 输出。单纯用版本和包体积差 2% 不能证明功能一致。

建议按版本是否存在、目标 dist-tag、标准化产物 hash、catalog hash、规则 hash、schemaVersion 分别比较；发布 tarball 后对 exact artifact 做行为验证。输出 source/specVersion/catalogHash/fallbackReason，让代理可以识别快照及降级。

### P2：部分导出仍是通用默认值

[`figma-tokens.ts`](../lib/export/figma-tokens.ts) 的 background、foreground、字体、字号、间距和多项阴影固定，主要变化来自简化配色。它是有效的起始模板，尚不能代表所有风格的完整 tokens 保真导出。`ide-configs.ts`、`skill-pack.ts` 仍引用 `stylekit.dev`。

建议所有导出先通过同一个语义 token 转换层，再投影到各格式；明确声明无法无损映射的 blur、纹理、动效和布局。

### P2：提取服务还有可定位的生产边界风险

静态审查发现：

- [`extract.ts`](../services/style-extract/src/extract.ts) 为初始 hostname 固定 DNS，但没有实现注释所说的每次主框架导航复核，也没有 context request 路由出站守卫。跳转到其他 hostname 和页面子请求没有同等检查；需结合部署网络策略评估，不能把初始 URL 检查视为完整 SSRF 防护。
- [`server.ts`](../services/style-extract/src/server.ts) 在读取 body 和 DNS 检查之后才设置 inFlight。并发请求可能同时通过前面的空闲检查，违反单槽位保护。
- browser launch 在 total deadline 外；deadline timer 没有清理，browser.close 也没有独立清理期限。

本次没有攻击线上服务，也没有重做 extractor 浏览器端到端验证。建议原子获取工作槽、覆盖所有浏览器出站请求并固定解析结果，或以专用出站代理/网络策略提供更强的边界；总期限覆盖 launch、工作和有界清理。

## 4. 现有 benchmark 能说明什么

默认 fixture benchmark 实测：without-skill 0/4，with-skill 4/4。

它证明固定样本能被当前 evaluator 区分，不证明真实模型使用 skill 后提升了多少：

- 只有两个风格、button/card 四个任务。
- baseline 固定为 generic Tailwind；with-skill 使用官方模板并修正 hex。
- evaluator 与 skill 使用同一套规则，缺少独立的运行/视觉评价。
- 即使 `--llm` 模式，当前主要测规格注入；没有验证完整的检测、选型、安装、生成、修复流程。两组 prompt 对目标风格的信息也应保持对等。

不建议把 4/4 描述为“生成 UI 质量提升到 100%”。本次没有调用付费模型，也没有获得真实用户成功率。

下一轮先设计 12 个相同目标风格与业务要求的任务，每个三次重复、两组对照，共 72 次输出。覆盖页面生成、现有项目 restyle、风格迁移和反馈修复，记录模型版本及输入规格 hash。评价至少包括：编译成功、核心流程完成、风格违规、人工盲评截图、移动端溢出、键盘/状态完整性、修复轮数、时延与成本。样本与评分口径先定，再跑实验。

## 5. 最值得推进的路线

### 第一阶段：把“读到”和“验证到”的事实对齐

1. 修复 skill 配方解析、检索、alias 检测、Tailwind 导出与 Action 入口。
2. 统一 schema、规则和跨语言行为样本；区分 pass/fail/inconclusive。
3. 人工解决官方配方的 forbidden 冲突，并处理 required 等价语义。
4. 修复发布检查的 tag 与产物判断；验证公开 tarball 而不只验证源码。

完成标准：入口拿到同一版本规格；官方核心配方在明确模式下通过自己的规则；任何解析失败都可见；发布检查正确识别 beta 与 latest。

### 第二阶段：提供项目级 implementation brief

在现有 Core 上建立统一的规格投影，不必引入复杂的新平台。brief 包含业务场景、允许定制范围、语义 tokens、组件/布局配方、CSS/资产、交互状态、检查范围与来源版本。Skill 负责调度流程，MCP/CLI/API 提供同一份数据和验收入口。

把“所有 class 都必须来自 token 表”的绝对要求改为更可执行的契约：身份关键值受约束，布局和业务结构允许合理变化；可访问性与项目约束有明确的优先级。否则严格规则会压缩组合能力，却未必提高结果。

### 第三阶段：做少量完整场景，并测量真实效果

从现有 9 个 curated readiness 风格中选高需求方向，先交付 landing、dashboard、form、data table 的完整结构与状态。沿用 Experience Pack 已有的独立安装、来源与截图证据机制，并将它接到代理工作流。

用上一节实验验证：是否更少跑偏、更少修复、更容易集成，最终页面是否有更强的风格辨识度。指标改善后再扩大到其余目录。优先级是提高每个场景的成功率，然后才是增加更多风格、客户端或远程 MCP。

## 6. 本次验证结果与边界

| 检查 | 结果 |
| --- | --- |
| `pnpm run lint` | 通过，0 errors / 29 warnings |
| `npx tsc --noEmit` | 通过 |
| `pnpm run test` | 7,838 passed / 1 skipped / 1 failed，269 个文件中 268 通过 |
| 单测失败原因 | 原有未跟踪研究文件 `docs/STYLE_RESEARCH_2026-09-28.html` 的 U+2197 被禁 emoji 检查捕获 |
| `pnpm run build` | 通过 |
| `pnpm run test:developer-packages` | Core build/typecheck、CLI build/smoke、MCP build/smoke 通过；末尾包体积检查失败 |
| 包体积 | Core 12.16 MB 超过 12.00 MB 预算；CLI 5.34 MB、MCP 5.39 MB 均在预算内 |
| `pnpm run check:catalog` | 通过，148 个风格结构覆盖完整 |
| `pnpm run check:experience-packs` | 通过，1 pack、9 files、3 assets、3 evidence scenes、3 claims |
| 在线 API 与 registry | `/api/styles`、两个核心风格详情、glassmorphism registry 返回 200 |
| npm MCP 实际运行 | 六工具注册、查询/配方调用和校验反例已检查 |
| 发布检查 | 失败；包含前文说明的 core dist-tag 误判 |

规则 grounding 与语言 parity 脚本也运行了，但它们是启发式报告：98 个引用值候选、39 个结构差异、19 个字段语言候选不能直接视为同数量的内容错误，故不用于计算缺陷率。

本次保留了原有未提交文件，只新增此报告和精简证据 JSON。没有修改产品/skill 实现，没有发布、提交或部署。没有执行完整 E2E、所有 registry 安装或 Experience Pack 新消费者安装；已有源码/历史证明与本次实际执行明确区分。

精简证据：[tooling-audit-2026-09-30.json](examples/tooling-audit-2026-09-30.json)。详细运行日志和探针输出位于 `/tmp/stylekit-tooling-audit-ssONtz/`。
