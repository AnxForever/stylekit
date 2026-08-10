-- Count the existing Project Implementation Brief actions as implementation
-- intent in the admin content aggregate.
--
-- This migration changes only a service-role aggregate RPC. It creates no
-- table, exposes no Data API surface, and does not infer payment or purchase
-- outcomes from a browser event.

create or replace function public.admin_analytics_capabilities()
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object('implementationIntentVersion', 2);
$$;

revoke all on function public.admin_analytics_capabilities()
  from public, anon, authenticated;

grant execute on function public.admin_analytics_capabilities()
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
    ))::bigint as implementation_intent,
    count(*) filter (where event_type in ('pack_purchase_intent', 'pack_checkout_start'))::bigint as commercial_intent,
    count(*) filter (where event_type in ('pack_purchase', 'pack_install_success'))::bigint as verified_outcomes
  from accepted_events
),
top_styles as (
  select
    style_slug,
    count(*)::bigint as total,
    count(*) filter (where event_type in ('style_view', 'showcase_open'))::bigint as views,
    count(*) filter (where event_type in ('code_copy', 'shadcn_command_copy'))::bigint as copies,
    count(*) filter (where event_type = 'style_export')::bigint as exports
  from accepted_events
  where style_slug is not null
  group by style_slug
  order by count(*) desc, style_slug asc
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
