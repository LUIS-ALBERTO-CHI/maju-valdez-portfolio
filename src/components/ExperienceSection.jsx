import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const EXPERIENCES = [
  {
    company:  'Fogysa',
    date:     'Noviembre 2025 - Actual',
    location: 'Mérida, Yucatán',
    title:    'Community Manager',
    current:  true,
    tasks: [
      'Diseño de contenido para redes sociales.',
      'Atención a clientes a través de redes sociales.',
      'Desarrollo de guiones creativos para videos.',
      'Edición de videos para plataformas digitales.',
    ],
  },
  {
    company:  'Grupo Tikal Corporativo Inmobiliario',
    date:     '1 Año',
    location: 'Mérida, Yucatán',
    title:    'Auxiliar de Mercadotecnia',
    current:  false,
    tasks: [
      'Creación y gestión de contenido para redes sociales.',
      'Atención a clientes a través de redes sociales y llamadas.',
      'Desarrollo de guiones creativos para videos.',
      'Presencia frente a cámara para materiales audiovisuales.',
    ],
  },
  {
    company:  'Panificadora El Retorno',
    date:     'Enero 2025 - Abril 2025',
    location: 'Mérida, Yucatán',
    title:    'Auxiliar de Mercadotecnia (Prácticas)',
    current:  false,
    tasks: [
      'Creación, edición y publicación de contenido digital.',
      'Atención y gestión de clientes a través de redes sociales.',
      'Apoyo en la organización y ejecución de eventos.',
      'Diseño y elaboración de materiales publicitarios.',
    ],
  },
];

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function ExperienceSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="experiencia"
      className="relative py-20 px-5"
      style={{ zIndex: 1 }}
    >
      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Experiencia <span>Laboral</span>
      </h2>

      <div className="exp-simple-timeline">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-simple-row">

            {/* ── Left: company + date + location ── */}
            <div className="exp-simple-left">
              <p className="exp-simple-company">{exp.company}</p>
              <p className="exp-simple-date">{exp.date}</p>
              <p className="exp-simple-location">{exp.location}</p>
            </div>

            {/* ── Center: line + node ── */}
            <div className="exp-simple-center" aria-hidden="true">
              <div className={`exp-simple-node ${exp.current ? 'exp-simple-node--active' : ''}`} />
            </div>

            {/* ── Right: title + bullets ── */}
            <div className="exp-simple-right">
              <p className="exp-simple-title">{exp.title}</p>
              <ul className="exp-simple-list">
                {exp.tasks.map((task, j) => (
                  <li key={j} className="exp-simple-item">
                    <span className="exp-simple-dot" aria-hidden="true" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
