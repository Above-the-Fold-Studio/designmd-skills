# Agent instructions

This repository is the canonical source for DesignMD skill metadata and authored
skill packages.

## Source of truth

- Edit canonical source and regenerate outputs; never hand-edit generated files.
- A directory is not evidence that a skill is supported. Registry metadata,
  validation, installation evidence, and release state must agree.
- Website, MCP, and agent packages consume a pinned generated release.
- Keep `distinct` separate. Link or orchestrate it; do not duplicate its
  product identity or command set.

## Skill authoring

- Keep `SKILL.md` compact and discriminating.
- Put conditional detail in linked `references/` files.
- Add scripts only for repeated deterministic mechanics and execute their tests.
- Load one routed skill by default and no more than three unless a named
  workflow requires more.
- Remove unfinished placeholders before review.
- Claim support only for agents tested through installation and execution.

## Licensing and access

- Every entry declares an ownership class and provenance.
- Only `designmd-authored`, `adapted-with-attribution`, and `curated-link`
  entries may enter public generated packages.
- Preserve upstream licenses and notices.
- Never copy Pro-only, paid, Commons-Clause-restricted, or otherwise
  redistribution-prohibited source.
- Public instructions do not grant hosted entitlements; server-side checks do.
- Never include a shared key, bearer token, environment secret, prompt pack, or
  Builder source.

## Working agreement

- Work on a feature branch and use a reviewed pull request.
- Keep governance, schema/tooling, skills, and generated output changes
  reviewable; use stacked PRs when dependencies require it.
- Run repository validation and inspect generated diffs before committing.
- Review the exact commit that will be pushed.
- Do not merge or publish a release without explicit owner approval.
- Update documentation in the same PR as any behavior or contract change.
