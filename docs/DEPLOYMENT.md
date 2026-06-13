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
- Primary process manager: `systemd` service `stylekit.service`
- Legacy/optional process manager: PM2 app name `stylekit`
- Nginx terminates TLS and proxies to `127.0.0.1:13000`
- Optional systemd timer runs `ops/stylekit-healthcheck.sh`

## Production Host Preflight

Do this before every server sync. Do not trust an old local SSH alias by name.

1. Resolve the current production IP from DNS:

```bash
getent ahostsv4 www.stylekit.top | awk 'NR == 1 { print $1 }'
```

2. Connect to the host that matches the DNS result and verify it is the StyleKit host:

```bash
ssh stylekit-prod 'set -e
hostname
test -d /www/stylekit
cd /www/stylekit
git remote -v
git branch --show-current
git status --short
systemctl status stylekit --no-pager || pm2 list
'
```

Stop if any of these are true:

- The SSH host IP does not match `www.stylekit.top`.
- `/www/stylekit` is missing.
- The git remote is not `AnxForever/stylekit`.
- The working tree is dirty and the changes are not understood.
- Neither `stylekit.service` nor a PM2 `stylekit` process exists.

Current local aliases such as `aliyun-openclaw` and `aliyun-ts` are not deployment proof. They must only be used if their resolved host matches the production DNS and the `/www/stylekit` preflight passes.

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

## Build And Deploy

From the local repository root, before pushing:

```bash
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run typecheck
pnpm exec vitest run --config tests/vitest.config.ts
pnpm run build
```

Commit and push the verified branch:

```bash
git status --short
git push origin <branch>
```

On the production host:

```bash
cd /www/stylekit
git fetch origin
git status --short
git pull --ff-only origin <deployed-branch>
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run typecheck
pnpm run build
sudo systemctl restart stylekit
sudo systemctl status stylekit --no-pager
```

If the process is PM2-managed on that host instead of systemd:

```bash
pm2 start "pnpm run start -- -p 13000" --name stylekit
pm2 restart stylekit --update-env
pm2 save
```

The runtime command must remain equivalent to `next start` through pnpm on port `13000`, with the same environment loaded.

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
sudo systemctl restart stylekit
```

For PM2-managed hosts, use `pm2 restart stylekit --update-env` instead.

Feature rollback without reverting code:

```bash
unset ADMIN_PASSWORD
unset ADMIN_PASSWORD_SHA256
unset ADMIN_SESSION_SECRET
sudo systemctl restart stylekit
```

For PM2-managed hosts, use `pm2 restart stylekit --update-env` instead.

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
