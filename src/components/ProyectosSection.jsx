import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';

const DESIGNS = [
  { src: '/files/ENERO MASCOTAS/nucan.jpeg', alt: 'Diseño 1' },
  { src: '/files/3.png', alt: 'Diseño 2' },
  { src: '/files/4.png', alt: 'Diseño 3' },
  { src: '/files/5.png', alt: 'Diseño 4' },
  { src: '/files/6.png', alt: 'Diseño 5' },
  { src: '/files/7.png', alt: 'Diseño 6' },
  { src: '/files/ENERO MASCOTAS/15.png', alt: 'Diseño 7' },
  { src: '/files/ENERO MASCOTAS/17.png', alt: 'Diseño 8' },
  { src: '/files/ENERO MASCOTAS/18.png', alt: 'Diseño 9' },
  { src: '/files/ENERO MASCOTAS/20.png', alt: 'Diseño 10' },
  { src: '/files/ENERO MASCOTAS/22.png', alt: 'Diseño 11' },
  { src: '/files/ENERO MASCOTAS/25.png', alt: 'Diseño 12' },
  { src: '/files/ENERO MASCOTAS/27.png', alt: 'Diseño 13' },
  { src: '/files/ENERO MASCOTAS/3.png', alt: 'Diseño 14' },
  { src: '/files/ENERO MASCOTAS/8.png', alt: 'Diseño 15' },
];

const autoplayPlugin = Autoplay({ delay: 3200, stopOnInteraction: true, stopOnMouseEnter: true });

export default function ProyectosSection({ onImageClick }) {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: false,
      slidesToScroll: 1,
    },
    [autoplayPlugin]
  );

  const thumbsRef = useRef(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Scroll active thumb horizontally inside the strip — NOT the page
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const active = container.querySelector('[data-active="true"]');
    if (!active) return;
    // Manually move only the thumbnail strip's horizontal scrollLeft
    const targetLeft = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [selectedIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section
      id="proyectos"
      className="relative py-20 px-5 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Decorative blobs */}
      <div className="proy-blob proy-blob-1" aria-hidden="true" />
      <div className="proy-blob proy-blob-2" aria-hidden="true" />

      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Mis <span>Diseños</span>
      </h2>

      {/* ── MAIN EMBLA CAROUSEL ── */}
      <div className="proy-carousel-root">
        {/* Prev button */}
        <button
          className="proy-nav-btn proy-nav-btn--prev"
          onClick={scrollPrev}
          aria-label="Anterior diseño"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        {/* Viewport */}
        <div className="proy-viewport" ref={emblaRef}>
          <div className="proy-container">
            {DESIGNS.map(({ src, alt }, i) => (
              <div
                key={alt}
                className={`proy-slide ${i === selectedIndex ? 'proy-slide--active' : ''}`}
              >
                <div className="proy-slide-inner">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    draggable="false"
                  />
                  {/* Hover overlay */}
                  <div
                    className="proy-slide-overlay"
                    onClick={() => onImageClick(src, alt)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onImageClick(src, alt)}
                    aria-label={`Ver ${alt} en pantalla completa`}
                  >
                    <Expand size={28} strokeWidth={1.8} className="proy-expand-icon" />
                    <span className="proy-slide-label">{alt}</span>
                  </div>

                  {/* Active badge */}
                  {i === selectedIndex && (
                    <div className="proy-slide-badge">
                      <span>{i + 1} / {DESIGNS.length}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          className="proy-nav-btn proy-nav-btn--next"
          onClick={scrollNext}
          aria-label="Siguiente diseño"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── THUMBNAILS ── */}
      <div className="proy-thumbs-wrap" ref={thumbsRef} aria-label="Miniaturas de diseños">
        {DESIGNS.map(({ src, alt }, i) => (
          <button
            key={alt}
            className={`proy-thumb ${i === selectedIndex ? 'proy-thumb--active' : ''}`}
            data-active={i === selectedIndex}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a ${alt}`}
            aria-current={i === selectedIndex}
          >
            <img src={src} alt={alt} loading="lazy" draggable="false" />
          </button>
        ))}
      </div>

      {/* ── DOT INDICATORS ── */}
      <div className="proy-dots" role="tablist" aria-label="Indicadores de slide">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            className={`proy-dot ${i === selectedIndex ? 'proy-dot--active' : ''}`}
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
