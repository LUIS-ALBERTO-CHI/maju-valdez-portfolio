import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight, Play, Film } from 'lucide-react';

const VIDEOS = [
  { src: '/videos/VIDEO COMBO FINAL CON LO DE ARIIBA KUBOTA.mp4', title: 'Combo Kubota',        category: 'Maquinaria' },
  { src: '/videos/Doc Viviany Reel Finnal.mp4',                   title: 'Reel Nupec',          category: 'Nutrición' },
  { src: '/videos/MANTENIMIENTO KUBOTA CORREGIDO.mp4',             title: 'Mantenimiento Kubota', category: 'Maquinaria' },
  { src: '/videos/maquillaje.mp4',                                 title: 'Paleta de sombras',   category: 'Belleza' },
  { src: '/videos/KUBOTA.mp4',                                     title: 'Kubota',              category: 'Maquinaria' },
  { src: '/videos/TIKAL1.mp4',                                     title: 'Tikal Sale',          category: 'Bienes Raíces' },
  { src: '/videos/TIKAL2.mp4',                                     title: 'Casas color pastel',  category: 'Bienes Raíces' },
  { src: '/videos/TIKAL3.mp4',                                     title: 'Bodegas',             category: 'Bienes Raíces' },
  { src: '/videos/TIKAL4.mp4',                                     title: 'Casas Coloniales',    category: 'Bienes Raíces' },
  { src: '/videos/gusano.mp4',                                     title: 'Gusano Barrenador',   category: 'Agricultura' },
  { src: '/videos/mascotas1.mp4',                                  title: 'Mascotas 1',          category: 'Mascotas' },
  { src: '/videos/mascotas2.mp4',                                  title: 'Mascotas 2',          category: 'Mascotas' },
  { src: '/videos/mascotas3.mp4',                                  title: 'Mascotas 3',          category: 'Mascotas' },
];

const encodeVideoSrc = (src) => src.replace(/ /g, '%20');

/**
 * Extracts a thumbnail frame from a video using canvas.
 * Only loads the video when the card enters the viewport (IntersectionObserver).
 * Seeks to 10% of duration (min 1s, max 5s) for a representative frame.
 */
function VideoThumbnail({ src }) {
  const containerRef = useRef(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const video = document.createElement('video');
        video.crossOrigin  = 'anonymous';
        video.preload      = 'metadata';
        video.muted        = true;
        video.playsInline  = true;
        video.src          = src;

        const onMeta = () => {
          // Seek to 10% of duration, clamped between 1s and 5s
          const target = Math.min(Math.max(video.duration * 0.1, 1), 5);
          video.currentTime = isFinite(target) ? target : 1;
        };

        const onSeeked = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width  = video.videoWidth  || 640;
            canvas.height = video.videoHeight || 360;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            setDataUrl(canvas.toDataURL('image/jpeg', 0.85));
          } catch {
            setError(true);
          } finally {
            setLoading(false);
            // Free memory — remove src so the browser releases the partial download
            video.removeEventListener('loadedmetadata', onMeta);
            video.removeEventListener('seeked', onSeeked);
            video.removeEventListener('error', onError);
            video.src = '';
            video.load();
          }
        };

        const onError = () => {
          setError(true);
          setLoading(false);
        };

        video.addEventListener('loadedmetadata', onMeta);
        video.addEventListener('seeked', onSeeked);
        video.addEventListener('error', onError);
        video.load();
      },
      { rootMargin: '300px' } // start loading 300px before entering viewport
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={containerRef} className="vid-thumb-frame">
      {/* Extracted frame */}
      {dataUrl && (
        <img
          src={dataUrl}
          alt=""
          className="vid-thumb-img"
          draggable="false"
        />
      )}

      {/* Loading skeleton */}
      {loading && !dataUrl && (
        <div className="vid-thumb-skeleton">
          <Film size={28} strokeWidth={1.5} className="vid-thumb-skeleton-icon" />
        </div>
      )}

      {/* Error fallback */}
      {error && !dataUrl && (
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
    {
      loop: true,
      align: 'center',
      containScroll: false,
      slidesToScroll: 1,
    },
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
  const scrollTo  = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

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
                  onClick={() => onVideoClick(encodeVideoSrc(video.src))}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onVideoClick(encodeVideoSrc(video.src))}
                  aria-label={`Reproducir ${video.title}`}
                >
                  {/* Thumbnail — auto-extracted from video */}
                  <div className="vid-thumb-wrap">
                    <VideoThumbnail src={encodeVideoSrc(video.src)} />

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
        {/* Live counter */}
        <span className="vid-counter" aria-live="polite">
          <strong>{selectedIndex + 1}</strong> / {VIDEOS.length}
        </span>

        {/* Dots */}
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

        {/* Active title */}
        <span className="vid-active-title" aria-live="polite">{current.title}</span>
      </div>
    </section>
  );
}
