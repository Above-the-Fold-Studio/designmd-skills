---
name: example-skill
description: Complete one narrowly defined design task. Use for its positive trigger; not for the nearest competing workflow.
license: Apache-2.0
metadata:
  author: DesignMD
  version: 0.1.0
---

# Example skill

State the observable outcome first and name the requests that should route here.

## Inputs

List only inputs that materially change the result. Ask at most one question
when a missing answer would change the route or authorize a consequential act.

## Workflow

Give the smallest complete sequence and the decision criteria that change it.
Load focused references only when their condition applies.

## Service boundary

Identify optional DesignMD capabilities and their Free, Pro, or Builder tier.
Treat the server as the entitlement boundary. Never request, reveal, log, or
embed a shared credential.

## Stop and fallback

Define unavailable dependencies, safe fallbacks, and actions that require new
authorization. Do not claim success without the observable output.
