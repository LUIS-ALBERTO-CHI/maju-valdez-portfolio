import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_ASSETS = [
  { src: '/files/3.png', title: 'Diseño 1' },
  { src: '/files/4.png', title: 'Diseño 2' },
  { src: '/files/5.png', title: 'Diseño 3' },
  { src: '/files/6.png', title: 'Diseño 4' },
  { src: '/files/7.png', title: 'Diseño 5' },
];

/* Card + slot size per viewport — slot is wider than the card so the deck fans out */
const SIZES = [
  { min: 1280, slide: 420, card: 340 },
  { min: 1024, slide: 360, card: 290 },
  { min: 640, slide: 280, card: 225 },
  { min: 0, slide: 190, card: 150 },
];

const pickSize = (width) => SIZES.find((s) => width >= s.min) ?? SIZES[SIZES.length - 1];

export default function CardCarousel({
  className = '',
  images = DEFAULT_ASSETS,
  onImageClick,
}) {
  const [activeIndex, setActiveIndex] = useState(Math.min(2, images.length - 1));
  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState(() =>
    pickSize(typeof window === 'undefined' ? 1280 : window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setSize(pickSize(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { slide: slideWidth, card: cardWidth } = size;
  const cardHeight = Math.round(cardWidth * 1.25);

  const toPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const toNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  const toSlide = (e, index) => {
    e.stopPropagation();
    // Clicking the already-active card opens the fullscreen modal
    if (index === activeIndex && onImageClick) {
      const { src, alt, title } = images[index];
      onImageClick(src, alt ?? title);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex flex-col items-center justify-center relative overflow-hidden select-none ${className}`}
    >
      <div
        className="relative flex items-center justify-start overflow-visible"
        style={{ width: `${slideWidth}px`, height: `${Math.round(cardHeight * 1.2) + 40}px` }}
      >
        <motion.div
          className="flex w-fit items-center"
          animate={{ x: -activeIndex * slideWidth }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
        >
          {images.map((item, i) => {
            const isActive = activeIndex === i;
            const diff = i - activeIndex;

            const targetRotate = isHovered ? diff * 20 : diff * 5;
            const targetScale = isActive ? 1.05 : isHovered ? 0.65 : 0.8;
            const targetY = isHovered ? diff * (cardWidth * 0.22) : 0;

            return (
              <motion.div
                key={item.src}
                className="shrink-0 flex flex-col items-center gap-2 will-change-[transform,scale]"
                style={{ width: `${slideWidth}px` }}
                animate={{ rotate: targetRotate, scale: targetScale, y: targetY }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              >
                <div
                  className={`text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${isActive ? 'opacity-100 scale-100 text-[var(--text-dark)]' : 'opacity-0 scale-75 text-[var(--text-secondary)]'}`}
                >
                  {item.title}
                </div>

                <button
                  type="button"
                  onClick={(e) => toSlide(e, i)}
                  aria-label={isActive ? `Ver ${item.title} en pantalla completa` : `Ir a ${item.title}`}
                  aria-current={isActive}
                  className="block p-0 border-0 bg-transparent cursor-pointer rounded-2xl"
                  style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title}
                    loading="lazy"
                    draggable="false"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10"
                  />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="deck-pager">
        <button onClick={toPrev} aria-label="Anterior diseño" className="deck-pager-btn">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex justify-center items-center gap-[7px]">
          {images.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={(e) => toSlide(e, i)}
              aria-label={`Ir a ${item.title}`}
              aria-current={activeIndex === i}
              className={`deck-pager-dot ${activeIndex === i ? 'deck-pager-dot--active' : ''}`}
            />
          ))}
        </div>
        <button onClick={toNext} aria-label="Siguiente diseño" className="deck-pager-btn">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
