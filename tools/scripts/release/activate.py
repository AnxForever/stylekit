from pathlib import Path, PurePosixPath
import fcntl
import hashlib
import json
import os
import re
import shutil
import signal
import subprocess
import sys
import tarfile
import time
import urllib.request

APP = Path('/www/stylekit')
ID = sys.argv[2]
assert re.match(r'^[a-z][a-z0-9-]{3,80}-[a-f0-9]{8,12}$', ID)
STAGE = Path('/www/stylekit-release-stage') / ID
BACKUP = Path('/www/stylekit-backups') / ID
ARCHIVE = Path('/tmp/stylekit-' + ID + '.tar.gz')
MARKERS = ['.release-commit', '.release-build-commit']
changed = False
had_timer = False
manifest = None

def log(value):
    print(value if isinstance(value, str) else json.dumps(value), flush=True)

def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def run(*args):
    subprocess.run(list(args), check=True)

def service_pid(name):
    return subprocess.check_output(['systemctl', 'show', name, '-p', 'MainPID', '--value']).decode().strip()

def guarded_target(relative):
    assert relative.startswith(('app/', 'components/', 'lib/'))
    candidate = APP / relative
    assert str(candidate.resolve()).startswith(str(APP) + '/')
    cursor = candidate
    while cursor != APP:
        assert not cursor.is_symlink(), 'Source path contains a symlink'
        cursor = cursor.parent
    return candidate

def check_preimages():
    assert (APP / '.release-commit').read_text().strip() == manifest['baseCommit'], 'Live revision changed'
    assert (APP / '.next/BUILD_ID').read_text().strip() == manifest['previousBuildId'], 'Live build changed'
    assert digest(APP / 'pnpm-lock.yaml') == manifest['packageLockSha256'], 'Runtime dependencies changed'
    assert digest(APP / '.env.production') == manifest['productionEnvSha256'], 'Production environment changed'
    for item in manifest.get('unchangedPrerequisites', []):
        assert digest(guarded_target(item['path'])) == item['sha256'], 'Concurrent public change differs: ' + item['path']
    for item in manifest['files']:
        target = guarded_target(item['path'])
        before = item['beforeSha256']
        if before is None:
            assert not target.exists(), 'New source path already exists: ' + item['path']
        else:
            assert target.is_file() and digest(target) == before, 'Source preimage mismatch: ' + item['path']

def health():
    for attempt in range(30):
        try:
            with urllib.request.urlopen('http://127.0.0.1:13000/api/health', timeout=4) as response:
                body = json.load(response)
                if response.status == 200 and body.get('status') in ('ok', 'healthy'):
                    return body
        except Exception:
            pass
        time.sleep(1)
    raise RuntimeError('Application health failed after activation')

def stop_service():
    run('systemctl', 'stop', 'stylekit.service')
    assert service_pid('stylekit.service') == '0', 'Service did not stop'

def restore():
    stop_service()
    if (BACKUP / '.next').exists():
        if (APP / '.next').exists():
            (APP / '.next').rename(STAGE / 'failed-build')
        (BACKUP / '.next').rename(APP / '.next')
    for item in manifest['files']:
        target = guarded_target(item['path'])
        if item['beforeSha256'] is None:
            if target.is_file(): target.unlink()
        else:
            shutil.copy2(BACKUP / 'sources' / item['path'], target)
    for name in MARKERS:
        saved = BACKUP / 'markers' / name
        if saved.exists(): shutil.copy2(saved, APP / name)
    run('systemctl', 'start', 'stylekit.service')
    health()
    assert (APP / '.next/BUILD_ID').read_text().strip() == manifest['previousBuildId']
    log({'rolledBack': True, 'backup': str(BACKUP)})

def interrupted(signum, frame):
    raise RuntimeError('Release interrupted by signal ' + str(signum))

for sig in (signal.SIGTERM, signal.SIGINT, signal.SIGHUP):
    signal.signal(sig, interrupted)

lock = open('/run/stylekit-reviewed-deploy.lock', 'w')
fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
assert APP.resolve() == APP
assert not BACKUP.exists(), 'Release ID already used'
assert shutil.disk_usage('/www').free > 2_000_000_000, 'Insufficient staging/rollback disk headroom'
expected_archive_hash = sys.argv[1]
assert digest(ARCHIVE) == expected_archive_hash, 'Archive checksum mismatch'
if not STAGE.exists():
    STAGE.mkdir(parents=True, mode=0o700)
    with tarfile.open(ARCHIVE) as bundle:
        for member in bundle.getmembers():
            relative = PurePosixPath(member.name)
            assert not relative.is_absolute() and '..' not in relative.parts
            assert not member.issym() and not member.islnk() and (member.isfile() or member.isdir())
            assert member.name in ('manifest.json', 'database-rollback.sql') or member.name.startswith(('sources/', '.next/'))
        bundle.extractall(STAGE)
manifest = json.loads((STAGE / 'manifest.json').read_text())
assert manifest['releaseId'] == ID
assert (STAGE / '.next/BUILD_ID').read_text().strip() == manifest['buildId']
for item in manifest['files']:
    assert digest(STAGE / 'sources' / item['path']) == item['afterSha256']
check_preimages()
if len(sys.argv) > 3 and sys.argv[3] == 'stage-only':
    log({'staged': True, 'stage': str(STAGE), 'commit': manifest['commit'], 'buildId': manifest['buildId']})
    sys.exit(0)
mcp_pid = service_pid('stylekit-mcp.service')
# Preserve old immutable chunks without replacing any newly built files.
old_static = APP / '.next/static'
new_static = STAGE / '.next/static'
for source in old_static.rglob('*'):
    target = new_static / source.relative_to(old_static)
    if source.is_dir():
        target.mkdir(parents=True, exist_ok=True)
    elif source.is_file() and not target.exists():
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
BACKUP.mkdir(parents=True, mode=0o700)
(BACKUP / 'markers').mkdir()
for name in MARKERS:
    if (APP / name).exists(): shutil.copy2(APP / name, BACKUP / 'markers' / name)
for item in manifest['files']:
    if item['beforeSha256'] is not None:
        saved = BACKUP / 'sources' / item['path']
        saved.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(guarded_target(item['path']), saved)
shutil.copy2(STAGE / 'manifest.json', BACKUP / 'manifest.json')
shutil.copy2(STAGE / 'database-rollback.sql', BACKUP / 'database-rollback.sql')
check_preimages()
try:
    had_timer = subprocess.run(['systemctl', 'is-active', '--quiet', 'stylekit-healthcheck.timer']).returncode == 0
    if had_timer: run('systemctl', 'stop', 'stylekit-healthcheck.timer')
    stop_service()
    changed = True
    (APP / '.next').rename(BACKUP / '.next')
    for item in manifest['files']:
        target = guarded_target(item['path'])
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(STAGE / 'sources' / item['path'], target)
    (STAGE / '.next').rename(APP / '.next')
    for name in MARKERS: (APP / name).write_text(manifest['commit'] + '\n')
    run('systemctl', 'start', 'stylekit.service')
    report = health()
    assert (APP / '.next/BUILD_ID').read_text().strip() == manifest['buildId']
    assert service_pid('stylekit-mcp.service') == mcp_pid, 'MCP process changed unexpectedly'
    # Verify representative public routes without writing analytics events.
    for route in ('/en', '/zh', '/robots.txt', '/sitemap.xml', '/llms.txt'):
        with urllib.request.urlopen('http://127.0.0.1:13000' + route, timeout=15) as response:
            assert response.status == 200, 'Route failed: ' + route
    receipt = {'commit': manifest['commit'], 'buildId': manifest['buildId'],
               'previousBuildId': manifest['previousBuildId'], 'backup': str(BACKUP),
               'archiveSha256': expected_archive_hash, 'releasedAt': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
               'health': report.get('status'), 'mcpPidPreserved': True}
    # One neutral receipt file: a per-release name would leak the feature name
    # into the deployment directory, and a hard-coded one overwrites the receipt
    # of an earlier release. Each backup keeps its own receipt.json.
    (APP / '.release-receipt.json').write_text(json.dumps(receipt, indent=2) + '\n')
    (BACKUP / 'receipt.json').write_text(json.dumps(receipt, indent=2) + '\n')
    log(receipt)
except BaseException:
    if changed: restore()
    raise
finally:
    if had_timer: run('systemctl', 'start', 'stylekit-healthcheck.timer')
