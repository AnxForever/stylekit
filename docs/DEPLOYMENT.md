# Deployment Runbook

This runbook describes the current production deployment shape for StyleKit.

## Runtime Shape

Production is a single Next.js application process behind Nginx:

```text
Browser -> Nginx -> Next.js app on 127.0.0.1:13000
```

The current operational assumption is:

- Node.js 20 or newer
- pnpm
- PM2 app name: `stylekit`
- Nginx terminates TLS and proxies to `127.0.0.1:13000`
- Optional systemd timer runs `ops/stylekit-healthcheck.sh`

## Required Environment

Core app variables:

```bash
NEXT_PUBLIC_BASE_URL=https://www.stylekit.top
NEXT_PUBLIC_API_URL=https://www.stylekit.top/api
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Admin access variables:

```bash
ADMIN_USER_IDS=
ADMIN_API_TOKEN=
ADMIN_PASSWORD=
ADMIN_PASSWORD_SHA256=
ADMIN_SESSION_SECRET=
ADMIN_SESSION_MAX_AGE_SECONDS=43200
ADMIN_AUDIT_EXPORT_MAX_ROWS=5000
ADMIN_AUDIT_RETENTION_DAYS=30
CSRF_TRUSTED_ORIGINS=https://www.stylekit.top
```

Use `ADMIN_PASSWORD_SHA256` instead of `ADMIN_PASSWORD` when you do not want the plain admin password present in environment storage. `ADMIN_SESSION_SECRET` must be a long random value when admin password login is enabled.

## Build And Start

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run typecheck
pnpm exec vitest run --config tests/vitest.config.ts
pnpm run build
```

Start or restart the runtime process:

```bash
pm2 start "pnpm run start -- -p 13000" --name stylekit
pm2 restart stylekit --update-env
pm2 save
```

If the process is managed by a separate systemd unit, keep the command equivalent: run `next start` through pnpm on port `13000`, with the same environment loaded.

## Health Endpoint

The app exposes:

```text
GET  /api/health
HEAD /api/health
```

`GET /api/health` returns lightweight runtime status without external dependency checks. This endpoint is intentionally local and cheap enough for a watchdog.

Manual checks:

```bash
curl -fsS http://127.0.0.1:13000/api/health
curl -fsS https://www.stylekit.top/api/health
```

## Watchdog Timer

The watchdog script is:

```text
ops/stylekit-healthcheck.sh
```

It checks `HEALTH_URL` and records consecutive failures in `STATE_FILE`. Once failures reach `FAIL_THRESHOLD`, it restarts the configured PM2 app.

Default settings:

```bash
PM2_APP=stylekit
HEALTH_URL=http://127.0.0.1:13000/api/health
TIMEOUT=5
FAIL_THRESHOLD=2
STATE_FILE=/run/stylekit-healthcheck.failures
LOG_FILE=/var/log/stylekit-healthcheck.log
```

Install the script and units:

```bash
sudo install -m 0755 ops/stylekit-healthcheck.sh /usr/local/bin/stylekit-healthcheck
sudo install -m 0644 ops/systemd/stylekit-healthcheck.service /etc/systemd/system/stylekit-healthcheck.service
sudo install -m 0644 ops/systemd/stylekit-healthcheck.timer /etc/systemd/system/stylekit-healthcheck.timer
sudo systemctl daemon-reload
sudo systemctl enable --now stylekit-healthcheck.timer
```

Inspect it:

```bash
systemctl status stylekit-healthcheck.timer
journalctl -u stylekit-healthcheck.service -n 100 --no-pager
tail -n 100 /var/log/stylekit-healthcheck.log
```

Disable it:

```bash
sudo systemctl disable --now stylekit-healthcheck.timer
```

## Nginx Checks

The production Nginx config should proxy all public traffic to the app process:

```text
https://www.stylekit.top -> http://127.0.0.1:13000
```

After changing Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Smoke checks:

```bash
curl -I https://www.stylekit.top/
curl -I https://www.stylekit.top/styles
curl -I https://www.stylekit.top/styles/neo-brutalist
curl -fsS https://www.stylekit.top/api/styles/neo-brutalist/tokens
```

## Admin Login Checks

When password login is enabled:

```bash
curl -i https://www.stylekit.top/admin-login
```

Browser checks:

- `/admin-login` loads without locale prefix.
- Invalid password returns an error and does not set `stylekit-admin-session`.
- Valid password sets an HTTP-only `stylekit-admin-session` cookie.
- A valid session can access `/admin/analytics`.
- Existing Supabase admin and `ADMIN_API_TOKEN` access still work if configured.

## Rollback

Code rollback:

```bash
git revert <commit>
pnpm install --frozen-lockfile
pnpm run build
pm2 restart stylekit --update-env
```

Feature rollback without reverting code:

```bash
unset ADMIN_PASSWORD
unset ADMIN_PASSWORD_SHA256
unset ADMIN_SESSION_SECRET
pm2 restart stylekit --update-env
```

Watchdog rollback:

```bash
sudo systemctl disable --now stylekit-healthcheck.timer
```

## Cleanup

The following are generated or local-only and should not be committed:

```text
.next/
playwright-report/
test-results/
packages/core/dist/
tools/scripts/output/
tsconfig.tsbuildinfo
docs/references/
```
