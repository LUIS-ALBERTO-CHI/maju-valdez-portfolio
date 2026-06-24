import { useState, useEffect, useRef } from 'react';
import {
  Home, Briefcase, GraduationCap,
  Image, Share2, PlayCircle,
  Layers, ChevronDown, Sun, Moon, MessageSquare,
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const NAV_LINKS = [
  { href: 'inicio',        label: 'Inicio',        Icon: Home },
  { href: 'experiencia',   label: 'Experiencia',   Icon: Briefcase },
  { href: 'educacion',     label: 'Educación',     Icon: GraduationCap },
  { href: 'testimonios',   label: 'Testimonios',   Icon: MessageSquare },
];

const PORTFOLIO_LINKS = [
  { href: 'proyectos', label: 'Diseños',  Icon: Image },
  { href: 'cuentas',   label: 'Cuentas',  Icon: Share2 },
  { href: 'videos',    label: 'Videos',   Icon: PlayCircle },
];

const ALL_LINKS = [...NAV_LINKS, ...PORTFOLIO_LINKS];

const SOCIAL_LINKS = [
  { url: 'https://www.instagram.com/hobishinee_',                              Icon: FaInstagram,  label: 'Instagram' },
  { url: 'https://mx.linkedin.com/in/maria-julia-valdez-navarro-42696828a',    Icon: FaLinkedinIn, label: 'LinkedIn' },
];

export default function Navbar({ darkMode, setDarkMode, activeSection }) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrollHide, setScrollHide]   = useState(false);
  const scrollTimerRef                = useRef(null);

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Scroll → hide navbar briefly ── */
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) setMobileOpen(false);
      if (window.scrollY > 50) {
        setScrollHide(true);
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => setScrollHide(false), 300);
      } else {
        setScrollHide(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  /* ── Smooth scroll + close menu ── */
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileOpen(false);
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', location.pathname);
      }
    }, mobileOpen ? 350 : 0);
  };

  const portfolioActive = ['proyectos', 'cuentas', 'videos'].includes(activeSection);

  return (
    <header style={{ position: 'relative', zIndex: 200 }}>

      {/* ══════════ PILL NAVBAR ══════════ */}
      <nav
        className={`navbar fixed top-5 left-1/2 w-[90%] max-w-[1200px] flex items-center justify-between
          px-6 py-3 rounded-[60px] backdrop-blur-lg border
          transition-all duration-300 ease-apple
          ${scrollHide ? '-translate-y-[200%] -translate-x-1/2 opacity-0' : '-translate-x-1/2 opacity-100'}`}
        style={{ zIndex: 200 }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, 'inicio')}
          className="font-bold text-2xl no-underline"
          style={{ color: 'var(--text-dark)' }}
        >
          MAJU
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center relative gap-1 list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={`#${href}`}
                onClick={(e) => handleNavClick(e, href)}
                className={`nav-link flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-sm font-medium no-underline ${activeSection === href ? 'active' : ''}`}
              >
                <Icon size={15} strokeWidth={2} />
                {label}
              </a>
            </li>
          ))}

          {/* Portfolio dropdown */}
          <li className="dropdown relative">
            <a
              href="#proyectos"
              onClick={(e) => handleNavClick(e, 'proyectos')}
              className={`dropdown-toggle nav-link flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-sm font-medium no-underline ${portfolioActive ? 'active' : ''}`}
            >
              <Layers size={15} strokeWidth={2} />
              Portafolio
              <ChevronDown size={13} strokeWidth={2} className="ml-1 transition-transform duration-300" />
            </a>
            <ul className="dropdown-menu">
              {PORTFOLIO_LINKS.map(({ href, label, Icon }) => (
                <li key={href} style={{ margin: 0, width: '100%' }}>
                  <a
                    href={`#${href}`}
                    onClick={(e) => handleNavClick(e, href)}
                    className="nav-link flex items-center gap-2 px-5 py-3 text-sm font-medium no-underline"
                    style={{ borderRadius: 0 }}
                  >
                    <Icon size={15} strokeWidth={2} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Dark mode */}
          <button
            id="dark-mode-toggle"
            onClick={(e) => setDarkMode(!darkMode, e)}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
            style={{ background: 'none', border: 'none', color: 'var(--text-dark)', cursor: 'pointer' }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
          </button>

          {/* Hamburger – mobile only */}
          <button
            className="menu-toggle lg:hidden relative flex flex-col items-center justify-center w-10 h-10 rounded-full"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 210 }}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {/* Animated bars → X */}
            <span className="hamburger-bar" style={{ background: 'var(--text-dark)', ...barStyle, transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span className="hamburger-bar" style={{ background: 'var(--text-dark)', ...barStyle, opacity: mobileOpen ? 0 : 1, margin: '4px 0' }} />
            <span className="hamburger-bar" style={{ background: 'var(--text-dark)', ...barStyle, transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* ══════════ FULLSCREEN MOBILE OVERLAY ══════════ */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 190,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          opacity: mobileOpen ? 1 : 0,
          transition: 'opacity 380ms cubic-bezier(0.22,1,0.36,1)',
          background: 'var(--menu-overlay-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 32px 40px',
        }}
      >
        {/* Decorative blobs inside menu */}
        <span style={{ position:'absolute', top:'-10%', right:'-8%', width:'260px', height:'260px', borderRadius:'50%', background:'rgba(240,108,136,0.13)', filter:'blur(60px)', pointerEvents:'none' }} />
        <span style={{ position:'absolute', bottom:'-8%', left:'-6%', width:'220px', height:'220px', borderRadius:'50%', background:'rgba(244,167,185,0.10)', filter:'blur(50px)', pointerEvents:'none' }} />

        {/* Nav items */}
        <nav className="w-full max-w-[340px]">
          {ALL_LINKS.map(({ href, label, Icon }, i) => {
            const isPortfolio = ['proyectos', 'cuentas', 'videos'].includes(href);
            const isActive = activeSection === href;
            return (
              <a
                key={href}
                href={`#${href}`}
                onClick={(e) => handleNavClick(e, href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  padding: '14px 20px',
                  borderRadius: '18px',
                  marginBottom: '8px',
                  textDecoration: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.05rem, 4.5vw, 1.25rem)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--accent-hot)' : 'var(--text-dark)',
                  background: isActive ? 'rgba(240,108,136,0.10)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(240,108,136,0.25)' : 'transparent'}`,
                  transition: 'all 200ms ease',
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
                  opacity: mobileOpen ? 1 : 0,
                  transitionDelay: mobileOpen ? `${i * 45}ms` : '0ms',
                  paddingLeft: isPortfolio ? '44px' : '20px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(240,108,136,0.15)' : 'rgba(0,0,0,0.04)',
                    color: isActive ? 'var(--accent-hot)' : 'var(--text-secondary)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
                {label}
                {isActive && (
                  <span style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-hot)', flexShrink: 0 }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: '340px', height: '1px', background: 'var(--border-color)', margin: '12px 0 20px' }} />

        {/* Social icons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 300ms ease ${ALL_LINKS.length * 45 + 80}ms, transform 300ms ease ${ALL_LINKS.length * 45 + 80}ms`,
          }}
        >
          {SOCIAL_LINKS.map(({ url, Icon, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '48px', height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'transform 200ms ease, background 200ms ease',
              }}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Dark mode row */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 300ms ease ${ALL_LINKS.length * 45 + 140}ms, transform 300ms ease ${ALL_LINKS.length * 45 + 140}ms`,
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {darkMode ? 'Modo oscuro' : 'Modo claro'}
          </span>
          <button
            onClick={(e) => setDarkMode(!darkMode, e)}
            style={{
              width: '52px', height: '28px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              background: darkMode ? 'var(--accent-hot)' : 'var(--border-color)',
              transition: 'background 250ms ease',
              flexShrink: 0,
            }}
            aria-label="Toggle dark mode"
          >
            <span style={{
              position: 'absolute',
              top: '3px',
              left: darkMode ? 'calc(100% - 25px)' : '3px',
              width: '22px', height: '22px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              transition: 'left 250ms cubic-bezier(0.22,1,0.36,1)',
            }} />
          </button>
        </div>
      </div>
    </header>
  );
}

const barStyle = {
  display: 'block',
  width: '22px',
  height: '2px',
  borderRadius: '2px',
  transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease',
};
