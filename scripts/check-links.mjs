import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const ignored = new Set([".git", "node_modules"]);

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else if (target.endsWith(".md")) files.push(target);
  }
  return files;
}

const errors = [];
for (const file of walk(root)) {
  const markdown = fs.readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  const links = markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g);
  for (const match of links) {
    const raw = match[1].trim().replace(/^<|>$/g, "");
    const target = raw.split(/\s+["']/)[0];
    if (target.startsWith("#") || target.startsWith("mailto:")) continue;
    if (/^https:\/\//.test(target)) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
      errors.push(`${path.relative(root, file)} uses a non-HTTPS link: ${target}`);
      continue;
    }
    const withoutAnchor = decodeURIComponent(target.split("#")[0]);
    if (!withoutAnchor) continue;
    const resolved = path.resolve(path.dirname(file), withoutAnchor);
    if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved)) {
      errors.push(`${path.relative(root, file)} has a broken relative link: ${target}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Link validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Markdown link validation passed.");
}
