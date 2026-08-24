import assert from "node:assert/strict";
import test from "node:test";
import { validateRepository } from "../scripts/lib/validation.mjs";

test("the repository satisfies its canonical contracts", async () => {
  assert.deepEqual(await validateRepository(process.cwd()), []);
});
