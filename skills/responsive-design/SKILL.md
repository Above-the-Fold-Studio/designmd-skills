---
name: responsive-design
description: Design and verify responsive interfaces that adapt content, interaction, and layout across constraints.
---

# Responsive Design

Design behavior across changing space, content, input, and user settings. Use
this when a surface must work beyond one screenshot or named device width.

Do not treat mobile as a shrunken desktop, hide essential capability without an
alternative, or add breakpoints only to repair arbitrary fixed dimensions.

## Workflow

1. Map the content priority, interaction sequence, and relationships that must
   survive at every size.
2. Inspect existing containers, tokens, breakpoints, source order, navigation,
   tables, media, and component boundaries.
3. Define fluid behavior first: wrapping, stacking, intrinsic sizing, readable
   measure, min/max constraints, and overflow strategy.
4. Add a breakpoint only where content or interaction becomes unusable. Record
   the pressure that justifies it.
5. Adapt interaction as well as geometry. Check pointer and keyboard input,
   hover-dependent behavior, touch targets, sticky regions, dialogs, and dense
   data.
6. Test between canonical widths and at extremes with zoom, large text, long
   labels, localization, missing data, reduced motion, and orientation change.
7. Preserve semantic, reading, and focus order when visual placement changes.

## Output

Return the invariant content priorities, responsive behavior by region,
content-driven breakpoint reasons, overflow and interaction rules, and the
tested constraint matrix.
