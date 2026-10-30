# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Audiencia principal: reclutadores, responsables de recursos humanos y jefes de marketing de empresas en Mérida, Yucatán (y el resto de México) que evalúan a Maju para un puesto fijo de Community Manager o marketing digital. Llegan desde LinkedIn o desde el CV, muchas veces en el celular, y abren el sitio para comprobar que el trabajo es real y de calidad antes de contactarla.

Audiencia secundaria (evidencia del repo, no confirmada como prioridad): negocios locales que buscan quién les gestione redes por proyecto. Hoy el sitio ya muestra cuentas que gestiona (constructoras, una agencia creativa), pero el diseño no debe inclinarse hacia ellos.

Mantenedor: Luis A. Casanova, desarrollador, mantiene el código. Maju aporta el contenido (posts de LinkedIn, fotos, diseños, videos).

## Product Purpose

Portafolio personal de María Julia "Maju" Valdez Navarro, Community Manager. Existe para que un reclutador vea su trabajo real (diseños, videos, cuentas, recomendaciones) y se convenza de contactarla.

Éxito: el visitante recorre el trabajo y da el paso de conectar en LinkedIn. La descarga del CV y el botón de WhatsApp son caminos de apoyo, no la conversión principal.

## Positioning

Tres hechos confirmados que la distinguen de otros community managers de la zona:

1. Cubre el ciclo completo sin equipo detrás: diseña las piezas, graba, aparece frente a cámara, edita el video y gestiona la comunidad.
2. Conoce el nicho de mascotas y agro: ha trabajado marcas como Nupec, Nucan, Fogysa, Kubota y Virbac y maneja su lenguaje técnico.
3. Toma decisiones con datos: certificaciones de Google (estadística y análisis de campañas) y Doppler.

## Operating Context

- Sitio público en https://majuvaldez.qzz.io, en español, de una sola página con anclas por sección más la ruta /testimonio.
- Se publica en GitHub Pages con cada push a main (.github/workflows/deploy.yml). El build corre un prerender con Playwright que vuelca el HTML de todas las secciones para buscadores.
- Los videos pesan y se sirven desde Cloudflare R2 (src/config/r2.js); no se suben al repo.
- Los testimonios se capturan en /testimonio y se guardan en Firestore (solo creación, sin edición ni borrado).
- El CV en PDF se genera desde src/data/experiencia.js con scripts/generar-cv.mjs; esa lista es la fuente única de los puestos para el sitio y el CV.
- El contenido nuevo llega como capturas de LinkedIn y fotos de celular; se convierte y guarda en public/files/.

## Capabilities and Constraints

- Secciones actuales en orden: inicio (hero con CV y enlace al portafolio), marcas, experiencia laboral, vivencias laborales (eventos con fotos), educación y cursos, certificaciones, diseños, cuentas que gestiona, videos, recomendaciones, software, pie.
- Modo claro y oscuro con transición animada; pantalla de splash una vez por sesión; cursor personalizado; botón flotante de WhatsApp.
- Stack: React 19 + Vite, Tailwind con tokens propios en src/index.css, framer-motion, embla, lucide-react, shadcn/radix para algunos componentes, Firebase para testimonios.
- Un solo idioma (español). No hay CMS: el contenido vive en archivos de datos y componentes.
- Sin decidir: si los posts de LinkedIn deben enlazarse desde cada vivencia; si las cuentas gestionadas deben mostrar resultados numéricos.

## Brand Commitments

- Nombre: "MAJU" en el logotipo del menú; "Maju Valdez" en títulos y metadatos; nombre completo "María Julia Valdez Navarro" en CV y SEO.
- Voz: primera persona de Maju, español mexicano, cercano pero profesional. Todo texto del sitio se redacta como si ella hablara y se marca como borrador para que lo ajuste.
- Identidad visual vigente (evidencia, no ampliar aquí): paleta rosa con acento fuerte #C93A5E sobre fondos claros rosados, tipografías Poppins e Inter, tarjetas redondeadas. Está documentada en los tokens de src/index.css.
- Logos de marcas con las que ha trabajado se muestran en la franja de marcas; son marcas reales de sus empleadores y clientes, no se agregan otras sin confirmación.
- Afirmación en el hero: "2 Años de experiencia". Actualizarla con el tiempo, no inflarla.

## Evidence on Hand

- Diseños reales (15 piezas) en public/files/ y public/files/ENERO MASCOTAS/, listados en src/components/ProyectosSection.jsx con descripciones.
- Videos reales (reels y spots para Kubota, Nupec, Tikal, belleza) en R2, listados en src/components/VideosSection.jsx.
- Cinco recomendaciones reales de LinkedIn, con nombre, cargo, relación y fecha, en src/components/RecomendacionesSection.jsx; fotos en public/files/recomendaciones/.
- Cuentas gestionadas con enlaces reales a Facebook e Instagram en src/components/CuentasSection.jsx.
- Fotos de la visita a la planta de Nupec (julio 2026) en public/files/vivencias/.
- Certificaciones de Google y cursos (UTM, Doppler, Google) en EducationSection y CertificationsSection.
- CV actual: public/files/Maria Julia Valdez Navarro CV 2026.pdf.
- Ausencias que no se deben inventar: no hay métricas de resultados de campañas (alcance, crecimiento, ventas), ni testimonios de clientes fuera de LinkedIn, ni premios.

## Product Principles

1. El trabajo real manda: cada sección muestra piezas, videos o cuentas verificables antes que adjetivos.
2. Pensado para un reclutador con prisa en el celular: lo esencial se entiende en el primer recorrido, y el camino a LinkedIn siempre está a mano.
3. Nada inflado: cifras, marcas y recomendaciones son reales y rastreables; lo que no existe no se simula.
4. Contenido fácil de alimentar: Maju manda fotos y textos, Luis los agrega a un archivo de datos sin tocar el diseño.
5. La voz es de Maju: el sitio habla en su primera persona y mantiene su calidez.

## Accessibility & Inclusion

- Contraste AA en texto sobre todos los fondos claros y oscuros; los tokens de src/index.css ya documentan los ajustes hechos y deben conservarse.
- Respeto a prefers-reduced-motion en animaciones y carruseles.
- Lectores de pantalla: todas las imágenes de trabajo llevan alt descriptivo en español; los botones de foto y navegación tienen aria-label.
