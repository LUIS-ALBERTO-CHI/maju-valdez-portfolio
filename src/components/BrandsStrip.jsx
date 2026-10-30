import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const BRANDS = [
  { src: '/logos/MASCOTAS.png', alt: 'Logo Mascotas' },
  { src: '/logos/fogysa.png', alt: 'Logo Fogysa' },
  { src: '/logos/nucan.png', alt: 'Logo Nucan' },
  { src: '/logos/nupec.png', alt: 'Logo Nupec' },
  { src: '/logos/kubota.png', alt: 'Logo Kubota' },
  { src: '/logos/virbac.png', alt: 'Logo Virbac' },
];

export default function BrandsStrip() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      className="brands-strip-bg relative flex flex-col items-center"
      style={{
        marginTop: '-180px',
        paddingTop: '90px',
        paddingBottom: '56px',
        position: 'relative',
        zIndex: 96,
      }}
    >
      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Marcas con las que he <span>Colaborado</span>
      </h2>

      <div className="w-full max-w-[1200px] mx-auto px-5">
        <ul
          className="grid list-none p-0 justify-items-center items-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '18px 16px',
          }}
        >
          {/* Fichas iguales: cada logo en su tarjeta, en gris al reposo y a color al pasar el cursor */}
          {BRANDS.map(({ src, alt }) => (
            <li key={alt} className="brand-tile">
              <img src={src} alt={alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
