# Design Skills

Open, portable Agent Skills for making better digital products.

This is a standalone design-practice library. Every skill must be useful in a
compatible coding agent without a DesignMD account, key, MCP server, private
catalog, or hosted service. Optional DesignMD integrations never define a
skill's core value.

## Planned first release

- **Foundations:** design context, visual hierarchy, typography, layout and
  spacing, color and contrast, and accessible interfaces.
- **Workflows:** interface critique, responsive design, interaction and motion,
  forms and validation, loading/empty/error states, and design-system audits.

The library starts small by design. A useful, tested skill is more valuable than
a large prompt directory.

The canonical implementation and acceptance roadmap is [docs/PLAN.md](docs/PLAN.md). Update that document when scope or release criteria change rather than creating an undocumented parallel plan.

## Access and licensing

All public skills are free to read, install, adapt, and contribute to under the
license declared for their files. Original work uses the MIT License. Adapted
work retains its upstream license, copyright, notices, and change record.

Paid DesignMD products are separate managed capabilities, not gates around
basic design knowledge.

## Status

No skill is released merely because its directory exists. Metadata, validation,
behavior evidence, provenance, and release status must agree.

See [Product principles](docs/PRODUCT.md), [Quality policy](QUALITY.md), and
[Contributing](CONTRIBUTING.md).

## Install and contribute

The repository uses the existing open Agent Skills ecosystem rather than a
custom installer. Inspect the catalog with:

```sh
npx skills add Above-the-Fold-Studio/designmd-skills --list
```

Then install only the skill or skills you want. See [Installation](docs/INSTALL.md)
for examples and [Compatibility](docs/COMPATIBILITY.md) for the difference
between installer support and tested agent behavior.

New skills should start from a concrete design problem and preserve a narrow,
portable scope. See [Growth and contribution loop](docs/GROWTH.md). Use the lightweight skill-request issue form when you have a repeated problem to solve, or the skill-proposal form when you are ready to define a new workflow in detail.

Bootstrap skill packages are restricted to inert `.md`, `.json`, and `.txt`
content. Repository checks reject symlink traversal, executable/binary payloads,
and known credential/private-key signatures inside `skills/`.

See [Versioning](VERSIONS.md) for per-skill and compatibility evidence rules.

## Catalog

<!-- BEGIN GENERATED CATALOG -->
### Foundations

| Skill | Outcome | Status | Version |
| --- | --- | --- | --- |
| [Accessible Interface](skills/accessible-interface/DESIGN.md) | Design and review inclusive interfaces for keyboard, screen-reader, cognitive, and visual access. | experimental | 0.1.0 |
| [Color and Contrast](skills/color-and-contrast/DESIGN.md) | Build purposeful interface color roles with legible contrast, clear states, and restrained emphasis. | experimental | 0.1.0 |
| [Design Context](skills/design-context/DESIGN.md) | Capture the product, users, constraints, and design direction before making interface decisions. | experimental | 0.1.0 |
| [Layout and Spacing](skills/layout-and-spacing/DESIGN.md) | Create coherent interface layouts and spacing systems that preserve relationships across screen sizes. | experimental | 0.1.0 |
| [Typography](skills/typography/DESIGN.md) | Choose and tune interface typography for readable hierarchy, rhythm, density, and resilient content. | experimental | 0.1.0 |
| [Visual Hierarchy](skills/visual-hierarchy/DESIGN.md) | Strengthen interface hierarchy so attention, reading order, and primary actions are immediately clear. | experimental | 0.1.0 |

### Workflows

| Skill | Outcome | Status | Version |
| --- | --- | --- | --- |
| [Design System Audit](skills/design-system-audit/DESIGN.md) | Audit a design system for token, component, accessibility, documentation, and adoption inconsistencies. | experimental | 0.1.0 |
| [Forms and Validation](skills/forms-and-validation/DESIGN.md) | Design and review forms that reduce effort, prevent errors, explain recovery, and preserve user input. | experimental | 0.1.0 |
| [Interaction and Motion](skills/interaction-and-motion/DESIGN.md) | Design purposeful interaction feedback and motion that clarify cause, state, continuity, and control. | experimental | 0.1.0 |
| [Interface Critique](skills/interface-critique/DESIGN.md) | Critique an existing interface against user goals and return prioritized, evidence-based improvements. | experimental | 0.1.0 |
| [Loading, Empty, and Error States](skills/loading-empty-error-states/DESIGN.md) | Design useful loading, empty, error, and recovery states that keep users oriented and able to act. | experimental | 0.1.0 |
| [Responsive Design](skills/responsive-design/DESIGN.md) | Design and verify responsive interfaces that adapt content, interaction, and layout across constraints. | experimental | 0.1.0 |
<!-- END GENERATED CATALOG -->
