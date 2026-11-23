urban-vs-theme/
├── .github/
│   └── workflows/
│       └── release.yml
├── src/
│   ├── domain/
│   │   ├── ThemeModels.ts
│   │   ├── ThemeWriter.ts
│   │   └── ContrastValidator.ts      # Regra pura de contraste WCAG
│   ├── application/
│   │   └── BuildThemesUseCase.ts     # Orquestra validação + tokens completos
│   ├── infrastructure/
│   │   ├── palettes/
│   │   │   ├── darkPalette.ts
│   │   │   └── lightPalette.ts
│   │   └── FileSystemThemeWriter.ts
│   └── cli/
│       └── build.ts
├── themes/
│   ├── urban-neon-dark.json
│   └── urban-neon-light.json
├── package.json
└── README.md