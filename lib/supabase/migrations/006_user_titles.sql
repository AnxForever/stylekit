-- Migration 006: configurable user titles for comments and admin views

CREATE TABLE IF NOT EXISTS public.user_titles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  custom_title TEXT,
  is_owner BOOLEAN NOT NULL DEFAULT false,
  title_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_user_titles_updated_at
  ON public.user_titles(updated_at DESC);
