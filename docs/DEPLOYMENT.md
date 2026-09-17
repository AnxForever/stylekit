# Production deployment

Everything about how `www.stylekit.top` is served. Kept out of the README on
purpose — it is operator detail, not something a visitor deciding whether to use
StyleKit needs to read.

## Current topology

Production runs on an Alibaba Cloud ECS instance in Beijing, as a single Next.js
process behind Nginx.

| Piece | Detail |
| --- | --- |
| Edge and TLS | Nginx on the ECS host |
| App process | systemd service `stylekit.service` |
| App directory | `/www/stylekit`, rsynced from a verified local checkout |
| Runtime command | `next start --hostname 0.0.0.0 --port 13000` via `node_modules/.bin/next` |
| Health watchdog | `stylekit-healthcheck.timer` probes `/api/health` every minute and restarts the service after consecutive failures |

`vercel.json` is no longer part of the active production path and is not the
source of truth for where StyleKit is hosted.

## Build locally, never on the host

Build and validate from a local checkout, then sync the verified artifact. **Do
not run a production build on the server** — the host is memory constrained and a
build will starve the process that is serving traffic.

```bash
pnpm run security:secrets
pnpm lint
npx tsc --noEmit
pnpm run test
pnpm run build          # local
```

Then rsync the checkout and the locally built `.next/` to
`stylekit-prod:/www/stylekit/`, and restart the service only after the sync is
complete. Confirm `/api/health` reports healthy afterwards.

## Nginx color allow map

The map keeps arbitrary hex routes from creating an unbounded crawl surface, so
it must stay synchronized with the sitemap. Regenerate it after any release that
changes the color catalog, then run the public SEO check.

```bash
STYLEKIT_SITEMAP_URL=http://127.0.0.1:13000/sitemap.xml \
  pnpm run generate:nginx-color-allow-map \
  /tmp/stylekit-color-allow.map.conf

install -d -m 700 /etc/nginx/backups
cp /etc/nginx/conf.d/stylekit-color-allow.map.conf \
  /etc/nginx/backups/stylekit-color-allow.map.conf.previous
install -m 644 /tmp/stylekit-color-allow.map.conf \
  /etc/nginx/conf.d/stylekit-color-allow.map.conf

nginx -t && systemctl reload nginx
```

Review the generated diff before installing it, and retain the previous file
outside `conf.d` for rollback.

## Caching and CDN

Nginx serves cacheable assets from an include rather than through Next.js. See
[`CDN_ACCELERATION_RUNBOOK.md`](./CDN_ACCELERATION_RUNBOOK.md) for the asset
cache policy (`/_next/static/*` is `immutable`; images, fonts and video get a
one-day browser cache plus a 30-day shared/edge cache with
`stale-while-revalidate`) and for the steps to put a CDN in front of the origin.

The application is CDN-ready — `NEXT_PUBLIC_ASSET_PREFIX` is a build-time
setting that moves hashed assets to another origin while leaving API and page
URLs on `www.stylekit.top` — but DNS/CDN changes are an operator action because
they affect production traffic.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 + Turbopack |
| UI | React 19, Radix UI, Lucide Icons |
| Styling | Tailwind CSS 4, CVA |
| Auth & DB | Supabase (PostgreSQL + auth helpers) |
| Validation | Zod 4 |
| Testing | Vitest + Playwright |
| Deployment | Alibaba Cloud ECS + Nginx + systemd |
