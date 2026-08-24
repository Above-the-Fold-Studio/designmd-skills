import fs from "node:fs/promises";
import path from "node:path";

const ALLOWED_EXTENSIONS = new Set([".md", ".json", ".txt"]);
const DISALLOWED_TEXT = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\uFFFD]/;

const SECRET_PATTERNS = [
  { name: "private key", pattern: /-----BEGIN (?:(?:RSA|EC|OPENSSH|DSA) PRIVATE KEY|PGP PRIVATE KEY BLOCK)-----/ },
  { name: "GitHub token", pattern: /\b(?:github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{20,})\b/ },
  { name: "Bearer credential", pattern: /\bBearer\s+[A-Za-z0-9._~+\/-]{20,}={0,2}\b/i },
  { name: "unquoted token assignment", pattern: /\b(?:api[_-]?key|access[_-]?token|secret|token)\s*[:=]\s*[A-Za-z0-9._~+\/-]{20,}={0,2}\b/i },
];

async function inspectTree(root, current, errors) {
  const entries = await fs.readdir(current, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(current, entry.name);
    const relative = path.relative(root, fullPath).replaceAll(path.sep, "/");
    const stat = await fs.lstat(fullPath);

    if (stat.isSymbolicLink()) {
      errors.push(`${relative}: symbolic links are not allowed in bootstrap skills`);
      continue;
    }

    if (stat.isDirectory()) {
      await inspectTree(root, fullPath, errors);
      continue;
    }

    if (!stat.isFile()) {
      errors.push(`${relative}: only regular text files are allowed in bootstrap skills`);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      errors.push(`${relative}: only .md, .json, and .txt files are allowed in bootstrap skills`);
      continue;
    }

    const content = await fs.readFile(fullPath, "utf8");
    if (DISALLOWED_TEXT.test(content)) {
      errors.push(`${relative}: contains binary or invalid UTF-8 content disguised as text`);
      continue;
    }
    for (const { name, pattern } of SECRET_PATTERNS) {
      if (pattern.test(content)) {
        errors.push(`${relative}: contains credential-shaped content (${name})`);
      }
    }
  }
}

export async function scanSkillContent(repositoryRoot) {
  const skillsRoot = path.join(repositoryRoot, "skills");
  const errors = [];

  let rootStat;
  try {
    rootStat = await fs.lstat(skillsRoot);
  } catch (error) {
    if (error?.code === "ENOENT") return errors;
    throw error;
  }

  if (rootStat.isSymbolicLink()) {
    return ["skills: root symbolic link is not allowed"];
  }

  if (!rootStat.isDirectory()) {
    return ["skills: expected a directory"];
  }

  const repositoryReal = await fs.realpath(repositoryRoot);
  const skillsReal = await fs.realpath(skillsRoot);
  const relativeReal = path.relative(repositoryReal, skillsReal);
  if (relativeReal.startsWith("..") || path.isAbsolute(relativeReal)) {
    return ["skills: resolved path escapes the repository root"];
  }

  await inspectTree(skillsRoot, skillsRoot, errors);
  return errors;
}
