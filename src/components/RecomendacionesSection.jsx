import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { avatarColor, initials } from '../lib/avatar';

/**
 * Recomendaciones reales recibidas en LinkedIn.
 * `relacion` reproduce el contexto que LinkedIn muestra bajo cada recomendación:
 * es lo que les da credibilidad, así que se conserva textual.
 *
 * `foto` es opcional. Si falta —o si el archivo no existe todavía— se cae a las
 * iniciales sobre un color derivado del nombre. Las fotos van en
 * public/files/recomendaciones/ (ver el LEEME.md de esa carpeta).
 */
const RECOMENDACIONES = [
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

/* Posición de cada avatar sobre las ondas, en % del contenedor */
const AVATAR_SPOTS = [
  { left: '11%', top: '30%' },
  { left: '30%', top: '16%' },
  { left: '49%', top: '45%' },
  { left: '68%', top: '21%' },
  { left: '87%', top: '37%' },
];

/* Umbral a partir del cual la tarjeta se recorta y ofrece "Leer completo" */
const LIMITE_RECORTE = 320;

const autoplayPlugin = Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true });

/* ─────────────────────────────────────────
   Fondo de ondas animadas
───────────────────────────────────────── */
/* Ocho medias ondas de 360 unidades = 2880 de ancho. Como el periodo es de 720,
   desplazar 1440 hacia la izquierda deja la curva idéntica: el bucle no tiene costura. */
const WAVE_PATH =
  'M0,160 q180,-58 360,0 q180,58 360,0 q180,-58 360,0 q180,58 360,0 ' +
  'q180,-58 360,0 q180,58 360,0 q180,-58 360,0 q180,58 360,0';

const WAVE_LAYERS = [
  { y: -70, dur: '34s', opacity: 0.55, width: 1.6 },
  { y: -35, dur: '27s', opacity: 0.4, width: 1.2 },
  { y: 0, dur: '31s', opacity: 0.6, width: 1.8 },
  { y: 34, dur: '23s', opacity: 0.35, width: 1.2 },
  { y: 68, dur: '38s', opacity: 0.45, width: 1.5 },
];

function Ondas() {
  return (
    <svg
      className="reco-waves"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id="reco-wave-path" d={WAVE_PATH} />
      </defs>
      {WAVE_LAYERS.map((layer, i) => (
        <g
          key={i}
          className="reco-wave-layer"
          style={{ '--reco-wave-dur': layer.dur, '--reco-wave-y': `${layer.y}px` }}
        >
          <use
            href="#reco-wave-path"
            fill="none"
            stroke="currentColor"
            strokeWidth={layer.width}
            opacity={layer.opacity}
          />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────
   Avatar: foto si existe, iniciales si no
───────────────────────────────────────── */
function Avatar({ persona, className, decorativo = false }) {
  // Si el archivo no está (o cambió de nombre), volvemos a las iniciales en vez
  // de dejar una imagen rota.
  const [fotoFallida, setFotoFallida] = useState(false);
  const conFoto = Boolean(persona.foto) && !fotoFallida;

  return (
    <span className={className} style={{ background: avatarColor(persona.nombre) }}>
      {conFoto ? (
        <img
          src={persona.foto}
          alt={decorativo ? '' : `Foto de ${persona.nombre}`}
          loading="lazy"
          draggable="false"
          onError={() => setFotoFallida(true)}
        />
      ) : (
        initials(persona.nombre)
      )}
    </span>
  );
}

/* ─────────────────────────────────────────
   Tarjeta
───────────────────────────────────────── */
function RecomendacionCard({ r }) {
  const [expandida, setExpandida] = useState(false);
  const largo = r.parrafos.join(' ').length;
  const recortable = largo > LIMITE_RECORTE;

  return (
    <div className="reco-slide">
      <article className="reco-card">
        <Quote className="reco-quote-icon" size={30} strokeWidth={1.5} aria-hidden="true" />

        <div className={`reco-card-text ${recortable && !expandida ? 'reco-card-text--recortada' : ''}`}>
          {r.parrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {recortable && (
          <button
            type="button"
            className="reco-leer-mas"
            onClick={() => setExpandida((v) => !v)}
            aria-expanded={expandida}
          >
            {expandida ? 'Mostrar menos' : 'Leer completo'}
          </button>
        )}

        <footer className="reco-card-author">
          <Avatar persona={r} className="reco-avatar" />
          <div className="reco-author-info">
            <p className="reco-author-name">{r.nombre}</p>
            <p className="reco-author-role">{r.cargo}</p>
            <p className="reco-author-meta">
              {r.relacion} · {r.fecha}
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}

/* ─────────────────────────────────────────
   Sección
───────────────────────────────────────── */
export default function RecomendacionesSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplayPlugin]
  );

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section id="recomendaciones" className="reco-section" style={{ zIndex: 1 }}>
      <h2 ref={titleRef} className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}>
        Recomendaciones de <span>LinkedIn</span>
      </h2>

      {/* Banda de ondas con los avatares de quienes recomiendan */}
      <div className="reco-backdrop">
        <Ondas />
        {RECOMENDACIONES.map((r, i) => (
          <button
            key={r.nombre}
            type="button"
            className={`reco-spot ${selectedIndex === i ? 'reco-spot--active' : ''}`}
            style={{ ...AVATAR_SPOTS[i], '--reco-spot-delay': `${i * 0.9}s` }}
            onClick={() => scrollTo(i)}
            aria-label={`Ver la recomendación de ${r.nombre}`}
          >
            <Avatar persona={r} decorativo />
          </button>
        ))}
      </div>

      <div className="reco-carousel-root">
        <button className="reco-nav-btn reco-nav-btn--prev" onClick={() => emblaApi?.scrollPrev()} aria-label="Recomendación anterior">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <div className="reco-viewport" ref={emblaRef}>
          <div className="reco-container">
            {RECOMENDACIONES.map((r) => (
              <RecomendacionCard key={r.nombre} r={r} />
            ))}
          </div>
        </div>

        <button className="reco-nav-btn reco-nav-btn--next" onClick={() => emblaApi?.scrollNext()} aria-label="Siguiente recomendación">
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="reco-dots" role="tablist" aria-label="Indicadores de recomendación">
        {RECOMENDACIONES.map((r, i) => (
          <button
            key={r.nombre}
            className={`reco-dot ${selectedIndex === i ? 'reco-dot--active' : ''}`}
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={selectedIndex === i}
            aria-label={`Recomendación de ${r.nombre}`}
          />
        ))}
      </div>
    </section>
  );
}
