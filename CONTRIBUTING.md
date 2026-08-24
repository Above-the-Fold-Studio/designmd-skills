# Contributing to DesignMD Skills

DesignMD Skills accepts focused improvements to authored workflows, validation,
agent packaging, provenance, and documentation. Every substantive change uses a
feature branch and reviewed pull request.

## Before proposing a skill

A skill must solve a concrete repeated task and change an agent's decisions or
execution. Do not submit generic advice, prompt collections, thin marketing
content, component libraries, or copies of another product.

Choose one ownership class:

- `designmd-authored`
- `adapted-with-attribution`
- `curated-link`
- `license-review-required`
- `redistribution-prohibited`

Only the first three are release-eligible. If licensing or asset provenance is
uncertain, classify the entry for review and keep it out of generated packages.

## Pull-request workflow

1. Start from current `main` unless the change is an explicitly documented
   stacked pull request.
2. Use a focused feature branch.
3. Add or update provenance in the same change as the affected entry.
4. Run every repository validator and relevant behavioral fixture.
5. Inspect generated diffs; never hand-edit generated output.
6. Confirm no secret, paid source, prompt body, or entitlement claim leaked.
7. Request independent review of the exact commit.
8. Merge only after required checks and review pass.

Run the complete local gate before requesting review:

```sh
npm ci --ignore-scripts
npm run check
```

The gate compiles and applies the JSON Schemas, reconciles registry records with
skill files and fixtures, checks Markdown links, scans credential patterns, and
runs adversarial validator tests.

A pull request must distinguish authored source, generated artifacts, and
external links. It must state the supported agents actually tested; a directory
shape or successful copy is not an installation test.

## Skill requirements

Each release-eligible skill needs:

- a discriminating name and description;
- a compact `SKILL.md` entrypoint;
- supporting references only when conditional detail warrants them;
- deterministic scripts only when repeated mechanics warrant them;
- declared inputs, observable outputs, and failure behavior;
- Free, Pro, or Builder capability requirements;
- a provenance record and license decision;
- positive routing and negative non-routing fixtures;
- installation and execution evidence in every claimed agent;
- no unfinished scaffold text or placeholder claims.

The root router should load one skill by default and no more than three unless a
named workflow requires more.

## Verification evidence

A `stable` skill requires tested Claude Code and Codex records whose skill ID,
agent, version, and commit match the registry. Each JSON record must mark
`installation`, `positiveRouting`, `negativeRouting`, and `execution` as
`pass` and include its verification date. The skill-level verified commit must
match both agent records.

A curated entry may be `verified` only when a structured evidence file confirms
that its HTTPS repository and pinned commit were reachable on the recorded date.
An installable entry must also confirm the exact published package. Unavailable
or unverified entries cannot publish a package, installation claim, or evidence
claim.

## Adapted work

An adapted contribution must preserve upstream copyright and license notices and
record:

- author and upstream repository;
- exact source path;
- pinned commit or release;
- license and required notice;
- summary of DesignMD changes;
- excluded assets and dependencies;
- last verification date.

Do not relabel unchanged public work as proprietary or place restricted source
behind a DesignMD paywall.

## Access and privacy

Repository text may explain when a hosted capability requires Free, Pro, or
Builder access, but the server is the enforcement boundary. Examples must use an
individual key flow and must never contain a shared key.

Analytics may record public skill IDs, versions, agent choices, and coarse
funnel stages. It must not record credentials, authorization headers, prompts,
private markup, or downloaded skill contents.
