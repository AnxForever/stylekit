create or replace function public.admin_analytics_breakdown(
  p_start timestamptz, p_end timestamptz, p_dimension text, p_limit integer default 10
)
returns table (value text, page_views bigint, visitors bigint, share numeric)
language plpgsql stable security definer set search_path = public
as $$
declare dimension_expression text;
begin
  dimension_expression := case p_dimension
    when 'path' then 'coalesce(event_data->>''path'', ''/'')'
    when 'referrer' then 'coalesce(event_data->>''referrerDomain'', ''Direct'')'
    when 'country' then 'coalesce(event_data->>''country'', ''Unknown'')'
    when 'browser' then 'coalesce(event_data->>''browser'', ''Unknown'')'
    when 'os' then 'coalesce(event_data->>''os'', ''Unknown'')'
    when 'device' then 'coalesce(event_data->>''deviceType'', ''Unknown'')'
    when 'hostname' then 'coalesce(event_data->>''hostname'', ''Unknown'')'
    when 'utm_source' then 'coalesce(nullif(event_data->>''utm_source'', ''''), ''Unattributed'')'
    when 'utm_medium' then 'coalesce(nullif(event_data->>''utm_medium'', ''''), ''Unattributed'')'
    when 'utm_campaign' then 'coalesce(nullif(event_data->>''utm_campaign'', ''''), ''Unattributed'')'
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
