# Quality policy

Quality status describes evidence, not popularity.

## Statuses

- **experimental:** metadata, structure, provenance, and static validation pass.
- **curated:** experimental requirements plus representative routing fixtures
  and at least one independently reviewed agent-behavior run.
- **official:** curated requirements plus maintainer approval and verified
  installation and behavior in both Codex and Claude Code.

New skills begin as experimental. Status can move backward when a dependency,
specification, or observed behavior changes.

During repository bootstrap, validation accepts only experimental. Curated and
official remain unavailable until behavior evidence, installation evidence,
independent review, and maintainer approval have machine-checked records.

## Required evidence

Every release-eligible skill needs a narrow purpose, clear use boundaries, a
standalone workflow with observable output, positive and negative routing
fixtures, resolved provenance, and no hidden credential, payment, telemetry,
hook, or network requirement.

Behavior evidence records the exact skill version, agent, fixture, date, result,
and limitation. An installation test is not a behavior test.

## Review cadence

- Update guides, provenance, fixtures, and generated catalog output in the same
  pull request as a changed skill.
- Regenerate and validate the full catalog before every tagged release.
- Review official skills quarterly for stale references, compatibility, and
  upstream license or availability changes.
- Downgrade or withdraw a skill immediately after a confirmed security,
  licensing, or material behavior issue.

Dates in evidence and provenance are historical facts, not permanent guarantees.
