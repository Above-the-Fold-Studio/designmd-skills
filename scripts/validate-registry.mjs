import process from "node:process";
import { validateRepository } from "./lib/registry-validation.mjs";
import { validateJsonSchemas } from "./lib/schema-validation.mjs";

let errors = [];
try {
  errors = validateJsonSchemas(process.cwd());
} catch (error) {
  errors.push(`JSON Schema validation could not run: ${error.message}`);
}
errors.push(...validateRepository(process.cwd()));
if (errors.length > 0) {
  console.error(`Registry validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Registry validation passed.");
}
