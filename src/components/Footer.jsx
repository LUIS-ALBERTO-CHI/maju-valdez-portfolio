import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FaInstagram, FaTiktok, FaLinkedinIn } from 'react-icons/fa';

const SOCIALS = [
  {
    href: 'https://www.instagram.com/hobishinee_?igsh=MXZzcHR3ajk4anRwMw==',
    Icon: FaInstagram,
    label: 'Instagram',
  },
  {
    href: 'https://www.tiktok.com/@hobishinee__?_t=ZS-90a8nkek4QS&_r=1',
    Icon: FaTiktok,
    label: 'TikTok',
  },
  {
    href: 'https://mx.linkedin.com/in/maria-julia-valdez-navarro-42696828a',
    Icon: FaLinkedinIn,
    label: 'LinkedIn',
  },
];

export default function Footer() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <footer className="relative" style={{ backgroundColor: 'var(--bg-element)', zIndex: 1 }}>
      {/* Wave top */}
      <div className="footer-wave" />

      <div className="max-w-[1200px] mx-auto px-5 pb-8">
        <div className="py-14">
          <div className="flex flex-col items-center text-center">
            <h2
              ref={titleRef}
              className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            >
              Abierta a Oportunidades
            </h2>

            <p
              className="max-w-xl text-base leading-relaxed mb-8 mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Actualmente busco unirme a un equipo innovador donde pueda aportar mi pasión por el
              marketing y la estrategia digital. Si mi perfil encaja con tu empresa,{' '}
              <span style={{ color: 'var(--accent-hot)', fontWeight: 600 }}>¡me encantaría conversar!</span>
            </p>

            {/* Social links */}
            <div className="flex items-center gap-5 mt-2">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  style={{
                    color: 'var(--text-dark)',
                    background: 'var(--bg-card)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 text-center text-sm"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
          <p>© 2025 Maju Valdez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
