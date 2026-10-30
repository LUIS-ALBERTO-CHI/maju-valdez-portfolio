import { useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { LINKEDIN_URL, WHATSAPP_URL } from '../data/contacto';

/**
 * Cierre de la página. Es el último momento para convertir: dos acciones y
 * nada más. LinkedIn es la principal (PRODUCT.md) y WhatsApp la secundaria.
 * El CV e Instagram ya están en el hero y en el menú; aquí no se repiten.
 *
 * Mientras el cierre está en pantalla, el botón flotante de WhatsApp se
 * esconde (clase en <body>, ver index.css) para no mostrar dos WhatsApp juntos.
 */
export default function Footer() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [footRef, footVisible] = useIntersectionObserver({ threshold: 0.25 });
  const year = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.toggle('cierre-visible', footVisible);
    return () => document.body.classList.remove('cierre-visible');
  }, [footVisible]);

  return (
    <footer ref={footRef} className="site-footer relative" style={{ backgroundColor: 'var(--bg-element)', zIndex: 1 }}>
      <div className="footer-wave" />

      <div className="max-w-[1200px] mx-auto px-5 pb-8">
        <div className="footer-cta">
          <h2
            ref={titleRef}
            className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)', marginBottom: '1.5rem' }}
          >
            Abierta a <span>oportunidades</span>
          </h2>

          <p className={`footer-text fade-in ${titleVisible ? 'visible' : ''}`}>
            Actualmente busco unirme a un equipo innovador donde pueda aportar mi pasión por el
            marketing y la estrategia digital. Si mi perfil encaja con tu empresa,{' '}
            <strong>¡me encantaría conversar!</strong>
          </p>

          <div className={`footer-actions fade-in ${titleVisible ? 'visible' : ''}`}>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--primary">
              <FaLinkedinIn size={16} aria-hidden="true" />
              Conectar en LinkedIn
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--secondary">
              <FaWhatsapp size={18} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Maju Valdez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
