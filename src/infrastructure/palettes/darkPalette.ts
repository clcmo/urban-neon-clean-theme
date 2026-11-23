import type { ColorPalette } from "../../domain/ThemeModels.ts";

export const darkPalette: ColorPalette = {
  bgPrimary: "#0a0a0c",
  bgSecondary: "#121319",
  bgElevated: "#181a24",
  bgSelection: "#282c3d",
  fgPrimary: "#f2f4f8",      // ~17.8:1 sobre #0a0a0c
  fgSecondary: "#c4cad8",    // ~11.9:1 sobre #0a0a0c
  fgMuted: "#7d859c",
  accentPrimary: "#ff4da6",  // ~6.6:1 sobre #0a0a0c
  accentSecondary: "#00f2fe",// ~14.2:1 sobre #0a0a0c
  accentWarning: "#ffeb3b",  // ~16.5:1 sobre #0a0a0c
  accentSuccess: "#4ade80",  // ~11.8:1 sobre #0a0a0c
  accentError: "#ff6b6b",    // ~7.2:1 sobre #0a0a0c
  accentInfo: "#60a5fa",     // ~8.1:1 sobre #0a0a0c
  borderSubtle: "#252836"
};