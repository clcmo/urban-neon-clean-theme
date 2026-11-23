import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";
import { BuildThemesUseCase } from "../application/BuildThemesUseCase.ts";
import { FileSystemThemeWriter } from "./FileSystemThemeWriter.ts";
import { darkPalette } from "./palettes/darkPalette.ts";
import { lightPalette } from "./palettes/lightPalette.ts";

describe("Integração: BuildThemesUseCase + FileSystemThemeWriter", () => {
  let tempThemesDir: string;

  beforeEach(async () => {
    tempThemesDir = await mkdtemp(join(tmpdir(), "vscode-theme-clean-arch-"));
  });

  afterEach(async () => {
    await rm(tempThemesDir, { recursive: true, force: true });
  });

  it("grava os arquivos urban-neon-dark.json e urban-neon-light.json válidos no disco", async () => {
    const writer = new FileSystemThemeWriter(tempThemesDir);
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

    const darkRaw = await readFile(join(tempThemesDir, "urban-neon-dark.json"), "utf-8");
    const lightRaw = await readFile(join(tempThemesDir, "urban-neon-light.json"), "utf-8");

    const darkJson = JSON.parse(darkRaw);
    const lightJson = JSON.parse(lightRaw);

    // Valida estrutura Dark
    assert.equal(darkJson.name, "Urban Neon Dark");
    assert.equal(darkJson.type, "dark");
    assert.equal(darkJson.semanticHighlighting, true);
    assert.equal(darkJson.colors["editor.background"], "#0a0a0c");
    assert.equal(darkJson.colors["minimap.background"], "#121319");
    assert.ok(Array.isArray(darkJson.tokenColors) && darkJson.tokenColors.length >= 6);
    assert.equal(typeof darkJson.semanticTokenColors, "object");

    // Valida estrutura Light
    assert.equal(lightJson.name, "Urban Neon Light");
    assert.equal(lightJson.type, "light");
    assert.equal(lightJson.semanticHighlighting, true);
    assert.equal(lightJson.colors["editor.background"], "#faf9fc");
    assert.equal(lightJson.colors["debugConsole.background"], "#f0eef6");
    assert.ok(Array.isArray(lightJson.tokenColors) && lightJson.tokenColors.length >= 6);
    assert.equal(typeof lightJson.semanticTokenColors, "object");
  });
});