-- Migration 003: Bind UGC features to user accounts
-- Adds user_id columns to favorites, comments, ratings, and submissions tables.
-- Creates partial unique indexes for dual-mode identity (user_id or session_id).
-- Adds RLS policies for authenticated user access.

-- user_favorites: add user_id, relax session_id
ALTER TABLE public.user_favorites ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.user_favorites ALTER COLUMN session_id DROP NOT NULL;
DROP INDEX IF EXISTS user_favorites_session_id_style_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS user_favorites_user_slug
  ON public.user_favorites(user_id, style_slug) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS user_favorites_session_slug
  ON public.user_favorites(session_id, style_slug) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.user_favorites(user_id);

-- style_comments: add user_id + avatar_url
ALTER TABLE public.style_comments ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.style_comments ADD COLUMN IF NOT EXISTS avatar_url TEXT;
CREATE INDEX IF NOT EXISTS idx_comments_user ON public.style_comments(user_id);

-- style_ratings: add user_id
ALTER TABLE public.style_ratings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
CREATE UNIQUE INDEX IF NOT EXISTS style_ratings_user_slug
  ON public.style_ratings(style_slug, user_id) WHERE user_id IS NOT NULL;

-- submissions: add user_id + author_name
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS author_name TEXT;
CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.submissions(user_id);

-- RLS: authenticated users can manage own favorites
CREATE POLICY "Users can read own favorites"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON public.user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.user_favorites FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);
