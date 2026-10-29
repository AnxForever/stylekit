# Admin analytics loading performance

Reviewed 2026-10-29. User approved releasing prompt-copy analytics and improving
admin loading performance. Production baseline: bfa7da90, build
YXs9uSmdvUabEIddK_uVW; local dev also contains committed newsletter changes.
Uncommitted glass-profile experiments remain outside this release.

## Baseline and decisions

- Ego authenticated production content-page visit: document TTFB 1725 ms,
  DOMContentLoaded 4794 ms, load 5110 ms. Its resource log contained 14 admin
  API requests and 36 speculative RSC requests after the page settled. These
  are one observed browsing sample, not a population benchmark. The full
  network receipt is private scratch evidence, outside the repository.
- Sidebar mount eagerly preloads styles/users and Next Link automatically
  prefetches all visible admin routes. Overview additionally preloads traffic,
  content and user analysis after 3.5 seconds. Adapt: load a destination after
  explicit navigation intent, disable automatic full-route fan-out, and retain
  targeted focus/hover preloads.
- Analytics SSR already provides initial data; SWR mount revalidation then
  repeats requests. Adapt: hydrate matching-range data without a second fetch,
  fetch absent data normally, and avoid showing the prior range's numbers.
- Content labels previously reread and parse approved community submission
  payloads on every range navigation. Cache the small admin label projection
  with bounded lifetime and coalesce concurrent reads; preserve slug fallback.
- Each snapshot lookup reread an entire JSON file; each completed RPC waited
  for a serial full-file rewrite. Cache parsed snapshots, coalesce file reads
  and writes, and remove disk persistence from the response's critical path.
- Same-key cache misses currently duplicate SQL queries across SSR and API
  calls. Coalesce pending loads and retain the existing short in-memory TTL.
  Failed requests must be retriable and must not poison the fresh cache.
- Seven-day persistent snapshots are outage fallback data. Prefer a live
  provider/RPC when available, preserve the original generatedAt on fallback,
  and do not reclassify fallback as a fresh result. Prompt counts require the
  new live aggregation; missing migration is an unavailable state.

Primary local guidance: installed Next.js 16.3.1 route handlers and loading UI
documentation under `node_modules/next/dist/docs/01-app/`; SWR 2.4.0 source and
the existing SSR/route loaders. Independent evidence: production browser
resource timings and controlled concurrency/failure tests.

## Feature evidence ledger

| ID | Lifecycle / owner outcome | Delivery | Coverage | History | Acceptance / remaining gap |
| --- | --- | --- | --- | --- | --- |
| AP-01 | Admin navigation and hydration / reduce unused and duplicate requests | implemented | partial | backfilled | Explicit destination prefetch; real SWR lifecycle tests prove cold SSR makes no fetch, new range fetches, and returning cached range revalidates; production before/after network receipt pending |
| AP-02 | Shared analytics load / one underlying query for concurrent identical requests | implemented | partial | backfilled | Ten same-key calls invoke one loader; bidirectional SSR/API races share raw RPC shape; failures release in-flight slot; API auth remains ahead of caches; production verification pending |
| AP-03 | Snapshot persistence / efficient durable fallback without stale data posing as live data | implemented | partial | backfilled | Concurrent parsed-store read, batched writes, no response wait for persistence, live-provider priority, original timestamp and STALE fallback header; production restart/outage drill outside scope |
| AP-04 | Content report first load / server-render the prompt report and cache labels | implemented | partial | reopened-by-change | Prompt report hydrates from SSR; community/style zero rows retained; label reads coalesce and refresh within TTL; live migration and UI acceptance pending |

These changes do not change metric definitions or delete/rewrite historical
analytics rows. Tests of synthetic counts are not proof of human users.

## Release acceptance

Build from a clean committed merged main checkout on Linux using the current
production configuration. Preserve source preimages, build identity and a
working rollback before activation. Apply migration 043 through the production
database control plane and verify its service-role-only grants. Keep service
credentials out of logs, commits, client bundles and public evidence.

After deployment, verify health/build identity, authenticated report API and
content page, request counts, success-only collection metadata, public pages,
robots/sitemap/LLM paths and the intentionally POST-only MCP endpoint.
