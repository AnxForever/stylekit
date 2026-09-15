-- Contextual replies and private in-app notifications.
-- Apply after 038/039. Existing non-reply comments and older app versions work.
-- No backfill notifications: only new replies generate them.
begin;

-- Upgrade only the comment identity columns when an installation skipped the
-- unrelated favorites changes in migration 003. Legacy rows stay untouched.
alter table public.style_comments
  add column if not exists user_id uuid references auth.users(id),
  add column if not exists avatar_url text;
alter table public.style_comments alter column session_id drop not null;

alter table public.style_comments
  add column if not exists reply_to_id uuid,
  add column if not exists is_reply boolean not null default false;

create unique index if not exists style_comments_id_style_key
  on public.style_comments(id, style_slug);

-- A composite key prevents cross-style replies even if an API check is bypassed.
-- PostgreSQL 15+ supports SET NULL(column): retain the reply and its style when
-- its parent is deleted; is_reply keeps the "original removed" context honest.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'style_comments_reply_same_style' and conrelid = 'public.style_comments'::regclass) then
    alter table public.style_comments add constraint style_comments_reply_same_style
      foreign key (reply_to_id, style_slug) references public.style_comments(id, style_slug)
      on delete set null (reply_to_id);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'style_comments_no_self_reply' and conrelid = 'public.style_comments'::regclass) then
    alter table public.style_comments add constraint style_comments_no_self_reply
      check (reply_to_id is null or reply_to_id <> id);
  end if;
end;
$$;

create index if not exists idx_comments_style_chronological
  on public.style_comments(style_slug, created_at desc, id desc);
create index if not exists idx_comments_reply_to
  on public.style_comments(reply_to_id) where reply_to_id is not null;

create table if not exists public.community_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references auth.users(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  comment_id uuid not null references public.style_comments(id) on delete cascade,
  parent_comment_id uuid not null references public.style_comments(id) on delete cascade,
  style_slug text not null,
  kind text not null default 'comment_reply' check (kind = 'comment_reply'),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  unique (recipient_id, comment_id),
  check (actor_id is null or actor_id <> recipient_id)
);

create index if not exists idx_community_notifications_recipient
  on public.community_notifications(recipient_id, created_at desc, id desc);
create index if not exists idx_community_notifications_unread
  on public.community_notifications(recipient_id, style_slug)
  where read_at is null;

create or replace function public.prepare_style_comment_reply()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.is_reply := new.reply_to_id is not null;
    if new.is_reply and new.user_id is null then
      raise exception 'Replies require an authenticated account' using errcode = '23514';
    end if;
  elsif new.reply_to_id is distinct from old.reply_to_id and new.reply_to_id is not null then
    raise exception 'Reply target is immutable' using errcode = '23514';
  elsif new.style_slug is distinct from old.style_slug or new.user_id is distinct from old.user_id or new.is_reply is distinct from old.is_reply then
    raise exception 'Comment identity and reply status are immutable' using errcode = '23514';
  end if;
  return new;
end;
$$;

drop trigger if exists prepare_style_comment_reply on public.style_comments;
create trigger prepare_style_comment_reply
before insert or update on public.style_comments
for each row execute function public.prepare_style_comment_reply();

create or replace function public.notify_style_comment_reply()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_user uuid;
  legacy_session text;
  legacy_id text;
begin
  if new.reply_to_id is null then return new; end if;

  select parent.user_id, parent.session_id into target_user, legacy_session
    from public.style_comments parent
    where parent.id = new.reply_to_id and parent.style_slug = new.style_slug;

  -- Older comments can have a real account only in the legacy session column.
  -- Do not notify anonymous sessions or cast unvalidated strings to UUIDs.
  if target_user is null then
    legacy_id := regexp_replace(coalesce(legacy_session, ''), '^user:', '');
    if legacy_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
      select id into target_user from auth.users where id = legacy_id::uuid;
    end if;
  end if;

  if target_user is not null and target_user <> new.user_id then
    insert into public.community_notifications
      (recipient_id, actor_id, comment_id, parent_comment_id, style_slug)
    values (target_user, new.user_id, new.id, new.reply_to_id, new.style_slug)
    on conflict (recipient_id, comment_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists notify_style_comment_reply on public.style_comments;
create trigger notify_style_comment_reply
  after insert on public.style_comments
  for each row execute function public.notify_style_comment_reply();

-- Browsers use the authenticated/rate-limited APIs. Table access would bypass
-- those controls and expose legacy IP/session columns or let senders forge actors.
alter table public.style_comments enable row level security;
alter table public.community_notifications enable row level security;
revoke all on table public.style_comments from public, anon, authenticated;
revoke all on table public.community_notifications from public, anon, authenticated;
grant select, insert, update, delete on table public.style_comments to service_role;
grant select, insert, update, delete on table public.community_notifications to service_role;
revoke all on function public.prepare_style_comment_reply() from public, anon, authenticated;
revoke all on function public.notify_style_comment_reply() from public, anon, authenticated;
grant execute on function public.prepare_style_comment_reply() to service_role;
grant execute on function public.notify_style_comment_reply() to service_role;

commit;
