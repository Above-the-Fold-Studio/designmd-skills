# Install Design Skills

Design Skills is a portable Agent Skills repository. The skills are plain skill packages and do not require a DesignMD account, API key, MCP server, or hosted service.

## Discover skills

Use the open `skills` CLI to inspect the repository before installing anything:

```sh
npx skills add Above-the-Fold-Studio/designmd-skills --list
```

## Install one skill

```sh
npx skills add Above-the-Fold-Studio/designmd-skills --skill interface-critique
```

## Install several skills

```sh
npx skills add Above-the-Fold-Studio/designmd-skills \
  --skill design-context \
  --skill responsive-design \
  --skill interface-critique
```

## Target a supported agent

The upstream `skills` CLI supports agent-specific installation targets. For example:

```sh
npx skills add Above-the-Fold-Studio/designmd-skills \
  --skill interface-critique \
  --agent codex
```

or:

```sh
npx skills add Above-the-Fold-Studio/designmd-skills \
  --skill interface-critique \
  --agent claude-code
```

An installer recognizing a target is not evidence that a particular skill has been behaviorally tested in that agent. See [Compatibility](COMPATIBILITY.md) for the evidence boundary.

## Source installation

You can also clone or fork this repository and use the skill directories directly. Keep each `SKILL.md` together with its local guide, fixtures, and provenance metadata.

## Release boundary

All current skills are experimental until the registry records stronger, machine-checked quality evidence. Installation makes the files available to an agent; it does not certify execution quality, accessibility conformance, or compatibility with every agent version.
