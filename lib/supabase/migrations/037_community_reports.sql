-- Post-publication moderation for the community catalog.
--
-- Gates (lib/submission/gates) screen a submission before it goes live, but a
-- style can still turn out to be plagiarised, mislabelled, or broken once
-- people use it. Every UGC catalog that stays healthy pairs pre-publication
-- checks with a report-driven review path; this table is that second half.
--
-- Takedown itself needs no new column: migration 035 already defines
-- submissions.visibility = 'hidden'.

create table if not exists public.community_reports (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  -- Null for anonymous reports: a visitor who spots plagiarism should not have
  -- to sign in first, and the rate limiter still bounds abuse.
  reporter_id uuid references auth.users(id) on delete set null,
  reason text not null
    check (reason in ('plagiarism', 'broken', 'inappropriate', 'mislabeled', 'other')),
  detail text,
  status text not null default 'open'
    check (status in ('open', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  review_note text
);

-- The moderation queue reads open reports oldest-first, so the oldest
-- unanswered complaint is always the next one handled.
create index if not exists idx_community_reports_open
  on public.community_reports (status, created_at)
  where status = 'open';

create index if not exists idx_community_reports_submission
  on public.community_reports (submission_id, created_at desc);

alter table public.community_reports enable row level security;

-- Reports are written and read through the service role only. Exposing reads
-- would let a contributor enumerate complaints about their own work, and
-- exposing writes would skip the rate limiter in the API route.
drop policy if exists "Service role manages community reports" on public.community_reports;
create policy "Service role manages community reports"
  on public.community_reports for all
  to service_role
  using (true)
  with check (true);

revoke all on table public.community_reports from anon, authenticated;
