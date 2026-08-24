---
name: review-design-system-implementation
description: Review an interface against DESIGN.md, tokens, and component rules with file-specific evidence. Use for implementation audits; not to make edits or issue a conformance certificate.
license: Apache-2.0
metadata:
  author: DesignMD
  version: 0.1.0
---

# Review a design-system implementation

Identify concrete mismatches between the target design system and the built
interface. A review does not authorize edits.

## Inputs

Use the relevant `DESIGN.md` or verified DesignMD record, the code or diff in
scope, and the expected viewport and interaction states. If the target design
system is missing and choosing one would change the verdict, ask one question
or route to `extract-design-context`.

## Review

1. Establish precedence: product requirements, accessibility requirements,
   repository conventions, then design-system rules.
2. Trace semantic tokens through global styles, theme configuration, and the
   rendered components. Look for hard-coded bypasses and light/dark drift.
3. Inspect hierarchy, typography, spacing rhythm, radius, borders, shadows,
   imagery, and motion against explicit evidence—not personal taste.
4. Exercise responsive states, keyboard focus, loading, empty, error, hover,
   active, disabled, and reduced-motion behavior when they are in scope.
5. Separate defects from optional refinements. For each defect give location,
   violated rule, trigger, user consequence, and the test or evidence gap.
6. Report when source evidence is insufficient. Do not convert uncertainty
   into a passing result.

Use `certify-interface` when the user needs a formal DesignMD conformance grade.
Use the separate `distinct` product only when its registry entry is available
and deterministic anti-slop analysis is the actual request.

## Result

Lead with blocking findings ordered by impact, then non-blocking findings and
unsupported claims. Include file and line when source is available. If no
concrete defect remains, name exactly what was checked and what was not; do not
silently edit the reviewed branch.
