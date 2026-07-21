create index if not exists idx_analytics_custom_events_created_type_session
  on public.analytics_events (created_at desc, event_type, session_id)
  where event_type <> 'page_view' and event_type not like 'admin_%';

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
), totals as (select count(*)::numeric total from filtered)
select event_type::text, count(*)::bigint, count(distinct session_id)::bigint,
  case when totals.total = 0 then 0 else round(count(*)::numeric / totals.total * 100, 1) end
from filtered cross join totals
group by event_type, totals.total
order by count(*) desc, event_type asc
limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;
