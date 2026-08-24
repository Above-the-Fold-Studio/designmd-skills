# Provider packaging contract

The repository keeps one canonical copy of each authored skill under
`skills/<id>/`. A deterministic packager maps those files into the local
discovery layout documented by each supported agent:

| Agent | Generated skill root | Evidence status |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | structural packaging only |
| Codex | `.agents/skills/` | structural packaging only |

The packager includes only authored registry entries. Unavailable curated links
such as `distinct` are never copied. It validates the repository first, rejects
symlinked source files, writes only to a missing or empty directory outside the
repository, and refuses to overwrite existing content.

For maintainers, the packaging probe is:

```sh
npm run package:skills -- --agent codex --output <empty-temporary-directory>
npm run package:skills -- --agent claude-code --output <empty-temporary-directory>
```

These are build probes, not public installation commands. Passing them proves
the file layout is reproducible; it does not prove that either agent discovered,
routed, or successfully executed a skill. Registry agent status must remain
`planned` until clean-environment behavior tests produce reviewable evidence.

Source-path references:

- Claude Code: [Anthropic Agent Skills documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview),
  checked 2026-08-24.
- Codex: [official OpenAI Build skills documentation](https://learn.chatgpt.com/docs/build-skills),
  checked 2026-08-24.
