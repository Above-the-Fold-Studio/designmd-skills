import path from "node:path";
import process from "node:process";

import { packageAgentSkills } from "./lib/agent-packaging.mjs";

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] ?? null;
}

try {
  const agent = readOption("--agent");
  const output = readOption("--output");
  if (!agent || !output) {
    throw new Error("Usage: npm run package:skills -- --agent <claude-code|codex> --output <empty-directory>");
  }

  const manifest = packageAgentSkills({ root: process.cwd(), output: path.resolve(output), agent });
  console.log(`Packaged ${manifest.skills.length} DesignMD skills for ${agent}.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
