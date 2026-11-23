---
title: Urban Neon (VS Code Theme)
description: Theme built with Clean Architecture
toc: Table of contents
---

Published site: {{PAGES_URL}}

## Using this theme

The theme can be installed from the Releases section or directly from the project source.

## Getting started

This theme uses Clean Architecture principles to style your development experience in VS Code.

### Prerequisites

- Visual Studio Code 1.85 or later
- Node.js 22 or later
- npm

### Installation

1. Download the `.vsix` file from the [Releases](https://github.com/clcmo/urban-neon-clean-theme/releases) section.
2. In VS Code, open the Command Palette with `Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on macOS.
3. Run **Extensions: Install from VSIX...** and select the downloaded file.
4. Restart VS Code if necessary.

To install a local clone of the project:

```bash
git clone https://github.com/clcmo/urban-neon-clean-theme.git
cd urban-neon-clean-theme
npm ci
npm run build:themes
npm run package:vsix
code --install-extension urban-neon-clean-theme-0.1.0.vsix
```

## Usage

1. Open the Command Palette.
2. Run **Preferences: Color Theme**.
3. Select **Urban Neon Dark** or **Urban Neon Light**.

You can also open the theme picker quickly with `Ctrl+K Ctrl+T` on Windows/Linux or `Cmd+K Cmd+T` on macOS.

### Development

Edit the palettes in `src/infrastructure/palettes/` and run:

```bash
npm run build:themes
```

The dark and light themes will be generated in `themes/`.

## Contributing

Contributions are welcome. Read the [contribution guide](.github/CONTRIBUTING.en.md) and [Code of Conduct](.github/CODE_OF_CONDUCT.en.md).

## License

Distributed under the [MIT](LICENSE) license.
