# CLI releases

`cli-v*` tags run [cli-publish.yml](../.github/workflows/cli-publish.yml).
Use Node 24 and the pnpm version pinned in the root `package.json`.

The workflow checks that the tag matches `packages/cli/package.json`, builds
core and CLI, and packs the CLI. It extracts the tarball outside the workspace
and runs the existing black-box smoke tests there. It then publishes that same
tarball with npm provenance. This catches missing files and accidental runtime
dependencies on workspace packages before publishing.

## Prepare a release

1. Update the CLI package version and the pinned command in its README.
2. Create a fresh worktree at the release commit. Do not share `node_modules`
   with the development checkout when validating the release pipeline.
3. Run the repository checks from `AGENTS.md`, then the workflow's build, pack,
   smoke-test, and dry-run steps. Record unrelated baseline failures explicitly.
4. Push the reviewed commit and its matching tag, such as `cli-v0.1.4`.
5. Wait for GitHub Actions to succeed, then verify the public package from an
   empty directory:

   ```bash
   pnpm dlx stylekit-cli@0.1.4 --version
   pnpm dlx stylekit-cli@0.1.4 search glass
   ```

6. Check npm metadata for the expected version and `dist.attestations.provenance`.
   The attestation should reference the CLI workflow and the release tag/commit.

## Fresh-checkout dependency behavior

pnpm 11 requires an explicit decision for dependency build scripts. Keep
`protobufjs: false` in `pnpm-workspace.yaml` when its build script should be
skipped. An unspecified dependency can make a later `pnpm run` retry installation
and fail with `ERR_PNPM_IGNORED_BUILDS`, even after an earlier install succeeded
with relaxed checks. A warm checkout can hide this failure.

The release workflow currently uses `--no-frozen-lockfile` because this branch's
root app manifest is ahead of its committed lockfile. Restore
`--frozen-lockfile` once that lockfile is synchronized. Do not copy unrelated,
uncommitted dependency changes into a release to make installation pass.
