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
        paddingBottom: '100px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '40px 30px',
          }}
        >
          {BRANDS.map(({ src, alt }) => (
            <li key={alt} className="flex items-center justify-center">
              <img
                src={src}
                alt={alt}
                className="w-auto max-w-full object-contain transition-transform duration-300 hover:scale-[1.08]"
                style={{ height: '95px' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
