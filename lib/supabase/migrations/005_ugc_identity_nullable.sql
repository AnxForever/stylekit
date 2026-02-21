-- Migration 005: align ratings/comments identity model with authenticated writes
-- Current APIs write authenticated records with user_id and session_id = NULL.
-- Older schema from 002 enforced session_id NOT NULL, which causes 500 writes.

-- Relax session identity columns so either user_id or session_id can be used.
ALTER TABLE public.style_ratings
  ALTER COLUMN session_id DROP NOT NULL;

ALTER TABLE public.style_comments
  ALTER COLUMN session_id DROP NOT NULL;

-- Replace legacy unique constraints with partial indexes for session-based identity.
ALTER TABLE public.style_ratings
  DROP CONSTRAINT IF EXISTS style_ratings_style_slug_session_id_key;

ALTER TABLE public.style_comments
  DROP CONSTRAINT IF EXISTS style_comments_style_slug_session_id_key;

CREATE UNIQUE INDEX IF NOT EXISTS style_ratings_session_slug
  ON public.style_ratings(style_slug, session_id)
  WHERE session_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS style_comments_session_slug
  ON public.style_comments(style_slug, session_id)
  WHERE session_id IS NOT NULL;
