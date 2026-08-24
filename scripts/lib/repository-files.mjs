import fs from "node:fs";
import path from "node:path";

export function collectRepositoryFiles(
  root,
  { ignoredDirectories = new Set(), ignoredFiles = new Set(), include = () => true } = {},
) {
  const files = [];
  const symlinks = [];

  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
      const target = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        symlinks.push(path.relative(root, target).replaceAll(path.sep, "/"));
        continue;
      }
      if (entry.isDirectory()) visit(target);
      else if (!ignoredFiles.has(entry.name) && include(target)) files.push(target);
    }
  }

  visit(root);
  return { files, symlinks };
}
