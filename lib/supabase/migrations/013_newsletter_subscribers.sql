-- StyleKit Newsletter Subscribers Migration
-- Run after 012_seq3_vector_title_icon.sql in the Supabase SQL Editor.
-- Backfills the table that app/api/newsletter/route.ts has always expected.
-- The footer "Subscribe" button was failing because this table never existed.

-- ============================================
-- Table: newsletter_subscribers
-- ============================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

create index if not exists idx_newsletter_subscribed_at
  on public.newsletter_subscribers(subscribed_at desc);

-- Subscriber emails are PII: only the service role (used by the /api/newsletter
-- route via getSupabaseAdmin) may read or write. RLS is default-deny, so the
-- public anon key gets no access to the email list.
alter table public.newsletter_subscribers enable row level security;

create policy "Service role can read subscribers"
  on public.newsletter_subscribers for select
  using (auth.role() = 'service_role');

create policy "Service role can insert subscribers"
  on public.newsletter_subscribers for insert
  with check (auth.role() = 'service_role');
