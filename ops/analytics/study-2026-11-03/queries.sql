-- StyleKit Umami study, 2026-11-03.
-- Read-only aggregates against the Umami PostgreSQL on the JD host.
-- Run as: sudo -u postgres psql -d umami -v ON_ERROR_STOP=1 -f queries.sql
-- Writes CSV into /tmp/analytics-study (created and owned by postgres).

\pset pager off
\timing on

-- 1. Month-over-month volume: pageviews, custom events, impressions, sessions.
\copy (SELECT to_char(created_at, 'YYYY-MM') AS month, count(*) FILTER (WHERE event_name IS NULL) AS pageviews, count(*) FILTER (WHERE event_name IS NOT NULL) AS events, count(*) FILTER (WHERE event_name = 'catalog_impression') AS impressions, count(DISTINCT session_id) AS sessions, count(DISTINCT visit_id) AS visits FROM website_event GROUP BY 1 ORDER BY 1) TO '/tmp/analytics-study/monthly.csv' WITH CSV HEADER

-- 2. Daily series in Beijing time.
\copy (SELECT to_char(created_at AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD') AS day, count(*) FILTER (WHERE event_name IS NULL) AS pageviews, count(DISTINCT session_id) AS visitors, count(DISTINCT visit_id) AS visits FROM website_event GROUP BY 1 ORDER BY 1) TO '/tmp/analytics-study/daily.csv' WITH CSV HEADER

-- 3. Pageviews by path, all time and last 30 days.
\copy (SELECT url_path, count(*) AS pageviews, count(DISTINCT session_id) AS visitors FROM website_event WHERE event_name IS NULL GROUP BY 1 ORDER BY 2 DESC LIMIT 300) TO '/tmp/analytics-study/pages-all.csv' WITH CSV HEADER

\copy (SELECT url_path, count(*) AS pageviews, count(DISTINCT session_id) AS visitors FROM website_event WHERE event_name IS NULL AND created_at > now() - interval '30 days' GROUP BY 1 ORDER BY 2 DESC LIMIT 300) TO '/tmp/analytics-study/pages-30d.csv' WITH CSV HEADER

-- 4. Custom events by month.
\copy (SELECT to_char(created_at, 'YYYY-MM') AS month, event_name, count(*) AS events FROM website_event WHERE event_name IS NOT NULL GROUP BY 1, 2 ORDER BY 1, 3 DESC) TO '/tmp/analytics-study/events-monthly.csv' WITH CSV HEADER

-- 5. Style funnel over 30 days, keyed by the slug in event_data.
\copy (SELECT ed.string_value AS slug, count(*) FILTER (WHERE we.event_name = 'catalog_impression') AS impressions, count(*) FILTER (WHERE we.event_name = 'style_view') AS style_views, count(*) FILTER (WHERE we.event_name = 'showcase_open') AS showcase_opens, count(*) FILTER (WHERE we.event_name = 'code_copy') AS code_copies, count(*) FILTER (WHERE we.event_name = 'style_export') AS exports FROM event_data ed JOIN website_event we ON we.event_id = ed.website_event_id WHERE ed.data_key = 'slug' AND ed.string_value IS NOT NULL AND we.created_at > now() - interval '30 days' GROUP BY 1 ORDER BY impressions DESC LIMIT 400) TO '/tmp/analytics-study/style-funnel-30d.csv' WITH CSV HEADER

-- 6. Referrer domains, 30 days (pageviews only).
\copy (SELECT coalesce(referrer_domain, '(direct)') AS referrer, count(*) AS pageviews, count(DISTINCT session_id) AS visitors FROM website_event WHERE event_name IS NULL AND created_at > now() - interval '30 days' GROUP BY 1 ORDER BY 2 DESC LIMIT 60) TO '/tmp/analytics-study/referrers-30d.csv' WITH CSV HEADER

-- 7. Devices, countries and languages from the session table, 30 days.
\copy (SELECT coalesce(browser, '(unknown)') AS browser, coalesce(os, '(unknown)') AS os, coalesce(device, '(unknown)') AS device, count(*) AS sessions FROM session WHERE created_at > now() - interval '30 days' GROUP BY 1, 2, 3 ORDER BY 4 DESC LIMIT 80) TO '/tmp/analytics-study/devices-30d.csv' WITH CSV HEADER

\copy (SELECT coalesce(country, '(unknown)') AS country, count(*) AS sessions FROM session WHERE created_at > now() - interval '30 days' GROUP BY 1 ORDER BY 2 DESC LIMIT 60) TO '/tmp/analytics-study/countries-30d.csv' WITH CSV HEADER

\copy (SELECT coalesce(language, '(unknown)') AS language, count(*) AS sessions FROM session WHERE created_at > now() - interval '30 days' GROUP BY 1 ORDER BY 2 DESC LIMIT 40) TO '/tmp/analytics-study/languages-30d.csv' WITH CSV HEADER

-- 8. Catalog impression context: sort, surface, page, filter count, search presence.
\copy (SELECT ed.data_key, coalesce(ed.string_value, ed.number_value::text) AS value, count(*) AS hits FROM event_data ed JOIN website_event we ON we.event_id = ed.website_event_id WHERE we.event_name = 'catalog_impression' AND we.created_at > now() - interval '30 days' AND ed.data_key IN ('sort', 'surface', 'page', 'filter_count', 'query_present') GROUP BY 1, 2 ORDER BY 1, 3 DESC) TO '/tmp/analytics-study/catalog-context-30d.csv' WITH CSV HEADER

-- 9. Event sources and labels: where style views, showcases and CTAs come from.
\copy (SELECT we.event_name, ed.data_key, coalesce(ed.string_value, ed.number_value::text) AS value, count(*) AS hits FROM event_data ed JOIN website_event we ON we.event_id = ed.website_event_id WHERE we.created_at > now() - interval '30 days' AND we.event_name IN ('style_view', 'showcase_open', 'cta_click', 'github_click', 'prompt_copy', 'code_copy', 'style_export') AND ed.data_key IN ('source', 'label', 'location', 'format', 'language', 'prompt_type') GROUP BY 1, 2, 3 ORDER BY 1, 2, 4 DESC LIMIT 200) TO '/tmp/analytics-study/event-context-30d.csv' WITH CSV HEADER

-- 10. Session depth in 30 days.
\copy (WITH s AS (SELECT session_id, count(*) AS n FROM website_event WHERE created_at > now() - interval '30 days' GROUP BY 1) SELECT CASE WHEN n = 1 THEN '1' WHEN n <= 3 THEN '2-3' WHEN n <= 10 THEN '4-10' WHEN n <= 30 THEN '11-30' WHEN n <= 100 THEN '31-100' WHEN n <= 500 THEN '101-500' ELSE '500+' END AS depth, count(*) AS sessions FROM s GROUP BY 1 ORDER BY min(n)) TO '/tmp/analytics-study/session-depth-30d.csv' WITH CSV HEADER

-- 11. Heavy sessions: possible automation or inflated impressions.
\copy (SELECT s.session_id, s.n AS events, s.impressions, coalesce(se.browser, '?') AS browser, coalesce(se.os, '?') AS os, coalesce(se.device, '?') AS device, coalesce(se.country, '?') AS country, to_char(s.first_seen AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD HH24:MI') AS first_seen FROM (SELECT session_id, count(*) AS n, count(*) FILTER (WHERE event_name = 'catalog_impression') AS impressions, min(created_at) AS first_seen FROM website_event WHERE created_at > now() - interval '30 days' GROUP BY 1 ORDER BY 2 DESC LIMIT 25) s LEFT JOIN session se ON se.session_id = s.session_id ORDER BY s.n DESC) TO '/tmp/analytics-study/heavy-sessions-30d.csv' WITH CSV HEADER

-- 12. Search usage: query length and result count buckets.
\copy (SELECT ed.data_key, coalesce(ed.string_value, ed.number_value::text) AS value, count(*) AS hits FROM event_data ed JOIN website_event we ON we.event_id = ed.website_event_id WHERE we.event_name = 'search' AND we.created_at > now() - interval '30 days' GROUP BY 1, 2 ORDER BY 1, 3 DESC LIMIT 80) TO '/tmp/analytics-study/search-30d.csv' WITH CSV HEADER
