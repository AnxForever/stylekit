# Umami Migration (Self-Hosted Analytics)

Decision (2026-08-15): replace the in-house analytics stack with self-hosted
[Umami v3](https://github.com/umami-software/umami) running on a dedicated
domestic cloud server.

## Why

- Umami v3 is Next.js + Prisma + PostgreSQL — the same stack as StyleKit.
- Self-hosted Umami is the full product (unlike Plausible CE, which gates
  funnels/revenue to cloud). MIT license.
- The in-house admin dashboard re-implements what Umami ships (PV/UV/sources/
  devices/countries); the pain point was the reporting layer, not data
  collection.
- `/api/send` accepts a `timestamp` field (verified in
  `umami/src/app/api/send/route.ts` line 49/147), so the 780k historical
  events can be backfilled with original timestamps — no data generation gap.

## Architecture

```
visitor browser ──> www.stylekit.top (old Aliyun server, filed OK)
                        │  /umami/*  (nginx location, Host = $proxy_host)
                        ▼
                   117.72.199.116:3001 (JD Cloud, Umami BASE_PATH=/umami)
```

- New server: JD Cloud 2C2G, < 2 GiB RAM → source deploy (local build →
  rsync → PM2), NOT Docker.
- JD Cloud blocks any Host not exactly in the MIIT filing DB (even non-80
  ports, `Server: JDTP` 403 page). Umami therefore rides the filed
  `www.stylekit.top` host under `/umami/`; the nginx proxy does NOT set
  Host (defaults to `$proxy_host`, i.e. the IP, which JDTP lets through).
- nginx on old server adds exact-match locations `/umami` and `/umami/`
  → 302 `/umami/dashboard` to break Next basePath's trailing-slash
  308/301 redirect loop.
- After JD Cloud ICP admission completes, DNS can point
  `stats.stylekit.top` straight at the new server (optional).

## Scope (verified against code)

- **Migrates**: `analytics_events` table (780k rows), `/api/analytics` POST
  (event ingest), `app/admin/analytics/*` pages + `app/api/admin/analytics/*`
  routes, client event pipeline in `lib/analytics/events.ts`, UTM provider,
  PV trackers.
- **Stays (product features, not analytics backend)**:
  - `lib/analytics/tracker.ts` in-memory usage counters + `GET /api/analytics`
    (popular/trending styles data source).
  - `lib/product-validation/*` — experiment subsystem writing its own
    `product_validation_events` table (not `analytics_events`); out of scope.
  - `app/admin` pages other than analytics (system/operations/styles).
- **Dead code noticed during recon**: `@vercel/analytics` (site never runs on
  Vercel; `NEXT_PUBLIC_VERCEL` is unset) — remove during Phase 4.

## Event mapping

All 17 client events funnel through `lib/analytics/events.ts` `trackEvent()`,
so the switch is a single-exit change: `window.umami.track(name, data)`.
Umami handles pageviews/UTM/session automatically via `script.js`.

- Umami gets raw properties (no merged UTM — Umami manages UTM at session level).
- Internal queue kept during the dual-run window; removed at cutover.
- Umami event limits: strings ≤ 500 chars, numbers ≤ 4 decimal places,
  objects ≤ 50 props. Current event props comply.

## Deploy notes (new server)

- Node 18.18+, PostgreSQL 12.14+ (PG 16 via apt), nginx + certbot, PM2.
- Umami repo: `/home/anx4758/umami` (v3.2.0 tag), local build:
  - `pnpm run build` runs `check-env → build-db` (Prisma migrate + seed
    admin/umami) → must reach the target DB during build (ssh tunnel to new
    server PG).
  - Never build on the production host (same rule as StyleKit).
- PM2 direct mode: `pm2 start node_modules/next/dist/bin/next --interpreter
  node --name umami -- start` then `pm2 save`.
- nginx: `stats.stylekit.top` → localhost:3001 (avoid clashing with anything),
  certbot TLS.
- Env: `DATABASE_URL`, `APP_SECRET` (generated 2026-08-15,
  `z5v5Zknmdpa4kZZw0TfpW/PJx6VdsrXx2QLHKCzODEE=`), `DISABLE_TELEMETRY=1`,
  `CLIENT_IP_HEADER=x-real-ip`.

## Site-side env

- `NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://stats.stylekit.top/script.js`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID=<uuid from Umami dashboard>`
- Both empty → script not rendered (dev/local safe).

## Phases

1. **Phase 0 — prerequisites (owner: Darling)**: ICP filing covers the new
   server IP; DNS `stats.stylekit.top` → new IP; provide SSH access.
2. **Phase 1 — deploy Umami**: node/pnpm/nginx/certbot + PG 16 (+`umami` db,
   dedicated role) → local build via ssh tunnel → rsync → PM2 → nginx+certbot
   → change default password, create website, get website-id.
3. **Phase 2 — site tracking**: tracker script in root layout (done),
   `trackEvent` forwards to Umami (done) — env wiring + deploy pending.
   Dual-run: internal queue stays until cutover.
4. **Phase 3 — backfill**: script reads `analytics_events` → synthesizes
   Umami payloads (original `created_at` as UNIX timestamp) → `POST /api/batch`.
   Sample-verify counts and event-type distribution.
5. **Phase 4 — retire in-house**: stop internal queue + PageViewTracker +
   UTM provider; delete `app/admin/analytics/*`, `app/api/admin/analytics/*`,
   event parts of `lib/analytics`; `pg_dump` archive `analytics_events`;
   remove `@vercel/analytics` dead code.
6. **Phase 5 — verify**: security:secrets, lint, tsc, test, build; deploy;
   live checks (real-time PV/events in Umami, backfill visible, core flows
   regression-free).

## Risks

- ICP filing blocks ports 80/443 on domestic clouds until the new IP is
  covered — hard prerequisite, can take days.
- Backfill of 780k rows takes hours even batched; run as a background job
  with progress logging.
- Dual-run window double-counts events (expected; cutover fixes it).
