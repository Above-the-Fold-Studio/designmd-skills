import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { validateJsonSchemas } from "../scripts/lib/schema-validation.mjs";

function validate(registry) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "designmd-contract-test-"));
  try {
    fs.mkdirSync(path.join(root, "schema"));
    for (const name of ["registry.schema.json", "provenance.schema.json"]) {
      fs.copyFileSync(path.join(process.cwd(), "schema", name), path.join(root, "schema", name));
    }
    fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(registry), "utf8");
    return validateJsonSchemas(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function plannedSkill(status = "experimental") {
  return {
    id: "example-skill",
    kind: "authored",
    version: "0.1.0",
    title: "Example skill",
    description: "A sufficiently specific example description.",
    category: "design-system",
    status,
    entry: "skills/example-skill/SKILL.md",
    triggers: ["apply the example system"],
    instructionAccess: "public",
    serviceCapabilities: [],
    agents: [
      { agent: "claude-code", status: "planned", verifiedVersion: null, verifiedCommit: null, evidence: null },
      { agent: "codex", status: "planned", verifiedVersion: null, verifiedCommit: null, evidence: null }
    ],
    provenance: "skills/example-skill/provenance.json",
    fixtures: {
      positive: ["tests/fixtures/example-skill/positive.json"],
      negative: ["tests/fixtures/example-skill/negative.json"]
    },
    dependencies: [],
    verifiedCommit: status === "stable" ? "a".repeat(40) : null,
    lastVerified: status === "stable" ? "2026-08-24" : null
  };
}

test("JSON Schema rejects stable status with planned agents", () => {
  const errors = validate({
    $schema: "./schema/registry.schema.json",
    schemaVersion: 1,
    skills: [plannedSkill("stable")],
    externalEntries: []
  });
  assert.ok(errors.some((error) => error.includes("must be equal to constant")));
});

test("JSON Schema rejects installable metadata for an unavailable external entry", () => {
  const errors = validate({
    $schema: "./schema/registry.schema.json",
    schemaVersion: 1,
    skills: [],
    externalEntries: [{
      id: "external-tool",
      kind: "curated-link",
      title: "External tool",
      description: "A sufficiently specific external-tool description.",
      source: { repository: "https://example.com/repository", commit: "a".repeat(40) },
      visibility: "public",
      availability: "unavailable",
      installable: true,
      publishedPackage: "external-tool",
      license: "Apache-2.0",
      evidence: null,
      lastVerified: "2026-08-24"
    }]
  });
  assert.ok(errors.some((error) => error.includes("must be equal to constant")));
});
