# Knowledge resource manifests

This directory contains one JSON manifest per candidate or approved resource.
The manifest is the source register, not a claim that the resource is already
safe to copy into generated projects.

Lifecycle:

```text
candidate -> pending review -> approved -> published
                                \-> rejected
published -> deprecated/revoked
```

Rules:

- Keep one resource per file using a lowercase kebab-case `id`.
- Pin a `commitSha` before creating a full mirror.
- Full mirrors must preserve the upstream LICENSE and NOTICE files.
- `generator-approved` and `distribution-approved` require a passing review,
  security checks, commercial modification/redistribution rights, and a
  content hash.
- Do not put API keys, `.env` files, build caches, or unreviewed binaries in a
  knowledge mirror.
