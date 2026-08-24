# Contributing

Design Skills accepts focused improvements to portable design workflows,
validation, provenance, compatibility evidence, and documentation.

## Before proposing a skill

A skill must solve a repeated design task and materially improve an agent's
decisions or output. Do not submit generic advice, prompt collections, thin
marketing content, copied component libraries, or renamed upstream work.

Choose one provenance class:

- `original`: authored here without adapted source text.
- `synthesized`: original instructions informed by multiple cited sources.
- `adapted`: derivative work based on identifiable upstream material.
- `reference-only`: cataloged externally but not redistributed here.

Only material with a resolved redistribution decision can ship inside a skill.

## Pull-request workflow

1. Start from current `main` unless this is a documented stacked PR.
2. Use a focused branch and identify its base PR when stacked.
3. Update provenance with the skill in the same change.
4. Run validators and relevant behavioral fixtures.
5. Regenerate catalog output and inspect the diff.
6. Confirm no secrets, paid source, hidden network action, or unsupported agent
   claim entered the repository.
7. Request independent review of the exact commit.
8. Merge only after checks pass and the owner approves.

## Adapted and synthesized work

For each source, record its author, canonical URL, exact path when applicable,
pinned commit or release, license, verification date, influence or copied
material, modifications, and excluded assets or dependencies.

Preserve upstream notices. Mark modified Apache-licensed files. Do not assume a
repository-wide license applies to every folder, asset, article, or paid tier.

## Scope and privacy

Skills must work without DesignMD. Optional integrations must be clearly
labeled and must not weaken the standalone outcome. Examples use obviously
synthetic data and never contain credentials, private prompts, unpublished
source, or user content.
