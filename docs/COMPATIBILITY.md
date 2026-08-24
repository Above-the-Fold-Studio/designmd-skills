# Compatibility

Design Skills separates three different claims that are easy to conflate:

1. **Package discoverability** — an installer can find and place a skill.
2. **Structural compatibility** — a skill follows the expected Agent Skill file shape.
3. **Behavioral compatibility** — the skill has been executed and reviewed in a named agent/version with bounded evidence.

Only the third supports a tested-agent claim in the registry.

## Current state

The bootstrap catalog is intentionally conservative. Skills are experimental and `testedAgents` remains empty unless compatibility evidence is recorded and validated.

The public `skills` CLI currently exposes installation targets including Codex and Claude Code. That is useful distribution infrastructure, but it is not by itself evidence that every Design Skill executes correctly in those agents.

## Evidence requirements

A future tested-agent claim should record at minimum:

- agent and version;
- exact skill/repository commit;
- positive routing or invocation evidence;
- an unrelated negative control where routing is relevant;
- the execution boundary (read-only fixture, repository edit, browser/tool use, etc.);
- result and reviewer;
- known limitations.

Do not infer compatibility from Markdown parsing alone, from installer support, or from another agent's result.

## Security boundary

Installation and agent execution are separate trust decisions. Bootstrap skills are restricted to inert text/data files and are scanned for credential-shaped content. That reduces accidental supply-chain risk; it does not make arbitrary third-party skills safe to execute.
