import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { AGENT_LAYOUTS, packageAgentSkills } from "../scripts/lib/agent-packaging.mjs";

const root = process.cwd();
const skillIds = [
  "apply-design-system",
  "certify-interface",
  "designmd",
  "extract-design-context",
  "review-design-system-implementation",
];

function withTemporaryDirectory(run) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "designmd-skills-package-"));
  try {
    return run(temporary);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

for (const [agent, skillRoot] of Object.entries(AGENT_LAYOUTS)) {
  test(`${agent} package uses its documented discovery layout`, () =>
    withTemporaryDirectory((temporary) => {
      const output = path.join(temporary, "package");
      const manifest = packageAgentSkills({ root, output, agent });

      assert.deepEqual(manifest.skills.map(({ id }) => id), skillIds);
      assert.equal(manifest.files.some((file) => file.includes("distinct")), false);
      for (const id of skillIds) {
        const packaged = path.join(output, skillRoot, id, "SKILL.md");
        const canonical = path.join(root, "skills", id, "SKILL.md");
        assert.equal(fs.readFileSync(packaged, "utf8"), fs.readFileSync(canonical, "utf8"));
      }
    }));
}

test("packaging refuses to write into the source repository", () => {
  assert.throws(
    () => packageAgentSkills({ root, output: path.join(root, "generated"), agent: "codex" }),
    /outside the source repository/,
  );
});

test("packaging refuses to overwrite a populated output directory", () =>
  withTemporaryDirectory((temporary) => {
    fs.writeFileSync(path.join(temporary, "keep.txt"), "keep\n");
    assert.throws(
      () => packageAgentSkills({ root, output: temporary, agent: "claude-code" }),
      /must be empty/,
    );
    assert.equal(fs.readFileSync(path.join(temporary, "keep.txt"), "utf8"), "keep\n");
  }));

test("packaging rejects a symlinked output directory", () =>
  withTemporaryDirectory((temporary) => {
    const target = path.join(temporary, "target");
    const link = path.join(temporary, "link");
    fs.mkdirSync(target);
    fs.symlinkSync(target, link, "junction");
    assert.throws(
      () => packageAgentSkills({ root, output: link, agent: "codex" }),
      /must not be a symlink/,
    );
  }));

test("packaging rejects unsupported agents before writing", () =>
  withTemporaryDirectory((temporary) => {
    assert.throws(
      () => packageAgentSkills({ root, output: path.join(temporary, "package"), agent: "other" }),
      /Unsupported agent/,
    );
  }));
