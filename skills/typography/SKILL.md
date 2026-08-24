---
name: typography
description: Choose and tune interface typography for readable hierarchy, rhythm, density, and resilient content.
---

# Typography

Use type to make interface content readable, scannable, and structurally clear.
Apply this when choosing a type system or correcting weak scale, line length,
density, rhythm, or text behavior.

Do not choose fonts from mood alone. Do not shrink essential text to make a
layout fit, and do not use type styling that obscures semantic structure.

## Workflow

1. Inventory the real text roles: display, page title, section heading, body,
   label, control, metadata, code, numeric data, and status.
2. Inspect the available fonts, weights, scripts, loading constraints, and
   existing tokens before proposing additions.
3. Build the smallest scale that creates clear distinctions. Tune size, weight,
   line height, letter spacing, case, and color as a system.
4. Set line length and paragraph spacing for sustained reading. Keep controls
   and dense data legible without letting utility text dominate.
5. Test real extremes: long labels, short headings, large numbers, translated
   strings, validation messages, zoom, narrow screens, and fallback fonts.
6. Preserve semantics and selection. Avoid text embedded in images, excessive
   all-caps, unjustified truncation, and low-contrast secondary text.
7. Express repeatable decisions as named tokens or styles instead of isolated
   values.

## Output

Return the text-role map, recommended type decisions, token changes when
applicable, content risks, and the examples or viewport conditions verified.
