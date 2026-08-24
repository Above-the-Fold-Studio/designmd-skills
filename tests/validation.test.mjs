import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  parseFrontmatter,
  validateAgainstSchema,
  validateEntry,
} from "../scripts/lib/validation.mjs";

const valid = {
  id: "visual-hierarchy",
  title: "Visual Hierarchy",
  description: "Strengthen hierarchy so an interface communicates priority.",
  category: "foundation",
  status: "experimental",
  version: "0.1.0",
  path: "skills/visual-hierarchy",
  provenance: "synthesized",
  testedAgents: [],
};

test("accepts a valid portable registry entry", () => {
  assert.deepEqual(validateEntry(valid), []);
});
test("rejects unknown DesignMD-era tier fields and malformed paths", () => {
  const entry = {
    ...valid,
    path: "designmd/visual-hierarchy",
    tier: "pro",
  };
  const errors = validateEntry(entry).join("\n");
  assert.match(errors, /unknown field tier/);
  assert.match(errors, /path must equal skills/);
});

test("detects duplicate skill ids", () => {
  const seen = new Set([valid.id]);
  assert.match(validateEntry(valid, seen).join("\n"), /duplicate id/);
});

test("parses required Agent Skills frontmatter", () => {
  assert.deepEqual(
    parseFrontmatter("---\nname: visual-hierarchy\ndescription: A clear outcome.\n---\n"),
    { name: "visual-hierarchy", description: "A clear outcome." },
  );
});

test("returns null when frontmatter is absent", () => {
  assert.equal(parseFrontmatter("# Visual hierarchy"), null);
});

test("registry schema rejects unknown tier metadata", async () => {
  const schema = JSON.parse(
    await readFile(new URL("../schema/registry.schema.json", import.meta.url)),
  );
  const registry = { version: 1, skills: [{ ...valid, tier: "pro" }] };
  assert.match(validateAgainstSchema(schema, registry).join("\n"), /additional/);
});

test("provenance schema rejects missing notes and unknown fields", async () => {
  const schema = JSON.parse(
    await readFile(new URL("../schema/provenance.schema.json", import.meta.url)),
  );
  const provenance = {
    class: "original",
    license: "MIT",
    sources: [],
    serviceTier: "pro",
  };
  const errors = validateAgainstSchema(schema, provenance).join("\n");
  assert.match(errors, /required property 'notes'/);
  assert.match(errors, /additional properties/);
});
