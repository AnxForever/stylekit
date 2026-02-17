-- StyleKit Ratings & Comments Migration
-- Run after 001_initial_schema.sql

-- ============================================
-- Table: style_ratings
-- ============================================
create table if not exists public.style_ratings (
  id uuid primary key default uuid_generate_v4(),
  style_slug text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  session_id text not null,
  ip_address inet,
  created_at timestamptz not null default now(),
  unique(style_slug, session_id)
);

create index idx_ratings_slug on public.style_ratings(style_slug);
create index idx_ratings_session on public.style_ratings(session_id);

alter table public.style_ratings enable row level security;

create policy "Anyone can rate"
  on public.style_ratings for insert
  with check (true);

create policy "Anyone can read ratings"
  on public.style_ratings for select
  using (true);

-- Allow updating own rating
create policy "Anyone can update own rating"
  on public.style_ratings for update
  using (true);

-- ============================================
-- Table: style_comments
-- ============================================
create table if not exists public.style_comments (
  id uuid primary key default uuid_generate_v4(),
  style_slug text not null,
  content text not null check (char_length(content) <= 280),
  author_name text not null default 'Anonymous' check (char_length(author_name) <= 50),
  session_id text not null,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index idx_comments_slug on public.style_comments(style_slug);
create index idx_comments_created_at on public.style_comments(created_at desc);

alter table public.style_comments enable row level security;

create policy "Anyone can comment"
  on public.style_comments for insert
  with check (true);

create policy "Anyone can read comments"
  on public.style_comments for select
  using (true);

-- ============================================
-- View: style_rating_summary
-- ============================================
create or replace view public.style_rating_summary as
select
  style_slug,
  count(*)::int as total_ratings,
  round(avg(rating)::numeric, 1) as average_rating
from public.style_ratings
group by style_slug;
