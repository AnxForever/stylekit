from pathlib import Path
import json
import re
import shutil
import subprocess
import sys
import time
import urllib.request

APP = Path('/www/stylekit')
ID = sys.argv[1]
assert re.fullmatch(r'[a-z][a-z0-9-]{3,80}-[a-f0-9]{8,12}', ID)
STAGE = Path('/www/stylekit-release-stage') / ID
CANARY = STAGE / 'canary'
UNIT = 'stylekit-release-canary-' + ID
assert STAGE.is_dir() and not CANARY.exists()
CANARY.mkdir(mode=0o700)
for name in ('app', 'components', 'lib', 'public'):
    shutil.copytree(APP / name, CANARY / name)
for name in ('package.json', 'pnpm-lock.yaml', 'next.config.ts', 'tsconfig.json', 'postcss.config.mjs'):
    if (APP / name).is_file(): shutil.copy2(APP / name, CANARY / name)
for source in (STAGE / 'sources').rglob('*'):
    if source.is_file():
        target = CANARY / source.relative_to(STAGE / 'sources')
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
(CANARY / 'node_modules').symlink_to(APP / 'node_modules', target_is_directory=True)
(STAGE / 'node_modules').symlink_to(APP / 'node_modules', target_is_directory=True)
(CANARY / '.next').symlink_to(STAGE / '.next', target_is_directory=True)
environment = {}
for line in (APP / '.env.production').read_text().splitlines():
    if line.strip() and not line.lstrip().startswith('#') and '=' in line:
        key, value = line.split('=', 1)
        environment[key.strip()] = value.strip().strip('"').strip("'")
token = environment.get('ADMIN_API_TOKEN')
assert token, 'No admin API token configured for private canary read checks'
checks = []
try:
    subprocess.run([
        'systemd-run', '--unit=' + UNIT,
        '--property=WorkingDirectory=' + str(CANARY),
        '--property=EnvironmentFile=' + str(APP / '.env.production'),
        '--property=MemoryMax=256M', '--property=CPUQuota=30%',
        '/usr/bin/node', '--max-old-space-size=128',
        str(APP / 'node_modules/next/dist/bin/next'), 'start', str(CANARY),
        '--hostname', '127.0.0.1', '--port', '13001',
    ], check=True)
    for attempt in range(30):
        try:
            with urllib.request.urlopen('http://127.0.0.1:13001/api/health', timeout=3) as response:
                body = json.load(response)
                if response.status == 200 and body.get('status') in ('healthy', 'ok'):
                    checks.append({'path': '/api/health', 'status': 200})
                    break
        except Exception:
            time.sleep(1)
    else:
        raise RuntimeError('Isolated canary did not become healthy')
    for route, required_key in (
        ('/api/admin/analytics/prompt-copies?range=7d', 'totalCopies'),
        ('/api/admin/analytics/content?range=7d', 'behavior'),
        ('/api/admin/analytics/overview?range=7d', 'current'),
    ):
        request = urllib.request.Request('http://127.0.0.1:13001' + route,
                                         headers={'Authorization': 'Bearer ' + token})
        started = time.monotonic()
        with urllib.request.urlopen(request, timeout=25) as response:
            body = json.load(response)
            assert response.status == 200 and required_key in body, 'Invalid canary analytics response'
            assert response.headers.get('Cache-Control') == 'private, no-store', 'Analytics cache boundary changed'
            checks.append({'path': route, 'status': 200, 'durationMs': round((time.monotonic() - started) * 1000)})
    receipt = {'result': 'PASS', 'checks': checks, 'memoryLimitMb': 256,
               'productionServiceUnchanged': True,
               'candidateBuildId': (STAGE / '.next/BUILD_ID').read_text().strip()}
    (STAGE / 'canary-result.json').write_text(json.dumps(receipt, indent=2) + '\n')
    print(json.dumps(receipt), flush=True)
finally:
    subprocess.run(['systemctl', 'stop', UNIT])
    subprocess.run(['systemctl', 'reset-failed', UNIT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
