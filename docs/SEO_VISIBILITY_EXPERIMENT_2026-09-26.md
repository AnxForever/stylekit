# Search visibility experiment: Chinese design style catalog

Date: 2026-09-26. Source idea: [Liangzhu's SEO post](https://x.com/liangzhu_AI/status/2103402474677670352). This is a focused test of its demand-first, search-intent, and measurement loop for StyleKit, not an endorsement of its traffic or revenue claims.

## Evidence and decision

The exact 28-day GSC window is 2026-08-27 through 2026-09-23, inclusive, for the `https://www.stylekit.top/` property: 804 clicks, 18,031 impressions, 4.46% CTR, average position 8.13. The helper's `--days 28` output includes 29 calendar dates, so this baseline uses explicit API dates.

The `/zh/styles` page had 183 clicks, 1,464 impressions, 12.5% CTR, and average position 7.2. The preceding 28-day window had 5 clicks and 61 impressions. This growth is an observation, not evidence that a particular SEO change caused it. The visible query/page rows include `ui风格` (84 impressions, 4 clicks), `ui设计风格` (81, 10), `网页风格` (58, 14), `网页设计风格` (56, 10), and `网站设计风格` (32, 7). GSC anonymizes some queries, so these rows do not sum to the page total.

The page title already matches this intent, but its H1 was the generic `风格目录`. The experiment makes the H1 and opening copy answer the design-style query directly and adds three relevant examples linked to their full style pages. It does not create a new keyword page or change the canonical URL. The English catalog is untreated for this experiment.

## What the source post gets right and wrong

- Validate search demand and intent before shipping. StyleKit's own GSC query/page data is stronger evidence than a generic volume estimate for an existing page.
- Ahrefs says its Keyword Difficulty score uses referring domains to the top results and excludes on-page factors. A KD threshold is a research filter, not a ranking guarantee: <https://ahrefs.com/keyword-difficulty>.
- Google's ranking systems include an exact-match-domain system that prevents low-quality exact-match domains from receiving excessive credit. Its SEO starter guide says domain keywords alone have hardly any ranking effect. Buying a new domain for this query has no demonstrated upside: <https://developers.google.com/search/docs/appearance/ranking-systems-guide#exact-match> and <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>.
- Google lists low-quality directory links and paid links meant to pass ranking credit as link spam. Relevant editorial mentions are worth pursuing for referral traffic and genuine discovery, but directory volume is not the success metric: <https://developers.google.com/search/docs/essentials/spam-policies#link-spam>.
- Google says recrawling can take days to weeks; repeated indexing requests do not make a URL crawl faster. No claim of same-day indexing is part of this test: <https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl>.

## Measurement

Record the production deployment date and verify the new H1, guide copy, internal links, canonical, and indexability in raw HTML. After Google has recrawled the page, compare the same query/page rows, total page clicks and impressions, CTR, and average position for a full 28-day post-deployment window. Also inspect Umami landing visits and engagement for `/zh/styles` so a ranking change is not mistaken for useful traffic. A 7-day check is only for indexing and large regressions; the 28-day check is the decision point. External search demand and ranking changes can still confound this before/after comparison.

Expand this approach to another page only if the query-level data and actual visitor behavior improve. Keep the recent Hex title repair on its separate post-recrawl measurement track.
