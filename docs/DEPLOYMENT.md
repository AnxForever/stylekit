# Deployment Runbook

This runbook describes the current production deployment shape for StyleKit.

## Mandatory local release gate

Before any production migration or deployment, the operator must explicitly
confirm that payment and receipts have been checked. The gate is intentionally
closed by default:

```bash
pnpm run verify:release
```

This exits immediately unless `STYLEKIT_PAYMENT_CONFIRMED=1` is present. After
confirmation, run it as:

```bash
STYLEKIT_PAYMENT_CONFIRMED=1 pnpm run verify:release
```

The command runs local secret, runtime-config, lint, product-truth, catalog,
asset, Experience Pack, clean-install, workspace-generation, type, unit,
visual-regression, and build checks. Runtime-config verifies password hashing,
session configuration, Supabase variable pairing, and local environment-file
permissions without printing secrets. It does not connect to SSH, rsync files, restart PM2, apply
Supabase migrations, upload storage objects, or write to any remote service. A
successful gate is necessary but does not itself deploy anything.

## Canonical Production Deploy

Use this path unless the infrastructure has been intentionally changed. The
production directory is an rsync target, not a git checkout.

1. Verify locally:

```bash
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run check:support-assets
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
  --exclude public/launch/overseas/ \
  --exclude public/support/acknowledgments/ \
  --exclude public/support/receipts/ \
  --exclude public/support/thank-you/ \
  --exclude playwright-report/ \
  --exclude test-results/ \
  --exclude 'packages/**/dist/' \
  ./ stylekit-prod:/www/stylekit/
```

`public/support/acknowledgments/`, `public/support/receipts/`, and
`public/support/thank-you/` are runtime-only support assets. The standard sync
excludes them so `--delete` cannot remove them from production. To add or
restore those files, verify and sync them explicitly without `--delete`:

```bash
pnpm run check:support-assets -- --require-runtime
ssh stylekit-prod 'mkdir -p /www/stylekit/public/support/acknowledgments /www/stylekit/public/support/receipts /www/stylekit/public/support/thank-you'
rsync -az public/support/acknowledgments/ stylekit-prod:/www/stylekit/public/support/acknowledgments/
rsync -az public/support/receipts/ stylekit-prod:/www/stylekit/public/support/receipts/
rsync -az public/support/thank-you/ stylekit-prod:/www/stylekit/public/support/thank-you/
```

`public/launch/overseas/` contains maintainer-generated campaign media rather
than application runtime assets. Keep it out of Git and sync individual files
to external hosting only when a campaign still references them.

5. Install dependencies and validate the synced source on the server. Do not
   build on the production host:

```bash
ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
pm2 save
pm2 describe stylekit
'
```

6. Build locally and sync the verified production artifact. This is required;
   never fall back to a server-side production build. The local build must use
   the same production build-time environment, especially the `NEXT_PUBLIC_*`
   variables used by browser authentication. Remove the temporary local env
   copy after the build:

```bash
scp stylekit-prod:/www/stylekit/.env.production .env.production
pnpm run typecheck
pnpm run build
rsync -az --delete .next/ stylekit-prod:/www/stylekit/.next/
rm -f .env.production

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
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

## Emergency Access With Alibaba Cloud CLI

Use Alibaba Cloud OAuth and Cloud Assistant when TCP port 22 is reachable but
SSH authentication or the application is unresponsive. OAuth credentials stay
in the local CLI profile and must never be committed to the repository.

```bash
aliyun configure --mode OAuth --profile stylekit-prod
```

Choose the China site, set the default region to `cn-beijing`, and complete the
browser authorization. Verify the account and locate the production instance
before running commands:

```bash
aliyun sts GetCallerIdentity --profile stylekit-prod
aliyun ecs DescribeInstances \
  --RegionId cn-beijing \
  --profile stylekit-prod
aliyun ecs DescribeCloudAssistantStatus \
  --RegionId cn-beijing \
  --InstanceId.1 i-2zeg61g7xvaauggrkjd6 \
  --profile stylekit-prod
```

The current production instance is `i-2zeg61g7xvaauggrkjd6` with public IP
`59.110.91.219`. Use `ecs RunCommand` for recovery diagnostics and `ecs
SendFile` for small files. `SendFile` accepts at most 32 KB after Base64
encoding, so larger binary assets must be split, transferred, reassembled, and
verified with SHA-256 before installation.

After Cloud Assistant restores SSH, return to the normal `stylekit-prod` SSH
preflight. Do not store OAuth tokens, temporary access keys, tunnel tokens, or
command output containing credentials in the repository.

## Runtime Memory Guardrails

Production must run StyleKit from [`ecosystem.config.cjs`](../ecosystem.config.cjs)
instead of `pm2 start npm -- start`. The ecosystem file makes PM2 monitor the
actual Next.js process, limits the V8 heap to 384 MB, and requests a controlled
restart if resident memory exceeds 512 MB. This protects the 1.8 GB host from a
global OOM while leaving headroom for Nginx, n8n, the blog, and system agents.

```bash
cd /www/stylekit
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
pm2 save
pm2 describe stylekit
```

`startOrReload` is safe only after the PM2 entry already points to the Next.js
binary. When migrating an older entry whose script is `/usr/bin/npm`, perform a
clean one-time replacement so PM2 does not append the ecosystem arguments to
`npm start`:

```bash
cd /www/stylekit
pm2 delete stylekit
pm2 start ecosystem.config.cjs --only stylekit --update-env
pm2 save
```

Verify that PM2's process PID is the `next-server` PID and that no `npm start`
wrapper remains:

```bash
pm2 pid stylekit
ps -eo pid,ppid,rss,args | grep -E '[n]ext-server|[n]pm start'
```

For post-change stability checks, require all of the following:

- the PM2 script is `node_modules/next/dist/bin/next`;
- `restart_time` and `unstable_restarts` remain zero from the new baseline;
- resident memory remains below 512 MB;
- `/api/health` remains successful;
- the kernel reports no new `Out of memory: Killed process` event.

## n8n Stability Budget

n8n is a sibling service on the same 1.8 GB host and therefore shares the OOM
risk with StyleKit. Its Compose project lives at `/opt/n8n`. Keep the image
pinned to the verified version instead of `latest`, retain bounded execution
history, and cap production concurrency:

```yaml
image: docker.n8n.io/n8nio/n8n:2.29.10
dns:
  - 100.100.2.136
  - 100.100.2.138
  - 223.5.5.5
extra_hosts:
  - "anxforever.cn:host-gateway"
  - "www.stylekit.top:host-gateway"
  - "grok.baxfor.fun:host-gateway"
environment:
  - EXECUTIONS_DATA_PRUNE=true
  - EXECUTIONS_DATA_MAX_AGE=168
  - EXECUTIONS_DATA_PRUNE_MAX_COUNT=200
  - EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
  - EXECUTIONS_DATA_SAVE_ON_ERROR=all
  - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true
  - N8N_CONCURRENCY_PRODUCTION_LIMIT=1
mem_limit: 512m
memswap_limit: 512m
cpus: 0.75
cpu_shares: 256
pids_limit: 128
oom_score_adj: 500
```

The uptime workflow must not download full page bodies. Use `HEAD` for the
StyleKit and anxforever.cn targets, and use `GET https://grok.baxfor.fun/health`
for the grok target because that service does not support `HEAD`. Configure the
HTTP Request node with three attempts, a two-second delay between attempts, and
a 20-second timeout. Keep the existing rule that requires two consecutive
failed workflow runs before sending an alert.

All monitored hostnames currently resolve to the same production instance.
Mapping them to Docker's `host-gateway` preserves HTTPS hostname, certificate,
Nginx routing, and application checks while avoiding unreliable public-IP
hairpin routing and intermittent container DNS failures.

Do not run a second full n8n container alongside production on this host. The
combined memory and Task Broker load can delay StyleKit, SSH, and Cloud
Assistant. For a one-off workflow test, stop production, run the workflow
serially, and always bring production back up:

```bash
cd /opt/n8n
docker compose stop n8n
docker compose run --rm --no-deps -T n8n execute \
  --id=site-uptime-monitor \
  --rawOutput
docker compose up -d n8n
```

Do not retain routine n8n backups on this host. The execution data is
disposable operational history, and duplicate database copies consume scarce
disk space without protecting the other projects. Stop n8n before database
maintenance, validate the live database in place, and remove temporary copies
immediately after the maintenance operation.

After any Compose or database maintenance:

```bash
cd /opt/n8n
docker compose config --quiet
docker compose up -d --force-recreate n8n
docker inspect n8n --format '{{.State.Health.Status}} {{.RestartCount}} {{.State.OOMKilled}}'
docker stats --no-stream n8n
curl -fsS http://127.0.0.1:5678/healthz
curl -fsS https://anxforever.cn/n8n/ >/dev/null
sqlite3 -readonly data/database.sqlite 'PRAGMA integrity_check;'
```

## Required Environment

Core app variables:

```bash
NEXT_PUBLIC_BASE_URL=https://www.stylekit.top
NEXT_PUBLIC_API_URL=https://www.stylekit.top/api
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Email sign-in sends a numeric verification code through SMTP. Set
`AUTH_SMTP_HOST`, `AUTH_SMTP_PORT`, `AUTH_SMTP_USER`, `AUTH_SMTP_PASS`, and
optionally `AUTH_SMTP_FROM` in the server environment. If the `AUTH_SMTP_*`
variables are omitted, the login flow reuses the existing `FEEDBACK_SMTP_*`
settings. `EMAIL_OTP_SECRET` is optional when
`SUPABASE_SERVICE_ROLE_KEY` is present, but a separate long random secret is
recommended.

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

For a password migration, calculate the digest on a trusted local machine and
update the server environment in one maintenance window. Do not put the
password or digest in the repository, a deployment command, or a backup:

```bash
STYLEKIT_ADMIN_PASSWORD='set-this-only-in-your-local-shell'
printf '%s' "$STYLEKIT_ADMIN_PASSWORD" | sha256sum
unset STYLEKIT_ADMIN_PASSWORD
```

Set the resulting digest as `ADMIN_PASSWORD_SHA256`, remove `ADMIN_PASSWORD`,
then restart the application only after the local hash-mode auth test and the
production login check both pass.

## Build And Deploy

From the local repository root, before pushing:

```bash
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run check:support-assets
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
  --exclude public/launch/overseas/ \
  --exclude public/support/acknowledgments/ \
  --exclude public/support/receipts/ \
  --exclude public/support/thank-you/ \
  --exclude playwright-report/ \
  --exclude test-results/ \
  --exclude 'packages/**/dist/' \
  ./ stylekit-prod:/www/stylekit/

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
pm2 save
pm2 describe stylekit
'
```

The production host is memory-constrained. Always run `typecheck` and
`build` locally with the production environment, then sync the generated
`.next/` artifact separately. Confirm that the completed local artifact
contains `.next/BUILD_ID` before syncing. Do not run a production build on
the server.

```bash
scp stylekit-prod:/www/stylekit/.env.production .env.production
pnpm run typecheck
pnpm run build
rsync -az --delete .next/ stylekit-prod:/www/stylekit/.next/
rm -f .env.production

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
pm2 save
pm2 describe stylekit
'
```

The local build must use the same production build-time environment,
especially the `NEXT_PUBLIC_*` variables used by browser authentication.
Remove the temporary local env copy immediately after the build. If the local
build fails, fix and re-verify locally before syncing; do not fall back to a
server-side build.

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

## Storage Cleanup

The repository includes `ops/cleanup-stylekit-server.sh`. It only recognizes
timestamped full backups, known dashboard build backups, generated `.next-*`
residue, and the DNF cache. It defaults to preview mode:

```bash
STYLEKIT_CLEANUP_DRY_RUN=1 /usr/local/bin/stylekit-cleanup-server
```

After reviewing the exact paths, run it with
`STYLEKIT_CLEANUP_DRY_RUN=0`. The optional systemd units run the same cleanup
weekly and retain one full backup plus two dashboard build backups:

```bash
sudo install -m 0755 ops/cleanup-stylekit-server.sh /usr/local/bin/stylekit-cleanup-server
sudo install -m 0644 ops/systemd/stylekit-cleanup.service /etc/systemd/system/stylekit-cleanup.service
sudo install -m 0644 ops/systemd/stylekit-cleanup.timer /etc/systemd/system/stylekit-cleanup.timer
sudo systemctl daemon-reload
sudo systemctl enable --now stylekit-cleanup.timer
```

Before any production change, use the read-only smoke check:

```bash
./ops/verify-stylekit-production.sh
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
pnpm run check:support-assets
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
  --exclude public/launch/overseas/ \
  --exclude public/support/acknowledgments/ \
  --exclude public/support/receipts/ \
  --exclude public/support/thank-you/ \
  --exclude playwright-report/ \
  --exclude test-results/ \
  --exclude 'packages/**/dist/' \
  ./ stylekit-prod:/www/stylekit/

rsync -az --delete .next/ stylekit-prod:/www/stylekit/.next/

ssh stylekit-prod 'set -e
cd /www/stylekit
pnpm install --frozen-lockfile
pnpm run check:catalog
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
pm2 save
pm2 describe stylekit
'
```

For rsync snapshot rollback, copy the latest known-good
`/www/stylekit-backups/stylekit-<timestamp>/` snapshot back to `/www/stylekit/`,
then run `pnpm install --frozen-lockfile`, `pnpm run check:catalog`, and
`pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env`.

Feature rollback without reverting code:

```bash
unset ADMIN_PASSWORD
unset ADMIN_PASSWORD_SHA256
unset ADMIN_SESSION_SECRET
pm2 startOrReload ecosystem.config.cjs --only stylekit --update-env
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
