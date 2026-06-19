import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase, MapPin, Calendar, ChevronDown, ChevronUp,
  Megaphone, Camera, PenTool, Users, Video, LayoutGrid,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const EXPERIENCES = [
  {
    company:  'Fogysa',
    logo:     '/files/logo-fogysa.jpg',
    location: 'Mérida, Yucatán',
    date:     'Nov 2025 – Actual',
    title:    'Community Manager',
    current:  true,
    color:    '#f06c88',
    skills:   ['Social Media', 'Diseño', 'Guiones', 'Edición de video'],
    skillIcons: [LayoutGrid, PenTool, PenTool, Video],
    tasks: [
      'Diseño de contenido para redes sociales.',
      'Atención a clientes a través de redes sociales.',
      'Desarrollo de guiones creativos para videos.',
      'Edición de videos para plataformas digitales.',
    ],
  },
  {
    company:  'Grupo Tikal Corporativo Inmobiliario',
    logo:     '/files/tikal.jpg',
    location: 'Mérida, Yucatán',
    date:     'Abr 2025 – Nov 2025',
    title:    'Auxiliar de Mercadotecnia',
    current:  false,
    color:    '#a78bfa',
    skills:   ['Contenido', 'Atención al cliente', 'Cámara', 'Guiones'],
    skillIcons: [LayoutGrid, Users, Camera, Megaphone],
    tasks: [
      'Creación y gestión de contenido para redes sociales.',
      'Atención a clientes a través de redes sociales y llamadas.',
      'Desarrollo de guiones creativos para videos.',
      'Presencia frente a cámara para materiales audiovisuales.',
    ],
  },
  {
    company:  'Panificadora El Retorno',
    logo:     null,
    location: 'Mérida, Yucatán',
    date:     'Ene 2025 – Abr 2025',
    title:    'Auxiliar de Mercadotecnia (Prácticas)',
    current:  false,
    color:    '#f59e0b',
    skills:   ['Contenido digital', 'Eventos', 'Publicidad', 'Community'],
    skillIcons: [LayoutGrid, Megaphone, PenTool, Users],
    tasks: [
      'Creación, edición y publicación de contenido digital.',
      'Atención y gestión de clientes a través de redes sociales.',
      'Apoyo en la organización y ejecución de eventos.',
      'Diseño y elaboración de materiales publicitarios.',
    ],
  },
];

/* ─────────────────────────────────────────
   Animated counter for duration
───────────────────────────────────────── */
function getDurationMonths(dateStr) {
  const parts = dateStr.split('–').map(s => s.trim());
  const MONTHS = {
    'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11,
  };
  const parseDate = (s) => {
    if (s === 'Actual') return new Date();
    const [mon, year] = s.split(' ');
    return new Date(parseInt(year), MONTHS[mon] ?? 0);
  };
  const start = parseDate(parts[0]);
  const end   = parseDate(parts[1]);
  const diff  = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(1, diff);
}

function formatDuration(months) {
  if (months < 12) return `${months} mes${months !== 1 ? 'es' : ''}`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y} año${y > 1 ? 's' : ''} ${m} mes${m > 1 ? 'es' : ''}` : `${y} año${y > 1 ? 's' : ''}`;
}

/* ─────────────────────────────────────────
   Experience Card (unified desktop+mobile)
───────────────────────────────────────── */
function ExperienceCard({ company, logo, location, date, title, current, color, skills, skillIcons, tasks, index }) {
  const cardRef    = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(index === 0);
  const months     = getDurationMonths(date);
  const duration   = formatDuration(months);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const initials = company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      ref={cardRef}
      className={`exp-card ${visible ? 'exp-card--visible' : ''} ${current ? 'exp-card--current' : ''}`}
      style={{ '--exp-color': color }}
    >
      {/* Left accent bar */}
      <div className="exp-accent-bar" />

      {/* Card header — always visible */}
      <div className="exp-header" onClick={() => setExpanded(e => !e)} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        {/* Logo / initials */}
        <div className="exp-logo-wrap">
          {logo ? (
            <img src={logo} alt={company} className="exp-logo-img" />
          ) : (
            <span className="exp-logo-initials">{initials}</span>
          )}
        </div>

        {/* Title block */}
        <div className="exp-header-text">
          <div className="exp-company-row">
            <span className="exp-company">{company}</span>
            {current && (
              <span className="exp-badge-current">
                <span className="exp-badge-dot" />
                Actual
              </span>
            )}
          </div>
          <h3 className="exp-title">{title}</h3>
          <div className="exp-meta">
            <span className="exp-meta-item">
              <Calendar size={12} strokeWidth={2} />
              {date}
            </span>
            <span className="exp-meta-sep">·</span>
            <span className="exp-meta-item">
              <Briefcase size={12} strokeWidth={2} />
              {duration}
            </span>
            <span className="exp-meta-sep">·</span>
            <span className="exp-meta-item">
              <MapPin size={12} strokeWidth={2} />
              {location}
            </span>
          </div>
        </div>

        {/* Expand chevron */}
        <button className="exp-chevron" aria-hidden="true" tabIndex={-1}>
          {expanded ? <ChevronUp size={18} strokeWidth={2} /> : <ChevronDown size={18} strokeWidth={2} />}
        </button>
      </div>

      {/* Expandable body */}
      <div className={`exp-body ${expanded ? 'exp-body--open' : ''}`}>
        <div className="exp-body-inner">
          {/* Skills chips */}
          <div className="exp-skills">
            {skills.map((skill, i) => {
              const Icon = skillIcons[i];
              return (
                <span key={skill} className="exp-skill-chip">
                  <Icon size={11} strokeWidth={2} />
                  {skill}
                </span>
              );
            })}
          </div>

          {/* Task list */}
          <ul className="exp-tasks">
            {tasks.map((task, i) => (
              <li key={i} className="exp-task-item">
                <span className="exp-task-dot" />
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function ExperienceSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="experiencia"
      className="experience-section relative"
      style={{ zIndex: 1 }}
    >
      <div className="experience-inner relative w-full">
        <div
          className="experience-content w-full"
          style={{ padding: '64px 5vw' }}
        >
          <h2
            ref={titleRef}
            className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
          >
            Experiencia <span>Laboral</span>
          </h2>

          {/* Timeline container */}
          <div className="exp-timeline">
            {/* Vertical line */}
            <div className="exp-timeline-line" aria-hidden="true" />

            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="exp-timeline-row">
                {/* Node */}
                <div className="exp-node-wrap">
                  <div
                    className={`exp-node ${exp.current ? 'exp-node--active' : ''}`}
                    style={{ '--exp-color': exp.color }}
                  />
                </div>
                {/* Card */}
                <ExperienceCard {...exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
