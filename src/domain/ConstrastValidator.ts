import { ColorPalette } from "./ThemeModels.js";

export class ContrastValidator {
  static validatePalette(label: string, palette: ColorPalette): void {
    const checks: Array<{ pair: string; fg: string; bg: string; minRatio: number }> = [
      { pair: "fgPrimary vs bgPrimary", fg: palette.fgPrimary, bg: palette.bgPrimary, minRatio: 7.0 },
      { pair: "fgSecondary vs bgPrimary", fg: palette.fgSecondary, bg: palette.bgPrimary, minRatio: 4.5 },
      { pair: "accentPrimary vs bgPrimary", fg: palette.accentPrimary, bg: palette.bgPrimary, minRatio: 4.5 },
      { pair: "accentSecondary vs bgPrimary", fg: palette.accentSecondary, bg: palette.bgPrimary, minRatio: 4.5 },
      { pair: "accentWarning vs bgPrimary", fg: palette.accentWarning, bg: palette.bgPrimary, minRatio: 4.5 },
      { pair: "accentSuccess vs bgPrimary", fg: palette.accentSuccess, bg: palette.bgPrimary, minRatio: 4.5 },
      { pair: "accentError vs bgPrimary", fg: palette.accentError, bg: palette.bgPrimary, minRatio: 4.5 }
    ];

    for (const check of checks) {
      const ratio = this.contrastRatio(check.fg, check.bg);
      if (ratio < check.minRatio) {
        throw new Error(
          `[${label}] Falha de contraste WCAG em "${check.pair}": ${ratio.toFixed(2)}:1 (mínimo exigido: ${check.minRatio}:1)`
        );
      }
    }
  }

  static contrastRatio(hex1: string, hex2: string): number {
    const l1 = this.relativeLuminance(hex1);
    const l2 = this.relativeLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  private static relativeLuminance(hex: string): number {
    const clean = hex.replace("#", "").slice(0, 6);
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;

    const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }
}