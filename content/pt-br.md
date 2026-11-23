---
title: Urban Neon (Tema para VS Code)
description: Tema criado com arquitetura clean
toc: Índice
---


Site publicado: {{PAGES_URL}}

## Usando este tema

O tema pode ser instalado pela seção de Releases ou diretamente pela fonte do projeto.

## Começando

Este é um tema criado com a arquitetura clean, para estilizar a sua jornada dev no VS Code.

### Pré-requisitos

- Visual Studio Code 1.85 ou superior
- Node.js 22 ou superior
- npm

### Instalação

1. Baixe o arquivo `.vsix` da seção [Releases](https://github.com/clcmo/urban-neon-clean-theme/releases).
2. No VS Code, abra a paleta de comandos com `Ctrl+Shift+P` no Windows/Linux ou `Cmd+Shift+P` no macOS.
3. Execute **Extensions: Install from VSIX...** e selecione o arquivo baixado.
4. Reinicie o VS Code, se necessário.

Para instalar uma versão local clonada do projeto:

```bash
git clone https://github.com/clcmo/urban-neon-clean-theme.git
cd urban-neon-clean-theme
npm ci
npm run build:themes
npm run package:vsix
code --install-extension urban-neon-clean-theme-0.1.0.vsix
```

## Uso

1. Abra a paleta de comandos.
2. Execute **Preferences: Color Theme**.
3. Selecione **Urban Neon Dark** ou **Urban Neon Light**.

Você também pode abrir o seletor rapidamente com `Ctrl+K Ctrl+T` no Windows/Linux ou `Cmd+K Cmd+T` no macOS.

### Desenvolvimento

Edite as paletas em `src/infrastructure/palettes/` e execute:

```bash
npm run build:themes
```

O tema escuro e o tema claro serão gerados em `themes/`.

## Contribuindo

Contribuições são bem-vindas. Leia o [guia de contribuição](.github/CONTRIBUTING.md) e o [Código de Conduta](.github/CODE_OF_CONDUCT.md).

## Licença

Distribuído sob a licença [MIT](LICENSE).
