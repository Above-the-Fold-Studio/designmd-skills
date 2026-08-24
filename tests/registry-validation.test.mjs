import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { validateRepository } from "../scripts/lib/registry-validation.mjs";

function write(root, relative, content) {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

function withRepository(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "designmd-skills-test-"));
  try {
    run(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function validSkill() {
  return {
    id: "example-skill",
    kind: "authored",
    version: "0.1.0",
    title: "Example skill",
    description: "A sufficiently specific example description.",
    category: "design-system",
    status: "experimental",
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
    verifiedCommit: null,
    lastVerified: null
  };
}

function writeValidSkill(root, skill = validSkill()) {
  write(root, skill.entry, `---\nname: ${skill.id}\ndescription: A sufficiently specific example description.\nlicense: Apache-2.0\nmetadata:\n  author: DesignMD\n  version: ${skill.version}\n---\n\n# Example\n`);
  write(root, skill.provenance, JSON.stringify({
    $schema: "../../schema/provenance.schema.json",
    skillId: skill.id,
    ownershipClass: "designmd-authored",
    authors: [{ name: "DesignMD" }],
    license: "Apache-2.0",
    upstreamSources: [],
    adaptations: [],
    excludedAssets: [],
    notices: [],
    verifiedDate: "2026-08-24"
  }));
  write(root, skill.fixtures.positive[0], "{}\n");
  write(root, skill.fixtures.negative[0], "{}\n");
  return skill;
}

function writeRegistry(root, skills = [], externalEntries = []) {
  write(root, "registry.json", JSON.stringify({
    $schema: "./schema/registry.schema.json",
    schemaVersion: 1,
    skills,
    externalEntries
  }));
}

test("accepts a complete planned skill", () => {
  withRepository((root) => {
    const skill = writeValidSkill(root);
    writeRegistry(root, [skill]);
    assert.deepEqual(validateRepository(root), []);
  });
});

test("rejects an orphan SKILL.md", () => {
  withRepository((root) => {
    writeRegistry(root);
    write(root, "skills/orphan/SKILL.md", "# Orphan\n");
    assert.ok(validateRepository(root).some((error) => error.includes("Orphan skill entrypoint")));
  });
});

test("rejects unsubstantiated tested-agent status", () => {
  withRepository((root) => {
    const skill = writeValidSkill(root);
    skill.agents[0].status = "tested";
    writeRegistry(root, [skill]);
    const errors = validateRepository(root);
    assert.ok(errors.some((error) => error.includes("tested agent version")));
    assert.ok(errors.some((error) => error.includes("tested agent commit")));
    assert.ok(errors.some((error) => error.includes("tested agent evidence")));
  });
});

test("rejects an installable private curated entry", () => {
  withRepository((root) => {
    writeRegistry(root, [], [{
      id: "distinct",
      kind: "curated-link",
      title: "Distinct",
      description: "A separate deterministic design-quality product.",
      source: {
        repository: "https://github.com/Above-the-Fold-Studio/distinct",
        commit: "7138fae225bedada27808522dff6ab6a00f0036f"
      },
      visibility: "private",
      availability: "unavailable",
      installable: true,
      publishedPackage: null,
      license: "Apache-2.0",
      lastVerified: "2026-08-24"
    }]);
    assert.ok(validateRepository(root).some((error) => error.includes("cannot be installable")));
  });
});
