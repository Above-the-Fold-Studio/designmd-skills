import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules"]);
const ignoredFiles = new Set(["package-lock.json"]);
const binaryExtensions = new Set([".gif", ".ico", ".jpg", ".jpeg", ".pdf", ".png", ".webp"]);
const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/],
  ["OpenAI-style key", /\bsk-[A-Za-z0-9_-]{20,}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ["Stripe live key", /\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["JWT", /\beyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\b/],
];

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else if (!ignoredFiles.has(entry.name) && !binaryExtensions.has(path.extname(entry.name).toLowerCase())) files.push(target);
  }
  return files;
}

const errors = [];
for (const file of walk(root)) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");
  for (const [name, pattern] of secretPatterns) {
    if (pattern.test(text)) errors.push(`${relative} contains a ${name}-shaped value`);
  }
  if (/^(?:skills|dist|tests\/fixtures)\//.test(relative) && /\bMCP_SECRET_TOKEN\b/.test(text)) {
    errors.push(`${relative} exposes the shared compatibility-token name in publishable content`);
  }
}

if (errors.length > 0) {
  console.error(`Secret scan failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Secret-pattern scan passed.");
}
