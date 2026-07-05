# 作品集场景风格调研与分类修正记录

日期：2026-07-05
背景：用户反馈 /styles 页"作品集"场景分类下的风格不适合做作品集网站。
本文档记录调研依据与 `lib/styles/scenarios.ts` 的修正内容。

## 一、问题诊断

修正前"作品集"场景共 19 个风格，其中多个属于误标：

1. 正则自触发误标：`SCENARIO_MATCHERS.portfolio` 原正则为
   `/portfolio|gallery|showcase|case study|作品集|画廊|案例|项目展示/i`，
   而每个风格的元数据普遍含有 "showcase / 案例" 等模板化文案，
   导致 film-noir、particle、blueprint、zen-garden、japanese-fresh 等被误伤。
2. 兜底规则过粗：无任何得分的 minimal 类风格一律落入 portfolio。
3. 手工覆盖不当：luxury-retail、marble-luxury（奢品电商风）、
   z-pattern-layout（营销页扫视模式）被排入 portfolio 第三位。
4. 缺席严重：作品集网站的真实主流风格（瑞士排版、黑白极简、暗色优雅、
   粗野主义、杂志编辑风、开发者身份风格等）大多不在分类内。

## 二、外部趋势依据（2024-2026 作品集网站主流风格）

综合 Awwwards 获奖案例、Codrops portfolio case study 系列、
Muzli《100 Best Designer Portfolio Websites of 2026》、
Readymag Websites of the Year 2025、Figma/Wix/Colorlib/Envato 趋势文：

1. 超大字体排版（Oversized Typography）：姓名即 hero，fluid clamp 巨字 +
   逐字动画。全职业通用，2026 头号趋势。
   https://www.figma.com/resource-library/web-design-trends/
2. 黑白 / Swiss 极简：白底黑字、offset grid、大留白。设计师/摄影师主流。
   https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/
3. 暗色优雅 / 电影感：深底 + 金铜或霓虹 accent。creative developer、高端 studio。
   https://svilenkovic.com/3d/sotd-2026-3d
4. Brutalism / Neo-brutalism：系统字体、生猛 hover、反美学。Awwwards 设专区，
   大量条目为 freelance portfolio。
   https://www.awwwards.com/brutalism-brutalist-websites.html
5. 沉浸式 3D / WebGL scroll 叙事：2026 Q1 占 Awwwards SOTD 61%。
   https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/
6. Bento Grid：开发者与产品设计师简历型 folio 标配。
7. 终端 / IDE 风（Developer Terminal）：黑底 mono、命令交互。纯开发者向。
8. 编辑杂志 / 印刷风（Editorial）：serif 标题、栏式网格。艺术指导/摄影师。
9. 横向滚动画廊（Horizontal Gallery）：横滚无边框大图，策展式。摄影/插画。
   https://tympanus.net/codrops/2025/03/17/case-study-motoyoshi-takamitsu/
10. 玩具感 3D + 复古像素/Y2K：插画师与独立创作者。
    https://blog.logrocket.com/ux-design/retro-design-comeback/

## 三、修正内容（lib/styles/scenarios.ts）

修正后"作品集"场景共 23 个风格。

移出（8 个）：

| 风格 | 原因 | 新场景 |
|---|---|---|
| film-noir | 强氛围主题风，非 folio 模式 | creative, marketing, editorial |
| particle | 通用背景特效，获奖分析明言 "generic particle backgrounds stops winning" | creative, marketing, saas |
| blueprint | 工程图纸风与 folio 无主流关联 | docs, saas |
| zen-garden | 日式静谧 folio 场景由 wabi-sabi 覆盖 | creative, marketing |
| japanese-fresh | 证据弱，更适合博客/生活方式 | blog, creative, ecommerce |
| luxury-retail | 零售风与个人 folio 错位 | ecommerce, marketing |
| marble-luxury | 奢品电商向 | ecommerce, marketing |
| z-pattern-layout | Z 型是 landing page 扫视模式 | marketing, saas |

补入（12 个）：swiss-style、monochrome、dark-mode、editorial、brutalist-web、
github-style、asymmetric-grid、magazine-grid、generative-art、glitch-art、
parallax-sections、timeline-vertical。

保留（11 个）：neo-brutalist、neo-brutalist-playful、bento-grid、minimalist-flat、
masonry-flow、split-screen、full-page-scroll、hero-fullscreen、scandinavian、
wabi-sabi、korean-minimal。

机制修正：

1. portfolio 正则收紧为 `/portfolio|作品集|个人主页|personal site/i`，
   作品集成员改为以 SCENARIO_OVERRIDES 人工策展为准。
2. minimal 类兜底由 portfolio(3)+docs(2) 改为 blog(3)+docs(2)。

## 四、库内缺失的新风格候选（按价值降序，待排期）

1. oversized-typography（超大字体排版）：视口级 fluid 巨字为布局主体、
   黑白为底、逐字/滚动 kinetic 动画、小号 mono 辅助信息。库内最大缺口
   （geometric-bold 不等价）。参考 Awwwards typography 专区。
2. horizontal-gallery（横滚画廊/白盒美术馆）：横向 scroll、无边框大图、
   极细 caption。摄影/插画 folio 头部布局，masonry/split-screen 均不覆盖。
3. developer-terminal（终端风）：纯黑底、monospace、prompt 提示符与光标闪烁、
   boot sequence。github-style 是产品 UI 而非终端，不等价。
4. scroll-story-3d（沉浸式 3D 叙事）：深底 + WebGL hero 占位 + scroll 章节叙事。
5. playful-toy-3d（玩具感 3D）：高饱和亮色 + 拟真玩具隐喻，与 claymorphism 不同。
6. case-study-resume（求职极简 folio）：白底居中单列、大姓名、case study 卡片流。

新增时按 docs/STYLE_ADDITION_CHECKLIST.md 走完整流程。
