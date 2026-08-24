# Layout and Spacing

## Outcome

Layouts that express content relationships clearly and adapt without piles of
one-off overrides.

## Use it when

- Equivalent components use inconsistent padding or gaps.
- A page works at one screenshot width but breaks between breakpoints.
- Extra cards and borders are being used to organize everything.
- Source order, visual order, and focus order have drifted apart.

## Design approach

Choose layout primitives from the relationship: stack for sequence, cluster for
wrapping peers, grid for two-dimensional alignment, and constrained measure for
reading. Breakpoints should respond to content pressure, not device labels.

A spacing scale is useful only when its steps communicate recurring
relationships. Optical adjustments can be valid, but document why they differ
from the token rather than creating invisible inconsistency.

## Example request

> Replace the one-off margins in this settings page with a coherent responsive
> layout and explain the grouping.

## Related skills

Visual-hierarchy establishes priority, typography affects intrinsic size, and
responsive-design handles broader cross-viewport behavior.
