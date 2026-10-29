# StyleKit release helpers

Keep reusable operator code here. Put each release's private configuration,
manifest, package script, archive, logs, screenshots and receipts under the
repository's ignored `.tmp/releases/<release-id>/` directory. Never add real
environment files or receipts containing personal information to Git.

These helpers target the existing `/www/stylekit` installation and
`stylekit.service`. They do not build on the production host or change the
separate MCP service. Run them only for an owner-approved release.

## Inputs

Prepare a clean committed application build and an archive named
`/tmp/stylekit-<release-id>.tar.gz`. The archive contains `.next/`,
`sources/<relative path>`, `database-rollback.sql`, and `manifest.json`.
The manifest records the release ID, current and candidate commit/build IDs,
dependency/environment hashes, approved file preimages and candidate hashes.
Local package scripts can live in the ignored release directory; they must
exclude environment files, dependencies, build caches and unrelated work.

## Staging, compatibility check and activation

On the target host, use the same reviewed archive checksum and release ID for
all three steps:

```sh
python3 activate.py <archive-sha256> <release-id> stage-only
python3 canary.py <release-id>
python3 activate.py <archive-sha256> <release-id>
```

Staging verifies archive paths, artifact identity, live source preimages and
concurrent changes before touching the live application. The canary serves the
candidate on loopback port 13001 under a separate transient systemd unit capped
at 256 MB and 30% CPU. It performs read-only health and authenticated analytics
checks, then stops its unit. Credentials stay in the existing server environment.

Activation takes the deployment lock, backs up approved source files and release
markers, retains the current build, preserves old immutable assets, switches the
build and restarts only the website service. Health and representative public
routes must pass before a receipt is written. A failed activation restores the
previous build, source files and markers. The backup stays under
`/www/stylekit-backups/<release-id>/`.

Database migrations are a separate reviewed step. Save the previous function
definitions before changing them; do not manufacture analytics events for testing.
