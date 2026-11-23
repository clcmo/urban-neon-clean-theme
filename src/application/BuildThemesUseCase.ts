import { ContrastValidator } from "../domain/ContrastValidator.ts";
import type { ColorPalette, ThemeAppearance, ThemeArtifact } from "../domain/ThemeModels.ts";
import type { ThemeWriter } from "../domain/ThemeWriter.ts";

export interface PaletteInput {
  appearance: ThemeAppearance;
  label: string;
  fileName: string;
  palette: ColorPalette;
}

export class BuildThemesUseCase {
  private readonly writer: ThemeWriter;

  constructor(writer: ThemeWriter) {
    this.writer = writer;
  }

  async execute(inputs: PaletteInput[]): Promise<void> {
    for (const input of inputs) {
      ContrastValidator.validatePalette(input.label, input.palette);
      const artifact = this.mapToArtifact(input);
      await this.writer.write(artifact);
    }
  }

  private mapToArtifact({ appearance, label, fileName, palette }: PaletteInput): ThemeArtifact {
    return {
      fileName,
      label,
      uiTheme: appearance === "dark" ? "vs-dark" : "vs",
      semanticHighlighting: true,
      colors: {
        // Editor & Seleção
        "editor.background": palette.bgPrimary,
        "editor.foreground": palette.fgPrimary,
        "editor.selectionBackground": palette.bgSelection,
        "editor.lineHighlightBackground": palette.bgSecondary,
        "editorCursor.foreground": palette.accentSecondary,
        "editorLineNumber.foreground": palette.fgMuted,
        "editorLineNumber.activeForeground": palette.accentSecondary,
        "editorBracketMatch.background": palette.bgSelection,
        "editorBracketMatch.border": palette.accentPrimary,

        // Workbench (Activity Bar, Sidebar, Tabs, Status Bar)
        "activityBar.background": palette.bgElevated,
        "activityBar.foreground": palette.fgPrimary,
        "activityBar.activeBorder": palette.accentPrimary,
        "sideBar.background": palette.bgSecondary,
        "sideBar.foreground": palette.fgSecondary,
        "sideBar.border": palette.borderSubtle,
        "editorGroupHeader.tabsBackground": palette.bgSecondary,
        "tab.activeBackground": palette.bgPrimary,
        "tab.activeForeground": palette.fgPrimary,
        "tab.activeBorderTop": palette.accentPrimary,
        "tab.inactiveBackground": palette.bgSecondary,
        "tab.inactiveForeground": palette.fgMuted,
        "statusBar.background": palette.bgElevated,
        "statusBar.foreground": palette.fgPrimary,

        // Autocomplete & Hover Widgets
        "editorSuggestWidget.background": palette.bgElevated,
        "editorSuggestWidget.border": palette.borderSubtle,
        "editorSuggestWidget.foreground": palette.fgPrimary,
        "editorSuggestWidget.selectedBackground": palette.bgSelection,
        "editorSuggestWidget.highlightForeground": palette.accentSecondary,
        "editorHoverWidget.background": palette.bgElevated,
        "editorHoverWidget.border": palette.borderSubtle,

        // Git Diff & Gutter
        "gitDecoration.addedResourceForeground": palette.accentSuccess,
        "gitDecoration.modifiedResourceForeground": palette.accentWarning,
        "gitDecoration.deletedResourceForeground": palette.accentError,
        "gitDecoration.untrackedResourceForeground": palette.accentSecondary,
        "editorGutter.addedBackground": palette.accentSuccess,
        "editorGutter.modifiedBackground": palette.accentWarning,
        "editorGutter.deletedBackground": palette.accentError,
        "diffEditor.insertedTextBackground": `${palette.accentSuccess}24`,
        "diffEditor.removedTextBackground": `${palette.accentError}24`,

        // Terminal Integrado
        "terminal.background": palette.bgPrimary,
        "terminal.foreground": palette.fgPrimary,
        "terminalCursor.foreground": palette.accentPrimary,
        "terminal.ansiBlack": palette.bgElevated,
        "terminal.ansiRed": palette.accentError,
        "terminal.ansiGreen": palette.accentSuccess,
        "terminal.ansiYellow": palette.accentWarning,
        "terminal.ansiBlue": palette.accentInfo,
        "terminal.ansiMagenta": palette.accentPrimary,
        "terminal.ansiCyan": palette.accentSecondary,
        "terminal.ansiWhite": palette.fgPrimary
      },
      tokenColors: [
        {
          name: "Comments",
          scope: ["comment", "punctuation.definition.comment"],
          settings: { foreground: palette.fgMuted, fontStyle: "italic" }
        },
        {
          name: "Keywords & Control Flow",
          scope: ["keyword", "keyword.control", "storage.type", "storage.modifier"],
          settings: { foreground: palette.accentPrimary, fontStyle: "bold" }
        },
        {
          name: "Strings & Template Literals",
          scope: ["string", "punctuation.definition.string"],
          settings: { foreground: palette.accentSecondary }
        },
        {
          name: "Functions & Methods",
          scope: ["entity.name.function", "support.function"],
          settings: { foreground: palette.accentWarning }
        },
        {
          name: "Classes, Interfaces & Types",
          scope: ["entity.name.class", "entity.name.type", "support.class", "support.type"],
          settings: { foreground: palette.accentInfo }
        },
        {
          name: "Numbers, Booleans & Constants",
          scope: ["constant.numeric", "constant.language", "variable.other.constant"],
          settings: { foreground: palette.accentSuccess }
        }
      ],
      semanticTokenColors: {
        "function": palette.accentWarning,
        "method": palette.accentWarning,
        "class": palette.accentInfo,
        "interface": { foreground: palette.accentInfo, fontStyle: "italic" },
        "type": palette.accentInfo,
        "enumMember": palette.accentSuccess,
        "variable.readonly": palette.accentSuccess,
        "parameter": { foreground: palette.fgSecondary, fontStyle: "italic" },
        "property": palette.fgPrimary
      }
    };
  }
}