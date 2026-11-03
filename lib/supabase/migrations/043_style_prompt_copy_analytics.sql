-- Separate prompt-use analytics from generic code and component copies.
-- Historical code_copy events are intentionally not backfilled: their language
-- field did not consistently identify prompt copies.

create index if not exists idx_analytics_prompt_copy_scan
  on public.analytics_events (
    created_at,
    style_slug,
    (event_data->>'prompt_type'),
    session_id
  )
  where event_type = 'prompt_copy'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

create or replace function public.admin_analytics_prompt_copies(
  p_start timestamptz,
  p_end timestamptz
)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
with accepted_events as (
  select
    style_slug,
    session_id,
    event_data->>'prompt_type' as prompt_type
  from public.analytics_events
  where event_type = 'prompt_copy'
    and style_slug is not null
    and created_at >= p_start
    and created_at < p_end
    and coalesce(event_data->>'environment', 'production') = 'production'
    and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
),
style_counts as (
  select
    style_slug as slug,
    count(*)::bigint as copies,
    count(distinct session_id)::bigint as sessions,
    count(*) filter (where prompt_type = 'hard')::bigint as hard,
    count(*) filter (where prompt_type = 'soft')::bigint as soft,
    count(*) filter (where prompt_type = 'design-spec')::bigint as design_spec,
    count(*) filter (where prompt_type = 'creative-brief')::bigint as creative_brief,
    count(*) filter (where prompt_type = 'example')::bigint as examples,
    count(*) filter (where prompt_type = 'recipe')::bigint as recipes,
    count(*) filter (where prompt_type = 'project-brief')::bigint as project_brief
  from accepted_events
  group by style_slug
)
select jsonb_build_object(
  'totalCopies', (select count(*)::bigint from accepted_events),
  'styles', coalesce((
    select jsonb_agg(jsonb_build_object(
      'slug', slug,
      'copies', copies,
      'sessions', sessions,
      'hard', hard,
      'soft', soft,
      'designSpec', design_spec,
      'creativeBrief', creative_brief,
      'examples', examples,
      'recipes', recipes,
      'projectBrief', project_brief
    ) order by copies desc, slug asc)
    from style_counts
  ), '[]'::jsonb),
  'generatedAt', now()
);
$$;

revoke all on function public.admin_analytics_prompt_copies(timestamptz, timestamptz)
  from public, anon, authenticated;

grant execute on function public.admin_analytics_prompt_copies(timestamptz, timestamptz)
  to service_role;
create or replace function public.admin_analytics_content(
  p_start timestamptz,
  p_end timestamptz,
  p_timezone text default 'Asia/Shanghai'
)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
with
accepted_events as (
  select event_type, style_slug, created_at
  from public.analytics_events
  where created_at >= p_start
    and created_at < p_end
    and coalesce(event_data->>'environment', 'production') = 'production'
    and coalesce(event_data->>'deviceType', 'unknown') <> 'bot'
    and event_type not like 'admin_%'
),
behavior as (
  select
    count(*) filter (where event_type in ('catalog_impression', 'pack_offer_view', 'pack_price_view'))::bigint as exposure,
    count(*) filter (where event_type in ('style_view', 'showcase_open', 'template_view', 'animation_view'))::bigint as exploration,
    count(*) filter (where event_type in (
      'code_copy',
      'shadcn_command_copy',
      'style_export',
      'project_brief_generated',
      'project_brief_copy',
      'project_brief_download'
    ))::bigint + (
      select count(*)::bigint
      from public.analytics_events prompt_events
      where prompt_events.event_type = 'prompt_copy'
        and prompt_events.created_at >= p_start
        and prompt_events.created_at < p_end
        and coalesce(prompt_events.event_data->>'environment', 'production') = 'production'
        and coalesce(prompt_events.event_data->>'deviceType', 'unknown') <> 'bot'
        and prompt_events.event_data->>'prompt_type' <> 'project-brief'
    ) as implementation_intent,
    count(*) filter (where event_type in ('pack_purchase_intent', 'pack_checkout_start'))::bigint as commercial_intent,
    count(*) filter (where event_type in ('pack_purchase', 'pack_install_success'))::bigint as verified_outcomes
  from accepted_events
),
top_styles as (
  select
    style_slug,
    count(*)::bigint as total,
    count(*) filter (where event_type in ('style_view', 'showcase_open'))::bigint as views,
    count(*) filter (where event_type in ('code_copy',
      'prompt_copy', 'shadcn_command_copy'))::bigint as copies,
    count(*) filter (where event_type = 'style_export')::bigint as exports
  from accepted_events
  where style_slug is not null
  group by style_slug
  order by total desc, style_slug asc
  limit 12
),
bucket_bounds as (
  select
    case when p_end - p_start <= interval '1 day' then 'hour' else 'day' end as unit,
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
    unit,
    generate_series(
      first_bucket,
      last_bucket,
      case when unit = 'hour' then interval '1 hour' else interval '1 day' end
    ) as local_bucket
  from bucket_bounds
),
content_series as (
  select
    buckets.local_bucket,
    (
      select count(*)::bigint from public.style_comments rows
      where rows.created_at >= p_start and rows.created_at < p_end
        and (case when buckets.unit = 'hour'
          then date_trunc('hour', rows.created_at at time zone p_timezone)
          else date_trunc('day', rows.created_at at time zone p_timezone) end) = buckets.local_bucket
    ) as comments,
    (
      select count(*)::bigint from public.style_ratings rows
      where rows.created_at >= p_start and rows.created_at < p_end
        and (case when buckets.unit = 'hour'
          then date_trunc('hour', rows.created_at at time zone p_timezone)
          else date_trunc('day', rows.created_at at time zone p_timezone) end) = buckets.local_bucket
    ) as ratings,
    (
      select count(*)::bigint from public.user_favorites rows
      where rows.created_at >= p_start and rows.created_at < p_end
        and (case when buckets.unit = 'hour'
          then date_trunc('hour', rows.created_at at time zone p_timezone)
          else date_trunc('day', rows.created_at at time zone p_timezone) end) = buckets.local_bucket
    ) as favorites
  from buckets
  order by buckets.local_bucket
)
select jsonb_build_object(
  'implementationIntentVersion', 2,
  'summary', jsonb_build_object(
    'comments', (select count(*)::bigint from public.style_comments),
    'ratings', (select count(*)::bigint from public.style_ratings),
    'favorites', (select count(*)::bigint from public.user_favorites),
    'submissionsTotal', (select count(*)::bigint from public.submissions),
    'submissionsPending', (select count(*)::bigint from public.submissions where status = 'pending'),
    'submissionsApproved', (select count(*)::bigint from public.submissions where status = 'approved'),
    'submissionsRejected', (select count(*)::bigint from public.submissions where status = 'rejected')
  ),
  'behavior', (select to_jsonb(behavior) from behavior),
  'topStyles', coalesce((
    select jsonb_agg(jsonb_build_object(
      'slug', style_slug,
      'total', total,
      'views', views,
      'copies', copies,
      'exports', exports
    ) order by total desc, style_slug asc)
    from top_styles
  ), '[]'::jsonb),
  'series', coalesce((
    select jsonb_agg(jsonb_build_object(
      'bucket', local_bucket,
      'comments', comments,
      'ratings', ratings,
      'favorites', favorites
    ) order by local_bucket)
    from content_series
  ), '[]'::jsonb),
  'generatedAt', now()
);
$$;

revoke all on function public.admin_analytics_content(timestamptz, timestamptz, text)
  from public, anon, authenticated;

grant execute on function public.admin_analytics_content(timestamptz, timestamptz, text)
  to service_role;

-- Keep prompt copies in the compact event set used to define engaged visits.
-- This partial index can combine with idx_analytics_visit_scan for its
-- existing event types through a bitmap OR without duplicating that index.
create index if not exists idx_analytics_prompt_copy_visit_scan
  on public.analytics_events (created_at, event_type, session_id, id)
  where event_type = 'prompt_copy'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';
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
        'prompt_copy',
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
        'prompt_copy',
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
