# Technical Profile & Journal

An original, monochrome personal-site template with a narrow reading frame,
continuous rules, hatched separators, selected work, and a journal. Its layout
study comes from [me.anxforever.cn](https://me.anxforever.cn/). Personal identity,
contact information, avatar, and the reference site's ANX glyph are not bundled.

For a bilingual file-by-file editing guide included in the downloaded project, see [CUSTOMIZE.md](../app/templates/technical-profile/CUSTOMIZE.md).

下载项目附带的逐文件中英定制指南见 [CUSTOMIZE.md](../app/templates/technical-profile/CUSTOMIZE.md)。

## Scope and decisions

- The journal belongs to the template: category filtering, complete sample
  articles, and return navigation. It does not add a new StyleKit editorial feed.
- Reuse the existing `monochrome` style. The continuous technical frame and
  journal distinguish this template from the wider `editorial-profile-archive`.
- Use an original FM relief mark. Native SVG and React provide layered
  extrusion, pointer lighting, and keyboard/touch activation without a new
  animation dependency or audio.
- The example is an English microsite at `/templates/technical-profile`.
  Locale-prefixed aliases redirect to that route; its gallery card is bilingual.
  Sample articles are not search-indexable editorial content.
- The source viewer lets you inspect and copy each text file, including routes,
  data, CSS modules, and the shared relief component. Download the project to
  get the runnable file tree and any binary assets.

## Maintainer map | 维护入口

| Concern | Source |
| --- | --- |
| Profile structure and contact | `app/templates/technical-profile/page.tsx` |
| Brand, navigation, theme, footer | `app/templates/technical-profile/layout.tsx` |
| Projects and journal content | `app/templates/technical-profile/_data.ts` |
| Journal filters and list | `app/templates/technical-profile/_components/field-notes-list.tsx` |
| Theme and layout rules | `app/templates/technical-profile/_components/field-manual.module.css` |
| Article rendering and noindex metadata | `app/templates/technical-profile/notes/[slug]/page.tsx` |
| Relief SVG and styling | `components/templates/relief-mark.tsx`, `components/templates/relief-mark.module.css` |

| 关注点 | 源码位置 |
| --- | --- |
| 个人资料结构和联系方式 | `app/templates/technical-profile/page.tsx` |
| 品牌、导航、主题和页脚 | `app/templates/technical-profile/layout.tsx` |
| 项目和专栏内容 | `app/templates/technical-profile/_data.ts` |
| 专栏筛选和列表 | `app/templates/technical-profile/_components/field-notes-list.tsx` |
| 主题和布局规则 | `app/templates/technical-profile/_components/field-manual.module.css` |
| 文章渲染和 noindex metadata | `app/templates/technical-profile/notes/[slug]/page.tsx` |
| 浮雕 SVG 和样式 | `components/templates/relief-mark.tsx`、`components/templates/relief-mark.module.css` |

The downloaded project uses static data. Adding MDX, a CMS, dynamic publishing, authentication, or a content API requires separate implementation and maintenance.

下载项目使用静态数据。增加 MDX、CMS、动态发布、账号系统或内容 API 都需要另行实现和维护。

## Feature evidence ledger

| ID | User outcome and lifecycle | Evidence and decision | Coverage / delivery / research history |
| --- | --- | --- | --- |
| TP-FRAME | Browse a compact profile, projects, and journal on desktop and mobile | Reference page/source study: 768px rail, rules and hatching. Existing minimalist/editorial templates lack this complete structure. Adapt as a template, not another color style. | Covered: 1440px/390px browser review, width checks and dark mode / implemented / none |
| TP-JOURNAL | Filter posts, read a full article, return to the list, handle unknown slugs | User explicitly chose a template-local column. Existing editorial archive has nested routes and local data. Adapt that route structure with sample content and 404 handling. | Covered: filter/read/return/unknown-slug browser checks; sample article noindex / implemented / none |
| TP-RELIEF | Manipulate an SVG mark using pointer, touch, or keyboard | Reference uses layered SVG with pointer light; its decorative SVG lacks equivalent keyboard activation. Adapt with a semantic button, unique SVG IDs, scoped pointer events, and reduced-motion behavior. | Covered: scoped input and unique-ID unit tests; real keyboard/reduced-motion browser checks / implemented / none |
| TP-EXPORT | Discover the template and download a runnable copy | Catalog drives discovery; existing export tests check dependency closure. Shared components require explicit inclusion and file tracing. Include only the two relief source files. | Covered: full import-closure/ZIP tests, downloaded-project production build, screenshot cover / implemented / backfilled |
| TP-GUIDE | Customize identity, projects, articles, metadata, colors and the mark after export | Source-grounded bilingual instructions with a complete note example. Export CUSTOMIZE.md at project root and link it from README, keeping attribution separate. | Covered: file/ZIP parity tests and desktop/mobile source viewer checks / implemented / none |

Validation also includes storage-write failure, root canonical and social
metadata, and no horizontal overflow. Tests use emulated mobile viewports;
physical-device acceptance is not claimed.

Deferred: timed sentence rotation and slide-to-reveal controls. Neither is
required for this template's profile-to-reading journey.
