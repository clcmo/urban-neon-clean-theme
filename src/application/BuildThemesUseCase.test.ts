import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { ContrastValidator } from "../domain/ContrastValidator.ts";
import type { ThemeArtifact } from "../domain/ThemeModels.ts";
import type { ThemeWriter } from "../domain/ThemeWriter.ts";
import { darkPalette } from "../infrastructure/palettes/darkPalette.ts";
import { lightPalette } from "../infrastructure/palettes/lightPalette.ts";
import { BuildThemesUseCase } from "./BuildThemesUseCase.ts";

class InMemoryThemeWriter implements ThemeWriter {
  public readonly artifacts: ThemeArtifact[] = [];

  async write(artifact: ThemeArtifact): Promise<void> {
    this.artifacts.push(artifact);
  }
}

describe("ContrastValidator", () => {
  it("valida o contraste WCAG das paletas dark e light", () => {
    assert.doesNotThrow(() => ContrastValidator.validatePalette("Urban Neon Dark", darkPalette));
    assert.doesNotThrow(() => ContrastValidator.validatePalette("Urban Neon Light", lightPalette));
  });

  it("rejeita uma paleta com contraste insuficiente", () => {
    assert.throws(
      () =>
        ContrastValidator.validatePalette("Baixo Contraste", {
          ...darkPalette,
          fgPrimary: "#15161c"
        }),
      /Falha de contraste WCAG/
    );
  });
});

describe("BuildThemesUseCase", () => {
  it("gera os artefatos Dark (vs-dark) e Light (vs) com tokens semânticos e cores de UI", async () => {
    const writer = new InMemoryThemeWriter();
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

    assert.equal(writer.artifacts.length, 2);

    const [darkArtifact, lightArtifact] = writer.artifacts;
    assert.equal(darkArtifact.uiTheme, "vs-dark");
    assert.equal(darkArtifact.semanticHighlighting, true);
    assert.equal(darkArtifact.colors["editor.background"], "#0a0a0c");
    assert.equal(darkArtifact.colors["terminal.ansiCyan"], "#00f2fe");
    assert.equal(darkArtifact.semanticTokenColors["class"], "#60a5fa");

    assert.equal(lightArtifact.uiTheme, "vs");
    assert.equal(lightArtifact.semanticHighlighting, true);
    assert.equal(lightArtifact.colors["editor.background"], "#faf9fc");
    assert.equal(lightArtifact.colors["gitDecoration.addedResourceForeground"], "#166534");
  });
});