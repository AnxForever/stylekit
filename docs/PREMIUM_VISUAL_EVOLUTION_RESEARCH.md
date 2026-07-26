# StyleKit 收费级视觉进化研究与执行方案

> 状态：执行中
> 最后更新：2026-07-26
> 范围：只新增隔离的 Premium 展示能力，不修改现有卡片、首页视觉、公开风格详情和 135 个已批准 Showcase。

## 1. 结论先行

StyleKit 现在的问题不是“效果数量不够”，而是用户看不到一条完整、可信、值得付费的价值证据链。

仓库已经拥有完整的风格与 Showcase 目录、57 条动画元数据、19 个鼠标交互房间、约 35 个模板页面、生成器、ZIP 能力和 Experience Pack Schema。历史上积累的 96 张未接入或未完成来源审核的风格 WebP 已从当前分支清理。继续给现有卡片叠加光效、粒子或缩放不会自然变成收费产品，反而会增加视觉噪声和性能风险。

收费级展示应该把已有能力重新编排为：

```text
情绪图 / 视觉方向
        ↓
真实页面结果（桌面、移动、暗色）
        ↓
组件与业务状态（空、错、载入、成功）
        ↓
动效和交互（可降级、可解释）
        ↓
文件、安装、许可和验证证据
        ↓
价格与购买判断
```

因此今晚采用两层策略：

1. 在 `/admin/visual-lab` 建立隐藏、`noindex`、不接入导航的视觉实验室，用一张主图和一个辅助动效验证视觉方向。
2. 收敛到第一个独立 Premium Preview；优先候选是 Corporate Clean SaaS，但现有办公室图库不能作为收费级主视觉，必须换成原创或明确授权的产品场景和真实界面证据。

## 2. 不可触碰边界

以下内容默认冻结，任何 Premium 实验都不得直接修改：

- `components/home/style-card.tsx`
- `components/home/home-style-card.tsx`
- `components/style-preview/style-cover-preview.tsx`
- `app/styles/*/showcase/_content.tsx` 中的现有定制 Showcase
- 首页、风格目录和详情页现有的颜色、排版、布局与已批准外观
- 现有 135 个预览的桌面与移动视觉基线

接入规则：

- 新视觉先进入后台实验室或未公开、`noindex` 的独立路由。
- 不在获得明确视觉批准前接入首页、卡片、风格详情或公开导航。
- 不把 Premium CSS 写入全局视觉层；使用 CSS Module、局部容器或 iframe 隔离。
- 旧设计永远保留，Premium 是新增层，不是替换层。

## 3. 项目事实基线

### 3.1 已有能力

| 能力 | 当前事实 | 判断 |
| --- | --- | --- |
| 风格 | `lib/styles/registry.ts` 注册 135 个 | 内容覆盖广，不应继续盲目扩量 |
| Showcase | 135 个定制 + 1 个通用源码 | 是巨大的视觉研究资产，但未统一成可售合同 |
| 图片 | `public/images/styles` 仅保留沉浸摄影页使用的 3 组 AVIF/WebP fallback，约 31 KiB | 运行时引用明确，但来源与许可仍待补齐 |
| 动画 | 57 条动画元数据，约 59 个实现目录 | 数量充足，缺少付费场景编排与统一预算 |
| 指针交互 | 19 个 Cursor Room + 轻量 Pointer 原语 | 轻量原语可复用，完整 Cursor Lab 不宜直接上首屏 |
| 模板 | 约 35 个 SaaS、后台、CRM、博客、商业页模板 | 可拆成 Pack 原料，目前多为单页展示或单文件下载 |
| Style Pack | tokens、CSS、preset、shadcn theme、SKILL.md | 不是多文件可安装产品，不能包装成完整收费 Pack |
| Experience Pack | Schema 与测试已存在 | 合同已有，尚无真实 manifest 与产品实例 |

### 3.2 当前视觉缺口

- 首页首先表达“有很多风格”，而不是“安装后可以得到什么完整成果”。
- 图片、Showcase、组件、动效和下载能力彼此割裂。
- 很多风格仍以提示词和 token 为主，缺少真实页面场景、图片导演、业务状态和交付证明。
- 当前没有 Pack Offer、许可摘要、价格、退款与更新边界、安装证明或购买入口。
- 没有对比“免费风格参考”和“收费完整产品”的清晰层级。
- 现有图片池没有完整逐图 provenance，暂时不具备收费分发条件。

### 3.3 当前图片判断

清理前的首轮抽查：

- Editorial：黑白人物轮廓、负空间与服装造型具有较强版式价值，适合研究图片裁剪和滚动叙事。
- Cyberpunk Neon：环境氛围强，适合研究单张主图、灯光层和轻量镜头漂移，但移动端、对比度和 GPU 风险更高。
- Corporate Clean：现有办公室与西装人物图片图库感明显，只能作为反例，不能支撑收费级 B2B 产品叙事。

实验素材只用于内部构图研究。未完成来源、作者、许可、分发权和证据快照审核前，不进入收费 Pack。

### 3.4 2026-07-11 可重复资产审计

新增命令：

```bash
pnpm audit:style-images
```

清理未引用研究图后的实测结果：

| 指标 | 结果 | 商业判断 |
| --- | ---: | --- |
| WebP 文件 | 3 | 仅作为沉浸摄影页的运行时 fallback |
| 已覆盖风格 | 1 | 不代表已有可售视觉包 |
| 缺少 provenance | 3 | 全部阻止进入收费分发 |
| 单文件超过 500 KiB | 0 | 已移除未引用的大文件 |
| 可用于收费再分发 | 0 | 必须从原创、委托或明确授权资产重新建立 |

审计会读取真实文件尺寸、像素尺寸与 SHA-256，并检查相邻的
`*.provenance.json`。即使未来补齐 Unsplash 的照片 ID、摄影师、来源、下载追踪和哈希，状态也只能变为
`research-only`，不能自动成为收费 Pack 资产。

`tools/scripts/generate-style-images.mjs` 现已对未来下载强制写入 provenance，并记录：

- Unsplash photo ID、查询词、摄影师和带 UTM 的来源链接；
- `download_location` 追踪是否成功；
- 原始尺寸、请求转换、获取时间和内容哈希；
- `internal-visual-research`、`distributable: false`、`auditStatus: pending`；
- API 文档、API Guidelines 与 Triggering a Download 证据入口。

Unsplash 官方 API 文档同时要求应用展示 API 返回图片时使用其 CDN hotlink，并保留 `ixid`。因此本地缓存脚本现在必须显式设置
`STYLEKIT_UNSPLASH_RESEARCH_ACK=internal-only` 才会运行；它只用于内部构图研究，不能作为公开页面或收费 Pack 的正式素材管线。公开展示若继续使用 Unsplash API，应按 hotlink、署名和下载追踪规则实现；收费分发则优先使用 StyleKit 自有、委托或拥有明确再分发权的资产。

历史研究图片不会被脚本猜测补录，因为无法从文件本身可靠恢复摄影师、照片 ID 和下载事件。未引用文件已从当前分支移除；剩余运行时图片后续只能重新获取有完整证据的素材，或用原创资产替代。

## 4. 对标样本与可吸收模式

收费级视觉不是把某个热门网站完整复制进 StyleKit，而是从不同产品各取一个长处，再由 StyleKit 的产品合同统一约束。

| 样本 | 值得吸收 | 不应照搬 |
| --- | --- | --- |
| [Linear](https://linear.app/) | 产品界面本身承担主视觉；每个章节围绕真实工作流和结果展开；暗色氛围服务于产品层级 | 大量首页专用插画、轮播和复杂依赖不适合出现在 135 个目录卡片中 |
| [Raycast](https://www.raycast.com/) | 用真实扩展、界面截图和生态内容证明产品丰富度；图片不是抽象占位 | 不把大量应用卡片直接搬成 StyleKit 的另一套目录 |
| [Stripe](https://stripe.com/) | 复杂视觉始终对应一个产品概念；动效被隔离在具体讲解模块中；商业路径清楚 | 不复制品牌插画、渐变和专有产品图形，也不以多色渐变代替风格差异 |
| [Vercel](https://vercel.com/) | 克制的灰阶、清晰层级、产品证据和极少强调色；视觉为可信度服务 | 不把所有风格都压成同一种黑白开发者工具外观 |
| [Framer](https://www.framer.com/) | 大量真实成品、模板和交互示例直接证明“可以做出什么”；文字与媒体组合多样 | 不把页面变成自动播放效果合集，不承担全站级重运行时成本 |
| [Awwwards](https://www.awwwards.com/) | 发现图片导演、章节节奏、实验交互和新型排版 | 获奖感不等于可售、可访问、可安装；不能把评审型炫技作为默认产品规范 |
| [Godly](https://godly.website/) | 快速观察高完成度 Hero、产品摄影、3D 和视觉节奏 | 截图只能作为灵感索引，不能反推资产权利，也不能机械复制同质化 Hero |
| [Land-book](https://land-book.com/) / [Lapa Ninja](https://www.lapa.ninja/) | 研究 SaaS、定价、作品集和落地页的信息结构 | 不按图库热度批量生成风格；先服务第一个可售 ICP 场景 |
| [Mobbin](https://mobbin.com/) / [SaaSFrame](https://www.saasframe.io/) / [Refero](https://refero.design/) | 学习真实产品流程、状态覆盖、付费页和 onboarding 证据 | 不只截取单个漂亮页面；需要完整用户路径和状态合同 |

综合后，StyleKit 采用“百家之长”的方式应是：

- 从 Linear、Raycast 学产品证据；
- 从 Stripe 学视觉与产品概念的一一对应；
- 从 Vercel 学克制、可信与可访问的基础层；
- 从 Framer 学用真实成品证明能力；
- 从 Awwwards、Godly 学单个视觉高潮和图片导演；
- 从 Mobbin、SaaSFrame 学完整业务流程和状态覆盖；
- 最后由 StyleKit 的 manifest、许可、性能、安装和回归测试把它们收敛成一个可交付产品。

### 4.1 2026-07-11 收费产品模式实证矩阵

本轮不再只记录灵感网站入口，而是读取可访问的官方首页、产品页与价格页，观察“媒体如何证明价值、免费层如何引导付费、用户最终买到什么”。数字和产品描述只作为当日页面快照，不作为长期不变事实。

| 产品与官方证据 | 图片 / 动效承担的工作 | 实际收费或产品深度 | StyleKit 决策 |
| --- | --- | --- | --- |
| [Mobbin 首页](https://mobbin.com/) / [价格页](https://mobbin.com/pricing) | 单张截图只是入口；真正价值是完整 Flow、Video、逐屏 Prototype、搜索与历史版本。官方页在 2026-07-11 显示 621,500+ screens、323,900 flows，Pro 将完整 flows、animations、批量下载和历史作为付费深度 | 免费层保留最近少量内容和有限搜索；Pro 年付折算 $10/月，Team 年付 $16/席位/月 | **REUSE** “免费可判断、付费看完整流程”的分层；**ADAPT** 为 StyleKit 的“免费风格概览、付费完整页面/状态/安装”；**REJECT** 只堆孤立截图 |
| [Refero](https://refero.design/) / [Refero Styles](https://styles.refero.design/) | 真实产品截图负责可信参考；AI-readable DESIGN.md 把视觉进一步变成可供 Cursor、Claude Code、Codex、v0、Lovable 使用的结构化上下文 | 产品从“看图”延伸到“让 Agent 先研究再生成”，Styles 页面宣称 2,000+ AI-readable design systems | **REUSE** 每个收费 Pack 同时提供视觉证据与机器可读规则；**ADAPT** 到 StyleKit manifest、SKILL.md 和验证规则；不复制第三方设计系统内容 |
| [Aceternity UI](https://ui.aceternity.com/) / [All-Access](https://ui.aceternity.com/pricing) | 大尺寸 WebP 组合展示 Hero、3D、模板章节；媒体直接展示“复制后会得到什么”，而不是装饰背景 | 官方页强调 200+ production-ready components、blocks、templates，免费组件引流，All-Access 用一次购买解锁 Premium blocks/templates | **ADAPT** 一个 Pack 用 3–5 个高信息密度成品画面证明完整度；**REJECT** 在目录同时加载大量高分辨率图片或把 Framer Motion 当作收费本身 |
| [21st.dev](https://21st.dev/) | 组件以可运行视觉结果和细分类别被发现，首页把 Heroes、Backgrounds、Features、Shaders、Themes、Templates 分开 | 社区 Registry 的价值是“crafted、可筛选、可直接进入构建”，不是只有一张漂亮封面 | **REUSE** 风格、Block、Template、Asset、Motion 分层；**ADAPT** 来源、兼容性、质量和性能筛选；**REJECT** 把所有社区效果默认视为可商用 Pack 资产 |
| [Magic UI](https://magicui.design/) / [Magic UI Pro](https://pro.magicui.design/) | 每个完整模板使用短视频直接证明滚动、响应和微交互；价格区用 ROI Calculator 把视觉价值转换成时间与成本 | 官方页展示一次性 $49、50+ components/templates，并用同日实现、响应式、动画和 SEO 作为交付理由 | **ADAPT** 未来公开 Offer 使用 3–6 秒、poster 优先、用户可暂停的单个演示视频；使用真实安装时间和支持成本证明 ROI；**REJECT** 同屏多个 autoplay loop 视频和未经数据支持的夸张节省比例 |
| [Framer Marketplace](https://www.framer.com/marketplace/) | 模板封面和实时站点预览承担“结果先行”，分类与创作者生态承担长尾发现 | 官方描述 2,000+ responsive templates 与 60+ plugins，模板是可直接定制和发布的产品单位 | **LEARN-FROM** 成品优先和创作者署名；首个 Pack 通过成交/安装闸门前，**REJECT** 建设大而全 Marketplace |

本轮形成的媒体层级：

```text
目录：保留现有静态卡片，不新增运行时
  → Pack Offer：1 张主结果图 + 2–4 张状态/设备证据图
    → 主动播放：最多 1 个短视频或 1 个实时 Preview
      → 付费交付：完整页面、状态、资产、动效、安装与 Agent 上下文
```

这意味着 StyleKit 的第一批新增图片应该来自自身可安装代码的确定性截图，而不是外部图库；第一批动效应该证明真实交互和响应式结果，而不是给卡片增加装饰性运动。

### 4.2 2026-07-11 收费产品模式更新

本轮补充观察的重点不是网站表面风格，而是用户为什么付费：

| 产品 | 当前公开证据 | 对 StyleKit 的决策 |
| --- | --- | --- |
| [Refero Pricing](https://refero.design/pricing) | 公开页强调 135,000+ Web/iOS screens、完整 User Flows、每周新增、完整尺寸截图、高级筛选、Figma 插件与 Refero MCP；免费层只开放约 3% | **ADAPT**：未来让 Agent 在生成前检索 StyleKit 的真实 Pack 状态与模式；不复制截图订阅模式 |
| [SaaSFrame Pricing](https://www.saasframe.io/pricing) | 公开价格约为月付 $14、季付折合 $12/月、年付折合 $10/月；价值集中在 desktop/mobile、Figma、flows、筛选和收藏 | **LEARN-FROM**：同一成品必须并列展示桌面和手机；持续更新与收藏是留存能力，不是首个 Pack 的成交前提 |
| [21st.dev](https://21st.dev/) | 首页直接承诺 handcrafted components/templates 与精确筛选，分类包含 Themes、Templates、Heroes、Backgrounds、Shaders | **ADAPT**：StyleKit 的付费对象应是经过人工导演、可安装的完整组合，而不是无限扩充单个效果 |
| [Aceternity UI Components](https://ui.aceternity.com/components) | 公开展示 200+ copy-paste 组件，并把 Hero、Illustration、Empty State、Pricing、Sidebar 等完整 Blocks 放进 all-access；图片、Canvas、Shader、3D 与微交互均可现场预览 | **LEARN-FROM**：现场预览很重要，但必须配套状态、触屏、低动效和性能合同；拒绝把所有特效同时放入一个页面 |
| [Page Flows](https://pageflows.com/) | 公开搜索摘要展示按订阅解锁完整用户流程和屏幕库，并用低价短试用降低首次付费阻力 | **LEARN-FROM**：用户愿意为完整流程与节省研究时间付费；StyleKit 应进一步把流程变成可安装源码，而不只提供参考 |

本轮修正后的竞争定位：

```text
截图库：告诉用户“别人怎么做”
动效组件库：告诉用户“这个效果怎么写”
StyleKit Paid Apply：把图片、完整页面、业务状态、动效、许可和安装证明一起交付
```

因此不把 StyleKit 做成更大的截图图库，也不与特效组件库比效果数量。更合理的收费理由是：用户选择一个方向后，能把同一套经过验证的视觉系统安装进真实项目，并看见它在桌面、手机、状态变化、低动效和失败场景中的完整表现。

### 4.3 八个平台的官方价格与付费边界快照

> 核对日期：2026-07-11。价格和套餐可能变化；Refero 官方 API 返回的 MCP 套餐周期存在不明确项，正式对外引用前必须再次核对。

| 平台 | 收费证据链 | 免费 / 付费边界 | 当前官方价格快照 | StyleKit 决策 |
| --- | --- | --- | --- | --- |
| [Mobbin](https://mobbin.com/pricing) | 真实产品截图、流程视频、热点原型、动画检索、应用历史、Figma 与 MCP | Free 仅少量最新应用、有限搜索与 3 个收藏；Pro 解锁完整内容、动画、批量下载和无限收藏；Team 加协作与管理 | Pro $10/月（年付）；Team $16/成员/月（年付） | **ADAPT** 完整流程、动画资料和收藏；**REJECT** 搬运真实产品截图作为收费资产 |
| [Refero](https://refero.design/) | Screens、flows、patterns、相似图、视觉搜索、周更、Figma、MCP、Agent Skill | Free 边界当前页面不够透明；Pro、Team 与 MCP 分层 | [官方 API](https://api.refero.design/v1/subscription_plans?key=mcp) 返回 Pro $17/月或 $120/年；另有 MCP $20 与 $140 项，周期需复核 | **ADAPT** 同一结构化内容服务人与 Agent；不复制截图订阅本身 |
| [SaaSFrame](https://www.saasframe.io/pricing) | 完整营销页、产品界面、section、flow、桌面/手机、Figma、筛选、版本和收藏 | 免费浏览部分索引；Pro 解锁完整浏览、搜索、移动版、收藏与 Figma | $14/月；季度折合 $12/月；年度折合 $10/月 | **REUSE** 桌面/手机并列证据；**LEARN-FROM** flow 与版本，不先做大图库 |
| [Pageflows](https://pageflows.com/pricing/) | 真实操作流程录像、截图、邮件、UI 元素、批量下载与收藏 | 低价 3 日试用；订阅解锁全部内容；Team 增加共享收藏与集中账单 | 试用 $2.95；季度 $13/月；年度 $99；Team $199/年含 3 用户 | **ADAPT** 连续过程和状态；StyleKit 进一步交付可运行源码，而非只交参考 |
| [21st.dev](https://21st.dev/pricing) | 可运行组件、主题、模板、live sandbox、语义搜索、CLI、MCP、私有团队库 | Hobby 可浏览但限制复制/安装与 MCP；Builder 解锁高频使用；Team 加共享与管理 | Hobby $0；Builder $8/月（季付）；Team $10/席位/月（季付） | **REUSE** 免费探索、付费卖高频交付；**ADAPT** 到完整 Experience Pack |
| [Aceternity UI](https://ui.aceternity.com/pricing) | 免费实时动效组件获客；付费卖完整 Blocks、Templates、ZIP、商业许可和支持 | Free 使用免费组件；Annual/Lifetime 解锁 200+ Blocks 与 12+ Templates | Annual $169；Lifetime $199；Team $1,590/10 人 | **LEARN-FROM** 让动效本身可体验；**REJECT** 在一个页面堆叠全部特效 |
| [Magic UI](https://pro.magicui.design/) | 150+ 免费动画组件；Pro 提供 sections、完整模板、Live Preview、源码和商业许可 | 免费开源组件负责信任；Pro 卖完整页面和持续更新 | 主价格 Lifetime $199，但同页 ROI Calculator 仍出现 $49 | **LEARN-FROM** 免费组件到完整模板的升级；**REJECT** 价格信息不一致和过早 lifetime |
| [Framer](https://www.framer.com/pricing/) / [Motion](https://motion.dev/) | Marketplace 用静态封面、视频缩略图和真实发布结果；Motion 提供 400+ live examples、代码和 AI Kit | Framer 按站点套餐与 Marketplace 单品收费；Motion 核心免费、Motion+ 一次性付费 | Framer Basic $10/月、Pro $30/月；模板常见 $49–149；Motion+ £299 lifetime | **ADAPT** 活体预览与单品成交；不依赖平台锁定和 lifetime 作为主收入 |

共同的付费链路可以收敛为：

```text
高质量视觉证据
  → 真实上下文、连续流程或实时动效
  → 搜索、比较、收藏与项目化决策
  → Figma、代码、CLI 或可安装文件
  → 团队协作与 AI/MCP 接入
```

StyleKit 的执行顺序不能倒过来：

1. 先有合规、响应式、可解释的图片和动效证据。
2. 再有独立 Premium 详情、完整页面、业务状态与安装交付。
3. 再让用户收藏、并排比较并保存到项目。
4. 个人付费价值成立后再开放 Team。
5. 内容模型稳定、许可清楚后再开放 MCP、Figma 和更广的 Agent 分发。

MCP 不是首个收费理由。它是已被验证、结构化、可交付内容的放大器；如果底层仍只有提示词和零散效果，加入 MCP 只会更快地分发不完整结果。

## 5. 收费级展示模型

### 5.1 一张主图必须有明确工作

图片只能承担以下一种或多种明确角色：

- 气质锚点：让用户在 1–2 秒内理解风格世界。
- 使用场景：说明产品适用于什么行业、内容或工作流。
- 产品证据：展示真实界面、数据、响应式结果或业务状态。
- 内容叙事：带领用户按顺序理解案例，而不是充当背景填充。
- 材质证据：展示纸张、玻璃、金属、织物、颗粒或摄影语言如何影响组件。

不合格图片包括：

- 与页面价值无关的办公室、咖啡、握手、电脑桌面图库。
- 只为了填满卡片而出现的风景或人物。
- 无可追溯来源、许可不清或禁止再分发的素材。
- 依赖图片遮掩组件、响应式和业务状态不完整的问题。

### 5.2 每屏一个视觉高潮

每个视口最多允许：

- 一个主视觉高潮；
- 一个辅助动效；
- 一个明确交互目标。

例如：

- Editorial：人物剪影主图 + 一次滚动揭示。
- Cyberpunk：城市氛围主图 + 慢镜头漂移。
- Corporate：产品界面证据面板 + 分层入场。

不同时堆叠镜头漂移、粒子、鼠标跟随、霓虹辉光、文字拆分、无限 marquee 和 3D 倾斜。

### 5.3 用户最终要看到可交付物

一个收费级 Showcase 至少包含：

- 完整页面，而不只是 Hero。
- 桌面、手机和暗色或关键主题状态。
- Loading、Empty、Error、Success、Disabled、Focus 等真实状态。
- 组件清单、文件树和依赖。
- 图片、字体、图标、动画和交互的资产清单。
- 许可与再分发边界。
- 干净项目安装证明和生产构建结果。
- 更新范围、支持边界与价格。

## 6. 三条视觉方向

### 6.1 Editorial：图片裁剪与排版叙事

目标：验证高质量图片如何和文字尺度、留白、章节节奏共同构成页面。

保留：

- 黑白或低饱和摄影；
- 强轮廓和大面积负空间；
- 文字进入图片留白，而不是压在主体脸部；
- 图片揭示、阅读进度和克制的画廊交互。

禁止：

- 为每张图片增加不同 hover 特效；
- 无限 marquee 与旋转装饰持续占用注意力；
- 未处理 `prefers-reduced-motion`；
- 未声明图片尺寸造成 CLS。

商业候选：创意工作室、品牌发布、作品集、杂志内容 Pack。

### 6.2 Cyberpunk：单图世界观与轻量氛围

目标：验证强主题风格如何在不牺牲信息清晰度的情况下建立沉浸感。

保留：

- 单张强氛围图；
- 暗色叠层保证文本对比；
- 10–16 秒、只使用 `transform` 的慢镜头运动；
- 一种强调色负责交互，另一种只负责环境光。

禁止：

- 大面积发光文字和多层 box-shadow；
- 每个组件都有霓虹边框；
- 多个 WebGL Canvas 同时运行；
- 在粗指针、低性能或低动效环境继续运行持续动画。

商业候选：游戏、AI 工具、活动页、音乐与数字娱乐 Pack。

### 6.3 Corporate Clean：从图库转向产品证据

目标：优先验证最可能成交的 B2B SaaS Pack。

保留：

- 克制、清晰和可信的企业视觉语言；
- 真正的产品界面、指标、工作流和业务状态；
- 客户可替换的数据、Logo 和场景槽位；
- 桌面、移动、暗色与安装结果并列展示。

必须替换：

- 普通办公室空镜；
- 西装人物思考、会议、握手等泛化图库；
- 与产品结果无直接关系的团队照片。

优先资产：

- StyleKit 自己生成的产品截图或代码渲染结果；
- 原创、委托或明确允许商业再分发的抽象产品场景；
- 可追溯的图标、图表和数据可视化；
- 不依赖品牌商标的通用 B2B 工作流。

商业候选：SaaS 落地页、Analytics Dashboard、Admin、CRM、定价与登录流程 Pack。

## 7. 动效与交互预算

### 7.1 层级

| 层级 | 用途 | 推荐时长 | 约束 |
| --- | --- | --- | --- |
| 微交互 | hover、focus、pressed、toggle | 120–200ms | 只改变必要属性，不使用 `transition-all` |
| 组件入场 | 面板、菜单、说明层 | 180–360ms | 一次性，不循环 |
| 章节揭示 | 图片、标题、案例段落 | 300–700ms | 同屏保持单一节奏 |
| 环境运动 | 镜头漂移、光线、背景 | 10–20s | 每屏最多一个，可完整停用 |
| 高成本特效 | Shader、WebGL、粒子 | 按需加载 | 只有图像本身需要时使用，不作为默认装饰 |

### 7.2 技术预算

- 持续动画优先只改变 `transform` 和 `opacity`。
- 禁止在动画帧中反复读写布局；避免每帧 `getBoundingClientRect()`。
- GSAP ticker 必须使用可引用回调并在卸载时移除。
- 首屏不同时加载多个完整 iframe、动态 Showcase 或 Cursor Room。
- 一个 Premium 页面只展示一个活动预览，其余使用静态封面或延迟加载。
- 动态依赖只在 Preview 边界内加载。
- 图片使用 Next Image 或明确的 `width`/`height`、`sizes`、响应式裁剪与现代格式。
- 图片池中接近 1MB 的资源不得未经优化直接进入首屏。

### 7.3 降级矩阵

| 环境 | 行为 |
| --- | --- |
| `prefers-reduced-motion: reduce` | 所有持续、滚动绑定和视差运动停止，内容保持完整可读 |
| 粗指针 / 触屏 | 不依赖 hover 或鼠标坐标；改为点击、滑动或静态构图 |
| 小屏 | 重新安排文图关系，不是把桌面缩小；主图降低透明度或改为上图下文 |
| 低性能 | 不加载 Shader、粒子和高成本滤镜，使用预渲染图或 CSS 静态层 |
| 图片失败 | 保留有意义背景、文字层级和明确 alt；不让界面崩塌 |

### 7.4 路由级性能预算

| 场景 | 媒体预算 | 动效运行时预算 | 加载策略 |
| --- | --- | --- | --- |
| 目录、搜索、135 卡片页 | 移动全部首屏图片 ≤350KB；桌面 ≤700KB | 新增 0KB | 保持现有静态预览，只加载视口附近内容 |
| 普通风格详情页 | Hero 移动 ≤120KB；桌面 ≤220KB | 可选动效 JS ≤35KB gzip | LCP 必须是静态图或文字；非活动内容延迟加载 |
| Lottie 详情岛 | JSON + runtime 目标 ≤90KB gzip | 页面内最多 1–3 个自制微动效 | 离屏 freeze，卸载 destroy |
| 3D / Rive Premium Demo | 模型与纹理桌面 ≤2MB | 独立按需 Chunk | 移动默认只显示 poster，用户主动开启后加载 |
| 演示视频 | 移动 ≤800KB；桌面 ≤1.5MB | 0KB 或极小控制代码 | 3–6 秒、静音、`playsinline`、poster 先行，不使用 GIF |

体验门槛：

- p75 LCP ≤2.5s；
- p75 INP ≤200ms；
- CLS ≤0.1；
- 新增视觉层导致任一核心指标回退超过 10%，不得接入公开页面；
- 同屏最多一个活动 3D Canvas 或两个轻量持续动画；
- 页面隐藏、元素离屏、WebGL context lost 或连续帧率低于目标时必须暂停或退回静态 poster；
- 3D DPR 建议桌面上限 1.5、移动上限 1，避免高 DPR 带来的像素和 GPU 放大。

### 7.5 动效工具选择顺序

```text
CSS / View Transitions
  → 已安装的 GSAP（复杂 DOM 编排）
  → 自制 Lottie（少量矢量微动效）
  → 原创 Rive（真正需要状态机的交互插画）
  → Three.js（真正需要 3D / Shader 的独立 Demo）
  → Spline（暂只考虑托管演示，不进入下载 Pack）
```

- CSS / View Transitions：零运行时依赖，默认首选，并做渐进增强。参考 [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)。
- GSAP：项目已安装，适合复杂时间线；只在对应页面动态加载。未来若 StyleKit 变成可视化动画 Builder，需重新核对 [GSAP Standard License](https://gsap.com/community/standard-license/)。
- Lottie：社区动画的许可证不一定能被 StyleKit 的专有 Pack 条款覆盖；付费核心只使用自制动画，并附 notices。参考 [LottieFiles License](https://lottiefiles.com/page/license)。
- Rive：只有状态机交互带来真实价值时才承担较大 WASM 成本；只交付自制或委托 `.riv`。参考 [Rive Best Practices](https://rive.app/docs/getting-started/best-practices)。
- Three.js：运行库不是主要风险，模型、纹理、GPU 内存和清理才是；必须 dispose。参考 [Three.js Cleanup](https://threejs.org/manual/en/cleanup.html) 与 [Responsive Rendering](https://threejs.org/manual/en/responsive.html)。
- Spline：当前更适合托管 Demo；自托管和社区资产需单独审核。参考 [Spline self-hosted export](https://docs.spline.design/exporting-your-scene/web/exporting-as-self-hosted-project)。

无障碍补充：自动移动或闪烁超过 5 秒必须提供暂停、停止或隐藏；每秒不得超过 3 次闪光。参考 [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)。Canvas 中的标题、卖点、按钮和数据必须在真实 DOM 中保留，因为 Canvas 本身不提供等价语义。参考 [MDN canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)。

## 8. 资产授权与 provenance

每个可能进入收费 Pack 的素材必须记录：

- 唯一资产 ID；
- 文件路径、哈希、像素尺寸和格式；
- 类型：owned、commissioned、licensed、ai-generated；
- 作者、来源 URL、许可名称和许可文本快照；
- 商业使用、修改、客户项目使用和再分发是否允许；
- 是否要求署名及署名文本；
- 获取日期、修改记录和审核人；
- AI 素材还需记录 provider、model、日期、prompt、适用条款和人工审核结论；
- `approved` 状态必须有审核时间和保留证据。

当前 `public/images/styles` 和 Editorial 本地图片默认状态为：

```text
auditStatus: pending
distributable: false
purpose: internal-visual-research
```

它们可以帮助判断构图，不得默认为收费产品资产。

### 8.1 资产来源分级

| 来源 | 托管 Demo | 随付费 Pack 分发 | 结论 |
| --- | --- | --- | --- |
| 自有原创 / 委托并完成 IP 转让 | 可以 | 可以 | 首选，人物与场地仍需 release |
| 审核过的 AI 生成 | 可以 | 条件允许 | 保存模型、条款、Prompt、输入权利与人工审核；输出可能不唯一 |
| CC0：Poly Haven、ambientCG、Kenney | 可以 | 可以 | 可做配料，仍记录来源和哈希，不作为核心差异化 |
| Unsplash | 可以 | 默认不随包 | 禁止未显著修改即销售或做竞争图库；许可不自动覆盖肖像、Logo、艺术品 |
| Pexels | 可以 | 谨慎、非独立素材 | 可作为有明确增值的模板组成部分，但不可 standalone 分发；不构成独特付费价值 |
| Adobe Stock / Shutterstock | 可以 | 通常不随包 | 模板与可提取源码涉及 Extended/Enhanced 等更高许可和包装限制，默认 demo-only |
| Envato Elements | 可以 | 不随包 | 一下载一项目，禁止 stock/source file 再分发，不适合供买家反复安装的 Pack |
| Fab / Adobe Substance | 可以 | 不随包 | 禁止 standalone 或可提取源文件分发，与源码 Pack 冲突 |
| Sketchfab | 逐项判断 | 仅 CC0 或书面授权 | CC-BY 需持续署名，其余许可证逐模型审核 |
| Spline 社区/库资产 | 可以 | 暂不随包 | 运行时、社区资产条款与自托管授权需要进一步书面确认 |

许可来源：

- [Unsplash License](https://unsplash.com/license) / [Terms](https://unsplash.com/terms)
- [Pexels License](https://www.pexels.com/license/)
- [Adobe Stock Product Specific Terms](https://www.adobe.com/cc-shared/assets/pdf/legal/servicetou/stock-product-specific-terms-en-us-20260116.pdf)
- [Shutterstock Standard vs Enhanced](https://www.shutterstock.com/help/en/articles/10617089-shutterstock-standard-image-license-vs-enhanced-image-license)
- [Envato Elements License](https://help.elements.envato.com/hc/en-us/articles/360000621483-Introduction-to-the-Envato-Elements-License)
- [Poly Haven License](https://polyhaven.com/license) / [ambientCG License](https://ambientcg.com/license) / [Kenney Support](https://kenney.nl/support)
- [Fab EULA](https://www.fab.com/eula)
- [Adobe Substance 3D Assets Terms](https://www.adobe.com/cc-shared/assets/pdf/legal/servicetou/adobe-substance-3d-assets-product-specific-terms-20250422.pdf)
- [Sketchfab Licenses](https://sketchfab.com/licenses)

### 8.2 AI 资产规则

- OpenAI 服务条款通常在客户与 OpenAI 之间将 Output 归客户，但输出可能不唯一，输入权利和最终侵权审查仍由客户负责。
- Adobe Firefly 可商用不等于所有生成路径都自动获得 IP indemnity；必须保存合资格计划、功能、导出事件和条款版本。
- Midjourney 默认公开且可 remix；需要独特收费主视觉时不使用默认公开生成，并核对公司营收对应计划要求。
- C2PA / Content Credentials 只能帮助证明来源和修改链，不能证明作品真实、独占或必然不侵权。

参考：

- [OpenAI Services Agreement](https://openai.com/policies/services-agreement/) / [Service Terms](https://openai.com/policies/service-terms/)
- [Adobe Firefly Product Description](https://helpx.adobe.com/legal/product-descriptions/adobe-firefly.html)
- [Midjourney Terms](https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service)
- [C2PA 2.4 Explainer](https://spec.c2pa.org/specifications/specifications/2.4/explainer/Explainer.html)

### 8.3 Demo-only 与 Pack 内资产必须显式分离

购买页、预览页和压缩包必须明确区分：

```text
demoAssets: 页面展示使用，但下载包不包含
packAssets: 客户购买后可按许可证使用
replacementMap: demo 图在客户项目中的替换位置与推荐尺寸
thirdPartyNotices: 所有第三方依赖与署名
```

不允许让用户看到第三方图库 Demo 后误以为原图包含在付费下载中。

## 9. 增量架构

建议边界：

```text
app/admin/visual-lab/                 # 内部方向研究，已建立

app/packs/[slug]/                    # 将来的独立 Pack Offer
  page.tsx
  preview/page.tsx

components/packs/
  pack-offer.tsx
  pack-preview-frame.tsx
  deliverables.tsx
  install-proof.tsx
  license-summary.tsx

lib/experience-packs/manifests/
  corporate-clean-saas.ts

public/experience-packs/
  corporate-clean-saas/
```

架构约束：

- manifest 是页面、ZIP、registry、CLI、MCP 和埋点的唯一事实源。
- Pack 只读取自己的资产目录，不混用未审计的 `public/images/styles`。
- Preview 使用 iframe 或严格局部作用域，不污染主站 CSS。
- GSAP、WebGL 和高成本效果只在 Preview 中动态加载。
- 免费 Showcase 继续保留，Premium 层只新增完整交付和商业证据。
- 首个 Pack 验证完成前，不机械扩展到 135 个风格。

## 10. 首轮已实现实验

隐藏路由：`/admin/visual-lab`

当前能力：

- Editorial、Cyberpunk、Corporate 三个方向切换；
- 每次只加载一张主图；
- 一键关闭动效；
- `prefers-reduced-motion` 完整静态降级；
- Corporate 展示“图库反例 + 产品证据面板”；
- 明确展示素材审核、商业角色、动效边界与本轮结论；
- 明确列出不可触碰的旧设计边界；
- 页面未加入管理后台侧边栏，metadata 为 `noindex, nofollow`；
- CSS 使用局部 Module，未向现有公开设计注入样式。

首轮测试：

- ESLint 通过；
- TypeScript 通过；
- Chromium 与 Pixel 5 端到端测试 4/4 通过；
- 验证三方向切换、`noindex`、动效开关、低动效模式和移动端无横向溢出；
- 桌面与移动真实截图已人工检查。

### 10.1 第二轮：产品证据主题与宿主隔离

2026-07-11 在不触碰任何公开风格卡片、详情和 Showcase 的前提下，继续增强隐藏的 Corporate Clean Pack：

- 同一份可安装组件新增浅色 / 深色切换，切换主题不重置当前业务状态；
- 深色不是简单反色，而是独立定义画布、面板、文字、边界、图表、状态和 Skeleton token；
- 将原来的整页入场收敛成一次 620ms 的收入曲线揭示，不循环，只使用 `transform` 与 `opacity`；
- `prefers-reduced-motion: reduce` 下曲线直接显示最终状态；
- manifest 新增 `theme-preview-control` 交互合同，并让 Block 显式引用主题和动效；
- 审核页与交付说明同步展示“浅色、深色、完整业务状态”这一实际交付能力。

视觉审核发现后台全局 `.admin-shell thead th` 会穿透到 Pack 内部，把深色表头强制成白色。修复没有修改后台全局样式，而是在 Pack 根节点下提高表格规则边界，显式重置 `position`、`background`、`box-shadow`、`letter-spacing` 和表格折叠行为。新增浏览器计算样式断言，要求深色表头保持 `rgb(21, 33, 54)`，防止宿主 CSS 污染回归。

本轮验证证据：

- Corporate Clean Pack、Registry、License：3 个 Vitest 文件、7 个测试通过；
- Pack E2E：Chromium + Pixel 5 共 10 个项目，9 通过、1 个仅限移动断言在桌面项目按设计跳过；
- E2E 覆盖主题切换、全部业务状态、错误恢复、Registry 下载、单一曲线动效、低动效静态降级、移动侧栏和无横向溢出；
- ESLint、TypeScript、`check:experience-packs`、`git diff --check` 全部通过；
- 全新临时项目完成 frozen-lockfile 安装、类型检查、生产构建、生产路由请求和浏览器 Smoke；
- approved preview source baseline 2/2 通过，受保护的现有卡片和 Preview 源码没有变更。

### 10.2 第三轮：收费资源完整性闸门

2026-07-11 将竞品研究中的“视觉证据必须可追溯、可交付、可控制成本”落实为通用 Experience Pack 合同，未修改任何页面视觉：

- 每个 Pack 资产必须声明字节预算、加载策略、响应式能力和是否包含动画；
- Hero 证据不能使用无意识的 lazy loading，必须明确 eager 或由用户主动加载；
- Pack 发布后，营销证据和可分发资产都必须具备内容哈希与 approved provenance，不能只审核下载包内资源；
- provenance snapshot 不再只检查“文件存在”，而是解析证据结构并核对 asset ID、来源类型、作者、审核人、审核时间、审核状态、路径、哈希、尺寸、字节数和 distributable 属性；
- approved 证据必须记录审核人、审核时间、商标与人物相似性检查；AI 资产还必须完成人类艺术家模仿风险检查；
- 实际文件超过 manifest 声明的字节预算时，Pack 校验直接失败；
- `check:experience-packs` 已加入 CI，防止不一致资源进入主分支。
- Motion Recipe 现在必须声明离屏暂停、页面隐藏暂停、用户暂停和重播能力；持续、无限循环或超过 5 秒的动效没有暂停控制时直接拒绝。
- 无限循环必须显式标记为 continuous；continuous 动效必须在离屏和页面隐藏时暂停。
- 功能性交互必须同时具备 keyboard、assistive technology、touch 等价和显式 Focus 状态，不能只写 pointer hover。

当前 Corporate Clean 资产预算：

| 资产 | 实际大小 | 预算 | 加载角色 |
| --- | ---: | ---: | --- |
| 产品 SVG | 约 8 KiB | 64 KiB | lazy，可分发 |
| 桌面浅色主证据 | 约 49 KiB | 160 KiB | eager，Hero |
| 手机深色成功状态 | 约 32 KiB | 96 KiB | lazy，补充证据 |

验证结果：21 项 Experience Pack / provenance / motion / interaction / evidence contract 测试通过，实际 Pack 校验确认 9 个安装文件与 3 个资产，TypeScript、ESLint 和补丁完整性检查通过。

### 10.3 第四轮：机器可读证据链

Experience Pack 不再只列出“有哪些图片和文件”，而是显式表达“每项商业声明由什么证明”：

```text
presentation
  → evidence scene（资产、设备、主题、状态、说明）
    → claim（声明）
      → screenshot / installable / motion / interaction references
```

Corporate Clean 当前三条声明分别绑定：

- 同源可运行工作区 → 桌面浅色概览截图 + Workspace Page + Dashboard Block；
- 响应式、主题与业务状态 → 手机深色成功截图 + 状态、侧栏、主题交互合同；
- 自有可安装资产 → SVG 交付证据 + Dashboard Block。

Schema 会拒绝未知资产、未知证据、未知安装项、未知动效或未知交互引用。Pro App 进入 Preview 或 Published 前，校验器还强制要求桌面概览、移动证据、业务状态和可安装交付物；任何 Evidence Scene 使用未批准 provenance 或缺少哈希的资产都会失败。Registry 的标题、描述和分类也不再硬编码 Corporate Clean，而是读取各 Pack 自己的 presentation；Registry meta 会确定性输出完整 evidence 与 claim 引用，可供未来 CLI、MCP、Agent Skill 或 Workspace 使用同一事实源。

Registry 现在还会随客户安装生成根目录 `STYLEKIT_PACK.json`，保存该版本的 presentation、兼容性、许可摘要、资产预算、Evidence Scene、Claim 引用、Motion lifecycle、Interaction contract 和安装文件关系。它不是营销文案副本，而是安装后仍可由 Codex、Claude、Cursor 或 CI 读取的确定性合同；真实干净项目验证会检查该文件存在、Pack identity 正确且至少包含已验证的三项证据与三条声明。

本轮没有把这些元数据接入公开页面，因此不会改变现有卡片、详情页和 135 个预览。

当前合同与证据测试累计 22 项通过；CI 输出同时报告安装文件、资产、Evidence Scene 和 Claim 数量，避免“校验通过”却不知道实际覆盖深度。

## 11. 下一阶段顺序

### 阶段 A：完成研究收敛（已完成）

- 建立竞品模式库，而不是复制单个网站外观。
- 每个案例只提取：图片角色、主高潮、动效层级、交互目的、移动降级和商业表达。
- 将模式标记为 REUSE、ADAPT、LEARN-FROM 或 REJECT。

### 阶段 B：Corporate Clean Premium Preview（内部切片已完成，公开发布暂停）

- 建立 `corporate-clean-saas` manifest。
- 从现有 SaaS、Admin、Dashboard、CRM 模板中拆出可组合 Block。
- 生成完整桌面、手机和暗色页面。
- 加入 Loading、Empty、Error、Success、Focus 等真实状态。
- 只选一个轻量动效原语。
- 展示文件树、依赖、安装证明和许可摘要。
- 在没有原创/授权图片前，优先使用代码生成的产品界面作为证据。

### 阶段 C：资产管线（通用闸门已完成，后续按 Pack 补证据）

- 为每个 Pack 建立独立资产目录和 provenance manifest。
- 加入尺寸、哈希、alt、许可、分发权和优化检查。
- 原创图片生成工具可用时，先生成少量候选并人工审核，不批量填满 135 个风格。
- 历史研究 WebP 已从公开仓库清理；剩余运行时图片完成来源审核前不迁入 Pack。

下一项不是继续给 Corporate Clean 增加装饰，而是先根据真实购买意向决定是否公开；若未达到验证门槛，保持内部 Preview，并选择一个能够验证不同媒体模型的第二研究样本，但仍不得接入公开卡片或 135 个现有预览。

### 阶段 D：商业验证（当前主线）

- 明确展示价格、交付物、许可、支持、更新和退款边界。
- 记录 `pack_offer_view`、`pack_price_view`、`pack_purchase_intent` 等真实事件。
- 在合格 ICP 样本和购买意向达到门槛前，不开发完整计费平台，不扩展 Pack 2。

## 12. Premium Showcase 验收清单

### 视觉

- [ ] 1–2 秒内能说出风格气质和适用场景。
- [ ] 每屏最多一个主视觉高潮和一个辅助动效。
- [ ] 图片主体、文字、裁剪和留白在桌面与手机均经过人工审核。
- [ ] 没有图库感、AI 模板感、无意义渐变和效果堆叠。
- [ ] 与现有 StyleKit 公开设计完全隔离。

### 产品

- [ ] 展示完整页面，不只展示 Hero 或卡片。
- [ ] 有桌面、手机、暗色和关键业务状态。
- [ ] 组件、代码、图片和动效来自同一 manifest。
- [ ] 用户能看见文件树、依赖、安装、许可和支持边界。
- [ ] 对收费价值的表达可验证，不使用虚假客户、指标或成交数据。

### 动效与可访问性

- [ ] `prefers-reduced-motion` 下无持续动画且内容完整。
- [ ] 键盘、触屏和粗指针可完成相同任务。
- [ ] Focus 状态可见，弹层具备语义、焦点管理和 Escape。
- [ ] 不在动画帧中产生布局抖动或持续强制同步布局。
- [ ] 持续、循环或超过 5 秒的动效提供暂停控制；离屏和页面隐藏时停止运行。
- [ ] 无障碍名称、alt、对比度和阅读顺序通过检查。

### 性能

- [ ] 首屏只加载当前活动主图和必要代码。
- [ ] 非活动预览延迟加载或使用静态封面。
- [ ] 图片使用现代格式、响应式尺寸和稳定宽高比。
- [ ] 无多个持续动画、多个 iframe 或多个 Canvas 同时运行。
- [ ] 生产构建、Core Web Vitals 和移动设备人工测试通过。

### 资产与商业

- [ ] 所有公开销售页面使用的营销证据和可分发资产 provenance 均为 `approved`。
- [ ] provenance snapshot 与资源 ID、路径、哈希、尺寸、字节数和分发属性一致。
- [ ] 每个资源均在 manifest 声明字节预算、加载策略、响应式与动效属性，并通过实际文件校验。
- [ ] 许可明确允许目标商业使用和客户项目使用。
- [ ] 需要署名时，产品与文档均正确展示。
- [ ] 安装在全新项目中可复现并可回滚。
- [ ] 价格、交付物、退款、支持和更新范围同时展示。

## 13. 明确不做

- 不给现有卡片批量增加图片、发光、动画或 3D 效果。
- 不一次性为 135 个风格生成或购买图片。
- 不把 Unsplash 缓存直接作为收费资产分发。
- 不同时开发多个 Premium Pack。
- 不用 WebGL 代替清晰的信息层级。
- 不在没有购买意向证据时建设复杂计费、授权和多 Pack 平台。
- 不以“看起来更炫”作为验收标准；验收标准是更清楚、更可信、更可交付、更值得付费。

## 14. 研究来源入口

后续竞品观察以模式提炼为目的，优先从以下公开入口持续补充：

- [Awwwards](https://www.awwwards.com/)
- [Godly](https://godly.website/)
- [Land-book](https://land-book.com/)
- [Lapa Ninja](https://www.lapa.ninja/)
- [SiteInspire](https://www.siteinspire.com/)
- [Minimal Gallery](https://minimal.gallery/)
- [Mobbin](https://mobbin.com/)
- [SaaSFrame](https://www.saasframe.io/)
- [Refero](https://refero.design/)
- [Webflow Awards](https://webflow.com/awards)

这些入口用于发现案例，不代表其图片、代码、动画或设计可以直接复制或进入收费分发。
