# Loading, Empty, and Error States

## Outcome

States that keep users oriented, preserve their work, and offer safe next steps
when the ideal path is delayed, empty, partial, or broken.

## Use it when

- A feature relies on asynchronous data or long-running work.
- Empty screens use one generic message for different causes.
- Errors provide no recovery or cause duplicate submissions.
- Background refresh, offline, or partial success is ambiguous.

## Design approach

State design begins with system truth. A reassuring message is harmful if work
was not actually saved. Coordinate interface copy with retry, persistence,
idempotency, and cache behavior.

Keep useful content visible during refresh. Replace the whole surface only when
the previous state is no longer trustworthy.

## Example request

> Create the loading, first-use empty, filtered-empty, offline, partial-success,
> timeout, and retry states for this import workflow.

## Related skills

Forms-and-validation covers field-level recovery. Interaction-and-motion covers
transition feedback and interruption.
