import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faSwatchbook } from "@fortawesome/free-solid-svg-icons";
import { Resvg } from "@resvg/resvg-js";

export class PngIconGenerator {
  async generate(outputPngPath: string): Promise<void> {
    const faIcon = icon(faSwatchbook, {
      styles: { color: "#ffffff" }
    });

    const svgPathData = faIcon.abstract[0]?.children?.[0]?.attributes?.d ?? "";
    const viewBox = faIcon.abstract[0]?.attributes?.viewBox ?? "0 0 512 512";

    const compositeSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        <defs>
          <linearGradient id="neonBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e5097f"/>
            <stop offset="50%" stop-color="#00f2fe"/>
            <stop offset="100%" stop-color="#ffeb3b"/>
          </linearGradient>
          <clipPath id="rounded">
            <rect x="4" y="4" width="120" height="120" rx="24" ry="24"/>
          </clipPath>
        </defs>

        <!-- Fundo dividido Dark / Light -->
        <g clip-path="url(#rounded)">
          <rect x="0" y="0" width="64" height="128" fill="#0a0a0c"/>
          <rect x="64" y="0" width="64" height="128" fill="#faf9fc"/>
          <line x1="64" y1="0" x2="64" y2="128" stroke="#e5097f" stroke-width="2" opacity="0.6"/>
        </g>

        <!-- Moldura Neon -->
        <rect x="4" y="4" width="120" height="120" rx="24" ry="24" fill="none" stroke="url(#neonBorder)" stroke-width="4"/>

        <!-- Badge central para leitura nítida do ícone Font Awesome -->
        <circle cx="64" cy="64" r="36" fill="#121319" stroke="#00f2fe" stroke-width="2.5"/>

        <!-- Ícone Font Awesome (faSwatchbook) centralizado -->
        <svg x="42" y="42" width="44" height="44" viewBox="${viewBox}">
          <path d="${svgPathData}" fill="#ffeb3b"/>
        </svg>
      </svg>
    `.trim();

    const resvg = new Resvg(compositeSvg, {
      fitTo: { mode: "width", value: 128 }
    });
    const pngBuffer = resvg.render().asPng();

    await mkdir(dirname(outputPngPath), { recursive: true });
    await writeFile(outputPngPath, pngBuffer);
  }
}