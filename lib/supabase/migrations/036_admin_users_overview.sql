-- One-shot aggregation RPC for the admin users page (/api/admin/users).
--
-- Context: the route previously fanned out to auth.admin.listUsers (GoTrue
-- Admin REST, ~1.1-1.4s just to serialize every user) followed by six full-
-- table reads, then aggregated in Node. The Admin REST call was the entire
-- bottleneck; the tables themselves are tiny (<=304 rows).
--
-- Fix: a SECURITY DEFINER function reads auth.users directly -- the PostgREST
-- REST layer refuses the auth schema (PGRST106), but a definer function owned
-- by the migration role can -- and joins the per-user aggregates in a single
-- round trip. It returns EVERY user's raw aggregates with no pagination,
-- search, or title resolution: the route keeps those in JS so the response
-- stays semantically identical, only the data source changes.
--
-- Verified 2026-09-03 against production: the 58 distinct comment/rating/
-- favorite session users and all submission user_ids already exist in
-- auth.users (0 orphans), so LEFT JOIN auth.users drops nobody. Comment/
-- rating/favorite rows carry the actor as session_id = 'user:<uuid>';
-- submissions/titles/seq_ids carry a bare user_id uuid.

create or replace function public.admin_users_overview()
returns table (
  user_id uuid,
  email text,
  author_name text,
  avatar_url text,
  comment_count int,
  rating_count int,
  favorite_count int,
  submission_count int,
  last_active timestamptz,
  seq_id int,
  custom_title text,
  title_color text,
  title_icon_path text,
  is_owner boolean,
  title_enabled boolean,
  profile_title text
)
language sql
security definer
set search_path = public, pg_temp
stable
as $$
  with
  -- 'user:<uuid>' actors. The strict UUID pattern guards the ::uuid cast so a
  -- malformed session_id can never abort the whole query.
  comments_agg as (
    select
      substring(session_id from 6)::uuid as uid,
      count(*)::int as c,
      max(created_at) as la,
      max(author_name) as author_name
    from public.style_comments
    where session_id ~* '^user:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    group by 1
  ),
  ratings_agg as (
    select
      substring(session_id from 6)::uuid as uid,
      count(*)::int as c,
      max(created_at) as la
    from public.style_ratings
    where session_id ~* '^user:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    group by 1
  ),
  -- favorite_count is distinct styles per user, matching the route's dedupe.
  favorites_agg as (
    select
      substring(session_id from 6)::uuid as uid,
      count(distinct style_slug)::int as c,
      max(created_at) as la
    from public.user_favorites
    where session_id ~* '^user:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    group by 1
  ),
  submissions_agg as (
    select
      user_id as uid,
      count(*)::int as c,
      max(submitted_at) as la,
      max(author_name) as author_name
    from public.submissions
    where user_id is not null
    group by 1
  )
  select
    u.id as user_id,
    u.email::text as email,
    -- Raw metadata/content name only; the route still applies its email-local
    -- and "User <prefix>" fallbacks so those stay in one place.
    coalesce(
      nullif(trim(u.raw_user_meta_data->>'full_name'), ''),
      nullif(trim(u.raw_user_meta_data->>'name'), ''),
      nullif(trim(u.raw_user_meta_data->>'preferred_username'), ''),
      nullif(trim(u.raw_user_meta_data->>'user_name'), ''),
      nullif(trim(cm.author_name), ''),
      nullif(trim(sb.author_name), '')
    ) as author_name,
    coalesce(
      nullif(trim(u.raw_user_meta_data->>'avatar_url'), ''),
      nullif(trim(u.raw_user_meta_data->>'picture'), '')
    ) as avatar_url,
    coalesce(cm.c, 0) as comment_count,
    coalesce(rt.c, 0) as rating_count,
    coalesce(fv.c, 0) as favorite_count,
    coalesce(sb.c, 0) as submission_count,
    greatest(
      u.last_sign_in_at, u.created_at, cm.la, rt.la, fv.la, sb.la
    ) as last_active,
    -- user_seq_ids (dense, renumbered) wins over stale metadata seq_id.
    coalesce(sq.seq_id, nullif(u.raw_user_meta_data->>'seq_id', '')::int) as seq_id,
    tt.custom_title,
    tt.title_color,
    tt.title_icon_path,
    coalesce(tt.is_owner, false) as is_owner,
    coalesce(tt.title_enabled, true) as title_enabled,
    coalesce(
      nullif(trim(u.raw_user_meta_data->>'user_title'), ''),
      nullif(trim(u.raw_user_meta_data->>'title'), '')
    ) as profile_title
  from auth.users u
  left join comments_agg cm on cm.uid = u.id
  left join ratings_agg rt on rt.uid = u.id
  left join favorites_agg fv on fv.uid = u.id
  left join submissions_agg sb on sb.uid = u.id
  left join public.user_seq_ids sq on sq.user_id = u.id
  left join public.user_titles tt on tt.user_id = u.id
$$;

-- The function reads auth.users, so keep it off the anon/authenticated roles;
-- only the service_role (used by the admin API) may execute it.
revoke all on function public.admin_users_overview() from public;
revoke all on function public.admin_users_overview() from anon;
revoke all on function public.admin_users_overview() from authenticated;
grant execute on function public.admin_users_overview() to service_role;
