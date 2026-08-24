import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function formatErrors(label, errors = []) {
  return errors.map((error) => {
    const location = error.instancePath || "/";
    return `${label}${location}: ${error.message}`;
  });
}

export function validateJsonSchemas(root) {
  const registry = readJson(path.join(root, "registry.json"));
  const registrySchema = readJson(path.join(root, "schema", "registry.schema.json"));
  const provenanceSchema = readJson(path.join(root, "schema", "provenance.schema.json"));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);

  const validateRegistry = ajv.compile(registrySchema);
  const validateProvenance = ajv.compile(provenanceSchema);
  const errors = [];
  if (!validateRegistry(registry)) errors.push(...formatErrors("registry.json", validateRegistry.errors));

  for (const skill of registry.skills ?? []) {
    if (typeof skill.provenance !== "string") continue;
    const file = path.resolve(root, skill.provenance);
    if (!file.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(file)) continue;
    const provenance = readJson(file);
    if (!validateProvenance(provenance)) {
      errors.push(...formatErrors(skill.provenance, validateProvenance.errors));
    }
  }
  return errors;
}
