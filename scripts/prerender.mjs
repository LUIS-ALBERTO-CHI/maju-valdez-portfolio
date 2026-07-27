#!/usr/bin/env node
/**
 * Prerenderiza el HTML del sitio después de `vite build`.
 *
 * El sitio es una SPA: el HTML que se publica es un `<div id="root"></div>` vacío
 * y todo el contenido lo pinta React. Los rastreadores que no ejecutan JavaScript
 * no ven ni el nombre ni una sola sección, y los que sí lo ejecutan tampoco hacen
 * scroll, así que nunca disparan el IntersectionObserver que revela las secciones.
 *
 * Este script abre el sitio ya construido en Chromium, lo recorre para que se
 * resuelvan los import() diferidos y se revelen todas las secciones, y vuelca el
 * DOM resultante dentro de `dist/index.html`. React lo reemplaza al montar, así
 * que no cambia el comportamiento para quien navega con JavaScript activo.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright';

const DIST = resolve(process.cwd(), 'dist');
const INDEX = join(DIST, 'index.html');
const ROOT_MARKER = '<div id="root"></div>';
const VIEWPORT = { width: 1440, height: 1000 };

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
};

/** Servidor estático mínimo sobre dist/, con fallback a index.html */
function serveDist() {
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let filePath = join(DIST, normalize(pathname).replace(/^(\.\.[/\\])+/, ''));
      let info = await stat(filePath).catch(() => null);

      if (info?.isDirectory()) {
        filePath = join(filePath, 'index.html');
        info = await stat(filePath).catch(() => null);
      }
      if (!info) filePath = INDEX;

      res.writeHead(200, {
        'Content-Type': MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
      });
      res.end(await readFile(filePath));
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });

  return new Promise((ready) => server.listen(0, '127.0.0.1', () => ready(server)));
}

let server;
let browser;

try {
  const original = await readFile(INDEX, 'utf8');
  if (!original.includes(ROOT_MARKER)) {
    throw new Error(`No se encontró "${ROOT_MARKER}" en dist/index.html — ¿ya estaba prerenderizado?`);
  }

  server = await serveDist();
  const base = `http://127.0.0.1:${server.address().port}`;

  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });

  // El splash solo se muestra una vez por sesión. Lo marcamos como visto para que
  // el snapshot capture el contenido real y no la pantalla de carga.
  await page.addInitScript(() => sessionStorage.setItem('splashShown', '1'));

  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#root')?.children.length > 0, {
    timeout: 30_000,
  });

  // Recorre la página entera: dispara los import() diferidos de cada sección y
  // los IntersectionObserver que las revelan.
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.75);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await pause(250);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await pause(700);
    window.scrollTo(0, 0);
  });

  await page.waitForSelector('footer', { timeout: 20_000 });
  await page.waitForTimeout(800);

  const { html: rootHtml, sections, revealed } = await page.evaluate(() => {
    // Las secciones nacen en opacity:0 y solo se revelan al entrar en pantalla.
    // En el snapshot las dejamos reveladas: ningún rastreador hace scroll.
    const hidden = document.querySelectorAll('.fade-in:not(.visible)');
    hidden.forEach((el) => el.classList.add('visible'));
    return {
      html: document.getElementById('root').innerHTML,
      sections: document.querySelectorAll('section, main, footer').length,
      revealed: hidden.length,
    };
  });

  if (rootHtml.length < 5_000) {
    throw new Error(`El snapshot salió sospechosamente corto (${rootHtml.length} bytes) — se aborta.`);
  }

  await writeFile(INDEX, original.replace(ROOT_MARKER, `<div id="root">${rootHtml}</div>`), 'utf8');

  const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
  console.log(
    `✓ prerender: ${sections} bloques (${revealed} revelados a mano), ` +
      `index.html ${kb(original.length)} → ${kb(original.length + rootHtml.length)}`
  );
} catch (err) {
  console.error(`✗ prerender falló: ${err.message}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
  server?.close();
}
