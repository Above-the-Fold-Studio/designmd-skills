# Security policy

## Reporting a vulnerability

Use GitHub private vulnerability reporting. Do not open a public issue for a
suspected credential leak, malicious skill, unsafe script, supply-chain
compromise, or unpublished-source exposure.

If private reporting is unavailable, email
[hello@designmd.co](mailto:hello@designmd.co) with the repository name and a
minimal description. Do not include live credentials in the first message.

## Repository safety rules

Never commit API keys, bearer tokens, cookies, environment files,
credential-shaped examples, private user content, paid source material, or
scripts and network calls whose behavior is undisclosed.

A local-only skill should say so. A skill requiring a tool, network request, or
external mutation must disclose it and require authorization at execution time.
