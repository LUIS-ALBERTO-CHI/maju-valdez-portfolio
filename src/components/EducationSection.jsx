import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  GraduationCap, Award, Clapperboard, TrendingUp,
  BookOpen, Star, ExternalLink, Filter,
} from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const ITEMS = [
  {
    id: 'uni',
    Icon: GraduationCap,
    institution: 'Universidad Tecnológica Metropolitana',
    degree: 'Licenciada en Innovación de Negocios y Mercadotecnia',
    tag: 'Licenciatura',
    date: '2021 – 2025',
    color: '#f06c88',
    featured: true,            // muestra como hero card
    description: 'Formación integral en marketing, estrategia digital, innovación y gestión de negocios orientada al mercado actual.',
    skills: ['Marketing Digital', 'Estrategia', 'Innovación', 'Gestión'],
  },
  {
    id: 'google',
    Icon: FaGoogle,
    institution: 'Google',
    degree: 'Marketing Digital',
    tag: 'Certificación',
    date: '2025',
    color: '#4285F4',
    featured: false,
    description: 'Certificación oficial de Google en fundamentos de marketing digital y herramientas publicitarias.',
    skills: ['Google Ads', 'SEO', 'Analytics'],
  },
  {
    id: 'doppler',
    Icon: Award,
    institution: 'Doppler',
    degree: 'Email Automation Marketing',
    tag: 'Curso',
    date: '2021',
    color: '#f59e0b',
    featured: false,
    description: 'Automatización de campañas de email marketing, segmentación y análisis de métricas.',
    skills: ['Email Marketing', 'Automatización', 'CRM'],
  },
  {
    id: 'audiovisual',
    Icon: Clapperboard,
    institution: 'Taller Profesional',
    degree: 'Producción Audiovisual',
    tag: 'Certificación',
    date: '2023',
    color: '#8b5cf6',
    featured: false,
    description: 'Técnicas de producción, dirección y edición de contenido audiovisual para medios digitales.',
    skills: ['Edición', 'Dirección', 'Guion'],
  },
  {
    id: 'demanda',
    Icon: TrendingUp,
    institution: 'Curso Online',
    degree: 'Análisis de la Demanda',
    tag: 'Curso',
    date: '2024',
    color: '#10b981',
    featured: false,
    description: 'Metodologías para el análisis de tendencias de mercado y comportamiento del consumidor.',
    skills: ['Análisis', 'Estadística', 'Tendencias'],
  },
];

const TAGS = ['Todos', 'Licenciatura', 'Certificación', 'Curso'];

/* ─────────────────────────────────────────
   Animated card (non-featured)
───────────────────────────────────────── */
function EduCard({ item, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const { Icon, institution, degree, tag, date, color, description, skills } = item;

  return (
    <article
      ref={cardRef}
      className={`edu-card ${visible ? 'edu-card--visible' : ''}`}
      style={{ '--edu-color': color }}
    >
      {/* Top accent */}
      <div className="edu-card-accent" />

      <div className="edu-card-body">
        {/* Icon + tag row */}
        <div className="edu-card-top">
          <div className="edu-icon-wrap">
            <Icon size={20} strokeWidth={1.8} />
          </div>
          <span className="edu-tag">{tag}</span>
        </div>

        {/* Institution */}
        <p className="edu-institution">{institution}</p>

        {/* Degree */}
        <h3 className="edu-degree">{degree}</h3>

        {/* Description */}
        <p className="edu-desc">{description}</p>

        {/* Skills */}
        <div className="edu-skills">
          {skills.map(s => (
            <span key={s} className="edu-skill">{s}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="edu-footer">
          <span className="edu-date">
            <BookOpen size={11} strokeWidth={2} />
            {date}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   Featured hero card (licenciatura)
───────────────────────────────────────── */
function FeaturedCard({ item }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { Icon, institution, degree, tag, date, color, description, skills } = item;

  return (
    <article
      ref={cardRef}
      className={`edu-featured ${visible ? 'edu-featured--visible' : ''}`}
      style={{ '--edu-color': color }}
    >
      {/* Gradient background glow */}
      <div className="edu-featured-glow" aria-hidden="true" />

      <div className="edu-featured-body">
        {/* Header row */}
        <div className="edu-featured-header">
          <div className="edu-featured-icon">
            <Icon size={28} strokeWidth={1.6} />
          </div>
          <div>
            <span className="edu-featured-tag">
              <Star size={11} strokeWidth={2.5} fill="currentColor" />
              {tag}
            </span>
            <p className="edu-featured-date">{date}</p>
          </div>
        </div>

        {/* Content */}
        <p className="edu-featured-inst">{institution}</p>
        <h3 className="edu-featured-degree">{degree}</h3>
        <p className="edu-featured-desc">{description}</p>

        {/* Skills */}
        <div className="edu-featured-skills">
          {skills.map(s => (
            <span key={s} className="edu-featured-skill">{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function EducationSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeTag, setActiveTag] = useState('Todos');

  const featured  = ITEMS.find(i => i.featured);
  const rest      = ITEMS.filter(i => !i.featured);
  const filtered  = activeTag === 'Todos'
    ? rest
    : rest.filter(i => i.tag === activeTag);

  return (
    <section
      id="educacion"
      className="relative py-20 px-5 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Blobs */}
      <div className="edu-blob edu-blob-1" aria-hidden="true" />
      <div className="edu-blob edu-blob-2" aria-hidden="true" />

      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Educación y <span>Cursos</span>
      </h2>

      {/* ── Bento layout ── */}
      <div className="edu-bento">

        {/* Featured card — full left column on desktop */}
        {featured && <FeaturedCard item={featured} />}

        {/* Right column */}
        <div className="edu-right-col">

          {/* Filter pills */}
          <div className="edu-filters" role="group" aria-label="Filtrar por tipo">
            <Filter size={13} strokeWidth={2} className="edu-filter-icon" />
            {TAGS.map(tag => (
              <button
                key={tag}
                className={`edu-filter-btn ${activeTag === tag ? 'edu-filter-btn--active' : ''}`}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="edu-cards-grid">
            {filtered.map((item, i) => (
              <EduCard key={item.id} item={item} index={i} />
            ))}
            {filtered.length === 0 && (
              <p className="edu-empty">No hay elementos en esta categoría.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
