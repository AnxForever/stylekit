# Okara SEO and AI-search remediation

Reviewed: 2026-10-20. Authoritative checkout: `D:\stylekit`.

## Objective and evidence

Improve search discovery and the usefulness of existing indexed content using
the owner's [Okara workspace](https://okara.ai/agent/cmo/b9c26363-cff1-4954-8939-acaaaefacd34).
The earlier growth pass mainly changed onboarding; it did not resolve this SEO
objective. Keep that work separate from the outcomes below.

The SEO agent remains locked on the free account. Its visible **Ask the CMO what
it would do** action is available. In that chat, Okara attempted its SEO report,
recommendations and GEO tools; all reported ineligible on the free plan. It then
fetched public pages and explicitly distinguished observations from suggestions.
This is advice from the CMO's public-page analysis, not a paid technical audit,
Search Console export or measured AI-citation report. A follow-up requested
read-only keyword queries without upgrades, publication or new account links.
The follow-up did not run: the chat input reported that credits were exhausted
and required an upgrade. No keyword volume, SERP position or paid audit score
was obtained or used.

The material recommendations were to differentiate the overlapping AI-intent
pages, deepen useful existing style content, strengthen topic-cluster links,
and verify technical indexing and structured data rather than assume defects.
Its existing Marketing Strategy also named Neo-Brutalist + Tailwind and AI
website design prompts as content opportunities.

Independent browser reads of production server HTML established:

- `/` resolves to `/en` in the English session. English and Chinese home pages
  already have localized canonicals, reciprocal `en`/`zh-CN` and `x-default`.
- The Neo-Brutalist reference already includes CreativeWork, BreadcrumbList
  and FAQPage data and substantial style-specific content. Reuse it.
- AI UI and Claude Code pages share section headings and generic material.
  Their visible main-text samples were approximately 533 and 525 English words;
  word count is diagnostic context, not an SEO target.
- The existing Neo-Brutalism guide has roughly 94 English words and no Tailwind
  implementation material. Its display-name-derived relationships also produce
  paths that do not match published style slugs.
- The catalog's breadcrumb schema uses unlocalized root/style URLs. Catalog
  and style pages need contextual, crawlable paths into the relevant workflows.
- The current homepage says 148 styles, generated from the registry. Okara's
  reported 146 was stale; its suggestion to say 150+ is not justified.

Do not duplicate existing schema, invent search-volume figures, change
canonicals merely because pages sound similar, or add translated blog entries
when no translated articles exist. Root redirects are not extra sitemap pages.

Primary guidance: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
uses the same indexing, helpful-content and internal-link fundamentals as
ordinary search; it requires no special AI schema or text file.
[Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
need real anchors and meaningful destinations.
[Tailwind directives](https://tailwindcss.com/docs/functions-and-directives)
documents CSS-first v4 configuration rather than an implicit legacy JS config.

## Feature evidence ledger

| ID | Lifecycle / intended result | Delivery | Decision and current evidence | Acceptance / failure cases | Coverage / history |
| --- | --- | --- | --- | --- | --- |
| SEO-C1 | Search intent / give AI UI, Claude Code and Codex pages distinct, useful answers | Implemented; locally verified | Three bilingual copy sets now have distinct metadata, H1/H2, practical briefs, workflows and FAQ. Tool instructions cite official guidance and match the actual StyleKit export. | SSR tests and production HTML checks verify distinct headings and visible/schema FAQ agreement. Claude export is portable Markdown; no automatic Codex rule installation is claimed. | Covered for these three pages / backfilled |
| SEO-C2 | Search intent / answer Neo-Brutalist + Tailwind implementation queries on the existing guide | Implemented; locally verified | The existing guide now leads with the Tailwind tutorial intent and includes actual registered tokens, a CSS-first theme and complete component example before the historical sections. | The generated example compiles in focused checks; the reduced-motion translate override was also compiled with installed Tailwind. Desktop and 390px checks passed, and all five contextual guide links returned 200. Existing design-history prose was not independently re-audited. | Covered for implementation tutorial; history provenance remains partial / backfilled |
| SEO-L1 | Discovery / follow real relationships into canonical style and workflow pages | Implemented; locally verified | Guide relations resolve against the registry, including aliases; unknown/empty names stay text. Catalog and style pages render descriptive workflow links. Catalog breadcrumbs use canonical language paths. | Tests cover known/unknown English and Chinese names, missing registry entries, localized schema and English-only guide targets. Production catalog/style HTML contains the new anchors. | Covered / backfilled |
| SEO-T1 | Indexing / align declared public and noindex route intent with discovery | Implemented; locally verified | Sitemap adds launch, style-advisor, bilingual support and English refunds. Support gets matching localized metadata. Docs, HTML-in-canvas and experiments now honor their existing excluded-index intent with crawlable noindex metadata. | The 1,153-URL sitemap includes the seven newly listed language variants. Tests and production responses verify support alternates and noindex inheritance. No public style or prompt page was blocked. | Covered for reconciled routes / backfilled |
| SEO-T2 | Duplicate representations / identify the HTML source of read-only Markdown | Implemented; locally verified | Successful Markdown responses include an HTTP Link canonical for the matching language and actual curated/community source. Markdown remains readable; its body and cache behavior are preserved. | Unit checks cover both languages, the community destination and 404 without fabricated canonical. The local production Chinese response returns the corresponding HTML canonical header. | Covered / backfilled |
| SEO-P1 | Technical content / give Tailwind readers version-correct setup advice | Implemented; locally verified | Tailwind prompts distinguish legacy v3 config from CSS-first v4. V4 variable utilities use supported syntax, its FAQ explains explicit legacy loading and component references, and Neo-Brutalist joins the relevant style links. | Full tests, type checking and build passed. Guidance was checked against current official directives; no claim of running prompts in a third-party model. | Covered within this topic / backfilled |

## Validation and limits

All checks used `D:\stylekit` on Windows:

- `pnpm run lint`: passed, zero errors and 38 warnings in pre-existing areas of
  the combined working tree. Changed-file lint also passed.
- `npx --no-install tsc --noEmit`: passed; the final build's type check passed too.
- `pnpm run test --maxWorkers=2`: 306 files passed, 8,077 tests passed and one
  skipped. Final Unicode/reduced-motion review fixes passed the affected six
  tests afterward. Root discovery/indexing/Markdown tests passed all 13 cases.
- `pnpm run build`: passed; 2,224 static pages generated.
- `pnpm run check:seo-truth`: passed with 1,153 sitemap URLs.
- `pnpm run security:secrets`: passed.

A local production server at `http://127.0.0.1:3189` was then checked through
the browser. Sixteen HTML routes returned 200; the three intent pages had
distinct headings, FAQ markup matched visible answers, guide relations used
valid targets, catalog schema/links were localized, support alternates matched
the body, and the intended demo/tool pages emitted noindex. The Chinese Markdown
canonical header and every added sitemap destination were verified separately.
The guide and Chinese Claude workflow were visually reviewed at desktop/390px
widths with no horizontal overflow. Reports and screenshots remain outside the
repository.

The local build's configured canonical origin is `http://localhost:3000`; local
checks validated paths against that configuration. The independently inspected
live site uses `https://www.stylekit.top`. A deployment must use production URL
configuration rather than ship the local preview artifact unchanged.

Existing repair, developer-toolkit, component-workbench and experimental WIP was
preserved. No commit, push, deployment, paid upgrade or new account connection
was performed. Local validation does not demonstrate indexing, ranking, search
traffic or AI citations; those require a deployed version and subsequent
measurements. The remaining AI-intent pages were not claimed to be fully
re-audited or consolidated without query evidence.

## Production deployment: 2026-10-21

Deployed to `https://www.stylekit.top` at the owner's request. The release was
built from the production source matching `6de99a65cd2a01609b9576f6cf198a436236fbd0`,
with the SEO and template-demo truth changes overlaid in an isolated Windows
directory. The mixed `D:\stylekit` working tree was not deployed wholesale.
Homepage/guide onboarding, repair, developer packages, component workbench and
experimental changes were excluded. Production brand previews, the technical
profile sitemap exception and filesystem-backed bilingual docs were preserved.
Docs now inherit noindex metadata and are omitted from the sitemap.

Release build ID: `RyLkgozt_Qi6-17SLsoNo`. The build used production public
configuration, including the `https://www.stylekit.top` canonical origin; no
server secrets or Windows node_modules were copied. Five generated Turbopack
external-module aliases were recreated against the matching Linux dependencies
before the preview passed. This alias step is required when transferring this
Windows-built artifact.

Release validation passed: lint with zero errors and 33 existing warnings,
TypeScript, 305 test files with 8,031 passing tests and one skipped test,
production build with 2,225 static pages, secret scan and SEO truth checks.
The production-base sitemap contains 1,150 URLs; its existing route exclusions
were retained rather than overwritten with the local branch's sitemap.

The temporary Linux service and then public HTTPS passed checks on 22 pages:
localized canonicals and support alternates, specialized intent content,
visible FAQ/schema agreement, Tailwind guide content, catalog breadcrumb locale,
docs/demo noindex, template notices, static assets, image optimization,
Markdown canonical response headers, robots and the sitemap. Live mobile guide
and Chinese Claude pages were visually reviewed at 390px without horizontal
overflow. The production service and healthcheck timer are active.

The previous build and changed-source backup remain at
`stylekit-prod:/www/stylekit-backup-seo-20261021`. Rollback command:
`python3 /www/stylekit-backup-seo-20261021/activate.py rollback`.
The production release manifest is `/www/stylekit/.release-seo.json`.
The local patch, checksums, logs and browser evidence are under
`C:\Users\34758\ego\stylekit-deploy-20261021`.

No Git commit or push was made. Deployment and crawlability verification do not
demonstrate a change in search indexing, rankings, traffic or AI citations.
