# StyleKit 知识内容迁移到 anxforever.cn

## 目标

将偏教程、知识科普和长期文章的内容逐步迁移到 `https://anxforever.cn`，让 StyleKit 聚焦于风格发现、预览、提示词、模板与付费产品能力。

本次只调整 StyleKit 顶部“更多”菜单和页脚的博客入口，不删除、不重定向现有页面，也不改动首页、风格卡片或 Showcase。

## 项目与内容结构

- StyleKit：`/home/anx4758/stylekit`
- 真实博客：`/home/anx4758/2025-blog-public`
- 博客首页：`https://anxforever.cn`
- 博客列表：`https://anxforever.cn/blog`
- 文章地址：`https://anxforever.cn/blog/<slug>`
- 文章索引：`public/blogs/index.json`
- 文章正文：`public/blogs/<slug>/index.md`
- 文章配置：`public/blogs/<slug>/config.json`

## 内容边界建议

### 保留在 StyleKit

- 风格目录、风格详情和所有 Showcase
- 模板目录与模板详情
- 提示词工具、生成器、工作区和付费资源包
- 动画、鼠标交互等可直接浏览或复制的工具型内容
- 产品说明、更新日志、开发者接口和账户功能

### 适合迁移到博客

| StyleKit 当前内容 | 建议博客 slug | 处理优先级 |
| --- | --- | --- |
| `/learn` 中的色彩理论章节 | `frontend-foundations-color-theory` | 高 |
| `/learn` 中的排版章节 | `frontend-foundations-typography` | 高 |
| `/learn` 中的字号比例章节 | `frontend-foundations-type-scale` | 高 |
| `/learn` 中的间距章节 | `frontend-foundations-spacing` | 高 |
| `/learn` 中的设计原则章节 | `frontend-foundations-design-principles` | 高 |
| `/learn` 中的视觉层级章节 | `frontend-foundations-visual-hierarchy` | 高 |
| `/colors` | `frontend-color-palette-guide` | 中 |
| `/gradients` | `frontend-gradient-design-guide` | 中 |
| `/shadows` | `frontend-shadow-design-guide` | 中 |
| `/component-patterns` | `frontend-component-patterns` | 中 |
| `/guide`、`/guides` 中偏知识性的文章 | 按主题单独确定 | 中 |
| StyleKit `/blog/*` 文章 | 尽量保持原 slug | 中 |

`/learn` 当前是一个聚合式学习页，迁移时应按章节拆成文章，而不是把整个页面机械复制成一篇超长文章。

## 推荐迁移流程

1. 在博客项目创建文章目录、Markdown 正文和配置。
2. 将文章加入 `public/blogs/index.json`，设置分类、摘要、标签和发布日期。
3. 为文章补充指向 StyleKit 对应工具、风格或模板的上下文链接。
4. 发布并确认博客文章可访问、标题和 canonical 正确。
5. StyleKit 原页面先保留，在正文顶部加入“本文已迁移”的明确入口。
6. 观察搜索收录和访问数据后，再决定使用 `301` 重定向还是保留精简工具页。
7. 最后更新 StyleKit sitemap、RSS、站内链接和 canonical，避免重复内容长期并存。

## SEO 与迁移约束

- 新文章上线前不要删除 StyleKit 原 URL。
- 不要让两个域名长期发布完全相同的全文；迁移阶段可使用摘要页、canonical 或 301。
- 原页面若仍有独立工具价值，应保留工具主体，只把教程正文迁移出去。
- 301 应逐页映射到最相关的新文章，不能全部跳到博客首页。
- 中英文页面需分别决定去向，不能把英文搜索流量无条件导向仅中文文章。
- 所有旧 URL、目标 URL、发布日期和重定向状态应形成可审计清单。

## 当前决定

- StyleKit 的“博客”入口统一指向 `https://anxforever.cn`。
- StyleKit 已存在的 `/blog` 和 `/blog/[slug]` 暂时保留。
- 本阶段不修改 StyleKit 的 sitemap、RSS、canonical 或路由代理。
- 正式迁移第一批内容前，先确认博客分类体系及首批六篇基础知识文章的标题。
