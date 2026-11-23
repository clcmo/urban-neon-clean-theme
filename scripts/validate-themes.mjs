// Valida o ícone e os temas gerados (substitui o `node -e` inline do workflow).
import { existsSync, readFileSync } from "node:fs";

const THEMES = ["themes/urban-neon-dark.json", "themes/urban-neon-light.json"];
const errors = [];

if (!existsSync("assets/icon.png")) errors.push("Ícone ausente: assets/icon.png");

for (const file of THEMES) {
  try {
    const theme = JSON.parse(readFileSync(file, "utf8"));
    if (!theme.colors || !theme.tokenColors) errors.push(`${file}: faltam "colors" ou "tokenColors".`);
    else console.log(`OK: ${file} -> ${theme.name}`);
  } catch (e) {
    errors.push(`${file}: ${e.message}`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
