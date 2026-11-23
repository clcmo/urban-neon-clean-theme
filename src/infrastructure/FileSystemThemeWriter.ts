import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ThemeArtifact } from "../domain/ThemeModels.js";
import { ThemeWriter } from "../domain/ThemeWriter.js";

export class FileSystemThemeWriter implements ThemeWriter {
  constructor(private readonly outputDir: string) {}

  async write(artifact: ThemeArtifact): Promise<void> {
    await mkdir(this.outputDir, { recursive: true });
    const targetPath = join(this.outputDir, artifact.fileName);
    const payload = {
      name: artifact.label,
      type: artifact.uiTheme === "vs-dark" ? "dark" : "light",
      semanticHighlighting: artifact.semanticHighlighting,
      colors: artifact.colors,
      tokenColors: artifact.tokenColors,
      semanticTokenColors: artifact.semanticTokenColors
    };
    await writeFile(targetPath, JSON.stringify(payload, null, 2) + "\n", "utf-8");
  }
}