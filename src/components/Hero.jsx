import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PiDownloadSimple, PiImages } from 'react-icons/pi';
import { FaLinkedinIn } from 'react-icons/fa';
import { RECOMENDACIONES } from '../data/recomendaciones';
import { LINKEDIN_URL } from '../data/contacto';

const CV_URL = '/files/Maria Julia Valdez Navarro CV 2026.pdf';

/* El título se parte en letras para la entrada escalonada. "Maju" va en acento. */
const TITLE = [
  { text: 'Soy ', accent: false },
  { text: 'Maju', accent: true },
  { text: ',', accent: false },
];
const TITLE_TEXT = TITLE.map((p) => p.text).join('');

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * La foto y el arco se inclinan siguiendo el cursor. Solo en escritorio con
 * ratón y sin preferencia de movimiento reducido; en el resto no hace nada.
 * Escribe --tilt-x / --tilt-y (de -1 a 1) y el CSS hace la geometría.
 */
function useCursorTilt(areaRef, targetRef) {
  useEffect(() => {
    const mq = window.matchMedia(
      '(hover: hover) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)'
    );
    const area = areaRef.current;
    const target = targetRef.current;
    if (!mq.matches || !area || !target) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const apply = () => {
      raf = 0;
      target.style.setProperty('--tilt-x', tx.toFixed(3));
      target.style.setProperty('--tilt-y', ty.toFixed(3));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onMove = (e) => {
      const r = target.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) / r.width);
      ty = clamp((e.clientY - (r.top + r.height / 2)) / r.height);
      schedule();
    };
    const onLeave = () => { tx = 0; ty = 0; schedule(); };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [areaRef, targetRef]);
}

/**
 * Hero. Un solo DOM para escritorio y móvil: la composición cambia por CSS
 * (.hero-* en index.css), así no hay dos <h1> ni dos fotos en la página.
 *
 * Jerarquía de acciones según PRODUCT.md: ver el trabajo es la conversión
 * principal, el CV y LinkedIn son apoyo.
 *
 * `ready` llega de App cuando el splash termina: la entrada coreografiada
 * arranca entonces y no debajo de la pantalla de carga.
 */
export default function Hero({ ready = true }) {
  const [introRef, introVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [entered, setEntered] = useState(false);
  const heroRef = useRef(null);
  const photoRef = useRef(null);
  const recomendaciones = RECOMENDACIONES.length;

  // Se queda en "entered" aunque el hero salga de pantalla: la entrada ocurre una vez.
  if (ready && introVisible && !entered) setEntered(true);

  useCursorTilt(heroRef, photoRef);

  let letterIndex = 0;

  return (
    <main
      id="inicio"
      ref={heroRef}
      className="hero relative px-5 text-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div ref={introRef} className={`hero-inner ${entered ? 'hero--enter' : 'hero--pending'}`}>

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

          <h1 className="hero-title" aria-label={TITLE_TEXT}>
            {TITLE.map((part, p) => (
              <span key={p} className={part.accent ? 'hero-title-accent' : undefined} aria-hidden="true">
                {[...part.text].map((ch, c) =>
                  ch === ' ' ? (
                    ' '
                  ) : (
                    <span key={c} className="hero-letter" style={{ '--i': letterIndex++ }}>
                      {ch}
                    </span>
                  )
                )}
              </span>
            ))}
          </h1>
          <h2 className="hero-role">Community Manager</h2>
          {/* Nombre completo en texto visible: es como la buscan en Google */}
          <p className="hero-fullname">María Julia Valdez Navarro</p>

          <div className="hero-ctas">
            <a href="#proyectos" onClick={scrollTo('proyectos')} className="hero-btn hero-btn--primary">
              <PiImages size={18} aria-hidden="true" />
              Ver portafolio
            </a>
            <a href={CV_URL} download className="hero-btn hero-btn--secondary">
              <PiDownloadSimple size={18} aria-hidden="true" />
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

          <div className="hero-photo" ref={photoRef}>
            <div className="hero-photo-inner">
              <img
                src="/files/foto.png"
                alt="Maju Valdez (María Julia Valdez Navarro), Community Manager en Mérida, Yucatán"
                width="853"
                height="1307"
                fetchPriority="high"
              />
            </div>
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
