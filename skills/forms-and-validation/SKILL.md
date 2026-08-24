---
name: forms-and-validation
description: Design and review forms that reduce effort, prevent errors, explain recovery, and preserve user input.
---

# Forms and Validation

Design forms around the user's task, information, and recovery needs. Use this
for field structure, labels, help, validation, multi-step flows, submission,
and sensitive or high-consequence input.

Do not use placeholders as labels, erase input after failure, validate before
the user can reasonably respond, or hide why information is requested.

## Workflow

1. Confirm the outcome, required data, source of that data, consequence of
   errors, and whether the form should exist at all.
2. Remove unnecessary fields. Group remaining inputs by user meaning and order
   them according to the task, not the data model.
3. Use persistent labels, appropriate native controls, input types,
   autocomplete, sensible defaults, and optional/required language.
4. Put instructions before they are needed. Explain format or constraints in
   plain language and keep help associated with the field.
5. Prevent errors where possible. Validate at a useful time, preserve entered
   data, identify every problem, move or announce focus deliberately, and give
   a specific recovery action.
6. Design submitting, success, duplicate submission, network failure, timeout,
   and resume behavior. Confirm destructive or high-consequence actions.
7. Test keyboard and assistive technology, zoom, long labels, localization,
   autofill, password managers, copy/paste, and realistic invalid data.

## Output

Return the form structure, field and validation decisions, error and recovery
copy, state behavior, access considerations, and the scenarios verified.
