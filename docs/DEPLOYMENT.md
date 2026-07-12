# Deployment Runbook

This runbook describes the current production deployment shape for StyleKit.

## Canonical Production Deploy

Use this path unless the infrastructure has been intentionally changed. The
production directory is an rsync target, not a git checkout.

1. Verify locally:

```bash
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run smoke:local
git status --short
```

2. Push the verified branch:

```bash
git push origin <branch>
```

3. Verify the production host before touching files:

```bash
getent ahostsv4 www.stylekit.top | awk 'NR == 1 { print $1 }'

ssh stylekit-prod 'set -e
hostname
test -d /www/stylekit
cd /www/stylekit
test -f package.json
grep -q "\"name\": \"stylekit\"" package.json
pm2 describe stylekit
test "$(pm2 jlist | node -e '\''let data="";process.stdin.on("data",c=>data+=c);process.stdin.on("end",()=>{const app=JSON.parse(data).find((item)=>item.name==="stylekit");process.stdout.write(app?.pm2_env?.pm_cwd||"")})'\'')" = "/www/stylekit"
'
```

4. Backup and rsync the verified local checkout:

```bash
ssh stylekit-prod 'set -e
ts=$(date +%Y%m%d%H%M%S)
mkdir -p /www/stylekit-backups
rsync -a --delete \
  --exclude node_modules \
  --exclude .next \
  /www/stylekit/ "/www/stylekit-backups/stylekit-${ts}/"
'

rsync -az --delete \
  --exclude .git/ \
  --exclude .next/ \
  --exclude node_modules/ \
  --exclude .env.local \
  --exclude .env.production \
  --exclude .data/ \
  --exclude playwright-report/ \
  --exclude test-results/ \
  --exclude 'packages/**/dist/' \
  ./ stylekit-prod:/www/stylekit/
```

5. Install, validate, build, and restart on the server:

```bash
ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pnpm run typecheck
pnpm run build
pm2 restart stylekit
pm2 save
pm2 describe stylekit
'
```

6. If the server is OOM-killed during `typecheck` or `build`, use the local
   build artifact that already passed checks. The local build must use the
   same production build-time environment, especially the `NEXT_PUBLIC_*`
   variables used by browser authentication. Remove the temporary local env
   copy after the build:

```bash
scp stylekit-prod:/www/stylekit/.env.production .env.production
pnpm run build
rsync -az --delete .next/ stylekit-prod:/www/stylekit/.next/
rm -f .env.production

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 restart stylekit
pm2 save
pm2 describe stylekit
'
```

7. Smoke test production:

```bash
curl -fsS https://www.stylekit.top/api/health
curl -I https://www.stylekit.top/
curl -I https://www.stylekit.top/styles
curl -I https://www.stylekit.top/styles/neo-brutalist
SMOKE_BASE_URL=https://www.stylekit.top pnpm run smoke
```

Do not deploy by `git pull` on the server. Do not run `security:secrets` on
the server rsync directory because it depends on `git ls-files`. Do not use
`aliyun-openclaw`, `aliyun-ts`, or any other local alias unless it resolves to
the current `www.stylekit.top` production IP and passes the host preflight.

## Runtime Shape

Production is a single Next.js application process behind Nginx:

```text
Browser -> Nginx -> Next.js app on 127.0.0.1:13000
```

The current operational assumption is:

- Node.js 20 or newer
- pnpm
- Production SSH alias: `stylekit-prod` (`root@59.110.91.219` from the current `www.stylekit.top` DNS)
- App directory: `/www/stylekit`
- Deployment model: rsync copy from the verified local checkout; `/www/stylekit` is not a git checkout
- Process manager: PM2 app name `stylekit`
- Legacy service file: `stylekit.service` may exist, but it is not the active runtime unless `systemctl status stylekit` says it is active
- Nginx terminates TLS and proxies to `127.0.0.1:13000`
- Optional systemd timer runs `ops/stylekit-healthcheck.sh`

## Production Host Preflight

Do this before every server sync. Do not trust an old local SSH alias by name.

Recommended local SSH config:

```sshconfig
Host stylekit-prod
    HostName 59.110.91.219
    User root
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

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
test -f package.json
grep -q "\"name\": \"stylekit\"" package.json
pm2 describe stylekit
test "$(pm2 jlist | node -e '\''let data="";process.stdin.on("data",c=>data+=c);process.stdin.on("end",()=>{const app=JSON.parse(data).find((item)=>item.name==="stylekit");process.stdout.write(app?.pm2_env?.pm_cwd||"")})'\'')" = "/www/stylekit"
'
```

Stop if any of these are true:

- The SSH host IP does not match `www.stylekit.top`.
- `/www/stylekit` is missing.
- `/www/stylekit/package.json` is not the StyleKit package.
- PM2 `stylekit` is missing or its working directory is not `/www/stylekit`.

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
pnpm run smoke:local
```

Commit and push the verified branch:

```bash
git status --short
git push origin <branch>
```

The server is not a git checkout, so deploy code with rsync from the verified local repository:

```bash
ssh stylekit-prod 'set -e
ts=$(date +%Y%m%d%H%M%S)
mkdir -p /www/stylekit-backups
rsync -a --delete \
  --exclude node_modules \
  --exclude .next \
  /www/stylekit/ "/www/stylekit-backups/stylekit-${ts}/"
'

rsync -az --delete \
  --exclude .git/ \
  --exclude .next/ \
  --exclude node_modules/ \
  --exclude .env.local \
  --exclude .env.production \
  --exclude .data/ \
  --exclude playwright-report/ \
  --exclude test-results/ \
  --exclude 'packages/**/dist/' \
  ./ stylekit-prod:/www/stylekit/

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pnpm run typecheck
pnpm run build
pm2 restart stylekit
pm2 save
pm2 describe stylekit
'
```

The production host is memory-constrained. If server-side `typecheck` or `build` is OOM-killed after the local checks and local `pnpm run build` have passed, sync the local build output instead:

```bash
scp stylekit-prod:/www/stylekit/.env.production .env.production
pnpm run build
rsync -az --delete .next/ stylekit-prod:/www/stylekit/.next/
rm -f .env.production

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 restart stylekit
pm2 save
pm2 describe stylekit
'
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
HOME=/root
PM2_HOME=/root/.pm2
PM2_APP=stylekit
HEALTH_URL=http://127.0.0.1:13000/api/health
TIMEOUT=5
FAIL_THRESHOLD=2
STATE_FILE=/run/stylekit-healthcheck.failures
LOG_FILE=/var/log/stylekit-healthcheck.log
```

The systemd service must set `HOME=/root` and `PM2_HOME=/root/.pm2`. Without
those variables PM2 falls back to `/etc/.pm2`, the watchdog cannot find the
`stylekit` process, and automatic recovery fails even though PM2 is running.

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

After an artifact fallback deploy, also verify in a real browser that the
GitHub sign-in button leaves `/login` and starts the Supabase OAuth flow. A
successful page load alone does not prove that browser auth variables were
embedded in the build.

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

Code rollback uses the same rsync deployment path as a forward deploy. Revert
locally, verify locally, push, then rsync the verified checkout and restart PM2
on `stylekit-prod`.

```bash
git revert <commit>
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run smoke:local
git push origin <branch>

rsync -az --delete \
  --exclude .git/ \
  --exclude .next/ \
  --exclude node_modules/ \
  --exclude .env.local \
  --exclude .env.production \
  --exclude .data/ \
  --exclude playwright-report/ \
  --exclude test-results/ \
  --exclude 'packages/**/dist/' \
  ./ stylekit-prod:/www/stylekit/

rsync -az --delete .next/ stylekit-prod:/www/stylekit/.next/

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 restart stylekit
pm2 save
pm2 describe stylekit
'
```

For rsync snapshot rollback, copy the latest known-good
`/www/stylekit-backups/stylekit-<timestamp>/` snapshot back to `/www/stylekit/`,
then run `pnpm install --frozen-lockfile`, `pnpm run check:catalog`, and
`pm2 restart stylekit`.

Feature rollback without reverting code:

```bash
unset ADMIN_PASSWORD
unset ADMIN_PASSWORD_SHA256
unset ADMIN_SESSION_SECRET
pm2 restart stylekit
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
