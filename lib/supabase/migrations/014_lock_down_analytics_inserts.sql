-- Prevent public clients from bypassing the validated /api/analytics route.
-- Trusted service-role clients bypass RLS and remain able to write events.

drop policy if exists "Anyone can log events" on public.analytics_events;
revoke insert on table public.analytics_events from anon, authenticated;
