-- Predicate-baked scan indexes for admin_analytics_events (021) and
-- admin_analytics_content (019).
--
-- Same disease and cure as 022: both RPCs filter on
-- coalesce(event_data->>'environment'/'deviceType') per row, which forces
-- heap access plus jsonb detoasting across the whole scanned window. Baking
-- those filters into partial-index predicates evaluates them once at insert
-- time; the planner proves the functions' textually identical where clauses
-- from the predicates and drops them from the scans. Both functions read
-- only real columns, so the scans become index-only. No function bodies
-- change in this migration - the predicate texts below must stay exactly in
-- sync with the quals inside 019/021. (admin_analytics_breakdown is handled
-- in 024, where its dimensions become real columns first.)

-- Supersedes idx_analytics_custom_events_created_type_session (021): same
-- key columns, but the predicate now also absorbs the environment/bot
-- filters, so admin_analytics_events runs index-only on real columns.
drop index if exists idx_analytics_custom_events_created_type_session;

create index if not exists idx_analytics_custom_events_scan
  on public.analytics_events (created_at, event_type, session_id)
  where event_type <> 'page_view'
  and event_type not like 'admin_%'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';

-- admin_analytics_content reads only real columns (event_type, style_slug,
-- created_at), so with the filters absorbed it can also scan index-only.
create index if not exists idx_analytics_content_scan
  on public.analytics_events (created_at, event_type, style_slug)
  where event_type not like 'admin_%'
  and coalesce(event_data->>'environment', 'production') = 'production'
  and coalesce(event_data->>'deviceType', 'unknown') <> 'bot';
