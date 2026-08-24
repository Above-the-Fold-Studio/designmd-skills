# Skill template

Copy both template files into `skills/<skill-id>/`, rename them to `SKILL.md`
and `provenance.json`, and replace every `example-skill` field before adding the
registry record. The example is intentionally not registered or installable.

Keep the entrypoint compact. Put conditional detail in `references/` only when
a real workflow needs it, and add deterministic scripts only for repeated
mechanics that can be tested.
