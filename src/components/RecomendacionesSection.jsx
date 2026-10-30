import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PiCaretLeft, PiCaretRight, PiQuotesFill } from 'react-icons/pi';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { avatarColor, initials } from '../lib/avatar';
import { RECOMENDACIONES } from '../data/recomendaciones';

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
        <PiQuotesFill className="reco-quote-icon" size={30} aria-hidden="true" />

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
          <PiCaretLeft size={20} />
        </button>

        <div className="reco-viewport" ref={emblaRef}>
          <div className="reco-container">
            {RECOMENDACIONES.map((r) => (
              <RecomendacionCard key={r.nombre} r={r} />
            ))}
          </div>
        </div>

        <button className="reco-nav-btn reco-nav-btn--next" onClick={() => emblaApi?.scrollNext()} aria-label="Siguiente recomendación">
          <PiCaretRight size={20} />
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
