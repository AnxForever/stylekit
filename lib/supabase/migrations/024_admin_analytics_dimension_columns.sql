-- Promote breakdown dimensions from event_data jsonb to stored generated
-- columns.
--
-- Context: after 022/023, admin_analytics_breakdown was the last slow RPC.
-- Its per-row cost is jsonb detoasting: every event_data->>'<key>' on a
-- TOASTed document detoasts the whole document, so a 30d scan (~140k
-- page_views) burned 15-25s per dimension while the traffic page fires ten
-- dimensions concurrently. Indexes cannot remove that cost because the
-- dimension value itself must be read per row, and the planner does not
-- reliably plan index-only scans over expression columns.
--
-- Fix: materialize the ten dimension keys as STORED generated columns.
-- They are computed once at insert time from the in-memory jsonb, and as
-- REAL columns they can finally live inside partial indexes: the planner
-- reliably plans index-only scans over real columns (it refuses them for
-- expression columns), so each dimension below gets a
-- (created_at, dim_*, session_id) index whose predicate also absorbs the
-- page_view/environment/bot filters. Breakdown scans then never touch the
-- heap at all. Distinct-visitor counts stay exact, which is why this beats
-- a rollup table at the current data scale.
--
-- Operational note: adding stored generated columns rewrites the table
-- (ACCESS EXCLUSIVE for the duration, ~648MB). Run with
--   set statement_timeout = 0; set lock_timeout = '10s';
-- Analytics ingestion blocks or fails for the rewrite window; the site
-- itself is unaffected. Follow with: vacuum (analyze) public.analytics_events;

alter table public.analytics_events
  add column if not exists dim_path text
    generated always as (event_data->>'path') stored,
  add column if not exists dim_referrer_domain text
    generated always as (event_data->>'referrerDomain') stored,
  add column if not exists dim_country text
    generated always as (event_data->>'country') stored,
  add column if not exists dim_browser text
    generated always as (event_data->>'browser') stored,
  add column if not exists dim_os text
    generated always as (event_data->>'os') stored,
  add column if not exists dim_device_type text
    generated always as (event_data->>'deviceType') stored,
  add column if not exists dim_hostname text
    generated always as (event_data->>'hostname') stored,
  add column if not exists dim_utm_source text
    generated always as (event_data->>'utm_source') stored,
  add column if not exists dim_utm_medium text
    generated always as (event_data->>'utm_medium') stored,
  add column if not exists dim_utm_campaign text
    generated always as (event_data->>'utm_campaign') stored;

-- Superseded: the per-dimension indexes below strictly dominate this one.
drop index if exists idx_analytics_page_view_dim_scan;

create index if not exists idx_analytics_dim_path
  on public.analytics_events (created_at, dim_path, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_referrer_domain
  on public.analytics_events (created_at, dim_referrer_domain, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_country
  on public.analytics_events (created_at, dim_country, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_browser
  on public.analytics_events (created_at, dim_browser, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_os
  on public.analytics_events (created_at, dim_os, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_device_type
  on public.analytics_events (created_at, dim_device_type, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_hostname
  on public.analytics_events (created_at, dim_hostname, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_utm_source
  on public.analytics_events (created_at, dim_utm_source, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_utm_medium
  on public.analytics_events (created_at, dim_utm_medium, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create index if not exists idx_analytics_dim_utm_campaign
  on public.analytics_events (created_at, dim_utm_campaign, session_id)
  where event_type = 'page_view'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create or replace function public.admin_analytics_breakdown(
  p_start timestamptz, p_end timestamptz, p_dimension text, p_limit integer default 10
)
returns table (value text, page_views bigint, visitors bigint, share numeric)
language plpgsql stable security definer set search_path = public
as $$
declare dimension_expression text;
begin
  dimension_expression := case p_dimension
    when 'path' then 'coalesce(dim_path, ''/'')'
    when 'referrer' then 'coalesce(dim_referrer_domain, ''Direct'')'
    when 'country' then 'coalesce(dim_country, ''Unknown'')'
    when 'browser' then 'coalesce(dim_browser, ''Unknown'')'
    when 'os' then 'coalesce(dim_os, ''Unknown'')'
    when 'device' then 'coalesce(dim_device_type, ''Unknown'')'
    when 'hostname' then 'coalesce(dim_hostname, ''Unknown'')'
    when 'utm_source' then 'coalesce(nullif(dim_utm_source, ''''), ''Unattributed'')'
    when 'utm_medium' then 'coalesce(nullif(dim_utm_medium, ''''), ''Unattributed'')'
    when 'utm_campaign' then 'coalesce(nullif(dim_utm_campaign, ''''), ''Unattributed'')'
    else null
  end;
  if dimension_expression is null then
    raise exception 'Unsupported analytics dimension: %', p_dimension using errcode = '22023';
  end if;
  return query execute format(
    'with filtered as (
       select %1$s as dimension_value, session_id from public.analytics_events
       where event_type = ''page_view'' and created_at >= $1 and created_at < $2
         and coalesce(event_data->>''environment'', ''production'') = ''production''
         and coalesce(event_data->>''deviceType'', ''unknown'') <> ''bot''
     ), totals as (select count(*)::numeric as total from filtered)
     select dimension_value::text, count(*)::bigint, count(distinct session_id)::bigint,
       case when totals.total = 0 then 0 else round(count(*)::numeric / totals.total * 100, 1) end
     from filtered cross join totals group by dimension_value, totals.total
     order by count(*) desc, dimension_value asc limit $3', dimension_expression
  ) using p_start, p_end, greatest(1, least(coalesce(p_limit, 10), 250));
end;
$$;

revoke all on function public.admin_analytics_breakdown(timestamptz, timestamptz, text, integer)
  from public, anon, authenticated;

grant execute on function public.admin_analytics_breakdown(timestamptz, timestamptz, text, integer)
  to service_role;
