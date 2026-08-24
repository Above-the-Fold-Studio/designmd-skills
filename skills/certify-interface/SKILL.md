---
name: certify-interface
description: Run DesignMD conformance grading against a named target and candidate, then turn the evidence into bounded remediation. Use for a pre-merge grade; not for generic critique or accessibility certification.
license: Apache-2.0
metadata:
  author: DesignMD
  version: 0.1.0
---

# Certify interface conformance

Produce a reproducible DesignMD grade for one target/candidate pair and preserve
the limits of what that grade proves.

## Inputs

Identify the target as a DesignMD catalog slug or authorized live URL. Identify
the candidate as pasted HTML/CSS or an authorized deployed URL. Ask one question
when either side is missing; never guess the target brand.

## Workflow

1. Run the repository's own tests first when the user is preparing to merge.
   Certification does not replace functional, accessibility, or security tests.
2. Through an already configured DesignMD MCP connection, call
   `certify_conformance` with exactly one target source and one supported
   candidate source.
3. Prefer `target_slug` plus `candidate_html` when appropriate; that path is
   offline and available to eligible free callers. Live `target_url` or
   `candidate_url` grading consumes hosted extraction and is server-gated to a
   paid plan.
4. Do not send proprietary HTML or private URLs without the user's authority.
   Screenshot grading through `candidate_image_url` is not currently available.
5. Preserve the returned total and dimension evidence. Convert remediation
   into file-specific work only when source and edit authorization are present.
6. Rerun after changes and compare like-for-like inputs. Do not compare a pasted
   candidate in one run with a live candidate in another without labeling it.

## Failure and boundary

If the service denies a paid mode, offer the supported slug-plus-HTML path when
it satisfies the user's goal; do not simulate entitlement. If the service is
unavailable, report no certificate. A DesignMD grade covers the reported visual
dimensions and does not certify originality, accessibility, behavior, legal
compliance, or production health. Deterministic anti-slop checks remain in the
separate `distinct` product.

## Result

Return the exact target and candidate modes, grade, per-dimension findings,
highest-value remediations, test context, and any evidence the certificate did
not cover.
