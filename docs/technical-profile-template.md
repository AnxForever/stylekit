# Technical Profile & Journal

An original, monochrome personal-site template with a narrow reading frame,
continuous rules, hatched separators, selected work, and a journal. Its layout
study comes from [me.anxforever.cn](https://me.anxforever.cn/). Personal identity,
contact information, avatar, and the reference site's ANX glyph are not bundled.

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

## Feature evidence ledger

| ID | User outcome and lifecycle | Evidence and decision | Coverage / delivery / research history |
| --- | --- | --- | --- |
| TP-FRAME | Browse a compact profile, projects, and journal on desktop and mobile | Reference page/source study: 768px rail, rules and hatching. Existing minimalist/editorial templates lack this complete structure. Adapt as a template, not another color style. | Covered: 1440px/390px browser review, width checks and dark mode / implemented / none |
| TP-JOURNAL | Filter posts, read a full article, return to the list, handle unknown slugs | User explicitly chose a template-local column. Existing editorial archive has nested routes and local data. Adapt that route structure with sample content and 404 handling. | Covered: filter/read/return/unknown-slug browser checks; sample article noindex / implemented / none |
| TP-RELIEF | Manipulate an SVG mark using pointer, touch, or keyboard | Reference uses layered SVG with pointer light; its decorative SVG lacks equivalent keyboard activation. Adapt with a semantic button, unique SVG IDs, scoped pointer events, and reduced-motion behavior. | Covered: scoped input and unique-ID unit tests; real keyboard/reduced-motion browser checks / implemented / none |
| TP-EXPORT | Discover the template and download a runnable copy | Catalog drives discovery; existing export tests check dependency closure. Shared components require explicit inclusion and file tracing. Include only the two relief source files. | Covered: full import-closure/ZIP tests, downloaded-project production build, screenshot cover / implemented / backfilled |

Validation also includes storage-write failure, root canonical and social
metadata, and no horizontal overflow. Tests use emulated mobile viewports;
physical-device acceptance is not claimed.

Deferred: timed sentence rotation and slide-to-reveal controls. Neither is
required for this template's profile-to-reading journey.
