# StyleKit Knowledge Base Governance

This document defines how external frontend resources become usable StyleKit
knowledge. The knowledge base is a retrieval and generation dependency, so a
resource is never considered usable only because its repository is popular.

## Storage boundary

- Git stores versioned manifests, pinned source snapshots, `LICENSE`/`NOTICE`
  files, content hashes, SBOM output, and generated catalog artifacts.
- Supabase stores ingestion runs, review decisions, publication state, search
  metadata, and audit events.
- The public catalog reads only resources that are both `review_status =
  approved` and `publication_status = published`.
- `lib/supabase/migrations/026_knowledge_base.sql` keeps the control plane
  private to the service role until a reviewed Supabase adapter is introduced.

## Lifecycle

```text
discovered -> license-checked -> mirrored -> normalized -> security-scanned
           -> quality-reviewed -> generator-reviewed -> published
           -> deprecated/revoked
```

The JSON manifest in `knowledge/manifests` is the local contract. A candidate
may be indexed for internal research, but it cannot enter the public retrieval
catalog or generator until its status fields satisfy the schema gates in
`lib/knowledge/schema.ts`.

## Full mirror rules

Full mirrors must use a pinned commit and retain the upstream license and notice
files. The snapshot must be hashable and reviewable. Never mirror secrets,
`.env` files, build output, dependency caches, generated binaries, or unrelated
user data. A mirror with an unclear license stays `retrieval-only` or
`research-only` and is not a generator source.

## Review gates

1. Confirm the exact upstream repository, ref, commit, and license scope.
2. Run secret and dependency scans; critical findings block approval.
3. Record documentation, runtime, accessibility, and performance review.
4. Explain what was extracted and what was intentionally not copied.
5. Approve generator use only when commercial use, modification, and
   redistribution rights are explicit and the content hash is recorded.
6. Publish only after the review and publication events are auditable.

The admin review endpoint records the decision and evidence in Supabase but
does not mutate the Git manifest or publish a resource. A later manifest sync
must still carry the reviewed status, so source history and database history do
not drift silently.

The admin publication endpoint records publish, deprecate, and revoke events
only after the same control-plane checks. It deliberately does not override a
Git manifest: a publish event is rejected until the manifest is already
approved, published, and hash-complete, and every event returns
`requiresManifestSync` so operators know which source must be updated.

For a full source mirror, run:

```bash
npm run mirror:knowledge -- \
  --id=radix-primitives \
  --commit=<full-or-short-commit-sha> \
  --destination=/var/lib/stylekit/knowledge-mirrors \
  --license-path=LICENSE.md
```

The command clones a pinned commit without checking out a working tree,
extracts it into an explicit destination, verifies the license file, skips
build/dependency caches, scans for secrets, and emits a deterministic
`sha256:` snapshot hash. A critical finding makes the command fail.

## Current phase

The repository currently contains ten candidate manifests and no published
third-party resources. That is intentional: the catalog and APIs are in place,
but no external project has been promoted into the generator path without a
formal review.
