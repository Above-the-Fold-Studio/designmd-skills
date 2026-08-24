---
name: extract-design-context
description: Obtain traceable design tokens and context from local evidence, the DesignMD catalog, or an authorized URL flow. Use before implementation when real design context is missing; not for speculative style generation.
license: Apache-2.0
metadata:
  author: DesignMD
  version: 0.1.0
---

# Extract usable design context

Produce a traceable `DESIGN.md`-style source that another workflow can apply
without guessing where its tokens came from.

## Choose the source

1. Prefer an existing repository-owned `DESIGN.md` when it is current and the
   user intends to preserve it.
2. For a known DesignMD catalog brand, use `search_designs` to resolve the slug
   and then `get_design` or `get_full_system` through an already configured MCP
   connection.
3. For a live URL the user is authorized to inspect, use the hosted Generate
   flow at `https://designmd.co/generate?source=url`. Free output contains
   measured token context; eligible paid callers may receive generated prose.
4. For a new product with no source interface, do not call that extraction.
   Ask for product constraints or route to the separate generation workflow.

DesignMD MCP does not currently expose a general live-URL extraction tool. Do
not invent one, crawl a private page without authorization, or describe a URL
submission as completed until the hosted result exists.

## Normalize

Record source URL or catalog slug, retrieval date, colors with roles, type
scale, spacing, radius, borders, shadows, motion, component/state guidance, and
known gaps. Distinguish measured values from generated interpretation. Preserve
the target project's existing document unless overwriting it was authorized.

## Failure and fallback

If MCP, the hosted extractor, or the source page is unavailable, retain any
verified local evidence and state what remains unknown. Do not fabricate tokens
or borrow a neighboring brand as a silent fallback. Never include credentials,
authorization headers, private markup, or restricted assets in the output.

## Result

Return the saved or proposed context path, provenance, measured-versus-inferred
boundary, and gaps that the applying agent must not treat as facts.
