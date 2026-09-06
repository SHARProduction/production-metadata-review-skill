---
name: production-metadata-review
description: Review a local video-production metadata manifest before handoff or publication. Use when validating production stage, rights status, delivery readiness, or a JSON manifest for AI-hybrid video work.
license: MIT
compatibility: Requires Node.js 20 or later for the bundled local validation script; no network access is required.
metadata:
  author: SHAR Production
  homepage: https://sharprod.com/
  version: "1.0.0"
---

# Production Metadata Review

Use this skill to inspect a local JSON metadata manifest before recommending a
production deliverable for release. It provides an evidence-based check only;
it does not clear rights, alter media, publish files, or replace legal review.

## Workflow

1. Identify the local manifest file supplied for review. Do not infer values
   from filenames or media contents.
2. Run `node scripts/validate-manifest.mjs <manifest.json>` from this skill
   directory.
3. Report the exact JSON output. A `releasable: false` result means do not
   recommend publication until the listed fields are resolved.
4. If validation passes, describe only that the metadata contract passed; do
   not claim a legal clearance beyond the declared `rights_status`.

The required fields are `title`, `project`, `stage`, and `rights_status`.
Accepted stages are `preproduction`, `production`, `postproduction`, and
`delivery`. Accepted releasable rights values are `cleared`, `licensed`, and
`synthetic`; `unknown` intentionally blocks the release recommendation.

## Example

```sh
node scripts/validate-manifest.mjs fixtures/releasable.json
```

For the full field contract and limits, see
[the reference](references/MANIFEST-CONTRACT.md).
