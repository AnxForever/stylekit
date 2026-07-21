# Analytics Feature Evidence Ledger

| ID | Capability | Delivery | Evidence coverage | Historical gap | Current evidence | Decision / acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- |
| ANA-01 | Event ingestion | operational | partial | backfilled | Typed schema, rate limiting, trusted UA parsing and `deviceType=bot` exclusion | Geo remains partial on Aliyun when trusted country headers are absent |
| ANA-02 | Page views | operational | covered | backfilled | Production-only human `page_view` SQL aggregation; client navigation tracked | Direct SQL/API comparison required in release verification |
| ANA-03 | Visitors | operational | covered | backfilled | Distinct non-null browser session identifiers; limitations documented in metric contract | Label as anonymous/independent visitor, never a verified person |
| ANA-04 | Visits | operational | covered | backfilled | Migration 019 performs 30-minute windowed visitization | Meaningful events can make a single-page visit engaged |
| ANA-05 | Bounce rate | operational | covered | reopened-by-change | Non-engaged visits / visits, with inverse semantic comparison color | Null when no visits; SQL/API inputs verified |
| ANA-06 | Acquisition | operational | partial | inherited-unassessed | Path/referrer/browser/device fields exist; country often absent on Aliyun | Normalize landing attribution, exclude internal soft nav, expose coverage percentage |
| ANA-07 | Period comparison | operational | partial | backfilled | Previous page-view exact count exists | Compare equal half-open intervals; flag incomplete current bucket |
| ANA-08 | Product behavior | operational | partial | inherited-unassessed | Typed event vocabulary includes exposure through verified outcome | Group by evidence strength; funnels use distinct entities and ordered steps |
| ANA-09 | Registration | operational | partial | backfilled | Supabase Auth list operation | Population ratio only; do not label as attributed conversion |
| ANA-10 | Content operations | operational | partial | backfilled | Exact counts and creation trends | Move audit counts to audit source; isolate failures per source |
| ANA-11 | Dashboard API | operational | covered | previously-overclaimed | Dedicated SQL RPC/API endpoints; no dashboard raw-event downloads | Panel failures remain isolated and cached independently |
| ANA-12 | Multi-page IA | operational | covered | backfilled | Overview/traffic/content/users/audit routes deployed; URL range persists | Each route has a focused responsibility and independently cached endpoint |
| ANA-13 | Visualization | operational | covered | backfilled | Monotone curves, separate visitor/view scales, sparse Y ticks, investigation cursor, keyboard points and disclosure tables | No shared axis for materially different magnitudes |
| ANA-14 | Performance | operational | covered | reopened-by-change | SQL aggregates, persistent snapshot, 60s server cache, 5m SWR dedupe and route/data prefetch | Authenticated post-restart and switch timings recorded below |
| ANA-15 | Production deployment | operational | covered | none | Aliyun scoped deployment, backups, PM2 restart and production smoke checks | Preserve rollback backup and measure cold/warm behavior after each analytics release |
| ANA-16 | Instant first paint | operational | covered | backfilled | All five routes inject server data; aggregate snapshots persist in `.data` across PM2 restarts; authentication verified by a 200 response from `/api/admin/auth` | Corrected post-restart test: overview 465ms, traffic 400ms, content 237ms, users 141ms, audit 255ms; zero visible skeletons and console errors |
| ANA-18 | Vercel-style technical/acquisition dimensions | operational | partial | backfilled | OS and hostname were already captured; migration 020 adds hostname and UTM breakdowns; page views now retain session UTM | UI exposes OS, hostname, source, medium and campaign; historical UTM correctly remains unattributed |
| ANA-19 | Custom events | operational | covered | backfilled | Migration 021 aggregates non-page-view product events with a partial index; content page renders event count, visitors and share | Production SQL/API totals both 13,400; API returned 7 event types and rendered `catalog_impression` without a skeleton |
| ANA-20 | Independent visitor/page-view scales | operational | covered | reopened-by-user-feedback | Overview and traffic previously shared a Y axis, visually flattening visitors | Both pages now render separate charts and Y scales; production browser found two overview chart images and zero visible skeletons |
| ANA-17 | Vercel-aligned exploration | operational | covered | none | Official Vercel docs mapped to visitors, views, bounce, pages, referrers, country, browser, device, OS, hostname, UTM and custom events | Adapted applicable patterns; unsupported attribution and feature flags are not fabricated |

## Current production baseline

- Correctly authenticated, post-PM2-restart DOMContentLoaded: 141–465ms across the five routes.
- Warm client navigation: 85–127ms, with no visible skeletons.
- Custom-event SQL/API totals: 13,400 / 13,400 for the verified seven-day window.
- Seven-day custom-event query after indexing: approximately 1.25 seconds cold.
- Persistent aggregate snapshots survive PM2 restart and are silently revalidated by SWR.
