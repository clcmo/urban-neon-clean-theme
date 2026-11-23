export type ThemeAppearance = "dark" | "light";

export interface ColorPalette {
  bgPrimary: string;
  bgSecondary: string;
  bgElevated: string;
  bgSelection: string;
  fgPrimary: string;
  fgSecondary: string;
  fgMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  accentWarning: string;
  accentSuccess: string;
  accentError: string;
  accentInfo: string;
  borderSubtle: string;
}

export interface TokenColorRule {
  name: string;
  scope: string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

export interface ThemeArtifact {
  fileName: string;
  label: string;
  uiTheme: "vs-dark" | "vs";
  semanticHighlighting: boolean;
  colors: Record<string, string>;
  tokenColors: TokenColorRule[];
  semanticTokenColors: Record<string, string | { foreground?: string; fontStyle?: string }>;
}