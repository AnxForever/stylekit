# StyleKit Analytics Metrics Contract

Status: active contract for the admin analytics rebuild  
Baseline date: 2026-07-12  
Default reporting timezone: Asia/Shanghai  

This document defines what each metric means before it is implemented in SQL.
The dashboard, database functions, API responses, tests, and explanatory copy
must use the same definitions.

## Vercel Analytics capability mapping

| Vercel capability | StyleKit decision | Location / limitation |
| --- | --- | --- |
| Visitors and page views | Adapted; separate charts and Y scales | Overview and traffic |
| Bounce rate and visits | Adapted with 30-minute visitization and meaningful engagement | Overview and users |
| Pages and referrers | Adapted | Traffic |
| Country, browser, device, OS | Adapted; country coverage is disclosed | Traffic |
| Hostname | Adapted | Traffic |
| UTM source, medium, campaign | Adapted from deployment date forward | Traffic; historical page views remain unattributed |
| Custom Events | Adapted with event count, visitors and share | Content |
| Production/preview filtering | Production-only by default | SQL aggregation contract |
| Feature flags | Not adopted | StyleKit has no deployed flag-assignment data model |
| Attributed conversion | Not claimed | Requires a durable anonymous-to-user link that is not collected |

The implementation learns from Vercel's information hierarchy and interaction
model. It does not copy trademarks, proprietary assets, plan-gated claims, or
metrics unsupported by StyleKit's collected data.

## Reporting dimensions

- Environment: production only by default. Preview, development, and test data
  must never be mixed into production metrics.
- Time range: half-open interval `[start, end)` expressed as UTC timestamps.
- Display timezone: Asia/Shanghai unless the administrator explicitly changes it.
- Comparison: the immediately preceding interval with the same duration.
- Incomplete buckets: shown as incomplete and excluded from rate-of-change alerts.

## Core traffic metrics

### Page views

Count of accepted `page_view` events in the reporting interval after excluding
known bots and non-production environments.

- Multiple views by one visitor all count.
- Client-side navigation counts as a page view.
- Query strings are excluded from the canonical path unless a future campaign
  dimension explicitly stores an allowlisted UTM value.

### Visitor

Distinct non-null `session_id` values that produced at least one accepted
`page_view` in the interval.

This is currently a browser-generated identifier, not a person. Clearing site
storage, changing browser/device, or blocked storage can create another visitor.
Null identifiers are excluded from unique-visitor and bounce calculations but
their page views remain in the page-view total.

### Visit

A visit is a sequence of page views for one `session_id`, split after 30 minutes
without activity. This differs from the inherited implementation, which treats
the entire lifetime of a `session_id` as one visit.

The rebuilt aggregation layer must calculate a stable `visit_id` or equivalent
windowed grouping. Until that exists, the UI must label inherited counts as
"访客会话标识" rather than implying a standards-compatible visit.

### Engaged visit

A visit is engaged when either condition is true:

- it contains at least two page views; or
- it contains an allowlisted meaningful event such as `code_copy`,
  `style_export`, `pack_purchase_intent`, `pack_checkout_start`, or
  `pack_install_success`.

Passive impressions and administrative events do not create engagement.

### Bounce rate

`non_engaged_visits / total_visits * 100`

The direction is inverted for comparison colors: a decrease is positive and an
increase is negative. The inherited implementation uses single-page
`session_id` groups and ignores meaningful events, so it is a historical gap and
must not be presented as fully accurate until visitization is deployed.

### Views per visit

`page_views / total_visits`

Return `null`, not zero, when there are no visits.

## Acquisition dimensions

- Page: normalized `event_data.path`.
- Referrer: external domain recorded only for the landing page. Internal soft
  navigations must not overwrite acquisition source.
- Channel: direct, search, social, external referral, or internal/unknown.
- Country: ISO 3166-1 alpha-2 code derived at trusted ingestion time. Aliyun does
  not currently provide Vercel/Cloudflare geo headers, so missing country data is
  expected until a trusted GeoIP source is configured.
- Browser, OS, device: parsed once at ingestion. `deviceType = bot` is excluded
  from human traffic metrics.
- UTM: only allowlisted UTM fields; never store arbitrary query parameters.

## Product-value metrics

Events are grouped by evidence strength:

1. Exposure: `catalog_impression`, `pack_offer_view`, `pack_price_view`.
2. Exploration: `style_view`, `showcase_open`, `template_view`, `animation_view`.
3. Implementation intent: `code_copy`, `shadcn_command_copy`, `style_export`.
4. Commercial intent: `pack_purchase_intent`, `pack_checkout_start`.
5. Verified outcome: `pack_purchase`, `pack_install_success`.

Funnels must use distinct visits or authenticated users consistently. They must
not mix raw event counts with unique-user counts. A funnel step must occur after
the previous step within the configured conversion window.

## Registration metrics

- New registrations: `auth.users.created_at` within `[start, end)`.
- Total registrations: all non-deleted Auth users visible to the service role.
- Registration/visitor ratio: registrations in the interval divided by visitors
  in the interval. This is a population ratio, not attribution.
- Attributed registration conversion requires a durable anonymous-to-user link
  and is not currently available. The UI must say so explicitly.

## Content operations

- Comments, ratings, favorites, and submissions are exact table counts.
- Content trends use the row creation timestamp in the reporting timezone.
- Submission states are mutually exclusive: pending, approved, rejected.
- Administrative actions come from the audit log, not analytics event names.

## Data-quality rules

Every analytics response must include quality metadata sufficient for the UI to
distinguish these states:

- `complete`: all required sources were available and no configured limit was hit.
- `partial`: optional dimensions such as country are missing for some events.
- `truncated`: a hard row or time limit affected the result.
- `stale`: cached data is older than the target freshness interval.
- `unavailable`: a required source failed or is not configured.

The UI must never silently substitute zero for unavailable data.

## Performance contract

- Overview shell and cached core metrics: target p95 under 1 second.
- Cold core-metric query: target p95 under 2 seconds.
- Individual breakdown panel: target p95 under 2 seconds.
- No dashboard request may download all raw events into the Next.js process.
- Panels load independently; one failed dimension cannot block the whole page.
- Default cached response may be served stale while a refresh runs in the
  background, with freshness shown in the UI.

## Accuracy verification

For each reporting range, automated verification must compare API results with
direct SQL for at least:

- page views;
- visitors and visits;
- bounce rate inputs;
- current and previous time buckets;
- top pages and referrers;
- registration totals;
- each funnel step.

Fixtures must cover null session IDs, bots, midnight boundaries, daylight/timezone
boundaries, repeated page views, 30-minute visit splits, meaningful single-page
engagement, missing GeoIP data, and incomplete current buckets.
