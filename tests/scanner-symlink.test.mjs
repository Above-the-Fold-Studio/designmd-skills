import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repositoryRoot = process.cwd();

test("both repository scanners reject an arbitrary outside symlink", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "designmd-scanner-test-"));
  const outside = `${root}-outside`;
  try {
    fs.mkdirSync(path.join(root, "skills", "example"), { recursive: true });
    fs.mkdirSync(outside);
    fs.writeFileSync(path.join(outside, "private.md"), "external content\n", "utf8");
    fs.symlinkSync(outside, path.join(root, "skills", "example", "references"), process.platform === "win32" ? "junction" : "dir");

    for (const script of ["scripts/check-links.mjs", "scripts/scan-secrets.mjs"]) {
      const result = spawnSync(process.execPath, [path.join(repositoryRoot, script)], {
        cwd: root,
        encoding: "utf8"
      });
      assert.equal(result.status, 1, `${script} rejects the symlink`);
      assert.match(`${result.stdout}${result.stderr}`, /symlink/i, `${script} identifies the cause`);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(outside, { recursive: true, force: true });
  }
});
