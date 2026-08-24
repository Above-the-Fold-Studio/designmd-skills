---
name: apply-design-system
description: Plan and implement an interface from DESIGN.md and verified DesignMD context. Use to apply or migrate a real design system; not for review-only requests.
license: Apache-2.0
metadata:
  author: DesignMD
  version: 0.1.0
---

# Apply a real design system

Produce a bounded implementation that traces visible decisions to the target
design system instead of imitating a screenshot or inventing generic tokens.

## Inputs

Use the target repository, requested surface, existing `DESIGN.md` or DesignMD
catalog slug, and the user's authorization for file changes. Ask one question
only when the target system or implementation scope is genuinely ambiguous.

## Workflow

1. Inspect the target repository's framework, tokens, reusable components,
   accessibility conventions, and current uncommitted work.
2. Prefer a repository-owned `DESIGN.md`. If the user names a catalog design
   and DesignMD MCP is available, use `get_full_system` when motion matters or
   `get_design` otherwise. Do not substitute a similar brand silently.
3. Translate source tokens into the project's semantic layer. Optional MCP
   helpers such as `generate_css_variables`, `generate_tailwind_config`, and
   `generate_shadcn_theme` are drafts; reconcile them with `DESIGN.md` and the
   existing architecture before editing.
4. Plan the smallest coherent surface. Reuse project components and change
   shared primitives only when their downstream impact is understood.
5. Implement within the user's authorization. Preserve content hierarchy,
   interaction states, responsive behavior, reduced motion, focus treatment,
   and contrast—not merely color values.
6. Run the repository's relevant checks and inspect the final diff for token
   drift, hard-coded exceptions, regressions, and unrelated changes.

## Service and source boundaries

If an optional MCP call is unavailable or denied, continue only with verified
local context and identify the missing evidence. A Pro or Builder response may
be used only when the server grants it. Never copy prompt-pack payloads,
Builder source, a shared key, or restricted third-party assets into the result.
Treat block installation as a separate authorized source change.

## Result

Return the implemented scope, source design context, important token/component
mappings, verification run, and unresolved mismatches. If edits were not
authorized, return a file-specific implementation plan instead of changing
files.
