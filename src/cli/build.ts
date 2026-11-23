import { resolve } from "node:path";
import { BuildThemesUseCase } from "../application/BuildThemesUseCase.js";
import { FileSystemThemeWriter } from "../infrastructure/FileSystemThemeWriter.js";
import { darkPalette } from "../infrastructure/palettes/darkPalette.js";
import { lightPalette } from "../infrastructure/palettes/lightPalette.js";

async function main() {
  const themesDir = resolve("themes");
  const writer = new FileSystemThemeWriter(themesDir);
  const useCase = new BuildThemesUseCase(writer);

  await useCase.execute([
    {
      appearance: "dark",
      label: "Urban Neon Dark",
      fileName: "urban-neon-dark.json",
      palette: darkPalette
    },
    {
      appearance: "light",
      label: "Urban Neon Light",
      fileName: "urban-neon-light.json",
      palette: lightPalette
    }
  ]);

  console.log("Temas Dark e Light gerados em ./themes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});