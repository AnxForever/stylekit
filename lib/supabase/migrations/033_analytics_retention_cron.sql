-- Keep high-volume analytics bounded without depending on the web process.
-- Supabase Cron runs this job inside Postgres every 15 minutes.

create extension if not exists pg_cron;

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
  if p_retention <= interval '0 days' then
    raise exception 'retention must be positive';
  end if;

  if p_batch_size < 1 or p_batch_size > 50000 then
    raise exception 'batch size must be between 1 and 50000';
  end if;

  with victims as (
    select id
    from public.analytics_events
    where created_at < now() - p_retention
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

do $$
declare
  job_id bigint;
begin
  for job_id in
    select jobid
    from cron.job
    where jobname in (
      'stylekit-analytics-retention',
      'stylekit-analytics-cron-history-retention'
    )
  loop
    perform cron.unschedule(job_id);
  end loop;
end;
$$;

select cron.schedule(
  'stylekit-analytics-retention',
  '*/15 * * * *',
  $$select private.cleanup_analytics_events();$$
);

select cron.schedule(
  'stylekit-analytics-cron-history-retention',
  '17 3 * * *',
  $$delete from cron.job_run_details where end_time < now() - interval '30 days';$$
);
