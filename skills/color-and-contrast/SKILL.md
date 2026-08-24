---
name: color-and-contrast
description: Build purposeful interface color roles with legible contrast, clear states, and restrained emphasis.
---

# Color and Contrast

Use color as a system of roles rather than a collection of attractive values.
Apply this when defining tokens, correcting contrast, separating interaction
states, or reducing noisy and inconsistent emphasis.

Do not communicate meaning with color alone. Do not claim accessibility from a
palette screenshot; evaluate the actual foreground, background, size, weight,
state, and adjacent colors.

## Workflow

1. Inventory semantic roles: canvas, surface, text levels, border, action,
   focus, selection, success, warning, error, data series, and disabled states.
2. Trace each role to its real usage. Separate brand color from interactive
   color when one value cannot safely serve both.
3. Establish neutral structure first, then reserve chroma for meaning and
   priority. Remove decorative competition before adding saturation.
4. Measure text and essential graphical-object contrast against their actual
   backgrounds. Include hover, active, focus, selected, disabled, and forced
   color or high-contrast behavior where applicable.
5. Pair status color with text, iconography, shape, or placement. Ensure links
   and controls remain identifiable without hue perception.
6. Test light and dark themes independently; do not mechanically invert values.
   Check transparency over every supported surface.
7. Express stable roles as semantic tokens and document intentional exceptions.

## Output

Return the semantic role map, contrast or state failures, recommended token and
usage changes, non-color cues, and the combinations actually verified.
