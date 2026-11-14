-- Browser identifiers and idempotency start at measurement version 2.
-- Legacy session identifiers cannot establish browser UV and are not backfilled.
alter table public.analytics_events
  add column if not exists visitor_id text,
  add column if not exists event_id uuid;

-- A full unique index supports PostgREST onConflict=event_id. PostgreSQL permits
-- multiple NULLs, preserving historical rows that have no idempotency key.
create unique index if not exists idx_analytics_event_id
  on public.analytics_events(event_id);

create index if not exists idx_analytics_v2_scan
  on public.analytics_events(created_at, style_slug, visitor_id)
  where event_data->>'measurementVersion' = '2'
    and event_data->>'environment' = 'production'
    and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create or replace function public.admin_analytics_style_insights(
  p_start timestamptz,
  p_end timestamptz
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if p_start is null or p_end is null or p_end <= p_start
    or p_end - p_start > interval '90 days' then
    raise exception 'Analytics window must be positive and at most 90 days';
  end if;

  return (
    with accepted as materialized (
      select
        event_type, style_slug, nullif(visitor_id, '') as visitor_id,
        nullif(session_id, '') as session_id, created_at, event_data,
        event_type in ('style_view', 'showcase_view') as is_view,
        -- Project briefs emit both prompt_copy and project_brief_copy. Count
        -- only the specific action so one clipboard action remains one copy.
        (event_type in ('code_copy', 'shadcn_command_copy', 'project_brief_copy')
          or (event_type = 'prompt_copy'
            and coalesce(event_data->>'prompt_type', '') <> 'project-brief')) as is_copy,
        event_type in ('style_export', 'project_brief_download') as is_export,
        case when event_type = 'style_engagement'
          and event_data->>'active_ms' ~ '^[0-9]{1,7}$'
          then least((event_data->>'active_ms')::bigint, 1800000) else 0 end as active_ms,
        case when event_type = 'style_engagement'
          and event_data->>'max_scroll_percent' ~ '^[0-9]{1,3}$'
          then least((event_data->>'max_scroll_percent')::int, 100) else 0 end as scroll_percent
      from public.analytics_events
      where created_at >= p_start and created_at < p_end
        and event_data->>'measurementVersion' = '2'
        and event_data->>'environment' = 'production'
        and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
    ),
    traffic as (
      select
        count(*)::bigint as page_views,
        count(distinct visitor_id)::bigint as visitors,
        count(distinct session_id)::bigint as visits,
        count(*) filter (where visitor_id is null)::bigint as unidentified
      from accepted where event_type = 'page_view'
    ),
    visitor_stages as (
      select style_slug, visitor_id,
        min(created_at) filter (where event_type = 'catalog_impression') as first_exposure,
        max(created_at) filter (where event_type = 'catalog_click') as last_click,
        min(created_at) filter (where is_view) as first_view,
        max(created_at) filter (where is_copy or is_export) as last_use,
        sum(active_ms) as active_ms
      from accepted
      where style_slug is not null and visitor_id is not null
      group by style_slug, visitor_id
    ),
    funnels as (
      select style_slug,
        count(*) filter (where first_exposure <= last_click)::bigint as matched_clicks,
        count(*) filter (where first_view <= last_use)::bigint as matched_uses,
        count(*) filter (where active_ms >= 10000)::bigint as engaged_visitors
      from visitor_stages group by style_slug
    ),
    style_counts as (
      select style_slug,
        count(*) filter (where event_type = 'catalog_impression')::bigint as impressions,
        count(distinct visitor_id) filter (where event_type = 'catalog_impression')::bigint as exposed_visitors,
        count(*) filter (where event_type = 'catalog_click')::bigint as clicks,
        count(distinct visitor_id) filter (where event_type = 'catalog_click')::bigint as click_visitors,
        count(*) filter (where event_type = 'style_view')::bigint as detail_views,
        count(distinct visitor_id) filter (where event_type = 'style_view')::bigint as detail_visitors,
        count(*) filter (where event_type = 'showcase_view')::bigint as showcase_views,
        count(distinct visitor_id) filter (where event_type = 'showcase_view')::bigint as showcase_visitors,
        count(distinct visitor_id) filter (where is_view)::bigint as view_visitors,
        count(*) filter (where is_copy)::bigint as copies,
        count(distinct visitor_id) filter (where is_copy)::bigint as copy_visitors,
        count(*) filter (where is_export)::bigint as exports,
        count(distinct visitor_id) filter (where is_export)::bigint as export_visitors,
        count(*) filter (where event_type = 'style_favorite' and event_data->>'action' = 'add')::bigint as favorite_adds,
        count(*) filter (where event_type = 'style_favorite' and event_data->>'action' = 'remove')::bigint as favorite_removes,
        count(distinct visitor_id) filter (where event_type = 'style_favorite' and event_data->>'action' = 'add')::bigint as favorite_visitors,
        count(*) filter (where event_type = 'style_favorite' and event_data->>'action' = 'add'
          and event_data->>'storage' = 'account')::bigint as account_favorite_adds,
        count(*) filter (where event_type = 'style_favorite' and event_data->>'action' = 'add'
          and event_data->>'storage' = 'local')::bigint as local_favorite_adds,
        sum(active_ms)::bigint as active_ms,
        max(scroll_percent) as max_scroll_percent,
        count(*) filter (where visitor_id is null)::bigint as unidentified_events
      from accepted where style_slug is not null
      group by style_slug
    ),
    source_counts as (
      select style_slug, coalesce(event_data->>'surface', 'unknown') as surface,
        count(*) filter (where event_type = 'catalog_impression')::bigint as impressions,
        count(distinct visitor_id) filter (where event_type = 'catalog_impression')::bigint as exposed_visitors,
        count(*) filter (where event_type = 'catalog_click')::bigint as clicks,
        count(distinct visitor_id) filter (where event_type = 'catalog_click')::bigint as click_visitors,
        round(avg(case when event_data->>'rank' ~ '^[0-9]{1,5}$'
          then (event_data->>'rank')::numeric else null end)
          filter (where event_type = 'catalog_impression'), 2) as average_rank
      from accepted
      where style_slug is not null and event_type in ('catalog_impression', 'catalog_click')
      group by style_slug, coalesce(event_data->>'surface', 'unknown')
    )
    select jsonb_build_object(
      'version', 2,
      'source', 'first_party',
      'retentionDays', 90,
      'range', jsonb_build_object('start', p_start, 'end', p_end, 'timezone', 'Asia/Shanghai'),
      'generatedAt', now(),
      'firstCollectedAt', (
        select min(created_at) from public.analytics_events
        where event_data->>'measurementVersion' = '2'
          and event_data->>'environment' = 'production'
          and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
      ),
      'traffic', jsonb_build_object(
        'pageViews', traffic.page_views, 'visitors', traffic.visitors,
        'visits', traffic.visits, 'unidentifiedPageViews', traffic.unidentified
      ),
      'styles', coalesce((
        select jsonb_agg(jsonb_build_object(
          'slug', counts.style_slug,
          'impressions', counts.impressions, 'exposedVisitors', counts.exposed_visitors,
          'clicks', counts.clicks, 'clickVisitors', counts.click_visitors,
          'detailViews', counts.detail_views, 'detailVisitors', counts.detail_visitors,
          'showcaseViews', counts.showcase_views, 'showcaseVisitors', counts.showcase_visitors,
          'viewVisitors', counts.view_visitors,
          'copies', counts.copies, 'copyVisitors', counts.copy_visitors,
          'exports', counts.exports, 'exportVisitors', counts.export_visitors,
          'favoriteAdds', counts.favorite_adds, 'favoriteRemoves', counts.favorite_removes,
          'favoriteVisitors', counts.favorite_visitors,
          'accountFavoriteAdds', counts.account_favorite_adds, 'localFavoriteAdds', counts.local_favorite_adds,
          'activeMs', counts.active_ms, 'maxScrollPercent', counts.max_scroll_percent,
          'engagedVisitors', coalesce(funnels.engaged_visitors, 0),
          'matchedClickVisitors', coalesce(funnels.matched_clicks, 0),
          'matchedUseVisitors', coalesce(funnels.matched_uses, 0),
          'unidentifiedEvents', counts.unidentified_events
        ) order by counts.detail_views + counts.showcase_views desc, counts.style_slug)
        from style_counts counts left join funnels using (style_slug)
      ), '[]'::jsonb),
      'sources', coalesce((
        select jsonb_agg(jsonb_build_object(
          'slug', style_slug, 'surface', surface,
          'impressions', impressions, 'exposedVisitors', exposed_visitors,
          'clicks', clicks, 'clickVisitors', click_visitors, 'averageRank', average_rank
        ) order by impressions desc, style_slug, surface)
        from source_counts
      ), '[]'::jsonb)
    ) from traffic
  );
end;
$$;

revoke all on function public.admin_analytics_style_insights(timestamptz, timestamptz)
  from public, anon, authenticated;
grant execute on function public.admin_analytics_style_insights(timestamptz, timestamptz)
  to service_role;

-- Migration 033 already schedules this function every 15 minutes. Preserve its
-- signature and privileges while retaining v2 for the complete 90-day selector.
-- The legacy default remains seven days; no deleted history can be recovered.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated, service_role;

create or replace function private.cleanup_analytics_events(
  p_retention interval default interval '7 days',
  p_batch_size integer default 50000
)
returns integer
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  deleted_count integer;
begin
  if p_retention is null or p_retention <= interval '0 days' then
    raise exception 'retention must be positive';
  end if;
  if p_batch_size is null or p_batch_size < 1 or p_batch_size > 50000 then
    raise exception 'batch size must be between 1 and 50000';
  end if;

  with victims as (
    select id from public.analytics_events
    where created_at < now() - case
      when event_data->>'measurementVersion' = '2'
        then greatest(p_retention, interval '90 days')
      else p_retention
    end
    order by created_at, id
    limit p_batch_size
    for update skip locked
  ), deleted as (
    delete from public.analytics_events target
    using victims
    where target.id = victims.id
    returning 1
  )
  select count(*) into deleted_count from deleted;
  return deleted_count;
end;
$$;

revoke all on function private.cleanup_analytics_events(interval, integer)
  from public, anon, authenticated, service_role;
