import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VERSION = /^\d+\.\d+\.\d+$/;
const CATEGORIES = new Set(["foundation", "workflow"]);
const STATUSES = new Set(["experimental", "curated", "official"]);
const PROVENANCE = new Set([
  "original",
  "synthesized",
  "adapted",
  "reference-only",
]);
const ENTRY_FIELDS = new Set([
  "id",
  "title",
  "description",
  "category",
  "status",
  "version",
  "path",
  "provenance",
  "testedAgents",
]);

export function validateAgainstSchema(schema, value) {
  const validate = new Ajv2020({ allErrors: true, strict: true }).compile(schema);
  if (validate(value)) return [];
  return validate.errors.map(
    (error) => `${error.instancePath || "/"} ${error.message}`,
  );
}

async function exists(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

export function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return null;
  const values = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return values;
}

export function validateEntry(entry, seen = new Set()) {
  const errors = [];
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    return ["registry entry must be an object"];
  }
  for (const field of Object.keys(entry)) {
    if (!ENTRY_FIELDS.has(field)) errors.push(`${entry.id}: unknown field ${field}`);
  }
  if (!ID.test(entry.id ?? "")) errors.push("id must be lowercase kebab-case");
  if (seen.has(entry.id)) errors.push(`duplicate id: ${entry.id}`);
  seen.add(entry.id);
  if (typeof entry.title !== "string" || entry.title.length < 3) {
    errors.push(`${entry.id}: title is too short`);
  }
  if (typeof entry.description !== "string" || entry.description.length < 20) {
    errors.push(`${entry.id}: description is too short`);
  }
  if (!CATEGORIES.has(entry.category)) {
    errors.push(`${entry.id}: invalid category`);
  }
  if (!STATUSES.has(entry.status)) errors.push(`${entry.id}: invalid status`);
  if (!VERSION.test(entry.version ?? "")) {
    errors.push(`${entry.id}: version must be semantic x.y.z`);
  }
  if (entry.path !== `skills/${entry.id}`) {
    errors.push(`${entry.id}: path must equal skills/${entry.id}`);
  }
  if (!PROVENANCE.has(entry.provenance)) {
    errors.push(`${entry.id}: invalid provenance class`);
  }
  if (!Array.isArray(entry.testedAgents)) {
    errors.push(`${entry.id}: testedAgents must be an array`);
  } else if (
    entry.testedAgents.some(
      (agent) => typeof agent !== "string" || agent.length === 0,
    )
  ) {
    errors.push(`${entry.id}: testedAgents values must be non-empty strings`);
  }
  return errors;
}

export async function validateRepository(root) {
  const errors = [];
  let registry;
  let registrySchema;
  let provenanceSchema;
  try {
    registry = JSON.parse(
      await readFile(path.join(root, "registry", "skills.json"), "utf8"),
    );
    registrySchema = JSON.parse(
      await readFile(path.join(root, "schema", "registry.schema.json"), "utf8"),
    );
    provenanceSchema = JSON.parse(
      await readFile(
        path.join(root, "schema", "provenance.schema.json"),
        "utf8",
      ),
    );
  } catch (error) {
    return [`registry or schema JSON is invalid: ${error.message}`];
  }

  errors.push(
    ...validateAgainstSchema(registrySchema, registry).map(
      (error) => `registry schema: ${error}`,
    ),
  );

  if (registry.version !== 1) errors.push("registry version must equal 1");
  if (!Array.isArray(registry.skills)) return [...errors, "skills must be an array"];

  const seen = new Set();
  for (const entry of registry.skills) {
    errors.push(...validateEntry(entry, seen));
    if (!entry?.id || !ID.test(entry.id)) continue;
    const skillRoot = path.join(root, "skills", entry.id);
    const required = ["SKILL.md", "DESIGN.md", "provenance.json", "fixtures.json"];
    for (const file of required) {
      if (!(await exists(path.join(skillRoot, file)))) {
        errors.push(`${entry.id}: missing ${file}`);
      }
    }
    if (!(await exists(path.join(skillRoot, "SKILL.md")))) continue;

    const skillText = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
    const frontmatter = parseFrontmatter(skillText);
    if (!frontmatter) {
      errors.push(`${entry.id}: SKILL.md lacks YAML frontmatter`);
    } else {
      if (frontmatter.name !== entry.id) {
        errors.push(`${entry.id}: frontmatter name does not match registry id`);
      }
      if (frontmatter.description !== entry.description) {
        errors.push(`${entry.id}: description differs from registry`);
      }
    }

    if (await exists(path.join(skillRoot, "provenance.json"))) {
      try {
        const provenance = JSON.parse(
          await readFile(path.join(skillRoot, "provenance.json"), "utf8"),
        );
        errors.push(
          ...validateAgainstSchema(provenanceSchema, provenance).map(
            (error) => `${entry.id}: provenance schema: ${error}`,
          ),
        );
        if (provenance.class !== entry.provenance) {
          errors.push(`${entry.id}: provenance class differs from registry`);
        }
        if (!PROVENANCE.has(provenance.class)) {
          errors.push(`${entry.id}: invalid provenance file class`);
        }
        if (!Array.isArray(provenance.sources)) {
          errors.push(`${entry.id}: provenance sources must be an array`);
        } else if (
          provenance.class !== "original" &&
          provenance.sources.length === 0
        ) {
          errors.push(`${entry.id}: non-original work must identify sources`);
        }
      } catch (error) {
        errors.push(`${entry.id}: invalid provenance JSON: ${error.message}`);
      }
    }

    if (await exists(path.join(skillRoot, "fixtures.json"))) {
      try {
        const fixtures = JSON.parse(
          await readFile(path.join(skillRoot, "fixtures.json"), "utf8"),
        );
        if (!Array.isArray(fixtures.positiveRouting) || fixtures.positiveRouting.length === 0) {
          errors.push(`${entry.id}: positiveRouting needs at least one fixture`);
        }
        if (!Array.isArray(fixtures.negativeRouting) || fixtures.negativeRouting.length === 0) {
          errors.push(`${entry.id}: negativeRouting needs at least one fixture`);
        }
      } catch (error) {
        errors.push(`${entry.id}: invalid fixtures JSON: ${error.message}`);
      }
    }
  }
  return errors;
}
