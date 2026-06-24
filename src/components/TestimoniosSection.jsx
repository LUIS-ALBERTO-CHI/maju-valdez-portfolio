import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function avatarColor(name = '') {
  const colors = [
    '#f06c88', '#f4a7b9', '#e879a0', '#c2668e',
    '#b58390', '#e8a4c4', '#d46a8c', '#f0849c',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function initials(name = '') {
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ─────────────────────────────────────────
   Star Display (read-only)
───────────────────────────────────────── */
function StarDisplay({ value = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={14}
          fill={n <= value ? 'var(--accent-hot)' : 'transparent'}
          stroke={n <= value ? 'var(--accent-hot)' : 'var(--border-color)'}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Testimonio Card
───────────────────────────────────────── */
function TestimonioCard({ t }) {
  const color = avatarColor(t.nombre);
  return (
    <div className="testi-slide">
      <div className="testi-card">
        <div className="testi-quote-icon" aria-hidden="true">
          <Quote size={32} strokeWidth={1.5} />
        </div>
        <div className="testi-card-stars">
          <StarDisplay value={t.estrellas || 5} />
        </div>
        <p className="testi-card-text">"{t.texto}"</p>
        <div className="testi-card-author">
          <div className="testi-avatar" style={{ background: color }} aria-hidden="true">
            {initials(t.nombre)}
          </div>
          <div className="testi-author-info">
            <p className="testi-author-name">{t.nombre}</p>
            {t.cargo && <p className="testi-author-role">{t.cargo}</p>}
            <p className="testi-author-date">{formatDate(t.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Empty State — sin botón, solo mensaje
───────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="testi-empty">
      <div className="testi-empty-icon" aria-hidden="true">💬</div>
      <p className="testi-empty-title">Próximamente</p>
      <p className="testi-empty-sub">
        Aquí aparecerán las opiniones de quienes han trabajado con Maju.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true });

export default function TestimoniosSection() {
  const [titleRef, titleVisible]      = useIntersectionObserver({ threshold: 0.1 });
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false },
    testimonios.length > 1 ? [autoplayPlugin] : []
  );

  /* ── Real-time Firestore listener ── */
  useEffect(() => {
    const q = query(collection(db, 'testimonios'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setTestimonios(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, err => {
      console.error('Firestore error:', err);
      setLoading(false);
    });
    return unsub;
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="testimonios"
      className="relative py-20 px-5"
      style={{ zIndex: 1 }}
    >
      {/* Decorative blobs */}
      <div className="testi-blob testi-blob-1" aria-hidden="true" />
      <div className="testi-blob testi-blob-2" aria-hidden="true" />

      {/* Header */}
      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Lo que dicen <span>de mí</span>
      </h2>

      {/* Loading skeleton */}
      {loading && (
        <div className="testi-skeleton-wrap">
          {[0, 1, 2].map(i => (
            <div key={i} className="testi-skeleton" />
          ))}
        </div>
      )}

      {/* Empty state — solo visible cuando no hay testimonios */}
      {!loading && testimonios.length === 0 && <EmptyState />}

      {/* Carousel */}
      {!loading && testimonios.length > 0 && (
        <div className="testi-carousel-root">
          {testimonios.length > 1 && (
            <button
              className="testi-nav-btn testi-nav-btn--prev"
              onClick={scrollPrev}
              aria-label="Testimonio anterior"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          )}

          <div className="testi-viewport" ref={emblaRef}>
            <div className="testi-container">
              {testimonios.map(t => (
                <TestimonioCard key={t.id} t={t} />
              ))}
            </div>
          </div>

          {testimonios.length > 1 && (
            <button
              className="testi-nav-btn testi-nav-btn--next"
              onClick={scrollNext}
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          )}

          {testimonios.length > 1 && (
            <div className="testi-dots" role="tablist" aria-label="Indicadores">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === selectedIndex ? 'testi-dot--active' : ''}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  role="tab"
                  aria-selected={i === selectedIndex}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
