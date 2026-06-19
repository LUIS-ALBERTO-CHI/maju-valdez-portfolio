import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { GraduationCap, Award, Clapperboard, TrendingUp } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const ITEMS = [
  {
    Icon: GraduationCap,
    institution: 'Universidad Tecnológica Metropolitana',
    degree: 'Licenciada en Innovación de Negocios y Mercadotecnia',
    tag: 'Licenciatura',
    date: '2021 – 2025',
    featured: false,
  },
  {
    Icon: Award,
    institution: 'Doppler',
    degree: 'Curso email automation marketing',
    tag: 'Curso',
    date: '2021',
    featured: true,   // borde rosa destacado
  },
  {
    Icon: Clapperboard,
    institution: 'Taller Profesional',
    degree: 'Producción Audiovisual',
    tag: 'Certificación',
    date: '2023',
    featured: false,
  },
  {
    Icon: FaGoogle,
    institution: 'Google',
    degree: 'Marketing Digital',
    tag: 'Certificación',
    date: '2025',
    featured: false,
  },
  {
    Icon: TrendingUp,
    institution: 'Curso Online',
    degree: 'Análisis de la Demanda',
    tag: 'Curso',
    date: '2024',
    featured: false,
  },
];

const PAGE_SIZE = 3;

/* ─────────────────────────────────────────
   Card
───────────────────────────────────────── */
function EduCard({ Icon, institution, degree, tag, date, featured }) {
  return (
    <div className={`edu-old-card ${featured ? 'edu-old-card--featured' : ''}`}>
      <div className="edu-old-icon">
        <Icon size={20} />
      </div>
      <p className={`edu-old-institution ${featured ? 'edu-old-institution--featured' : ''}`}>
        {institution}
      </p>
      <p className="edu-old-degree">{degree}</p>
      <span className="edu-old-tag">{tag}</span>
      <p className="edu-old-date">{date}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function EducationSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(ITEMS.length / PAGE_SIZE);
  const visible    = ITEMS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section
      id="educacion"
      className="relative py-20 px-5"
      style={{ zIndex: 1 }}
    >
      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Educación y <span>Cursos</span>
      </h2>

      {/* Cards grid */}
      <div className="edu-old-grid">
        {visible.map((item, i) => (
          <EduCard key={i} {...item} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="edu-old-pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`edu-old-page-btn ${page === i ? 'edu-old-page-btn--active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Página ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
