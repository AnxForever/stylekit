# StyleKit SEO / GEO Runbook

## Objective

Make StyleKit discoverable for high-intent searches around frontend styles, web/UI design styles, and AI UI prompts without changing the approved frontend design or any of the 135 curated previews.

SEO work in this project is limited to routing, canonical and language signals, metadata, structured data, machine-readable discovery files, factual content, and non-visual copy localization. Existing preview JSX, layout, colors, typography, animation, and interaction design remain protected.

## Search intent ownership

One intent cluster should have one primary page. Avoid creating thin tool-specific pages until Search Console data proves demand.

| Search intent | English owner | Chinese owner |
| --- | --- | --- |
| web design styles, UI design styles, frontend styles | `/en/styles` | `/zh/styles` |
| UI design prompts, frontend prompts, web design prompts | `/en/ui-prompts` | `/zh/ui-prompts` |
| landing page prompts, SaaS landing prompts | `/en/landing-page-prompts` | `/zh/landing-page-prompts` |
| dashboard prompts, admin UI prompts | `/en/dashboard-prompts` | `/zh/dashboard-prompts` |
| Tailwind, React, Next.js, shadcn UI prompts | `/en/tailwind-ui-prompts` | `/zh/tailwind-ui-prompts` |
| dark mode UI prompts | `/en/dark-mode-ui-prompts` | `/zh/dark-mode-ui-prompts` |
| a named style implementation, tokens, examples | `/en/styles/{slug}` | `/zh/styles/{slug}` |
| a named style prompt | `/en/prompts/{slug}` | `/zh/prompts/{slug}` |
| English educational history or comparison | `/en/guides/{slug}` or `/en/blog/{slug}` | no Chinese URL until translated |

Legacy localized prompt URLs permanently redirect to their single owner page. Showcase routes remain accessible as approved visual references, but are `noindex, follow` and excluded from the sitemap so style detail pages receive the search signal.

## Canonical and locale contract

- Root layout metadata must not assign a homepage canonical to child routes.
- Every URL in `sitemap.xml` must return `200`, be indexable, and contain exactly one canonical equal to the sitemap URL.
- Bilingual pages publish reciprocal `en`, `zh-CN`, and `x-default` alternates.
- English-only blog, guide, privacy, and terms content must not be advertised as translated Chinese documents.
- Unknown localized paths must return a real `404`, not a rewritten `200` soft-404 page.
- Redirect sources, placeholders such as `[slug]`, and `noindex` pages must never appear in the sitemap.
- `lastmod` is emitted only when the repository has a real content or version date. A deployment timestamp is not a content update.

## GEO and AI-search contract

GEO is treated as retrieval clarity and factual trust, not as a proprietary score.

- Search crawlers such as `OAI-SearchBot`, `Claude-SearchBot`, and `PerplexityBot` may crawl public content.
- The read-only single-style Markdown route `/api/styles/{slug}/md` is explicitly allowed while private and mutating API routes remain blocked.
- `llms.txt` is a concise directory with absolute canonical links and clear product boundaries.
- `llms.md` and `llms-full.txt` use the canonical host, stable facts, and explicit content language.
- `llms.txt` is an emerging community convention and must never be described as a confirmed ranking signal.
- Structured entities use stable `@id` values for the StyleKit organization, website, application, articles, and creative works.
- JSON-LD URLs, breadcrumbs, names, descriptions, keywords, and `inLanguage` must match the visible page canonical and locale.
- Do not publish FAQ schema unless the same questions and answers are visible to users.
- Competitive superlatives, placeholder links, fake freshness dates, and unverified performance claims are prohibited.

## Factual baselines

- Approved curated style count: 135.
- Current animation catalog count: 57.
- Every catalog style is checked for metadata, tokens, recipes, component examples, and a cover asset.
- Existing curated previews are protected and are not automatically regenerated.
- CLI and MCP packages in the repository are not published to npm.
- StyleKit provides constraints, prompts, examples, and registry assets; it does not guarantee production-ready AI output.

## Automated verification

Run before every SEO-related merge:

```bash
pnpm typecheck
pnpm lint
pnpm test:run
pnpm check:catalog
pnpm check:product-truth
pnpm check:seo-truth
pnpm security:secrets
pnpm build
```

After starting the production build locally or deploying a preview:

```bash
pnpm start -p 3100
SEO_CHECK_ORIGIN=http://127.0.0.1:3100 pnpm check:seo-runtime
```

The runtime verifier crawls every sitemap URL and requires:

- HTTP 200 without a redirect;
- no `noindex` directive;
- exactly one self-referencing canonical;
- permanent redirects for legacy prompt paths;
- a real 404 for an unknown localized path.

## Deployment and webmaster actions

Repository changes do not prove external indexing. After deploying:

1. Run the runtime verifier against production:

   ```bash
   SEO_CHECK_ORIGIN=https://www.stylekit.top pnpm check:seo-runtime
   ```

2. Confirm live `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms.md`, `/llms-full.txt`, and both RSS feeds match the deployed commit.
3. Submit `https://www.stylekit.top/sitemap.xml` to:
   - Google Search Console;
   - Bing Webmaster Tools;
   - Baidu Search Resource Platform, if Chinese organic search is a target.
4. Request indexing for a small priority set rather than all pages:
   - `/en/styles` and `/zh/styles`;
   - `/en/ui-prompts` and `/zh/ui-prompts`;
   - the four focused prompt pages in both locales;
   - the first commercial cluster, initially Corporate Clean / Corporate SaaS.
5. Inspect server or edge logs for successful requests from search crawlers. User-Agent settings alone do not prove that a WAF or CDN allowed the request.
6. Recheck cached search snippets for obsolete `120+`, `130+`, old titles, or the non-`www` host.

These external submissions require owner credentials and cannot be truthfully marked complete from repository access alone.

## Measurement

Review monthly, with the first useful checkpoint after enough crawl and impression data exists.

- indexed canonical URLs versus submitted sitemap URLs;
- impressions and clicks for branded and non-branded queries;
- query clusters: frontend styles, UI styles, UI prompts, Tailwind prompts, dashboard prompts, landing page prompts;
- English versus Chinese landing-page performance;
- crawler errors, duplicate canonical selections, soft 404s, and hreflang errors;
- AI referral traffic and the landing URLs cited by AI-search products;
- Explore -> style detail -> Apply/copy/install conversion by landing page;
- Corporate Clean / Corporate SaaS traffic and commercial validation events.

Do not use the number of AI crawler rules, FAQ schemas, or the presence of `llms.txt` as success metrics.

## Expansion gate

Do not mass-produce new keyword pages. A new landing page is justified only when at least one of these is true:

- Search Console shows meaningful impressions for an intent not well served by an existing page;
- user interviews or validation evidence repeatedly identify the same task;
- the page directly supports the validated commercial Pack and contains distinct, useful content.

Otherwise, improve the existing intent owner through clearer answers, stronger examples, factual sources, and contextual internal links.
