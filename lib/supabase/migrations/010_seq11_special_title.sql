-- Migration 010: assign a dedicated red title for the user with seq_id = 11

INSERT INTO public.user_titles (
  user_id,
  custom_title,
  title_color,
  is_owner,
  title_enabled,
  updated_at,
  updated_by
)
SELECT
  us.user_id,
  '镖骑大将军',
  '#dc2626',
  false,
  true,
  NOW(),
  'migration:010_seq11_special_title'
FROM public.user_seq_ids AS us
WHERE us.seq_id = 11
ON CONFLICT (user_id)
DO UPDATE
SET
  custom_title = EXCLUDED.custom_title,
  title_color = EXCLUDED.title_color,
  title_enabled = true,
  updated_at = NOW(),
  updated_by = EXCLUDED.updated_by;
