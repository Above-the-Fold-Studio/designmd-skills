import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));
const knownRoutes = new Set([
  ...registry.skills.map((skill) => skill.id),
  ...registry.externalEntries.map((entry) => entry.id)
]);

test("initial routing fixtures have explicit positive and negative outcomes", () => {
  const seenRequests = new Set();
  for (const skill of registry.skills) {
    for (const kind of ["positive", "negative"]) {
      for (const relative of skill.fixtures[kind]) {
        const fixture = JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
        assert.equal(fixture.skillId, skill.id, `${relative} skillId`);
        assert.equal(fixture.kind, kind, `${relative} kind`);
        assert.ok(Array.isArray(fixture.cases) && fixture.cases.length > 0, `${relative} cases`);
        for (const item of fixture.cases) {
          assert.equal(typeof item.request, "string", `${relative} request`);
          assert.ok(item.request.length >= 20, `${relative} request is discriminating`);
          assert.ok(!seenRequests.has(item.request), `${relative} request is unique`);
          seenRequests.add(item.request);
          assert.ok(knownRoutes.has(item.expectedRoute), `${relative} expectedRoute exists`);
          assert.equal(typeof item.reason, "string", `${relative} reason`);
          if (kind === "positive") assert.equal(item.expectedRoute, skill.id, `${relative} selects its skill`);
          else assert.notEqual(item.expectedRoute, skill.id, `${relative} rejects its skill`);
        }
      }
    }
  }
});

test("unavailable curated entries cannot be fixture outcomes", () => {
  const unavailable = new Set(
    registry.externalEntries
      .filter((entry) => entry.availability !== "verified")
      .map((entry) => entry.id)
  );
  for (const skill of registry.skills) {
    for (const relative of [...skill.fixtures.positive, ...skill.fixtures.negative]) {
      const fixture = JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
      for (const item of fixture.cases) {
        assert.ok(!unavailable.has(item.expectedRoute), `${relative} does not route to unavailable ${item.expectedRoute}`);
      }
    }
  }
});
