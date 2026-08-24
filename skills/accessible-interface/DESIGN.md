# Accessible Interface

## Outcome

An interface that supports real tasks across keyboard, screen readers, zoom,
reduced motion, varied vision, and varied cognitive needs.

## Use it when

- Designing or reviewing an interactive component or workflow.
- Choosing between native controls and a custom interaction pattern.
- Adding validation, dynamic status, dialogs, menus, tabs, or data grids.
- Preparing a focused accessibility remediation plan.

## Design approach

Accessibility is behavior plus communication. A control can meet contrast
requirements and still be unusable because its name, focus order, error
recovery, or state announcement is wrong.

Use authoritative patterns as a starting point, then test them in the product
context. WAI-ARIA Authoring Practices describes expected semantics and keyboard
behavior; it does not prove that a particular implementation is usable.

## Example request

> Review this account-creation flow for keyboard, screen-reader, zoom, error
> recovery, and cognitive-access barriers. Separate inspected facts from tests
> we still need to run.

## Related skills

Color-and-contrast covers the color system in depth. Forms-and-validation and
interaction-and-motion apply these principles to narrower workflows.
