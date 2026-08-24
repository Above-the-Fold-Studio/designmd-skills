# Agent instructions

This repository is the canonical source for a standalone public library of
design Agent Skills.

## Source of truth

- Treat the current repository as authoritative; handoffs and memory may be
  stale.
- Edit canonical source and regenerate derived files. Never hand-edit generated
  catalog output.
- A directory is not evidence that a skill is supported. Metadata, validation,
  behavior evidence, and release state must agree.
- Keep DesignMD optional. Every public skill must deliver its core outcome
  without an account, key, MCP server, private catalog, or hosted service.

## Skill authoring

- Follow the Agent Skills folder format with a required `SKILL.md`.
- Keep names narrow and descriptions discriminating enough for routing.
- Put conditional detail in linked `references/` files. Add scripts only for
  repeated deterministic mechanics and test them.
- Prefer observable workflows and decision criteria over generic design advice.
- Test positive routing, negative routing, and realistic behavior.
- Claim agent compatibility only after installation and execution are tested.

## Licensing and provenance

- Every released skill declares one provenance class: `original`,
  `synthesized`, `adapted`, or `reference-only`.
- Original repository work is MIT-licensed. Adapted files retain all upstream
  licenses, notices, attribution, and modification markings.
- Do not copy paid, source-available, Commons-Clause, redistribution-prohibited,
  or ambiguously licensed material.
- Rewriting does not erase attribution or license obligations.

## Security and privacy

- Skills must not contain secrets, shared keys, credential-shaped examples,
  hidden paid calls, telemetry, or undisclosed network behavior.
- Scripts, hooks, installers, and network actions require explicit review and
  the least authority needed.
- A public skill may describe optional third-party integrations, but it must not
  silently invoke them.

## Working agreement

- Use focused feature branches and reviewed pull requests.
- Use stacked pull requests only when their dependency is explicit.
- Run repository validation and inspect generated diffs before committing.
- Review the exact commit that will be pushed.
- Do not merge, publish a release, or connect deployment automation without
  explicit owner approval.
- Update documentation in the same PR as any behavior or contract change.
