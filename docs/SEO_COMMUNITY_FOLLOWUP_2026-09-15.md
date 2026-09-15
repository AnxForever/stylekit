# SEO and community follow-up — 2026-09-15

## Intent and retained evidence

The user approved execution after the first audit. Continue with the three named
follow-ups: reply/notification participation, high-impression color intent, and
server-correct locale documents. The first audit and its GSC export remain valid;
there is no reason to repull unchanged traffic numbers or repeat completed SEO
checks before implementation. Do not conflate code delivery with deployment.

The initial working tree includes the user's 36-file static-route work plus the
previous turn's verified changes. The complete starting diff is saved locally at
`/tmp/stylekit-followup-20260915/start.patch`. Preserve these changes. One necessary
home-module import move may touch a localized file; its existing static directives
must remain intact.

## Release status

The work was released to production on 2026-09-15. Migration 040 committed
successfully before the application switch, and `main` commit `5404e3ef` is the
deployed source state. The pre-release observations later in this document are
retained as implementation evidence; this section supersedes their deployment
status.

## Feature evidence ledger

| ID | Lifecycle / desired outcome | Delivery before this work | Evidence and references | Decision / constraints | Acceptance and failure cases | Coverage / historical gap |
| --- | --- | --- | --- | --- | --- | --- |
| COMM-08 | Select comment → reply with context → reach original | planned | Existing paginated comments, authenticated API, legacy identity support; PostgreSQL constraints [1] | Contextual replies in the chronological discussion, not unbounded nested rendering; immutable parent reference, same-style foreign key, preserve replies when parent is deleted | Cross-style/missing parent, deleted parent, old DB, expired session, whitespace, pagination and exact-comment deep link | partial / inherited-unassessed |
| COMM-09 | Reply commits → recipient notified → read / acknowledge | planned | No existing inbox; existing service-role-only follows pattern; Supabase grants/RLS [2] | In-app only. Database trigger creates reply and notification atomically. No self notification; no copied deleted content; only authenticated recipient reads/marks their rows | Cross-account reads/writes, hidden style, deleted comment/parent, duplicate delivery, newer arrivals during acknowledgement, pagination, fail-closed DB outage | partial / inherited-unassessed |
| SEARCH-02 | Hex query → exact answer → actual pairings → reusable CSS | operational | GSC `#111827` / `#38bdf8` zero-click impressions; current metadata calls near-match exact, current graph points at an alias; local sRGB math | Precise vs nearest versioned Tailwind palette, useful RGB/contrast summary, real co-occurring palette colors; no unsupported universal naming or contrast guarantee | Near-match vs exact, low contrast pairs, valid canonical links only, computed-only swatches non-clickable, metadata/body parity | partial / reopened-by-change |
| I18N-01 | Locale route → initial HTML language → navigation and 404 | operational with defect | Built Chinese HTML has lang=en; installed Next 16.3.1 only passes params down to the root layout; official i18n / layout guidance [3,4] | Locale root must live under [locale]. Reuse one document component; add legacy roots without moving hundreds of style files/imports. Keep URLs, existing metadata, canonical policy, and error behavior | EN/ZH prerendered and dynamic routes, unknown locale, 404, old unprefixed crawlers, template/showcase routes, cross-root full navigation | partial / backfilled |
| OPS-01 | Review migration → verify locally → staged release → measure | planned | Production is ECS + nginx + systemd; a local disposable PostgreSQL 16 cluster is available | Additive migration tested in an isolated cluster, never run against the existing DATABASE_URL implicitly. Separate release instructions and no fabricated live delivery claims | Migration rerun, rollback code compatibility, table grants, no unrelated database changes | partial / inherited-unassessed |
| PERF-01 | Public entry → useful first paint → interaction/navigation | operational with measured waste | Three-run production build traces for `/en`, `/en/styles`, `/en/dashboard-prompts`, and `/en/community`; Next Link prefetch and Core Web Vitals guidance [8,9] | Remove resources only after route traces establish ownership. Keep authentication available for real sessions, preserve server-rendered content, and retain explicit opt-in prefetch for critical links | Anonymous and signed-in auth, dismissed/new banners, clipboard fallback, desktop/mobile layout, route navigation, no hidden community content | partial / backfilled |

## Research and decisions

- Current `style_comments` reads/writes use server APIs. Existing permissive table
  grants are not a reason to expose the new notification store. The migration
  revokes direct client access to comments (including private legacy identifiers)
  and notifications; the public API continues to return sanitized public fields.
- A reply references an existing comment in the same style. Recipient identity is
  computed by the database from that comment, never accepted from a browser.
  Existing legacy session-to-account identity can be resolved only when it matches
  a real auth account. No email, follower fan-out, or marketing subscription.
- Notifications store identifiers, timestamps, and read state, not durable copies
  of comment text. Public visibility is checked at read time; deletions remove
  associated notifications. A pending migration is an explicit unavailable feature,
  not a silently flattened reply or an empty-success inbox.
- Root layout params cannot read a child locale. DOM scripts or overriding only
  `main.lang` do not fix the raw document. Use documented multiple-root layout
  support. Crossing a localized and legacy root may trigger a full navigation;
  public URLs and content do not change.
- Reuse the first audit's GSC evidence. Do not treat short-term CTR changes as a
  guarantee or blindly redirect pages suggested by an automated analyzer.
- Production traces showed that visible links automatically prefetched several
  data-rich routes after hydration. Those payloads then pulled route-only code,
  including Zod, into an otherwise unrelated page view. Public links now default
  to click-time loading; callers can still opt in to prefetch a truly critical
  destination.
- Anonymous pages do not have a Supabase auth cookie from which a browser session
  could be restored. They leave the loading state without importing the SDK.
  Session-bearing requests still initialize the client and subscribe normally.

## Primary references, verified 2026-09-15

1. https://www.postgresql.org/docs/current/ddl-constraints.html
2. https://supabase.com/docs/guides/database/postgres/row-level-security
3. https://nextjs.org/docs/app/guides/internationalization
4. https://nextjs.org/docs/app/api-reference/file-conventions/layout
5. https://nextjs.org/docs/app/api-reference/file-conventions/not-found
6. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
7. https://tailwindcss.com/docs/colors
8. https://nextjs.org/docs/app/api-reference/components/link
9. https://web.dev/articles/cls

## Planned verification

Isolated SQL integrity/trigger/grant tests; API authorization and failure tests;
component reply/inbox tests; color data/metadata/schema tests; full lint/type/unit/
production build; desktop/mobile Playwright flows; initial HTML locale and 404
checks; full sitemap crawl. Deployment and external notifications are not part of
local verification.

## Implementation outcomes

### Replies and notifications

- Comments support an immutable same-style parent reference and render the parent
  context without building an unbounded nested tree. Exact-comment URLs fetch the
  target directly, so an inbox link does not depend on page-one placement.
- Publication retains the draft and parent on failure. Parent deletion keeps the
  reply with an explicit removed-context state. Old comment schemas still read,
  but do not advertise reply support until migration 040 is applied.
- The private inbox has recipient-bound queries/updates, explicit retry states,
  cursor pagination, selected-page read acknowledgements, and a header unread
  indicator. Account IDs partition SWR keys, not the transport URL. No self,
  email, push, follower fan-out, or public notification stream is introduced.
- Migration 040 upgrades comment-specific legacy identity columns without replaying
  unrelated favorites migrations. Its trigger makes reply/notification creation
  atomic and its grants close direct PUBLIC/anonymous/authenticated table access.

### Color answers

- High-impression hex pages now lead with actual RGB/HSL values and explicitly
  distinguish an exact sRGB palette approximation from the nearest Tailwind token.
  The stored reference palette is identified as Tailwind 4.1.18, not mislabeled as
  the current version of every installation.
- Pairings come from actual co-occurrence in the linked StyleKit palettes. Each
  gives computed text contrast and a valid canonical-library destination. A
  black-or-white example is chosen by actual contrast rather than a luminance
  heuristic. Computed-only tints and shades remain non-clickable.
- FAQ answers, exact CSS/Tailwind copy values, primary sources, and structured
  data agree with the English canonical `/en/colors/{hex}`. No external color
  naming, popularity, or WCAG certification is invented.

### Locale roots

- Shared document code moved to `components/layout/site-document.tsx`.
  `app/[locale]/layout.tsx` supplies the route locale before HTML generation;
  legacy trees use thin root wrappers. This avoids moving the large style/template
  implementation trees or changing public URLs.
- The original homepage implementation moved to `components/home/home-page.tsx`;
  its localized wrapper retains the user's `force-static` and revalidation work.
  This one import is the only necessary edit within the original 36-file change set.
- Root-aware error/not-found wrappers preserve provider availability. The global
  unmatched-route document is independent of providers; Next supplies its noindex
  directive. Community metadata pins one brand with `title.absolute` because
  Next does not apply a layout's title template to its own segment's page.
- Cross-root navigation can be a full page load, as documented by Next. This is an
  explicit trade-off, not a newly invented client router. Existing route-specific
  skeletons and client loading/error states remain.

## Verification boundaries

The SQL tests ran against an isolated PostgreSQL 16 cluster on localhost port
55439, never against the app's `DATABASE_URL`. They include a legacy table lacking
user/avatar columns, repeat migration execution, same-style parent constraints,
private grants (including inherited PUBLIC privileges), self-notification
prevention, deletion cascades, and notification-trigger failure rollback.

The signed-in reply/inbox browser check used the existing local dev mock user on
port 3101. Every comments and notification API request was intercepted with
explicitly labeled fixtures. It verified reply submission, context display,
selected notification acknowledgement, desktop/mobile layout, and no uncaught
browser errors. It did not send real notifications or mutate production data.

Production-mode regression and verification results are recorded below after the
final build. Search ranking, AI citations, and real participation still require
post-release measurement. Release order and rollback are in
`docs/COMMUNITY_REPLY_RELEASE.md`.

## Dashboard intent and community continuity pass

The same 2026-08-15 through 2026-09-12 GSC export identified
`/en/dashboard-prompts` as the clearest additional snippet/content opportunity:
882 impressions, 4 clicks, 0.45% CTR, and average position 6.8. The existing page
offered eight useful prompts but its search title and opening copy did not state
the count, supported tools, review method, sources, or limitations.

A read-only production check also found nine public comments across five styles
and two approved submissions, `anti-design` and `op-art`. Both submissions had
since entered the static curated registry. The community runtime dropped every
submission whose slug existed in that registry, so the public page incorrectly
rendered an empty contribution catalog and removed the creator credit.

Implemented locally:

- The dashboard result now promises eight examples in the title and description,
  then delivers that count in the H1-adjacent answer. It names ChatGPT, Claude,
  Cursor, and v0; adds a six-part prompt checklist, vague/specific comparison,
  editorial method, limitations, and primary WCAG/WAI references.
- Unsupported universal KPI counts and layout claims were removed from the FAQ.
  Native `details` elements keep every shared prompt FAQ answer in server HTML.
  The long topic content is now a server component; only the small copy buttons
  hydrate, and they read the adjacent server-rendered prompt by ID.
- Localized dashboard routes now supply their locale directly during static
  generation and declare the main content language.
- Curated slug collisions remain visible as community contributions with the
  submitted publication date and author credit. Their cards and JSON-LD point to
  the canonical `/styles/{slug}` page and carry an explicit curated badge.
  Promoted-only sitemap output excludes these redirecting community URLs.
- Recent public comments are grouped by style. Each entry shows counts within the
  bounded recent-activity window and links to the exact latest comment via the
  existing `?comment={id}#comment-{id}` loader. No reply totals are inferred from
  production before migration 040 exists there.

During this content-continuity pass the production database was read only and
migration 040 had not yet been deployed. The later release applied the migration
without creating submissions, comments, follows, moderation actions, external
publications, or search submissions. Search CTR, AI citations, and community
participation remain post-release measurements rather than claimed outcomes.

Final local verification for this pass:

| Check | Result |
| --- | --- |
| `pnpm run lint` | Pass: 0 errors and 38 pre-existing warnings; targeted changed-file lint has no warnings |
| `NODE_OPTIONS=--max-old-space-size=6144 npx tsc --noEmit` | Pass |
| `pnpm run test --maxWorkers=2` | 259 files passed; 7,659 tests passed and 1 existing test skipped |
| `NODE_OPTIONS=--max-old-space-size=6144 pnpm run build` | Pass; 2,214 static pages generated, including both localized dashboard routes |
| `pnpm run check:seo-truth` | Pass for all 1,140 sitemap URLs and discovery claims |
| `pnpm run check:seo-runtime` against `next start` | All 1,140 sitemap URLs return 200, permit indexing, and are self-canonical |
| Production-mode browser checks | Pass at 1,440px, 1,024px, and 390px: no horizontal overflow or uncaught page errors; first-view/dismissed banners, prompt copy, Chinese document/content/links, exact discussion links, anonymous auth loading, and disabled root prefetch verified |
| `git diff --check` | Pass |
| `pnpm run security:secrets` | Pass; no obvious secrets found in tracked files |
| `pnpm run check:runtime-config` | Pass |

The first unbounded build attempt hit one transient Google Fonts fetch failure;
the next compiled successfully but exhausted Node's default heap during Next's
second TypeScript pass. The final build used the same 6 GB heap already required
by the standalone type check and completed successfully.

## Loading performance pass

Production traces used fresh Chromium contexts, service workers disabled, a
1,440 × 900 viewport, and three cold page loads per route. Values below are the
median from local `next start`; transfer sizes include the document and loaded
resources. Localhost timings are useful for before/after server work but are not
a substitute for field Core Web Vitals.

| Route | JavaScript transfer | CSS transfer | Total transfer | CLS | TTFB |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/en` | 695 KB → 314 KB (-55%) | 328 KB → 228 KB (-30%) | 1,790 KB → 881 KB (-51%) | 0.1614 → 0.0008 | 8 ms → 6 ms |
| `/en/styles` | 674 KB → 315 KB (-53%) | 328 KB → 228 KB (-30%) | 1,344 KB → 749 KB (-44%) | 0.1610 → 0.0003 | 6 ms → 5 ms |
| `/en/dashboard-prompts` | 563 KB → 250 KB (-56%) | 328 KB → 228 KB (-30%) | 1,145 KB → 654 KB (-43%) | 0.1817 → 0.0007 | 8 ms → 5 ms |
| `/en/community` | 697 KB → 274 KB (-61%) | 328 KB → 228 KB (-30%) | 1,338 KB → 670 KB (-50%) | 0.1609 → 0.0003 | 1,261 ms → 843 ms (-33%) |

The community route's three final TTFB samples ranged from 682 to 966 ms because
they include reads from the configured remote database. The median still improved
after the catalog and recent-discussion reads began in parallel. The final
breadcrumb prefetch change reduced the observed resource count from 87 to 41 on
`/en/styles` and from 91 to 33 on `/en/community`.

Implemented from those traces:

- Removed the global Noto Serif SC `next/font` declaration. Its generated
  unicode-range stylesheet cost about 100 KB compressed on English and Chinese
  routes before any matching glyph file was needed; Chinese headings retain the
  existing system serif fallbacks.
- Rendered the site announcement and homepage recommendation at their final
  height in the initial HTML. Tiny head bootstraps hide a previously dismissed
  item before first paint. Header controls reserve their final width instead of
  appearing after hydration.
- Disabled automatic prefetch for the shared localized link, breadcrumbs, global
  navigation, and dense homepage links. Final route traces no longer issue the
  observed background prefetch burst for dashboard and homepage loads.
- Used the browser email validity API in the newsletter form while retaining Zod
  validation in the server endpoint. Anonymous page views skip the dynamically
  imported Supabase SDK unless an auth-session cookie exists.
- Started the bounded recent-discussion read alongside the community catalog and
  filtered every result through the resolved public style map. This preserves the
  fail-closed visibility rule while removing the database waterfall.

## Production release evidence

The release used a PostgreSQL 17 `pg_dump` backup before migration:

- Path: `/home/anx4758/backups/stylekit/postgres-pre-040-20260915T084918Z.dump`
- SHA-256: `aaef1e9ab59e275665956300798411f6341c6ef9cef5b8e7e4e79d83e730c74b`
- Size: 6,393,139 bytes; the archive list was verified with PostgreSQL 17
  `pg_restore --list`.

Migration `040_comment_replies_notifications.sql` committed transactionally.
The original nine comments remained, reply and notification counts began at
zero, both tables retained RLS, and direct `anon` / `authenticated` SELECT grants
were absent. The reply constraints and preparation/notification triggers were
present after migration.

The application was deployed through a separate canary directory and switched to
`/www/stylekit` only after health checks. A production-only second proxy pass
initially exposed a locale rewrite loop on shared routes; commit `5404e3ef` now
recognizes the validated internal locale/path pair. Its regression tests fail on
the old behavior and cover both regular localized rewrites and search-bot color
rewrites. The post-fix gate passed 259 test files, 7,662 tests with one existing
skip, lint with the same 38 warnings, type checking, and the 2,214-page build.

Nginx's color allow map still contained 481 catalog colors from 2026-08-11. It
was regenerated from the deployed sitemap to 491 colors, syntax-tested, backed
up outside `conf.d`, and reloaded without stopping the application. The tracked
generator keeps this deployment input reproducible for future catalog changes.

Final public verification passed all 1,140 sitemap URLs as `200`, indexable, and
self-canonical. English and Chinese roots expose the expected document language
and canonical, community preserves the `anti-design` and `op-art` creator cards,
anonymous notification reads return `401`, and the comments API advertises reply
support. No production comments, replies, notifications, follows, ratings, or
moderation records were created during verification. The stopped-service switch
produced a brief upstream refusal window before Next became ready; no application
errors appeared in the new service journal after readiness.
