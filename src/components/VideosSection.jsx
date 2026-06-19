import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight, Play, Film } from 'lucide-react';
import { r2Video } from '../config/r2';

/* ─────────────────────────────────────────
   Videos data — static thumbnails from /public/files/
   (no canvas extraction needed)
───────────────────────────────────────── */
const VIDEOS = [
  { src: r2Video('VIDEO COMBO FINAL CON LO DE ARIIBA KUBOTA.mp4'), thumb: '/files/COMBO.jpg',      title: 'Combo Kubota',        category: 'Maquinaria'    },
  { src: r2Video('Doc Viviany Reel Finnal.mp4'),                   thumb: '/files/reel.jpg',        title: 'Reel Nupec',          category: 'Nutrición'     },
  { src: r2Video('MANTENIMIENTO KUBOTA CORREGIDO.mp4'),             thumb: '/files/KUBOTA.jpg',      title: 'Mantenimiento Kubota',category: 'Maquinaria'    },
  { src: r2Video('maquillaje.mp4'),                                 thumb: '/files/maquillaje.jpg',  title: 'Paleta de sombras',   category: 'Belleza'       },
  { src: r2Video('KUBOTA.mp4'),                                     thumb: '/files/KUBOTA.jpg',      title: 'Kubota',              category: 'Maquinaria'    },
  { src: r2Video('TIKAL1.mp4'),                                     thumb: '/files/TIKAL1.jpg',      title: 'Tikal Sale',          category: 'Bienes Raíces' },
  { src: r2Video('TIKAL2.mp4'),                                     thumb: '/files/TIKAL2.jpg',      title: 'Casas color pastel',  category: 'Bienes Raíces' },
  { src: r2Video('TIKAL3.mp4'),                                     thumb: '/files/TIKAL3.jpg',      title: 'Bodegas',             category: 'Bienes Raíces' },
  { src: r2Video('TIKAL4.mp4'),                                     thumb: '/files/TIKAL4.jpg',      title: 'Casas Coloniales',    category: 'Bienes Raíces' },
  { src: r2Video('gusano.mp4'),                                     thumb: '/files/gusano.jpg',      title: 'Gusano Barrenador',   category: 'Agricultura'   },
  { src: r2Video('mascotas1.mp4'),                                  thumb: '/files/mascotas1.jpg',   title: 'Mascotas 1',          category: 'Mascotas'      },
  { src: r2Video('mascotas2.mp4'),                                  thumb: '/files/mascotas2.jpg',   title: 'Mascotas 2',          category: 'Mascotas'      },
  { src: r2Video('mascotas3.mp4'),                                  thumb: '/files/mascotas3.jpg',   title: 'Mascotas 3',          category: 'Mascotas'      },
];

/* ─────────────────────────────────────────
   Static thumbnail (instant, works on mobile)
───────────────────────────────────────── */
function VideoThumbnail({ thumb, title }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="vid-thumb-frame">
      <img
        src={thumb}
        alt={title}
        className="vid-thumb-img"
        draggable="false"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
      {!loaded && (
        <div className="vid-thumb-skeleton">
          <Film size={28} strokeWidth={1.5} className="vid-thumb-skeleton-icon" />
        </div>
      )}
    </div>
  );
}

const autoplayPlugin = Autoplay({ delay: 3600, stopOnInteraction: true, stopOnMouseEnter: true });

export default function VideosSection({ onVideoClick }) {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false, slidesToScroll: 1 },
    [autoplayPlugin]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  const current = VIDEOS[selectedIndex];

  return (
    <section
      id="videos"
      className="relative py-20 px-5 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Decorative blobs */}
      <div className="vid-blob vid-blob-1" aria-hidden="true" />
      <div className="vid-blob vid-blob-2" aria-hidden="true" />

      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Videos de <span>Marketing</span>
      </h2>

      {/* ── EMBLA ROOT ── */}
      <div className="vid-carousel-root">

        {/* Prev */}
        <button className="vid-nav-btn vid-nav-btn--prev" onClick={scrollPrev} aria-label="Video anterior">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        {/* Viewport */}
        <div className="vid-viewport" ref={emblaRef}>
          <div className="vid-container">
            {VIDEOS.map((video, i) => (
              <div
                key={video.title}
                className={`vid-slide ${i === selectedIndex ? 'vid-slide--active' : ''}`}
              >
                <article
                  className="vid-card"
                  onClick={() => onVideoClick(video.src)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onVideoClick(video.src)}
                  aria-label={`Reproducir ${video.title}`}
                >
                  {/* Static thumbnail */}
                  <div className="vid-thumb-wrap">
                    <VideoThumbnail thumb={video.thumb} title={video.title} />

                    {/* Gradient overlay */}
                    <div className="vid-thumb-gradient" />

                    {/* Play button */}
                    <div className="vid-play-ring">
                      <Play size={26} fill="white" strokeWidth={0} className="vid-play-icon" />
                    </div>

                    {/* Category chip */}
                    <div className="vid-category-chip">
                      <Film size={11} strokeWidth={2} />
                      <span>{video.category}</span>
                    </div>
                  </div>

                  {/* Info footer */}
                  <div className="vid-info">
                    <h3 className="vid-title">{video.title}</h3>
                    <span className="vid-play-cta">Ver video →</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <button className="vid-nav-btn vid-nav-btn--next" onClick={scrollNext} aria-label="Siguiente video">
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── COUNTER + DOTS ── */}
      <div className="vid-footer-row">
        <span className="vid-counter" aria-live="polite">
          <strong>{selectedIndex + 1}</strong> / {VIDEOS.length}
        </span>

        <div className="vid-dots" role="tablist" aria-label="Indicadores de video">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              className={`vid-dot ${i === selectedIndex ? 'vid-dot--active' : ''}`}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Video ${i + 1}: ${VIDEOS[i].title}`}
            />
          ))}
        </div>

        <span className="vid-active-title" aria-live="polite">{current.title}</span>
      </div>
    </section>
  );
}
