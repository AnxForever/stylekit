-- Dynamic sponsor acknowledgments.
--
-- The public site reads these rows through the trusted server client. The
-- receipt_path column intentionally accepts both legacy /public paths and
-- Supabase Storage URLs so the migration can preserve the existing gallery.

create table if not exists public.support_acknowledgments (
  id uuid primary key default uuid_generate_v4(),
  donated_on date not null,
  donor_label text not null default '匿名支持者',
  amount text,
  receipt_path text not null,
  receipt_alt text,
  celebration_path text,
  celebration_alt text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_support_acknowledgments_published_date
  on public.support_acknowledgments(published, donated_on desc, created_at desc);

alter table public.support_acknowledgments enable row level security;
revoke all on table public.support_acknowledgments from anon, authenticated;

-- Receipts are public media, but all writes remain behind the server-side
-- admin API, which uses the Supabase service role and the app's admin guard.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'support-acknowledgments',
  'support-acknowledgments',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into public.support_acknowledgments
  (donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt)
select seed.*
from (values
  ('2026-07-18'::date, 'Quickbeam', '¥8.88', '/support/acknowledgments/receipt-2026-07-18-008-88.jpg', 'Quickbeam 8.88 元的赞赏记录', null, null),
  ('2026-07-16'::date, '辉辉', '¥88.00', '/support/acknowledgments/receipt-2026-07-16-088-00.jpg', '辉辉 88.00 元的赞赏记录', null, null),
  ('2026-07-04'::date, '匿名支持者', '¥3.50', '/support/acknowledgments/receipt-2026-07-04-003-50.png', '支持者 3.50 元的收款记录', null, null),
  ('2026-07-04'::date, '匿名支持者', '¥50.00', '/support/acknowledgments/receipt-2026-07-04-050-00.png', '支持者 50.00 元的收款记录', null, null),
  ('2026-07-04'::date, '匿名支持者', '¥9.90', '/support/acknowledgments/receipt-2026-07-04-009-90.png', '支持者 9.90 元的收款记录', null, null),
  ('2026-06-16'::date, '匿名支持者', '¥66.66', '/support/receipts/receipt-2026-06-16.png', '支持者的收款记录', '/support/thank-you/thank-meme-2026-06.jpg', '感谢庆祝'),
  ('2026-06-20'::date, '匿名支持者', null, '/support/receipts/receipt-2026-06-20.png', '支持者的收款记录', '/support/thank-you/thank-meme-2026-06.jpg', '感谢庆祝'),
  ('2026-06-24'::date, '匿名支持者', null, '/support/receipts/receipt-2026-06-24.jpg', '支持者的收款记录', '/support/thank-you/thank-meme-2026-06.jpg', '感谢庆祝')
) as seed(donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt)
where not exists (
  select 1
  from public.support_acknowledgments existing
  where existing.receipt_path = seed.receipt_path
);
