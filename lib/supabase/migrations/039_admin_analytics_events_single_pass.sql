-- Fix the custom-events admin RPC that regressed to minutes-long runs.
--
-- Observed on production (2026-09-09): admin_analytics_events took 79s for a
-- 30-day window while the same body with literal timestamps ran in 0.2s. Two
-- compounding causes, neither the query itself:
--
-- 1. The CTE is scanned twice (totals cross join), and the second scan sorts
--    28k session ids to disk before grouping — pure duplicated work.
-- 2. The retention cron (033) deletes rows every 15 minutes, so the visibility
--    map is stale most of the day. The partial index
--    idx_analytics_custom_events_scan then degrades from an index-only scan
--    to ~13k heap fetches; against cold network storage each one is a round
--    trip, which is where the seconds went. Default autovacuum scale factor
--    (0.2, ~21k changes) only fires once a day, after the damage is done.
--
-- Rewrite as a single aggregation pass with a window sum for the share, and
-- tune per-table autovacuum so the map keeps up with the delete cadence.

create or replace function public.admin_analytics_events(
  p_start timestamptz, p_end timestamptz, p_limit integer default 20
)
returns table (event text, count bigint, visitors bigint, share numeric)
language sql stable security definer set search_path = public
as $$
with filtered as (
  select event_type, session_id
  from public.analytics_events
  where created_at >= p_start and created_at < p_end
    and event_type <> 'page_view'
    and event_type not like 'admin_%'
    and coalesce(event_data->>'environment', 'production') = 'production'
    and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
)
select
  event_type::text,
  count(*)::bigint,
  count(distinct session_id)::bigint,
  round(
    count(*)::numeric / nullif(sum(count(*)) over (), 0) * 100
  , 1)
from filtered
group by event_type
order by count(*) desc, event_type asc
limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;

-- ~2.6k row changes trigger a vacuum instead of ~21k; with 033 deleting every
-- 15 minutes the map stays clean enough for index-only scans all day.
alter table public.analytics_events set (
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_vacuum_threshold = 500,
  autovacuum_analyze_scale_factor = 0.02
);

-- Immediate relief for the stale map; safe to re-run anytime.
vacuum (analyze) public.analytics_events;
