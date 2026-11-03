# Customize this template | 定制模板

This guide is included at the root of the downloaded project. Profile, project, and journal content live in source files. Edit the data, rebuild, and redeploy to publish changes.

本指南随下载项目放在根目录。个人资料、项目和专栏文章都保存在代码文件中。修改内容后，重新构建并部署即可发布更新。

## Start | 启动

Install Node.js and pnpm first; this project is verified in CI with Node.js 24. From the project root, run `pnpm install` and `pnpm dev`, then open [localhost:3000](http://localhost:3000). To build for production, run `pnpm build` followed by `pnpm start`. Dependency version ranges are in `package.json`.

先准备 Node.js 和 pnpm；本项目 CI 使用 Node.js 24 验证。在项目根目录运行 `pnpm install` 和 `pnpm dev`，然后打开 [localhost:3000](http://localhost:3000)。生产构建使用 `pnpm build`，再运行 `pnpm start`。依赖版本范围见 `package.json`。

## File map | 文件位置

| Change | File |
| --- | --- |
| Brand, navigation, footer, theme button | `app/templates/technical-profile/layout.tsx` |
| Profile, practice, contact | `app/templates/technical-profile/page.tsx` |
| Projects, notes, categories | `app/templates/technical-profile/_data.ts` |
| Note filters and list labels | `app/templates/technical-profile/_components/field-notes-list.tsx` |
| Colors, typography, layout, breakpoints | `app/templates/technical-profile/_components/field-manual.module.css` |
| Article page and article metadata | `app/templates/technical-profile/notes/[slug]/page.tsx` |
| Relief SVG and accessible label | `components/templates/relief-mark.tsx` |
| Relief colors and motion | `components/templates/relief-mark.module.css` |
| Site defaults and document language | `app/layout.tsx` |
| Homepage title, description, sharing text | `app/templates/technical-profile/page.tsx` (`generateMetadata`) |

The example route is `/templates/technical-profile`; the project root redirects there. If you move the page, update route references in the layout, note list, article page, and `app/page.tsx`.

示例路由是 `/templates/technical-profile`，项目首页会跳转到这里。移动页面时，也要更新布局、专栏列表、文章页和 `app/page.tsx` 中的路由引用。

## Replace sample identity | 替换示例身份

All names and portfolio text are sample content. Replace them before publishing.

所有姓名和作品文案都是示例内容，发布前请替换。

- In `page.tsx`, replace “Alex Morgan”, the headline, introduction, location, practice statements, and contact link. The email is currently `hello@example.com`.
- In `layout.tsx`, replace “Field Manual” and “F/” in both header and footer; review the navigation labels too.
- If you rename the publication, update the article title suffix and sidebar label in `notes/[slug]/page.tsx`.
- Project examples in `_data.ts` are fictional. Replace them with work you can publish and substantiate.

- 在 `page.tsx` 中替换 “Alex Morgan”、标题、简介、所在地、实践说明和联系链接。当前邮箱是 `hello@example.com`。
- 在 `layout.tsx` 的页眉和页脚中替换 “Field Manual” 与 “F/”，并检查导航文字。
- 如果更换专栏名称，请更新 `notes/[slug]/page.tsx` 中的文章标题后缀和侧栏标签。
- `_data.ts` 中的项目示例均为虚构内容。请替换为你有权公开且能够说明的作品。

## Projects | 项目

Edit the `PROJECTS` array in `_data.ts`. Each record has `number`, `title`, `field`, `year`, `summary`, `challenge`, `approach`, `result`, and `tools`. Keep `number` unique; it is also the React key.

在 `_data.ts` 的 `PROJECTS` 数组中编辑项目。每条记录包含 `number`、`title`、`field`、`year`、`summary`、`challenge`、`approach`、`result` 和 `tools`。`number` 同时作为 React key，请保持唯一。

## Journal | 专栏

Add records to the `FIELD_NOTES` array in `_data.ts`. Fields are `slug`, `title`, `category`, `date`, `readingTime`, `excerpt`, `paragraphs`, and `takeaway`. Article paragraphs are plain text; Markdown is not parsed.

在 `_data.ts` 的 `FIELD_NOTES` 数组中添加文章。字段为 `slug`、`title`、`category`、`date`、`readingTime`、`excerpt`、`paragraphs` 和 `takeaway`。文章段落是普通文本，不解析 Markdown。

Use a unique, lowercase, URL-safe slug such as `designing-for-clarity`. It becomes `/templates/technical-profile/notes/<slug>`; the list and static route parameters are generated from the data. Reading time is manual display text. Categories must match both the `FieldNoteCategory` type and `FIELD_NOTE_CATEGORIES` array; update both when adding a category. Filter labels are in `field-notes-list.tsx`; article labels are in `notes/[slug]/page.tsx`.

请使用唯一、小写且适合 URL 的 slug，例如 `designing-for-clarity`。文章地址为 `/templates/technical-profile/notes/<slug>`，列表和静态路由参数由数据生成。阅读时长需手动填写。分类必须同时匹配 `FieldNoteCategory` 类型和 `FIELD_NOTE_CATEGORIES` 数组；新增分类时要更新两处。筛选文字在 `field-notes-list.tsx`，文章界面文字在 `notes/[slug]/page.tsx`。

For example, add this object to `FIELD_NOTES`. Keep the internal `"All notes"` filter value unless you also change its comparisons and initial state in `field-notes-list.tsx`.

例如，在 `FIELD_NOTES` 中新增下面这一项。请保留筛选项内部值 `"All notes"`；如果要改名，也须同步修改 `field-notes-list.tsx` 中的初始值和判断条件。

```ts
{
  slug: "my-first-note",
  title: "Why I chose a narrow layout",
  category: "Field notes",
  date: "October 14, 2026",
  readingTime: "1 min",
  excerpt: "A short record of the choices behind my personal website.",
  paragraphs: [
    "I wanted the writing and project records to be easy to scan.",
    "A narrow reading column keeps long paragraphs comfortable to read.",
  ],
  takeaway: "Choose a layout that helps visitors find the work.",
},
```

### Search indexing | 搜索收录

The homepage and article metadata override site defaults. Update the `generateMetadata` functions in both `app/templates/technical-profile/page.tsx` and `notes/[slug]/page.tsx` when replacing the template name and sharing text.

首页和文章 metadata 会覆盖站点默认值。修改模板名称和分享文案时，请同时更新 `app/templates/technical-profile/page.tsx` 与 `notes/[slug]/page.tsx` 中的 `generateMetadata`。

Sample article pages set `robots: { index: false, follow: true }` in `notes/[slug]/page.tsx`, so search engines should not index the demo articles. For your own complete, publishable articles, deliberately remove or change this rule if you want them indexed. Review your domain's title, description, canonical URL, and social image in `app/layout.tsx` and the article metadata function; this scaffold does not set production values for you.

示例文章在 `notes/[slug]/page.tsx` 中设置了 `robots: { index: false, follow: true }`，搜索引擎不应收录示例文章。换成完整且准备公开的文章后，如果希望收录，请有意识地删除或修改这条规则。请在 `app/layout.tsx` 和文章 metadata 函数中检查自己域名的标题、描述、规范链接和社交图片；脚手架不会替你配置生产信息。

## Theme and relief mark | 主题与浮雕标记

The main color variables are at the top of `field-manual.module.css`: `--paper`, `--ink`, `--muted`, and `--quiet`. The `.dark` class overrides them. Keep both themes readable. Type, spacing, widths, and mobile rules are in the same file.

`field-manual.module.css` 开头的 `--paper`、`--ink`、`--muted`、`--quiet` 是主要颜色；`.dark` 类提供深色主题。修改时请保持明暗主题都易读。字体、间距、宽度和移动端规则也在此文件中。

The SVG sample geometry is `GLYPH_PATH` in `components/templates/relief-mark.tsx`; `EXTRUSION` and `LAYER_COUNT` control its depth. The page passes an accessible name via the `ReliefMark` `label` prop. After replacing the path, check the viewBox, focus state, pointer lighting, touch, and reduced-motion behavior. Update `relief-mark.module.css` for color or motion changes. This mark is decorative interaction, not a link or security control.

SVG 示例路径位于 `components/templates/relief-mark.tsx` 的 `GLYPH_PATH`，`EXTRUSION` 和 `LAYER_COUNT` 控制挤出效果。页面通过 `ReliefMark` 的 `label` 属性设置无障碍名称。替换路径后请检查 viewBox、焦点状态、指针受光、触屏和减少动态效果模式。颜色或动效在 `relief-mark.module.css` 中修改。该标记是视觉交互，不是链接或安全控件。

## Before publishing | 发布前检查

Replace all sample identity, projects, dates, email, and publication labels. Check links and routes, review both themes on a narrow screen, and configure metadata for your domain. Decide whether each article should be indexed; do not publish sample copy as real portfolio or journal content.

发布前请替换示例身份、项目、日期、邮箱和专栏名称；检查链接和路由，在窄屏下查看明暗主题，并配置自己域名的 metadata。逐篇决定是否允许收录，不要把示例文案直接当作真实作品集或专栏内容发布。
