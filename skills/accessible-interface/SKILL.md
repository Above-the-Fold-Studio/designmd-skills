---
name: accessible-interface
description: Design and review inclusive interfaces for keyboard, screen-reader, cognitive, and visual access.
---

# Accessible Interface

Make an interface perceivable, operable, understandable, and robust for people
using different inputs, outputs, zoom levels, and cognitive strategies. Use
this throughout design and implementation, not only as a final checklist.

Do not claim full accessibility from static inspection or automated tooling.
Do not replace native semantics with custom ARIA when a native element meets
the need.

## Workflow

1. Identify the user task, interaction pattern, content structure, and states.
   Start with semantic HTML and established platform behavior.
2. Check keyboard reachability, logical order, visible focus, focus movement,
   escape behavior, and prevention of keyboard traps.
3. Check names, roles, values, relationships, headings, landmarks, live
   updates, error association, and status communication for assistive
   technologies.
4. Check text and graphical contrast, zoom and reflow, touch targets, motion
   alternatives, reduced-motion behavior, and color independence.
5. Reduce cognitive load with predictable placement, plain labels, visible
   instructions, recoverable actions, and preserved user input.
6. Test empty, loading, error, disabled, selected, expanded, and completed
   states. Include long content and localization.
7. Use automated checks to find classes of defects, then perform keyboard and
   relevant assistive-technology checks. State what was not tested.
8. Prioritize blockers to task completion, then serious confusion or loss,
   then efficiency and polish.

## Output

Return findings by user impact, affected users and task, evidence, concrete
remediation, verification method, and explicit test limitations.
