---
name: Maju Valdez — Portafolio
description: Un estudio creativo rosa y luminoso donde el trabajo real de Maju se expone como en galería.
colors:
  rosa-chicle: "#f06c88"
  frambuesa: "#C93A5E"
  rosa-algodon: "#F4A7B9"
  ciruela-texto: "#73434F"
  malva-secundario: "#925565"
  petalo: "#FDE8EC"
  nacar: "#FFF9FA"
  borde-rosado: "#F8D3DA"
  blanco-tarjeta: "#FFFFFF"
  gris-alterno: "#F8F9FA"
  verde-whatsapp: "#25d366"
  noche-carbon: "#0f0f11"
  noche-tarjeta: "#1a1720"
  noche-elemento: "#241e2b"
  noche-texto: "#f0e6eb"
  noche-malva: "#a78b96"
  noche-chicle: "#f472b6"
  noche-algodon: "#f9a8d4"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.4rem, 11vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.4
  label-caps:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
  firma:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(4rem, 14vw, 7rem)"
    fontWeight: 800
    lineHeight: 1
rounded:
  xs: "10px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.frambuesa}"
    textColor: "{colors.blanco-tarjeta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline-on-photo:
    backgroundColor: "transparent"
    textColor: "{colors.blanco-tarjeta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  chip:
    backgroundColor: "{colors.petalo}"
    textColor: "{colors.malva-secundario}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.blanco-tarjeta}"
    textColor: "{colors.ciruela-texto}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.petalo}"
    textColor: "{colors.ciruela-texto}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "11px 14px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ciruela-texto}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.frambuesa}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
---

# Design System: Maju Valdez — Portafolio

## Overview

**Creative North Star: "El estudio rosa"**

El sitio es un estudio creativo luminoso. Las paredes son un degradado nácar con manchas de color rosa flotando detrás de todo y un grano fino encima, como luz entrando por una ventana. Sobre esas paredes hay superficies de vidrio (la barra de navegación en píldora, la burbuja de "Hola!", el menú móvil con desenfoque) y, colgadas como en galería, las piezas reales: una baraja de diseños abanicada, miniaturas de video, collages de fotos y recomendaciones escritas sobre ondas. La interfaz acompaña; el trabajo es lo que se mira.

El tono es juguetón, fresco y femenino. El rosa no es un acento tímido: tiñe fondos, bordes, sombras y manchas, y el modo oscuro conserva el mismo tinte cálido en lugar de pasarse a grises fríos. La energía viene del movimiento: todo lo interactivo es redondo y "salta" al tacto, se levanta dos píxeles, crece un poco, deja una sombra rosada. Nada es rígido ni corporativo, pero el acabado es pulido: contrastes AA medidos, tipografía ajustada, transiciones con una sola curva.

Rechazos confirmados: esquinas rectas y grises de plantilla; rosa infantil, purpurina, corazones o rosa saturado en áreas grandes; modo oscuro frío o azulado.

**Key Characteristics:**
- Dos rosas con papeles distintos: Rosa Chicle decora, Frambuesa funciona.
- Fondo vivo: degradado nácar, tres manchas flotantes y grano fino en todas las secciones.
- Todo redondo: píldoras para lo interactivo, 16 a 24 px para tarjetas, círculos para avatares y nodos.
- Vidrio en la cromática flotante: navbar, burbuja y menú móvil llevan desenfoque de fondo.
- Movimiento con una sola curva (cubic-bezier(0.22, 1, 0.36, 1)) para revelados, hovers y la baraja.
- Modo oscuro cálido: carbón con tinte ciruela, acentos rosa más brillantes.

## Colors

Una paleta monocromática rosa, cálida de punta a punta, donde la jerarquía se construye con saturación y no con cambios de tono.

### Primary
- **Rosa Chicle** (#f06c88): el rosa de marca, decorativo. Manchas de fondo, degradados de la línea bajo los títulos, bordes de la línea de tiempo, brillos y sombras rosadas. Nunca lleva texto blanco encima en modo claro: da 2.91:1.
- **Frambuesa** (#C93A5E): el rosa funcional. Botón principal, texto de acento ("Maju" en el hero, enlaces activos, estrellas, empresa en la ficha de vivencias), iconos sobre fondo claro. Da 4.94:1 sobre blanco. En oscuro se sustituye por Chicle Nocturno (#f472b6) con texto oscuro encima.
- **Rosa Algodón** (#F4A7B9): el rosa suave. Segunda palabra de cada título de sección, borde al pasar el cursor sobre tarjetas, halo de la foto de perfil, extremo claro de los degradados.

### Tertiary
- **Verde WhatsApp** (#25d366): un solo uso, el botón flotante de contacto. Es el único color fuera del rosa y por eso llama.

### Neutral
- **Ciruela Texto** (#73434F): todo el texto principal, títulos y logotipo "MAJU". Es un marrón rosado, no un negro.
- **Malva Secundario** (#925565): texto secundario, fechas, lugares, descripciones, etiquetas. Pasa AA sobre los tres fondos claros.
- **Pétalo** (#FDE8EC): fondo de chips, campos de texto en reposo y elementos interactivos pequeños.
- **Nácar** (#FFF9FA): fondo base de la página; detrás se pinta el degradado de #fff7f8 a #fff1f3.
- **Borde Rosado** (#F8D3DA): bordes de tarjetas, separadores, puntos inactivos del paginador.
- **Blanco Tarjeta** (#FFFFFF): superficie de tarjetas y píldoras.
- **Gris Alterno** (#F8F9FA): fondo de secciones alternas y del nodo de la línea de tiempo.

### Modo oscuro
- **Noche Carbón** (#0f0f11) como fondo, **Noche Tarjeta** (#1a1720) para superficies, **Noche Elemento** (#241e2b) para chips y campos.
- **Noche Texto** (#f0e6eb) y **Noche Malva** (#a78b96) para la jerarquía de texto.
- **Chicle Nocturno** (#f472b6) toma los dos roles rosa (decorativo y funcional) y **Algodón Nocturno** (#f9a8d4) el suave. Los bordes son el rosa al 12 % de opacidad.

### Named Rules
**La regla de los dos rosas.** Rosa Chicle decora y Frambuesa funciona. Lo que lleva texto o icono encima, o es texto, usa Frambuesa; manchas, degradados, bordes y sombras usan Chicle. Si un rosa nuevo no cabe en uno de los dos papeles, no entra.

**La regla del oscuro cálido.** El modo oscuro cambia los valores, no la temperatura: fondos carbón con tinte ciruela, bordes rosa translúcidos, acentos rosa más brillantes. Ningún gris frío ni azul.

**La regla del verde único.** Fuera del rosa solo existe el verde de WhatsApp y solo en el botón flotante. Las marcas sociales (Facebook, Instagram) usan sus colores oficiales dentro de sus botones y en ningún otro sitio.

## Typography

**Display Font:** Inter (con sans-serif)
**Body Font:** Inter (con sans-serif)
**Firma Font:** Poppins (con sans-serif), solo en momentos de identidad

**Character:** Inter lo hace casi todo: grande y apretada en los títulos, cómoda y aireada en el cuerpo. Poppins aparece como firma en los momentos de marca (las letras del splash, el menú móvil, la píldora de WhatsApp, títulos de tarjeta de firma) y da ese toque redondo y juguetón.

### Hierarchy
- **Display** (700, clamp(2.4rem, 11vw, 3.75rem), 1.1): el "Soy Maju," del hero, con "Maju" en Frambuesa. Debajo va un h2 regular de 2.25rem con cursor de máquina de escribir.
- **Headline** (700, clamp(2rem, 4vw, 3rem), 1.02, -0.01em): títulos de sección, centrados, con una línea de 72 × 4 px en degradado Chicle a Algodón que se despliega al entrar en pantalla.
- **Title** (700, 1rem a 1.45rem, 1.25 a 1.3): nombre de empresa, puesto, nombre de cuenta, título de vivencia.
- **Body** (400, 0.95rem, 1.6 a 1.7): descripciones, viñetas de tareas, párrafos de recomendación. Ancho máximo de lectura 560 a 600 px.
- **Label** (600, 0.75 a 0.82rem, 1.4): chips, fechas, lugares, handles, texto de botones (700 en botones).
- **Label Caps** (500, 0.875rem, 0.16em, mayúsculas): el nombre completo bajo el hero y el eslogan del splash (Poppins, 0.18em).
- **Firma** (Poppins 800, clamp(4rem, 14vw, 7rem), 1): las letras "MAJU" del splash en Frambuesa.

### Named Rules
**La regla de la segunda palabra.** Cada título de sección son dos palabras: la primera en Ciruela Texto, la segunda en Rosa Algodón con peso 800. "Experiencia Laboral", "Mis Diseños", "Cuentas que Gestiono".

**Inter habla, Poppins firma.** Poppins no se usa para cuerpo ni para títulos de sección. Entra solo donde la marca se presenta a sí misma.

## Layout

Una sola página vertical con secciones apiladas, cada una con 80 px de aire arriba y abajo (5rem) y 20 px laterales en móvil. Los contenedores se centran: 1200 px para hero y barra de navegación, 900 a 980 px para rejillas de tarjetas, 560 px para subtítulos y párrafos sueltos. No hay rejilla de columnas fija: cada sección elige su forma (tres columnas en el hero de escritorio, timeline de dos columnas con línea central, rejilla auto-fill de 320 a 400 px para cuentas, tarjeta partida fotos/texto para vivencias).

La barra de navegación es una píldora fija a 20 px del borde superior, 90 % de ancho y 1200 px máximo, que se esconde brevemente al hacer scroll. En móvil (< 1024 px) se sustituye por un menú a pantalla completa con desenfoque.

Ritmo de espaciado: 8 px entre elementos de un mismo grupo (iconos y texto, fotos del collage), 12 a 20 px dentro de tarjetas, 24 a 28 px entre tarjetas, 48 px entre bloques de una sección, 3rem bajo cada título de sección.

Puntos de quiebre observados: 480 px (xs), 640 px (sm), 768 px (md), 900 px (tarjetas en una columna), 1024 px (menú de escritorio, hero de tres columnas), 1280 px (tamaño completo de la baraja).

## Elevation & Depth

Profundidad estructural en tres niveles, siempre con sombras suaves y amplias, nunca duras. Nivel 1, tarjeta en reposo: sombra baja y difusa más borde rosado, lo justo para despegarse del nácar. Nivel 2, tarjeta activa o al pasar el cursor: se levanta de 4 a 6 px y la sombra crece y se oscurece. Nivel 3, cromática flotante: la barra de navegación, la burbuja del hero y el botón de WhatsApp viven encima de todo con sombra larga y, en navbar y burbuja, vidrio con desenfoque. Las sombras de acento rosa marcan lo que se puede tocar: botones y nodos activos.

### Shadow Vocabulary
- **Tarjeta en reposo** (`box-shadow: 0 6px 20px rgba(0,0,0,0.08)`): tarjetas, píldora del paginador.
- **Tarjeta elevada** (`box-shadow: 0 16px 36px rgba(0,0,0,0.12)`): tarjeta al pasar el cursor, junto a `translateY(-6px)` y borde Rosa Algodón.
- **Cromática flotante** (`box-shadow: 0 14px 40px rgba(0,0,0,0.12)`): barra de navegación; en oscuro la misma geometría al 55 %.
- **Acento chico** (`box-shadow: 0 4px 15px rgba(240,108,136,0.2)`): botones y chips tocables en reposo.
- **Acento medio** (`box-shadow: 0 8px 25px rgba(240,108,136,0.3)`): botón principal al pasar el cursor.
- **Acento grande** (`box-shadow: 0 15px 40px rgba(240,108,136,0.25)`): foto de perfil y piezas destacadas.
- **Anillo de foco** (`box-shadow: 0 0 0 3px color-mix(in srgb, #f06c88 16%, transparent)`): campos de texto enfocados.
- **WhatsApp** (`box-shadow: 0 6px 24px rgba(37,211,102,0.45)`): solo el botón flotante.

### Named Rules
**La regla de los tres niveles.** Reposo, elevado, flotante. Una sombra nueva tiene que caber en uno de los tres; si no, usa el borde rosado y nada más.

**La sombra rosa es tacto.** Una sombra con tinte Chicle significa "esto se puede pulsar". No se pone en texto, fondos ni separadores.

## Shapes

Nada recto. El radio mínimo es 10 px y aparece solo en detalles pequeños; las tarjetas usan de 16 a 24 px según su tamaño (16 px cursos y fotos, 20 px cuentas y timeline, 24 px vivencias); todo lo interactivo pequeño es una píldora (botones, chips, paginador, navbar a 60 px); avatares, nodos de timeline y botones de icono son círculos. Las fotos dentro de collages se recortan a 16 px en el contenedor con 8 px de separación. Los bordes son de 1 a 1.5 px en Borde Rosado y pasan a Rosa Algodón al interactuar. Las esquinas del pie de página y de algunos paneles se abren en arcos grandes (40 px y 600 px) para rematar la página con una curva.

## Components

### Buttons
Redondos y saltarines: píldoras llenas que se levantan y crecen al tacto.
- **Shape:** píldora completa (999px)
- **Primary:** fondo Frambuesa, texto blanco 600 a 700, 12 × 24 px, ancho mínimo 160 px en el hero. En oscuro, fondo Chicle Nocturno con texto Noche Tarjeta.
- **Hover / Focus:** `translateY(-2px)` a 180 ms con la curva de la casa y sombra Acento medio; foco visible con anillo rosa de 3 px.
- **Outline on photo:** transparente, texto blanco, borde blanco de 2 px; vive solo sobre la foto de perfil.
- **Gradient (formulario de testimonio):** degradado 135° de Chicle a Algodón, texto blanco 700, sombra rosa al 38 % que sube al 50 % en hover; deshabilitado al 55 % de opacidad.
- **Social:** píldoras con el color oficial de cada red (Facebook #1877F2, degradado de Instagram), icono de 16 px y etiqueta; suben 2 px al pasar el cursor.
- **Icon (paginador):** círculo transparente de 24 px que se llena de Frambuesa con icono blanco y `scale(1.1)` en hover, `scale(0.95)` al pulsar.

### Chips
- **Style:** fondo Pétalo, texto Malva Secundario 600 de 0.75rem, borde 1 px Borde Rosado, píldora, 4 × 12 px. Las etiquetas de vivencias llevan "#" delante.
- **State:** solo informativas; no hay chips seleccionables.

### Cards / Containers
- **Corner Style:** 16 a 24 px según tamaño (ver Shapes)
- **Background:** Blanco Tarjeta; Noche Tarjeta en oscuro
- **Shadow Strategy:** Tarjeta en reposo, Tarjeta elevada al pasar el cursor con `translateY(-4px a -6px)`
- **Border:** 1 a 1.5 px Borde Rosado, Rosa Algodón al pasar el cursor; los cursos añaden una franja de color propia arriba
- **Internal Padding:** 18 a 20 px; 12 px en móvil

### Inputs / Fields
- **Style:** fondo Pétalo, borde 1.5 px Borde Rosado, 12 px de radio, 11 × 14 px, texto Ciruela, placeholder Malva al 70 %
- **Focus:** borde Chicle, anillo rosa de 3 px, fondo pasa a Blanco Tarjeta
- **Error / Disabled:** sin estado de error diseñado; los botones deshabilitados bajan al 55 %

### Navigation
- **Style:** píldora de vidrio fija (degradado blanco al 98 a 95 %, desenfoque de 20 px, borde negro al 6 %, sombra Cromática flotante), logotipo "MAJU" en Inter 700 de 1.5rem a la izquierda, enlaces al centro, cambio de tema a la derecha.
- **Links:** 0.875rem 500 con icono de 15 px, 10 × 20 px, radio 20 px; hover sube 2 px y pasa a Frambuesa; activo en Frambuesa 700. "Portafolio" abre un desplegable con Diseños, Cuentas y Videos. Entre 1024 y 1279 px el padding lateral baja a 0.8rem.
- **Mobile:** overlay a pantalla completa con fondo nácar al 92 % y desenfoque de 24 px, enlaces en Poppins de 1.05 a 1.25rem con icono en caja de 40 px y radio 12 px, el activo en Frambuesa sobre rosa al 10 %, entrada escalonada de 45 ms por elemento.

### Section title (signature)
Dos palabras centradas en Headline, la segunda en Rosa Algodón 800, y debajo una línea de 72 × 4 px en degradado Chicle a Algodón que crece desde el centro (`scaleX(0)` a `scaleX(1)`, 420 ms) cuando la sección entra en pantalla.

### Fanned deck (signature)
La galería de diseños es una baraja de tarjetas de proporción 4:5 que se abanica al pasar el cursor: cada tarjeta rota 20° por posición y baja un 22 % de su ancho, la activa escala a 1.05 y muestra su título encima. Un paginador en píldora con punto activo alargado (8 a 28 px) la recorre. Resortes de framer-motion con rebote 0.1 a 0.2 y 800 ms; con `prefers-reduced-motion` se conservan las opacidades y se quitan los desplazamientos.

### Timeline
Dos columnas con una línea central y nodos circulares de 14 px con borde Chicle de 2 px; el puesto actual se rellena de Frambuesa. Empresa y fechas a la izquierda, puesto y viñetas con punto rosa a la derecha. En móvil se apila con la línea al margen.

### Floating WhatsApp button
Píldora verde (#25d366) con icono y "¡Hablemos!" en Poppins 600 de 0.82rem, sombra verde, entra con una animación de 600 ms y se contrae a círculo cuando no hay espacio.

## Do's and Don'ts

### Do:
- **Do** usar Frambuesa (#C93A5E) para todo texto rosa y todo fondo con texto encima; Rosa Chicle (#f06c88) queda para manchas, degradados, bordes y sombras.
- **Do** redondear todo: píldora para lo interactivo pequeño, 16 a 24 px para tarjetas, círculo para avatares y nodos.
- **Do** hacer que lo tocable responda: `translateY(-2px)` en botones, `translateY(-4px a -6px)` en tarjetas, con la curva cubic-bezier(0.22, 1, 0.36, 1) entre 180 y 300 ms.
- **Do** revelar cada sección con `fade-in` (16 px hacia arriba, 600 ms) y escalonar tarjetas a 90 ms.
- **Do** mantener el modo oscuro cálido: fondos #0f0f11 y #1a1720, bordes rosa translúcidos, acentos #f472b6 y #f9a8d4.
- **Do** escribir los títulos de sección en dos palabras con la segunda en Rosa Algodón.
- **Do** respetar `prefers-reduced-motion`: mantener opacidad, quitar desplazamientos y rotaciones.

### Don't:
- **Don't** usar esquinas rectas ni radios menores de 10 px en nada visible.
- **Don't** meter grises corporativos: los neutros son marrones y malvas rosados, el único gris (#F8F9FA) es fondo alterno.
- **Don't** poner texto blanco sobre Rosa Chicle en modo claro, ni texto blanco sobre el acento en modo oscuro.
- **Don't** caer en rosa infantil: nada de purpurina, corazones, unicornios ni rosa saturado cubriendo áreas grandes.
- **Don't** enfriar el modo oscuro con azules o grises neutros.
- **Don't** usar Poppins para cuerpo o títulos de sección.
- **Don't** añadir un segundo color de acento: fuera del rosa solo existe el verde del botón de WhatsApp y los colores oficiales de cada red social dentro de sus botones.
