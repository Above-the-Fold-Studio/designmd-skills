# Standalone Design Skills Library — Corrected Plan

This is the source-of-truth implementation and release plan for `designmd-skills`. Update the status table as work changes; do not silently replace this plan with ad hoc follow-on work.

## Summary

Build `designmd-skills` as the design equivalent of Marketing Skills: a free, task-oriented library of installable skills for AI agents.

- Every skill must work without DesignMD, MCP, an account, or a key.
- DesignMD is an optional enhancement and paid tooling layer.
- Use existing open-source work where licensing permits, while preserving attribution.
- Launch through GitHub and skills.sh first; the DesignMD website mirror is later and separate.
- Do not build a custom installer, website, or MCP registry in v1.

## Current execution status

- [x] Verify live repository, remote main, superseded PR state, and corrected branch stack.
- [x] Close superseded PRs #1–#5 without merging while preserving historical branches/SHAs.
- [x] Corrected PR 1 (#6): standalone product foundation and governance.
- [x] Corrected PR 2 (#7): generic registry, templates, validation, CI, and generated catalog.
- [x] Corrected PR 3 (#8): six standalone foundation skills.
- [x] Corrected PR 4 (#9): six standalone workflow skills.
- [ ] Corrected PR 5 (#10): distribution, compatibility evidence framework, contribution/growth workflow, and release safeguards. Implementation is present and CI is green; final plan-gap audit and exact-SHA review remain.
- [ ] Run full acceptance verification and independent exact-SHA review of the completed five-PR stack.
- [ ] Deliver the stack without merging. Merge requires separate owner approval and dependency order #6 → #7 → #8 → #9 → #10.

## Research and source strategy

Primary reference classes:

- Marketing Skills: repository organization, task-oriented taxonomy, related-skill system, installation and contribution model.
- Jakub Krehel Skills: typography, layout, color, accessibility, interface writing, UI-quality foundations.
- Impeccable: critique, polish, hardening, motion, anti-pattern and verification workflows.
- Dembrandt Skills: hierarchy, information architecture, loading states, microinteractions and authentic content.
- Vercel Agent Skills: web-design conformance and implementation-review checks.
- Inclusive Design Skills: design-stage accessibility, readable content, forms, tables and cognitive accessibility.
- W3C ARIA Practices: authoritative keyboard, semantic, focus and component behavior.
- Radix Primitives: accessible component composition and state behavior.
- Awesome Design Skills: optional future style packs and the `SKILL.md` + human-readable `DESIGN.md` pattern.
- Agent Skills specification: canonical compatibility contract.
- Vercel Skills CLI: installation, updating, agent detection and skills.sh discovery.

### Reuse rules

- **original**: independently authored by the project.
- **synthesized**: original instructions developed from multiple cited references without copying prose.
- **adapted**: materially derived from permissively licensed sources; preserve author, license, notice, source path/commit and modification summary.
- **reference-only**: linked but not redistributed because licensing is unclear, restrictive, mixed or incompatible.
- Never assume rewriting removes attribution obligations.
- Copyrighted articles may be cited and operationalized in original language, but not copied.
- Paid sources, unclear-license sources and incompatible copyleft material remain reference-only unless separately approved.

## Replacement stack

### Superseded PR disposition

PRs #1–#5 were closed without merge after correcting product scope from DesignMD-dependent workflows to a standalone public design-skills library. Useful infrastructure was selectively reintroduced through the corrected stack. Historical branches and SHAs remain evidence and should not be deleted casually.

### Corrected five-PR sequence

#### 1. Product foundation and governance — PR #6

- Define standalone mission, audience, taxonomy, editorial standards and optional DesignMD boundary.
- Use MIT for newly authored repository content.
- Preserve per-skill upstream licenses/notices.
- Add quality, contribution, security, provenance and third-party notice policies.
- Prohibit shared keys, hidden paid dependencies, silent copying and unreviewed scripts/hooks.

#### 2. Generic registry, templates and generated catalog — PR #7

- Public categories may include foundation, craft, workflow, surface, system, integration and style as the collection grows.
- Registry/evidence should be able to represent identity, version, description, trigger/scope, category/tags, quality, ownership, entry path, related skills, compatible agents/evidence, optional integrations, provenance and verification recency as those fields become machine-enforced.
- No Free/Pro/Builder service enforcement in the public-skill schema.
- Optional integrations may describe DesignMD without requiring it.
- README catalog is generated from registry and CI fails on drift.
- Flat `skills/<skill-id>/` layout for broad installer compatibility.

#### 3. Six standalone foundation skills — PR #8

- `design-context`
- `visual-hierarchy`
- `typography`
- `layout-and-spacing`
- `color-and-contrast`
- `accessible-interface`

Each package contains an agent-facing `SKILL.md`, human-facing `DESIGN.md`, provenance, and positive/negative routing fixtures. Expected-output and preview material may be added where it materially improves understanding.

#### 4. Six standalone workflow skills — PR #9

- `interface-critique`
- `responsive-design`
- `interaction-and-motion`
- `forms-and-validation`
- `loading-empty-error-states`
- `design-system-audit`

Rules:

- no DesignMD dependency;
- preserve useful standalone guidance;
- optional DesignMD enhancements must never block the workflow;
- reserve landing pages, dashboards, onboarding, navigation, ecommerce, mobile and style packs until v1 quality is proven.

#### 5. Distribution, compatibility and growth system — PR #10

- Verify standard `npx skills add Above-the-Fold-Studio/designmd-skills` distribution.
- Support selective installation with `--skill <id>` and discovery with `--list`.
- Optimize public metadata for GitHub/skills.sh discovery without misleading compatibility claims.
- Add Claude-specific metadata only when it does not duplicate the canonical skill source.
- Maintain compatibility-evidence rules, contribution scorecards/rubrics, version policy and upstream-review cadence.
- Maintain contribution/request flows.
- Keep bootstrap skill payloads inert and reject unreviewed executable/binary/network-bearing content.
- Require clean independent review of the exact final PR SHA before merge.

## Display, access, monetization and growth

### GitHub and skills.sh v1

The public surface should communicate:

- standalone value proposition;
- category navigation;
- skill name/outcome/status/version;
- compatible-agent claims only when backed by evidence;
- license/provenance class;
- direct standard install commands;
- contribution/request actions;
- optional DesignMD explanation that does not interrupt installation.

Each `DESIGN.md` should evolve toward a useful GitHub-rendered detail page containing what the skill accomplishes, use/non-use boundaries, representative request/output, workflow summary, related skills, compatibility evidence, install path, source/attribution and optional DesignMD enhancement.

Standard installation:

```sh
npx skills add Above-the-Fold-Studio/designmd-skills
npx skills add Above-the-Fold-Studio/designmd-skills --skill interface-critique
npx skills add Above-the-Fold-Studio/designmd-skills --list
```

No custom CLI, hidden telemetry or DesignMD website deployment is required for v1.

### Free and paid boundary

All public skills, examples, registry metadata and installation paths remain free/open source.

DesignMD may monetize managed capabilities such as:

- hosted/private design-system retrieval;
- higher managed-service limits;
- premium implementation source/blocks;
- private organizational design systems;
- automated/live-URL certification;
- team governance/private skill packs;
- scaled browser/conformance automation.

A public skill must remain useful when every paid capability is absent.

### Growth flywheel

Useful free skill → GitHub/skills.sh discovery → successful installation → contributor improvement/recommendation → stronger catalog/examples → optional DesignMD adoption.

Growth mechanisms:

- request-a-skill and propose-a-skill issue templates;
- contributor credit;
- quality labels separate from ownership/provenance;
- automated metadata/provenance/security/overlap checks where practical;
- maintainer rubric for specificity, usefulness, safety, accessibility, overlap and maintainability;
- monthly compatibility review and quarterly license review once behavioral evidence exists;
- upstream tracking for materially adapted sources;
- curated releases rather than uncontrolled accumulation;
- no hidden skill telemetry.

## Tests and acceptance criteria

- [ ] Every skill can be discovered/installed from the standard repository layout.
- [x] Every current skill has positive and negative routing fixtures and passes static repository validation.
- [ ] Every skill has bounded behavioral evidence for its primary workflow without DesignMD before promotion beyond experimental.
- [x] Optional DesignMD functionality is not required by the current standalone skill contracts.
- [x] Repository validation rejects hidden credentials and bootstrap executable/binary payloads in skill packages.
- [x] Provenance records exist for the current 12 skills and registry/catalog drift is machine-checked.
- [x] Reference-only sources are not packaged as current skills.
- [x] Dangerous bootstrap symlink traversal and non-text skill payloads are rejected.
- [ ] Behavioral compatibility evidence is recorded before any `testedAgents` claim.
- [x] `experimental` requires static validation only.
- [ ] `curated` requires fixture coverage plus independently reviewed one-agent behavioral evidence.
- [ ] `official` requires independent review plus verified behavior in Codex and Claude Code.
- [ ] Final PRs receive exact-SHA review and merge only in dependency order after explicit owner approval.
- [x] DesignMD website/Vercel deployment remains out of this v1 stack.

## Assumptions and backlog boundary

- Keep the `designmd-skills` repository name for now; naming can change without changing architecture.
- Use this public repository rather than creating another repository.
- Original repository content uses MIT; adapted files retain upstream obligations.
- Initial collection is 12 high-quality standalone skills, not dozens of shallow entries.
- Style packs, surface-specific packs and framework integrations are backlog categories, not v1 core.
- Nothing merges to `main`, and no DesignMD/Vercel deployment occurs, without separate owner instruction.

### v2 candidate skills (owner priority, 2026-08-25)

Confirmed priority order for the next surface-specific pack, once v1's 12 skills
have real behavioral evidence (see acceptance criteria above), not before:

1. **App / dashboard / product UI** — definite next pack. This is the surface
   v1 explicitly reserved (see PR #9 rules above: "reserve landing pages,
   dashboards, onboarding, navigation, ecommerce, mobile and style packs until
   v1 quality is proven"). Candidate skill names, to be scoped properly at
   build time rather than treated as final:
   - `dashboard-density` (data-dense layout, table/card tradeoffs, information
     scent in packed UI)
   - `data-table-design` (sorting, filtering, pagination, bulk actions, empty
     states specific to tabular data)
   - `onboarding-and-activation` (progressive disclosure, first-run experience,
     activation moments, distinct from the general `loading-empty-error-states`
     workflow skill already in v1)
   - `navigation-and-ia-product` (product nav/IA as distinct from marketing nav,
     which `layout-and-spacing` and `visual-hierarchy` already cover for
     marketing surfaces)
   - `notifications-and-alerts` (toast/banner/inline hierarchy, urgency levels,
     dismissal patterns)
   - `settings-and-preferences` (form-heavy, low-frequency-use surfaces with
     their own density and grouping rules)
2. **Email and ads** — lower priority than the app/dashboard/product pack, not
   dropped, just sequenced after. Revisit once the product-UI pack has shipped
   and has its own behavioral evidence.

This list is a starting point for scoping, not a commitment to exact skill
boundaries or names. Follow the same PR #8/#9 shape (SKILL.md, DESIGN.md,
provenance.json, fixtures.json) and the same reuse-rules attribution
discipline as the current 12 skills when this pack is actually built.

## Change control

When implementation diverges from this plan, update this document in the same PR and explain why. Do not mark an acceptance item complete based on intention or installer support alone; use evidence appropriate to the claim.
