---
name: design-system-audit
description: Audit a design system for token, component, accessibility, documentation, and adoption inconsistencies.
---

# Design System Audit

Evaluate whether a design system is coherent, usable, accessible, and adopted
in product code. Use this for a bounded audit of tokens, components, patterns,
documentation, governance, and real consumption.

Do not infer adoption from a component directory or documentation site. Do not
rewrite the system during diagnosis, and do not treat every product exception
as a defect.

## Workflow

1. Define the audited surfaces, versions, repositories, consumers, and evidence
   limits.
2. Inventory foundations, semantic tokens, components, variants, states,
   patterns, documentation, release process, and ownership.
3. Trace representative product usages. Compare documented APIs and design
   guidance with shipped code, visual outcomes, and accessibility behavior.
4. Find duplication, orphaned tokens, ambiguous naming, variant explosion,
   missing states, composition gaps, inaccessible defaults, and undocumented
   escape hatches.
5. Separate system defects, adoption defects, migration debt, and justified
   product exceptions.
6. Measure blast radius and migration risk. Prioritize foundations and defaults
   that affect many consumers before isolated cosmetic differences.
7. Recommend keep, clarify, consolidate, deprecate, migrate, test, or research.
   Define evidence and ownership for each next step.

## Output

Return scope and limitations, system health by layer, concrete findings with
consumer evidence, risk and reach, a sequenced remediation plan, and metrics or
tests that show improvement.
