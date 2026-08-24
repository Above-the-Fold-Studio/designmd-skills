import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";
import { renderCatalog } from "./lib/catalog.mjs";

const registry = JSON.parse(
  await readFile(new URL("../registry/skills.json", import.meta.url), "utf8"),
);
const readmePath = new URL("../README.md", import.meta.url);
const current = await readFile(readmePath, "utf8");
const start = "<!-- BEGIN GENERATED CATALOG -->";
const end = "<!-- END GENERATED CATALOG -->";

const begin = current.indexOf(start);
const finish = current.indexOf(end);
if (begin === -1 || finish === -1 || finish < begin) {
  throw new Error("README catalog markers are missing or out of order.");
}

const generated = renderCatalog(registry.skills);
const next =
  current.slice(0, begin + start.length) +
  `\n${generated}\n` +
  current.slice(finish);

if (process.argv.includes("--check")) {
  if (next !== current) {
    console.error("Generated README catalog is stale. Run npm run catalog.");
    process.exitCode = 1;
  }
} else {
  await writeFile(readmePath, next, "utf8");
  console.log(`Generated catalog for ${registry.skills.length} skill(s).`);
}
