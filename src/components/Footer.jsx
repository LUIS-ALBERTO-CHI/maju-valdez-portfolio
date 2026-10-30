import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { PiDownloadSimple } from 'react-icons/pi';
import { LINKEDIN_URL, INSTAGRAM_URL, WHATSAPP_URL } from '../data/contacto';

const CV_URL = '/files/Maria Julia Valdez Navarro CV 2026.pdf';

/**
 * Cierre de la página. Es el último momento para convertir, así que repite la
 * jerarquía del hero: LinkedIn como acción principal (PRODUCT.md), WhatsApp
 * y CV como apoyo.
 */
export default function Footer() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });
  const year = new Date().getFullYear();

  return (
    <footer className="relative" style={{ backgroundColor: 'var(--bg-element)', zIndex: 1 }}>
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

          <div className={`footer-links fade-in ${titleVisible ? 'visible' : ''}`}>
            <a href={CV_URL} download className="footer-link">
              <PiDownloadSimple size={15} aria-hidden="true" />
              Descargar CV
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaInstagram size={15} aria-hidden="true" />
              Instagram
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
