-- 035_submission_quality_gates.sql
-- Records the automatic gate verdict alongside each submission and tracks
-- promotion from the community catalog into the curated library.
--
-- Why the verdict is stored rather than recomputed: gate thresholds are
-- calibrated against the style library, which changes. A submission approved
-- under one calibration must keep showing the report it was judged by, or the
-- review trail stops being reproducible.
--
-- Context: 001 created `submissions` with an "Anyone can submit" INSERT policy
-- from the era when submissions were anonymous. Submissions now require a
-- signed-in account and are written by the service role only, so that policy is
-- dropped here.

alter table public.submissions
  add column if not exists gate_report jsonb,
  add column if not exists promoted_at timestamptz,
  add column if not exists promoted_slug text,
  add column if not exists visibility text not null default 'community';

alter table public.submissions
  drop constraint if exists submissions_visibility_check;
alter table public.submissions
  add constraint submissions_visibility_check
  check (visibility in ('community', 'hidden', 'promoted'));

-- The community catalog reads approved rows ordered by review time.
create index if not exists idx_submissions_community
  on public.submissions (status, visibility, reviewed_at desc)
  where status = 'approved';

create index if not exists idx_submissions_promoted
  on public.submissions (promoted_at desc)
  where promoted_at is not null;

-- Writes go through the service role, which bypasses RLS. Leaving the old
-- anonymous INSERT policy in place would let anyone write straight to the table
-- and skip every quality gate.
drop policy if exists "Anyone can submit" on public.submissions;

drop policy if exists "Service role can manage submissions" on public.submissions;
create policy "Service role can manage submissions"
  on public.submissions for all
  to service_role
  using (true)
  with check (true);

-- Contributors keep read access to their own rows so /profile can show status.
drop policy if exists "Users can read own submissions" on public.submissions;
create policy "Users can read own submissions"
  on public.submissions for select
  to authenticated
  using (auth.uid() = user_id);

revoke insert, update, delete on table public.submissions from anon, authenticated;
