import assert from "node:assert/strict";
import test from "node:test";
import { parseFrontmatter, validateEntry } from "../scripts/lib/validation.mjs";

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
test("rejects DesignMD-era tier fields and malformed paths by contract", () => {
  const entry = { ...valid, path: "designmd/visual-hierarchy" };
  assert.match(validateEntry(entry).join("\n"), /path must equal skills/);
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
