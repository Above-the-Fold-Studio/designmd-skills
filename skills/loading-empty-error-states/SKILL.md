---
name: loading-empty-error-states
description: Design useful loading, empty, error, and recovery states that keep users oriented and able to act.
---

# Loading, Empty, and Error States

Design the moments between ideal states. Use this for asynchronous loading,
first-use and no-result emptiness, partial data, offline behavior, failures,
retry, and recovery.

Do not use a spinner as a universal answer. Do not blame the user, promise a
retry that is unsafe, hide partial success, or discard work after failure.

## Workflow

1. Map the state model: initial, loading, refreshing, partial, empty-first-use,
   empty-filtered, success, stale, offline, permission-limited, error,
   recoverable, and terminal.
2. For each state, identify what the user knows, what the system is doing, what
   remains available, and the next safe action.
3. Preserve stable layout and existing content when possible. Use progress,
   skeletons, optimistic updates, or background refresh only when they match
   the operation and its certainty.
4. Distinguish empty causes. First use teaches value and a starting action; no
   results explains filters or scope; completed emptiness may celebrate.
5. Write errors that explain what happened in user terms, what was preserved,
   and how to recover. Expose diagnostic detail only where useful and safe.
6. Define retry idempotency, backoff, duplicate-action prevention, cancellation,
   timeout, offline, and partial-success behavior.
7. Verify announcements, focus, contrast, motion preference, slow connections,
   repeated failures, and return after interruption.

## Output

Return a state matrix with trigger, visible content, available actions, preserved
data, recovery behavior, accessibility communication, and test cases.
