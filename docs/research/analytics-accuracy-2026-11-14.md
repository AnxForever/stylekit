# Analytics accuracy and style optimization

Baseline: dev aa54c5cc; reviewed 2026-11-14. Task: measure deduplicated browser activity and identify which styles need better discovery or implementation content. This is not a natural-person census.

## Evidence and decisions

| ID / lifecycle | Baseline evidence and failure | Decision and acceptance | Delivery / coverage / history |
| --- | --- | --- | --- |
| UV-01 / identity | `events.ts` uses per-tab sessionStorage; legacy RPC counts session IDs as visitors | New first-party random browser ID, shared across tabs; inactivity session separately; unknown identity stays null. Count distinct IDs across the selected window, never sum daily UV. Test shared storage, blocked storage, session expiry. | Implemented / partial / backfilled |
| UV-02 / delivery | Deferred PageViewTracker cancels pending views; no event replay key | Immediate route PV, pathname dedup, event UUID unique in PostgreSQL; separate passive/active quotas; preserve old events without inventing IDs. Test StrictMode, navigation and replay. | Implemented / partial / backfilled |
| UV-03 / collection eligibility | Existing internal collector lacks production/browser exclusion policy | Gate production host, admin/test/automation, opt-out, DNT/GPC; server defense and origin validation. No fingerprinting or raw search text. | Implemented / partial / backfilled |
| UV-04 / provenance and freshness | Overview prefers Umami but labels it tab sessions; disk fallback remains complete | Carry collector and metric through cache/API; explicitly mark stale values and legacy unknown source. New first-party UV is a separate versioned primary measurement. | Implemented / partial / backfilled |
| ST-01 / discovery | Catalog exposures sent but discarded by API; only catalog covered; no card clicks | Visible-duration impressions, contextual clicks, same-visitor ordered matching; entry surfaces/rank; own passive budget. | Implemented / partial / backfilled |
| ST-02 / use | Showcase entry click treated as view; copy/download failures sometimes counted | Actual showcase arrival; successful clipboard/download initiation; visible engagement; preference add/remove separately from authoritative account totals. | Implemented / partial / backfilled |
| ST-03 / analysis | Top 12 by total events biases toward exposure; anonymous identity and missing stages hidden | Full catalog including zero-activity styles, stage counts and distinct browsers, matched funnel rates, searchable sortable CSV. Missing migration is unavailable, not zero. | Implemented / partial / backfilled |
| ST-04 / retention | Migration 033 removes raw events after 7 days although UI offers 30/90d | Preserve v2 events 90 days, retain legacy retention policy. Display earliest retained event; no historical reconstruction. Validate purge boundary and report query with fixtures; monitor production growth after release. | Implemented / partial / backfilled |

Primary guidance: bundled Next.js route-handler and usePathname documentation (installed version); [Umami metric definitions](https://docs.umami.is/docs/metric-definitions), retrieved 2026-11-14, distinguish visitors from visits and describe default site/IP/User-Agent/rotating-salt identifiers. These differ from the new first-party browser UUID. Existing `043_style_prompt_copy_analytics.sql` and prompt-copy report provide the local reporting precedent.

## Measurement boundaries

- Only collector v2 events enter the new report. Previous unmeasured exposures or browser identities cannot be recovered. Old records remain available through legacy reporting.
- Browser IDs are origin-scoped. Clearing site data, private browsing, different browsers/devices and cross-host use can split a person; shared browsers can merge people. Refusal, blockers, offline exits, quotas and bots can still affect coverage. UUIDs are anonymous pseudonyms, not authenticated people.
- Deduplication prevents the same event UUID from being stored twice; a malicious sender can still create new events. Browser-side behavior is evidence of interaction, not proof of successful product adoption.
- Funnel numerators match ordered events from the same browser, style and selected window; missing IDs are excluded from rates. Direct arrivals and unmatched actions remain visible as counts.
- Download means the browser was handed a successfully fetched artifact, not proof that it was saved or used. Favorite actions distinguish local storage from saved account state.
- Retention and quota changes need production capacity observation. A short cache coalesces admin reads; source changes never merge independent collector counts.

## Rollout and verification

Apply the new SQL migration before deploying the new collector. Use a clean committed dev-derived release only when the owner authorizes release. No production migration, deployment or data mutation is part of local verification. Verify fresh production reception, exclusion, duplicate UUID behavior, growth/retention and real admin results after release; local tests do not establish operational coverage.

All eight units above are implemented locally. Coverage remains partial because production collection, database capacity and deployment-specific trust configuration have not been exercised. Historical gaps are backfilled with the source, executable fixtures and lifecycle tests described here; they are not erased by passing tests.

Collection uses a client occurrence timestamp bounded to five minutes in the past and one minute in the future; timestamps outside that window use server receipt time. This preserves funnel ordering when network requests arrive out of order without allowing unrestricted historical imports. Transient visible-page delivery retries reuse the event UUID. Hidden-page delivery uses Beacon and cannot confirm persistence.

The collector excludes embedded showcase previews and checks eligibility before each send. Umami uses the documented `data-before-send` hook (tracker 2.18 or later): [tracker configuration](https://docs.umami.is/docs/tracker-configuration#data-before-send). Its legacy identifiers remain distinct from first-party browser UV.

Configure `TRUSTED_CLIENT_IP_HEADER` only for a header overwritten by the trusted reverse proxy. Per-browser action and passive budgets are separate, with independent upper abuse limits; missing trusted IP falls back to a bounded shared upper budget rather than a 300-request global bucket. For the owner's production browser, `localStorage.setItem("stylekit-analytics-excluded", "1")` opts out of the first-party and gated Umami collection; remove that key to resume. Localhost and explicit automation are already excluded.

Local evidence:

- Full suite: 360 test files, 8,661 passed, 1 skipped, including BFCache visible/hidden restoration regressions. Full lint: 0 errors, 33 existing warnings. Standalone TypeScript check passed; production build and final revision rebuild recorded in the local logs.
- SQL: `node tools/scripts/verify-analytics-accuracy.mjs D:\codex-work\analytics-sql-fixture` passed 12 actual PGlite PostgreSQL checks: repeat migration, UUID replay, cross-day/browser UV, ordered funnels, unknown and legacy isolation, brief event deduplication, engagement, source rank, favorites, privileges and retention/batch boundaries. This does not benchmark production volume.
- Ego browser: actual admin components and site CSS in an isolated local fixture; searched and sorted style rows, exercised CSV generation, checked missing-migration versus query-failure versus zero-data states, light/dark layouts, and 390px viewport with table-contained horizontal scrolling. No live traffic or production admin data was used. Screenshots and command logs are local under `.tmp/analytics-accuracy/`.
- The preview source baseline changed only for analytics attributes on the existing home card; no visual image baselines were changed.

Apply migration 044 before the application release. Verify provider/runtime version, actual trusted proxy headers and SQL cron availability in the release environment. A rollback can leave additive database columns in place; open clients using a newer event envelope may need reload before an older collector endpoint accepts them.

## Production storage decision, 2026-11-14

Release preflight found about 304 MB of database storage, including 283 MB for approximately 179,000 retained analytics rows, and an active free-quota warning. The owner selected the existing self-hosted server instead of increasing Supabase spending. **For this deployment, do not apply migration 044 to the business Supabase database.** Generate the dedicated `stylekit_analytics` schema using `tools/analytics-server/schema.mjs`; it reuses the reviewed 043/044 aggregation functions without the legacy dimension columns or Supabase roles.

The new versioned collector writes exclusively to the configured private analytics service. Old client envelopes and business/authentication data stay on Supabase. A service failure never falls back to Supabase or double-writes. Both the new style report and prompt-copy report use the same service; legacy event-derived panels are explicitly marked as historical partial views.

The service exposes only fixed, authenticated operations, parameterized queries and bounded requests. Its PostgreSQL role can insert and call report functions but cannot directly read raw rows, update, delete, create tables or run cleanup. A separate operator-owned timer performs the 90-day bounded cleanup. Browser code never receives database credentials or the service token.

Transport is a dedicated restricted SSH forward between the existing servers, with both HTTP listeners bound to loopback and an independent bearer token. This avoids adding a public database port or changing the unrelated HTTPS application. The tunnel uses a new forwarding-only key; existing deployment keys remain unchanged.

Storage pressure is visible in the admin report. Database size above 2 GiB warns; 4 GiB, less than 2 GiB free disk, or an unavailable capacity check pauses new ingest while keeping existing report data readable. This is a protective limit, not a claim that the full future 90-day workload has been capacity-tested. Observe actual growth after release.
