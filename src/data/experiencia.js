/**
 * Experiencia laboral — fuente única.
 * La consumen la sección del sitio (ExperienceSection) y el generador del CV
 * (scripts/generar-cv.mjs), para que no puedan quedar desincronizadas.
 */
export const EXPERIENCIAS = [
  {
    company: 'Fogysa',
    date: 'Noviembre 2025 - Actual',
    location: 'Mérida, Yucatán',
    title: 'Community Manager',
    current: true,
    tasks: [
      'Diseño de contenido para redes sociales.',
      'Atención a clientes a través de redes sociales.',
      'Desarrollo de guiones creativos para videos.',
      'Edición de videos para plataformas digitales.',
    ],
  },
  {
    company: 'Grupo Tikal Corporativo Inmobiliario',
    date: '1 Año',
    location: 'Mérida, Yucatán',
    title: 'Auxiliar de Mercadotecnia',
    current: false,
    tasks: [
      'Creación y gestión de contenido para redes sociales.',
      'Atención a clientes a través de redes sociales y llamadas.',
      'Desarrollo de guiones creativos para videos.',
      'Presencia frente a cámara para materiales audiovisuales.',
    ],
  },
  {
    company: 'Panificadora El Retorno',
    date: 'Enero 2025 - Abril 2025',
    location: 'Mérida, Yucatán',
    title: 'Auxiliar de Mercadotecnia (Prácticas)',
    current: false,
    tasks: [
      'Creación, edición y publicación de contenido digital.',
      'Atención y gestión de clientes a través de redes sociales.',
      'Apoyo en la organización y ejecución de eventos.',
      'Diseño y elaboración de materiales publicitarios.',
    ],
  },
];
