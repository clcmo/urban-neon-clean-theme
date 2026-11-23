import { resolve } from "node:path";
import { PngIconGenerator } from "../infrastructure/PngIconGenerator.ts";

async function main() {
  const iconPath = resolve("assets/icon.png");
  const generator = new PngIconGenerator();
  await generator.generate(iconPath);
  console.log("Ícone PNG 128x128 gerado em:", iconPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});