-- Configurable site-wide announcement content.
-- The Git changelog remains the safe fallback when this table is unavailable.

create table if not exists public.site_announcements (
  locale text primary key,
  enabled boolean not null default false,
  title text not null default '',
  body text not null default '',
  cta_label text,
  cta_href text,
  starts_at timestamptz,
  ends_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint site_announcements_locale_check check (locale in ('zh-CN', 'en')),
  constraint site_announcements_title_length check (char_length(title) <= 180),
  constraint site_announcements_body_length check (char_length(body) <= 1000),
  constraint site_announcements_cta_href_length check (cta_href is null or char_length(cta_href) <= 500)
);

create index if not exists idx_site_announcements_schedule
  on public.site_announcements (enabled, starts_at, ends_at);

alter table public.site_announcements enable row level security;
revoke all on table public.site_announcements from anon, authenticated;

drop policy if exists "Service role can manage site announcements"
  on public.site_announcements;
create policy "Service role can manage site announcements"
  on public.site_announcements for all
  to service_role
  using (true)
  with check (true);

insert into public.site_announcements (
  locale,
  enabled,
  title,
  body,
  cta_label,
  cta_href
)
values
  (
    'zh-CN',
    true,
    'v0.18.0 — Kit Builder 我的工具箱上线',
    '跨类型收集风格、动效与字体，一键导出完整设计包。',
    '查看详情',
    '/zh/changelog'
  ),
  (
    'en',
    true,
    'v0.18.0 — Kit Builder is here',
    'Collect styles, animations, and fonts, then export one complete design kit.',
    'View details',
    '/en/changelog'
  )
on conflict (locale) do nothing;
