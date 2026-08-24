import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { scanSkillContent } from "../scripts/lib/content-security.mjs";

async function fixture(files) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "design-skills-security-"));
  for (const [relative, content] of Object.entries(files)) {
    const target = path.join(root, relative);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }
  return root;
}

test("accepts ordinary bootstrap skill text", async (t) => {
  const root = await fixture({
    "skills/example/SKILL.md": "---\nname: example\ndescription: Safe example\n---\nUse a bearer token only after the user supplies one at runtime.",
    "skills/example/fixtures.json": "{\"positive\": []}",
    "skills/example/notes.txt": "github_pat_ is a token prefix, not a complete credential."
  });
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  assert.deepEqual(await scanSkillContent(root), []);
});

test("rejects executable and environment-shaped payloads", async (t) => {
  const root = await fixture({
    "skills/example/SKILL.md": "safe",
    "skills/example/payload.wasm": "not really wasm",
    "skills/example/.env.local": "SECRET=value"
  });
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const errors = await scanSkillContent(root);
  assert.equal(errors.length, 2);
  assert.ok(errors.every((error) => error.includes("only .md, .json, and .txt")));
});

test("rejects credential and private-key signatures", async (t) => {
  const root = await fixture({
    "skills/example/github.txt": "github_pat_1234567890abcdefghijABCDEFGHIJ",
    "skills/example/bearer.txt": "Authorization: Bearer abcdefghijklmnopqrstuvwxyz123456",
    "skills/example/dsa.txt": "-----BEGIN DSA PRIVATE KEY-----",
    "skills/example/pgp.txt": "-----BEGIN PGP PRIVATE KEY-----"
  });
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const errors = await scanSkillContent(root);
  assert.equal(errors.length, 4);
  assert.ok(errors.some((error) => error.includes("GitHub token")));
  assert.ok(errors.some((error) => error.includes("Bearer credential")));
  assert.equal(errors.filter((error) => error.includes("private key")).length, 2);
});

test("rejects unquoted credential assignments", async (t) => {
  const root = await fixture({
    "skills/example/SKILL.md": "api_key=abcdefghijklmnopqrstuvwxyz123456"
  });
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const errors = await scanSkillContent(root);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /unquoted token assignment/);
});

test("rejects symlinks below skills root", async (t) => {
  const root = await fixture({
    "outside.txt": "safe",
    "skills/example/SKILL.md": "safe"
  });
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const link = path.join(root, "skills", "example", "escape.txt");
  await fs.symlink(path.join(root, "outside.txt"), link);
  const errors = await scanSkillContent(root);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /symbolic links are not allowed/);
});

test("rejects a symlinked skills root", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "design-skills-security-root-"));
  const outside = await fs.mkdtemp(path.join(os.tmpdir(), "design-skills-security-outside-"));
  t.after(() => Promise.all([
    fs.rm(root, { recursive: true, force: true }),
    fs.rm(outside, { recursive: true, force: true })
  ]));
  await fs.mkdir(path.join(outside, "example"), { recursive: true });
  await fs.writeFile(path.join(outside, "example", "SKILL.md"), "safe");
  await fs.symlink(outside, path.join(root, "skills"), "dir");
  const errors = await scanSkillContent(root);
  assert.deepEqual(errors, ["skills: root symbolic link is not allowed"]);
});
