-- 034_enforce_rls.sql
-- Freeze the real production RLS state and close the favorites privacy gap.
--
-- Drift context (audited 2026-08-16): RLS was enabled on user_titles and
-- user_seq_ids directly in the Supabase console, with no migration file
-- backing it. user_favorites had a SELECT policy with qual=true (anyone can
-- read every user's favorites, exposing registered-user UUIDs).
-- Migration 003's user_favorites.user_id column was never applied in
-- production and no code references it — do not re-run 003 blindly.

-- 1) user_titles / user_seq_ids: RLS on, no policies = deny all to anon.
--    is_owner must never be writable by anon.
alter table public.user_titles enable row level security;
alter table public.user_seq_ids enable row level security;

-- 2) user_favorites: anonymous rows (random session ids, no PII) stay
--    publicly readable to preserve anonymous favorite restoration; rows
--    keyed "user:<uuid>" become owner-only.
drop policy if exists "Anyone can read favorites" on public.user_favorites;
drop policy if exists "Anyone can delete own favorites" on public.user_favorites;
drop policy if exists "Anyone can insert favorites" on public.user_favorites;

create policy "Read own user favorites or anonymous rows"
  on public.user_favorites for select
  using (session_id not like 'user:%' or auth.uid()::text = split_part(session_id, ':', 2));

create policy "Insert own user favorites or anonymous rows"
  on public.user_favorites for insert
  with check (session_id not like 'user:%' or auth.uid()::text = split_part(session_id, ':', 2));

create policy "Delete own user favorites"
  on public.user_favorites for delete
  using (session_id not like 'user:%' or auth.uid()::text = split_part(session_id, ':', 2));
