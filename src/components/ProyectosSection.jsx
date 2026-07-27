import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import CardCarousel from './ui/CardCarousel';

const DESIGNS = [
  { src: '/files/ENERO MASCOTAS/nucan.jpeg', title: 'Diseño 1' },
  { src: '/files/3.png', title: 'Diseño 2' },
  { src: '/files/4.png', title: 'Diseño 3' },
  { src: '/files/5.png', title: 'Diseño 4' },
  { src: '/files/6.png', title: 'Diseño 5' },
  { src: '/files/7.png', title: 'Diseño 6' },
  { src: '/files/ENERO MASCOTAS/15.png', title: 'Diseño 7' },
  { src: '/files/ENERO MASCOTAS/17.png', title: 'Diseño 8' },
  { src: '/files/ENERO MASCOTAS/18.png', title: 'Diseño 9' },
  { src: '/files/ENERO MASCOTAS/20.png', title: 'Diseño 10' },
  { src: '/files/ENERO MASCOTAS/22.png', title: 'Diseño 11' },
  { src: '/files/ENERO MASCOTAS/25.png', title: 'Diseño 12' },
  { src: '/files/ENERO MASCOTAS/27.png', title: 'Diseño 13' },
  { src: '/files/ENERO MASCOTAS/3.png', title: 'Diseño 14' },
  { src: '/files/ENERO MASCOTAS/8.png', title: 'Diseño 15' },
];

export default function ProyectosSection({ onImageClick }) {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

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

      {/* ── FANNED CARD DECK ── */}
      <div className="mt-10">
        <CardCarousel images={DESIGNS} onImageClick={onImageClick} />
      </div>
    </section>
  );
}
