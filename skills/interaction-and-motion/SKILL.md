---
name: interaction-and-motion
description: Design purposeful interaction feedback and motion that clarify cause, state, continuity, and control.
---

# Interaction and Motion

Use interaction feedback and motion to explain what changed, preserve spatial
continuity, and make controls feel responsive. Apply this to transitions,
microinteractions, gestures, direct manipulation, and state feedback.

Do not animate merely to appear polished. Do not delay essential actions,
animate large regions without purpose, or make motion the only state signal.

## Workflow

1. Describe the trigger, user intent, state change, and information the response
   must communicate.
2. Choose the least motion that clarifies cause and effect. Immediate feedback
   often matters more than a transition.
3. Define origin, destination, property, duration, easing, interruption,
   reversal, repeat behavior, and final state. Prefer compositor-friendly
   properties when implementing.
4. Preserve input control. Handle rapid repeated actions, cancellation,
   navigation, async completion, and state changes during animation.
5. Pair motion with persistent visual and semantic state. Ensure focus and
   assistive-technology updates follow the actual interaction.
6. Respect reduced-motion preferences with a meaningful alternative, not simply
   a slower version. Avoid flashing and motion likely to cause vestibular harm.
7. Verify on constrained devices and with keyboard, touch, pointer, zoom, and
   reduced motion.

## Output

Return an interaction specification with trigger, states, feedback purpose,
timing rationale, interruption behavior, reduced-motion alternative, and test
conditions.
