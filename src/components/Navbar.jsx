import { Fragment, useState, useEffect, useRef } from 'react';
import { PiBriefcase, PiCaretDown, PiChatCircleText, PiGraduationCap, PiHouse, PiImage, PiList, PiMoon, PiPlayCircle, PiShareNetwork, PiStack, PiSun, PiX } from 'react-icons/pi';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { INSTAGRAM_URL, LINKEDIN_URL } from '../data/contacto';

/* Mismo orden que las secciones de la página: trabajo → prueba social → trayectoria */
const HOME_LINK = { href: 'inicio', label: 'Inicio', Icon: PiHouse };

const PORTFOLIO_LINKS = [
  { href: 'proyectos', label: 'Diseños',  Icon: PiImage },
  { href: 'videos',    label: 'Videos',   Icon: PiPlayCircle },
  { href: 'cuentas',   label: 'Cuentas',  Icon: PiShareNetwork },
];

const TRAYECTORIA_LINKS = [
  { href: 'recomendaciones', label: 'Recomendaciones', Icon: PiChatCircleText },
  { href: 'experiencia',     label: 'Experiencia',     Icon: PiBriefcase },
  { href: 'educacion',       label: 'Educación',       Icon: PiGraduationCap },
];

const ALL_LINKS = [HOME_LINK, ...PORTFOLIO_LINKS, ...TRAYECTORIA_LINKS];
const PORTFOLIO_IDS = PORTFOLIO_LINKS.map((l) => l.href);
/* Separadores del menú móvil: índice del primer enlace de cada grupo */
const MENU_GROUPS = { 1: 'Portafolio', [1 + PORTFOLIO_LINKS.length]: 'Trayectoria' };

const SOCIAL_LINKS = [
  { url: INSTAGRAM_URL, Icon: FaInstagram,  label: 'Instagram' },
  { url: LINKEDIN_URL,  Icon: FaLinkedinIn, label: 'LinkedIn' },
];

const MENU_ID = 'menu-movil';
const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Navbar({ darkMode, setDarkMode, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollHide, setScrollHide] = useState(false);
  const scrollTimerRef = useRef(null);
  const toggleRef      = useRef(null);
  const overlayRef     = useRef(null);
  const wasOpenRef     = useRef(false);

  /* ── Menú abierto: bloquear scroll, esconder el botón flotante, mover el foco ── */
  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    let t;
    if (mobileOpen) {
      // El foco entra al primer enlace cuando el panel ya es visible
      t = setTimeout(() => overlayRef.current?.querySelector(FOCUSABLE)?.focus(), 120);
    } else if (wasOpenRef.current) {
      // Al cerrar, el foco vuelve al botón que lo abrió
      toggleRef.current?.focus();
    }
    wasOpenRef.current = mobileOpen;

    return () => {
      clearTimeout(t);
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ── Teclado: Escape cierra, Tab se queda dentro del menú ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !overlayRef.current) return;
      const nodes = [toggleRef.current, ...overlayRef.current.querySelectorAll(FOCUSABLE)].filter(Boolean);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && current === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && current === last) { e.preventDefault(); first.focus(); }
      else if (!nodes.includes(current)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  /* ── Si la pantalla pasa a escritorio con el menú abierto, se cierra ── */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ── Scroll: esconder la píldora un instante ── */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollHide(true);
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => setScrollHide(false), 300);
      } else {
        setScrollHide(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimerRef.current);
    };
  }, []);

  /* ── Ir a una sección: cerrar el menú y hacer scroll suave ── */
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const wasOpen = mobileOpen;
    setMobileOpen(false);
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', location.pathname);
      }
    }, wasOpen ? 260 : 0);
  };

  const portfolioActive = PORTFOLIO_IDS.includes(activeSection);
  const themeLabel = darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  return (
    <header style={{ position: 'relative', zIndex: 200 }}>

      {/* ══════════ PÍLDORA ══════════ */}
      <nav
        className={`navbar fixed top-5 left-1/2 w-[90%] max-w-[1200px] flex items-center justify-between
          px-6 py-3 rounded-[60px] backdrop-blur-lg border
          transition-all duration-300 ease-apple
          ${scrollHide ? '-translate-y-[200%] -translate-x-1/2 opacity-0' : '-translate-x-1/2 opacity-100'}`}
        style={{ zIndex: 200 }}
        aria-label="Principal"
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, 'inicio')}
          className="font-bold text-2xl no-underline"
          style={{ color: 'var(--text-dark)' }}
          aria-label="MAJU, ir al inicio"
        >
          MAJU
        </a>

        {/* Enlaces de escritorio */}
        <ul className="hidden lg:flex items-center relative gap-1 list-none m-0 p-0">
          {[HOME_LINK].map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={`#${href}`}
                onClick={(e) => handleNavClick(e, href)}
                className={`nav-link flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-sm font-medium no-underline ${activeSection === href ? 'active' : ''}`}
                aria-current={activeSection === href ? 'true' : undefined}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}

          {/* Desplegable Portafolio */}
          <li className="dropdown relative">
            <a
              href="#proyectos"
              onClick={(e) => handleNavClick(e, 'proyectos')}
              className={`dropdown-toggle nav-link flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-sm font-medium no-underline ${portfolioActive ? 'active' : ''}`}
            >
              <PiStack size={15} aria-hidden="true" />
              Portafolio
              <PiCaretDown size={13} className="ml-1 transition-transform duration-300" aria-hidden="true" />
            </a>
            <ul className="dropdown-menu">
              {PORTFOLIO_LINKS.map(({ href, label, Icon }) => (
                <li key={href} style={{ margin: 0, width: '100%' }}>
                  <a
                    href={`#${href}`}
                    onClick={(e) => handleNavClick(e, href)}
                    className="nav-link flex items-center gap-2 px-5 py-3 text-sm font-medium no-underline"
                    style={{ borderRadius: 0 }}
                    aria-current={activeSection === href ? 'true' : undefined}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {TRAYECTORIA_LINKS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={`#${href}`}
                onClick={(e) => handleNavClick(e, href)}
                className={`nav-link flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-sm font-medium no-underline ${activeSection === href ? 'active' : ''}`}
                aria-current={activeSection === href ? 'true' : undefined}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-1">
          <button
            id="dark-mode-toggle"
            type="button"
            onClick={(e) => setDarkMode(!darkMode, e)}
            className="flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-200"
            style={{ background: 'none', border: 'none', color: 'var(--text-dark)', cursor: 'pointer' }}
            aria-label={themeLabel}
          >
            {darkMode ? <PiSun size={20} aria-hidden="true" /> : <PiMoon size={20} aria-hidden="true" />}
          </button>

          {/* Hamburguesa, solo móvil */}
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle lg:hidden ${mobileOpen ? 'is-open' : ''}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls={MENU_ID}
          >
            <span className="menu-toggle-icon" aria-hidden="true">
              <PiList size={26} className="menu-toggle-open" />
              <PiX size={26} className="menu-toggle-close" />
            </span>
          </button>
        </div>
      </nav>

      {/* ══════════ MENÚ MÓVIL A PANTALLA COMPLETA ══════════ */}
      <div
        id={MENU_ID}
        ref={overlayRef}
        className={`menu-overlay ${mobileOpen ? 'is-open' : ''}`}
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        aria-label="Menú"
      >
        <div className="menu-panel">
          <nav className="menu-nav" aria-label="Secciones">
            {ALL_LINKS.map(({ href, label, Icon }, i) => {
              const isActive = activeSection === href;
              return (
                <Fragment key={href}>
                  {MENU_GROUPS[i] && (
                    <p className="menu-divider" style={{ '--i': i }}>
                      <span>{MENU_GROUPS[i]}</span>
                    </p>
                  )}
                  <a
                    href={`#${href}`}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`menu-link ${isActive ? 'is-active' : ''}`}
                    style={{ '--i': i }}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="menu-link-icon">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    {label}
                    {isActive && <span className="menu-link-dot" aria-hidden="true" />}
                  </a>
                </Fragment>
              );
            })}
          </nav>

          <div className="menu-foot" style={{ '--i': ALL_LINKS.length }}>
            <div className="menu-social">
              {SOCIAL_LINKS.map(({ url, Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="menu-social-btn"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="menu-theme">
              <span id="menu-theme-label">{darkMode ? 'Modo oscuro' : 'Modo claro'}</span>
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-labelledby="menu-theme-label"
                className="menu-switch"
                onClick={(e) => setDarkMode(!darkMode, e)}
              >
                <span className="menu-switch-knob" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
