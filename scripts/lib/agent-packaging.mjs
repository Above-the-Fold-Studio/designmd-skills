import fs from "node:fs";
import path from "node:path";

import { validateRepository } from "./registry-validation.mjs";
import { collectRepositoryFiles } from "./repository-files.mjs";
import { validateJsonSchemas } from "./schema-validation.mjs";

export const AGENT_LAYOUTS = Object.freeze({
  "claude-code": path.join(".claude", "skills"),
  codex: path.join(".agents", "skills"),
});

function assertEmptyOrMissing(directory) {
  if (!fs.existsSync(directory)) return;
  const stat = fs.lstatSync(directory);
  if (stat.isSymbolicLink()) throw new Error(`Output directory must not be a symlink: ${directory}`);
  if (!stat.isDirectory()) throw new Error(`Output path must be a directory: ${directory}`);
  if (fs.readdirSync(directory).length > 0) {
    throw new Error(`Output directory must be empty: ${directory}`);
  }
}

function validateSource(root) {
  const errors = validateJsonSchemas(root);
  errors.push(...validateRepository(root));
  if (errors.length > 0) {
    throw new Error(`Repository validation failed:\n- ${errors.join("\n- ")}`);
  }
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function resolveThroughExistingAncestor(target) {
  const missingSegments = [];
  let ancestor = target;
  while (!fs.existsSync(ancestor)) {
    const parent = path.dirname(ancestor);
    if (parent === ancestor) break;
    missingSegments.unshift(path.basename(ancestor));
    ancestor = parent;
  }
  return path.join(fs.realpathSync.native(ancestor), ...missingSegments);
}

export function packageAgentSkills({ root, output, agent }) {
  const skillRoot = AGENT_LAYOUTS[agent];
  if (!skillRoot) {
    throw new Error(`Unsupported agent '${agent}'. Expected one of: ${Object.keys(AGENT_LAYOUTS).join(", ")}`);
  }

  const repositoryRoot = fs.realpathSync.native(path.resolve(root));
  const requestedOutput = path.resolve(output);
  assertEmptyOrMissing(requestedOutput);
  const outputRoot = resolveThroughExistingAncestor(requestedOutput);
  if (isInside(repositoryRoot, outputRoot)) {
    throw new Error("Output must be outside the source repository to prevent generated-file drift.");
  }

  validateSource(repositoryRoot);

  const registry = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "registry.json"), "utf8"));
  const authoredSkills = registry.skills.filter((skill) => skill.kind === "authored");
  const copied = [];

  for (const skill of authoredSkills) {
    const sourceDirectory = path.join(repositoryRoot, path.dirname(skill.entry));
    const { files, symlinks } = collectRepositoryFiles(sourceDirectory);
    if (symlinks.length > 0) {
      throw new Error(`Skill '${skill.id}' contains unsupported symlinks: ${symlinks.join(", ")}`);
    }

    for (const sourceFile of files.sort()) {
      const relative = path.relative(sourceDirectory, sourceFile);
      const destination = path.join(outputRoot, skillRoot, skill.id, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(sourceFile, destination, fs.constants.COPYFILE_EXCL);
      copied.push(path.relative(outputRoot, destination).replaceAll(path.sep, "/"));
    }
  }

  const manifest = {
    schemaVersion: 1,
    agent,
    source: "designmd-skills",
    skills: authoredSkills.map(({ id, version }) => ({ id, version })),
    files: copied.sort(),
  };
  fs.mkdirSync(outputRoot, { recursive: true });
  fs.writeFileSync(
    path.join(outputRoot, "designmd-skills-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    { flag: "wx" },
  );

  return manifest;
}
