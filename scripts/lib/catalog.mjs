function escapeCell(value) {
  const slash = String.fromCharCode(92);
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(slash, slash + slash)
    .replaceAll("|", slash + "|")
    .replaceAll("\r", "")
    .replaceAll("\n", "<br>");
}

function escapeLinkText(value) {
  const slash = String.fromCharCode(92);
  return escapeCell(value)
    .replaceAll("[", slash + "[")
    .replaceAll("]", slash + "]");
}

export function renderCatalog(skills) {
  if (skills.length === 0) return "_No registered skills yet._";
  const groups = new Map([
    ["foundation", []],
    ["workflow", []],
  ]);
  for (const skill of skills) groups.get(skill.category).push(skill);

  const sections = [];
  for (const [category, entries] of groups) {
    if (entries.length === 0) continue;
    const heading = category === "foundation" ? "Foundations" : "Workflows";
    const rows = entries
      .toSorted((a, b) => a.id.localeCompare(b.id))
      .map(
        (skill) =>
          `| [${escapeLinkText(skill.title)}](${skill.path}/DESIGN.md) | ${escapeCell(skill.description)} | ${escapeCell(skill.status)} | ${escapeCell(skill.version)} |`,
      );
    sections.push(
      `### ${heading}\n\n| Skill | Outcome | Status | Version |\n| --- | --- | --- | --- |\n${rows.join("\n")}`,
    );
  }
  return sections.join("\n\n");
}
