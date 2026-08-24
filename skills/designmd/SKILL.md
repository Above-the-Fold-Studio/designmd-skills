---
name: designmd
description: Route a concrete interface task to the smallest DesignMD workflow. Use for DesignMD skill selection; not as a substitute for the specialty workflow.
license: Apache-2.0
metadata:
  author: DesignMD
  version: 0.1.0
---

# Route a DesignMD task

Select the smallest workflow that can produce the requested result. Load one
specialty skill by default and no more than three unless the user names a
multi-stage workflow.

## Route

- Apply or migrate a real design system: `apply-design-system`.
- Review code against `DESIGN.md`, tokens, or components:
  `review-design-system-implementation`.
- Obtain real design tokens or context: `extract-design-context`.
- Grade conformance before merge: `certify-interface`.
- Deterministic anti-slop detection belongs to the separate `distinct` entry.
  Use it only when the registry says it is available; never invent an install
  command or copy its implementation.

Do not route Tailwind, shadcn, motion, or framework mechanics to a separate
skill unless a supported adapter exists. The selected specialty workflow owns
those details in the target repository's conventions.

## Decide

1. Read the user's requested outcome and the repository's current state.
2. If two routes remain materially different, ask one question that selects
   between them. Otherwise choose directly.
3. Load only the selected skill. Compose a second or third skill only when the
   output of one is an explicit input to the next.
4. Treat DesignMD MCP as optional until a selected workflow requires it. If it
   is unavailable, use supplied local evidence or state the missing capability.

## Boundaries

Public instructions do not grant Free, Pro, or Builder access; the called
service enforces the caller's entitlement. Do not request or reveal a shared
credential. Do not claim an agent, package, or external entry is installable
unless its registry status and evidence say so.

Return the selected route, the evidence that determined it, and the next
observable output. Do not reproduce every specialty workflow in the routing
response.
