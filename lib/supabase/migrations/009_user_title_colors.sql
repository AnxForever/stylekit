-- Migration 009: add configurable title color for user title rules

ALTER TABLE public.user_titles
  ADD COLUMN IF NOT EXISTS title_color TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_titles_title_color_hex_check'
  ) THEN
    ALTER TABLE public.user_titles
      ADD CONSTRAINT user_titles_title_color_hex_check
      CHECK (title_color IS NULL OR title_color ~ '^#[0-9A-Fa-f]{6}$');
  END IF;
END $$;
