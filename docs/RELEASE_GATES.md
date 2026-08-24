# V1 Release Gates

This file tracks the small set of release blockers that must be resolved after the corrected five-PR stack is implemented.

## Pre-merge

- [ ] Independent review of the exact final PR #10 SHA.
- [x] Remove the non-operational `@Above-the-Fold-Studio/alpha` CODEOWNERS assignment for v1 bootstrap. Re-add an appropriate team later after repository access is configured.
- [x] Confirm the prior frozen PR #10 GitHub Actions `Validate` run passed after the security-test correction.
- [ ] Confirm GitHub Actions `Validate` passes again on the new final SHA after the CODEOWNERS/release-gate cleanup.

## Merge

Merge only after explicit owner approval and in this dependency order:

1. PR #6
2. PR #7
3. PR #8
4. PR #9
5. PR #10

Do not bypass a failed required check or unresolved review finding merely to complete the stack.

## Post-merge release verification

- [ ] Run `npx skills add Above-the-Fold-Studio/designmd-skills --list` against `main`.
- [ ] Verify a selective install with `--skill interface-critique`.
- [ ] Verify the repository is discoverable through the expected skills.sh / `skills` ecosystem path.
- [ ] Record installation evidence with the exact repository SHA and installer version.
- [ ] Keep all skills `experimental` until behavioral evidence supports promotion.

## Behavioral evidence

Behavioral agent compatibility is separate from installation. Before a skill is promoted beyond `experimental`, record bounded execution evidence under the rules in `QUALITY.md` and `docs/COMPATIBILITY.md`.

- `curated`: independently reviewed behavioral evidence in at least one named agent/version.
- `official`: verified installation and behavior in both Codex and Claude Code plus maintainer approval.

## Deferred administration

- Re-add CODEOWNERS after the intended Above the Fold Studio team has repository access.
- Any broader repository transfer, rename, or DesignMD/Design Skills organization consolidation remains outside this v1 release unless separately instructed.
