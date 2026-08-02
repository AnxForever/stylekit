-- StyleKit Kit Builder — cloud sync for named kits
-- Run after 024_admin_analytics_dimension_columns.sql in the Supabase SQL Editor.
-- Backs the /api/kits route so a signed-in user's kit collection follows
-- them across devices. Anonymous users keep working from localStorage only.

-- ============================================
-- Table: user_kits
-- One row per user; the whole named-kit collection is stored as JSON so the
-- shape stays in lockstep with lib/kit/types.ts (Kit[] + activeKitId) without
-- a schema migration every time the item model grows.
-- ============================================
create table if not exists public.user_kits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  kits jsonb not null default '[]'::jsonb,
  active_kit_id text,
  updated_at timestamptz not null default now()
);

-- The API route talks to this table with the service role only (same pattern
-- as newsletter_subscribers). RLS is default-deny so the anon key can't read
-- another user's kits even though the data is not especially sensitive.
alter table public.user_kits enable row level security;

create policy "Service role can read kits"
  on public.user_kits for select
  using (auth.role() = 'service_role');

create policy "Service role can upsert kits"
  on public.user_kits for insert
  with check (auth.role() = 'service_role');

create policy "Service role can update kits"
  on public.user_kits for update
  using (auth.role() = 'service_role');
