import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { EXPERIENCIAS as EXPERIENCES } from '../data/experiencia';

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
