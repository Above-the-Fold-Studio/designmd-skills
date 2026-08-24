import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { validateJsonSchemas } from "../scripts/lib/schema-validation.mjs";

function withSchemaRepository(registry, run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "designmd-schema-test-"));
  try {
    fs.mkdirSync(path.join(root, "schema"));
    for (const name of ["registry.schema.json", "provenance.schema.json"]) {
      fs.copyFileSync(path.join(process.cwd(), "schema", name), path.join(root, "schema", name));
    }
    fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(registry), "utf8");
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("the checked-in schemas compile and accept the empty bootstrap registry", () => {
  withSchemaRepository(
    { $schema: "./schema/registry.schema.json", schemaVersion: 1, skills: [], externalEntries: [] },
    (root) => assert.deepEqual(validateJsonSchemas(root), []),
  );
});

test("schema validation rejects a changed contract version", () => {
  withSchemaRepository(
    { $schema: "./schema/registry.schema.json", schemaVersion: 2, skills: [], externalEntries: [] },
    (root) => assert.ok(validateJsonSchemas(root).some((error) => error.includes("schemaVersion"))),
  );
});
