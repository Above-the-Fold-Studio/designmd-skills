import process from "node:process";
import { validateRepository } from "./lib/validation.mjs";

const errors = await validateRepository(process.cwd());
if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Registry and skill contracts are valid.");
}
