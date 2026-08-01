-- Isolate the overview RPC from high-volume passive telemetry.
--
-- Context: analytics_events crossed ~780k rows with catalog_impression alone
-- contributing ~70% of daily volume. admin_analytics_overview previously fed
-- every event type (with its event_data jsonb column) through two window-
-- function sorts for visit detection, which pushed the statement past the
-- role statement_timeout and blanked the whole admin analytics dashboard.
--
-- Fix, part 1: visits are anchored on page_view plus the seven meaningful
-- conversion events. Passive telemetry (catalog_impression, pack_offer_view,
-- ...) only ever extended visit liveness, and it always co-occurs with a
-- page_view on the same route, so excluding it leaves pageViews/visitors/
-- series byte-identical and moves visit boundaries only in degenerate cases.
--
-- Fix, part 2: even the slimmed scan spent seconds detoasting event_data to
-- evaluate the environment/deviceType filters row by row, and the planner
-- refuses index-only scans whenever a qual or projection still references
-- the raw jsonb column (documented expression-index limitation). So the
-- environment/bot filters live in the partial-index PREDICATES instead:
-- they are evaluated once at insert time, the planner proves the function's
-- identical where clauses from the predicate and drops them, and both scans
-- (visit events, country coverage) run index-only over real columns. The
-- coalesce wrappers must stay textually identical between the index
-- predicates and the function body or the predicate proof fails.
--
-- Operational prerequisite (applied 2026-07-31, not idempotent SQL): the
-- service_role previously inherited authenticator's 8s statement_timeout,
-- which is what blanked the dashboard once the table grew. Applied:
--   alter role service_role set statement_timeout = '30s';
--   notify pgrst, 'reload config';
-- Worst RPC after 022-024 measures ~5s at the 90d range, so 30s is headroom,
-- not a crutch.

drop index if exists idx_analytics_visit_relevant_created_at;
drop index if exists idx_analytics_visit_scan;
drop index if exists idx_analytics_country_coverage;

create index idx_analytics_visit_scan
  on public.analytics_events (
    created_at,
    event_type,
    session_id,
    id
  )
  where event_type in (
    'page_view',
    'code_copy',
    'shadcn_command_copy',
    'style_export',
    'pack_purchase_intent',
    'pack_checkout_start',
    'pack_purchase',
    'pack_install_success'
  )
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

-- countryCoveragePct is the one metric that would otherwise force the main
-- scan back to the heap to read event_data->>'country'. It gets its own
-- predicate-only index so the function can count it index-only as well.
create index idx_analytics_country_coverage
  on public.analytics_events (created_at)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
  and (event_data->>'country') is not null;

create or replace function public.admin_analytics_overview(
  p_start timestamptz,
  p_end timestamptz,
  p_timezone text default 'Asia/Shanghai'
)
returns jsonb
language sql
stable
security definer
set search_path = public, auth
as $$
with
parameters as (
  select
    p_start as current_start,
    p_end as current_end,
    p_start - (p_end - p_start) as previous_start
),
accepted_events as (
  select
    id,
    event_type,
    session_id,
    created_at,
    case
      when event_type in (
        'code_copy',
        'shadcn_command_copy',
        'style_export',
        'pack_purchase_intent',
        'pack_checkout_start',
        'pack_purchase',
        'pack_install_success'
      ) then 1
      else 0
    end as meaningful_event
  from public.analytics_events, parameters
  where created_at >= parameters.previous_start
    and created_at < parameters.current_end
    and event_type in (
      'page_view',
      'code_copy',
      'shadcn_command_copy',
      'style_export',
      'pack_purchase_intent',
      'pack_checkout_start',
      'pack_purchase',
      'pack_install_success'
    )
    and coalesce(event_data->>'environment', 'production') = 'production'
    and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
),
session_events as (
  select
    id,
    event_type,
    session_id,
    created_at,
    meaningful_event,
    case
      when lag(created_at) over (
        partition by session_id order by created_at, id
      ) is null then 1
      when created_at - lag(created_at) over (
        partition by session_id order by created_at, id
      ) > interval '30 minutes' then 1
      else 0
    end as starts_visit
  from accepted_events
  where session_id is not null
),
visit_numbered as (
  select
    *,
    sum(starts_visit) over (
      partition by session_id order by created_at, id rows unbounded preceding
    ) as visit_number
  from session_events
),
visits as (
  select
    session_id,
    visit_number,
    min(created_at) as started_at,
    max(created_at) as ended_at,
    count(*) filter (where event_type = 'page_view')::bigint as page_views,
    sum(meaningful_event)::bigint as meaningful_events
  from visit_numbered
  group by session_id, visit_number
  having count(*) filter (where event_type = 'page_view') > 0
),
current_pageviews as (
  select *
  from accepted_events, parameters
  where event_type = 'page_view'
    and created_at >= parameters.current_start
    and created_at < parameters.current_end
),
previous_pageviews as (
  select *
  from accepted_events, parameters
  where event_type = 'page_view'
    and created_at >= parameters.previous_start
    and created_at < parameters.current_start
),
current_visits as (
  select *
  from visits, parameters
  where started_at >= parameters.current_start
    and started_at < parameters.current_end
),
previous_visits as (
  select *
  from visits, parameters
  where started_at >= parameters.previous_start
    and started_at < parameters.current_start
),
bucket_bounds as (
  select
    case
      when p_end - p_start <= interval '1 day' then 'hour'
      else 'day'
    end as unit,
    case
      when p_end - p_start <= interval '1 day'
        then date_trunc('hour', p_start at time zone p_timezone)
      else date_trunc('day', p_start at time zone p_timezone)
    end as first_bucket,
    case
      when p_end - p_start <= interval '1 day'
        then date_trunc('hour', (p_end - interval '1 microsecond') at time zone p_timezone)
      else date_trunc('day', (p_end - interval '1 microsecond') at time zone p_timezone)
    end as last_bucket
),
buckets as (
  select
    bucket_bounds.unit,
    generate_series(
      bucket_bounds.first_bucket,
      bucket_bounds.last_bucket,
      case when bucket_bounds.unit = 'hour' then interval '1 hour' else interval '1 day' end
    ) as local_bucket
  from bucket_bounds
),
current_series as (
  select
    case
      when bucket_bounds.unit = 'hour'
        then date_trunc('hour', current_pageviews.created_at at time zone p_timezone)
      else date_trunc('day', current_pageviews.created_at at time zone p_timezone)
    end as local_bucket,
    count(*)::bigint as page_views,
    count(distinct current_pageviews.session_id)::bigint as visitors
  from current_pageviews cross join bucket_bounds
  group by 1
),
previous_series as (
  select
    case
      when bucket_bounds.unit = 'hour'
        then date_trunc('hour', (previous_pageviews.created_at + (p_end - p_start)) at time zone p_timezone)
      else date_trunc('day', (previous_pageviews.created_at + (p_end - p_start)) at time zone p_timezone)
    end as local_bucket,
    count(*)::bigint as page_views
  from previous_pageviews cross join bucket_bounds
  group by 1
),
series as (
  select
    buckets.local_bucket,
    coalesce(current_series.page_views, 0)::bigint as page_views,
    coalesce(current_series.visitors, 0)::bigint as visitors,
    coalesce(previous_series.page_views, 0)::bigint as previous_page_views
  from buckets
  left join current_series on current_series.local_bucket = buckets.local_bucket
  left join previous_series on previous_series.local_bucket = buckets.local_bucket
  order by buckets.local_bucket
),
current_stats as (
  select
    (select count(*) from current_pageviews)::bigint as page_views,
    (select count(distinct session_id) from current_pageviews where session_id is not null)::bigint as visitors,
    (select count(*) from current_visits)::bigint as visits,
    (select count(*) from current_visits where page_views > 1 or meaningful_events > 0)::bigint as engaged_visits,
    (select count(*) from current_visits where page_views = 1 and meaningful_events = 0)::bigint as bounced_visits
),
previous_stats as (
  select
    (select count(*) from previous_pageviews)::bigint as page_views,
    (select count(distinct session_id) from previous_pageviews where session_id is not null)::bigint as visitors,
    (select count(*) from previous_visits)::bigint as visits,
    (select count(*) from previous_visits where page_views = 1 and meaningful_events = 0)::bigint as bounced_visits
)
select jsonb_build_object(
  'range', jsonb_build_object(
    'start', p_start,
    'end', p_end,
    'timezone', p_timezone
  ),
  'current', jsonb_build_object(
    'pageViews', current_stats.page_views,
    'visitors', current_stats.visitors,
    'visits', current_stats.visits,
    'engagedVisits', current_stats.engaged_visits,
    'bouncedVisits', current_stats.bounced_visits,
    'bounceRate', case
      when current_stats.visits = 0 then null
      else round((current_stats.bounced_visits::numeric / current_stats.visits) * 100, 1)
    end,
    'viewsPerVisit', case
      when current_stats.visits = 0 then null
      else round(current_stats.page_views::numeric / current_stats.visits, 2)
    end
  ),
  'previous', jsonb_build_object(
    'pageViews', previous_stats.page_views,
    'visitors', previous_stats.visitors,
    'visits', previous_stats.visits,
    'bounceRate', case
      when previous_stats.visits = 0 then null
      else round((previous_stats.bounced_visits::numeric / previous_stats.visits) * 100, 1)
    end,
    'viewsPerVisit', case
      when previous_stats.visits = 0 then null
      else round(previous_stats.page_views::numeric / previous_stats.visits, 2)
    end
  ),
  'series', coalesce((
    select jsonb_agg(jsonb_build_object(
      'bucket', local_bucket,
      'pageViews', page_views,
      'visitors', visitors,
      'previousPageViews', previous_page_views
    ) order by local_bucket)
    from series
  ), '[]'::jsonb),
  'quality', jsonb_build_object(
    'status', case
      when exists (
        select 1 from current_pageviews where session_id is null
      ) then 'partial'
      else 'complete'
    end,
    'anonymousPageViews', (
      select count(*) from current_pageviews where session_id is null
    ),
    'countryCoveragePct', case
      when current_stats.page_views = 0 then null
      else round((
        select count(*)::numeric
        from public.analytics_events
        where event_type = 'page_view'
          and created_at >= p_start
          and created_at < p_end
          and coalesce(event_data->>'environment', 'production') = 'production'
          and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
          and (event_data->>'country') is not null
      ) / current_stats.page_views * 100, 1)
    end,
    'generatedAt', now()
  )
)
from current_stats cross join previous_stats;
$$;

revoke all on function public.admin_analytics_overview(timestamptz, timestamptz, text)
  from public, anon, authenticated;

grant execute on function public.admin_analytics_overview(timestamptz, timestamptz, text)
  to service_role;
