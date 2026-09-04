-- Following a contributor.
--
-- The community catalog sorts by freshness and aggregate signal, which serves
-- discovery but not loyalty: a reader who likes one person's work has no way to
-- keep up with it. A follow is that subscription, and it is also the first
-- signal the catalog has about which contributors an individual values.
--
-- Deliberately not a generic "follows" table: following a style or a tag would
-- need different semantics (and different privacy), so the columns name
-- contributors outright rather than pretending to be polymorphic.

create table if not exists public.community_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  contributor_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, contributor_id),
  -- Following yourself would inflate your own follower count for free.
  constraint community_follows_no_self check (follower_id <> contributor_id)
);

-- "Who follows this contributor" (the count on a profile) reads by contributor;
-- the primary key already covers "who does this reader follow".
create index if not exists idx_community_follows_contributor
  on public.community_follows (contributor_id, created_at desc);

alter table public.community_follows enable row level security;

drop policy if exists "Service role manages follows" on public.community_follows;
create policy "Service role manages follows"
  on public.community_follows for all
  to service_role
  using (true)
  with check (true);

-- Writes go through the API route, which owns authentication and rate limiting,
-- so the table itself stays closed to client roles.
revoke all on table public.community_follows from anon, authenticated;
