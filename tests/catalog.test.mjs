import assert from "node:assert/strict";
import test from "node:test";
import { renderCatalog } from "../scripts/lib/catalog.mjs";

test("catalog escapes table, link, HTML, and multiline input", () => {
  const output = renderCatalog([
    {
      id: "color-and-contrast",
      title: "Color | [Contrast]",
      description: "Safe | readable\n<script>",
      category: "foundation",
      status: "experimental",
      version: "0.1.0",
      path: "skills/color-and-contrast",
    },
  ]);

  assert.match(output, /Color \\\| \\\[Contrast\\\]/);
  assert.match(output, /Safe \\\| readable<br>&lt;script&gt;/);
  assert.doesNotMatch(output, /\n<script>/);
});
