# Color and Contrast

## Outcome

A restrained color system that communicates interaction and status while
remaining legible in real interface states.

## Use it when

- The product has many near-duplicate grays or accent colors.
- Text or icons disappear on tinted and translucent surfaces.
- Success, warning, and error states depend only on hue.
- A brand color is being forced into every control role.

## Design approach

Name tokens for purpose, not appearance. A token such as action-primary can
change across themes while preserving meaning; blue-600 cannot explain why it
exists.

Contrast is contextual. Test rendered combinations and required states rather
than treating a color value as inherently accessible. Disabled content still
needs to be understandable, even where a standard exempts it from a particular
contrast threshold.

## Example request

> Consolidate these color tokens into semantic roles and show which text,
> focus, and status combinations fail in light and dark themes.

## Related skills

Visual-hierarchy governs emphasis. Accessible-interface covers the broader
interaction and assistive-technology experience.
