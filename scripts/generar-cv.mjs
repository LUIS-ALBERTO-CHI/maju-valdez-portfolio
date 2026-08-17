#!/usr/bin/env node
/**
 * Regenera el PDF del CV a partir del diseño original.
 *
 * El CV original (`Maria Julia Valdez Navarro Curriculum 2025.pdf`) es un diseño
 * aplanado a una sola imagen de 2550x3300: 6.7 MB, sin una sola fuente embebida y
 * sin texto seleccionable. Este script reconstruye la misma maqueta con texto real,
 * reutilizando dos recortes del original (el bloque de la foto y la franja de
 * software) para conservar la foto, el círculo decorativo y los iconos.
 *
 * La experiencia laboral sale de src/data/experiencia.js — la misma fuente que
 * alimenta la sección del sitio, así que no pueden desincronizarse.
 *
 * Uso:  node scripts/generar-cv.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { EXPERIENCIAS } from '../src/data/experiencia.js';

const AQUI = dirname(fileURLToPath(import.meta.url));
const ASSETS = resolve(AQUI, 'cv-assets');
const SALIDA = resolve(AQUI, '../public/files/Maria Julia Valdez Navarro CV 2026.pdf');

/* ── Colores muestreados del diseño original ── */
const CREMA = '#E6E7E1'; // promedio de ~15 000 muestras del papel alrededor del recorte
const AZUL = '#92A1B6';
const AZUL_OSCURO = '#5C6E8A';
const TINTA = '#4A5568';

/* ── Geometría medida sobre el original (fracción de 3300 px de alto) ── */
const BANDA_TOP = (563 / 3300) * 100;
const BANDA_ALTO = ((1335 - 563) / 3300) * 100;
const FOTO_ANCHO = (1120 / 2550) * 100;
const FOTO_ALTO = (1400 / 3300) * 100;
const SOFTWARE_TOP = (2800 / 3300) * 100;

const PERFIL = {
  nombre: 'Maria Julia Valdez',
  subtitulo: 'Lic. en Mercadotecnia | Mérida, Yuc.',
  sobreMi:
    'Me apasiona el mundo del marketing y la innovación. Disfruto crear ' +
    'estrategias y contenido que conecten con las personas y den vida a las ' +
    'marcas en redes sociales.',
  telefono: '4931049183',
  email: 'majuvaldez482@gmail.com',
};

const EDUCACION = {
  institucion: 'Universidad Tecnológica Metropolitana',
  periodo: '2021 – 2025',
  titulo: 'Licenciada en Innovación de Negocios y Mercadotecnia',
};

const CURSOS = [
  'Taller de producción audiovisual',
  'Curso de Excel – 2021',
  'Curso email automation marketing DOPPLER – 2021',
  'Curso en análisis de la demanda – 2024',
  'Curso de marketing digital Google – 2025',
];

const esc = (t) =>
  String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const aDataUri = async (archivo) =>
  `data:image/png;base64,${(await readFile(resolve(ASSETS, archivo))).toString('base64')}`;

async function construirHtml() {
  const foto = await aDataUri('cv-foto.png');
  const software = await aDataUri('cv-software.png');

  const experiencia = EXPERIENCIAS.map(
    (e) => `
      <div class="puesto">
        <p class="puesto-empresa">${esc(e.company)}</p>
        <p class="puesto-cargo">${esc(e.date)} · ${esc(e.title)}</p>
        <ul>${e.tasks.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>`
  ).join('');

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  @page { size: 8.5in 11in; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 8.5in; height: 11in;
    position: relative;
    background: ${CREMA};
    font-family: 'Poppins', system-ui, sans-serif;
    color: ${TINTA};
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    overflow: hidden;
  }
  .banda      { position: absolute; left: 0; width: 100%; background: ${AZUL}; }
  .banda-sobre{ top: ${BANDA_TOP}%; height: ${BANDA_ALTO}%; }
  /*
    El recorte trae la textura de papel del original; el resto de la página es color
    plano. Difuminar el borde derecho e inferior disimula la junta — si no, se ve el
    rectángulo del recorte. La foto queda holgadamente dentro de la zona opaca.
  */
  .foto {
    position: absolute; top: 0; left: 0;
    width: ${FOTO_ANCHO}%; height: ${FOTO_ALTO}%;
    object-fit: fill;
    /* La foto acaba al 81% del ancho y el círculo al 87%: difuminar desde el 90%
       no los toca. Abajo, la banda azul acaba al 95.4%, así que el difuminado
       arranca después para no reblandecer su borde. */
    -webkit-mask-image:
      linear-gradient(to right,  #000 90%, transparent 100%),
      linear-gradient(to bottom, #000 96%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask-image:
      linear-gradient(to right,  #000 90%, transparent 100%),
      linear-gradient(to bottom, #000 96%, transparent 100%);
    mask-composite: intersect;
  }
  .software   { position: absolute; top: ${SOFTWARE_TOP}%; left: 0; width: 100%; }

  .nombre {
    position: absolute; left: 45.9%; top: 4.6%; right: 4%;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300; font-size: 40pt; line-height: 1.05;
    letter-spacing: 0.01em; color: ${AZUL};
  }
  .subtitulo {
    position: absolute; left: 46.2%; top: 12.1%; right: 4%;
    font-weight: 300; font-size: 12.5pt; letter-spacing: 0.01em; color: ${AZUL_OSCURO};
  }

  .sobre-titulo {
    position: absolute; left: 45.9%; top: 20.2%;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400; font-size: 26pt; color: #fff;
  }
  .sobre-linea { position: absolute; left: 62%; top: 22.6%; right: 4%; height: 1px; background: rgba(255,255,255,0.75); }
  .sobre-texto {
    position: absolute; left: 45.9%; top: 25.4%; right: 4.5%;
    font-weight: 300; font-size: 11pt; line-height: 1.55; color: #fff;
  }

  .contactos { position: absolute; left: 45.9%; top: 36.3%; display: flex; gap: 2.2%; }
  .pastilla {
    display: flex; align-items: center; gap: 7px;
    background: #C3D0E0; border-radius: 999px;
    padding: 5px 14px 5px 5px;
    font-size: 8.6pt; font-weight: 500; color: ${AZUL_OSCURO}; white-space: nowrap;
  }
  .pastilla svg { width: 21px; height: 21px; flex-shrink: 0; }

  .divisoria { position: absolute; left: 41.5%; top: 45.5%; width: 1px; height: 39%; background: rgba(146,161,182,0.55); }

  .col { position: absolute; }
  .col-izq { left: 6.5%; top: 46.4%; width: 33%; }
  .col-der { left: 45.9%; top: 46.4%; width: 48%; }

  h2 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400; font-size: 22pt; color: ${AZUL_OSCURO};
    margin-bottom: 10px;
  }
  .edu-inst  { font-size: 9.2pt; font-weight: 600; color: ${AZUL_OSCURO}; }
  .edu-per   { font-size: 9.2pt; font-weight: 500; color: ${AZUL_OSCURO}; margin-bottom: 5px; }
  .edu-tit   { font-size: 8.8pt; font-weight: 300; line-height: 1.45; }

  .cursos { margin-top: 26px; }
  .cursos ul { list-style: none; }
  .cursos li {
    position: relative; padding-left: 15px; margin-bottom: 9px;
    font-size: 8.6pt; font-weight: 300; line-height: 1.4;
  }
  .cursos li::before {
    content: ''; position: absolute; left: 0; top: 5px;
    width: 6px; height: 6px; border-radius: 50%; background: ${AZUL};
  }

  .col-der h2 { margin-bottom: 6px; }
  .puesto { margin-bottom: 9px; }
  .puesto:last-child { margin-bottom: 0; }
  .puesto-empresa { font-size: 10.5pt; font-weight: 600; color: ${AZUL_OSCURO}; }
  .puesto-cargo   { font-size: 9pt; font-weight: 500; color: ${AZUL_OSCURO}; margin-bottom: 4px; }
  .puesto ul { list-style: none; }
  .puesto li {
    position: relative; padding-left: 15px; margin-bottom: 2px;
    font-size: 8.5pt; font-weight: 300; line-height: 1.35;
  }
  .puesto li::before {
    content: '•'; position: absolute; left: 2px; top: -1px;
    color: ${AZUL}; font-size: 10pt;
  }
</style></head>
<body>
  <div class="banda banda-sobre"></div>
  <img class="foto" src="${foto}" alt="">

  <div class="nombre">${esc(PERFIL.nombre)}</div>
  <div class="subtitulo">${esc(PERFIL.subtitulo)}</div>

  <div class="sobre-titulo">Sobre mi</div>
  <div class="sobre-linea"></div>
  <div class="sobre-texto">${esc(PERFIL.sobreMi)}</div>

  <div class="contactos">
    <span class="pastilla">
      <svg viewBox="0 0 24 24" fill="${AZUL_OSCURO}"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
      ${esc(PERFIL.telefono)}
    </span>
    <span class="pastilla">
      <svg viewBox="0 0 24 24" fill="${AZUL_OSCURO}"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
      ${esc(PERFIL.email)}
    </span>
  </div>

  <div class="divisoria"></div>

  <div class="col col-izq">
    <h2>Educación</h2>
    <p class="edu-inst">${esc(EDUCACION.institucion)}</p>
    <p class="edu-per">${esc(EDUCACION.periodo)}</p>
    <p class="edu-tit">${esc(EDUCACION.titulo)}</p>

    <div class="cursos">
      <h2>Cursos</h2>
      <ul>${CURSOS.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
    </div>
  </div>

  <div class="col col-der">
    <h2>Experiencia laboral</h2>
    ${experiencia}
  </div>

  <img class="software" src="${software}" alt="">
</body></html>`;
}

const navegador = await chromium.launch();
try {
  // 816x1056 = 8.5x11 in a 96 dpi, para que la vista previa quepa entera
  const pagina = await navegador.newPage({ viewport: { width: 816, height: 1056 } });
  await pagina.setContent(await construirHtml(), { waitUntil: 'networkidle' });
  await pagina.emulateMedia({ media: 'print' });

  // La franja de software tapa lo que se salga: comprobar que la columna cabe
  const holgura = await pagina.evaluate(() => {
    const col = document.querySelector('.col-der').getBoundingClientRect();
    const franja = document.querySelector('.software').getBoundingClientRect();
    return Math.round(franja.top - col.bottom);
  });
  if (holgura < 0) {
    throw new Error(
      `La experiencia se desborda ${-holgura}px por debajo de la franja de software. ` +
        'Reduce el espaciado de .puesto o el tamaño de letra.'
    );
  }
  console.log(`  holgura bajo la última viñeta: ${holgura}px`);

  const pdf = await pagina.pdf({
    width: '8.5in',
    height: '11in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: '1',
  });
  await writeFile(SALIDA, pdf);

  // Vista previa para revisar el resultado sin abrir el PDF
  if (process.env.PREVIEW) {
    await pagina.screenshot({ path: process.env.PREVIEW, fullPage: false, clip: { x: 0, y: 0, width: 816, height: 1056 } });
  }
  // PREVIEW_ZOOM="ruta:x,y,w,h" — recorte ampliado, útil para revisar juntas y bordes
  if (process.env.PREVIEW_ZOOM) {
    const [ruta, caja] = process.env.PREVIEW_ZOOM.split('=');
    const [x, y, width, height] = caja.split(',').map(Number);
    const lupa = await navegador.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 4 });
    await lupa.setContent(await construirHtml(), { waitUntil: 'networkidle' });
    await lupa.screenshot({ path: ruta, clip: { x, y, width, height } });
    await lupa.close();
  }

  console.log(`✓ CV generado: ${SALIDA}`);
  console.log(`  ${(pdf.length / 1024).toFixed(0)} kB · ${EXPERIENCIAS.length} puestos`);
} finally {
  await navegador.close();
}
