/**
 * Recomendaciones reales recibidas en LinkedIn — fuente única.
 * Las consumen la sección (RecomendacionesSection) y el hero, que muestra
 * cuántas hay. Para agregar una, añade un objeto a la lista.
 *
 * `relacion` reproduce el contexto que LinkedIn muestra bajo cada recomendación:
 * es lo que les da credibilidad, así que se conserva textual.
 *
 * `foto` es opcional. Si falta —o si el archivo no existe todavía— se cae a las
 * iniciales sobre un color derivado del nombre. Las fotos van en
 * public/files/recomendaciones/ (ver el LEEME.md de esa carpeta).
 */
export const RECOMENDACIONES = [
  {
    nombre: 'Rafael Enriquez Martinez',
    cargo: 'Coordinador Regional Comercial Sureste · Ex Cargill · Ex Nestlé',
    foto: '/files/recomendaciones/rafael.jpg',
    relacion: 'Ocupaba un cargo superior, sin supervisión directa',
    fecha: '20 de agosto de 2026',
    parrafos: [
      'María Julia combina pensamiento creativo, visión estratégica y agilidad colaborativa. Destaca por su capacidad para adaptarse a entornos dinámicos, diseñar campañas orientadas al crecimiento de marca y optimizar recursos para alcanzar consistentemente los objetivos del negocio mediante decisiones basadas en datos.',
    ],
  },
  {
    nombre: 'Alejandro Poot',
    cargo: 'Productor Audiovisual · Diseñador Digital',
    foto: '/files/recomendaciones/alejandro-poot.jpg',
    relacion: 'Ocupaba un cargo superior, sin supervisión directa',
    fecha: '12 de marzo de 2026',
    parrafos: [
      'Tuve la oportunidad de trabajar con María Julia Valdez y puedo decir que es una community manager excepcional. Destaca por su creatividad, su capacidad para generar contenido relevante y por entender muy bien cómo conectar con la audiencia de cada marca.',
      'Además de su talento creativo, es una profesional muy comprometida y proactiva. Siempre está atenta a nuevas tendencias, formatos y oportunidades para mejorar la presencia digital de las cuentas que gestiona.',
      'Trabajar con ella es garantía de ideas frescas, responsabilidad y una ejecución impecable. Sin duda, María Julia aporta un gran valor a cualquier proyecto de marketing digital o comunicación.',
    ],
  },
  {
    nombre: 'Karen Quijano',
    cargo: 'Lic. Mercadotecnia y Publicidad',
    // Sin foto: se muestran las iniciales
    relacion: 'Supervisó directamente a Maju',
    fecha: '30 de enero de 2026',
    parrafos: [
      'Una creativa en toda la extensión de la palabra, Julia es una profesional del área de marketing con buenas ideas, claras y que sabe cómo ejecutarlas, tiene un buen desenvolvimiento en la cámara y es hábil para desarrollarse en otras áreas. 🎨📊💻',
    ],
  },
  {
    nombre: 'Jorge Carlos Preciado Cicero',
    cargo: 'Content Marketing · Social Media · Meta Business Suite',
    foto: '/files/recomendaciones/jorge-carlos-preciado.jpg',
    relacion: 'Supervisó directamente a Maju',
    fecha: '29 de enero de 2026',
    parrafos: [
      'Maju es responsable, creativa y aporta ideas nuevas para estar a la par de las últimas tendencias del mercado.',
    ],
  },
  {
    nombre: 'Luis Alberto Chi Casanova',
    cargo: 'Junior Full Stack Developer at FWA · .NET · Vue.js · Node.js',
    foto: '/files/recomendaciones/luis-alberto-chi.jpg',
    relacion: 'Estudió con Maju',
    fecha: '29 de enero de 2026',
    parrafos: [
      'Tuve la oportunidad de estudiar con Maju y siempre destacó por su creatividad, compromiso, responsabilidad y excelente actitud de trabajo. Siempre mostró disposición para apoyar a los demás y mantener un ambiente positivo. Una cualidad que realmente la distingue es su ambición de seguir aprendiendo y mejorando siempre.',
    ],
  },
];
