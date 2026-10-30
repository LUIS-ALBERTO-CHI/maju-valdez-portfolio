import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Download, Images } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { RECOMENDACIONES } from '../data/recomendaciones';

const CV_URL = '/files/Maria Julia Valdez Navarro CV 2026.pdf';
const LINKEDIN_URL = 'https://mx.linkedin.com/in/maria-julia-valdez-navarro-42696828a';

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * Hero. Un solo DOM para escritorio y móvil: la composición cambia por CSS
 * (.hero-* en index.css), así no hay dos <h1> ni dos fotos en la página.
 *
 * Jerarquía de acciones según PRODUCT.md: ver el trabajo es la conversión
 * principal, el CV y LinkedIn son apoyo.
 */
export default function Hero() {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.1 });
  const recomendaciones = RECOMENDACIONES.length;

  return (
    <main id="inicio" className="hero relative px-5 text-center overflow-hidden" style={{ zIndex: 1 }}>
      <div ref={introRef} className={`hero-inner fade-in ${introVisible ? 'visible' : ''}`}>

        {/* ── Presentación en sus palabras ── */}
        <blockquote className="hero-quote">
          <p>
            “Me apasiona el mundo del marketing y la innovación. Disfruto crear estrategias y
            contenido que conecten con las personas y den vida a las marcas en redes sociales.”
          </p>
        </blockquote>

        {/* ── Centro: saludo, nombre, acciones y foto ── */}
        <div className="hero-center">
          <div className="hello-bubble hero-hello">
            <span>¡Hola!</span>
            <img
              src="/files/comillas.png"
              alt=""
              aria-hidden="true"
              className="hero-hello-mark"
            />
          </div>

          <h1 className="hero-title">
            Soy <span>Maju</span>,
          </h1>
          <h2 className="hero-role">Community Manager</h2>
          {/* Nombre completo en texto visible: es como la buscan en Google */}
          <p className="hero-fullname">María Julia Valdez Navarro</p>

          <div className="hero-ctas">
            <a href="#proyectos" onClick={scrollTo('proyectos')} className="hero-btn hero-btn--primary">
              <Images size={18} strokeWidth={2} aria-hidden="true" />
              Ver portafolio
            </a>
            <a href={CV_URL} download className="hero-btn hero-btn--secondary">
              <Download size={18} strokeWidth={2} aria-hidden="true" />
              Descargar CV
            </a>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link"
          >
            <FaLinkedinIn size={13} aria-hidden="true" />
            Conectar en LinkedIn
          </a>

          <div className="hero-photo">
            <img
              src="/files/foto.png"
              alt="Maju Valdez (María Julia Valdez Navarro), Community Manager en Mérida, Yucatán"
              width="853"
              height="1307"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* ── Pruebas reales: años y recomendaciones ── */}
        <div className="hero-proof">
          <p className="hero-proof-item">
            <strong>2 años</strong>
            <span>de experiencia</span>
          </p>
          <a href="#recomendaciones" onClick={scrollTo('recomendaciones')} className="hero-proof-item hero-proof-link">
            <strong>{recomendaciones}</strong>
            <span>recomendaciones en LinkedIn</span>
          </a>
        </div>

      </div>
    </main>
  );
}
