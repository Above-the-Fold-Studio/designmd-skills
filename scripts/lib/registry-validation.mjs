import fs from "node:fs";
import path from "node:path";

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;
const SHA = /^[0-9a-f]{40}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const AGENTS = new Set(["claude-code", "codex"]);
const AGENT_STATES = new Set(["planned", "experimental", "tested", "unsupported"]);
const OWNERSHIP = new Set([
  "designmd-authored",
  "adapted-with-attribution",
  "license-review-required",
  "redistribution-prohibited",
]);
const RELEASE_ELIGIBLE = new Set(["designmd-authored", "adapted-with-attribution"]);
const TIERS = new Set(["none", "free", "pro", "builder", "caller-based"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readJson(file, errors, label) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${label}: ${error.message}`);
    return null;
  }
}

function requireString(value, label, errors, pattern) {
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${label} must be a non-empty string`);
  } else if (pattern && !pattern.test(value)) {
    errors.push(`${label} has an invalid format`);
  }
}

function resolveInside(root, relative, label, errors) {
  if (typeof relative !== "string" || path.isAbsolute(relative)) {
    errors.push(`${label} must be a repository-relative path`);
    return null;
  }
  const resolved = path.resolve(root, relative);
  const prefix = `${path.resolve(root)}${path.sep}`;
  if (!resolved.startsWith(prefix)) {
    errors.push(`${label} escapes the repository root`);
    return null;
  }
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    errors.push(`${label} does not exist: ${relative}`);
    return null;
  }
  const rootReal = fs.realpathSync.native(path.resolve(root));
  const targetReal = fs.realpathSync.native(resolved);
  const realPrefix = `${rootReal}${path.sep}`;
  if (!targetReal.startsWith(realPrefix) || path.relative(resolved, targetReal) !== "") {
    errors.push(`${label} must not traverse or resolve through a symlink`);
    return null;
  }
  return resolved;
}

function parseFrontmatter(file, errors, label) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    errors.push(`${label} must start with YAML frontmatter`);
    return null;
  }

  const result = {};
  let section = null;
  for (const rawLine of match[1].split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith("#")) continue;
    const nested = rawLine.match(/^  ([A-Za-z][A-Za-z0-9_-]*):\s*(.+)$/);
    if (nested && section) {
      result[section][nested[1]] = nested[2].trim().replace(/^['"]|['"]$/g, "");
      continue;
    }
    const top = rawLine.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    if (!top) {
      errors.push(`${label} contains unsupported frontmatter syntax: ${rawLine}`);
      continue;
    }
    if (!top[2]) {
      section = top[1];
      result[section] = {};
    } else {
      section = null;
      result[top[1]] = top[2].trim().replace(/^['"]|['"]$/g, "");
    }
  }
  return result;
}

function walk(root, predicate, errors, base = root) {
  const found = [];
  if (!fs.existsSync(root)) return found;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(`Repository symlink is not allowed: ${path.relative(base, target).replaceAll(path.sep, "/")}`);
      continue;
    }
    if (entry.isDirectory()) found.push(...walk(target, predicate, errors, base));
    else if (predicate(target)) found.push(target);
  }
  return found;
}

function validateProvenance(root, file, skill, errors) {
  const provenance = readJson(file, errors, `${skill.id} provenance`);
  if (!isObject(provenance)) return;
  if (provenance.$schema !== "../../schema/provenance.schema.json") {
    errors.push(`${skill.id} provenance has the wrong $schema path`);
  }
  if (provenance.skillId !== skill.id) {
    errors.push(`${skill.id} provenance skillId must match the registry ID`);
  }
  if (!OWNERSHIP.has(provenance.ownershipClass)) {
    errors.push(`${skill.id} provenance has an unknown ownershipClass`);
  }
  if (skill.status !== "held" && !RELEASE_ELIGIBLE.has(provenance.ownershipClass)) {
    errors.push(`${skill.id} must be held while ownership is not release-eligible`);
  }
  if (!Array.isArray(provenance.authors) || provenance.authors.length === 0) {
    errors.push(`${skill.id} provenance requires at least one author`);
  }
  if (provenance.license !== skill.license) {
    errors.push(`${skill.id} provenance license must match SKILL.md`);
  }
  for (const field of ["upstreamSources", "adaptations", "excludedAssets", "notices"]) {
    if (!Array.isArray(provenance[field])) errors.push(`${skill.id} provenance.${field} must be an array`);
  }
  requireString(provenance.verifiedDate, `${skill.id} provenance.verifiedDate`, errors, DATE);
  if (
    provenance.ownershipClass === "adapted-with-attribution" &&
    (!Array.isArray(provenance.upstreamSources) || provenance.upstreamSources.length === 0)
  ) {
    errors.push(`${skill.id} adapted provenance requires an upstream source`);
  }
}

function validateSkill(root, skill, errors) {
  const label = isObject(skill) && skill.id ? skill.id : "skill";
  if (!isObject(skill)) {
    errors.push("Every skills entry must be an object");
    return;
  }
  requireString(skill.id, `${label}.id`, errors, ID);
  requireString(skill.version, `${label}.version`, errors, SEMVER);
  requireString(skill.title, `${label}.title`, errors);
  if (typeof skill.description !== "string" || skill.description.length < 20) {
    errors.push(`${label}.description must be at least 20 characters`);
  }
  if (skill.instructionAccess !== "public") {
    errors.push(`${label}.instructionAccess must be public`);
  }
  if (!Array.isArray(skill.triggers) || skill.triggers.length === 0) {
    errors.push(`${label}.triggers must contain at least one phrase`);
  }

  const entry = resolveInside(root, skill.entry, `${label}.entry`, errors);
  const provenanceFile = resolveInside(root, skill.provenance, `${label}.provenance`, errors);
  if (entry) {
    const frontmatter = parseFrontmatter(entry, errors, `${label} SKILL.md`);
    if (frontmatter) {
      if (frontmatter.name !== skill.id) errors.push(`${label} frontmatter name must match its ID`);
      if (frontmatter.metadata?.version !== skill.version) errors.push(`${label} frontmatter version must match the registry`);
      if (!frontmatter.metadata?.author) errors.push(`${label} frontmatter metadata.author is required`);
      requireString(frontmatter.description, `${label} frontmatter description`, errors);
      requireString(frontmatter.license, `${label} frontmatter license`, errors);
      skill.license = frontmatter.license;
    }
  }
  if (provenanceFile && skill.license) validateProvenance(root, provenanceFile, skill, errors);

  if (!Array.isArray(skill.serviceCapabilities)) {
    errors.push(`${label}.serviceCapabilities must be an array`);
  } else {
    for (const capability of skill.serviceCapabilities) {
      if (!isObject(capability) || capability.enforcement !== "server") {
        errors.push(`${label} capabilities must declare enforcement: server`);
      }
      if (!TIERS.has(capability?.tier)) errors.push(`${label} capability has an invalid tier`);
      if (typeof capability?.required !== "boolean") errors.push(`${label} capability.required must be boolean`);
    }
  }

  if (!Array.isArray(skill.agents) || skill.agents.length !== 2) {
    errors.push(`${label}.agents must contain Claude Code and Codex`);
  } else {
    const names = new Set();
    for (const agent of skill.agents) {
      if (!AGENTS.has(agent?.agent)) errors.push(`${label} has an unsupported agent`);
      names.add(agent?.agent);
      if (!AGENT_STATES.has(agent?.status)) errors.push(`${label} has an invalid agent status`);
      if (agent?.status === "tested") {
        requireString(agent.verifiedVersion, `${label} tested agent version`, errors);
        requireString(agent.verifiedCommit, `${label} tested agent commit`, errors, SHA);
        const evidenceFile = resolveInside(root, agent.evidence, `${label} tested agent evidence`, errors);
        if (evidenceFile) {
          const evidence = readJson(evidenceFile, errors, `${label} ${agent.agent} evidence`);
          if (evidence) {
            if (evidence.skillId !== skill.id || evidence.agent !== agent.agent) {
              errors.push(`${label} ${agent.agent} evidence identity must match the registry`);
            }
            if (evidence.agentVersion !== agent.verifiedVersion || evidence.commit !== agent.verifiedCommit) {
              errors.push(`${label} ${agent.agent} evidence version and commit must match the registry`);
            }
            for (const field of ["installation", "positiveRouting", "negativeRouting", "execution"]) {
              if (evidence[field] !== "pass") errors.push(`${label} ${agent.agent} evidence.${field} must be pass`);
            }
            requireString(evidence.verifiedDate, `${label} ${agent.agent} evidence.verifiedDate`, errors, DATE);
          }
        }
      } else if (agent?.status === "planned" || agent?.status === "unsupported") {
        if (agent.verifiedVersion !== null || agent.verifiedCommit !== null || agent.evidence !== null) {
          errors.push(`${label} ${agent.agent} cannot carry evidence while ${agent.status}`);
        }
      }
    }
    if (names.size !== 2) errors.push(`${label}.agents contains a duplicate or missing agent`);
  }

  if (skill.status === "stable") {
    if (!Array.isArray(skill.agents) || !skill.agents.every((agent) => agent.status === "tested")) {
      errors.push(`${label} cannot be stable until both agents are tested`);
    }
    requireString(skill.verifiedCommit, `${label}.verifiedCommit for stable status`, errors, SHA);
    requireString(skill.lastVerified, `${label}.lastVerified for stable status`, errors, DATE);
    if (Array.isArray(skill.agents) && skill.agents.some((agent) => agent.verifiedCommit !== skill.verifiedCommit)) {
      errors.push(`${label} stable agent commits must match the skill verifiedCommit`);
    }
  }

  if (!isObject(skill.fixtures)) {
    errors.push(`${label}.fixtures must be an object`);
  } else {
    for (const kind of ["positive", "negative"]) {
      if (!Array.isArray(skill.fixtures[kind]) || skill.fixtures[kind].length === 0) {
        errors.push(`${label} requires at least one ${kind} fixture`);
      } else {
        for (const fixture of skill.fixtures[kind]) {
          resolveInside(root, fixture, `${label} ${kind} fixture`, errors);
        }
      }
    }
  }
  if (skill.verifiedCommit !== null && !SHA.test(skill.verifiedCommit)) {
    errors.push(`${label}.verifiedCommit must be null or a full commit SHA`);
  }
  if (skill.lastVerified !== null && !DATE.test(skill.lastVerified)) {
    errors.push(`${label}.lastVerified must be null or YYYY-MM-DD`);
  }
}

function validateExternal(root, entry, errors) {
  const label = isObject(entry) && entry.id ? entry.id : "external entry";
  if (!isObject(entry)) {
    errors.push("Every externalEntries item must be an object");
    return;
  }
  requireString(entry.id, `${label}.id`, errors, ID);
  if (entry.kind !== "curated-link") errors.push(`${label}.kind must be curated-link`);
  if (!SHA.test(entry.source?.commit ?? "")) errors.push(`${label} requires a pinned source commit`);
  try {
    const url = new URL(entry.source?.repository);
    if (url.protocol !== "https:") throw new Error("not HTTPS");
  } catch {
    errors.push(`${label} source repository must be an HTTPS URL`);
  }
  if (entry.visibility === "private" && (entry.installable || entry.publishedPackage !== null)) {
    errors.push(`${label} cannot be installable or published while private`);
  }
  if (entry.availability === "verified") {
    if (entry.visibility !== "public") errors.push(`${label} must be public before availability is verified`);
    if (entry.installable) {
      requireString(entry.publishedPackage, `${label}.publishedPackage for installable entry`, errors);
    } else if (entry.publishedPackage !== null) {
      errors.push(`${label} cannot name a package while installable is false`);
    }
    const evidenceFile = resolveInside(root, entry.evidence, `${label}.evidence`, errors);
    if (evidenceFile) {
      const evidence = readJson(evidenceFile, errors, `${label} external evidence`);
      if (evidence) {
        if (evidence.entryId !== entry.id || evidence.repository !== entry.source?.repository || evidence.commit !== entry.source?.commit) {
          errors.push(`${label} external evidence must match the registry source`);
        }
        if (evidence.repositoryReachable !== true || evidence.commitReachable !== true) {
          errors.push(`${label} verified evidence must confirm the repository and commit`);
        }
        if (evidence.verifiedDate !== entry.lastVerified) errors.push(`${label} evidence date must match lastVerified`);
        if (entry.installable && (evidence.package !== entry.publishedPackage || evidence.packageReachable !== true)) {
          errors.push(`${label} installable evidence must confirm the published package`);
        }
      }
    }
  } else {
    if (entry.installable || entry.publishedPackage !== null || entry.evidence !== null) {
      errors.push(`${label} cannot be installable, published, or evidenced while ${entry.availability}`);
    }
  }
  requireString(entry.lastVerified, `${label}.lastVerified`, errors, DATE);
}

export function validateRepository(root) {
  const errors = [];
  const registryFile = path.join(root, "registry.json");
  const registry = readJson(registryFile, errors, "registry.json");
  if (!isObject(registry)) return errors;
  if (registry.$schema !== "./schema/registry.schema.json") errors.push("registry.json has the wrong $schema path");
  if (registry.schemaVersion !== 1) errors.push("registry.json schemaVersion must be 1");
  if (!Array.isArray(registry.skills)) errors.push("registry.skills must be an array");
  if (!Array.isArray(registry.externalEntries)) errors.push("registry.externalEntries must be an array");

  const skills = Array.isArray(registry.skills) ? registry.skills : [];
  const external = Array.isArray(registry.externalEntries) ? registry.externalEntries : [];
  const orderedSkillIds = skills.map((skill) => skill?.id);
  const orderedExternalIds = external.map((entry) => entry?.id);
  if (JSON.stringify(orderedSkillIds) !== JSON.stringify([...orderedSkillIds].sort())) {
    errors.push("registry.skills must be sorted by ID");
  }
  if (JSON.stringify(orderedExternalIds) !== JSON.stringify([...orderedExternalIds].sort())) {
    errors.push("registry.externalEntries must be sorted by ID");
  }
  const allIds = [...orderedSkillIds, ...orderedExternalIds];
  if (new Set(allIds).size !== allIds.length) errors.push("Registry IDs must be unique across skills and external entries");

  const skillIds = new Set(orderedSkillIds);
  const graph = new Map();
  for (const skill of skills) {
    const dependencies = Array.isArray(skill?.dependencies) ? skill.dependencies : [];
    graph.set(skill?.id, dependencies);
    for (const dependency of dependencies) {
      if (dependency === skill?.id) errors.push(`${skill?.id} cannot depend on itself`);
      else if (!skillIds.has(dependency)) errors.push(`${skill?.id} depends on missing skill ${dependency}`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id, trail) {
    if (visiting.has(id)) {
      errors.push(`Skill dependency cycle: ${[...trail, id].join(" -> ")}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of graph.get(id) ?? []) {
      if (skillIds.has(dependency)) visit(dependency, [...trail, id]);
    }
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of skillIds) visit(id, []);

  for (const skill of skills) validateSkill(root, skill, errors);
  for (const entry of external) validateExternal(root, entry, errors);

  const registeredEntries = new Set(skills.map((skill) => path.resolve(root, skill?.entry ?? "")));
  const actualEntries = walk(path.join(root, "skills"), (file) => path.basename(file) === "SKILL.md", errors);
  for (const entry of actualEntries) {
    if (!registeredEntries.has(path.resolve(entry))) {
      errors.push(`Orphan skill entrypoint: ${path.relative(root, entry).replaceAll(path.sep, "/")}`);
    }
  }
  return errors;
}
