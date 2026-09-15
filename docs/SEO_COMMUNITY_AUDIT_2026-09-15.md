# SEO, GEO, and community audit — 2026-09-15

## Scope and baseline

Improve useful search discovery and turn the community from an empty contribution
catalog into a path for discussing and sharing styles. Preserve the existing brand,
moderation rules, auth boundaries, and the 36 pre-existing uncommitted localized
page changes. No production deployment, database migration, fake activity, or
external publishing is part of this change.

Evidence is from local source, read-only production checks, the site's existing
audit history, and current first-party documentation. GSC was read through the
existing owner-authorized `https://www.stylekit.top/` property; no auth or property
configuration was changed. Raw exports and screenshots are local under
`/tmp/stylekit-seo-community-audit/`, not committed.

### Search Console

The export covers **2026-08-15 through 2026-09-12** (use the explicit dates rather
than the script's nominal `28 days` label). Site totals: **632 clicks, 18,247
impressions, 3.46% CTR, average position 9.3**. GSC anonymizes some queries; the
visible branded/non-branded query subtotals do not reconcile to site totals.

- `/en/dark-mode-ui-prompts`: 14 clicks versus 31 in the preceding comparison
  period, down 54.8%; average position 11.6 versus 7.7.
- `/en/tailwind-ui-prompts`: 3 clicks versus 14, down 78.6%. The sample is small;
  a title change alone cannot be credited with a recovery.
- Color queries have substantial zero-click impressions: `#111827` has 371
  impressions at position 9.2; `#38bdf8` has 312 at 9.4. They are not evidence
  that the entire site has a crawl failure.
- Reject the analyzer's automatic suggestion to redirect the homepage to
  `/en/launch`: its supposed winner has zero clicks and eight impressions. Brand
  sitelinks and localized results are not automatically harmful cannibalization.

### Read-only production observations

- Home, Chinese styles, dark-mode prompts, and a color detail page return 200 with
  self-canonical URLs, one H1, and parseable JSON-LD. Bilingual routes advertise
  reciprocal alternates; English-only color details do not invent translations.
- `/zh/community` renders an empty contribution catalog and two submission links,
  but no route into existing style discussions. Its title is
  `社区风格库 — StyleKit | StyleKit` (duplicated brand).
- The comment API already supports `limit` and `offset`, but the UI requests only
  ten comments and provides no pagination. Read failures look like zero comments.
- Comment sign-in redirects are hard-coded to `/styles/{slug}`, losing a community
  detail destination, locale, and discussion anchor.
- Dark-mode FAQs still recommend Tailwind v3 config as current guidance. They
  also assert universal opacity, OLED, and dual-mode-token claims without support.
- Database failure can fall back to local approved submissions, which is not an
  authoritative view of production moderation. The community API catches failure
  and returns a cacheable empty success response.

## Evidence ledger

Delivery, evidence coverage, and historical research gaps are intentionally separate.
This inventory covers the capabilities relevant to this change, not unrelated
StyleKit tools. `partial` is not a claim that production behavior has been verified.

| ID / capability | Lifecycle and desired outcome | Delivery at audit | Local / runtime evidence | Guidance and established pattern | Decision and acceptance / failure evidence | Coverage / history | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SEARCH-01 / technical discovery | Crawl → canonical → language → index | operational | Live HTML, robots, sitemap, existing SEO tests | Google Search Central [1, 2] | Preserve working canonical/locale rules; fix duplicated hub brand, test metadata | partial / backfilled | P1 |
| GEO-01 / answer reliability | Find answer → copy guidance → verify source | operational | Dark-mode topic, visible FAQ and shared FAQ schema; GSC decline | Tailwind v4 [3], WCAG [4] | Replace obsolete instructions and unsupported absolutes; keep schema and visible answers identical, cite primary sources | partial / backfilled | P1 |
| GEO-02 / machine references | Discover → inspect catalog / Markdown | operational | `public/llms.txt`, dynamic Markdown endpoints | Google [1], llms.txt convention [8] | Keep truthful boundaries; link public community and current package listings, never promise citation lift | partial / backfilled | P2 |
| COMM-01 / discovery | Browse existing discussions → enter style feedback | planned | Empty live hub; existing public style comments | SWR's page pattern [5]; GitHub discussion discovery [7] | Add bounded, server-rendered recent discussions; whitelist public styles, no fake posts; test hidden/unknown styles and empty/error states | partial / inherited-unassessed | P1 |
| COMM-02 / catalog continuity | Filter → share URL → return to results | enabled | Client-only filter state, shared StyleCard and metadata | Next.js History API [6] | Reuse cards; persist filters in URL, show attribution and real publication dates; validate unknown filters and back navigation | partial / inherited-unassessed | P2 |
| COMM-03 / comment participation | Read pages → sign in → create/edit/delete → recover | enabled | Ten-item UI, paginated API, authenticated mutations and tests | SWR [5], WAI notifications [9] | Use existing API, add pagination and explicit states; preserve destination; test auth, server errors, last-item deletion, and mobile controls | partial / backfilled | P1 |
| COMM-04 / moderation visibility | Approve/hide → public reads → failure recovery | enabled | Runtime fallback, API's cacheable empty-success catch | Existing visibility contract and fail-closed authorization principle | Keep approval/promotion gates; do not publish stale local data during configured DB failure; test failure and hidden records | partial / backfilled | P1 |
| COMM-05 / contribution | Submit → review → publish/promote | enabled | Existing submission and profile workflows | Existing repo authoring/review rules | Reuse and connect existing entry points; no invented SLA or automatic promotion; external reviewer operations not changed | partial / inherited-unassessed | P2 |
| COMM-06 / identity and following | Author → profile → follow/unfollow | enabled | Existing contributor routes and follow API | Existing public seq-id profile contract | Link existing public commenter profiles; do not expose email, IP, session IDs, or private auth metadata; no new notification system | partial / inherited-unassessed | P2 |
| COMM-07 / growth operations | Measure participation and referral → iterate | planned | GSC baseline; no verified AI-citation or retention dataset | Google reporting limitations [1] | Track real outcomes after deployment; do not infer adoption from visual polish | gap / inherited-unassessed | P2 |

## Implementation constraints

- No forum-table migration or pretend reply/notification functionality. Build on
  existing moderated styles and authenticated comments, with links to their actual
  discussion section. General-purpose threaded discussions remain a separate decision.
- Public activity queries select only already-public comment fields, use a bounded
  result window, and exclude unknown or hidden style slugs. Never select contact,
  session, IP, or auth metadata for the feed.
- Missing DB configuration may use the existing local development store. A failure
  of a configured database must not silently revive stale local submissions.
- An unavailable discussion/catalog is not an empty community. Errors need a
  localized recovery action; mutation failures must retain the user's input.
- Search filters must not create new canonical pages or lose locale/hash/other query
  parameters. No native selects; retain server-rendered, crawlable public links.
- Leave the curated/promoted indexing boundary intact. An approved submission is
  publicly viewable, but promotion remains the existing indexing quality gate.
- GEO means accurate, extractable, attributable content here. Google explicitly
  requires no special AI schema or text file. No fabricated dates, claims of ranking
  gains, bulk FAQ markup, or opening private APIs to crawlers.

## Edge cases and checks

Empty community; no public discussions; database unavailable; hidden/deleted or
unknown style; malformed comment/date; repeated activity on one style; invalid
filter URL; no matching filter results; stats unavailable; comments loading/error;
more than ten comments; deleting the final item on a page; comment mutation failure;
session expired; whitespace-only comments; mobile layout and keyboard navigation;
locale preserved through authentication; no accidental external writes in tests.

## Sources (read 2026-09-15)

1. https://developers.google.com/search/docs/appearance/ai-features
2. https://developers.google.com/search/docs/crawling-indexing/block-indexing
3. https://tailwindcss.com/docs/dark-mode
4. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
5. https://swr.vercel.app/docs/pagination
6. https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api
7. https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/participating-in-a-discussion
8. https://llmstxt.org/
9. https://www.w3.org/WAI/tutorials/forms/notifications/

## Verification and follow-up

Implementation checks and remaining operational gaps will be recorded here after
local validation. Search visibility and participation need post-deployment
measurement, not a claimed improvement based on a passing build.

### Rendering issue found during verification

A JavaScript-disabled browser stayed on the global loading skeleton even though
the final page text existed in a hidden `S:0` streamed fragment. Merely
prerendering the dark-mode route did **not** resolve that behavior. This is not
proof that Google cannot index streamed HTML: modern search renderers and raw-HTML
consumers differ. It is a reproducible progressive-rendering problem, corroborated
by https://github.com/vercel/next.js/issues/50150 and reproduced on installed Next
16.3.1, not assumed from that older issue alone.

Decision: keep the existing loading UI as a shared component, scope it to the
admin/workspace/submission workflows, and remove the global public-page Suspense
fallback. Existing page-specific loading states and client data states remain.
Trade-off: public route transitions without their own fallback retain the previous
screen until the server response is ready, rather than swapping to a generic
skeleton. The dark-mode page is independently prerendered for both locales, and
its main content explicitly declares its language. Its route locale does not rely
on client hydration or request headers during static generation.

An inherited limitation remains: the root layout's request-header-based `html lang`
defaults to English on statically generated Chinese routes, then its bootstrap
script corrects it in browsers. This change declares `lang="zh-CN"` on the new
Chinese dark-mode main content; restructuring the site's locale root layouts is
separate work, not silently claimed fixed here.

### Indexing behavior during service failures

The permanent community hub keeps its existing `index,follow` policy during a
partial catalog outage. A transient database failure must not turn into a
`noindex` instruction for a useful public landing page. Metadata does not query
the database. The degraded page still provides participation guidance and curated
style links, but omits the collection graph rather than claiming zero submissions.
The data API separately returns a non-cacheable 503. Tests cover both contracts.

## Delivery and measurement plan

Implemented locally: public discussion discovery, useful community onboarding,
shareable contribution filters, public creator credit, comment pagination and
recoverable states, localized feedback sign-in destinations (comments and ratings),
fail-closed configured-database reads, current source-backed dark-mode guidance,
server-rendered native FAQs, localized dark-mode prerendering, scoped loading
boundaries, runtime sitemap generation, and updated machine-readable links.

No production deployment, database migration, real comment creation, rating,
follow, moderation, or announcement was performed for verification. Unit tests use
mocked stores; browser mutation fixtures do not write comments. Browser analytics
calls are intercepted in the new E2E suite.

After review and deployment:

1. Recheck the public community and both dark-mode pages, including no-JavaScript
   rendering, canonical URLs, and source links. Keep the existing promoted-only
   community-detail indexing policy.
2. Compare GSC page/query performance over matched dates after enough new data
   accumulates (roughly 2–4 weeks). Watch dark-mode prompts and Tailwind prompts
   separately; do not attribute every fluctuation to these changes.
3. Track real community comments, distinct contributors, review turnaround, and
   return visits. Existing low-content comments are displayed honestly rather
   than rewritten to make the community appear more active.
4. Next content priority: source-backed, intent-matched color-detail answers for
   high-impression/zero-click queries. Do not mass-redirect localized or branded
   results based on the analyzer's automatic cannibalization suggestions.
5. Next community product decision: threaded replies and notifications require a
   separate data/auth/moderation design; they were not simulated with decorative
   controls in this change.

PageSpeed Insights returned API failures for both sampled mobile URLs. No current
Lighthouse score or field Core Web Vitals result is claimed. Likewise, this audit
does not claim verified inclusion or improved citation rates in ChatGPT,
Perplexity, Claude, or Google's AI features: those require post-deployment
measurement. The `llms.txt` convention is documentation, not a proven ranking lever.

## Final local verification

All results below use the modified workspace, not a claimed production deployment.

| Check | Result |
| --- | --- |
| `pnpm run lint` | Pass: 0 errors, 38 existing warnings; no new warnings in the new community modules |
| `npx tsc --noEmit` | Pass with `NODE_OPTIONS=--max-old-space-size=6144`; the first run exhausted Node's default heap |
| `pnpm run test --maxWorkers=2` | 250 files passed; 7,609 tests passed, 1 existing skipped test |
| `pnpm run build` | Pass; 2,213 static pages generated, both localized dark-mode routes prerendered |
| New Playwright suite, desktop + mobile Chrome | 10/10 passed against `next start`, including comment pagination/retry, localized login destinations, and English/Chinese no-JavaScript FAQs |
| `pnpm run check:seo-runtime` against localhost | All 1,140 sitemap URLs return 200, permit indexing, and are self-canonical; alias/404/robots/feed assertions also pass |
| Browser inspection | Community desktop/mobile screenshots reviewed; no horizontal overflow or uncaught errors in sampled pages |
| `git diff --check` | Pass |
| User-change preservation | The complete original 36-file diff matches the saved pre-edit baseline exactly |

Current implementation coverage: SEARCH-01 and GEO-01 are covered by the local
contracts and runtime checks above, with ranking outcomes still unmeasured.
COMM-01 through COMM-04 now have feature-specific source, unit, and browser
evidence; mark their historical gaps **backfilled**, not erased. COMM-05/06 remain
partial because live authenticated contribution/follow/moderation operations were
deliberately not performed. COMM-07 remains an operational measurement gap.

The production-mode preview was verified locally at `/zh/community` and
`/en/dark-mode-ui-prompts`. Temporary screenshots and command logs were kept
outside the repository.

## Superseding follow-up

The reply/notification design, locale-owned document roots, color answers, and
final loading-performance work were completed after this initial audit. Current
implementation and verification results are recorded in
`docs/SEO_COMMUNITY_FOLLOWUP_2026-09-15.md`. That statement recorded the
pre-release state; migration 040 and the corresponding app build were deployed
later on 2026-09-15, as recorded in the follow-up release status.
