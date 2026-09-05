# style-extract service

Headless-browser extraction as a standalone service: it takes a URL, reads the
live site's real computed styles, and returns a StyleKit **submission manifest**
(the same shape `/submit` accepts). It is the server half of the "extract from a
URL" feature — the browser cannot run on the main app host (too little memory,
no Chrome), so extraction lives here and the app calls in.

## Why a separate service

The main site (`stylekit-prod`) has ~800 MB free and no Chrome; a headless
browser there would OOM the site. This service runs on a host that has Chrome
and is isolated so an extraction can never starve its neighbours.

## Design / safety

- **SSRF guard** (`src/ssrf.ts`): resolves the hostname, refuses any private,
  loopback, link-local, or cloud-metadata address, and pins the browser's DNS to
  the vetted IP so a rebind cannot swap in an internal target after the check.
- **Bearer token**: `EXTRACT_TOKEN` must match; unset means deny-all.
- **Single in-flight slot**: only one headless Chrome at a time (`503 busy`).
- **Free-memory floor**: refuses (`503 low-memory`) below `EXTRACT_MIN_FREE_MB`
  rather than risk the OOM killer against co-located services.
- **Hard timeouts**: navigation and total deadlines; the browser is always
  closed in `finally`.

## API

```
GET  /health                     -> { status, busy, freeMemMb }
POST /extract { url, options? }   -> { manifest, needsReview }
     Authorization: Bearer <EXTRACT_TOKEN>
```

`options` is forwarded to the converter (`name`, `nameEn`, `slug`,
`description`, `category`, `styleType`) so a caller can override the fields a
machine cannot infer.

## Local development

```bash
npm i
cp ../../style-extractor-dev/scripts/*.js extractor-scripts/   # gitignored
npm run build                                                  # dist/server.mjs
EXTRACT_TOKEN=dev EXTRACT_CHROME_PATH=/path/to/chrome node dist/server.mjs
```

## Deploy to the extraction host (117 / new-api)

Chrome is already installed there (`/usr/bin/google-chrome-stable`).

```bash
# 1. Build locally, then sync the self-contained bundle + scripts + manifest.
npm run build
rsync -az dist/ new-api-prod:/opt/style-extract/dist/
rsync -az package.json new-api-prod:/opt/style-extract/
rsync -az ../../style-extractor-dev/scripts/ new-api-prod:/opt/style-extract/extractor-scripts/

# 2. Install the one runtime dep (playwright-core; it does NOT download a browser).
ssh new-api-prod 'cd /opt/style-extract && npm i --omit=dev'
```

### systemd unit (with cgroup memory isolation)

`/etc/systemd/system/style-extract.service` — `MemoryMax` is the safety net:
if an extraction spikes, the kernel kills only this unit, never umami/postgres.

```ini
[Unit]
Description=StyleKit extraction service
After=network.target

[Service]
WorkingDirectory=/opt/style-extract
ExecStart=/usr/bin/node dist/server.mjs
Environment=PORT=8790
Environment=EXTRACT_CHROME_PATH=/usr/bin/google-chrome-stable
Environment=EXTRACT_MIN_FREE_MB=450
Environment=EXTRACTOR_SCRIPTS_DIR=/opt/style-extract/extractor-scripts
EnvironmentFile=/opt/style-extract/.env   # holds EXTRACT_TOKEN
Restart=on-failure
RestartSec=3
# cgroup isolation — the whole point of running here safely:
MemoryHigh=550M
MemoryMax=700M
[Install]
WantedBy=multi-user.target
```

```bash
ssh new-api-prod 'systemctl daemon-reload && systemctl enable --now style-extract && systemctl status style-extract --no-pager'
```

### nginx reverse proxy (optional, for TLS + a stable hostname)

Add a `location /extract` (and `/health`) proxying to `127.0.0.1:8790` under an
existing server block, or expose the port directly to the main app over the
token. Keep it reachable only by the main site.

## Main-site wiring (stage 3)

The app calls this service from `POST /api/submit/extract`:

```
EXTRACT_SERVICE_URL=https://<117-host>/extract   # or http://<ip>:8790/extract
EXTRACT_TOKEN=<same token as the service>
```

The app route adds auth (signed-in only), rate limiting, and its own SSRF
recheck before forwarding, then hands the returned manifest to the submit form
to prefill. Fields in `needsReview` are surfaced for the contributor to confirm.
