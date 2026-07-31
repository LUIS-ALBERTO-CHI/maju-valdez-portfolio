#!/usr/bin/env node
/**
 * Genera los favicons rasterizados a partir de public/favicon.svg.
 *
 * Google Search y varios navegadores prefieren (o solo aceptan) PNG/ICO, así que
 * del mismo SVG salen los PNG de cada tamaño, el apple-touch-icon, los iconos del
 * manifest y un favicon.ico multi-resolución.
 *
 * Se ejecuta a mano cuando cambie el diseño del icono: `node scripts/make-favicons.mjs`
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const PUBLIC = resolve(process.cwd(), 'public');
const SVG = resolve(PUBLIC, 'favicon.svg');

const TARGETS = [
  { size: 16, file: 'favicon-16x16.png' },
  { size: 32, file: 'favicon-32x32.png' },
  { size: 180, file: 'apple-touch-icon.png' },
  { size: 192, file: 'icon-192.png' },
  { size: 512, file: 'icon-512.png' },
];

/** Empaqueta varios PNG en un .ico (los ICO admiten PNG embebido desde Vista) */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: icono
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // ancho
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // alto
    entry.writeUInt8(0, 2); // paleta
    entry.writeUInt8(0, 3); // reservado
    entry.writeUInt16LE(1, 4); // planos
    entry.writeUInt16LE(32, 6); // bits por pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const svg = await readFile(SVG, 'utf8');
const browser = await chromium.launch();

try {
  const rendered = new Map();

  for (const { size, file } of TARGETS) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!doctype html><style>
         html,body{margin:0;padding:0;width:${size}px;height:${size}px;background:transparent}
         svg{display:block;width:${size}px;height:${size}px}
       </style>${svg}`,
      { waitUntil: 'load' }
    );
    const data = await page.screenshot({ omitBackground: true });
    await writeFile(resolve(PUBLIC, file), data);
    rendered.set(size, data);
    await page.close();
    console.log(`  ${file.padEnd(22)} ${String(data.length).padStart(6)} bytes`);
  }

  const ico = buildIco([
    { size: 16, data: rendered.get(16) },
    { size: 32, data: rendered.get(32) },
  ]);
  await writeFile(resolve(PUBLIC, 'favicon.ico'), ico);
  console.log(`  ${'favicon.ico'.padEnd(22)} ${String(ico.length).padStart(6)} bytes (16 + 32 px)`);
} finally {
  await browser.close();
}
