# Security policy

## Supported content

Security fixes apply to the current default branch and the latest published
registry release. No public registry release exists during the bootstrap phase.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a
public issue for a suspected credential leak, authentication bypass,
entitlement bypass, supply-chain compromise, or unpublished-source exposure.

If private vulnerability reporting is unavailable, email
[hello@designmd.co](mailto:hello@designmd.co) with the repository name and a
minimal description. Do not include live credentials in the first message.

## Credential rules

Never commit or attach:

- DesignMD MCP keys or bearer tokens;
- Vercel, GitHub, analytics, or package-registry credentials;
- authorization headers, cookies, or environment files;
- proprietary prompt bodies or Builder source;
- paid or redistribution-restricted third-party assets.

Use clearly fake values in fixtures. A credential-looking value blocks a release
until it is proven synthetic or removed and rotated.

## Disclosure

Please allow reasonable time for investigation and remediation before public
disclosure. DesignMD will acknowledge a valid report, coordinate scope and
timing, and credit reporters who request attribution when legally and
operationally possible.
