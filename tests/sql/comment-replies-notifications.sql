-- Run only against a disposable PostgreSQL 16+ database. This fixture creates
-- Supabase-like roles/schema but never connects to the application's DATABASE_URL.
\set ON_ERROR_STOP on
create schema auth;
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin bypassrls; end if;
end $$;
create table auth.users (id uuid primary key);
create table public.style_comments (
  id uuid primary key default gen_random_uuid(),
  style_slug text not null,
  content text not null check (char_length(content) <= 280),
  author_name text not null default 'User',
  session_id text not null,
  ip_address inet,
  created_at timestamptz not null default now()
);
grant all on public.style_comments to public, anon, authenticated, service_role;
\ir ../../lib/supabase/migrations/040_comment_replies_notifications.sql
-- Re-running the additive migration must preserve existing tables and triggers.
\ir ../../lib/supabase/migrations/040_comment_replies_notifications.sql

insert into auth.users(id) values
  ('11111111-1111-4111-8111-111111111111'),
  ('22222222-2222-4222-8222-222222222222');
insert into public.style_comments (id, style_slug, content, author_name, user_id) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'dark-mode', 'Original', 'First', '11111111-1111-4111-8111-111111111111');
insert into public.style_comments (id, style_slug, content, author_name, user_id, reply_to_id) values
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'dark-mode', 'A reply', 'Second', '22222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');

do $$
begin
  if (select count(*) from public.community_notifications) <> 1 then raise exception 'Missing atomic reply notification'; end if;
  if not exists (select 1 from public.community_notifications where recipient_id = '11111111-1111-4111-8111-111111111111' and actor_id = '22222222-2222-4222-8222-222222222222' and comment_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb') then raise exception 'Notification recipient mismatch'; end if;
  if not (select is_reply from public.style_comments where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb') then raise exception 'Reply marker absent'; end if;
  if has_table_privilege('anon', 'public.style_comments', 'select') or has_table_privilege('authenticated', 'public.style_comments', 'insert') then raise exception 'Client can bypass comment API'; end if;
  if has_table_privilege('anon', 'public.community_notifications', 'select') or has_table_privilege('authenticated', 'public.community_notifications', 'update') then raise exception 'Notification privilege leak'; end if;
  if has_function_privilege('anon', 'public.notify_style_comment_reply()', 'execute') then raise exception 'Anonymous trigger execution granted'; end if;
  if not (select relrowsecurity from pg_class where oid = 'public.community_notifications'::regclass) then raise exception 'Notifications RLS disabled'; end if;
end;
$$;

-- Reactions to one's own comment do not produce self notifications.
insert into public.style_comments (style_slug, content, user_id, reply_to_id)
values ('dark-mode', 'Self follow-up', '11111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
-- Edits must not duplicate the insert-only notification.
update public.style_comments set content = 'Edited reply' where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
do $$
begin
  if (select count(*) from public.community_notifications) <> 1 then raise exception 'Self notification or duplicated edit notification'; end if;
  begin
    insert into public.style_comments (style_slug, content, user_id, reply_to_id) values ('other-style', 'Cross-style', '22222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    raise exception 'Cross-style reply accepted';
  exception when foreign_key_violation then null; end;
  begin
    insert into public.style_comments (style_slug, content, reply_to_id) values ('dark-mode', 'Anonymous', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
    raise exception 'Anonymous reply accepted';
  exception when check_violation then null; end;
  begin
    insert into public.style_comments (style_slug, content, user_id, reply_to_id) values ('dark-mode', 'Missing parent', '22222222-2222-4222-8222-222222222222', 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee');
    raise exception 'Missing-parent reply accepted';
  exception when foreign_key_violation then null; end;
  begin
    update public.style_comments set reply_to_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    raise exception 'Reply target change accepted';
  exception when check_violation then null; end;
end;
$$;

-- A legacy account identity can be notified, but arbitrary anonymous sessions cannot.
insert into public.style_comments (id, style_slug, content, session_id) values
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'dark-mode', 'Legacy', 'user:11111111-1111-4111-8111-111111111111');
insert into public.style_comments (id, style_slug, content, user_id, reply_to_id) values
  ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'dark-mode', 'Legacy reply', '22222222-2222-4222-8222-222222222222', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc');
do $$ begin
  if (select count(*) from public.community_notifications) <> 2 then raise exception 'Legacy reply notification missing'; end if;
end $$;

-- Deleting a parent retains independent replies with a truthful removed marker,
-- and removes notifications that would otherwise expose the deleted conversation.
delete from public.style_comments where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
do $$ begin
  if not exists (select 1 from public.style_comments where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' and reply_to_id is null and is_reply) then raise exception 'Reply not retained after parent deletion'; end if;
  if exists (select 1 from public.community_notifications where parent_comment_id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa') then raise exception 'Deleted-parent notification retained'; end if;
end $$;
delete from public.style_comments where id = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
do $$ begin
  if exists (select 1 from public.community_notifications) then raise exception 'Deleted-reply notification retained'; end if;
end $$;

-- Trigger failures roll back the comment: no successful reply without its notification.
create function public.reject_notification_fixture() returns trigger language plpgsql as $$ begin raise exception 'fixture failure'; end; $$;
create trigger reject_notification_fixture before insert on public.community_notifications for each row execute function public.reject_notification_fixture();
do $$ begin
  begin
    insert into public.style_comments (id, style_slug, content, user_id, reply_to_id) values ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 'dark-mode', 'Must roll back', '22222222-2222-4222-8222-222222222222', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc');
  exception when raise_exception then null; end;
  if exists (select 1 from public.style_comments where id = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee') then raise exception 'Comment survived notification failure'; end if;
end $$;
select 'PASS: reply constraints, deletion lifecycle, atomic notifications, and private grants' as result;
