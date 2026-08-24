# Agent compatibility status

Checked 2026-08-24 against source commit
`7187b82b412169996c848b6e5dbe9a9cc79a48f1`.

| Agent | Version | Scope | Result |
| --- | --- | --- | --- |
| Codex | 0.149.0 | Generated package, explicit root-router invocation, one positive route, one negative route | Pass |
| Claude Code | 2.1.241 | Generated package, explicit root-router invocation, one positive route, one negative route | Pass |

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

## Claude Code evidence

The generated `.claude/skills/designmd/SKILL.md` was installed in a clean
temporary directory. Passing probes used the existing Claude Code login with
hooks disabled through a temporary settings file. No credential was changed,
and no tools or files were used.

The positive probe selected `review-design-system-implementation`; the
unrelated PostgreSQL probe returned `NONE`. Although `haiku` was requested,
Claude Code reported `claude-sonnet-5` as the model actually used. The
machine-readable record is
[`evidence/designmd/claude-code-2.1.241.json`](../evidence/designmd/claude-code-2.1.241.json).

Only the root router is marked tested. This does not validate the four specialty
workflows, a live MCP call, or the invalid environment-provided credential.
