-- StyleKit Umami prune, 2026-11-03.
-- Keeps 30 days of raw catalog_impression events for the live dashboard.
-- Everything older is retained as aggregates in daily-style-metrics.csv and
-- daily-event-mix.csv in this directory.
-- Run as: sudo -u postgres psql -d umami -v ON_ERROR_STOP=1 -f prune.sql

\pset pager off
\timing on

SELECT now() - interval '30 days' AS cutoff;

-- event_data has no foreign key to website_event, so children go first.
DELETE FROM event_data ed
USING website_event we
WHERE ed.website_event_id = we.event_id
  AND we.event_name = 'catalog_impression'
  AND we.created_at < now() - interval '30 days';

DELETE FROM website_event
WHERE event_name = 'catalog_impression'
  AND created_at < now() - interval '30 days';

VACUUM (ANALYZE) event_data;
VACUUM (ANALYZE) website_event;

SELECT pg_size_pretty(pg_total_relation_size('event_data')) AS event_data,
       pg_size_pretty(pg_total_relation_size('website_event')) AS website_event,
       (SELECT count(*) FROM event_data) AS event_data_rows,
       (SELECT count(*) FROM website_event) AS website_event_rows;
