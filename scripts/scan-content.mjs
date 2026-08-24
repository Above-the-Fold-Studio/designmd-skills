import process from "node:process";
import { scanSkillContent } from "./lib/content-security.mjs";

const errors = await scanSkillContent(process.cwd());
if (errors.length > 0) {
  console.error(`Skill content scan failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Bootstrap skill content is inert and credential-free.");
}
