# Versioning

Each skill carries its own version in the registry. Repository commits identify the exact catalog state used for review and compatibility evidence.

## Skill versions

- `0.x` skills are experimental and may change materially.
- Increment a skill version when its behavior, scope, output contract, or substantive guidance changes.
- Documentation-only repository changes do not require every skill version to change.

## Compatibility evidence

Compatibility evidence must name both the tested agent/version and the exact repository or skill commit. A later agent release or skill change does not inherit that evidence automatically.

## Repository releases

A repository tag or release may bundle multiple skill versions. It does not override the per-skill status recorded in `registry/skills.json`.
