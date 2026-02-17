-- StyleKit Supabase Initial Migration
-- Run this in the Supabase SQL Editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- Table: submissions
-- ============================================
create table if not exists public.submissions (
  id uuid primary key default uuid_generate_v4(),
  slug text not null,
  form_data jsonb not null default '{}',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  review_note text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  ip_address inet
);

create index idx_submissions_status on public.submissions(status);
create index idx_submissions_slug on public.submissions(slug);
create index idx_submissions_submitted_at on public.submissions(submitted_at desc);

-- RLS for submissions
alter table public.submissions enable row level security;

-- Anyone can insert submissions
create policy "Anyone can submit"
  on public.submissions for insert
  with check (true);

-- Only service role can read/update (admin dashboard)
create policy "Service role can read submissions"
  on public.submissions for select
  using (auth.role() = 'service_role');

create policy "Service role can update submissions"
  on public.submissions for update
  using (auth.role() = 'service_role');

-- ============================================
-- Table: analytics_events
-- ============================================
create table if not exists public.analytics_events (
  id uuid primary key default uuid_generate_v4(),
  event_type text not null,
  event_data jsonb not null default '{}',
  style_slug text,
  session_id text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index idx_analytics_event_type on public.analytics_events(event_type);
create index idx_analytics_style_slug on public.analytics_events(style_slug);
create index idx_analytics_created_at on public.analytics_events(created_at desc);
create index idx_analytics_session on public.analytics_events(session_id);

-- RLS for analytics
alter table public.analytics_events enable row level security;

-- Anyone can insert events
create policy "Anyone can log events"
  on public.analytics_events for insert
  with check (true);

-- Only service role can read (dashboard)
create policy "Service role can read analytics"
  on public.analytics_events for select
  using (auth.role() = 'service_role');

-- ============================================
-- Table: user_favorites
-- ============================================
create table if not exists public.user_favorites (
  id uuid primary key default uuid_generate_v4(),
  session_id text not null,
  style_slug text not null,
  created_at timestamptz not null default now(),
  unique(session_id, style_slug)
);

create index idx_favorites_session on public.user_favorites(session_id);
create index idx_favorites_slug on public.user_favorites(style_slug);

-- RLS for favorites
alter table public.user_favorites enable row level security;

-- Anyone can manage their own favorites (matched by session_id)
create policy "Anyone can insert favorites"
  on public.user_favorites for insert
  with check (true);

create policy "Anyone can read favorites"
  on public.user_favorites for select
  using (true);

create policy "Anyone can delete own favorites"
  on public.user_favorites for delete
  using (true);
