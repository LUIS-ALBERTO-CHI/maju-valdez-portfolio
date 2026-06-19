import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { Star, Download, Briefcase } from 'lucide-react';

export default function Hero() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.1 });

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main
      id="inicio"
      className="relative flex justify-center items-start px-5 text-center overflow-hidden"
      style={{ paddingTop: '110px', paddingBottom: '60px', zIndex: 1, minHeight: '100vh' }}
    >
      <div
        ref={introRef}
        className={`w-full max-w-[1200px] fade-in ${introVisible ? 'visible' : ''}`}
      >

        {/* ── DESKTOP layout (≥ 1024px): 3 columns ── */}
        <div className="hidden lg:grid gap-8 items-center"
          style={{ gridTemplateColumns: '1fr 2fr 1fr' }}
        >
          {/* Left: Testimonial */}
          <div className="text-left italic pl-5 max-w-[260px]">
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              "Me apasiona el mundo del marketing y la innovación. Disfruto crear estrategias y contenido que conecten con las personas y den vida a las marcas en redes sociales."
            </p>
          </div>

          {/* Center: Photo + Text */}
          <div className="flex flex-col items-center">
            <div className="intro-text flex flex-col items-center">
              <div
                className="hello-bubble relative inline-block px-9 py-3 rounded-[44px] mb-4 font-semibold text-lg"
                style={{ color: 'var(--text-dark)' }}
              >
                <span>Hola!</span>
                <img
                  src="/files/comillas.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-2 -right-6 w-8 h-auto opacity-95"
                  style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.12))' }}
                />
              </div>
              <h1 className="text-6xl font-bold m-0" style={{ color: 'var(--text-dark)' }}>
                Soy <span style={{ color: 'var(--accent-hot)' }}>Maju</span>,
              </h1>
              <h2 className="text-4xl font-normal -mt-2 mb-0" style={{ color: 'var(--text-dark)' }}>
                Community Manager
              </h2>
            </div>

            <div className="profile-image-container relative mt-4" style={{ zIndex: 3 }}>
              <div className="frame-decoration">
                <img src="/files/Frame 68.svg" alt="" aria-hidden="true" className="w-full h-full object-contain" onError={e => e.currentTarget.style.display = 'none'} />
              </div>
              <img
                src="/files/foto.png"
                alt="Foto de Maju"
                className="profile-image max-w-[340px] block relative"
                style={{ filter: 'drop-shadow(0 0 15px var(--accent-soft))', zIndex: 2 }}
              />
              <div className="profile-buttons-overlay">
                <a href="/files/Maria Julia Valdez Navarro Curriculum 2025.pdf" download
                  className="profile-btn px-6 py-3 rounded-full font-semibold text-center min-w-[160px] no-underline text-white"
                  style={{ background: 'var(--accent-hot)' }}>
                  Descargar CV
                </a>
                <a href="#proyectos" onClick={handlePortfolioClick}
                  className="profile-btn px-6 py-3 rounded-full font-semibold text-center min-w-[160px] no-underline"
                  style={{ background: 'transparent', color: 'white', border: '2px solid white' }}>
                  Ver Portafolio
                </a>
              </div>
            </div>
          </div>

          {/* Right: Experience widget */}
          <div className="text-center">
            <div className="flex justify-center gap-0.5 mb-2" style={{ color: 'var(--accent-hot)' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="text-4xl font-bold m-0" style={{ color: 'var(--text-dark)' }}>1 Año</p>
            <p style={{ color: 'var(--text-secondary)' }}>De Experiencia</p>
          </div>
        </div>

        {/* ── MOBILE layout (< 1024px): single column ── */}
        <div className="lg:hidden flex flex-col items-center gap-5">

          {/* Hello bubble */}
          <div
            className="hello-bubble relative inline-block px-8 py-2.5 rounded-[44px] font-semibold text-base"
            style={{ color: 'var(--text-dark)' }}
          >
            <span>Hola!</span>
            <img
              src="/files/comillas.png"
              alt=""
              aria-hidden="true"
              className="absolute -top-2 -right-5 w-7 h-auto opacity-95"
              style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))' }}
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="font-bold m-0" style={{ color: 'var(--text-dark)', fontSize: 'clamp(2.4rem, 11vw, 3.5rem)' }}>
              Soy <span style={{ color: 'var(--accent-hot)' }}>Maju</span>,
            </h1>
            <h2 className="font-normal mt-1 mb-0" style={{ color: 'var(--text-dark)', fontSize: 'clamp(1.3rem, 6vw, 2rem)' }}>
              Community Manager
            </h2>
          </div>

          {/* Photo – circular with white ring + pink glow */}
          <div
            style={{
              position: 'relative',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fce4ec 0%, var(--accent-soft) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              boxShadow: '0 0 40px rgba(240,108,136,0.25)',
            }}
          >
            {/* White ring */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '4px solid white',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fce4ec',
              }}
            >
              <img
                src="/files/foto.png"
                alt="Foto de Maju"
                style={{
                  width: '110%',
                  height: '110%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
            </div>
          </div>


          {/* Experience row */}
          <div
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            <span className="flex gap-0.5" style={{ color: 'var(--accent-hot)' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
            </span>
            <span className="font-bold text-xl" style={{ color: 'var(--text-dark)' }}>1 Año</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>de Experiencia</span>
          </div>

          {/* Testimonial */}
          <p
            className="italic text-sm leading-relaxed max-w-[300px] text-center px-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            "Me apasiona el mundo del marketing y la innovación. Disfruto crear estrategias y contenido que conecten con las personas y den vida a las marcas en redes sociales."
          </p>

          {/* Action buttons */}
          <div className="flex flex-col items-center gap-3 w-full" style={{ maxWidth: '280px' }}>
            <Button
              asChild
              size="lg"
              className="w-full rounded-full font-semibold gap-2 border-0 hover:opacity-90"
              style={{ background: 'var(--accent-hot)', color: 'white' }}
            >
              <a href="/files/Maria Julia Valdez Navarro Curriculum 2025.pdf" download>
                <Download size={18} strokeWidth={2} /> Descargar CV
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-full font-semibold gap-2"
              style={{ borderColor: 'var(--accent-hot)', color: 'var(--accent-hot)', background: 'transparent' }}
            >
              <a href="#proyectos" onClick={handlePortfolioClick}>
                <Briefcase size={18} strokeWidth={2} /> Ver Portafolio
              </a>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
