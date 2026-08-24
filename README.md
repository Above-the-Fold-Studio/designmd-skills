# DesignMD Skills

DesignMD Skills is a public, provenance-first collection of compact workflows
that help coding agents apply, review, extract, and certify interface design
systems.

The repository is in its initial-collection review phase. No installation
command is published yet. A command becomes supported only after the relevant
package has passed validation and an installation test in the named agent.

## What belongs here

- A lightweight DesignMD router that loads only the workflow a task needs.
- DesignMD-authored skills for applying and reviewing design systems.
- Workflows that call DesignMD MCP without embedding credentials.
- Curated entries that point to eligible external tools with explicit
  provenance and licensing.
- Generated metadata for supported agent packages and the DesignMD website.

## What does not belong here

- Component source, design assets, or paid material redistributed without
  permission.
- DesignMD Pro prompt packs, Builder source, API keys, or shared credentials.
- A copy of the separate
  [distinct](https://github.com/Above-the-Fold-Studio/distinct) product.
- Generic prompt collections that do not encode a testable workflow.
- Hand-edited generated packages or public indexes.

## Access boundary

The public repository and its authored instructions are free. A skill may guide
a user to DesignMD MCP or another hosted capability, but the service enforces
Free, Pro, and Builder access on the server. Repository text and client metadata
must never be treated as an entitlement boundary.

Public installation instructions must use an individual user key. The hosted
DesignMD MCP currently retains a legacy shared free-bearer compatibility path;
this repository must neither reveal nor normalize that path. Removing or
making that exception internal-only is a separate DesignMD runtime change and
must be resolved before this repository publishes an installation command.

No example, fixture, generated artifact, or release may contain a shared key.

## Provenance classes

Every registry entry will declare one ownership class:

1. `designmd-authored`
2. `adapted-with-attribution`
3. `curated-link`
4. `license-review-required`
5. `redistribution-prohibited`

Only the first three may appear in a public release. Adapted work must identify
its upstream path, pinned commit or release, license, required notice, DesignMD
changes, excluded assets, and verification date.

## Repository model

The canonical registry will generate agent packages and public search metadata.
Consumers pin an exact registry release; they do not infer availability,
licensing, or paid access from directory contents.

```text
canonical registry
    +-- validated SKILL.md packages
    +-- generated Claude Code package
    +-- generated Codex package
    +-- generated public website index
    `-- generated MCP discovery metadata
```

Generated files will be labeled and checked for drift. The root router will load
one skill by default and no more than three unless a named workflow requires
more.

## Repository validation

The registry contains an experimental root router plus four authored workflows:
apply, review, extract, and certify. The root router is tested in Claude Code
and Codex; the four specialty workflows are tested in Codex and remain
`planned` in Claude Code. `distinct` is recorded as an unavailable curated
entry. No package or installation command is supported yet. Validate the
current source with:

```sh
npm ci --ignore-scripts
npm run check
```

This is repository validation, not a supported skill-installation command.

Provider-specific packages are generated from the canonical registry rather
than maintained by hand. Codex 0.149.0 has tested evidence for the router and
four specialty workflows; Claude Code 2.1.241 has tested evidence for the router.
No public installation command is supported. See the
[packaging contract](docs/provider-packaging.md) and
[compatibility status](docs/compatibility-status.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a skill or changing a
policy. All substantive changes use a feature branch and reviewed pull request.
Security reports follow [SECURITY.md](SECURITY.md).

## License

DesignMD-authored material is licensed under Apache-2.0. Third-party material
retains its own license and notice requirements; see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
