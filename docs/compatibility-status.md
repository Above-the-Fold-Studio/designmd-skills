# Agent compatibility status

Checked 2026-08-24 against source commit
`7187b82b412169996c848b6e5dbe9a9cc79a48f1`.

| Agent | Version | Scope | Result |
| --- | --- | --- | --- |
| Codex | 0.149.0 | Generated package, explicit root-router invocation, one positive route, one negative route | Pass |
| Claude Code | 2.1.241 | Generated package and two capped root-router invocations | Blocked |

## Codex evidence

The generated `.agents/skills/designmd/SKILL.md` was installed in a clean
temporary Git repository. A read-only, ephemeral Luna run selected
`review-design-system-implementation` for a DESIGN.md implementation audit.
A second run returned `NONE` for an unrelated PostgreSQL indexing task. No
tools were called and no files were changed.

The machine-readable record is
[`evidence/designmd/codex-0.149.0.json`](../evidence/designmd/codex-0.149.0.json).
Only the root router is marked tested. The four specialty workflows remain
planned until each is executed against a bounded fixture.

## Claude Code blocker

The generated `.claude/skills/designmd/SKILL.md` was installed in a clean
temporary directory. Two non-interactive, low-effort Haiku attempts were
bounded by a spend cap and returned no model response. The second attempt was
terminated after 60 seconds; the first stalled process was identified by its
exact command line and terminated separately. The user's older Claude Code
process was not touched.

This is not passing compatibility evidence. Claude Code remains `planned`.
Retry only after the local provider/authentication path is known healthy, and
retain the same positive and negative routing expectations.
