-- StyleKit Umami archive aggregates, 2026-11-03.
-- These CSVs are the durable record that survives raw-event pruning:
-- one row per day and slug for the whole lifetime of the dataset.
-- Run as: sudo -u postgres psql -d umami -v ON_ERROR_STOP=1 -f archive.sql

\pset pager off
\timing on

\copy (SELECT to_char(we.created_at AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD') AS day, ed.string_value AS slug, count(*) FILTER (WHERE we.event_name = 'catalog_impression') AS impressions, count(*) FILTER (WHERE we.event_name = 'style_view') AS style_views, count(*) FILTER (WHERE we.event_name = 'showcase_open') AS showcase_opens, count(*) FILTER (WHERE we.event_name = 'code_copy') AS code_copies, count(*) FILTER (WHERE we.event_name = 'style_export') AS exports FROM event_data ed JOIN website_event we ON we.event_id = ed.website_event_id WHERE ed.data_key = 'slug' AND ed.string_value IS NOT NULL GROUP BY 1, 2 ORDER BY 1, 2) TO '/tmp/analytics-study/daily-style-metrics.csv' WITH CSV HEADER

\copy (SELECT to_char(created_at AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD') AS day, coalesce(event_name, '(pageview)') AS event, count(*) AS events, count(DISTINCT session_id) AS visitors FROM website_event GROUP BY 1, 2 ORDER BY 1, 2) TO '/tmp/analytics-study/daily-event-mix.csv' WITH CSV HEADER

\copy (SELECT to_char(created_at AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD') AS day, coalesce(referrer_domain, '(direct)') AS referrer, count(*) AS pageviews FROM website_event WHERE event_name IS NULL GROUP BY 1, 2 HAVING count(*) >= 5 ORDER BY 1, 3 DESC) TO '/tmp/analytics-study/daily-referrers.csv' WITH CSV HEADER

\copy (SELECT to_char(created_at AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD') AS day, url_path, count(*) AS pageviews FROM website_event WHERE event_name IS NULL GROUP BY 1, 2 HAVING count(*) >= 5 ORDER BY 1, 3 DESC) TO '/tmp/analytics-study/daily-pages.csv' WITH CSV HEADER
