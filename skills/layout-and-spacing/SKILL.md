---
name: layout-and-spacing
description: Create coherent interface layouts and spacing systems that preserve relationships across screen sizes.
---

# Layout and Spacing

Clarify relationships through containment, alignment, proportion, and space.
Use this for page structure, grids, component composition, density, or
inconsistent spacing across viewports.

Do not force every surface onto one grid. Do not use fixed coordinates for
content that must reflow, and do not add containers where spacing alone
communicates the relationship.

## Workflow

1. Map content relationships and interaction order before selecting columns or
   breakpoints.
2. Identify the true containing blocks, alignment anchors, repeated gaps, and
   regions that need independent scrolling or sticky behavior.
3. Reuse existing spacing and layout tokens where they express the intended
   relationships. Consolidate near-duplicates instead of adding arbitrary gaps.
4. Design from intrinsic content outward. Prefer fluid sizing, min/max
   constraints, wrapping, and layout primitives over viewport-specific patches.
5. Make spacing carry meaning: tighter within a group, larger between groups,
   consistent around equivalent components.
6. Test narrow and wide widths, zoom, long content, missing content, nested
   components, focus rings, touch targets, and dynamic state changes.
7. Check that source order remains logical and that visual rearrangement does
   not break reading or keyboard order.

## Output

Return the layout model, key alignment and spacing decisions, reusable tokens or
constraints, breakpoint reasons, and verified edge conditions.
