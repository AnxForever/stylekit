# Analytics traffic policy

The production overview and its traffic breakdowns use the same read-only
Umami `website_event` pageview rows. A pageview is eligible when
`event_name IS NULL`, its hostname is `stylekit.top` or `www.stylekit.top`,
and it does not match one of the explicit exclusions below. All time windows
use Asia/Shanghai and compare the same relative bucket index, including empty
buckets.

The dashboard's **visitors** number is the count of distinct Umami
`session_id` values among eligible pageviews in the selected window. Umami
derives these anonymous identifiers from browser and network signals; they do
not establish the number of distinct people. The pageview and visitor counts in
each breakdown are both computed from the same eligible pageview rows.

## Exclusions

Each raw pageview receives at most one reason, using this precedence:

| Reason | Rule |
| --- | --- |
| `non_production` | Hostname is outside the two canonical production hosts, or the path is an API/framework/analytics endpoint (`/api`, `/_next`, `/umami`, `/robots.txt`, or `/sitemap.xml`). |
| `internal` | Path is `/admin` or `/admin-login` (including locale-prefixed routes), the query contains the exact marker `analytics=off`, or `website_event.tag` is exactly `internal-test` or `qa` (case-insensitive after trimming). |
| `automation` | `session.browser` is exactly `headlesschrome`, `phantomjs`, or `bot`, or `website_event.tag` is exactly `automated-test`, `bot`, or `automation` (case-insensitive after trimming). |

The QA query marker is deliberately exact: `analytics=off` is excluded;
`analytics=0`, `Analytics=off`, and unrelated query values are not. New test
automation should use the explicit `website_event.tag` values above. The
historical fallback Chrome user agent is not used as evidence of automation.

High pageview volume by itself is a review signal. The observed 204 pageviews
in about 11 minutes remains in the filtered totals unless it also meets one of
the explicit rules above.

## Historical provenance

The import log reported that 232,380 events were sent around
2026-08-16 01:45 Asia/Shanghai. A later script modification means individual
imported rows cannot be identified reliably from the current database alone.
The snapshot therefore marks ranges crossing the approximate
`2026-08-16T02:00:00+08:00` boundary as `mixed_legacy`, reports the log count as
historical context, and states that row-level attribution is unverified. It
does not claim that every event before the boundary was imported or that the
reported count equals the number of imported rows currently stored.

The generator never updates, deletes, or retags Umami events. It opens a
repeatable-read, read-only PostgreSQL transaction and writes only the aggregate
snapshot file after a successful read. A failed read does not create a new
snapshot; consumers must use the snapshot generation time and show stale or
unavailable state instead of replacing missing values with zero.

## Running the generator

Run with Node on the Umami host, where `pg` is already installed under
`/www/umami/import`. The connection string and website id have no defaults and
must be supplied by the runtime environment. The output path must be explicit:

```sh
DATABASE_URL="$DATABASE_URL" WEBSITE_ID="$WEBSITE_ID" \
  OUTPUT_PATH=/path/to/analytics-snapshot.json \
  node ops/analytics/generate-umami-snapshot.mjs
```

Use `--dry-run` to print aggregate counts and exclusion totals to stdout
without creating or changing a file. `--output /path/to/file` can be used in
place of `OUTPUT_PATH`.
