---
title: Urban Neon (VS Code Theme)
description: A theme built with clean architecture
toc: Table of Contents
---


Published site: {{PAGES_URL}}

## Using this theme

You can install the theme from the VS Code Marketplace, soon from Open VSX as well, from the Releases section, or directly from the project source.

## Getting started

This is a theme built with clean architecture, to style your dev journey in VS Code.

### Prerequisites

- Visual Studio Code 1.85 or later
- Node.js 22 or later (only for development or installing from source)
- npm (same)

### Installation

#### From the VS Code Marketplace (recommended)

Go to the theme's page on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=clcmo.urban-neon-clean-theme) and click **Install**. You can also search for **Urban Neon** in the Extensions view inside VS Code.

#### From Open VSX (coming soon)

Publishing to [Open VSX](https://open-vsx.org/extension/clcmo/urban-neon-clean-theme) will be released soon. It serves VS Code-compatible editors that don't use Microsoft's Marketplace, such as VSCodium.

#### From a `.vsix` file

1. Download the `.vsix` file from the [Releases](https://github.com/clcmo/urban-neon-clean-theme/releases) section.
2. In VS Code, open the Command Palette with `Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on macOS.
3. Run **Extensions: Install from VSIX...** and select the downloaded file.
4. Restart VS Code if needed.

#### From source

To install a local version from a cloned copy of the project:

```bash
git clone https://github.com/clcmo/urban-neon-clean-theme.git
cd urban-neon-clean-theme
npm ci
npm run build:themes
npm run package:vsix
code --install-extension dist/urban-neon-clean-theme.vsix
```

## Usage

1. Open the Command Palette.
2. Run **Preferences: Color Theme**.
3. Select **Urban Neon Dark** or **Urban Neon Light**.

You can also open the picker quickly with `Ctrl+K Ctrl+T` on Windows/Linux or `Cmd+K Cmd+T` on macOS.

### Development

Edit the palettes in `src/infrastructure/palettes/` and run:

```bash
npm run build:themes
```

The dark and light themes will be generated in `themes/`.

## Contributing

Contributions are welcome. Please read the [contributing guide](.github/CONTRIBUTING.en.md) and the [Code of Conduct](.github/CODE_OF_CONDUCT.en.md).

## License

Distributed under the [MIT](LICENSE) license.